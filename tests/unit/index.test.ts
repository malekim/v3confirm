import * as vue from 'vue'
import { defineComponent, nextTick, Plugin } from 'vue'
import { mount } from '@vue/test-utils'
import VueConfirmPlugin from '@/index'
import { useConfirm } from '@/index'
import type { ConfirmOptions } from '@/index'
import { directive } from '@babel/types'

const clearDocument = () => {
  document.body.innerHTML = ''
}

const TestComponent = {
  name: 'test-component',
  setup() {
    const confirm: any = useConfirm()
    const show = async () => {
      const ok = await confirm.show('Are you sure?')
    }

    return () => vue.h(
      'div', {
        class: 'component',
      },
      [
        vue.h(
          'button', {
            class: 'button',
            onClick: () => show()
          }
        )
      ]
    )
  }
}

const App = {
  components: {
    TestComponent,
  },
  setup() {
    return () => vue.h('div', { class: 'main' }, [
      vue.h('div', {
        id: 'confirm',
      }),
      vue.h(TestComponent),
    ])
  },
}

describe('exports', () => {
  it('exports', () => {
    expect(typeof VueConfirmPlugin).toEqual('function')
    expect(typeof useConfirm).toEqual('function')
    // expect(ConfirmOptions).toEqual('object')
  })
})

describe('plugin', () => {
  it('Loads plugin', () => {
    const app = vue.createApp(App)
    const provideSpy = jest.spyOn(app, 'provide')

    expect(provideSpy).toHaveBeenCalledTimes(0)

    app.use(VueConfirmPlugin)

    expect(provideSpy).toHaveBeenCalledTimes(1)
  })
})