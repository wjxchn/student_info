module.exports = {
  transpileDependencies: [
    'vuetify'
  ], devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8080,
    proxy: { //配置跨域
      '/api': {
          // target: 'http://127.0.0.1:9999/api', //本地调试时可以用这个，也可以用下一个
          target: 'http://10.2.4.36:80/api', //本地调试时也可以用这个
          // target: 'http://10.2.4.36:9999/api', //部署上线时一定要用这个

          ws: true,
          changOrigin: true, //允许跨域
          pathRewrite: {
              '^/api': '' //请求的时候使用这个api就可以
          },
      }
  },
    https: false,
    hotOnly: false,
  },
}
