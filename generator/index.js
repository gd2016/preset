const fs = require('fs');

module.exports = (api, options) => {
    api.render('./templates');
    api.extendPackage({
        dependencies: {
            // "vue-router": "^3.0.1"
        },
        devDependencies: {
            'eslint-plugin-html': '^4.0.6'
        },
        vue: {
            assetsDir: 'ct108-admin-main/assets/1.0.0',
            productionSourceMap: false,
            filenameHashing: false,
            pages: {
                test: 'src/page/test/main.js'
            },
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
        fs.unlink(`${api.resolve('src')}/router.js`);
        fs.unlink(`${api.resolve('src')}/store.js`);
        fs.unlink(`${api.resolve('src')}/assets/logo.png`);
        deleteFolderRecursive(`${api.resolve('src')}/views`);
    });
};

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + '/' + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
