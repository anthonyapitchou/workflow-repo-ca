import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: true,
        test: true,
        it: true,
        expect: true,
        require: true,
        module: true,
        process: true,
      },
    },
  },
  pluginJs.configs.recommended,
];
