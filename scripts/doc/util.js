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

// 一些逻辑处理
function replaceStr(str) {
  console.log('str', str)
  return str
    .replaceAll('boolean | React.ReactChild | React.ReactFragment | React.ReactPortal', 'ReactNode')
    .replaceAll('React.', '')
    .replaceAll('ReactElement<any, string | JSXElementConstructor<any>>', 'ReactElement')
    .replaceAll('| undefined', '')
    .replace(/import\("([^"]+)"\)\./g, '')
}

function getPathType(pp, name) {
  const sourceFile = project.addSourceFileAtPath(pp)
  const type = sourceFile.getTypeAlias(name) || sourceFile.getInterface(name)
  if (type) {
    return replaceStr(type.getTypeNode().getText())
  }
  return ''
}

function convertQuotes(str) {
  return str.replaceAll('"', '\\"').replaceAll("'", '\\"')
}

function getImportType(text) {
  const reg = /import\("([^"]+)"\)\.(\w+)\s*/g
  let currentMatch
  const results = []
  do {
    currentMatch = reg.exec(text)
    if (currentMatch) {
      const pp = currentMatch[1]
      const name = currentMatch[2]
      // 过滤掉 xxxProps 和 ObjectKey
      if (!name.endsWith('Props') && !['ObjectKey'].includes(name)) {
        results.push(name)
        if (!pathMap[name]) {
          pathMap[name] = {
            form: pp,
            type: getPathType(`${pp}.ts`, name),
          }
        }
      }
    }
  } while (currentMatch !== null)
  return results
}

function getTypeStr(override, type) {
  if (override && override !== 'union') {
    return override
  }
  let text = type.getText()
  if (override === 'union') {
    text = type
      .getUnionTypes()
      .map(t => t.getText())
      .join(' | ')
  }
  const names = getImportType(text)
  let result = replaceStr(text)
  names.forEach(name => {
    result = result.replaceAll(name, pathMap[name].type)
  })
  return convertQuotes(result)
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
    properties.forEach(property => {
      const declarations1 = property.getDeclarations()
      const propertyJsDocTags = parseDocTag(
        declarations1
          .map(d => d.getJsDocs())
          .flat()
          .map(jsDoc => jsDoc.getTags())
          .flat()
      )
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
    results.push(item)
  })
  return results
}
const p = path.resolve(__dirname, '../../src/Breadcrumb/Props.ts')
getPropertiesWithDocComments(p)
const ModuleMap = {
  List: 'DataList',
}
module.exports = {
  getPropertiesWithDocComments,
  ModuleMap,
}
