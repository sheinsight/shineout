import { isObject } from '../utils/is'
import { curry } from '../utils/func'

const quoteReg = /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/g
const emptyFuncReg = /([\w|\d$]+)\s*\(\s*\)/
const funcReg = /([\w|\d$]+)\s*\((.+)\)/
const numberReg = /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i
const strArgReg = /\[(\d+)\]/

function getSingleRule(str, ss) {
  const firstQuote = str.indexOf('(')
  if (firstQuote < 0) return [str.trim()]

  let match = emptyFuncReg.exec(str)
  if (match) return [match[1]]

  match = funcReg.exec(str)
  if (!match) throw new Error(`"${str}" is not a valid rule.`)

  const rule = []
  rule.push(match[1])
  match[2].split(',').forEach((arg) => {
    arg = arg.trim()
    if (numberReg.test(arg)) {
      rule.push(parseFloat(arg))
      return
    }
    const m = strArgReg.exec(arg)
    if (!m) throw new Error(`Rule argument expect a number or a string. Do you missing the quotes of "${arg}"?`)
    rule.push(ss[m[1]])
  })

  return rule
}

export function splitRule(str) {
  const matchs = str.match(quoteReg) || []

  const arr = []
  let newString = str

  matchs.forEach((m, i) => {
    arr.push(m.substring(1, m.length - 1).replace(/\\/g, ''))
    newString = newString.replace(m, `[${i}]`)
  })

  const rules = []
  newString.split(';').forEach((s) => {
    if (s) rules.push(getSingleRule(s, arr))
  })

  return rules
}

export const convertRule = curry((rule, arr) => {
  const [method, ...args] = arr
  if (!rule[method]) throw new Error(`Method "${method}" is not existed.`)

  return rule[method](...args)
})

export default function (rule, str) {
  if (!isObject(rule) || !str) {
    console.error(new Error('Convert arguments expect an Rule object and a string.'))
    return []
  }

  try {
    const convert = convertRule(rule)
    return splitRule(str).map(convert)
  } catch (e) {
    throw new Error(`Conver string "${str}" to rules failed. ${e.message}`)
  }
}
