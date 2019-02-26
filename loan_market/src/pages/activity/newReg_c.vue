<!--
    create:luofeifei 2018/11/20
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img">
            <img src="../../assets/activity/rrdk_logo.png" alt="" style="width:1.44rem;height:0.37rem;position: relative;left: .22rem;top: .22rem;">
        </div>
        <div class="main_con">
            <div class="t1">
                <div class="phone_box">
                    <span class="phone_ico"></span>
                    <input class="phone_txt" v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号" @focus="inpFoc" @blur="inpBlur">
                </div>
                <div class="password_box">
                    <span class="password_ico"></span>
                    <input class="password_txt" v-model="code" type="tel" maxlength="6" placeholder="验证码" @focus="inpFoc" @blur="inpBlur">
                    <span class="v_code" :disabled="codeBtnStauts" @click="handlerCode">{{ codeBtnText }}</span>
                </div>
                <a href="javascript:;" class="reg_btn" @click="handlerLogin">看看我能借多少</a>
                <div class="tips tac">注册即表示已同意<router-link :to="{ name : 'Agreement' }">《服务协议》</router-link></div>
                <p class="info">借款额度因个人情况资质而定</p>
                <div class="list_ico">
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_1.png" alt="">
                        <p class="p1">审核极快</p>
                        <p class="p2">当天到账银行卡</p>
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_2.png" alt="">
                        <p class="p1">门槛超低</p>
                        <p class="p2">信用贷，薪资贷</p>                        
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_3.png" alt="">
                        <p class="p1">产品多样</p>
                        <p class="p2">多重选择通过率高</p>                        
                    </div>
                </div>
                <div class="tips">资金来源：海尔消费金融有限公司</div>
            </div>
            <div class="t2" :style="'height:'+t2Height+'rem;'">

            </div>
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
        name : 'Login',
        data() {
            return Object.assign(initData(this),{
                t2Height:1,
                mobile : localStorage.getItem('_mobile')?localStorage.getItem('_mobile'):'',
            });
            // return {
            //     t2Height:1,
            //     isShowLoading : false,
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
            //     sourceCode : this.$route.params.sourceCode ? this.$route.params.sourceCode : ''
            // }
        },
        components : {
            imgCode
        },
        created() {
            this.getResiterInfo();
        },
        mounted() {
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#E6F3FF')
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
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
                                this.$router.push({ name : 'NewRegSuca' });
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
    .bg_img{
        background: url(../../assets/activity/reg_bg11.png) no-repeat;
        background-size: 100% 100%;
        height: 12.05rem;
        width: 100%;
    }
    .main_con{
        margin-top: -6rem;
        .tips{
            font-size:.26rem;
            color:#90aeca;
            width:6.9rem;
            text-align:center;
            margin:auto;
            margin-top:.5rem;
            background: url(../../assets/activity/tips_line.png) top center no-repeat;
            background-size:6.9rem 1px;
            padding-top:.24rem;
        }
    }
    .t1{
        text-align: center;
        .phone_box{
            width:6.3rem;
            height:.9rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(180, 215, 251, 1);
            border-radius:.45rem;
            display: flex;
            align-items: center;
            margin: 0 auto;         
            .phone_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/phone_a.png) no-repeat;
                background-size: cover;
                margin-left: .29rem;                
            }
            .phone_txt{
                font-size:.28rem;
                margin-left: .17rem;
            }             
        }
        .password_box{
            width:6.3rem;
            height:.9rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(180, 215, 251, 1);
            border-radius:.45rem;
            display: flex;
            align-items: center;
            margin: .1rem auto 0;
            position: relative;
            .password_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/password_a.png) no-repeat;
                background-size: cover;
                margin-left: .27rem;                    
            }
            .password_txt{
                font-size:.28rem;
                margin-left: .17rem;
                width: 3.8rem;
            }
            .v_code{
                font-size:.24rem;
                color:rgba(127,151,216,1);
                position: absolute;
                right: .3rem;
                min-width: 1.24rem;
            }                             
        }
        .reg_btn{
            width:6.3rem;
            height:.9rem;
            line-height: .9rem;
            display: inline-block;
            text-align: center;
            margin: .2rem auto .27rem;
            background:rgba(82,123,236,1);
            box-shadow:0px 4px 13px 0px rgba(17,93,190,0.11);
            border-radius:.45rem;
            color:rgba(255,255,255,1);
            font-size:.32rem;
        }
        .info{
            font-size:.24rem;
            color:rgba(153,153,153,1);           
        }
        .list_ico{
            display: flex;
            justify-content: space-between;
            margin: .6rem auto 0rem;
            width: 86%;
           .ico_item{
               img{
                  width: .8rem;
                  height: .8rem; 
               }
               .p1{
                    font-size:.26rem;
                    font-weight:bold;
                    color:rgba(50,50,51,1);
                    line-height:1;
                    margin-top: .2rem;                
               }
               .p2{
                   font-size:.22rem;
                    font-weight:500;
                    color:rgba(50,50,51,1);
                    opacity:0.85;
                    line-height:1;
                    margin-top: .13rem; 
               }
           } 
        }
        .tips{
            font-size:.24rem;
            color:#999;
            width: 6.3rem;
            margin: 0 auto .2rem;
            a{
                color:#527BEC;
            }
        }
    }
}
</style>
