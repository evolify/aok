// Copyright 2018-2019 the oak authors. All rights reserved. MIT license.

import Application from "./application.ts"
import { ServerRequest } from "./lib.ts"
import { createHttpError } from "./http_error.ts"
import { Request } from "./request.ts"
import { Response } from "./response.ts"
import { ErrorStatus } from "./types.ts"

export default class Context {
  req: Request;
  res: Response;

  constructor(serverRequest: ServerRequest) {
    this.req = new Request(serverRequest)
    this.res = new Response()
  }

  /** Create and throw an HTTP Error, which can be used to pass status
   * information which can be caught by other middleware to send more
   * meaningful error messages back to the client.
   */
  throw(errorStatus: ErrorStatus, message?: string, props?: object): never {
    const err = createHttpError(errorStatus, message);
    if (props) {
      Object.assign(err, props);
    }
    throw err;
  }
}
