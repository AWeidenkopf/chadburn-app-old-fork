#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");
const { exec } = require("child_process");

const esbuildConfig = {
  logLevel: "info",
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outfile: "www/main.js",
  plugins: [cssModulesPlugin()],
  loader: { ".svg": "file" },
};

let signalingUrl = '"ws://localhost:4444"';

if (["production", "prod"].includes(process.env.NODE_ENV)) {
  esbuildConfig.minify = true;
  signalingUrl = '"ws://signaling.chadburn.app:4444"';
}

if (["development", "dev"].includes(process.env.NODE_ENV)) {
  esbuildConfig.sourcemap = true;

  const tscPrefix = "[tsc]";
  const jsPrefix = "[js]";

  esbuildConfig.watch = {
    onRebuild(error, result) {
      if (error) {
        console.error(`${jsPrefix} watch build failed: `, error);
        return;
      }

      // after the JS build succeeds, run the TypeScript compiler.
      // use --noEmit so we don't emit any JS artifacts - we only want
      // to see error messages.
      exec("./node_modules/.bin/tsc --noEmit", (error, stdout, stderr) => {
        if (stdout) {
          console.error(
            `${tscPrefix} found TypeScript errors:\n${tscPrefix} `,
            stdout.replace("\n", `\n${tscPrefix} `)
          );
        }

        if (error) {
          console.error(`${tscPrefix} TypeScript build failed: `, error);
          return;
        }

        console.log("[watch] build succeeded:", result);
      });
    },
  };
}

esbuildConfig.define = {
  SIGNALING_URL: signalingUrl,
};

require("esbuild")
  .build(esbuildConfig)
  .catch(() => process.exit(1));
