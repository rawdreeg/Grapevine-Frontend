// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.config.productionTip = false

// register vee validate plugin
Vue.use(VeeValidate)

// add these before Vue is instantiated
window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
