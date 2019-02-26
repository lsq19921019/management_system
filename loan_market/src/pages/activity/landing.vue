<template>
    <div class="landing">
        <loading v-if="isShowLoading" :text="'登录中...'"></loading>
        <div><img src="../../assets/activity/banner.jpg" alt=""></div> 
        <div class="main">
            <!-- 已登录-开始提现 -->
            <div class="logged_con por" v-if="isLogin">
                <a href="javascript:;" @click="downApp" class="dsb poa"></a>   
            </div>
            <!-- 注册&登录 -->
            <div class="login" v-if="!isLogin">
                <ul>
                    <li>
                        <span class="fl">手机号码</span>
                        <span class="fr">
                            <input type="tel" v-model="mobile" placeholder="请输入您的手机号" maxlength="11">
                        </span>
                    </li>
                    <li>
                        <span class="fl">验证码</span>
                        <span class="fr">
                            <input type="tel" v-model="code" placeholder="请输入验证码" maxlength="6">
                        </span>
                        <button :disabled="codeBtnStauts" @click="handlerCode" :class="{
                            poa : true, tac : true, gray : codeBtnStauts
                        }">{{ codeBtnText }}</button>
                    </li>
                </ul>
                <div class="agreement">注册代表同意<a href="/agreement?type=2">《服务协议》</a></div>
                <div class="btn_get"><button @click="handlerLogin" :class="{ dsb : true, hl : code.length==6&&mobile.length==11 }" :disabled="code.length<6||mobile.length<11"></button></div>
            </div>
        </div>
        <div class="advantage">
            <img src="../../assets/activity/advantage1.jpg" alt="">
            <img src="../../assets/activity/advantage2.jpg" alt="">
        </div>
        <div class="tips">
            具体放款额度，以平台实际审核为准<br>{{ companyName }}
        </div>

        <!-- 图形验证码 -->
        <img-code v-if="isShowImgCode" @hideImgCode="hideImgCode" @getCode="handlerGetCode" :mobile="mobile" @getImgCode="getImgCode"></img-code>
    </div>
</template>

