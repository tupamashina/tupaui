import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'rollup';
import define from 'rollup-plugin-define';
import { defineRollupSwcOption, swc } from 'rollup-plugin-swc3';

/** @type {import('type-fest').PackageJson}*/
const { peerDependencies } = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json')).toString('utf-8'),
);

export default [true, false].map((isDev) => {
  const env = isDev ? 'development' : 'production';

  return defineConfig({
    input: './src/index.ts',

    plugins: [
      define({ replacements: { 'process.env.NODE_ENV': JSON.stringify(env) } }),
      isDev && eslint({ throwOnError: true }),

      swc(
        defineRollupSwcOption({
          minify: !isDev,
          sourceMaps: true,

          jsc: {
            transform: { react: { development: isDev } },
            minify: { compress: !isDev, mangle: !isDev, sourceMap: true },
          },
        }),
      ),

      commonjs(),
      nodeResolve(),
    ],

    output: {
      file: `./dist/index.${env}.js`,
      format: 'esm',
      sourcemap: true,
    },

    external: peerDependencies && Object.keys(peerDependencies),
  });
});
