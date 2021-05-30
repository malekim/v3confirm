import { defineComponent, ref, h } from 'vue'

// import Confirm from '@/plugins/confirm/Confirm.vue'
const renderConfirm = (
  resolve: (value: boolean | PromiseLike<boolean>) => void
): ReturnType<typeof defineComponent> => {
  return defineComponent({
    props: {
      text: {
        type: String,
        required: true,
      },
      yesText: {
        type: String,
        required: true,
      },
      noText: {
        type: String,
        required: true,
      },
    },
    setup() {
      const isActive = ref(true)
      const confirm = () => {
        close()
        resolve(true)
      }
      const discard = () => {
        close()
        resolve(false)
      }
      const close = () => {
        isActive.value = false
      }

      return {
        isActive,
        confirm,
        discard,
        close,
      }
    },
    render() {
      if (this.isActive) {
        return h(
          'div',
          {
            class: 'modal is-active',
          },
          [
            h('div', {
              class: 'modal-background',
              onClick: () => this.close(),
            }),
            h(
              'div',
              {
                class: 'modal-content',
              },
              [
                h(
                  'div',
                  {
                    class: 'modal-card modal-confirm',
                  },
                  [
                    h(
                      'header',
                      {
                        class: 'modal-card-head',
                      },
                      this.text
                    ),
                    h(
                      'footer',
                      {
                        class: 'modal-card-foot',
                      },
                      [
                        h(
                          'button',
                          {
                            class: 'button',
                            onClick: () => this.confirm(),
                          },
                          this.yesText
                        ),
                        h(
                          'button',
                          {
                            class: 'button',
                            onClick: () => this.discard(),
                          },
                          this.noText
                        ),
                      ]
                    ),
                  ]
                ),
              ]
            ),
            h('button', {
              class: 'modal-close is-medium',
              'aria-label': 'close',
              onClick: () => this.close(),
            }),
          ]
        )
      }
      return null
    },
  })
}

export { renderConfirm }
