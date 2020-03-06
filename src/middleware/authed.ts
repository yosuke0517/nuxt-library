/**
 * 認証が必要なページで未認証の場合はリダイレクトする
 */
export default function({ store, redirect }) {
  if (
    store.state.authenticate.id === null ||
    typeof store.state.authenticate.id === 'undefined'
  ) {
    redirect('/login')
  }
}
