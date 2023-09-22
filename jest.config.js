module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testEnvironment: "jsdom"
}