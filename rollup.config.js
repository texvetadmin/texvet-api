import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

const plugins = targets => ([
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    // presets: [['env', { modules: false, targets }]],
    // plugins: ['babel-plugin-transform-object-rest-spread'],
    comments: false,
  }),
  resolve(),
  commonJS({
    include: 'node_modules/**',
  }),
]);

const external = ['mongoose']; // e.g. ['axios']

export default [{
  input: 'seed/seeder.js',
  // output configuration
  output: {
    file: 'dist/bundle.seeder.esm.js',
    format: 'esm',
  },
  external,
  // build es modules for node 8
  plugins: plugins({ node: '8' }),
}];
