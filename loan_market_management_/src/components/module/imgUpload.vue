<!--
    create : 田鹏伟 2018-12-10
    desc : 图片上传
-->
<template>
    <div>
        <el-upload
            class="upload-demo"
            :action="imgUploadUrl"
            :headers="params"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSucess"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传JPG/PNG/JPEG文件，且不超过500KB</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name : 'ImgUpload',
        data() {
            return {
                fileList : [],
                imgUploadUrl : location.origin+'/api/file/fileImgUpload',
                params : {
                    token : localStorage.getItem('_token')
                }
            }
        },
        props : {
            imgUrl : '',
            field : '',
            id : 0
        },
        watch : {
            imgUrl(newValue,oldValue) {
                this.fileList = [];
                if(this.imgUrl.length == '') {
                } else {
                    this.fileList.push({
                        name : 'banner', url : this.imgUrl
                    });
                }
            }
        },
        created() {
            console.log(this.id);
            if(this.imgUrl.length == '') {
            } else {
                this.fileList.push({
                    name : 'banner', url : this.imgUrl
                });
            }
        },
        methods : {            
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.$emit('getImgUrl',{
                    url : '',
                    field : this.field
                });
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSucess(file,fileList) {
                console.log(file);
                this.fileList = [{
                    name : fileList.name,
                    url : fileList.url
                }];
                //把上传之后的图片url发送给父组件
                this.$emit('getImgUrl',{
                    url : file.result.url,
                    field : this.field
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-upload__tip{color:red;}
</style>