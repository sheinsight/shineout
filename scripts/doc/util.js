const path = require('path')
const { Project } = require('ts-morph')
const fs = require('fs')

const project = new Project({ tsConfigFilePath: path.resolve(__dirname, '../../src/tsconfig.json') })
const typeChecker = project.getTypeChecker()
const pathMap = {}

function parseDocTag(jtTags) {
  return jtTags.reduce(
    (r, tag) => ({
      ...r,
      [tag.getTagName()]: tag.getComment(),
    }),
    {}
  )
}
function convertQuotes(str) {
  return str.replaceAll('"', '\\"').replaceAll("'", '\\"')
}

// 一些逻辑处理
function replaceStr(str) {
  return str
    .replaceAll('boolean | React.ReactChild | React.ReactFragment | React.ReactPortal', 'ReactNode')
    .replaceAll(
      'string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal',
      'ReactNode'
    )
    .replaceAll('ReactElement<any, string | JSXElementConstructor<any>>', 'ReactElement')
    .replaceAll('| undefined', '')
    .replaceAll('React.', '')
    .replace(/\r?\n|\r/g, '')
}

// 获取文件中的某个属性的类型
function getPathType(pp, name) {
  const sourceFile = project.addSourceFileAtPath(pp)
  const type = sourceFile.getTypeAlias(name) || sourceFile.getInterface(name)
  if (type) {
    return replaceStr(type.getTypeNode().getText()).replace(/import\("([^"]+)"\)\./g, '')
  }
  return ''
}

// 处理import
function getImportType(text) {
  const reg = /import\("([^"]+)"\)\.(\w+)(<\w+>)?\s*/g
  let currentMatch
  let resultStr = text
  do {
    currentMatch = reg.exec(text)
    if (currentMatch) {
      const str = currentMatch[0]
      const pp = currentMatch[1]
      const name = currentMatch[2]
      const fanXin = currentMatch[3] || ''
      // console.log(str, pp, name, fanXin)
      // 过滤掉 xxxProps 和 ObjectKey
      if (!name.endsWith('Props') && !['ObjectKey'].includes(name)) {
        if (!pathMap[name]) {
          pathMap[name] = {
            form: pp,
            type: convertQuotes(getPathType(`${pp}.ts`, name)),
          }
        }
        resultStr = resultStr.replace(str, pathMap[name].type)
      } else {
        resultStr = resultStr.replace(str, `${name}${fanXin}`)
      }
    }
  } while (currentMatch !== null)
  return resultStr
}

function getTypeStr(override, type) {
  if (override && override !== 'union') {
    return convertQuotes(override)
  }
  let text = type.getText()
  if (override === 'union') {
    text = type
      .getUnionTypes()
      .map(t => t.getText())
      .join(' | ')
  }
  text = getImportType(text)
  text = replaceStr(text)
  text = convertQuotes(text)
  return text
}

function getPropertiesWithDocComments(pp) {
  try {
    if (!fs.statSync(pp).isFile()) return []
  } catch (e) {
    return []
  }
  const sourceFile = project.addSourceFileAtPath(pp)
  // 获取所有类型别名和接口
  const typeAliasesAndInterfaces = sourceFile.getTypeAliases().concat(sourceFile.getInterfaces())
  const results = []
  typeAliasesAndInterfaces.forEach(interface => {
    const declarations = interface.getSymbol().getDeclarations()
    const InterfaceJsDocTags = declarations
      .map(declaration => declaration.getJsDocs())
      .flat()
      .map(jsDoc => jsDoc.getTags())
      .flat()
    const mainTags = parseDocTag(InterfaceJsDocTags)
    if (!mainTags.title) return
    const item = { title: mainTags.title, properties: [] }
    const type = interface.getType()
    const properties = typeChecker.getPropertiesOfType(type)
    const lost = []
    properties.forEach(property => {
      const declarations1 = property.getDeclarations()
      const propertyJsDocTags = parseDocTag(
        declarations1
          .map(d => d.getJsDocs())
          .flat()
          .map(jsDoc => jsDoc.getTags())
          .flat()
      )
      if (!propertyJsDocTags.cn) {
        if (!propertyJsDocTags.inner) lost.push(property.getName())
        return
      }
      const nodeType = declarations1[0].getType().getNonNullableType()
      const typeText = getTypeStr(propertyJsDocTags.override, nodeType)
      item.properties.push({
        name: property.getName(),
        tag: Object.keys(propertyJsDocTags).reduce(
          (result, i) => ({ ...result, [i]: convertQuotes(propertyJsDocTags[i] || '') }),
          {}
        ),
        type: typeText,
      })
      // console.log(property.getName(), propertyJsDocTags, typeText)
    })
    if (lost.length) {
      console.log(`${mainTags.title}缺失`, lost.join(','))
    }
    results.push(item)
  })
  return results
}
// const p = path.resolve(__dirname, '../../src/DataList/Props.ts')
// getPropertiesWithDocComments(p)
const ModuleMap = {
  List: 'DataList',
}
module.exports = {
  getPropertiesWithDocComments,
  ModuleMap,
}
