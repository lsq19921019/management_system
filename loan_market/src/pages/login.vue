<!--
    create : 田鹏伟 2018-9-10
    desc : 登录页面
-->
<template>
    <div class="login">
        <loading v-if="isShowLoading" :text="'登录中...'"></loading>
        <div class="page_title">
            <p>登录/注册</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="banner tac">
            <div class="logo"><img src="../assets/logo.png" alt=""></div>
        </div>
        <div class="ipts">
            <div class="form">
                <ul>
                    <li class="mobile">
                        <input type="tel" v-model="mobile" maxlength="11" placeholder="请输入手机号">
                    </li>
                    <li class="code por">
                        <input type="tel" v-model="code" maxlength="6" placeholder="请输入验证码">
                        <button class="getCode poa dsb tac fs24 fc4" :disabled="codeBtnStauts" @click="handlerCode">{{ codeBtnText }}</button>
                    </li>
                </ul>
                <button @click="login" class="login_btn tac dsb">登录/注册</button>
            </div>
        </div> 
        <div class="tips tac">登录即表示你同意<router-link :to="{ name : 'Agreement' }">《服务协议》</router-link></div>
        <!-- 图形验证码 -->
        <img-code v-if="isShowImgCode" @hideImgCode="hideImgCode" @getCode="getCode" :mobile="mobile" @getImgCode="getImgCode"></img-code>
    </div>
</template>

<script>
    import DES3 from '../../static/3DES.js';
    import imgCode from '../components/module/imgCode.vue';
    export default {
        name : 'Login',
        data() {
            return {
                isShowLoading : false,
                apiPath : {
                    register : '/api/user/register',
                    msgCode : '/api/message/sms_code',
                    sendNum : '/api/message/image_code_frequency'
                },
                mobile : localStorage.getItem('_mobile')?localStorage.getItem('_mobile'):'',
                code : '',
                codeBtnStauts : false,
                codeBtnText : '获取验证码',
                isShowImgCode : false,
                //获取的子组件图形验证码
                imgCode : '',
                //从app获取注册渠道码
                sourceCode : ''
            }
        },
        components : {
            imgCode
        },
        created() {
            this.getResiterInfo();
        },
        mounted() {
            if(localStorage.getItem('sourceCode_qianjinjin') == 'ios_qianjinjin') {
                this.sourceCode = 'ios_qianjinjin';
            }
        },
        methods : {
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
                   clientType : 3,
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
                            if(data == 'wap') {
                                console.log('getCertifyInfo','wap');
                            } else {
                                console.log('getCertifyInfo',data);
                            }
                        });
                        //登录完页面回退    
                        if(window.history.length > 1) {
                            window.history.back(); 
                        } else {
                            this.$router.push({ name : 'My' });
                        }                
                    } else {
                        _this.$msg({ content : result.msg });
                    }
                    _this.isShowLoading = false;
               });
           },
           //获取验证码
           getCode() {
               let _this = this;
            //    if(this.imgCode.length < 1) {
            //        this.$msg({ content : '请输入图形验证码' });
            //        return;
            //    };
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
                       _this.getCode();
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
               this.getCode();
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
                        if(localStorage.getItem('sourceCode_renrendai') == 'ios_renrendai') {
                            _this.sourceCode = 'ios_renrendai';
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

<style lang="scss" scoped>
    .page_title{
        background:url(../assets/login_title_bg.png) top center repeat-y;
        background-size:100% 1px;
    }
    .login{
        background:url(../assets/login_bg.png) top center no-repeat;
        background-size:100% 4.48rem;
        margin-top:1.3rem;
        .logo{
            width:3.18rem;
            height:.85rem;
            margin:auto;
            padding-top:.72rem;
        }
        .ipts{
            width:6.7rem;
            margin:auto;
            background:rgba(255,255,255,1);
            box-shadow:0px 6px 20px 0px rgba(36,85,195,0.15);
            border-radius:.16rem;
            margin-top:.4rem;
            .form{
                width:5.9rem;
                margin:auto;
                padding:.3rem 0;
                padding-bottom:.64rem;
                ul{
                    padding-top:.1rem;
                    li{
                        height:.6rem;
                        border-bottom:1px solid #e6e6e6;
                        padding:.1rem 0 .1rem .51rem;
                        margin-top:.6rem;
                        input{
                            font-size:.3rem;
                            line-height:.6rem;
                            width:4rem;
                            height:.6rem;
                        }
                    }
                    .mobile{
                        background:url(../assets/ico_mobile.png) left .18rem no-repeat;
                        background-size:.32rem .44rem;
                    }
                    .code{
                        background:url(../assets/ico_code.png) left .22rem no-repeat;
                        background-size:.34rem .38rem;
                        .getCode{
                            width:1.58rem;
                            line-height:.6rem;
                            border:1px solid #527BEC;
                            border-radius:.3rem;
                            background:#fff;
                            right:0;
                            top:.08rem;
                        }
                    }
                }
                .login_btn{
                    background:#527BEC;
                    line-height:.9rem;
                    font-size:.34rem;
                    color:#fff;
                    border-radius:.45rem;
                    margin-top:.9rem;
                    width:100%;
                }
            }
        }
        .tips{
            font-size:.24rem;
            color:#999;
            margin-top:.4rem;
            a{
                color:#527BEC;
            }
        }
    }
</style>