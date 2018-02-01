import {IConfig} from '@anycli/config'
import {Engine} from '@anycli/engine'

import loadConfig from './load_config'

/**
 * tests a anycli hook
 *
 * @example <caption>check that when the 'init' hook is ran it outputs "this output"</caption>
 * testHook('init', {id: 'mycommand'}, {stdout: true}, output => {
 *   expect(output.stdout).to.contain('this output')
 * })
 *
 * @param event - hook to run
 * @param hookOpts - options to pass to hook. Config object will be passed automatically.
 */
export default (event?: string, hookOpts: object = {}) => ({
  async run(ctx: {config: IConfig, expectation: string}) {
    if (!ctx.config) ctx.config = await loadConfig().run({} as any)
    ctx.expectation = ctx.expectation || `runs ${event} hook`
    const EEngine: typeof Engine = require('@anycli/engine').Engine
    const engine = new EEngine()
    await engine.load(ctx.config)
    await engine.runHook(event!, hookOpts || {})
  }
})
