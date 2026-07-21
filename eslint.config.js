// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
    {
        files: [["src/*", "**/.js"]],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
        },
    },
    {
        files: [["src/*", "**/.js"]],
        plugins: {
            js,
        },
        extends: ["js/recommended"],
    },
]);
