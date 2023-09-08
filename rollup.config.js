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
    external: ['xml-js', 'eventemitter3', './td-constants.js', './td-stream-event-processor.js', './td-notifications.js']
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
    ]
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
    external: ['xml-js', './td-notifications.js']
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
    external: ['xml-js']
  },
];