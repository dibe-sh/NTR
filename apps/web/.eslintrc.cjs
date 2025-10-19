module.exports = {
  root: true,
  extends: ['@fd-tracker/eslint-config/react'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: ['dist', '*.config.*'],
};
