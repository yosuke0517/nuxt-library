# nuxt-library

# 図書管理アプリケーション（DEMO）

### URL:https://nuxt-library.firebaseapp.com/login

# 機能

- ログイン（かんたんログイン含む）
- ユーザ作成
- 図書一覧
  - 文字列検索
- 貸出・返却申請
- 新規図書登録

# ※後々追加したい機能

- レビュー投稿・一覧
- 新規図書の追加をバーコード読み取りで行う

# 使用技術

- Nuxt.js:2.11.1
- TypeScript:3.5.3
- firebase
  - firebase Authentication
  - Firebase Cloud firestore（DB)
  - Firebase cloud functions
  - ~~Firebase Cloud Messaging（プッシュ通知）~~（3月以降で実装予定）

# 使用技術を何に使っているのか

- 画面
  - Nuxt.js を用いて SSR を実現します
  - TypeScript を用いて静的型付け(オートコンプリート機能他)
- サーバサイド・DB・認証
  - firebase Cloud functions
    - デプロイに使用
  - firebase Cloud firestore
    - 今回データの永続化の方法として`Firebase Realtime Database`を使用しています。こちらのデータベースは`NoSQL (非リレーショナル) データベース`という方式を採用しており、様々なメリデメがありますが、今回のような小規模開発には向いていると思い採用しました。`RDBMS`との違いは以下などを参照ください。
    - [RDBMS と NoSQL を徹底比較！特徴からそれぞれのメリット・デメリットまで、わかりやすく解説！](https://geekly.co.jp/column/cat-technology/1904_005/)
  - firebase Authentication
    - 認証

# 開発工数

- 設計
  - 通勤電車の中で 2.5h（0.5h \* 5 日）
- 実装
  - 20h
- テスト・デプロイ
  - 機能に対する打鍵テストのみ：1h
  - cloud functions を用いたデプロイ：1.5h
  - `sh build.sh`
  - `firebase deploy --project nuxt-library`

# 難しかったこと

- ログイン情報の永続化
- ~~vuex-persistedstate を使い実現させました。（以下を多分に参考にさせていただきました）~~
- ~~[nuxt.js を使う時に localStorage で store を永続化する](https://qiita.com/sakapun/items/a0cf5698751ae70c8088)~~
- 紆余曲折あり`universal-cookie`を使い cookie に保存することにしました。
  - `src\store\authenticate\actions.ts`にてログイン時に cookie に保存。
  - `src\middleware\auth-cookie.ts`にて cookie から取得してます。

### メッセージについて

- メッセージは`nuxt-i18n`を使用して以下のように出力

```
import { i18n } from '~/plugins/nuxt-i18n'

this.message = i18n.tc('error.E-0006')
this.messageFlg = true
```

- 引数を入れたい時のメッセージ用に mixin を作成して対応(common-message.ts)

```
this.message = this.editMessage(i18n.tc('info.I-0003'), [
     'ユーザ登録',
     'ログイン'
   ])
```

# TODO

- 済~~しばらく間が空いてアクセスするとエラー画面になる（firebase 側が原因？）~~
- 複数エラーメッセージに対応
- 管理者画面と管理者フラグ
- ジャンル別の検索（フォームは設置しているがまだ機能していない（入力には反応する））
- モバイル時デザインが乱れる
- cloud functions の TypeScript 化
- 済~~再読み込みするとログイン画面へ戻る~~

# 参考記事

- 全体
  - [Firebase と Nuxt.js による SPA x PWA x サーバーレスアプリケーションの開発](https://qiita.com/saongtx7/items/d65f4daab97ebe84fa7e?utm_campaign=popular_items&utm_medium=feed&utm_source=popular_items)
- Nuxt
  - [VeeValidate サンプル集](https://qiita.com/motohirock/items/d1301318cf16962d23e3)
  - [SSR な Nuxt で認証情報をセッションに保存する](https://www.memory-lovers.blog/entry/2019/06/07/173000)
  - [SyntaxError Unexpected token 'export'](https://qiita.com/kozakura16/items/5cae173bcdc0dff7f9a7)
  - テーブルの中にリンクを設置するには
    - v-slot で差し込むらしい
    - [Vuetify2 の data-table の使い方を学んで、タグ一覧ページをレイアウト](https://blog.cloud-acct.com/posts/blog-vuetify2-data-table)
      - ↑ にてタイトルにリンクを設置する
      - [Nuxt.js ルーティング(nuxt-link による動的切り替え)](https://note.com/yunp_q/n/n4e6f0d94121b:embed:cite)

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
