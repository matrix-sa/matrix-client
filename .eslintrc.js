/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    "vue/script-indent": ["error", 0, {
      "baseIndent": 0,
      "switchCase": 0,
      "ignores": []
    }]
  },
}
