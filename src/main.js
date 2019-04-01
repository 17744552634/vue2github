import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from  './store'
import http from './utils/http'

Vue.prototype.$http = http;

import less from 'less'
Vue.use(less)

require('./assets/style/iconfont.css')

Vue.config.productionTip = false; //作用是阻止 vue 在启动时生成生产提示


// new Vue({
//   el: "#app",
//   router,
//   // render: h => h(App),
// })//.$mount('#app')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
