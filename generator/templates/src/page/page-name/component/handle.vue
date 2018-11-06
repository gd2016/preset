<template>
    <div>   
        <slideout width="60%" :title="title" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form @save="save" @cancel="show=false" v-if="!error" v-loading="loading" ref="forms" :rules="rules"><% if(options.isConfig){ %><% for(var i=0; i<options.handleInfo.length; i++) {%><% if(options.handleInfo[i].type==='select'){ %>
                    <form-item prop="<%= options.handleInfo[i].field %>" type="select" v-model="formData.<%= options.handleInfo[i].field %>" label="<%= options.handleInfo[i].label %>"  :list="typeList" defaultSelect></form-item><% }else if(options.handleInfo[i].type==='autoComplete'){  %>
                    <form-item prop="<%= options.handleInfo[i].field %>" type="autoComplete" v-model="formData.<%= options.handleInfo[i].field %>" label="<%= options.handleInfo[i].label %>" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item><% }else if(options.handleInfo[i].type==='checkbox'){ %>
                    <form-item prop="<%= options.handleInfo[i].field %>" type="checkbox" v-model="formData.<%= options.handleInfo[i].field %>" label="<%= options.handleInfo[i].label %>" :list="typeList" ></form-item><% } else if(options.handleInfo[i].type==='radio'){ %>
                    <form-item prop="<%= options.handleInfo[i].field %>" type="radio" v-model="formData.<%= options.handleInfo[i].field %>" label="<%= options.handleInfo[i].label %>" :list="typeList" ></form-item><% } else { %>
                    <form-item prop="<%= options.handleInfo[i].field %>" type="text" v-model="formData.<%= options.handleInfo[i].field %>" label="<%= options.handleInfo[i].label %>" ></form-item><% } %><% } %><% } else { %>
                    <% } %>
                </ct-form>
                <div v-if="error" class="error">{{error}}</div>
            </template>
        </slideout>
    </div>
</template>

<script>
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import Const from 'common/const';
import {handleRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: handleRules,
            show: false,
            saveShow: false,
            typeList: Const.getData({col: 'type'}),
            formData: {},
            title: this.$route.query.id ? '编辑' : '添加'
        };
    },
    computed: {
        isEdit(){
            return typeof this.$route.query.id !== 'undefined';
        }
    },
    created() {
        if (this.isEdit) this.getData();
    },
    mounted() {
        this.show = true;
    },
    methods: {
        getData(){
            this.ajax({
                url: Interface.index.detail,
                data: {
                    Id: this.$route.query.id
                }
            }).then((res)=>{
                this.formData = res.Data;
            });
        },
        save(){
            this.$refs.forms.validate((res)=>{
                if (res){
                    this.ajax({
                        type: 'submit',
                        url: Interface.index.post,
                        data: this.formData
                    }).then(()=>{
                        this.$emit('refresh', this.isEdit);
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
