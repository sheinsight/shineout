const fs = require('fs')
const path = require('path')
const pack = require('../package.json')

const { version } = pack

const currentFeaturePath = path.resolve(__dirname, '../site/Components/feature/features.json')
fs.writeFileSync(currentFeaturePath, '[]')

const featurePath = path.resolve(__dirname, `../site/pages/documentation/features/${version}.json`)
if (!fs.existsSync(featurePath)) return
const content = fs.readFileSync(featurePath, 'utf-8')

fs.writeFileSync(currentFeaturePath, content)
