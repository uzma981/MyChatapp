export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".js"] }],
    "linebreak-style": ["error", "windows"],
  },
};
