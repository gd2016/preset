<template>
    <div>
        <slideout  width="50%" title="查看" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-if="!error" v-loading="loading">
                    {{#each_view viewInfo}}
                    <form-item isStatic label="{{@label}}" :value="info.{{@field}}"></form-item>
                    {{/each_view}}
                </ct-form>
                <div v-if="error" class="error">\{{error}}</div>
            </template>
        </slideout>
    </div>
</template>
<script>
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
export default { 
    mixins: [mixin],
    data() {
        return { 
            info: {},
            show: false
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
            this.ajax({
                url: Interface.index.detail,
                data: {
                    Id: this.$route.query.id
                }
            }).then((res)=>{
                this.info = res.Data;
            })
        },
        back(){
            this.$router.push({path: '/app'});
        }
    }
};
</script>
