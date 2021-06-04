import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/basicinfo',
    name: 'BasicInfo',
    component: () => import('@/views/BasicInfo.vue')
  },
  {
    path: '/partyaffair',
    name: 'PartyAffair',
    component: () => import('@/views/PartyAffair.vue')
  },
  {
    path: '/studentpage',
    name: 'StudentPage',
    component: () => import('@/views/StudentPage.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router