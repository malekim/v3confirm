import * as vue from 'vue'
import { defineComponent, nextTick, Plugin } from 'vue'
import { mount } from '@vue/test-utils'
import VueConfirmPlugin from '@/index'
import { useConfirm } from '@/index'
import { renderConfirm } from '@/confirm'
import type { ConfirmOptions } from '@/index'

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
    expect(typeof renderConfirm).toEqual('function')
  })
})

describe('Confirm', () => {
  it('Shows confirm', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [VueConfirmPlugin, {
            root: '#confirm',
            yesText: 'yes-test-text',
            noText: 'no-test-text',
          }]
        ],
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('<div id="confirm"></div>')
    await wrapper.vm.$nextTick()
    // show confirm
    wrapper.get('.button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('<header class="modal-card-head">Are you sure?</header>')
    expect(wrapper.html()).toContain('<button class="button is-confirm">yes-test-text</button>')
    expect(wrapper.html()).toContain('<button class="button is-discard">no-test-text</button>')

    clearDocument()
  })

  it('Confirm button', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [VueConfirmPlugin, {
            root: '#confirm',
          }]
        ],
      }
    })
    await wrapper.vm.$nextTick()
    // show confirm
    wrapper.get('.button').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.get('.button.is-confirm').trigger('click')
    await wrapper.vm.$nextTick()
    // when modal is closed button does not longer exists
    expect(wrapper.find('.modal.is-active').exists()).toBe(false)
    expect(wrapper.find('.button.is-confirm').exists()).toBe(false)

    clearDocument()
  })

  it('Discard button', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [VueConfirmPlugin, {
            root: '#confirm',
          }]
        ],
      }
    })
    await wrapper.vm.$nextTick()
    // show confirm
    wrapper.get('.button').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.get('.button.is-discard').trigger('click')
    await wrapper.vm.$nextTick()
    // when modal is closed button does not longer exists
    expect(wrapper.find('.modal.is-discard').exists()).toBe(false)
    expect(wrapper.find('.button.is-confirm').exists()).toBe(false)

    clearDocument()
  })

  it('Close by click on the button', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [VueConfirmPlugin, {
            root: '#confirm',
          }]
        ],
      }
    })
    await wrapper.vm.$nextTick()
    // show confirm
    wrapper.get('.button').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.get('.modal-close').trigger('click')
    await wrapper.vm.$nextTick()
    // when modal is closed button does not longer exists
    expect(wrapper.find('.modal.is-active').exists()).toBe(false)

    clearDocument()
  })

  it('Close by click on the background', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [VueConfirmPlugin, {
            root: '#confirm',
          }]
        ],
      }
    })
    await wrapper.vm.$nextTick()
    // show confirm
    wrapper.get('.button').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.get('.modal-background').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal.is-active').exists()).toBe(false)

    clearDocument()
  })
})