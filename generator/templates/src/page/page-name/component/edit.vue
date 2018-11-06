<template>
    <div>   
        <slideout width="60%" title="编辑" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form  @save="save" @cancel="show=false" v-if="!error" v-loading="loading" ref="forms" :rules="rules"><% if(options.isConfig){ %><% for(var i=0; i<options.editInfo.length; i++) {%><% if(options.editInfo[i].type==='select'){ %>
                    <form-item prop="<%= options.editInfo[i].field %>" v-model="formData.<%= options.editInfo[i].field %>" label="<%= options.editInfo[i].label %>" type="select" :list="typeList" defaultSelect></form-item><% }else if(options.editInfo[i].type==='autoComplete'){  %>
                    <form-item prop="<%= options.editInfo[i].field %>" type="autoComplete" v-model="formData.<%= options.editInfo[i].field %>" label="<%= options.editInfo[i].label %>" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item><% }else if(options.editInfo[i].type==='checkbox'){ %>
                    <form-item prop="<%= options.editInfo[i].field %>" type="checkbox" v-model="formData.<%= options.editInfo[i].field %>" label="<%= options.editInfo[i].label %>" :list="typeList" ></form-item><% } else if(options.editInfo[i].type==='radio'){ %>
                    <form-item prop="<%= options.editInfo[i].field %>" type="radio" v-model="formData.<%= options.editInfo[i].field %>" label="<%= options.editInfo[i].label %>" :list="typeList" ></form-item><% } else { %>
                    <form-item prop="<%= options.editInfo[i].field %>" type="text" v-model="formData.<%= options.editInfo[i].field %>" label="<%= options.editInfo[i].label %>" ></form-item><% } %><% } %><% } else { %>
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
import {editRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: editRules,
            show: false,
            saveShow: false,
            TypeList: Const.getData({col: 'type'}),
            formData: {
                Id: this.$route.query.id
            }
        };
    },
    created() {
        this.getData(); 
    },
    mounted() {
        this.show = true;
    },
    methods: {
        getData(){
            this.getInfo({
                url: Interface.index.detail,
                data: {
                    Id: this.$route.query.id
                }
            }).then((res)=>{
                this.formData = res.Data;
            }).catch((error)=>{
                this.error = error.message;
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
                        this.show = false;
                        this.$emit('refresh', true);
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
