import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // React Hooks 检查（保留，避免 Hooks 使用错误）
      ...reactHooks.configs.recommended.rules,
      
      // 单人开发友好规则 - 降级为警告或关闭
      '@typescript-eslint/no-unused-vars': 'warn', // 未使用变量仅警告
      '@typescript-eslint/no-explicit-any': 'off', // 允许 any 类型（灵活开发）
      '@typescript-eslint/no-empty-object-type': 'off', // 允许空对象类型
      '@typescript-eslint/no-unsafe-function-type': 'off', // 允许 Function 类型
    },
  },
)
