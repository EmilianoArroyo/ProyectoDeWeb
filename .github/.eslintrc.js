module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Aquí puedes personalizar las reglas
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off', // Desactivar la comprobación de tipos de las props si usas TypeScript
  },
};

