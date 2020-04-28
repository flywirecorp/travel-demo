/*
  See: https://cli.vuejs.org/config/#publicpath
*/
module.exports = {
  publicPath: (process.env.NODE_ENV === 'production') 
    ? '/travel-demo/' 
    : '/',
  assetsDir: 'assets',
  outputDir: 'docs'
}