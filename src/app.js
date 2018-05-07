/*
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)



Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
*/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import {createRouter } from './router'


export function createApp() {
    // Создаём экземпляр маршрутизатора
    const router = createRouter()
    
    const app = new Vue({
        router,
        render: h =>h(App)
        
    })
    return { app, router  }
}