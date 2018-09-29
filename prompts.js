var jsonFormat = function(info){
    var jsonReg = /(\\)|\/\/.*$/mg;

    return JSON.parse(info.replace(jsonReg, ''));
};


module.exports = [
    {
        name: 'fileName',
        type: 'input',
        message: 'Input the html file name:',
        validate: input => input !== '' ? true : 'html file name is required.'
    },
    {
        name: "tableInfo",
        type: "editor",
        message :"table column info?"
    }
    // {
    //     name: 'operation',
    //     type: 'checkbox',
    //     message: 'What content are included ？',
    //     choices: [
    //         {
    //             name: '1) table',
    //             value: 'table',
    //             checked: true
    //         },
    //         {
    //             name: '2) add operation',
    //             value: 'add'
    //         },
    //         {
    //             name: '3) delete operation',
    //             value: 'delete'
    //         },
    //         {
    //             name: '4) edit operation',
    //             value: 'edit'
    //         },
    //         {
    //             name: '5) search operation',
    //             value: 'search'
    //         },
    //         {
    //             name: '6) view operation',
    //             value: 'view'
    //         },
    //         {
    //             name: '7) export',
    //             value: 'export'
    //         }
    //     ]
    // }
    // {
    //     when: "operation.more",
    //     type: "checkbox",
    //     message: 'What content are included ？',
    //     name: "more",
    //     choices: [
    //         {
    //             name: "1) slideout",
    //             value: "slideout"
    //         },
    //         {
    //             name: "2) popup",
    //             value: "popup"
    //         },
    //         {
    //             name: "3) child page",
    //             value: "page"
    //         }
    //     ]
    // },
    // {
    //     when:"operation.add && operation.edit",
    //     type:"confirm",
    //     message :"Is adding and editing the same file?",
    //     name: "ishandle"
    // },
    // {
    //     name: "tableInfo",
    //     type:"editor",
    //     message :"table column info?",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val).Data.List[0]){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // },
    // {
    //     when:'operation.add && operation.edit && ishandle',
    //     type:"editor",
    //     message :"add and edit items info?",
    //     name: "handleInfo",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val)){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // },
    // {
    //     when:"operation.search",
    //     type:"editor",
    //     message :"search items info?",
    //     name: "searchInfo",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val)){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // },
    // {
    //     when:"operation.add && (!operation.edit || operation.edit && !ishandle)",
    //     type:"editor",
    //     message :"add items info?",
    //     name: "addInfo",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val)){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // },
    // {
    //     when:"operation.edit && (!operation.add || operation.add && !ishandle)",
    //     type:"editor",
    //     message :"edit items info?",
    //     name:"editInfo",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val)){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // },
    // {
    //     when:"operation.view",
    //     type:"editor",
    //     message :"view items info?",
    //     name: "viewInfo",
    //     validate: function(val) {
    //         try {
    //             if(!jsonFormat(val)){
    //                 return "数据格式错误！";
    //             }
    //         } catch (error) {
    //             return "数据格式错误！";
    //         }
    //         return true;
    //     }
    // }
]
;
