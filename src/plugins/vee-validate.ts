import Vue from 'vue'
import VeeValidate from 'vee-validate'
// VeeValidateで用意されている日本語版入力チェックエラーメッセージを使う
import ja from 'vee-validate/dist/locale/ja'
// VeeValidateで用意されている英語語版入力チェックエラーメッセージを使う
import en from 'vee-validate/dist/locale/en'
// VueI18nオブジェクトをインポートする
import { i18n } from '~/plugins/nuxt-i18n'

Vue.use(
  VeeValidate,
  // オプションでi18nを指定する
  {
    i18n,
    i18nRootKey: 'validations',
    dictionary: { ja, en }
  }
)
