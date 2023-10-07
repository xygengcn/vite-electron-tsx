import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import { join } from 'path';

/**
 * 启动配置
 */
export default (options) => {
  return options.map((option) => {
    return {
      input: option.input,
      output: {
        file: option.output,
        format: 'cjs',
        name: option.name,
        sourcemap: true
      },
      plugins: [
        nodeResolve({ preferBuiltins: true, browser: true }),
        commonjs(),
        json(),
        esbuild({
          include: /\.[jt]sx?$/,
          exclude: /node_modules/,
          sourceMap: process.env.NODE_ENV === 'development',
          minify: process.env.NODE_ENV !== 'development',
          target: 'esnext',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
          define: {
            __VERSION__: '"x.y.z"'
          },
          loaders: {
            '.json': 'json',
            '.js': 'jsx'
          }
        }),
        alias({
          entries: [{ find: '@', replacement: join(__dirname, '../../src/render') }]
        })
      ],
      external: [
        'crypto',
        'assert',
        'fs',
        'util',
        'os',
        'events',
        'child_process',
        'http',
        'https',
        'path',
        'electron'
      ]
    };
  });
};
