import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'

Vue.prototype.$http = axios
const NProgress = window.NProgress
// before a request is made start the nprogress
Vue.prototype.$http.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
Vue.prototype.$http.interceptors.response.use(response => {
  NProgress.done()
  return response
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
