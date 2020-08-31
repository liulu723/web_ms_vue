import Vue from 'vue'
import App from './App.vue'
import elementUI from 'element-ui'
import router from './router'
import store from './store'
import apis from './api/apis.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(elementUI)
Vue.prototype.$apis = apis
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
