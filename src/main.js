import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import discover from './components/discover.vue'
import recommend from './components/recommend.vue'
import result from './components/result.vue'
import playlist from './components/playlist.vue'

let router = new VueRouter({
  routes: [{
    path: "/discover",
    component: discover
  },
  {
    path: "/recommend",
    component: recommend
  },
  {
    path: "/",
    component: discover
  },
  {
    path: "/result",
    component: result
  },
  {
    path: "/playlist",
    component: playlist
  }]

})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
