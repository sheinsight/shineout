const ts = require('typescript')
const fs = require('fs')
// const path = require('path')

function getDocTag(node) {
  if (!node) return {}
  const jsDocTags = ts.getJSDocTags(node)
  const jsDocTagsMap = {}
  jsDocTags.forEach(tag => {
    if (tag.tagName && tag.tagName.escapedText) {
      jsDocTagsMap[tag.tagName.escapedText] = tag.comment
    }
  })
  return jsDocTagsMap
}

function convertQuotes(str) {
  return str.replaceAll('"', '\\"').replaceAll("'", '\\"')
}

function getPropertiesWithDocComments(sourceFile) {
  try {
    if (!fs.statSync(sourceFile).isFile()) return []
  } catch (e) {
    return []
  }
  const program = ts.createProgram([sourceFile], {})
  const checker = program.getTypeChecker()
  const info = []

  function inspectNode(node) {
    const { title } = getDocTag(node)
    if (title && (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node))) {
      const symbol = checker.getSymbolAtLocation(node.name)
      // const d = ts.displayPartsToString(symbol.getDocumentationComment(checker))
      const item = { title, properties: [] }
      const type = checker.getTypeAtLocation(node)
      // const baseTypes = type.getBaseTypes()
      const properties = type.getProperties()

      // ;(baseTypes || []).forEach(baseType => {
      //   properties.push(...baseType.getProperties())
      // })

      properties.forEach(property => {
        // const comments = ts.displayPartsToString(property.getDocumentationComment(checker))
        const propertyDeclaration = property.valueDeclaration || property.getDeclarations()[0]
        // 获取@注释
        const jsDocTags = getDocTag(propertyDeclaration)
        if (!jsDocTags.cn) return

        let finalNameTypeString = ''
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        if (jsDocTags.override && jsDocTags.override !== 'union') {
          finalNameTypeString = jsDocTags.override
        } else {
          const finalNameType = checker.getTypeAtLocation(property.declarations[0].type)

          const finalNameTypeNode = checker.typeToTypeNode(finalNameType)
          // 将类型信息转化为 TypeScript 字符串
          finalNameTypeString = printer.printNode(ts.EmitHint.Unspecified, finalNameTypeNode, sourceFile)
        }

        // 计算 xxxType 的联合类型
        const propertyType = checker.getTypeOfSymbolAtLocation(property, symbol)
        if ((/^.+Type$/.test(finalNameTypeString) || jsDocTags.override === 'union') && propertyType.types) {
          const unType = ts.createUnionTypeNode(propertyType.types.map(t => checker.typeToTypeNode(t)))
          finalNameTypeString = printer.printNode(ts.EmitHint.Unspecified, unType, sourceFile)
        }
        // console.log(`${property.name}:`, JSON.stringify(jsDocTags), finalUnionTypeString)
        // console.log(`${property.name}:`, finalNameTypeString)
        if (jsDocTags && jsDocTags.cn) {
          item.properties.push({
            name: property.name,
            tag: Object.keys(jsDocTags).reduce(
              (result, i) => ({ ...result, [i]: convertQuotes(jsDocTags[i] || '') }),
              {}
            ),
            type: convertQuotes(finalNameTypeString),
          })
        }
      })
      info.push(item)
    }

    ts.forEachChild(node, inspectNode)
  }
  const file = program.getSourceFile(sourceFile)
  inspectNode(file)
  // console.log(sourceFile)
  // console.log(info)
  return info
}
// getPropertiesWithDocComments(path.resolve(__dirname, '../../src/Input/Props.ts'))
const ModuleMap = {
  List: 'DataList',
}
module.exports = {
  getPropertiesWithDocComments,
  ModuleMap,
}
