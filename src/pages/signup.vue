<template>
  <div class="signup">
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
      :top="true"
    >
      {{ snackMessage }}</v-snackbar
    >
    <div v-if="messageFlg">
      <v-alert :type="type">
        {{ message }}
      </v-alert>
    </div>
    <form @submit.prevent="onSignUp">
      <v-text-field
        v-model="name"
        v-validate="'required|max:10'"
        :counter="10"
        :error-messages="errors.collect('名前')"
        label="Name"
        data-vv-name="名前"
      ></v-text-field>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required|min:6'"
        type="password"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirm"
        v-validate="'required|confirmed:password'"
        type="password"
        :error-messages="errors.collect('password')"
        label="Password（確認用）"
        data-vv-name="password"
      ></v-text-field>
      <v-btn class="mr-4" color="green" @click="validation">ユーザ登録</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
// import VeeValidate from 'vee-validate'
import { AxiosError } from 'axios'
import { i18n } from '../plugins/nuxt-i18n'
import apiJobMixin from '~/mixins/api-job-mixins'
import CommonMessage from '~/mixins/common-message'
@Component({ inject: ['$validator'] })
export default class SignupPage extends Mixins(apiJobMixin, CommonMessage) {
  name: string = null

  email: string = null

  password: string = null

  passwordConfirm: string = null

  mixins: [apiJobMixin]

  message: string = ''

  messageFlg: boolean = false

  type: string = ''

  snackMessage: string = ''

  snackbar: boolean = false

  snackbarColor: string = ''

  timeout: number = 6000

  validation() {
    try {
      const result = this.$validator.validateAll()
      if (result) {
        const signUpData = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.onSignUp(signUpData)
      }
    } catch (err) {
      // this.isAlert = true
      // this.type = 'error'
      // this.message = 'エラーだよ'
      alert('error')
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  async onSignUp(signUpData) {
    // TODO ローディング開始処理
    await this.$store
      .dispatch('authenticate/signUpUser', signUpData)
      .catch((error: AxiosError) => {
        // TODO エラーハンドリング ↓でエラーダイアログが出るような共通コンポーネントを作成する必要がある
        // this.addError(error)
        // isError = true
        this.message = error.message
        this.type = 'error'
        this.messageFlg = true
      })
      .finally(() => {
        // TODO ローディング終了処理
      })

    this.snackMessage = this.editMessage(i18n.tc('info.I-0003'), [
      'ユーザ登録',
      'ログイン'
    ])
    this.snackbarColor = 'green'
    this.snackbar = true
  }

  reset() {
    this.name = ''
    this.email = ''
    this.password = ''
    this.messageFlg = false
    this.message = ''
    // VeeValidate.Validator.reset()
    // this.$validator.reset()
  }
}
</script>
