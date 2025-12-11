import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Next.js + Core Web Vitals + TS rules
  ...nextVitals,
  ...nextTs,

  // Your project-specific overrides
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // React / Next tweaks
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Next + a11y: customize for <Link />
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      // TypeScript relaxations
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  // Prettier integration for flat config
  eslintPluginPrettierRecommended,

  // Ignore generated / build artifacts
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
