const ignoreFiles = [
  '**/*.ts',
  'src/Form/Block.js',
  'src/Form/BlockField.js',
  'src/Form/Loop.js',
  'src/Button/Once.js',
  'src/Checkbox/Checkbox.js',
  'src/Rule/convert.js',
  'src/Tree/toggle.js',
]
const target = 'Tooltip/**'
module.exports = {
  all: true,
  include: [`src/${target}`],
  exclude: ignoreFiles,
  reporter: ['json', 'html'],
  sourceMap: false,
  instrument: false,
  'temp-dir': 'cypress-coverage/.nyc_output',
  'report-dir': 'cypress-coverage',
  target,
}
