<template>
    <div class="my">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <keep-alive><tab-bar :navIndex="3"></tab-bar></keep-alive>
        <div class="page_title">
            <p>我的</p>            
        </div>
        <!-- 内容区 -->
        <div class="content">
            <div class="banner por">
                <!-- <a href="javascript:;" class="my_set poa dsb" @click="goSet"></a> -->
                <dl class="c">
                    <dt><img src="../../assets/my/my_head_n.png" alt=""></dt>
                    <dd>
                        <!-- 未登录 -->
                        <p v-if="!isLogin" @click="toLogin" class="login"><span>登录/注册</span></p>
                        <!-- 已登录 -->
                        <div class="logined" v-else>
                            <p>{{ nick }}</p>
                            <a @click="goAuth" class="dsin tac" href="javascript:;">{{ isAuth ? '个人资料' : '去认证' }}</a>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="detail">
                <div class="title c">
                    <span class="fl fs32">我的订单</span>
                    <span class="fr fc2" @click="linkOrder('OrderList',0)">查看全部</span>
                </div>
                <div class="icos">
                    <dl  @click="linkOrder('OrderList',1)">
                        <dt><img src="../../assets/my/my_dbc_icon.png" alt=""><span v-if="iconNum1 != 0">{{ iconNum1 }}</span></dt>
                        <dd>待补充</dd>
                    </dl>
                    <dl  @click="linkOrder('OrderList',2)">
                        <dt><img src="../../assets/my/my_dsh_icon.png" alt=""><span v-if="iconNum2 != 0">{{ iconNum2 }}</span></dt>
                        <dd>待审核</dd>
                    </dl>
                    <dl @click="linkOrder('OrderList',3)">
                        <dt><img src="../../assets/my/my_dbk_icon.png" alt=""><span v-if="iconNum3 != 0">{{ iconNum3 }}</span></dt>
                        <dd>待绑卡</dd>
                    </dl>
                    <dl @click="linkOrder('OrderList',4)">
                        <dt><img src="../../assets/my/my_dqr_icon.png" alt=""><span v-if="iconNum4 != 0">{{ iconNum4 }}</span></dt>
                        <dd>待确认</dd>
                    </dl>
                    <dl @click="linkOrder('OrderList',8)">
                        <dt><img src="../../assets/my/my_dhk_icon.png" alt=""><span v-if="iconNum7 != 0">{{ iconNum7 }}</span></dt>
                        <dd>待还款</dd>
                    </dl>                    
                    <!-- <dl @click="linkOrder('OrderList',9)">
                        <dt><img src="../../assets/my/my_shsb_icon.png" alt=""><span v-if="iconNum5 != 0">{{ iconNum5 }}</span></dt>
                        <dd>审核失败</dd>
                    </dl> -->
                </div>
                <div class="ul">
                    <ul>
                        <!-- <li class="c hkrl">
                            <span class="fl">
                                <span><img src="../../assets/my/my_calendar.png" alt=""></span>
                                <span>还款日历</span>
                            </span>
                            <span class="fr"></span>
                        </li> -->
                        <li class="c por mymsg" @click="linkTo('Message')">
                            <span class="fl">
                                <span><img src="../../assets/my/my_messages_icon.png" alt=""></span>
                                <span>我的消息</span>
                            </span>
                            <i v-if="unread > 0">{{ unread }}</i>
                            <span class="fr"></span>
                        </li>
                        <li class="c llzj" @click="linkTo('Footprint')">
                            <span class="fl">
                                <span><img src="../../assets/my/my_records.png" alt=""></span>
                                <span>浏览足迹</span>
                            </span>
                            <span class="fr"></span>
                        </li>
                        <li class="c kfzx" @click="linkTo('CustomerCenter')">
                            <span class="fl">
                                <span><img src="../../assets/my/my_service.png" alt=""></span>
                                <span>客服中心</span>
                            </span>
                            <span class="fr"></span>
                        </li>
                        <li class="c gywm" @click="linkTo('About')">
                            <span class="fl">
                                <span><img src="../../assets/my/my_about_icon.png" alt=""></span>
                                <span>关于我们</span>
                            </span>
                            <span class="fr"></span>
                        </li>
                        <li class="c gywm" @click="goSet">
                            <span class="fl">
                                <span><img src="../../assets/my/my_setting_icon.png" alt=""></span>
                                <span>账户设置</span>
                            </span>
                            <span class="fr"></span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <!-- 对话框 -->
        <popout :config="popoutConfig" v-on:parentOff="offPopopout" v-on:parentSure="parentSure"></popout>
    </div>
