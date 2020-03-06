<template>
  <div>
    <v-alert color="blue">
      申請ボタンを押すと担当者へSlack通知が送信されます（仮）
    </v-alert>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :top="true">
      {{ snackMessage }}</v-snackbar
    >
    <v-card>
      <v-card-title>
        <span class="headline">book Info</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="TITLE*"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="author"
                  label="AUTHOR*"
                  hint="example of persistent helper text"
                  persistent-hint
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="rentalPeriod"
                  label="貸出期間"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="genre"
                  label="ジャンル"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded color="blue darken-1" class="mr-3" to="/">戻る</v-btn>
        <div v-if="isRental">
          <v-btn rounded color="teal accent-4" dark @click="returnBook"
            >返却する</v-btn
          >
        </div>
        <div v-else>
          <v-btn rounded color="teal accent-4" dark @click="rental"
            >貸りる</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
// import _ from 'lodash'
import { Vue, Component, Getter } from 'nuxt-property-decorator'
// import { AxiosError } from 'axios'
import { AxiosError } from 'axios'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import BmDialog from '~/components/organisms/bm-dialog.vue'
import { DefaultInfo, ListFromat, RentalFilter } from '~/types'
@Component({
  middleware: 'authed',
  components: {
    Logo,
    VuetifyLogo,
    BmDialog
  }
})
export default class BookPage extends Vue {
  @Getter('books/defaultInfo') bookList: DefaultInfo[]

  @Getter('books/book') bookInfo: ListFromat

  title: string = ''

  author: string = ''

  genre: string = ''

  currentDayStr: string = ''

  limitStr: string = ''

  rentalPeriod: string = ''

  snackbar: boolean = false

  snackbarColor: string = ''

  snackMessage: string = ''

  bookId: string = ''

  isRental: boolean = false

  async created() {
    this.bookId = this.$route.params.id
    await this.$store.dispatch('books/detail', this.bookId)
    this.init()
  }

  init() {
    this.title = this.bookInfo.title
    this.author = this.bookInfo.author
    this.genre = this.bookInfo.genre
    this.isRental = this.bookInfo.isRental
    this.currentDayStr = new Date().toISOString().substr(0, 10)
    const currentDay = new Date()
    const limitTmp = currentDay.setMonth(currentDay.getMonth() + 1)
    this.limitStr = new Date(limitTmp).toISOString().substr(0, 10)
    this.rentalPeriod = this.currentDayStr + '~' + this.limitStr
  }

  async rental() {
    const rentalFilter: RentalFilter = {
      title: this.title,
      author: this.author,
      isRental: true,
      genre: this.genre,
      userId: this.$store.state.authenticate.id,
      bookId: this.bookId
    }
    await this.$store
      .dispatch('books/rental', rentalFilter)
      .catch((error: AxiosError) => {
        console.log(error)
        alert('error（仮）')
      })
      .finally(() => {
        // TODO ローディング終了処理
      })
    this.snackbar = true
    this.snackbarColor = 'green'
    this.snackMessage = '貸し出しが完了しました。'
    setTimeout(this.toHome, 2000)
  }

  async returnBook() {
    const rentalFilter: RentalFilter = {
      title: this.title,
      author: this.author,
      isRental: true,
      genre: this.genre,
      userId: this.$store.state.authenticate.id,
      bookId: this.bookId
    }
    await this.$store
      .dispatch('books/returnBook', rentalFilter)
      .catch((error: AxiosError) => {
        console.log(error)
        alert('error（仮）')
      })
      .finally(() => {
        // TODO ローディング終了処理
      })
    this.snackbar = true
    this.snackbarColor = 'green'
    this.snackMessage = '返却が完了しました。'
    setTimeout(this.toHome, 2000)
  }

  toHome() {
    this.$router.push('/')
  }
}
</script>
