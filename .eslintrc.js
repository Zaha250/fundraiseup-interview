module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "react-app",
        "plugin:react/recommended"
    ],
    rules: {
        "no-duplicate-imports": "warn",
        "no-unused-vars": "warn",
        "react/prop-types": 'off',
        "import/no-anonymous-default-export": ["warn", {
            "allowArray": true,
            "allowObject": true
        }]
    }
};