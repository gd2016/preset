const fs = require('fs');
module.exports = (api, options) => {
    const files = fs.readdirSync(api.resolve('public'));
    const htmlFile = files.filter((f) => {
        return f.indexOf('.html') !== -1;
    });
    const pageConfig = {};

    htmlFile.push(options.fileName + '.html');
    api.render({
        './public/page-name.html': './templates/public/page-name.html',
        './src/page/page-name/main.js': './templates/src/page/page-name/main.js',
        './src/page/page-name/router.js': './templates/src/page/page-name/router.js',
        './src/page/page-name/component/App.vue': './templates/src/page/page-name/component/App.vue',
        './src/index.html': './templates/src/index.html'
    }, {fileName: htmlFile});
    if (options.operation.indexOf('add') !== -1 && !options.isHandle){
        api.render({'./src/page/page-name/component/add.vue': './templates/src/page/page-name/component/add.vue'});
    }
    if (options.operation.indexOf('edit') !== -1 && !options.isHandle){
        api.render({'./src/page/page-name/component/edit.vue': './templates/src/page/page-name/component/edit.vue'});
    }
    if (options.isHandle){
        api.render({'./src/page/page-name/component/handle.vue': './templates/src/page/page-name/component/handle.vue'});
    }
    if (options.operation.indexOf('search') !== -1){
        api.render({'./src/page/page-name/component/search.vue': './templates/src/page/page-name/component/search.vue'});
    }
    if (options.operation.indexOf('view') !== -1){
        api.render({'./src/page/page-name/component/view.vue': './templates/src/page/page-name/component/view.vue'});
    }
    pageConfig[options.fileName] = `src/page/${options.fileName}/main.js`;
    api.extendPackage({
        dependencies: {
            'ct-adc-formitem': '^1.0.2',
            'async-validator': '^1.8.4',
            'ct-adc-const': '^1.0.0-alpha.3',
            'ct-adc-list': '^4.2.0',
            'ct-adc-loading': '^1.0.0-alpha.3',
            'ct-adc-mini-msg': '^2.0.0',
            'ct-adc-page': '^1.1.0',
            'ct-adc-permission': '^1.1.0',
            'ct-adc-slideout': '^1.2.0',
            'ct-adc-popper': '^2.0.1',
            "ct-adc-auto-complete": "^3.2.0",
            "ct-adc-date": "^2.0.0-alpha.2",
            "vue-router": "^3.0.1"
        },
        devDependencies: {
            'eslint-plugin-html': '^4.0.6'
        },
        vue: {
            assetsDir: 'ct108-admin-main/assets/1.0.0',
            productionSourceMap: false,
            filenameHashing: false,
            pages: pageConfig,
            devServer: {
                open: true,
                openPage: 'index.html',
                disableHostCheck: true,
                setup: function(app) {
                    app.get('/index.html', function(req, res) {
                        res.sendFile(__dirname + '/src/index.html');
                    });
                }
            }
        }
    });

    api.onCreateComplete(()=>{
        fs.unlink(`${api.resolve('public')}/favicon.ico`);
        fs.unlink(`${api.resolve('public')}/index.html`);
        fs.unlink(`${api.resolve('src')}/App.vue`);
        fs.unlink(`${api.resolve('src')}/main.js`);
        fs.rename(`${api.resolve('public')}/page-name.html`,
            `${api.resolve('public')}/${options.fileName}.html`); 
        fs.rename(`${api.resolve('src')}/page/page-name`,
            `${api.resolve('src')}/page/${options.fileName}`);      
    });
};
