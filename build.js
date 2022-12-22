#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "www/main.js",
    plugins: [cssModulesPlugin()],
    loader: { ".svg": "file" },
    sourcemap: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("[js] watch build failed:", error);

        // TODO run the typescript compiler here
        // if the typescript compiler fails:
        // console.error("[ts] watch build failed:", error);

        console.log("[js|ts] watch build succeeded:", result);
      },
    },
  })
  .catch(() => process.exit(1));
