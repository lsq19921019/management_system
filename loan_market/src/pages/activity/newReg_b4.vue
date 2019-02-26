<!--
    create:luofeifei 2018/11/21
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img"></div>
        <div class="main_con">
            <div class="top">
                <p class="p1">最高可借额度  (元)</p>
                <div class="money">200000</div>
                <!-- <number-grow :value='200000'></number-grow> -->
                <p class="p2">根据审核结果不同放款额度及放款时间不同</p>
            </div>
            <div class="t1">
                <div class="phone_box">
                    <input class="phone_txt" v-model="mobile" type="tel" maxlength="11" placeholder="请输入您的手机号" @focus="inpFoc" @blur="inpBlur">
                </div>
                <div class="password_box">
                    <input class="password_txt" v-model="code" type="tel" maxlength="6" placeholder="请输入验证码" @focus="inpFoc" @blur="inpBlur">
                    <span class="v_code" :disabled="codeBtnStauts" @click="handlerCode">{{ codeBtnText }}</span>
                </div>
                <a href="javascript:;" class="reg_btn" @click="handlerLogin">查看我的额度</a>
                <div class="tips">
                    具体放款额度，以平台实际审核为准<br>{{ companyName }}<span v-if="isShowIcp">&nbsp;&nbsp;粤ICP备17096796号-1</span>
                </div>
            </div>
        </div>
        <!-- 图形验证码 -->
        <img-code v-if="isShowImgCode" @hideImgCode="hideImgCode" @getCode="handlerGetCode" :mobile="mobile" @getImgCode="getImgCode"></img-code>
        <div class="t2" :style="'height:'+t2Height+'rem;'">

        </div>        
    </div>
</template>

