import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/v3confirm/',
  lang: 'en-US',
  title: 'malekim/v3confirm',
  themeConfig: {
    repo: 'malekim/v3confirm',
    contributors: false,
  },
})
