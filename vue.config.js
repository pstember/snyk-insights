module.exports = {
  devServer: {
    proxy: {
      'api': {
        target: 'https://snyk.io',
        ws: true,
        changeOrigin: true,
        toProxy: true
      }
    }
  }
}