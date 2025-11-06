module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'boundaries'
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'app/*',
      },
      {
        type: 'processes',
        pattern: 'processes/*',
      },
      {
        type: 'pages',
        pattern: 'pages/*',
      },
      {
        type: 'widgets',
        pattern: 'widgets/*',
      },
      {
        type: 'features',
        pattern: 'features/*',
      },
      {
        type: 'entities',
        pattern: 'entities/*',
      },
      {
        type: 'shared',
        pattern: 'shared/*',
      },
    ],
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'app',
            allow: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'processes',
            allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'pages',
            allow: ['widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'widgets',
            allow: ['features', 'entities', 'shared'],
          },
          {
            from: 'features',
            allow: ['entities', 'shared'],
          },
          {
            from: 'entities',
            allow: ['shared'],
          },
          {
            from: 'shared',
            allow: ['shared'],
          },
        ],
      },
    ],
  },
}