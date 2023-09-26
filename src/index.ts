import {dirname} from 'node:path'

import {fancy} from 'fancy-test'

import {command} from './command'
import exit from './exit'
import hook from './hook'
import {loadConfig} from './load-config'

function traverseFilePathUntil(filename: string, predicate: (filename: string) => boolean): string {
  let current = filename
  while (!predicate(current)) {
    current = dirname(current)
  }

  return current
}

// Update to path.dirname(url.fileURLToPath(import.meta.url)) whenever we update tsconfig target to ES2020
// eslint-disable-next-line unicorn/prefer-module
loadConfig.root = traverseFilePathUntil(require.main?.path ?? module.path, p => !p.includes('node_modules'))

export const test = fancy
.register('loadConfig', loadConfig)
.register('command', command)
.register('exit', exit)
.register('hook', hook)
.env({NODE_ENV: 'test'})

export default test

export {Config} from '@oclif/core'
export {expect, FancyTypes} from 'fancy-test'

export {command} from './command'
