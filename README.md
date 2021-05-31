# v3confirm

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A plugin dedicated for vue3 to show confirm dialog modal. Currently the plugin works only with composition api.

## Installation

The plugin can be installed by npm or yarn. 

### NPM

```bash
npm install v3confirm --save
```

### Yarn

```bash
yarn add v3confirm
```

## Usage

```javascript
import { createApp } from 'vue'
import VueConfirmPlugin from 'v3confirm'
import App from '@/App.vue'

const app = createApp(App)
app.use(VueConfirmPlugin, {
  root: '#confirm',
  yesText: 'Yes',
  noText: 'No',
})
app.mount('#app')
```

Then in component with composition api:

```html
<template>
  <button @click="deleteAllUsers">
  <button @click="deleteAllUsersWithAsync">
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup: () => {
      const deleteAllUsers = () => {
        confirm.show('Are you sure?').then((ok) => {
          if (ok) {
            alert('All users deleted')
          } else {
            alert('Users not deleted')
          }
        })
      }

      const deleteAllUsersWithAsync = async () => {
        const ok = await confirm.show('Are you sure?')

        if (ok) {
          alert('All users deleted')
        } else {
          alert('Users not deleted')
        }
      }

      return {
        deleteAllUsers,
        deleteAllUsersWithAsync,
      }
    },
  })
</script>
```

## Options

### root

Type: string

Default: none

An HTML element where confirm dialog is attached. It should be empty.

### yesText

Type string

Default: 'yes'

A text used for confirm button.

### noText

Type string

Default: 'no'

A text used for decline button.

# Styles

This project is using bulma.io styles. If your project is not using bulma, then you can style confirm for your own or [import](https://bulma.io/documentation/overview/modular/) bulma modal. 

```scss
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/components/modal.sass"
```
