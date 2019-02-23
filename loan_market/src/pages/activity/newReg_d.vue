<!--
    create:luofeifei 2018/11/20
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img"></div>
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
                <div class="tips">资金来源：深圳微融信息科技有限公司</div>
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
    }
}
</style>
