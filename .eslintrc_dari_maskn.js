module.exports = {
  env: {
    es2021: true,
    node  : true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType : 'module',
  },
  rules: {
    'no-unused-vars'                   : 'warn',
    'key-spacing'                      : ['error', { align: 'colon' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  }
}
