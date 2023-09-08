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
        format: 'es'
      },
      {
        file: 'dist/td-streamer.cjs',
        format: 'cjs'
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
        format: 'es'
      },
      {
        file: 'dist/td-constants.cjs',
        format: 'cjs'
      },
    ],
    ...sharedConfig
  },
  {
    input: 'src/td-stream-event-processor.js',
    output: [
      {
        file: 'dist/td-stream-event-processor.js',
        format: 'es'
      },
      {
        file: 'dist/td-stream-event-processor.cjs',
        format: 'cjs'
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
        format: 'es'
      },
      {
        file: 'dist/td-notifications.cjs',
        format: 'cjs'
      },
    ],
    ...sharedConfig,
    external: [...sharedConfig.external,'./td-notifications.js'],
  },
];