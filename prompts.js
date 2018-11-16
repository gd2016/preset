var jsonFormat = function(info){
    var jsonReg = /(\\)|\/\/.*$/mg;

    return JSON.parse(info.replace(jsonReg, ''));
};

var getLableArr = function(info){
    var arr = info.split('//');
    var labelArr = [];

    for (let i = 1; i < arr.length; i++) {
        labelArr.push(arr[i].replace(/(^\s*)|\s[\s\S]*/g, ''));
    }
    return labelArr;
};

var getColumnType = function(value){
    if (value === 1234567890) return 'dates';
    else if (value === 123456789) return 'date';
    else if (value === 3) return 'select';
    else if (value === 'autoComplete') return 'autoComplete';
    else if (value === 1 || value[0] === 1) return 'checkbox';
    else if (value === 2) return 'radio';
    else if (value === '说明' || value === '备注') return 'textarea';
    else if (typeof value === 'object') return 'custom';
    return 'text';
};

var serializeInfo = function(val){
    var arr = [];
    var json = jsonFormat(val);
    var info = {};

    if (!json.Data){ //其他信息
        info = json;
    } else { //表格信息
        info = json.Data.List[0];
    }
    const label = getLableArr(val);
    const fieldArr = Object.keys(info);

    for (let i = 0; i < label.length; i++) {
        const obj = {};

        obj.label = label[i];
        obj.field = fieldArr[i];
        obj.type = getColumnType(info[fieldArr[i]]);
        arr.push(obj);
    }
    return arr;
};

module.exports = [
    {
        name: 'fileName',
        type: 'input',
        message: 'Input the html file name:',
        validate: input => input !== '' ? true : 'html文件名称不能为空'
    },
    {
        name: 'operation',
        type: 'checkbox',
        message: 'What content are included ？',
        choices: [
            {
                name: '1) table',
                value: 'table',
                checked: true
            },
            {
                name: '2) add operation',
                value: 'add'
            },
            {
                name: '3) delete operation',
                value: 'delete'
            },
            {
                name: '4) edit operation',
                value: 'edit'
            },
            {
                name: '5) search operation',
                value: 'search'
            },
            {
                name: '6) view operation',
                value: 'view'
            },
            {
                name: '7) export',
                value: 'export'
            }
        ]
    },
    {
        when: answers => {
            return answers.operation.indexOf('add') !== -1 
                    && answers.operation.indexOf('edit') !== -1;
        },
        type: 'confirm',
        message: 'Is adding and editing the same file?',
        name: 'isHandle'
    },
    {
        type: 'confirm',
        message: 'Manual Configuration/operation or not?',
        name: 'isConfig'
    },
    {
        name: 'tableInfo',
        type: 'editor',
        message: 'table column info?',
        when: answers => answers.operation.indexOf('table') !== -1 && answers.isConfig,
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val); 
            } catch (error) {
                return null;
            }
        }
    },
    {
        when: answers => answers.isHandle && answers.isConfig,
        type: 'editor',
        message: 'add and edit items info?',
        name: 'handleInfo',
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val); 
            } catch (error) {
                return null;
            }
        }
    },
    {
        when: answers => answers.operation.indexOf('search') !== -1 && answers.isConfig,
        type: 'editor',
        message: 'search items info?',
        name: 'searchInfo',
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val); 
            } catch (error) {
                return null;
            }
        }
    },
    {
        when: answers => {
            return answers.operation.indexOf('add') !== -1 && !answers.isHandle && answers.isConfig;
        },
        type: 'editor',
        message: 'add items info?',
        name: 'addInfo',
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val); 
            } catch (error) {
                return null;
            }
        }
    },
    {
        when: answers => {
            return answers.operation.indexOf('edit') !== -1 && !answers.isHandle && answers.isConfig;
        },
        type: 'editor',
        message: 'edit items info?',
        name: 'editInfo',
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val); 
            } catch (error) {
                return null;
            }
        }
    },
    {
        when: answers => answers.operation.indexOf('view') !== -1 && answers.isConfig,
        type: 'editor',
        message: 'view items info?',
        name: 'viewInfo',
        validate: function(val) {
            if (!val) return '数据格式错误';
            return true;
        },
        filter: function(val){
            try {
                return serializeInfo(val.Data); 
            } catch (error) {
                return null;
            }
        }
    }
]
;
