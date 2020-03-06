const middleware = {}

middleware['auth-cookie'] = require('../src/middleware/auth-cookie.ts')
middleware['auth-cookie'] = middleware['auth-cookie'].default || middleware['auth-cookie']

middleware['authed'] = require('../src/middleware/authed.ts')
middleware['authed'] = middleware['authed'].default || middleware['authed']

export default middleware
