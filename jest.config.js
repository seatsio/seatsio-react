module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|cjs)"
  ],
  "transform": {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
}