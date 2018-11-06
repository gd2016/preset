<template>
    <div>
        <slideout  width="50%" title="查看" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-if="!error" v-loading="loading"><% if(options.isConfig){ %><% for(var i=0; i<options.viewInfo.length; i++) { %>
                    <form-item isStatic label="<%= options.viewInfo[i].label %>" :value="info.<%= options.viewInfo[i].field %>"></form-item><% } %> <% } else { %>
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
            });
        },
        back(){
            this.$router.push({path: '/app'});
        }
    }
};
</script>
