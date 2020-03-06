import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CommonMessage extends Vue {
  /**
   * @param baseMessage メッセージ
   * @param args 文字配列
   * @param original メッセージ返却フラグ
   * @example baseMessage："[0]しました。", args["ログイン"] ＝＞ "ログインしました。"
   * @returns 置き換えた後のメッセージ
   */
  editMessage(
    baseMessage: string,
    args: string[],
    original: boolean = false
  ): string {
    if (this.isNotParam(baseMessage)) {
      return ''
    }

    if (this.isNotParam(args) || args.length === 0) {
      if (original) {
        return baseMessage
      } else {
        return ''
      }
    }

    let rtnMessage: string = baseMessage
    for (let i = 0; i < args.length; i++) {
      rtnMessage = rtnMessage.replace('[' + i + ']', args[i])
    }

    return rtnMessage
  }

  /**
   * 引数に値が設定されていないかの判定。
   *
   * @param value チェック対象
   * @returns 結果(true:設定なし、false：設定あり)
   */
  isNotParam(value: any): boolean {
    let rtn: boolean = false

    if (value === null || value === '') {
      rtn = true
    }
    return rtn
  }
}
