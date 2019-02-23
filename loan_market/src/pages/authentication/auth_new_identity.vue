<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>    
        <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="content">
            <p class="prove_title">请拍摄本人手持身份证照片，确保面部和身份证正面信息完整清晰</p>
            <label for="add_img"></label>
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" id="add_img" @change="readFile" v-show="false"/>
            <img ref='holdIdCard' src="../../assets/auth/id_card_front.png" alt="" style="width:5rem;height:auto;" @click='upPhoto'>
        </div>
        <btn-com btnval='下一步' @click.native='newidentity'></btn-com>
    </div>
</template>

<script>
import itemLi from '@/components/list/li';
import btnCom from '@/components/list/btn';
import exif from 'exif-js';
export default {
    data(){
        return{
            isShowLoading:false,
            identityData:{
                handImg:''
            },
            ydConfigDate:{
                notificationUrl:'',
                outOrderId:'',
                pubKey:'',
                securityKey:'',
                timestamp:''
            }
        }
    },
    components : {
        //组件
        itemLi,btnCom
    },
    created(){
        this.ydConfig()
    },
    methods:{
        ydConfig(){
            let _this = this;
            let data={

            }
            _this.$ajax.post('/api/third/ydConfig',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            }).then(res=>{
                this.ydConfigDate = res.data.result;
            }).then(err=>{

            })
        },
        newidentity(){
            var _this = this;
            if(_this.identityData.handImg.length===0){
                _this.$msg({content:'请先完成手持照片拍摄'});
                return;
            }            
            let config = {
                partnerOrderId : this.ydConfigDate.outOrderId||'',   //商户订单号//由商户自行生成，建议传入时保证唯一性并做留存，以便后期直接定位具体订单
                signTime : this.ydConfigDate.timestamp||'',    //签名时间格式：yyyyMMddHHmmss
                sign : this.ydConfigDate.sign||'',    //参见文档说明中的签名机制
                callbackUrl:this.ydConfigDate.notificationUrl||'', //回调 url, 结果异步通知地址
                pubKey:this.ydConfigDate.pubKey||'',
                idName:this.ydConfigDate.userName||'',
                idNumber:this.ydConfigDate.idCard||''
            };
            this.Base.interactiveWithApp('startYHYAuth',config).then(data=>{
                console.log(data,"<<<")
                if(data == 'wap') {
                    //wap端逻辑
                    console.log("wap")
                } else {                    
                    if(data){
                        _this.isShowLoading = true;
                        let imgData = JSON.parse(data);
                        if(imgData.suggest_result == 'T' && imgData.result_status == '01'){
                            this.$msg({content:"认证通过!"})
                            _this.$ajax.post('/api/third/yd/repairOrder',_this.$qs.stringify({}),{
                                headers: _this.Base.initAjaxHeader(1,data)
                            }).then(resData=>{
                                console.log(resData)
                                setTimeout(() => {
                                    this.$router.go(-1);
                                }, 1000);                                
                            })
                        }else{
                            _this.isShowLoading = false;
                            this.$msg({content:"认证失败，请重新认证!"})
                        } 
                    }else{
                        _this.isShowLoading = false;
                        this.$msg({content:"认证失败，请重新认证!"})
                    }
                }
            });             
        },
        upPhoto(){
            if(this.Base.getSysType() == 'IOS'){
                this.Base.interactiveWithApp('getPhoto').then(data=>{
                    if(data == 'wap'){

                    }else{
                        if(data){
                            document.getElementById('add_img').click();
                        }                  
                    }
                }) 
            }else{
                document.getElementById('add_img').click();
            }
        },
        readFile(){
            let _this_ = this;
            var input = document.getElementById("add_img");
            var file = input.files[0];
            _this_.isShowLoading=true;
            //判断是否是图片类型
            if (!/image\/\w+/.test(file.type)) {
                _this_.$msg({content:"只能选择图片"});
                return false;
            }
            exif.getData(file, function() {
                exif.getAllTags(this);
                this.Orientation = exif.getTag(this,'Orientation');
                console.log('拍摄角:',this.Orientation);
            });
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) { 
                _this_.renderImg(this, 'base64');
            }
        },
        renderImg(reader,name){
            let src = reader.result;
            //创建Image对象
            var image = new Image();
            var MAX_SIZE = 500;
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
                console.log(canvas.width,canvas.height);
                //绘制图片
                ctx.drawImage(image, 0, 0, image.width, image.height);
                //生成base64码
                var blob = canvas.toDataURL("image/png");
                let data = {
                    imgContent : blob,
                };
                console.log('待上传的base64图片字符串:',blob.length);
                var input = document.getElementById("add_img");
                _this_.$ajax.post('/api/file/comImgUpload',_this_.$qs.stringify(data),{
                    headers: _this_.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    _this_.$refs.holdIdCard.src=res.data.url;
                    _this_.isShowLoading=false;
                    _this_.identityData.handImg = res.data.url;
                    _this_.$msg({content:'图片上传成功！'});
                    input.value = null;
                    _this_.$previewRefresh();
                }).then(err=>{

                }); 
                return blob;
            };
            image.src = src;
        },
    }
}
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.6rem;
        .content{
            background: #fff;
            text-align: center;
            img{
                padding: .3rem 0;
            }
            .prove_title{
                font-size: .32rem;
                font-weight: 500;
                color: #3e475d;
                padding: .3rem;
                border-bottom: 1px solid #E6E6E6; 
                text-align: left;               
            }
        }
    }
</style>
