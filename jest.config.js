module.exports = {
  setupFiles: ['<rootDir>/test/jest.init.js'],
  moduleNameMapper: {
    '^shineout': '<rootDir>/src',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  globals: {
    SO_PREFIX: 'so',
  },
  modulePathIgnorePatterns: ['publish'],
}
