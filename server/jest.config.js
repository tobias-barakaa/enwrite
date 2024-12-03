module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', 'jest-setup.ts'], // Exclude setup file
  };

  