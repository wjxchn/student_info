import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// import {VueAxios} from './utils/http/request'
// Vue.use(VueAxios)

import axios from 'axios';

axios.interceptors.request.use((config) => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        let token = localStorage.getItem('Authorization')
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use((response) => {
        if (response.status === 666 || 555 === response.status) {
            window.location.href = '/#/login';
        } else {
            return response;
        }
    },
    function (error) {
        if (666 === error.response.status || 555 === error.response.status ) {
            window.location.href = '/#/login';
        } else if (444 === error.response.status) {
            window.location.href = '/#/studentpage';
        } else {
            return Promise.reject(error);
        }
    }
)
;

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')

