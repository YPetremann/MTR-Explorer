/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-tailwindcss/scss"],
  rules: {
    "selector-max-id": 0,
  },
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  allowEmptyInput: true,
  fix: true,
};
