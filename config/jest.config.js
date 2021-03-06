const path = require('path')

module.exports = {
  rootDir: path.resolve('packages'),
  roots: ['<rootDir>', path.resolve('samples')],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [path.resolve('node_modules/jest-enzyme/lib/index.js')],
  testEnvironment: 'enzyme',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/rollup.config.js",
    "!**/*.es.js",
    "!**/*.cjs.js"
  ],
  coverageDirectory: "../coverage",
}