</template>

<script>
    import tabBar from '@/components/tab';
    import popout from '@/components/popout';
    export default {
        name : 'My',
        data() {
            return {
                //是否显示加载中
                isShowLoading : true,
                //是否登录
                isLogin : false,
                //是否实名认证
                isAuth : false,
                //昵称
                nick : '',
                //接口地址
                apiPath : {
                    user : '/api/my/info'
                },
                setUrl : '',
                //未读条数
                unread : 0, 
                iconNum1 : 0,  //代还款
                iconNum2 : 0,  //待提现
                iconNum3 : 0,  //待绑卡
                iconNum4 : 0,  //待确认
                iconNum5 : 0,  //审核失败
                iconNum7 : 0,   //待还款
                popoutConfig : {
                    btns : ['取消','确定'],
                    content : '',
                    showTitle : true,
                    title : '温馨提示',
                    isShow : false
                },
                popopoutRoute : 'Login'
            }
        },
        created() {
            this.getUserInfo();            
        },
        components : {
            tabBar, popout
        },
        methods : {
            getUserInfo() {
                if(!localStorage.getItem('_token')) { 
                    this.isShowLoading = false;                   
                    return;
                }
                let _this = this;
                this.$ajax.post(_this.apiPath.user,_this.$qs.stringify({}),{
                    headers: _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    _this.isShowLoading = false;
                    let result = res.data;
                    if(result.status == 0) { 
                        _this.isLogin = true;
                        _this.isAuth = result.result.isAuth;
                        _this.unread = result.result.unread;
                        _this.nick = result.result.mobilePhone;
                        _this.iconNum1 = result.result.iconNum1;
                        _this.iconNum2 = result.result.iconNum2;
                        _this.iconNum3 = result.result.iconNum3;
                        _this.iconNum4 = result.result.iconNum4;
                        _this.iconNum5 = result.result.iconNum5;
                        _this.iconNum7 = result.result.iconNum7;
                    } else if(result.status == -9) {
                        _this.isAuth = false;
                        _this.isLogin = true;
                        _this.nick = result.result.mobilePhone;
                    } else if(result.status == -100) {
                        //登录过期
                    } else {
                        _this.$msg({ content : result.msg });
                    }                   
                });
            },
            //去认证&我的资料
            goAuth() {
                this.$router.push({ name : 'AuthInfor'});
                // if(!this.isAuth) {
                //     this.$router.push({ name : 'AuthBase'});
                // } else {
                //     this.$router.push({ name : 'AuthInfor'});
                // }
            },
            //跳转到订单列表
            linkOrder(route,routeParam) {
                //未实名
                if(!localStorage.getItem('_token') || !this.isLogin) {
                    // this.popoutConfig.isShow = true;
                    // this.popoutConfig.content = '您现在还未登录，是否去登录？';
                    // this.popopoutRoute = 'Login';
                    this.$router.push({ name : 'Login' });
                    return;
                }
                if(!this.isAuth) {
                    this.popoutConfig.isShow = true;
                    this.popoutConfig.content = '您现在还未完成实名认证，是否去实名认证？';
                    this.popopoutRoute = 'AuthBase';
                    return;
                }
                this.$router.push({ name : route, params : { orderStatus : routeParam } });
            },
            //关闭对话框
            offPopopout() {
                this.popoutConfig.isShow = false;
            },
            //确定
            parentSure() {
                if(this.popopoutRoute == 'Login') {
                    this.toLogin();
                } else {
                    this.$router.push({ name : this.popopoutRoute });
                }
            },
            //去登录
            toLogin() {
                this.$router.push({ name : 'Login' });               
            },
            //去账户设置
            goSet() { 
                if(!localStorage.getItem('_token') || !this.isLogin) {
                    this.$router.push({ name : 'Login' }); 
                    return;
                } 
                if(this.isAuth) {
                    //已实名
                    this.$router.push({ name : 'Set' });
                } else {
                    //未实名
                    this.$router.push({ name : 'Set2' });
                }
            },
            linkTo(route) {
                if(route == 'About' || route == 'CustomerCenter') {
                    this.$router.push({ name : route });
                    return;
                }
                if(!localStorage.getItem('_token') || !this.isLogin) {
                    this.$router.push({ name : 'Login' }); 
                    return;
                }
                this.$router.push({ name : route });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my{
        padding-bottom:1.2rem;
        .page_title{            
            .my_msg{
                width:.6rem;
                height:.4rem;
                background:url(../../assets/my/my_messages_icon.png) right top no-repeat;
                background-size:.4rem;
                top:.7rem;
                right:.3rem;
                span{
                    display:inline-block;
                    padding:0 .1rem;
                    height:.28rem;
                    background:#EA5B53;
                    font-size:.2rem;
                    color:#fff;
                    border-radius:.14rem;
                    line-height:.28rem;
                    position:absolute;
                    top:-.14rem;
                    right:-.14rem;
                }
            }
        }
       .content{
           margin-top:1.39rem;
           .banner{
               background:linear-gradient(90deg,#6f5efa,#7ee5f2);
               height:1.8rem;
               .my_set{
                    width:.6rem;
                    height:.4rem;
                    background:url(../../assets/my/my_setting_icon.png) no-repeat;
                    background-size:.4rem;
                    top:.5rem;
                    right:.3rem;
                }
               dl{
                   padding-top:.18rem;
                   padding-left:.3rem;
                   dt{
                       float:left;
                       width:1rem;
                       height:1rem;
                       border-radius:.54rem;
                       border:.08rem solid #7C7AE6;
                   }
                   dd{
                       float:left;
                       padding-left:.3rem;
                       color:#fff;
                       font-size:.32rem;
                       .login{
                           line-height:1.08rem;
                       }
                       .logined{
                           padding-top:.1rem;
                           a{
                               background:rgba(156,157,255,1);
                               padding:0 .15rem;
                               line-height:.4rem;
                               border-radius:.2rem;
                               font-size:.24rem;
                               color:#fff;
                               margin-top:.06rem;
                           }
                       }
                   }
               }
           }
           .detail{
               background:#fff;
               margin-top:.16rem;
               .title{
                   padding:0 .3rem;
                   line-height:.88rem;
                   .fr{
                       padding-right:.3rem;
                       background:url(../../assets/my/my_arrow.png) right center no-repeat;
                       background-size:.12rem .22rem;
                   }
               }
               .icos{
                   display:flex;
                   align-items:center;
                   justify-content:center;
                   height:1.8rem;
                   border-top:1px solid #E6E6E6;
                   border-bottom:.1rem solid #f5f5f5;
                   padding:0 .1rem;
                   dl{
                       width:20%;
                       text-align:center;
                       dt{
                           width:.52rem;
                           height:.44rem;
                           position:relative;
                           margin:auto;
                           padding-bottom:.05rem;
                           span{
                                display:inline-block;
                                padding:0 .08rem;
                                height:.28rem;
                                background:#EA5B53;
                                font-size:.2rem;
                                color:#fff;
                                border-radius:.14rem;
                                line-height:.28rem;
                                position:absolute;
                                top:-.14rem;
                                right:-.14rem;
                           }
                       }
                   }
               }
               .ul{
                   li{
                       padding:0 .32rem;
                       border-bottom:1px solid #E6E6E6;
                       .fl{
                           display:flex;
                           align-items:center;
                           height:.88rem;
                           span:nth-child(1){
                               width:.34rem;
                               padding-right:.14rem;                               
                           }
                           span:nth-child(2){
                               font-size:.28rem;
                           }
                       }
                       .fr{
                           height:.88rem;
                           background:url(../../assets/my/my_arrow.png) right center no-repeat;
                           background-size:.12rem .22rem;
                           width:.22rem;
                       }
                   }
                   li:nth-child(2){
                       border-bottom:.16rem solid #f5f5f5;
                    //    display:none;
                   }
                   .mymsg{
                       i{
                           display:inline-block;
                           height:.28rem;
                           line-height:.28rem;
                           color:#fff;
                           padding:0 .08rem;
                           position:absolute;
                           right:.6rem;
                           top:.3rem;
                           background:#EA5B53;
                           font-style:normal;
                           font-size:.2rem;
                           border-radius:.14rem;
                       }
                   }
               }
           }
       }
    }
</style>