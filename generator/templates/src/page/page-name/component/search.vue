<template>
    <ct-form  searchForm :loading="loading" @search="search"><% if(options.isConfig){ %><% for(var i=0; i<options.searchInfo.length; i++) {%><% if(options.searchInfo[i].type==='select'){ %>
        <form-item prop="<%= options.searchInfo[i].field %>" v-model="formData.<%= options.searchInfo[i].field %>" label="<%= options.searchInfo[i].label %>" type="select" :list="typeList" defaultSelect></form-item><% } else if(options.searchInfo[i].type==='autoComplete'){ %>
        <form-item prop="<%= options.searchInfo[i].field %>" type="autoComplete" v-model="formData.<%= options.searchInfo[i].field %>" label="<%= options.searchInfo[i].label %>" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item><% } else { %>
        <form-item prop="<%= options.searchInfo[i].field %>" type="<%= options.searchInfo[i].type %>" v-model="formData.<%= options.searchInfo[i].field %>" label="<%= options.searchInfo[i].label %>" ></form-item><% } %><% } %> <% } else { %>
        <% } %>
    </ct-form> 
</template>

<script>
import Const from 'common/const';
export default {
    data() {
        return {
            typeList: Const.getData({col: 'type'})
        };
    },
    methods: {
        search(){
            this.$emit('search');
        }
    },
    props: ['loading', 'searchInfo']
};
</script>