<script>
    import DES3 from '../../../static/3DES.js';
    import imgCode from '../../components/module/imgCode.vue';
    import { initData, login, getCode, getSendNum } from './register.js';
    export default {
        name : 'Landing',
        data() {
            // return {
            //     isShowLoading : false,
            //     apiPath : {
            //         register : '/api/user/register',
            //         msgCode : '/api/message/sms_code',
            //         sendNum : '/api/message/image_code_frequency'
            //     },
            //     isLogin : false,
            //     codeBtnStauts : false,
            //     codeBtnText : '获取验证码',
            //     mobile : '',
            //     code : '',
            //     isShowImgCode : false,
            //     //获取的子组件图形验证码
            //     imgCode : '',
            //     //注册来源
            //     sourceCode : this.$route.params.sourceCode ? this.$route.params.sourceCode : '',
            //     //页面路由
            //     fullPath : this.$router.history.current.fullPath,
            //     //公司名称
            //     companyName : '深圳微融信息科技有限公司',
            // }
            return Object.assign(initData(this),{
                companyName : '深圳微融信息科技有限公司',
                isLogin : false,
                //页面路由
                fullPath : this.$router.history.current.fullPath,
            });
        },
        created() {
            this.Base.getSys();
            if(this.fullPath.indexOf('/landing2') > -1) {
                this.companyName = '韩城集升商贸有限公司';
            }
        },
        methods: {
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
                this.isShowLoading = true;
                setTimeout(_=>{
                    this.isShowLoading = false;
                    this.isLogin = true;
                },1200);
            },
            //登录-废弃
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
                   sourceCode : _this.sourceCode
               }),{
                    headers: _this.Base.initAjaxHeader(0,{
                        register : register
                    })
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0) {
                        //登录成功
                        _this.$msg({ content : '登录成功' });
                        _this.isShowLoading = true;
                        setTimeout(_=>{
                            this.isShowLoading = false;
                            this.isLogin = true;
                        },1200);                    
                    } else {
                        _this.$msg({ content : result.msg });
                    }
                    _this.isShowLoading = false;
               });
            },
            //获取验证码-废弃
            getCode() {
               let regs = this.Base.regs;
               if(this.mobile.length < 1) {
                   this.$msg({ content : '请输入手机号' });
                   return;
               } else if(!regs.mobile.test(this.mobile)) {
                   this.$msg({ content : '请输入正确的手机号' });
                   return;
               }
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
                        _this.isShowImgCode = false;
                        _this.codeBtnStauts = true;
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
            //获取发送验证码次数-废弃
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
            //去下载
            downApp() {
                let sys = this.Base.getSys();
                if(sys == 'Ios') {
                    location.href = this.Base.downloadUrl.ios;
                } else if(sys == 'Android') {
                    location.href = this.Base.downloadUrl.android;
                }
            },
            //promise
            handlerCode() {
                let _this = this;
                this.handlerSendNum().then(data=>{
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
            //隐藏图形验证码弹出框
            hideImgCode() {
                this.isShowImgCode = false;
            },
            
        },
        //gf
        components : {
            imgCode
        }
        
    }
</script>

<style lang="scss" scoped>
    .landing{
        background:#ffc438;
        .main{
            overflow:hidden;
            background:url(../../assets/activity/sub_banner.jpg) top center no-repeat;
            background-size:7.5rem 4.8rem;
            .logged_con{                
                width:6.88rem;
                height:4.03rem;
                background:url(../../assets/activity/logged_bg.png) no-repeat;
                background-size:6.88rem 4.03rem;
                margin:auto;
                margin-top:3.45rem;
                a{
                    width:4.7rem;
                    height:.9rem;
                    border-radius:.45rem;
                    left:50%;
                    margin-left:-2.35rem;
                    bottom:.72rem;
                }
            }
            .login{
                margin-top:3rem;
                ul{
                    width:6.66rem;
                    margin:auto;
                    li{
                        margin-top:.4rem;
                        color:#2d1b10;
                        height:.9rem;
                        line-height:.9rem;
                        span.fl{
                            font-size:.3rem;
                        }
                        span.fr{
                            width:5.3rem;
                            input{
                                width:4.8rem;
                                padding:.1rem .2rem;
                                border:2px solid #2d1b10;
                                height:.68rem;
                                line-height:.68rem;
                                background:#fff;
                                border-radius:.45rem;
                                font-size:.3rem;
                            }
                        }
                    }
                    li:nth-child(2){
                        position:relative;
                        button{
                            color:#fff;
                            background:#f8732a;
                            width:1.95rem;
                            line-height:.64rem;
                            border-radius:.32rem;
                            font-size:.28rem;
                            top:.16rem;
                            right:.2rem;
                        }
                        button.gray{
                            background:#c8c8c8;
                        }
                    }
                }
                .agreement{
                    width:6.66rem;
                    color:#bf8d16;
                    font-size:.24rem;
                    margin:auto; 
                    margin-top:.25rem;
                    a{
                        color:#2d1b10;
                    }                 
                }
                .btn_get{
                    width:6.66rem;
                    margin:auto;
                    margin-top:.3rem;
                    button{
                        height:.9rem;
                        width:100%;
                        background:url(../../assets/activity/get_btn_bg.png) no-repeat;
                        background-size:6.66rem .9rem;   
                    }
                    button.hl{
                        background:url(../../assets/activity/get_btn_hl.png) no-repeat;
                        background-size:6.66rem .9rem; 
                    }
                }
            }

        }
        .tips{
            background:#ffb914;
            color:#af7f0e;
            font-size:.24rem;
            line-height:.45rem;
            text-align:center;
            padding:.25rem;
        }
    }
</style>