<!--
    desc:身份证验证
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>    
        <!-- <span style="display:block" class="tip_laywer" v-if="show_laywer">
            <div style="color:#fff;position:fixed;top:1rem;width:100%;z-index:9999;text-align:center;font-size:.3rem;">数据加载中...</div>
            <span style='display:block;position:fixed;width:100%;height:100%;background-color:#000;top:0;left:0;z-index:999;opacity:.5'>
            </span>
        </span> -->
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="provelist">

            <div class="proveitem">
                <p class="prove_title">第一步：请拍摄身份证正面照</p>
                <div class="prove_img" @click="getIDCardFront">
                    <img ref='IdCardFront' src="../../assets/prove/prove1.png" alt="">
                </div>
                <div class="bom_info">请确保身份证正面信息完整清晰</div>
            </div>
            <div class="proveitem">
                <p class="prove_title">第二步：请拍摄身份证反面照</p>
                <div class="prove_img" @click="getIDCardBack">
                    <img ref='IdCardBack' src="../../assets/prove/prove1.png" alt="">
                </div>
                <div class="bom_info">请确保身份证反面信息完整清晰</div>
            </div>
            <div class="proveitem">
                <p class="prove_title">第三步：请拍摄本人手持身份证照片</p>
                <div class="prove_img" @click="triggerClick">
                    <label for="add_img">
                    </label>
                        <img ref='holdIdCard' src="../../assets/prove/prove1.png" alt="">
                </div>
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" id="add_img" @change="readFile" v-show="false"/>
                <div class="bom_info">请确保本人面部和身份证正面信息完整清晰</div>
            </div>     

            <div class="proveitem">
                <p class="prove_title">第四步：请根据指示完成人脸验证</p>
                <div class="prove_img" @click="startLivingBody">
                    <img ref='faceCheck' src="../../assets/prove/prove1.png" alt="">
                </div>
                <div class="bom_info">请按照要求进行人脸识别</div>
            </div>
        </div>
        <!-- <div class="pdb">
            <btn-com btnval='保存'></btn-com>
        </div> -->
    </div>
</template>

