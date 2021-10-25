const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: tsjPreset.transform,
  preset: '@shelf/jest-mongodb',
  // testEnvironment: 'node', // comment out for jest-mongodb
  testPathIgnorePatterns: ['__mocks__'],
  clearMocks: true,
};
