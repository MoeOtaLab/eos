import { defineConfig } from 'rollup';
import * as clear from 'rollup-plugin-clear';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: {
    shared: './src/index.ts'
  },
  output: [
    {
      dir: 'output',
      format: 'cjs',
      sourcemap: true,
      entryFileNames(chunkInfo) {
        return `cjs/eos-${chunkInfo.name}.js`;
      },
      chunkFileNames(chunkInfo) {
        return `cjs/eos-${chunkInfo.name}.js`;
      }
    },
    {
      dir: 'output',
      format: 'esm',
      sourcemap: true,
      entryFileNames(chunkInfo) {
        return `esm/eos-${chunkInfo.name}.js`;
      },
      chunkFileNames(chunkInfo) {
        return `esm/eos-${chunkInfo.name}.js`;
      }
    }
  ],
  plugins: [
    clear({
      targets: ['output']
    }),
    typescript({ module: 'ESNext', include: ['src/**'] })
  ]
});
