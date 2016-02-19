"use strict"
let Router = require('..'),
    koa = require('koa'),
    request = require('supertest')


function createApp(router) {
    const app = koa()
    app.use(router.compose())

    return app
}


describe('Router', () => {
    it('Should make middleware-style run queuen', done => {
        let R = new Router()

        R.route('/user/::', function* (next, id) {
            this.userId = id
            yield* next
        }).route('/message', function* (next) {
            this.body = `user ${this.userId}'s message`
        })
        const app = createApp(R)

        request(app.listen())
        .get('/user/123456/message')
        .expect("user 123456's message", done)
    })

    it('Should pass URL params correctly', done => {
        let r = new Router()
        r.route('/::/shit')
        .route('::/holy', function *(next, fst, snd) {
            this.body = `oh my ${fst} ${snd}`
            yield* next
        })

        const app = createApp(r)

        request(app.listen())
        .get('/hello/shit/world/holy')
        .expect("oh my hello world", done)
    })
})
