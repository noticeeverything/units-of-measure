module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: '<rootDir>/src/test-setup.ts',
    roots: ['<rootDir>/src'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json',
        },
    },
};
