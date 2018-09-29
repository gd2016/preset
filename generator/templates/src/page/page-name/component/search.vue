<template>
    <ct-form  searchForm :loading="loading" @search="search">
        {{#each_search searchInfo}}
        {{#if_is @type 'select'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" defaultSelect></form-item>{{else if_is @type 'autoComplete'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item>{{else}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}"></form-item>{{/if_is}}
        {{/each_search}}
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
