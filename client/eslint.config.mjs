import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "eslint:recommended"],
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      quotes: ["error", "single", { avoidEscape: true }],
    },
  }),
];

export default eslintConfig;
