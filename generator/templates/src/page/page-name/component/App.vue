<template>
    <div class="container-fluid"><% if(options.operation.indexOf('search') !== -1){ %>
        <search :searchInfo="searchInfo" :loading="loading" @search="search"></search><% } %><% if(options.operation.indexOf('add') !== -1){ %>
        <div class="clearfix mb10">
            <router-link :to="{path:'/app/add'}" class="pull-right btn btn-primary"><i class="glyphicon glyphicon-plus"></i>添加</router-link>
        </div><% } %>
        <adc-table  :data="list" v-loading="loading" :status="status"  :msg="message"><% if(options.isConfig){ %><% for(var i=0; i<options.tableInfo.length; i++){ %><% if(options.tableInfo[i].type==='date'){ %>
            <adc-column prop="<%= options.tableInfo[i].field %>" filter="dateTimeFormat" name="<%= options.tableInfo[i].label %>"></adc-column><% } else if(options.tableInfo[i].type==='select'){ %>
            <adc-column :mapper="stateFormat" prop="<%= options.tableInfo[i].field %>" name="<%= options.tableInfo[i].label %>"></adc-column><% } else { %>
            <adc-column prop="<%= options.tableInfo[i].field %>" name="<%= options.tableInfo[i].label %>"></adc-column><% } %><% } %><% } else { %>
            <% } %>
            <adc-column name="操作">
                <template slot-scope="data"><% if(options.operation.indexOf('view') !== -1){ %>
                    <router-link :to="{path:'/app/view',query: { id: data.item.Id }}" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-search"></i>查看</router-link><% } %>
                    <% if(options.operation.indexOf('edit') !== -1){ %><router-link :to="{path:'/app/edit',query: { id: data.item.Id }}" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-edit"></i>编辑</router-link><% } %>
                    <% if(options.operation.indexOf('delete') !== -1){ %><button type="button" class="btn btn-xs btn-danger" @click="remove($event,data.item.Id)"><i class="glyphicon glyphicon-trash"></i>删除</button><% } %>
                </template>
            </adc-column>
        </adc-table>
        <page form :curr-page="pageCfg.PageIndex" :page-len="pageCfg.PageSize" :total-num="count" @change-page="changePage"></page>
        <router-view @refresh="refresh"></router-view>
    </div>
</template>

<script><% if(options.operation.indexOf('search') !== -1){ %>
import search from './search';<% } %>
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import page from 'ct-adc-page';
import Const from 'common/const';
export default {
    data() {
        return {
            stateFormat: Const.getData({col: 'state'}),
            searchInfo: {},
            pageCfg: {
                PageIndex: 1,
                PageSize: 10
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.ajax({
                type: 'getList',
                url: Interface.index.list,
                data: this.pageCfg
            });
        }<% if(options.operation.indexOf('search') !== -1){ %>,
        search(){
            this.pageCfg = Object.assign(this.pageCfg, this.searchInfo);
            this.pageCfg.PageIndex = 1;
            this.getData();
        }<% } %>,
        changePage(index){
            this.pageCfg.PageIndex = index;
            this.getData();
        },
        refresh(isEdit){
            if (isEdit) this.getData();
            else {
                this.pageCfg.PageIndex = 1;
                this.getData();
            }
        }<% if(options.operation.indexOf('delete') !== -1){ %>,
        remove(event, id){
            event.stopPropagation();
            this.$pop({
                ref: event.target,
                placement: 'top',
                msg: '确定删除',
                yes: ()=>{
                    this.ajax({
                        url: Interface.index.remove,
                        data: {
                            Id: id
                        },
                        method: 'post'
                    }).then((res)=>{
                        this.minimsg = this.$minimsg({
                            type: 'success',
                            content: res.Message
                        });
                        this.refresh(true);
                    });
                }
            });
        }<% } %><% if(options.operation.indexOf('pupup') !== -1){ %>
        popup(event, id){
            event.stopPropagation();
            this.$pop({
                ref: event.target,
                placement: 'top',
                msg: 'popup信息',
                yes: ()=>{
                    this.ajax({
                        url: Interface.index.popup,
                        data: {
                            Id: id
                        },
                        method: 'post'
                    }).then((res)=>{
                        this.minimsg = this.$minimsg({
                            type: 'success',
                            content: res.Message
                        });
                        this.refresh(true);
                    });
                }
            });
        }<% } %>
    },
    mixins: [mixin],
    components: {
        page<% if(options.operation.indexOf('search') !== -1){ %>,
        search<% } %>
    }
};
</script>