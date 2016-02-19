"use strict"
let Router = require('eli-router')

module.exports =
class RouterKoa extends Router {
    constructor() {
        super()
    }

    compose() {
        let self = this
        return function *(koa_next) {
            let next = koa_next,

                results = self.dispatch(this.req.url)


            for (let v of results) {
                 next = Router.handle(v, this, [next])
            }
            yield* next
        }
    }
}

