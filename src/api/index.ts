// import express from 'express'
// const router = express.Router()
// const app = express()
// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, app.request)
//   Object.setPrototypeOf(res, app.response)
//   req.res = res
//   res.req = req
//   next()
// })

// // API: /api/login
// router.post('/login', (req: any, res) => {
//   if (req.body.authUser) {
//     req.session.authUser = req.body.authUser // セッションにつめる
//     return res.json(req.body.authUser) // レスポンスはそのまま返す
//   }
//   res.status(401).json({ message: 'Bad credentials' })
// })

// // API: /api/logout
// router.post('/logout', (req: any, res) => {
//   delete req.session.authUser // セッションの削除
//   res.json({ ok: true })
// })

// // Export the server middleware
// export default {
//   path: '/api',
//   handler: router
// }
