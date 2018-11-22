/**
 * 该处实现供开发者参考
 */
import utility from 'ct-utility';
var getEnv = function() {
    const env = {
        'org:1506': 'dev',
        'org:1507': 'test',
        'org:1505': 'testStable',
        'net:8001': 'pre',
        'net': 'official'
    };
    const tdl = location.host.split('.').slice(-1)[0];

    return env[tdl] || 'dev';
};
var base = {
    index: {
        list: '/api/getlist',
        post: '/api/post',
        detail: '/api/detail',
        export: '/api/export',
        remove: '/api/remove',
        popup: '/api/popup'
    },
    patchList: {
        api3: '/api/api3'
    },
    patchMonitor: {
        api4: '/api/api4'
    },
    singlePackage: {
        api5: '/api/api5'
    }
};
var Interface = {
    dev: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    test: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    testStable: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    pre: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api111'
        }
    }),
    official: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api111'
        }
    })
};
var env = getEnv();

export default Interface[env];
