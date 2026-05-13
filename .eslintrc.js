module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    /* React rules */
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    'react/destructuring-assignment': 'off',
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    /* A11y rules */
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",

    /* Base ESLint rules */
    "no-empty-function": "error",
    "no-nested-ternary": "off",
    "linebreak-style": "off",
    "no-sequences": "off",
    "no-console": [
      "warn",
      {
        allow: ["error"],
      },
    ],
    "no-unused-vars": "warn",
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],

    /* Import rules */
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.{stories,test}.{js,jsx}",
          "**/setupTests.{js,jsx}",
        ],
        optionalDependencies: false,
      },
    ],
    "import/newline-after-import": [
      "error",
      {
        count: 1,
        considerComments: true,
      },
    ],
  },
  overrides: [
    {
      "files": [
        "**/*.test.js",
        "**/*.test.jsx",
        "setupTests.js"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
