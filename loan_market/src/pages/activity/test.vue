<template>
    <div>
        <span style="display:block" class="tip_laywer" v-if="show_laywer">
            <div style="color:#fff;position:absolute;top:1rem;width:100%;z-index:9999;text-align:center;font-size:.3rem;">数据加载中...</div>
            <span style='display:block;position:fixed;width:100%;height:100%;background-color:#000;top:0;left:0;z-index:999;opacity:.5'>
            </span>
        </span>
        <a href="javascript:;" @click="share">分享</a>
        <a href="javascript:;" @click="getResiterInfo">获取注册渠道</a>        
        <a href="javascript:;" @click="startLivingBody">活体认证(完成之后前端刷新页面)</a>
        <a href="javascript:;" @click="openNewWindow">openNewWindow(打开新页面)</a>
        <hr>
        <p>获取认证信息</p>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['locationInfo','contactInfo','callRecordInfo','smsInfo','deviceInfo','allInstallAppInfo']
        })">全部获取</a><br>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['locationInfo']
        })">locationInfo(定位)</a>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['contactInfo']
        })">contactInfo(联系人)</a>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['callRecordInfo']
        })">callRecordInfo(通话记录)</a>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['smsInfo']
        })">smsInfo(短信)</a>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['deviceInfo']
        })">deviceInfo(设备信息)</a>
        <a href="javascript:;" @click="getCertifyInfo({
            token : token,
            certifyInfo : ['allInstallAppInfo']
        })">allInstallAppInfo(应用列表)</a>
        <hr>
<!--刘思奇-2018/10/25-身份证照片验证桥接验证-->
        <p>获取身份证照片</p>
        <a href="javascript:;" @click="getIDCardFront({
            token : token,
            certifyInfo : ['getIDCardFront']
        })">getIDCardFront(获取身份证正面照)</a>
        <a href="javascript:;" @click="getIDCardBack({
            token : token,
            certifyInfo : ['getIDCardBack']
        })">getIDCardBack(获取身份证反面照)</a>
        <hr>
        <a href="javascript:;" @click="selectContact('contact1')">{{ contact1 }}</a>
        <a href="javascript:;" @click="selectContact('contact2')">{{ contact2 }}</a>

        <img ref="img_show" src="../../assets/addPhoto.png" style="width:100%;"/>
        <textarea ref="text_area" name="" id="" cols="30" rows="100" style="width:100%;"></textarea>
    </div>
    
</template>

