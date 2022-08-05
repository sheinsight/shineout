const ignoreFiles = [
  '!**/*.ts',
  '!src/Form/Block.js',
  '!src/Form/BlockField.js',
  '!src/Form/Loop.js',
  '!src/Button/Once.js',
  '!src/Checkbox/Checkbox.js',
]
const target = '**'
module.exports = {
  setupFiles: ['<rootDir>/test/jest.init.js'],
  moduleNameMapper: {
    '^shineout(.*)': '<rootDir>/src$1',
    '^doc/(.*)': '<rootDir>/site/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  // moduleFileExtensions: ['js'],
  globals: {
    SO_PREFIX: 'so',
  },
  modulePathIgnorePatterns: ['publish'],
  testMatch: [`**/test/src/${target}/*.js`],
  collectCoverageFrom: [`src/${target}`, ...ignoreFiles],
}
