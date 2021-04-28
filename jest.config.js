const { defaults } = require('jest-config');

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    globals: {
        NODE_ENV: 'test'
    },
    setupFiles: [
        './__tests__/setupJest.js'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
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
