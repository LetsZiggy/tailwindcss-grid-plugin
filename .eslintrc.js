"use strict"

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    ecmaVersion: 2020,
  },
  "plugins": [ "import", "node", "promise" ],
  "env": {
    es6: true,
    node: true,
  },
  "extends": [ "standard" ],
  "rules": {
    // ---Possible Errors--- //

    "no-inner-declarations": [ "error" ], // Overwrite StandardJS

    // ---Best Practices--- //

    // ---Strict Mode--- //

    // ---Variables--- //

    "no-unused-vars": [ "warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // Overwrite StandardJS

    // ---Stylistic Issues--- //

    "array-bracket-spacing": [ "error", "always", { arraysInArrays: false, objectsInArrays: false }], // Overwrite StandardJS

    "brace-style": [ "error", "stroustrup", { allowSingleLine: true }], // Overwrite StandardJS

    "comma-dangle": [ "error", "always-multiline" ], // Overwrite StandardJS

    "indent": [ "error", 2, { SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: "off", FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, ignoreComments: false, ignoredNodes: [ "TemplateLiteral *" ] }], // Overwrite StandardJS

    "no-multiple-empty-lines": [ "error", { max: 3, maxEOF: 1, maxBOF: 1 }], // Overwrite StandardJS

    "one-var": [ "error", "never" ], // Overwrite StandardJS

    "operator-assignment": [ "error", "always" ], // Set

    "quote-props": [ "error", "consistent-as-needed", { keywords: true }], // Overwrite StandardJS

    "quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true }], // Overwrite StandardJS

    // ---ECMAScript 6--- //

    "arrow-parens": [ "error", "always" ], // Set

    "template-curly-spacing": [ "error", "always" ], // Overwrite StandardJS
  },
  "overrides": [],
}
