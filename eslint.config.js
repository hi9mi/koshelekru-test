import antfu from '@antfu/eslint-config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu({
  formatters: true,
  plugins: {
    simpleImportSort,
  },
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simpleImportSort/imports': ['error', {
      groups: [
        ['^\\u0000'],
        ['^node:'],
        ['^@?\\w'],
        ['^~\/.*'],
        ['^\\\/.*'],
      ],
    }],
    'simpleImportSort/exports': 'error',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
  },
}, {
  files: ['**/*.worker.ts'],
  rules: {
    'no-restricted-globals': 'off',
  },
})
