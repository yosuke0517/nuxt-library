import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ApiJobMixin extends Vue {
  // TODO サインアップ・ログイン・ログアウト
  removeErrors() {
    alert('removeErrors')
    this.$validator.reset()
    this.$store.commit('clearError')
  }
}