<script>
    import exif from 'exif-js';
    import btnCom from '@/components/list/btn';
    import { setTimeout } from 'timers';
    export default {        
        name : 'IdentityProve',
        data() {
            return {
                hidden: false,
                show_laywer:false,
                identityData: {
                    //身份证正面照base64;
                    positiveImg:'',
                    //身份证反面照返回数据;
                    dataStr:'',
                    //活体检查加密数据包base64
                    queryImg:'',
                    //手持身份证号图片base64；
                    handImg:''
                },
                isShowLoading:false,
                Orientation : '',  //图片的拍摄角
            }
        },
        components : {
            //组件
            btnCom
        },
        created() {
        },
        mounted() {  
        },
        methods:{
            //刘思奇-2018/10/25-身份证照片验证桥接验证
            //获取身份证正面照片信息；
            getIDCardFront() {
                // this.isShowLoading=true;
                var _this = this;
                    _this.Base.interactiveWithApp('getIDCardFront',{}).then(data=>{
                        if(data == 'wap') {
                            console.log('getIDCardFront','wap');
                        } else {
                            let imgData = JSON.parse(data);
                            if(imgData.status==='-100'){
                                return;
                            }
                            let baseData = 'data:image/jpeg;base64,'+imgData.result;
                            // console.log('getIDCardFront',data);
                            let data_obj = {
                                ocrType:1,
                                ocrMode:1,
                                positiveImg:baseData,
                                reverseImg : '',
                                userId:'1211'
                            }
                            
                            _this.isShowLoading = true;
                            _this.$ajax.post('/api/idauth/identity',_this.$qs.stringify(data_obj),{
                                headers: _this.Base.initAjaxHeader(1,data_obj)
                            }).then(res=>{
                                _this.isShowLoading=false;
                                if(parseInt(res.data.status)===0){
                                    if(res.data.result.isPass&&parseInt(res.data.result.isPass)===1){
                                       _this.$refs.IdCardFront.src='data:image/jpeg;base64,'+imgData.result;
                                        _this.$msg({content:res.data.result.msg});
                                        _this.identityData.positiveImg = baseData;
                                    }else{
                                        _this.$msg({content:res.data.result.msg});
                                    }
                               }else{
                                   _this.$msg({content:res.data.msg});
                               }
                            });
                        }
                    });
            },
            getIDCardBack() {
                var _this = this;
                if(_this.identityData.positiveImg.length===0){
                    _this.$msg({content:'请先上传身份证正面照片'});
                    return;
                }
                    _this.Base.interactiveWithApp('getIDCardBack').then(data=>{
                        if(data == 'wap') {
                            console.log('getIDCardBack','wap');
                        } else {
                            let imgData = JSON.parse(data);
                            if(imgData.status==='-100'){
                                return;
                            }
                            let baseData = 'data:image/jpeg;base64,'+imgData.result;
                            console.log('getIDCardFront',data);
                            let data_obj = {
                                ocrType:1,
                                ocrMode:2,
                                positiveImg:'',
                                reverseImg : baseData,
                                userId:'1211'
                            }
                            _this.isShowLoading=true;
                            _this.$ajax.post('/api/idauth/identity',_this.$qs.stringify(data_obj),{
                                headers: _this.Base.initAjaxHeader(1,data_obj)
                            }).then(res=>{
                                _this.isShowLoading=false;
                                if(parseInt(res.data.status)===0){
                                    if(res.data.result.isPass&&parseInt(res.data.result.isPass)===1){
                                            _this.$refs.IdCardBack.src='data:image/jpeg;base64,'+imgData.result;
                                            _this.$msg({content:res.data.result.msg});
                                            _this.identityData.dataStr = JSON.stringify(res.data.result.data);
                                        }else{
                                            _this.$msg({content:res.data.result.msg});
                                        }
                                }else{
                                    _this.$msg({content:res.data.msg});
                                }
                            });
                        }
                    });
            },
            
            //重载页面
            startLivingBody() {
                var _this = this;
                if(_this.identityData.positiveImg.length===0){
                    _this.$msg({content:'请先上传身份证正面照片'});
                    return;
                }
                if(_this.identityData.dataStr.length===0){
                    _this.$msg({content:'请先上传身份证反面照片'});
                    return;
                }
                if(_this.identityData.handImg.length===0){
                    _this.$msg({content:'请先上传手持身份证照片'});
                    return;
                }
                this.Base.interactiveWithApp('startLivingBody',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('startLivingBody','wap');

                    } else {
                        let imgData = JSON.parse(data);
                        let data_obj = {
                                positiveImg:1,
                                dataStr:1,
                                queryImg:'data:image/jpeg;base64,'+imgData.result,
                                handImg:'1211'
                        }
                        if(imgData.status==='-100'){
                            return false;
                        }
                        _this.identityData.queryImg = 'data:image/jpeg;base64,'+imgData.result;
                        _this.isShowLoading=true;
                        _this.$ajax.post('/api/idauth/composite',_this.$qs.stringify(_this.identityData),{
                            headers: _this.Base.initAjaxHeader(1,_this.identityData)
                        }).then(res=>{
                            _this.isShowLoading=false;
                            _this.$msg({content:'验证成功'});
                            setTimeout(_=>{
                                _this.$router.go(-1);
                            },500);
                        });
                    }
                });
            },
            triggerClick(){
                let _this_ = this;
                if(_this_.identityData.positiveImg.length===0){
                    _this_.$msg({content:'请先上传身份证正面照片'});
                    return;
                }
                if(_this_.identityData.dataStr.length===0){
                    _this_.$msg({content:'请先上传身份证反面照片'});
                    return;
                }
                document.getElementById('add_img').click();
            },
            readFile(){
                let _this_ = this;
                if(_this_.identityData.positiveImg.length===0){
                    _this_.$msg({content:'请先上传身份证正面照片'});
                    return;
                }
                if(_this_.identityData.dataStr.length===0){
                    _this_.$msg({content:'请先上传身份证反面照片'});
                    return;
                }
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
                    // txshow.src = this.result; 
                    // console.log(this.result); 
                    _this_.renderImg(this, 'base64');
                    // console.log(dataImgBase);
                    // let _this = this;
                }
            },
            rotateImg(img,direction,canvas) {
                
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
                        // let Orientation = _this_.Orientation;
                        // if(Orientation != "" && Orientation != 1){
                        //     switch(Orientation){  
                        //         case 6://需要顺时针（向左）90度旋转  
                        //             console.log('需要顺时针（向左）90度旋转');  
                        //             rotateImg(this,'left',canvas);  
                        //             break;  
                        //         case 8://需要逆时针（向右）90度旋转  
                        //             console.log('需要顺时针（向右）90度旋转');  
                        //             rotateImg(this,'right',canvas);  
                        //             break;  
                        //         case 3://需要180度旋转  
                        //             console.log('需要180度旋转');  
                        //             rotateImg(this,'right',canvas);//转两次  
                        //             rotateImg(this,'right',canvas);  
                        //             break;  
                        //     }         
                        // } 
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
        .provelist{
            margin-bottom: 1rem;
            .proveitem{
                background: #fff;
                margin-top: .2rem;
                .prove_title{
                    font-size:.32rem;
                    font-weight:500;
                    color:rgba(62,71,93,1);
                    padding: .3rem;
                    border-bottom: 1px solid #E6E6E6; 

                }
                .prove_img{
                    padding: .3rem 0;
                    text-align: center;
                    img{
                        width: 5rem;
                        height: auto;
                    }
                }
                .bom_info{
                    font-size:.3rem;
                    font-weight:500;
                    color:rgba(62,71,93,1);
                    padding: .35rem 0;
                    margin: 0 .3rem;
                    border-top: 1px solid #e6e6e6;
                    text-align: center;             
                }
            }
        }
    }
    .pdb{
        padding-bottom: 1rem;
    }
</style>