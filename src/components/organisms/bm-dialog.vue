<template>
  <v-row justify="center">
    <v-dialog v-model="isDialog" persistent max-width="600px">
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
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="author"
                    label="AUTHOR*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="isRentalStr"
                    :items="items"
                    label="状態*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :readonly="true" filled>{{
                    isRentalStr
                  }}</v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="genre"
                    :items="genres"
                    label="ジャンル選択*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close">Close</v-btn>
          <v-btn color="blue darken-1" @click="add">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { AxiosError } from 'axios'
import { AddFilter } from '~/types/books/add-filter'

@Component
export default class BmDialog extends Vue {
  static readonly RENTAL: string = 'そのまま貸りる'

  static readonly NORENTAL: string = '登録のみ'

  @Prop()
  isDialog: boolean

  title: string = ''

  author: string = ''

  isRentalStr: string = ''

  isRental: boolean = false

  genre: string = ''

  // TODO DBから持って来るように修正する
  items: string[] = ['そのまま貸りる', '登録のみ']
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

  picker: string[] = [new Date().toISOString().substr(0, 10)]

  created() {
    const currentDay = new Date()
    const limit = currentDay.setMonth(currentDay.getMonth() + 1)
    const limit2 = new Date(limit)
    this.picker.push(limit2.toISOString().substr(0, 10))
  }

  close() {
    this.$emit('isDialogCommit', false)
  }

  async add() {
    if (this.isRentalStr === BmDialog.RENTAL) {
      this.isRental = true
    } else {
      this.isRental = false
    }
    const addFilter: AddFilter = {
      title: this.title,
      author: this.author,
      isRental: this.isRental,
      genre: this.genre,
      userId: this.$store.state.authenticate.id
    }
    await this.$store
      .dispatch('books/add', addFilter)
      .catch((error: AxiosError) => {
        console.log(error)
        alert('error（仮）')
      })
      .finally(() => {
        // TODO ローディング終了処理
      })
    this.isDialog = false
    location.reload()
  }
}
</script>
