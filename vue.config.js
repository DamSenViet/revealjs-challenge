module.exports = {
  "publicPath": process.env.NODE_ENV === 'production'
  ? '/revealjs-challenge/'
  : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}