<script>
    export default {
        name : 'test',
        data() {
            return {
                
                token : 'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJseWF3bmJpZXVpMTUzOTc2NjYyMTkxMSIsImV4cCI6MTUzOTc2NzI1NCwic3ViIjoiMyIsInJkbSI6MTEzNTcsInJmdCI6MTU0MDExMjI1NCwiaXNzIjoieXhoayIsImp0aSI6IjUwZTUyMzVmYjQ3NjRjYjlhNGQ3ZjVlZjllNjRiNTRhIn0.Hwf_JdIzRZE_xTZ8P7duNrLUavSWuCHKe-JCXYsMzn0',
                show_laywer:false,
                img_url:'../../assets/addPhoto.png',
                 contact1 : '选择联系人1',
                contact2 : '选择联系人2',

            }
        },
        created() {
            this.getResiterInfo();
        },
        methods: {
            //openNewWindow
            //author：刘思奇-2018/11/5;
            //传参
            //title:页面名称；
            //url：跳转url；
            //startColor:渐变起始色/十六进制；
            //endColor:渐变结束色/十六进制；
            //reload:true/false 布尔值；
            //backUrl：按钮名称； 
            openNewWindow(){
                // alert(document.title+"===="+window.location.href);
                this.Base.interactiveWithApp('openNewWindow',{backUrl:'回到人人贷款',title:document.title,url:location.href, startColor:"#6A5CF6",endColor:"#8BE2F1",reload:true}).then(data=>{
                    if(data == 'wap') {
                        //wap端逻辑
                        console.log('jumpToSharing','wap');
                    } else {
                        alert('刷新！');
                        console.log('jumpToSharing',data);
                    }
                });
            },
            //分享

            share() {
                let data = {
                    status : 0,
                    msg : 'success',
                    result : {
                        title : '注册协议啊啊啊',
                        content : '小鸽注册协议内容',
                        url : location.href,
                        icon : 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg',
                        shareType : 'all'
                    }
                };
                this.Base.interactiveWithApp('jumpToSharing',data).then(data=>{
                    if(data == 'wap') {
                        //wap端逻辑
                        console.log('jumpToSharing','wap');
                    } else {
                        console.log('jumpToSharing',data);
                    }
                });
            },
            //获取注册渠道
            getResiterInfo() {
                this.Base.interactiveWithApp('getAppInfo',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('getAppInfo','wap');
                    } else {
                        console.log('getAppInfo',data);
                    }
                });
            },
            //获取信息;
            getCertifyInfo(key) {
                let _this = this;
                this.Base.interactiveWithApp('getCertifyInfo',key).then(data=>{
                    if(data == 'wap') {
                        console.log('getCertifyInfo','wap');
                    } else {

                        console.log('getCertifyInfo',data);
                    }
                });
            },
            //选择联系人
            selectContact(key) {
                let _this = this;
                this.Base.interactiveWithApp('selectContact',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('selectContact','wap');
                    } else {
                        data = JSON.parse(data).result;
                        _this[key] = data.name + ':' + data.phone;
                        // 姓名 : 17328360726
                        console.log('selectContact',data);
                    }
                });
            },
            //重载页面
            startLivingBody() {
                this.show_laywer=true;
                var _this = this;
                this.Base.interactiveWithApp('startLivingBody',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('startLivingBody','wap');
                    } else {
                            alert(data);

                            let imgData = JSON.parse(data);
                            // let imgData = data;
                            // alert(imgData.result);
                            // _this.$refs.faceCheck.src='data:image/jpeg;base64,'+imgData.result;
                            let data_obj = {
                                    positiveImg:1,
                                    dataStr:1,
                                    queryImg:'data:image/jpeg;base64,'+imgData.result,
                                    handImg:'1211'
                            }
                            if(imgData.status==='-100'){
                                _this.show_laywer=false;
                                alert('活体检测失败！');
                                return false;
                            }
                                alert('活体检测成功！');

                            _this.show_laywer=false;
                                // _this.identityData.queryImg = 'data:image/jpeg;base64,'+imgData.result;
                                // alert(_this.identityData);
                            // _this.$ajax.post('/api/idauth/composite',_this.$qs.stringify(_this.identityData),{headers: _this.Base.initAjaxHeader(1,_this.identityData)}).then(res=>{
                            //     // alert(JSON.stringify(res));
                            //     _this.show_laywer=false;
                            //     _this.$msg({content:'验证成功'});
                            //     setTimeout(_=>{
                            //         window.location.href = '/auth/identity';
                            //     },500);
                            // });
                    }
                });
            },
            //刘思奇-2018/10/25-身份证照片验证桥接验证
            //获取身份证正面照片信息；
            getIDCardFront() {
                this.show_laywer=true;
                var _this = this;
                setTimeout(function(){
                    _this.Base.interactiveWithApp('getIDCardFront',arr).then(data=>{
                        // _this.show_laywer=false;
                        if(data == 'wap') {
                                _this.show_laywer=false;
                            console.log('getIDCardFront','wap');
                        } else {
                            alert(data);

                            let imgData = JSON.parse(data);
                            
                            if(imgData.status==='-100'){
                            _this.show_laywer=false;
                                alert('获取身份证正面失败！');
                                return false;
                            }

                            _this.$refs.img_show.src='data:image/jpeg;base64,'+imgData.result;
                            let baseData = 'data:image/jpeg;base64,'+imgData.result;
                            console.log('getIDCardFront',data);
                            let data_obj = {
                                    ocrType:1,
                                    ocrMode:1,
                                    positiveImg:baseData,
                                    reverseImg : '',
                                    userId:'1211'
                            }

                            _this.$ajax.post('/api/idauth/identity',_this.$qs.stringify(data_obj),{headers: _this.Base.initAjaxHeader(1,data_obj)}).then(res=>{
                                
                                _this.show_laywer=false;
                                // alert('成功');
                                alert(JSON.stringify(res.data));
                            });
                        }
                    });
                },500)
            },
            //获取身份证反面面照片信息；
            getIDCardBack() {
                this.show_laywer=true;
                var _this = this;
                setTimeout(function(){
                    _this.Base.interactiveWithApp('getIDCardBack',arr).then(data=>{
                        if(data == 'wap') {
                                _this.show_laywer=false;
                            console.log('getIDCardBack','wap');
                        } else {
                           
                            alert(data);

                            let imgData = JSON.parse(data);
                            _this.$refs.img_show.src='data:image/jpeg;base64,'+imgData.result;
                            let baseData = 'data:image/jpeg;base64,'+imgData.result;
                            console.log('getIDCardFront',data);


                            if(imgData.status==='-100'){
                                _this.show_laywer=false;
                                alert('获取身份证反面失败！');
                                return false;
                            }
                            

                            let data_obj = {
                                    ocrType:1,
                                    ocrMode:2,
                                    positiveImg:'',
                                    reverseImg : baseData,
                                    userId:'1211'
                            }
                            _this.$ajax.post('/api/idauth/identity',_this.$qs.stringify(data_obj),{headers: _this.Base.initAjaxHeader(1,data_obj)}).then(res=>{
                                
                                _this.show_laywer=false;
                                // alert('成功');
                                alert(JSON.stringify(res.data));
                            });
                        }
                    });
                },500);
            }
        },
    }
</script>

<style scoped>
    div{
        padding-top:1rem;
    }
    a{
        display:inline-block;
        padding:.1rem .3rem;
        color:#fff;
        background:#f63;
        font-size:.22rem;
        text-align:center;
        margin:.1rem;
        border-radius:.1rem;
    }
    p{
        font-size:.24rem;
        line-height:1.5;
        color:#666;
        padding:0 .1rem;
    }
</style>