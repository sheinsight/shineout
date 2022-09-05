const ignoreFiles = [
  '**/*.ts',
  'src/Button/Once.js',
  'src/context/*',
  'src/Checkbox/Checkbox.js',
  'src/Form/Block.js',
  'src/Form/BlockField.js',
  'src/Form/Loop.js',
  'src/Rule/convert.js',
  'src/Radio/styles/index.js',
  'src/Rule/styles/index.js',
  'src/Sticky/styles/index.js',
  'src/Tree/toggle.js',
  'src/Upload/Dragger.js',
  'src/Upload/context.js',
]
const target = '**'
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
