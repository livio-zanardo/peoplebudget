module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: ["google", "prettier"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error"
    }
};
