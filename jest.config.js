const nycConfig = require('./nyc.config')

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
  testMatch: [`**/test/src/${nycConfig.target}/*.spec.js`, '**/test/utils/**/*.spec.js'],
  // testMatch: ['**/test/utils/**/*.spec.js'],
  collectCoverageFrom: [...nycConfig.include, ...nycConfig.exclude.map(item => `!${item}`)],
  coverageDirectory: 'jest-coverage',
  // coverageReporters: ['json'],
}
