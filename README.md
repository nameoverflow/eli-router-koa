# eli-router-koa

Handy router [eli-router](https://github.com/NameIsUseless/eli-router) as koa middleware.

## Installation

```shell
$ npm install eli-router-koa --save
```

## Usage

```js
const Router = require('eli-router-koa')

let router = new Router()


// Add single route with URL param, :: stand for param.
router.route('/user/::', function *(next, id) {
    this.body = `User's id is ${id}`
    yield* next
})

// Nested routes
let admin_router = router.route('/admin', function *(next) {
    let hasLogin = yield this.checkSession() // Check session somehow

    if (hasLogin) {
        yield next
    } else {
        this.redirect(url_to_login)
    }
})

admin_router.route('/::', function *(next, method) {
    this.body = `Admin's ${method} operating`
})

```

More useage and APIs see [eli-router](https://github.com/NameIsUseless/eli-router)

## TODO

- `.get()` `.post()` `put()` `.delete()` methods

- URL constructor like flask's `url_for()`

- Whatever awesome