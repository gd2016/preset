import axios from '../untils/axios';
export default {
    data(){
        return {
            loading: false, //页面加载状态
            status: true, //表格列表加载状态
            message: '', //表格列表加载出错的信息
            minimsg: '', //弱提示
            error: '', //错误信息
            list: [], //表格列表
            count: 0 //分页总记录数
        };
    },
    methods: {
        loadSuccess(){
            this.loading = false;
            this.status = true;
        },
        handleFail(msg){
            this.loading = false;
            this.status = false;
            this.message = msg.message;
            this.count = 0;
        },
        saveSuccess(){
            this.loading = false;
            this.minimsg = this.$minimsg({
                type: 'success',
                content: '保存成功'
            });
        },
        ajax({method = 'get', url, data, type}){
            if (type === 'getList'){ //表格列表
                this.loading = true;
                this.count = 0; 
            } else if (type === 'submit'){ //提交表单
                this.loading = true;
                method = 'post';
            }
            this.error = '';
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    params: method === 'get' ? data : '',
                    data: data
                }).then((res)=>{
                    if (type === 'getList'){
                        this.loadSuccess(res);
                    } else if (type === 'submit'){
                        this.saveSuccess();
                    }
                    this.error = '';
                    resolve(res);
                }).catch((error)=>{
                    if (type === 'getList'){
                        this.handleFail(error);
                    } else {
                        this.loading = false;
                        this.error = error.message;
                        this.minimsg = this.$minimsg({
                            type: 'error',
                            content: error.message
                        });
                    }
                    reject(error);
                });
            });
        }
    }
};
