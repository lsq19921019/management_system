<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>     
        <div class="page_title">
            <p>{{ pageTitles[pageType] }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div style="padding:.1rem .1rem;">
            <div class="add_btn_box" v-if="imgList.length===20?false:true" style="overflow:hidden;width:1.6rem;float: left;padding:.1rem .1rem;"> 
                <label for="add_img" class="add_img_btn">
                    <img src="../../assets/addPhoto.png" alt="">
                </label>
                <input type="file" accept="image/gif,image/jpeg,image/png,image/jpg" v-show="false" id="add_img" @change="readFile"/>
            </div>
            <div v-for="(imgItem,index) in imgList" :key='index' class="img_box" style="padding:.1rem .1rem;">
                <img preview="1" preview-text="描述文字" style="width:1.6rem;height:1.6rem;" :src="imgItem"/>
            </div>
                <!-- <img preview="1" preview-text="描述文字" style="width:1.6rem;height:1.6rem;" src="../../assets/addPhoto.png"/>
                <img preview="1" preview-text="描述文字" style="width:1.6rem;height:1.6rem;" src="../../assets/addPhoto.png"/>
                <img preview="1" preview-text="描述文字" style="width:1.6rem;height:1.6rem;" src="../../assets/addPhoto.png"/>
                <img preview="1" preview-text="描述文字" style="width:1.6rem;height:1.6rem;" src="../../assets/addPhoto.png"/> -->
        </div>
        <btn-com btnval='保存' @click.native="toImgListPage"></btn-com>
    </div>
</template>

<script>
    import itemLi from '@/components/list/li'
    import btnCom from '@/components/list/btn'
import { setTimeout } from 'timers';
    export default {
        name : 'UploadPhoto',
        data() {
            return {
                pageTitles : [
                    '工作证明',
                    '名片',
                    '工资流水',
                    '银行卡流水',
                    '支付宝账单',
                    '淘宝交易记录',
                    '房产证',
                    '行驶证',
                    '信用卡账单',
                    '营业执照',
                    '其他'
                ],
                //路由参数
                pageType : this.$route.params.type,
                imgList:[],
                imgIdList:[],
                subType:'',
                photoList:'',
                isShowLoading:false,
            }
        },
        components : {
            //组件
            itemLi,btnCom
        },
        created() {
            //页面渲染前
            this.photoData();
            this.saveImg();
        },
        mounted() {
            //页面加载完毕   
            // console.log(document.querySelector('.pswp__top-bar'));
            //重置图片预览关闭按钮的高度；
            document.querySelector('.pswp__top-bar').style.top='0.5rem';
            //document.querySelector('.pswp__button--fs').remove();
        },
        methods : {
            // 图片资料接口
            photoData(){
                let _this = this;
                let data = {
                };
                this.$ajax.post('/api/userimg/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                })
                .then(res=>{
                    console.log(res)
                    if(res.status == '200'){
                        _this.imgList = res.data.result.fileItems[_this.pageType].urls;
                        console.log(_this.imgList);
                            _this.$previewRefresh();
                    }else{
                        console.log(res)
                    }
                })
            },
            toImgListPage(){
                let _this = this;
                if(this.imgList.length===0){
                    this.$msg({content:'请先上传图片！'});
                    return;
                }
                let data = {ids:_this.imgIdList.join(',')};
                console.log('<1>',data);
                this.$ajax.post('/api/file/saveUpload',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                })
                .then(res=>{
                    console.log('<2>',res);
                    if(res.data.success){
                        this.$msg({content:'图片保存成功！'});
                        setTimeout(_=>{
                            history.back();
                        },500);
                    }else{
                        this.$msg({content:'图片保存成功！'});
                        setTimeout(_=>{
                            history.back();
                        },500);                        
                    }
                });
            },
            saveImg(){
                let type = parseInt(this.pageType);
                if(type===0){
                    this.subType = 'WORK';
                }else if(type===1){
                    this.subType = 'BUSINESSCARD';
                }else if(type===2){
                    this.subType = 'WAGEWATER';
                }else if(type===3){
                    this.subType = 'BANKWATER';
                }else if(type===4){
                    this.subType = 'ZFBBILL';
                }else if(type===5){
                    this.subType = 'TAOBAOTRADE';
                }else if(type===6){
                    this.subType = 'HOUSECERTIFICATE';
                }else if(type===7){
                    this.subType = 'DRIVERLICENSE';
                }else if(type===8){
                    this.subType = 'CREDITBILL';
                }else if(type===9){
                    this.subType = 'BUSINESSLICENSE';
                }else if(type===10){
                    this.subType = 'OTHER';
                }
            },
            renderImg(src,name){
                //创建Image对象
                var image = new Image();
                var MAX_SIZE = 1000;
                var _this_ = this;
                image.onload = function () {
                    console.log(image.width,image.height);
                    //通过固定的宽高比压缩
                    //宽大于高的情况
                    if (image.width > MAX_SIZE && image.width >= image.height) {
                        image.height *= MAX_SIZE / image.width;
                        image.width = MAX_SIZE;
                    }
                    //宽小于高的情况
                    if (image.height > MAX_SIZE && image.height > image.width) {
                        image.width *= MAX_SIZE / image.height;
                        image.height = MAX_SIZE;
                    }
                    var canvas = document.createElement("canvas");
                    //获取2d画布
                    var ctx = canvas.getContext("2d");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                    //绘制图片
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    //生成base64码
                    var blob = canvas.toDataURL("image/png");
                    console.log(blob);
                    
                    let data = {
                            imgContent : blob,
                            type: 'USERIMGE_TYPE_ADDTION',
                            subType: _this_.subType,
                            //  userId:'1211'
                    };
                    // let data = {
                    //         ocrType:1,
                    //         ocrMode:1,
                    //         positiveImg : blob,
                    //         reverseImg : '',
                    //          userId:'1211'
                    // }
                    var input = document.getElementById("add_img");
                    //      /api/file/base64Upload  /api/idauth/identity
                    _this_.$ajax.post('/api/file/base64Upload',_this_.$qs.stringify(data),{headers: _this_.Base.initAjaxHeader(1,data)}).then(res=>{
                        _this_.isShowLoading = false;
                        if(res.data.code==='success'){
                            _this_.imgList.push(res.data.url);
                            _this_.imgIdList.push(res.data.id);
                            _this_.$msg({content:'图片上传成功！'});
                            input.value=null;
                            _this_.$previewRefresh();
                        }else{
                            _this.$msg({content:'图片上传失败！'});
                        }
						// vm.$previewRefresh();
                    }).then(err=>{

                    }); 
                    // files.push(blob);
                    // document.getElementById("imgLower").src = blob;
                    return blob;
                };
                image.src = src;
            },
            readFile(){
                let _this_ = this;
                _this_.isShowLoading = true;
                var input = document.getElementById("add_img");
                var file = input.files[0];
                //判断是否是图片类型
                if (!/image\/\w+/.test(file.type)) {
                    alert("只能选择图片");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) { 
                    // txshow.src = this.result; 
                    // console.log(this.result); 
                    _this_.renderImg(this.result, 'base64');
                    // console.log(dataImgBase);
                    // let _this = this;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        .add_img_btn{
            width: 1.6rem;
            height: 1.6rem;
            display: block;
            background: url('../../assets/addPhoto.png');
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
        }
        .img_box{
            width: 1.6rem;
            height: 1.6rem;
            float: left;
        }
    }
</style>