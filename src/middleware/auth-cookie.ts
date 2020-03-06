import Cookies from 'universal-cookie'

export default ({ req, store }) => {
  if (process.browser) {
    const Allcookies = document.cookie // 全てのcookieを取り出して
    const cookiesArray = Allcookies.split(';') // ;で分割し配列に

    for (const c of cookiesArray) {
      // 一つ一つ取り出して
      const cArray = c.split('=') // さらに=で分割して配列に
      if (cArray[0] === 'user_id') {
        // 取り出したいkeyと合致したら
        const cookies = new Cookies(cArray)
        const userId = cookies.get('user_id')
        store.commit('authenticate/setId', { id: userId })
      }
    }
  } else {
    const cookies = new Cookies(req.headers.cookie)
    const userId = cookies.get('user_id')
    store.commit('authenticate/setId', { id: userId })
  }
}
