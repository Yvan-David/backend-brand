module.exports = {
    preset: 'ts-jest',
    testPathIgnorePatterns: ['<rootDir/node_modules>/'],
},
// jest.config.js or in package.json
{
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    // other Jest configurations...
  }
