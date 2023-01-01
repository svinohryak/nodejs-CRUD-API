module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    // extends: 'standard-with-typescript',
    extends: [
        "standard-with-typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:jest/recommended",
        "plugin:promise/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "eslint-comments", "jest", "promise", "import", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        "no-use-before-define": [
            "error",
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                functions: false,
                classes: true,
                variables: true,
                typedefs: true,
            },
        ],
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "./tsconfig.json",
            },
        },
    },
};
