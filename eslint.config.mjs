import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import tsParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            "no-unused-vars": "error", 
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "react/jsx-indent": [2, 4],
            "react/jsx-indent-props": [2, 4],
            indent: [2, 4],
            "react/jsx-filename-extension": [
                2,
                { extensions: [".js", ".jsx", ".tsx"] },
            ],
            "import/no-unresolved": "off",
            "import/prefer-default-export": "off",
            "react/require-default-props": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-props-no-spreading": "warn",
            "react/function-component-definition": "off",
            "no-shadow": "off",
            "import/extensions": "off",
            "import/no-extraneous-dependencies": "off",
            "no-underscore-dangle": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "error",
            "react/display-name": "off",
        },
        plugins: {
            tseslint,
            "react-hooks": reactHooks,
            "unused-imports": unusedImports,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                __IS_DEV__: true,
                __API__: true,
                __PROJECT__: true,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]
