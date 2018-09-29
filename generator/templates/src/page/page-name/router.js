import App from './component/App';
import VueRouter from 'vue-router';
// {{#if_nothandle ishandle operation.edit}}
// import edit from './component/edit';{{/if_nothandle}}{{#if_nothandle ishandle operation.edit}}
// import add from './component/add';{{/if_nothandle}}{{#operation.view}}
// import view from './component/view';{{/operation.view}}{{#ishandle}}
// import handle from './component/handle';{{/ishandle}}{{#if_and operation.more more.slideout}}
// import slideout from './component/slideout';{{/if_and}}
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: 
        [
            // {{#if_nothandle ishandle operation.edit}}{ 
            //     path: 'edit',
            //     component: edit
            // },{{/if_nothandle}}{{#operation.view}}
            // { 
            //     path: 'view',
            //     component: view
            // },{{/operation.view}}{{#if_nothandle ishandle operation.add}}
            // { 
            //     path: 'add',
            //     component: add
            // }{{/if_nothandle}}{{#ishandle}}
            // { 
            //     path: ':handle',
            //     component: handle
            // }{{/ishandle}}{{#if_and operation.more more.slideout}},
            // { 
            //     path: 'slideout',
            //     component: slideout
            // }{{/if_and}}
        ]
    }]
});

