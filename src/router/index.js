import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/Index'
import About from '@/views/About'
import Delivery from '@/views/Delivery'
import Contacts from '@/views/Contacts'
import Obreznaya from '@/views/Obreznaya-doska'
import DerevyannyiBrus from '@/views/Derevyannyi-brus'
import Bruski from '@/views/bruski'


Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
          path: '/',
          name: 'Index',
          component: Index
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/delivery',
          name: 'Delivery',
          component: Delivery
        },
        {
          path: '/contacts',
          name: 'Contacts',
          component: Contacts
        },
        {
          path: '/obreznaya-doska',
          name: 'Obreznaya-doska',
          component: Obreznaya
        },
        {
          path: '/derevyannyi-brus',
          name: 'Derevyannyi-brus',
          component: DerevyannyiBrus
        },
        {
          path: '/bruski',
          name: 'Bruski',
          component: Bruski
        }
    ],
    scrollBehavior (to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition
          } else if (to.hash) {
            return {
              selector: to.hash
            }
          } else {
            return { x: 0, y: 0 }
          }
        }
  })
}
