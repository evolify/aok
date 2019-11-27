import { serve } from './lib.ts'
import Context from './context.ts'
import { Middleware, compose } from './middleware.ts'
export default class Application {
  private middleware = []
  state = {}

  constructor() { }

  use(...middlewares: Middleware[]) {
    this.middleware.push(...middlewares)
    return this
  }

  async listen(port) {
    const middleware = compose(this.middleware)
    const server = serve(`:${port}`)
    for await (const req of server) {
      const ctx = new Context(req)
      await middleware(ctx)
      await req.respond(ctx.res.toServerResponse())
    }
  }
}
