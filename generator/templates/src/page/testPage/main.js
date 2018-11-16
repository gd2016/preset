__webpack_public_path__ = document.querySelector('meta[name="imgSrc"]').content;

import Vue from 'vue';
import router from '../../router/testPage.js';
import VueRouter from 'vue-router';
import '../../assets/scss/common.scss';
import '../../filter/vue-filter'; 
Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router
});
