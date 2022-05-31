const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const srcPath = path.resolve(__dirname, '../src')
const rootPath = path.resolve(__dirname, '../src')

const files = fs
    .readdirSync(rootPath)
    .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
    .filter(v => v !== 'List' && v !== 'DataList' && v !=='Rule')
    .filter(f => fs.readdirSync(path.resolve(rootPath, f)).includes('index.d.ts'))

const Types = []
const AllTypes = {}
const TypesDefault = []
const TypesDeclare = []
const WhiteList = ['Rule', 'Rate']
files
    .forEach(f => {
        if (fs.readdirSync(path.resolve(rootPath, f)).includes('index.d.ts')) {
            const tsPath = path.resolve(rootPath, `${f}/index.d.ts`)
            const tsFile = fs.readFileSync(tsPath).toString()
            const expDefault = /(?<=export interface ).*(?={)/g
            const expExtend = /(?<=export interface ).*(?= extends)/g
            const expDeclare = /(?<=export declare interface ).*(?= extends)/g
            const types = tsFile.match(expExtend)
            const typesDefault = tsFile.match(expDefault)
            const typesDeclare = tsFile.match(expDeclare)
            if (types) {
                Types.push(types[0])
            }

            if (typesDefault) {
                TypesDefault.push(typesDefault[0])
            }

            if (typesDeclare) {
                TypesDeclare.push(typesDeclare[0])
            }

            typesDefault?.forEach((t, i) => {
                typesDefault[i] = t.indexOf('extends') > -1 ? t.split(' extends ')[0] : t
            })
            let allTypes = []
            if (types) allTypes.push(...types)
            if (typesDefault) allTypes.push(...typesDefault)
            if (typesDeclare) allTypes.push(...typesDeclare)
            allTypes = [...new Set(allTypes)]?.filter(i => i.indexOf('Props') > -1 || WhiteList.includes(f))
            AllTypes[f] = {
                name: f,
                props: allTypes,
                propNames: allTypes.map(i => i.indexOf('<') > -1 ? i.split('<')[0] : i)
            }

        }
    })

const line = `// Created by scripts/src-index.js.
import * as utils from './utils'

export default { utils, version: '<%= version %>' }
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'
export { default as List } from './DataList'
<% files.forEach(function (name) { -%>
<% let Props = AllTypes[name].propNames %>
import { <%= Props.toString() %> } from './<%= name %>'
export { default as <%= name %> } from './<%= name %>'

<% }) -%>

export namespace Type {

<% for(let key in AllTypes){ -%>
<% const EXP = /(?<=<).*(?=>)/ -%>
<% AllTypes[key].props.forEach( (name,index) => { -%>
<% let TYPE = name.match(EXP) -%>
<% TYPE = TYPE ? TYPE.toString().split('=')[0] : TYPE -%>
    export type <%- name.split('Props')[0]+ (TYPE ? '<'+TYPE+'>' : '') %> = <%- name.split('<')[0]+(TYPE ? '<'+TYPE+'>' : '') %>

<% }) -%>
<% } -%>
}
`





const text = ejs.render(line, { files, version: pack.version, Types, AllTypes })
fs.writeFileSync(`${rootPath}/index.ts`, text)