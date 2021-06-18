import RollupConfig from './rollup.config';
import { join } from 'path';
export default RollupConfig([
  {
    name: 'MainBundle',
    input: join(__dirname, '../../src/main/index.ts'),
    output: join(__dirname, '../../dist/main/index.js')
  },
  {
    name: 'PreloadBundle',
    input: join(__dirname, '../../src/preload/index.ts'),
    output: join(__dirname, '../../dist/preload/index.js')
  }
]);
