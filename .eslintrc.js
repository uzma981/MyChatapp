module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.js'] }],
    'linebreak-style': ['error', 'windows'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-no-literals': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'no-console': 'off',
    'no-undef': ['error', { typeof: true }],
  },
};
