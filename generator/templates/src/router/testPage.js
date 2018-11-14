import App from '../page/testPage/component/App';
import VueRouter from 'vue-router';
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App
    }]
});

