module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
  };
  