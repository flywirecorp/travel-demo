import Vue from 'vue'
import VueRouter from 'vue-router'

import BillingInfo from './views/BillingInfo.vue'
import Checkout from './views/Checkout.vue'
import Config from './views/Config.vue'
import Home from './views/Home.vue'
import Results from './views/Results.vue'
import Return from './views/Return.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',              name: 'home',         component: Home },
  { path: '/billing-info',  name: 'billing-info', component: BillingInfo },
  { path: '/checkout',      name: 'checkout',     component: Checkout },
  { path: '/config',        name: 'config',       component: Config },
  { path: '/results',       name: 'results',      component: Results },
  { path: '/return',        name: 'return',       component: Return }
]

export default new VueRouter({
  routes: routes
})
