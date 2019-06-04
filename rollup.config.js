import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

const plugins = targets => ([
  babel({
    exclude: 'node_modules/**',
    comments: false,
    runtimeHelpers: true,
  }),
  resolve(),
  commonJS({
    include: 'node_modules/**',
  }),
]);

const external = ['mongoose']; // e.g. ['axios']

export default [{
  input: 'seed/seeder.js',
  output: {
    file: 'dist/bundle.seeder.cjs.js',
    format: 'cjs',
  },
  external,
  plugins: plugins({ node: '8' }),
}];
