import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _eec118fc = () => interopDefault(import('../src/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _165cd6de = () => interopDefault(import('../src/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _16ac97b8 = () => interopDefault(import('../src/pages/my-page.vue' /* webpackChunkName: "pages/my-page" */))
const _1c8a2ac0 = () => interopDefault(import('../src/pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _089393fd = () => interopDefault(import('../src/pages/books/_id.vue' /* webpackChunkName: "pages/books/_id" */))
const _2b29f17a = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _eec118fc,
    name: "inspire"
  }, {
    path: "/login",
    component: _165cd6de,
    name: "login"
  }, {
    path: "/my-page",
    component: _16ac97b8,
    name: "my-page"
  }, {
    path: "/signup",
    component: _1c8a2ac0,
    name: "signup"
  }, {
    path: "/books/:id?",
    component: _089393fd,
    name: "books-id"
  }, {
    path: "/",
    component: _2b29f17a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
