<template>
  <div class="my-page">
    <v-card>
      <v-card-text>仮（貸りている書籍情報などを掲載予定）</v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CommonMessage from '~/mixins/common-message'
@Component({})
export default class Login extends Mixins(CommonMessage) {}
</script>
