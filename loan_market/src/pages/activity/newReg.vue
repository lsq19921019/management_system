<!--
    create:luofeifei 2018/11/20
    desc:落地页
-->
<template>
    <div class="main">
        <div class="p1">
        </div>
        <div class="p2">
            <div class="phone_box">
                <span class="phone_ico"></span>
                <input class="phone_txt" v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="password_box">
                <div class="password_inp">
                    <span class="password_ico"></span>
                    <input class="password_txt" v-model="code" type="tel" maxlength="6" placeholder="请输入验证码">
                </div>
                <span class="v_code" :disabled="codeBtnStauts" @click="handlerCode">{{ codeBtnText }}</span>
            </div>
            <a href="javascript:;" class="reg_btn" @click="handlerLogin">点击立即申请</a>
            <div class="tips tac">注册即表示已同意<router-link :to="{ name : 'Agreement' }">《服务协议》</router-link></div>
        </div>
        <div class="news">
            <ul :class="{marquee_top:animate}">
                <li v-for="(item,index) in marqueeList" :key="index">{{ item.content }}</li>
            </ul>
        </div>
        <div class="p3">
            <!-- <img src="../../assets/activity/p3.png" alt="p3"> -->
        </div>
        <div class="p4">
            <!-- <img src="../../assets/activity/p4.png" alt="p3"> -->
        </div>        
        <div class="foot">
            <p>具体放款额度，以平台实际审核为准</p>
            <p>深圳微融信息科技有限公司 粤ICP备17096796号-1</p>
            <p>联系方式：<a href="tel:0755-26924103">0755-26924103</a></p>
        </div>
        <!-- 图形验证码 -->
        <img-code v-if="isShowImgCode" @hideImgCode="hideImgCode" @getCode="getCode" :mobile="mobile" @getImgCode="getImgCode"></img-code>        
    </div>
</template>
<script>
    import DES3 from '../../../static/3DES.js';
    import imgCode from '../../components/module/imgCode.vue';
    import { initData, login, handlerGetCode, getSendNum } from './register.js';
    export default {
        name : 'Login',
        data() {
            return Object.assign(initData(this),{
                marqueeList : [],
                animate : false,
            });
            // return {
            //     isShowLoading : false,
            //     animate: false,
            //     apiPath : {
            //         register : '/api/user/register',
            //         msgCode : '/api/message/sms_code',
            //         sendNum : '/api/message/image_code_frequency'
            //     },
            //     marqueeList:[],
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
            setInterval(this.showMarquee, 5000)
        },
        mounted() {
        },
        beforeMount(){
            this.getList();
        },
        methods : {
            showMarquee: function () {
                this.animate = true;
                setTimeout(()=>{
                    this.marqueeList.push(this.marqueeList[0]);
                    this.marqueeList.shift();
                    this.animate = false;
                },500)
            },
            //获取列表数据
            getList() {      
                let _this = this;                     
                let data = {
                   pageNum : 1,
                   type : ''
                };
                this.$ajax.post('/api/platform/index',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    let result = res.data; 
                    if(result.status == 0 || result.status == -100 || result.status == -9) { 
                        _this.marqueeList = result.result.carouseList;
                    } else {
                        _this.$msg({ content : result.msg });
                    }
               });
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
                //登录成功
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
                        this.$router.push({ name : 'regSuc' });
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
                                this.$router.push({ name : 'regSuc' });
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
    background-color: #5061FD;
    .p1{
        background: url(../../assets/activity/reg_bg.png) no-repeat;
        background-size: cover;
        height: 8.99rem;
    }
    .p2{
        background: url(../../assets/activity/p1.png) no-repeat;
        background-size: cover;
        width: 5.9rem;
        padding: .7rem;
        margin: -2.5rem auto 0;
        .phone_box{
            background-color: #F7F8FA;
            border-radius:.44rem;
            width: 5.74rem;
            height: .88rem;
            display: flex;
            align-items: center;
            .phone_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/phone_ico.png) no-repeat;
                background-size: cover;
                margin-left: .27rem;
            }
            .phone_txt{
                font-size:.28rem;
                margin-left: .12rem;
            }           
        }
        .password_box{
            margin-top: .4rem;
            width: 5.74rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .password_inp{
                background-color: #F7F8FA;
                border-radius:.44rem;
                width: 3.6rem;
                height: .88rem;
                display: flex;
                align-items: center;
                .password_ico{
                    width: .4rem;
                    height: .4rem;
                    background: url(../../assets/activity/password_ico.png) no-repeat;
                    background-size: cover;
                    margin-left: .27rem;                    
                }
                .password_txt{
                    font-size:.28rem;
                    margin-left: .12rem;
                    width: 2rem;
                }
            }
            .v_code{
                background:rgba(255,202,31,1);
                opacity:0.8;
                border-radius:.44rem;
                padding: .28rem 0rem;
                color:rgba(152,127,46,1);
                font-size:.28rem;
                width: 1.94rem;
                text-align: center;
            }        
        }
        .reg_btn{
            width:5.74rem;
            height:.88rem;
            line-height: .88rem;
            display: inline-block;
            text-align: center;
            background:linear-gradient(180deg,rgba(255,210,31,1),rgba(255,152,31,1));
            border-radius:.44rem;
            font-weight:bold;
            font-size:.38rem;
            color:rgba(255,255,255,1);
            margin-top: .6rem;
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
    .news{
        margin: .44rem auto .39rem;
        width:6.9rem;
        height:.7rem;
        background:rgba(0,0,0,0.14);
        border-radius:.35rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        font-size:.28rem;
        overflow: hidden;
        .marquee_top {
            transition: all 0.5s;
            margin-top: -30px;
        }
        ul li{
            line-height: .7rem;
            text-align: center;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
    }
    .p3{
        margin: 0 auto;
        background: url(../../assets/activity/p3.png) no-repeat;
        background-size: 100% 100%;
        width: 6.9rem;
        height: 4.66rem;
    }
    .p4{
        margin: .4rem auto 0;
        background: url(../../assets/activity/p4.png) no-repeat;
        background-size: 100% 100%;
        width: 6.9rem;
        height: 9.99rem;
    }
    .foot{
        padding:.2rem 0;
        background:#5062FD;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            font-size:.24rem;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height: 1.6;
            text-align: center;
            a{
                color:#fff;
            }
        }
    }
}
</style>
