import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: 'output/eos-core.cjs.js',
      format: 'cjs',
    },
    {
      file: 'output/eos-core.esm.js',
      format: 'esm',
    },
  ],
  plugins: [typescript({ module: 'ESNext' })],
});
