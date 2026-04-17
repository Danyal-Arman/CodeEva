import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'

export default [
  { ignores: ['dist'] },

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
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🔥 Important rules
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'import/no-unresolved': 'error', // catches wrong paths (YOUR MAIN ISSUE)
      
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
    },

    settings: {
  react: {
    version: "detect",
  },
  "import/resolver": {
    node: {
      extensions: [".js", ".jsx"]
    }
  }
}
  },
]