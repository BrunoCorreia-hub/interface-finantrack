# React + TypeScript + Vite

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) para atualização rápida
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) para atualização rápida

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo um aplicativo de produção, recomendo atualizar a configuração para habilitar regras de lint com reconhecimento de tipo:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Outras configurações...

      // Remova o arquivo tseslint.configs.recommended e substitua-o por este.
      ...tseslint.configs.recommendedTypeChecked,
      // Alternativamente, use isso para regras mais rígidas.
      ...tseslint.configs.strictTypeChecked,
      // Opcionalmente, adicione isto para regras de estilo.
      ...tseslint.configs.stylisticTypeChecked,

      // Outras configurações...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // Outras configurações...
    },
  },
])
```

Você também pode instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) Para regras de lint específicas do React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Outras configurações...
      // Ative as regras de lint para React.
      reactX.configs['recommended-typescript'],
      // Ative as regras de lint para o DOM do React.
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // Outras configurações...
    },
  },
])
```
