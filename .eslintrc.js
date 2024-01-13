module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'prettier'
  ],
  'rules': {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'n/no-callback-literal': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'semi', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
      multilineDetection: 'brackets',
    }],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    "comma-dangle": 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/array-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    'generator-star-spacing': 'off',
    '@typescript-eslint/brace-style': 'off',
    'multiline-ternary': 'off',
  }
}