<script>
    import DES3 from '../../../static/3DES.js';
    import imgCode from '../../components/module/imgCode.vue';
    import numberGrow from '../../components/list/number.vue';
    import { initData, login, getCode, getSendNum } from './register.js';
    export default {
        name : 'Login',
        data() {
            return Object.assign(initData(this),{
                companyName : '深圳微融信息科技有限公司',
                //页面路由
                fullPath : this.$router.history.current.fullPath,
                t2Height:1,
                isShowIcp : true,
                mobile : localStorage.getItem('_mobile')?localStorage.getItem('_mobile'):'',
            });
            // return {
            //     isShowLoading : false,
            //     t2Height:1,
            //     apiPath : {
            //         register : '/api/user/register',
            //         msgCode : '/api/message/sms_code',
            //         sendNum : '/api/message/image_code_frequency'
            //     },
            //     mobile : localStorage.getItem('_mobile')?localStorage.getItem('_mobile'):'',
            //     code : '',
            //     codeBtnStauts : false,
            //     codeBtnText : '获取验证码',
            //     isShowImgCode : false,
            //     //获取的子组件图形验证码
            //     imgCode : '',
            //     //从app获取注册渠道码
            //     sourceCode : this.$route.params.sourceCode ? this.$route.params.sourceCode : '',
            //     //页面路由
            //     fullPath : this.$router.history.current.fullPath,
            //     companyName : '深圳微融信息科技有限公司',
            //     isShowIcp : true
            // }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#ffffff')
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        },
        components : {
            imgCode,numberGrow
        },
        created() {
            this.getResiterInfo();
            if(this.fullPath.indexOf('/newRegB4') > -1) {
                this.companyName = '';
                this.isShowIcp = false;
            }
        },
        mounted() {
        },
        methods : {
            inpFoc(){
                this.t2Height = 2;
            },
            inpBlur(){
                this.t2Height = 1;
            },

            //登录
            handlerLogin() {
                login(this);
            },
            //获取验证码
            handlerGetCode() {
                getCode(this);
            },
            //获取验证码发送次数
            handlerSendNum() {
                return getSendNum(this);
            },
            //登录成功执行函数
            handlerSuccess(result) {
                localStorage.setItem('_token',result.result.token);
                localStorage.setItem('_mobile',this.mobile);
                localStorage.removeItem('pfNo');
                //登录成功后获取用户信息
                this.Base.interactiveWithApp('getCertifyInfo',{
                    token : result.result.token,
                    certifyInfo : ['locationInfo','deviceInfo','allInstallAppInfo']
                }).then(data=>{
                    if(this.$route.query.type == '1'){
                        this.$router.push({ name : 'Index' });
                    }else{
                        this.$router.push({ name : 'NewRegSucb' });
                    }
                    if(data == 'wap') {
                        console.log('getCertifyInfo','wap');
                    } else {
                        console.log('getCertifyInfo',data);
                    }
                });
            },

            //登录
            login() {
               let regs = this.Base.regs;
               if(this.mobile.length < 1) {
                   this.$msg({ content : '请输入手机号' });
                   return;
               } else if(!regs.mobile.test(this.mobile)) {
                   this.$msg({ content : '请输入正确的手机号' });
                   return;
               }
               if(this.code.length < 1) {
                   this.$msg({ content : '请输入手机验证码' });
                   return;
               } else if(!regs.msgCode.test(this.code)) {
                   this.$msg({ content : '请输入正确的手机验证码' });
                   return;
               }
               //前端校验通过
               let _this = this;
               _this.isShowLoading = true;
               let data = {
                   cellphone : this.mobile,
                   code : this.code
               };
               let register = DES3.encrypt(_this.Base.desKey, JSON.stringify(data));
               this.$ajax.post(this.apiPath.register,_this.$qs.stringify({
                   register : register,
                   sourceCode : _this.sourceCode,
                   clientType : 3
               }),{
                    headers: _this.Base.initAjaxHeader(0,{
                        register : register,
                        sourceCode : _this.sourceCode
                    })
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0) {
                        //alert('注册成功：'+_this.sourceCode);                        
                        localStorage.setItem('_token',result.result.token);
                        localStorage.setItem('_mobile',_this.mobile);                         
                        localStorage.removeItem('pfNo');
                        //登录成功后获取用户信息
                        _this.Base.interactiveWithApp('getCertifyInfo',{
                            token : result.result.token,
                            certifyInfo : ['locationInfo','deviceInfo','allInstallAppInfo']
                        }).then(data=>{
                            if(this.$route.query.type == '1'){
                                this.$router.push({ name : 'Index' });
                            }else{
                                this.$router.push({ name : 'NewRegSucb' });
                            }
                            if(data == 'wap') {
                                console.log('getCertifyInfo','wap');
                            } else {
                                console.log('getCertifyInfo',data);
                            }
                        });
                        //登录完页面回退    
                        // if(window.history.length > 1) {
                        //     window.history.back(); 
                        // } else {
                        //     this.$router.push({ name : 'regSuc' });
                        // }                
                    } else {
                        _this.$msg({ content : result.msg });
                    }
                    _this.isShowLoading = false;
               });
           },
           //获取验证码
           getCode() {
               let _this = this;
               let data = {
                   type : '1',
                   cellphone : this.mobile,
                   imgCode : _this.imgCode
               };
               //校验通过发送验证码
               this.$ajax.post(this.apiPath.msgCode,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(0,data)
                }).then(res=>{
                    let result = res.data;
                    let t = 60;
                    if(result.status == 0) {  
                        _this.$msg({ content : result.msg });
                        _this.sendNum = result.result;
                        _this.codeBtnStauts = true;
                        _this.isShowImgCode = false;
                        let st = setInterval(_=>{
                            if(t > 1) {
                                this.codeBtnText = `${--t}秒`;
                            } else {
                                clearInterval(st);
                                this.codeBtnText = '重新发送';
                                this.codeBtnStauts = false;
                            } 
                        },1000);
                    } else {
                        _this.$msg({ content : result.msg });
                    }
               });
           },
           //获取发送验证码次数
           getSendNum() {
                let _this = this;                
                return new Promise((resolve,reject)=>{
                    let regs = _this.Base.regs;
                    if(_this.mobile.length < 1) {
                        // _this.$msg({ content : '请输入手机号' });
                        return reject('请输入手机号');
                    } else if(!regs.mobile.test(_this.mobile)) {
                        // _this.$msg({ content : '请输入正确的手机号' });
                        return reject('请输入正确的手机号');
                    }
                    let data = {
                        type : '1',
                        cellphone : _this.mobile
                    };
                    _this.$ajax.post(_this.apiPath.sendNum,_this.$qs.stringify(data),{
                        headers : _this.Base.initAjaxHeader(0,data)
                    }).then(rs=>{
                        let res = rs.data;
                        if(res.status == 0) {
                            resolve(res.result);
                        }
                    });
                });
            },
           //隐藏图形验证码弹出框
           hideImgCode() {
               this.isShowImgCode = false;
           },
           //promise
           handlerCode() {
               let _this = this;
               this.getSendNum().then(data=>{
                   if(!data) {
                       _this.handlerGetCode();
                   } else {
                       _this.isShowImgCode = true;
                   }
               },data=>{
                   _this.$msg({ content : data });
               })
           },
           //获取子组件验证码
           getImgCode(data) {
               this.imgCode = data;
               this.handlerGetCode();
           },
           //从app获取sourceCode
           getResiterInfo() {
               let _this = this;
                this.Base.interactiveWithApp('getAppInfo',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('wap','getAppInfo');
                    } else {
                        if(typeof data == 'string') data = JSON.parse(data);
                        _this.sourceCode = data.result.appId;
                        if(data.result.channelId) {
                            _this.sourceCode = data.result.channelId;
                        }
                        //alert(_this.sourceCode);
                    }
                });
            }
        },
        beforeDestroy() {
            localStorage.setItem('_mobile',this.mobile);
        }
    }
