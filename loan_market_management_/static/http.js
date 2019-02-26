import axios from 'axios';
import qs from 'qs';

export default (_this,config)=>{
    return new Promise((resolve,reject)=>{
        const loading = _this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
            method : config.method || 'POST',
            url : `/api/${config.url}`,
            data : qs.stringify(config.data ? config.data : {}),
            headers: {
                'token': localStorage.getItem('_token') ? localStorage.getItem('_token') : ''
            },
            timeout : config.timeout || 300000
        }).then(res=>{
            if(res.status == 200) {
                let data = res.data;
                if(data.status == 0) {
                    //请求成功
                    resolve(data.result);
                } else if(data.status == config.status) {
                    reject(data.status);
                } else if(data.status == '-3') {
                    _this.$message({
                        message : data.msg,
                        showClose : true,
                        type : 'warning'
                    });
                    _this.$router.push({ name : 'Login' });
                } else {
                    _this.$message({
                        message : data.msg,
                        showClose : true,
                        type : 'warning'
                    });                    
                }
            } else {
                _this.$message({
                    message : '请求失败',
                    showClose : true,
                    type : 'error'
                });
            }
            loading.close();
        },err=>{
            loading.close(); 
            if(err.code == 'ECONNABORTED') {
                _this.$message({
                    message : '请求超时，请重试',
                    showClose : true,
                    type : 'error'
                }); 
            }
            if(err.response.status == 404) {
                _this.$message({
                    message : '请求地址不存在',
                    showClose : true,
                    type : 'error'
                });
            } else {
                _this.$message({
                    message : '错误的请求',
                    showClose : true,
                    type : 'error'
                });
            }             
        }); 
    });
}