<template>
    <span style="position:relative;overflow:hidden">
        <el-button type="success" size="mini">{{btnText}}</el-button>
        <input type="file" style="position:absolute;left:0;right:0;opacity:0;top:0;width:78px" name="" id="file" @change="upload">
        <!-- <el-tag
            :key="file"
            v-for="file in fileList"
            closable
            :disable-transitions="false"
            size="mini"
            style="margin-top:10px;padding:0 10px;"
            @close="handleClose(file)">
            {{file}}
        </el-tag> -->
    </span>
</template>
<script>
import $ from 'jquery';
  export default {
    props:['btnText','url','providerid'],
    data() {
      return {
          fileList: [],        
      };
    },
    mouted(){
        this.fileList=[];
    },
    methods: {
        handleClose(file) {
            this.fileList.splice(this.fileList.indexOf(file), 1);
        },
        showLoading(){
            const loading = this.$loading({
                lock: true,
                text: '文件上传中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        closeLoading(){
            const loading = this.$loading({
                lock: true,
                text: '文件上传中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            loading.close();
        },
        upload(file){
            if (event.target.files.length > 0) {
                var file = event.target.files[0];
                if (file) {
                    var formdata = new FormData();
                    formdata.append('file', file);
                    formdata.append('providerid',this.providerid);
                    var _this = this;
                    $.ajax({
                        url: _this.url,
                        type: 'POST',
                        dataType: 'json',
                        data: formdata,
                        cache: false,
                        headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                        processData: false, //不自动处理参数
                        contentType: false, //不设置传输类型
                            beforeSend : function(){
                            _this.showLoading();
                        },
                        success: function(data) {
                            if(data.success){
                                console.log(data)
                                if(data.data == '-3'){//登陆态失效
                                    this.$message.error(data.message);
                                    setTimeout(function(){
                                        window.location.href = './login'
                                    },1000);  
                                }else{
                                    _this.closeLoading();
                                    $('#file').val('');
                                    _this.fileList.push(file.name);
                                    _this.$message({
                                        type: 'success',
                                        message: data.message
                                    });

                                    _this.$emit('uploadData',data.data);
                                }
                            }else{
                                _this.closeLoading();
                                 $('#file').val('');
                                _this.$message({
                                    type: 'warning',
                                    message: data.message
                                });
                            }
        
                        },
                        error:function(){
                             $('#file').val('');
                        }
                    });
                } else {
                    _this.$message({
                        type: 'warning',
                        message:'请选择文件'
                    });
                }
            }
        }, 
    }
  }
</script>