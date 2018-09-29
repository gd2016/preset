{{#if_nothandle ishandle operation.edit}}export const editRules = { {{#each_handle editInfo}}
    {{#if_is @index @length}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}]{{else}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],{{/if_is}}{{/each_handle}}
};
{{/if_nothandle}}

{{#ishandle}}
export const handleRules = { {{#each_handle handleInfo}}
    {{#if_is @index @length}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}]{{else}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],{{/if_is}}{{/each_handle}}
};
{{/ishandle}}
{{#if_nothandle ishandle operation.add}}export const addRules = { {{#each_handle addInfo}}
    {{#if_is @index @length}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}]{{else}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],{{/if_is}}{{/each_handle}}
}
;
{{/if_nothandle}}
//eg
// export const actConfigRules = {
//     DailyLimit: [
//                  { required: true, message: '每日投入上限不能为空'},
//                  {pattern: /^(0|[1-9][0-9]*)$/, message: '格式不正确'}
//                 ],//多项规则使用数组
//     custom:[custom],
// Dates: [{type: 'object', required: true, //dates控件绑定的数据对象的校验写法
//     fields: {
//         begin: [{   required: true,pattern:/[^0]/, message: '开始时间不能为空'}],
//         end: [{   required: true,pattern:/[^0]/, message: '结束时间不能为空'}],
//     }
// }]
// };
// var custom = { //自定义校验规则
//     validator:(rule,value,callback)=>{
//         if(/^[0-9]+$/.test(value) == false){
//             callback(new Error('不能为汉字'));
//         }else{
//             callback();
//         }
//     }
// }
//官网 ：https://github.com/yiminghe/async-validator
//中文介绍：https://blog.csdn.net/langxifu/article/details/80942501
