<template>
  <v-app dark>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
      :top="true"
    >
      {{ snackMessage }}</v-snackbar
    >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      src="https://picsum.photos/1920/1080?random"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-btn rounded class="mr-1" color="blue darken-1" to="/">HOME</v-btn>
      <div
        v-if="
          this.$store.state.authenticate.id === null ||
            typeof this.$store.state.authenticate.id === 'undefined'
        "
      >
        <v-btn rounded color="blue darken-1" to="/login">Login</v-btn>
        <v-btn rounded color="blue darken-1" to="/signup">SignUp</v-btn>
      </div>
      <div v-else>
        <v-btn rounded color="blue darken-1" to="/" @click.native="logout"
          >LogOut</v-btn
        >
      </div>

      <v-btn icon to="/my-page">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="main-body">
      <v-content>
        <v-container>
          <h1>書籍管理</h1>
          <nuxt />
        </v-container>
      </v-content>
      <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light>
                mdi-repeat
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div class="footer">
      <v-footer :fixed="fixed" app>
        <span>&copy; 2019</span>
      </v-footer>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { i18n } from '../plugins/nuxt-i18n'
@Component({})
export default class Default extends Vue {
  clipped: boolean

  drawer: boolean

  fixed: boolean

  items: object

  miniVariant: boolean

  right: boolean

  rightDrawer: boolean

  title: string

  snackMessage: string = ''

  snackbar: boolean = false

  snackbarColor: string = ''

  timeout: number = 6000

  created() {
    this.clipped = false
    this.drawer = false
    this.fixed = false
    this.items = [
      {
        icon: 'mdi-apps',
        title: 'ノマド的カフェ検索',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'ノマド的カフェ投稿',
        to: '/inspire'
      }
    ]

    this.miniVariant = false
    this.right = true
    this.rightDrawer = false
    this.title = '書籍管理'
  }

  logout() {
    this.$store.dispatch('authenticate/logout')
    this.snackMessage = i18n.tc('info.I-0004')
    this.snackbarColor = 'green'
    this.snackbar = true
    this.toLogin()
  }

  toLogin() {
    this.$router.push('/login')
  }
}
</script>
<style scoped>
.MarginR10 {
  margin-right: 10px;
}
</style>
