<% if(options.operation.indexOf('edit') !== -1 && !options.isHandle){ %>export const editRules = { <% if(options.isConfig){ %><% for(var i=0; i<options.editInfo.length; i++) {%><% if(i!==options.editInfo.length-1){ %>
    <%= options.editInfo[i].field %>:[{required: true, message: '<%= options.editInfo[i].label %>不能为空'}],<% } else { %>
    <%= options.editInfo[i].field %>:[{required: true, message: '<%= options.editInfo[i].label %>不能为空'}]<% } %><% } %><% } else { %>
    <% } %> 
};
<% } %>
<% if(options.isHandle){ %>export const handleRules = { <% if(options.isConfig){ %><% for(var i=0; i<options.handleInfo.length; i++) {%><% if(i!==options.handleInfo.length-1){ %>
    <%= options.handleInfo[i].field %>:[{required: true, message: '<%= options.handleInfo[i].label %>不能为空'}],<% } else { %>
    <%= options.handleInfo[i].field %>:[{required: true, message: '<%= options.handleInfo[i].label %>不能为空'}]<% } %><% } %><% } else { %>
    <% } %> 
};
<% } %>
<% if(options.operation.indexOf('add') !== -1 && !options.isHandle){ %>export const addRules = {<% if(options.isConfig){ %> <% for(var i=0; i<options.addInfo.length; i++) {%><% if(i!==options.addInfo.length-1){ %>
    <%= options.addInfo[i].field %>:[{required: true, message: '<%= options.addInfo[i].label %>不能为空'}],<% } else { %>
    <%= options.addInfo[i].field %>:[{required: true, message: '<%= options.addInfo[i].label %>不能为空'}]<% } %><% } %><% } else { %>
    <% } %> 
};
<% } %>
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
