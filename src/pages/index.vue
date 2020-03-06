<template>
  <div class="main">
    <bm-dialog
      :is-dialog="isDialog"
      @isDialogCommit="isDialogCommit"
    ></bm-dialog>
    <v-btn rounded color="teal accent-4" dark @click="isDialogOpen"
      >書籍追加</v-btn
    >
    <v-row>
      <v-col sm="6" cols="12"
        ><v-spacer></v-spacer>
        <v-text-field v-model="search" single-line hide-details
          ><template v-slot:label>
            タイトル・著者を文字列で検索 here！！
            <v-icon small>fas fa-search</v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col sm="6" cols="12"
        ><v-spacer></v-spacer>
        <v-select
          v-model="search"
          :items="genres"
          attach
          chips
          label="ジャンル"
          multiple
        ></v-select></v-col
    ></v-row>

    <v-data-table
      :headers="headers"
      :items="items"
      :item-key="items.id"
      :search="search"
      class="elevation-1"
    >
      <!-- <template v-slot:item.title="{ item }">
        <nuxt-link :to="{ name: 'books-id', params: { id: item.id } }">
          {{ item.title }}
        </nuxt-link>
      </template> -->
      <template v-slot:item.isRental="{ item }">
        <!-- <v-chip :color="getColor(item.isRental)" dark
          >{{ getIsRental(item.isRental) }}
        </v-chip> -->
        <v-btn
          :disabled="getDisable(item)"
          :to="{ name: 'books-id', params: { id: item.id } }"
          :color="getColor(item.isRental)"
          >{{ getIsRental(item) }}</v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
// import { AxiosError } from 'axios'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import BmDialog from '~/components/organisms/bm-dialog.vue'
import { ListFromat, DefaultInfo } from '~/types'
@Component({
  middleware: 'authed',
  components: {
    Logo,
    VuetifyLogo,
    BmDialog
  }
})
export default class IndexPage extends Vue {
  isDialog: boolean = false

  // TODO getterでfetch後の書籍情報を格納
  @Getter('books/defaultInfo') bookList: DefaultInfo[]

  search: string = ''

  headers: object[] = [
    {
      text: 'TITLE',
      align: 'left',
      sortable: false,
      value: 'title'
    },
    { text: 'AUTHOR', value: 'author' },
    { text: 'GENRRE', value: 'genre' },
    { text: 'ISRENTAL', value: 'isRental' }
  ]

  items: ListFromat[] = []

  // TODO DBから持って来るように修正する
  genres: string[] = [
    'AI',
    'ruby',
    'python',
    'フロントエンド',
    'PHP',
    '自己啓発',
    'エンジニア読み物'
  ]

  isDialogOpen() {
    this.isDialog = true
  }

  getColor(isRental) {
    // 借りられてたら赤・借りれる状態だったら緑
    if (isRental) return 'red'
    else return 'green'
  }

  getIsRental(item) {
    if (
      item.userRef.id === this.$store.state.authenticate.id &&
      item.isRental
    ) {
      return '返却する'
    } else if (item.isRental) return '貸出し中'
    else return '貸出し可能'
  }

  getDisable(item) {
    if (item.userRef.id === this.$store.state.authenticate.id) {
      return false
    } else if (item.isRental) {
      return true
    } else {
      return false
    }
  }

  async mounted() {
    await this.$store.dispatch('books/show')
    // mountedでやるとどうしてもno item画面が見えてしまう
    this.init()
  }

  init() {
    const books = this.bookList
    for (let i = 0; i < books.length; i++) {
      const book: ListFromat = {
        id: books[i].id,
        title: books[i].title,
        author: books[i].author,
        isRental: books[i].isRental,
        genre: books[i].genre,
        userRef: books[i].userRef
      }
      this.items.push(book)
    }
  }

  isDialogCommit(flg) {
    this.isDialog = flg
  }
}
</script>