</script>

<style lang='scss' scoped>
.main{
    width: 100%;
    background-color: #fff;
    .main_con{
        .top{
            text-align: center;
            .p1{
                font-size:.3rem;
                font-weight:500;
                color:rgba(136,136,136,1);
                margin-top: .5rem;             
            }
            .money{
                font-size:1rem;
                font-weight:bold;
                color:rgba(69,69,69,1);
                margin-top: .39rem;
                line-height: 1;               
            }
            .p2{
                font-size:.28rem;
                font-weight:500;
                color:rgba(136,136,136,1);
                margin-top: .33rem             
            }
        }
    }
    .bg_img{
        background: url(../../assets/activity/reg_bg2.png) no-repeat;
        background-size: 100% 100%;
        height: 3.8rem;
        width: 100%;
    }
    .t1{
        text-align: center;
        .phone_box{
            width:6.49rem;
            height:1rem;
            border:1px solid rgba(140,140,140,1);
            border-radius:.1rem;
            display: flex;
            margin: .5rem auto 0;  
            .phone_txt{
                font-size:.32rem;
                margin-left: .43rem;
            }             
        }
        .password_box{
            width:6.49rem;
            height:1rem;
            border:1px solid rgba(140,140,140,1);
            border-radius:.1rem;
            display: flex;
            align-items: center;
            margin: .4rem auto 0;
            position: relative;
            .password_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/password_a.png) no-repeat;
                background-size: cover;
                margin-left: .27rem;                    
            }
            .password_txt{
                font-size:.32rem;
                margin-left: .43rem;
                width: 4rem;
            }
            .v_code{
                font-size:.3rem;
                min-width: 1.8rem;
                color:rgba(68,150,243,1);
                border-left: 1px solid #C8C8C8;
                padding-left: .3rem;
                line-height: .5rem;
                position: absolute;
                right: .3rem;
            }                             
        }
        .reg_btn{
            width:6.3rem;
            height:.9rem;
            line-height: .9rem;
            display: inline-block;
            text-align: center;
            margin: .6rem auto 0rem;
            background:rgba(65,98,222,1);
            box-shadow:0px 16px 26px 0px rgba(46,74,176,0.24);
            border-radius:.45rem;
            color:rgba(255,255,255,1);
            font-size:.32rem;
        }
        .tips{
            font-size:.24rem;
            line-height:.45rem;
            text-align:center;
            padding-top:.5rem;
            color:#666;
        }
    }
}
</style>
