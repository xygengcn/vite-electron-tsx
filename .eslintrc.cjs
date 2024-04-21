module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // 允许包含单引号的字符串使用双引号
        allowTemplateLiterals: true // 允许使用模板字符串
      }
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 1
      }
    ],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 0
  }
};
