// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]



import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "no-console": "warn", // Disallows the use of console statements to prevent debug output in production code.

      "prefer-const": "error",  // Enforces the use of 'const' for variables that are not reassigned, promoting immutability.
      
      "no-unused-vars": "warn",  // Warns about declared variables that are never used, improving code cleanliness and maintainability.
      

      // "no-unused-vars": ["warn"],
      // "linebreak-style": ["warn", "unix"],
      // "semi": ["error", "always"],
      // "quotes": ["error", "single", { "avoidEscape": true }],
      // "eqeqeq": ["warn", "always"],
      // "no-console": ["warn"],
      // "prefer-const": ["warn"],
      // "no-var": ["error"],
      // "arrow-body-style": ["warn", "as-needed"],
      // "prefer-template": ["warn"],
      // "strict": ["error", "never"]
    },
  },
];
