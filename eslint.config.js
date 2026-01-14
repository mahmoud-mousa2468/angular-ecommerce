import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.html'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
];
