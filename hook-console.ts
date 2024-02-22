import Parse from './src/Hook/parse'
import { Encode } from './src/Transform'

// hook console
if (window.parent !== window) {
  const methods = [
    'log',
    'debug',
    'info',
    'warn',
    'error',
    'table',
    'clear',
    'time',
    'timeEnd',
    'count',
    'assert',
  ]

  methods.forEach((method) => {
    const prevFn = console[method]

    console[method] = function (...args: any[]) {
      prevFn(...args)

      const parsed = Parse(method as never, args)
      if (parsed) {
        parent.window.postMessage(
          { type: 'console', data: Encode(parsed) },
          '*'
        )
      }
    }
  })
}
