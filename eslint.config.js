const js = require("@eslint/js");
const globals = require("globals");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefreshModule = require("eslint-plugin-react-refresh");
const prettierConfig = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");

const reactRefresh = reactRefreshModule.default || reactRefreshModule;

const applicationFiles = [
  "src/**/*.{js,jsx,ts,tsx}",
  "vite.config.js",
  "tailwind.config.js",
];
const commonJsFiles = ["eslint.config.js", "postcss.config.js"];
const typeScriptFiles = ["src/**/*.{ts,tsx}"];

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "package-lock.json"],
  },
  {
    files: applicationFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      ...reactHooks.configs.flat.recommended.plugins,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      ...prettierConfig.rules,
      "react/prop-types": "off",
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: typeScriptFiles,
  })),
  {
    files: commonJsFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
];
