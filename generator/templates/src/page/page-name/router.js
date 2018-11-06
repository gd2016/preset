import App from './component/App';
import VueRouter from 'vue-router';
<% if(options.operation.indexOf('edit') !== -1 && !options.isHandle){ %>import edit from './component/edit';<% } %><% if(options.operation.indexOf('add') !== -1 && !options.isHandle){ %>
import add from './component/add';<% } %><% if(options.operation.indexOf('view') !== -1){ %>
import view from './component/view';<% } %><% if(options.isHandle){ %>
import handle from './component/handle';<% } %>
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: 
        [
            <% if(options.operation.indexOf('edit') !== -1 && !options.isHandle){ %>{ 
                path: 'edit',
                component: edit
            }<% } %><% if(options.operation.indexOf('add') !== -1 && !options.isHandle){ %>,
            { 
                path: 'add',
                component: add
            }<% } %><% if(options.operation.indexOf('view') !== -1){ %>,
            { 
                path: 'view',
                component: view
            }<% } %><% if(options.isHandle){ %>,
            { 
                path: ':handle',
                component: handle
            }<% } %>
        ]
    }]
});

