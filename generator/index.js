const fs = require('fs');

module.exports = (api, options) => {
    api.render('./template');
    api.extendPackage({
        dependencies: { 
            // "vue-router": "^3.0.1"
        },
        devDependencies: {
            'eslint-plugin-html': '^4.0.6'
        },
        vue: {
            assetsDir: 'ct108-admin-main/1.0.0/assets',
            productionSourceMap: false,
            filenameHashing: false,
            pages: {
                index: 'src/view/index/main.js'
            },
            devServer: {
                openPage: 'index.html',
                disableHostCheck: true,
                setup: function(app) {
                    app.get('/', function(req, res) {
                        res.sendFile(__dirname + '/src/index.html');
                    });
                },
                proxy: {
                    '/api': {
                        target: 'http://lykf.admin.ct108.org:1507'
                    } 
                }
            }
        }
    });

    api.onCreateComplete(()=>{
        fs.unlink(`${api.resolve('public')}/favicon.ico`);
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
