const fs = require('fs');
module.exports = (api, options) => {
    api.render('./templates', {fileName: options.fileName});
    const pageConfig = {};

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
            'ct-adc-popper': '^2.0.1'
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
                setup: function(app) {
                    app.get('/index.html', function(req, res) {
                        res.sendFile(__dirname + '/src/index.html');
                    });
                }
            }
        }
    });

    api.onCreateComplete(()=>{
        // api.render(files => {
        //     delete files['public/favicon.ico'];
        //     delete files['public/index.html'];
        //     delete files['src/App.vue'];
        //     delete files['src/main.js'];
        // });
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
