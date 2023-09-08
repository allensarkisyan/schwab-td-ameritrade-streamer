import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const sharedConfig = {
  // external: [],
  external: ['xml-js', 'eventemitter3', 'isomorphic-ws'],
  plugins: [
    // nodeResolve(),
    commonjs(),
  ],
};

export default [
  {
    input: 'src/td-streamer.js',
    output: [
      {
        file: 'dist/commonjs/td-streamer.js',
        format: 'cjs'
      },
      {
        file: 'dist/esm/td-streamer.js',
        format: 'es'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external, './td-constants.js', './td-stream-event-processor.js', './td-notifications.js'],
  },
  {
    input: 'src/td-constants.js',
    output: [
      {
        file: 'dist/commonjs/td-constants.js',
        format: 'cjs'
      },
      {
        file: 'dist/esm/td-constants.js',
        format: 'es'
      },
    ],
    ...sharedConfig
  },
  {
    input: 'src/td-stream-event-processor.js',
    output: [
      {
        file: 'dist/commonjs/td-stream-event-processor.js',
        format: 'cjs'
      },
      {
        file: 'dist/esm/td-stream-event-processor.js',
        format: 'es'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external, './td-constants.js', './td-notifications.js'],
  },
  {
    input: 'src/td-notifications.js',
    output: [
      {
        file: 'dist/commonjs/td-notifications.js',
        format: 'cjs'
      },
      {
        file: 'dist/esm/td-notifications.js',
        format: 'es'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external,'./td-notifications.js'],
  },
];