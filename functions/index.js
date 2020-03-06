const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt') // ビルドしたnuxtプロジェクト

const app = express()
const config = {
  dev: false,
  buildDir: 'nuxt',
  publicPath: '/assets/'
}
const nuxt = new Nuxt(config)
app.use(async (req, res, next) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})
exports.ssr = functions.https.onRequest(app)
