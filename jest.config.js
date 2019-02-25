module.exports = {
  setupFiles: ['<rootDir>/test/jest.init.js'],
  moduleNameMapper: {
    '^shineout(.*)': '<rootDir>/src$1',
    '^doc(.*)': '<rootDir>/site$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  // moduleFileExtensions: ['js'],
  globals: {
    SO_PREFIX: 'so',
  },
  modulePathIgnorePatterns: ['publish'],
}
