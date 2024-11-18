const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'hacker-news-app',
    start_url: '/',
    display: 'standalone'
  }
})
