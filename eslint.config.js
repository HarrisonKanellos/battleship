// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    { 
        files: [["src/*", "**/.js"]], 
        languageOptions: { 
            globals: globals.browser
        } 
    },
	{ 
        files: [["src/*", "**/.js"]], 
        plugins: { 
            js 
        }, 
        extends: ["js/recommended"] 
    },
]);