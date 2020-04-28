import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faSnowflake, faMale, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faSnowflake, faMale, faTimesCircle, faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    this.$store.dispatch('load');
  },
  render: h => h(App),
})