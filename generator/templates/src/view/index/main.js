__webpack_public_path__ = document.querySelector('meta[name="imgSrc"]').content;

import Vue from 'vue';
import router from '@/router/index.js';
import app from './APP';
import VueRouter from 'vue-router';
import '../../assets/scss/common.scss';
Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router,
    render: h => h(app)
}); 