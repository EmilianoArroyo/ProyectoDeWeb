import { Linter } from "eslint";

export default [
  {
    // Define language options
    languageOptions: {
      ecmaVersion: 2021, // Use ES2021 features
      sourceType: "module", // Allow ES modules
      globals: {
        $: "readonly",         // For jQuery
        Swal: "readonly",      // For SweetAlert
        __dirname: "readonly", // Node.js global
        process: "readonly",   // Node.js global
        require: "readonly",   // Node.js global
        module: "readonly",    // Node.js global
        exports: "readonly"    // Node.js global
      }
    },

    // Extend recommended rules
    linterOptions: {
      reportUnusedDisableDirectives: true // Warn about unused `eslint-disable` comments
    },
    rules: {
      "no-undef": "error",               // Disallow undefined variables
      "no-unused-vars": "warn",          // Warn about unused variables
      "no-console": "off",               // Allow console.log for debugging
      "no-constant-binary-expression": "error", // Prevent constant conditions
      "prefer-const": "error",           // Prefer `const` over `let`
      "eqeqeq": "error",                 // Enforce strict equality
      "semi": ["error", "always"],       // Enforce semicolons
      "quotes": ["error", "single"]      // Enforce single quotes
    },

    // Ignore specific files or folders
    ignores: [
      "node_modules/",
      "public/assets/libs/", // Ignore third-party libraries
      "dist/",              // Ignore build folder
      "*.min.js"            // Ignore minified files
    ]
  }
];
