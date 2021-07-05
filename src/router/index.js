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
        path: '/addprize',
        name: 'AddPrize',
        component: () => import('@/views/AddPrize.vue')
    },
    {
        path: '/applyprize',
        name: 'ApplyPrize',
        component: () => import('@/views/ApplyPrize.vue')
    },
    {
        path: '/applyprizepage',
        name: 'ApplyPrizePage',
        component: () => import('@/views/ApplyPrizePage.vue')
    },
    {
        path: '/askforleave',
        name: 'AskForLeave',
        component: () => import('@/views/AskForLeave.vue')
    },
    {
        path: '/basicinfo',
        name: 'BasicInfo',
        component: () => import('@/views/BasicInfo.vue')
    },
    {
        path: '/cancelleave',
        name: 'CancelLeave',
        component: () => import('@/views/CancelLeave.vue')
    },
    {
        path: '/partyaffair',
        name: 'PartyAffair',
        component: () => import('@/views/PartyAffair.vue')
    },
    {
        path: '/prizecandidate',
        name: 'PrizeCandidate',
        component: () => import('@/views/PrizeCandidate.vue')
    },
    {
        path: '/prizeevaluation',
        name: 'PrizeEvaluation',
        component: () => import('@/views/PrizeEvaluation.vue')
    },
    {
        path: '/specialstory',
        name: 'SpecialStory',
        component: () => import('@/views/SpecialStory.vue')
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/Statistics.vue')
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

// const axios = require('axios');

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        // var token = localStorage.getItem('Authorization');
        // if (token === null || token === '') {
        //     next('/login');
        // } else {
        //     next();
        // }
        next();
    }
});

export default router
