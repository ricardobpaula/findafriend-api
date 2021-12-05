const { compilerOptions } = require('./tsconfig')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
require('dotenv').config()
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  setupFiles: [
    'dotenv/config'
  ]
}
