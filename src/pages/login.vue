<template>
  <div class="login">
    <v-alert color="primary" dark icon="mdi-book" border="left">
      図書の貸出しにはユーザ登録・ログインが必要です
    </v-alert>
    <div v-if="messageFlg">
      <v-alert :type="type">
        {{ message }}
      </v-alert>
    </div>
    <v-form ref="form" lazy-validation>
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

      <v-btn color="green" class="mr-4" @click="login">
        ログイン
      </v-btn>
      <v-btn color="yellow" class="signup-btn mr-4" to="signup">
        ユーザ登録
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>
      <v-btn color="info" class="mr-4" @click="easyLogin">
        かんたんログイン
      </v-btn>
    </v-form>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { AxiosError } from 'axios'
import { i18n } from '~/plugins/nuxt-i18n'
import { InputUserFilter } from '~/types/authenticate/input-user-filter'
import CommonMessage from '~/mixins/common-message'

@Component({})
export default class Login extends Mixins(CommonMessage) {
  name: string = ''
  email: string = ''
  password: string = ''
  passwordConfirmation: string = ''
  message: string = ''
  type: string = ''

  messageFlg: boolean = false

  async login() {
    // TODO ログインが成功したらログイン情報を返し、失敗したらnullを返すようにする
    const result = await this.$validator.validateAll()
    if (result) {
      const loginUserFilter: InputUserFilter = {
        email: this.email,
        password: this.password
      }
      await this.$store
        .dispatch('authenticate/login', loginUserFilter)
        .catch((error: AxiosError) => {
          this.message = error.message
          this.type = 'error'
          this.messageFlg = true
        })
        .finally(() => {
          // TODO ローディング終了処理
        })
      if (this.$store.state.authenticate.loginStatus) {
        this.$router.push('/')
        // serverMiddlewareを呼び出してセッションに保存
        // await axios.post('/api/login', { authUser: this.$store.state.User })
      }
    } else {
      this.messageFlg = true
      this.message = i18n.tc('error.E-0005')
    }
  }

  reset() {
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordConfirmation = ''
    this.message = ''
    this.messageFlg = false
  }

  async easyLogin() {
    await this.$store
      .dispatch('authenticate/easyLogin')
      .catch((error: AxiosError) => {
        this.message = error.message
        this.type = 'error'
        this.messageFlg = true
      })
      .finally(() => {
        // TODO ローディング終了処理
      })
    if (this.$store.state.authenticate.loginStatus) {
      this.$router.push('/')
      // serverMiddlewareを呼び出してセッションに保存
      // await axios.post('/api/login', { authUser: this.$store.state.User })
    }
  }
}
</script>
<style scoped>
.signup-btn {
  color: black;
}
</style>
