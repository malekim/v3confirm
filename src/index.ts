import { createApp, inject, Plugin, nextTick } from 'vue'

import { renderConfirm } from '@/confirm'

const confirmKey = 'confirm'
interface ConfirmOptions {
  root?: string
  yesText?: string
  noText?: string
}

const plugin = (options?: ConfirmOptions) => {
  return {
    show: (question: string) => {
      const rootID = !options?.root ? '#app' : options.root
      return new Promise((resolve) => {
        const yesText = options?.yesText ? options.yesText : 'Yes'
        const noText = options?.noText ? options.noText : 'No'

        const comp = renderConfirm(resolve)

        nextTick(() => {
          return createApp(comp, {
            text: question,
            yesText: yesText,
            noText: noText,
          }).mount(rootID)
        })
      })
    },
  }
}

const VueConfirmPlugin: Plugin = (App, options?: ConfirmOptions) => {
  const inter = plugin(options)
  App.provide(confirmKey, inter)
}

const useConfirm = (customKey = ''): unknown => {
  return inject(customKey !== '' ? customKey : confirmKey)
}

export default VueConfirmPlugin

export { useConfirm, ConfirmOptions }
