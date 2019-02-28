import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import less from 'less'
Vue.use(less)

require('./assets/style/iconfont.css')

Vue.config.productionTip = false


// new Vue({
//   el: "#app",
//   router,
//   // render: h => h(App),
// })//.$mount('#app')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
