const { defaults } = require('jest-config');

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    globals: {
        NODE_ENV: 'test'
    },
    setupFiles: [
        './__tests__/setupJest.js'
    ],
    modulePaths: [
        './src'
    ],
    testMatch: [
        '<rootDir>/__tests__/**/*.+(js)?(x)',
        '<rootDir>/src/**/?(*.)(spec|test).+(js)?(x)'
    ],
    testPathIgnorePatterns: [
        './node_modules/',
        './__tests__/setupJest.js'
    ],
    coveragePathIgnorePatterns: [
        './__tests__/',
        './src/config/'
    ]
};
