<template>
    <div>   
        <slideout width="60%" title="添加" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-loading="loading" @save="save" @cancel="show=false" ref="forms" :rules="rules"><% if(options.isConfig){ %><% for(var i=0; i<options.addInfo.length; i++) {%><% if(options.addInfo[i].type==='select'){ %>
                    <form-item prop="<%= options.addInfo[i].field %>" v-model="formData.<%= options.addInfo[i].field %>" label="<%= options.addInfo[i].label %>" type="select" :list="typeList" defaultSelect></form-item><% }else if(options.addInfo[i].type==='autoComplete'){  %>
                    <form-item prop="<%= options.addInfo[i].field %>" type="autoComplete" v-model="formData.<%= options.addInfo[i].field %>" label="<%= options.addInfo[i].label %>" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item><% }else if(options.addInfo[i].type==='checkbox'){ %>
                    <form-item prop="<%= options.addInfo[i].field %>" type="checkbox" v-model="formData.<%= options.addInfo[i].field %>" label="<%= options.addInfo[i].label %>" :list="typeList" ></form-item><% } else if(options.addInfo[i].type==='radio'){ %>
                    <form-item prop="<%= options.addInfo[i].field %>" type="radio" v-model="formData.<%= options.addInfo[i].field %>" label="<%= options.addInfo[i].label %>" :list="typeList" ></form-item><% } else { %>
                    <form-item prop="<%= options.addInfo[i].field %>" type="text" v-model="formData.<%= options.addInfo[i].field %>" label="<%= options.addInfo[i].label %>" ></form-item><% } %><% } %><% } else { %>
                    <% } %>
                </ct-form>
            </template>
        </slideout>
    </div>
</template>

<script>
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import Const from 'common/const';
import {addRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: addRules,
            show: false,
            saveShow: false,
            typeList: Const.getData({col: 'type'}),
            formData: {}
        };
    },
    mounted() {
        this.show = true;
    },
    methods: {
        save(){
            this.$refs.forms.validate((res)=>{
                if (res){
                    this.ajax({
                        type: 'submit',
                        url: Interface.index.post,
                        data: this.formData
                    }).then(()=>{
                        this.$emit('refresh');
                        this.show = false;
                    });
                } else {
                    this.minimsg = this.$minimsg({
                        type: 'error',
                        content: '当前有未完成的校验信息'
                    });
                }
            });
        },
        back(){
            this.$router.push({path: '/app'});
        }
    }
};
</script>
