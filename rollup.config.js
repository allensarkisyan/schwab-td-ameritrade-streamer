import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const sharedConfig = {
  // external: [],
  external: ['xml-js', 'eventemitter3'],
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
        file: 'dist/td-streamer.js',
        format: 'cjs'
      },
      {
        file: 'dist/td-streamer.mjs',
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
        file: 'dist/td-constants.js',
        format: 'cjs'
      },
      {
        file: 'dist/td-constants.mjs',
        format: 'es'
      },
    ],
    ...sharedConfig
  },
  {
    input: 'src/td-stream-event-processor.js',
    output: [
      {
        file: 'dist/td-stream-event-processor.js',
        format: 'cjs'
      },
      {
        file: 'dist/td-stream-event-processor.mjs',
        format: 'es'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external,'./td-notifications.js'],
  },
  {
    input: 'src/td-notifications.js',
    output: [
      {
        file: 'dist/td-notifications.js',
        format: 'cjs'
      },
      {
        file: 'dist/td-notifications.mjs',
        format: 'es'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external,'./td-notifications.js'],
  },
];