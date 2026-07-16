// eslint.config.js
const { defineConfig } = require("eslint/config");
import globals from "globals";

module.exports = defineConfig([
    { 
        files: [["src/*", "**/.js"]], 
        languageOptions: { 
            globals: {
                ...globals.browser,
                ...globals.jest,
            }
        },
    },
	{ 
        files: [["src/*", "**/.js"]], 
        plugins: { 
            js 
        }, 
        extends: ["js/recommended"] 
    },
]);