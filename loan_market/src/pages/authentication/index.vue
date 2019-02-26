<!--
    create:luofeifei
    desc: 认证首页
-->
<template>
    <div class="page">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>        
        <keep-alive><tab-bar :navIndex="2"></tab-bar></keep-alive>
        <!-- <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
        </div>  -->
        <div class="page_top">
            <pro-cir :rank='userGrade.grade'></pro-cir>
            <div class="top_info">
                <p class="p1">我的预估额度：￥{{ userGrade.amount }}</p>
                <p class="p2" v-if="userGrade.grade=='Y'">{{ userGrade.gradeText }}<router-link class="sname" to='/auth/base?type=1'>实名认证</router-link></p>
                <p class="p2" v-else-if="userGrade.grade=='Z'">{{ userGrade.gradeText }}<router-link class="sname" to='/login'>登录</router-link></p>
                <p class="p2" v-else>{{ userGrade.gradeText }}</p>
            </div>
        </div>
        <div class="auth_list">
            <div class="auth_item">
                <div class="auth_title">
                    <span class="a1">常用资料</span>
                    <span class="a2">风险审批常用资料，完成认证可提高审批速度</span>
                    <!-- <span v-show="$store.state.isShowAppPage">111</span> -->
                    <!-- <router-link to='/auth/authAuthing' style="color:green">测试</router-link> -->
                </div>
                <div class="auth_con">
                    <ul class="clearfloat">
                        <auth-li v-show="isShowAppPage" v-for="(item,index) in commonTools" :bgImg='item.logo' :key="index" :x="item.hasVerify?'-.57':'0'" y='0' 
                        :isAuth='item.text' :title='item.name'
                        @click.native="toDetail(item.code,item.jump,item.url,item.hasVerify,item.name)"></auth-li>
                        <auth-li x="0" y='15'></auth-li>
                        <auth-li x="0" y='15'></auth-li>
                    </ul>
                </div>
            </div>
            <div class="auth_item">
                <div class="auth_title">
                    <span class="a1">补充资料</span>
                    <span class="a2">添加更多个人资料，产品推荐更加准确</span>
                </div>
                <div class="auth_con" v-show="!isShowLoading">
                    <ul class="clearfloat">
                        <auth-li v-show="isShowAppPage" v-for="(item,index) in addinfo" :bgImg='item.logo' :key="index" :x="item.hasVerify?'-.57':'0'" y='0' 
                        :isAuth='addinfo[index].text' :title='addinfo[index].name' @click.native="toDetail(item.code)"></auth-li>
                        <auth-li x="0" y='15'></auth-li>
                    </ul>
                </div>
            </div>
        </div>
        <pop-coma v-show="isShowPopa"></pop-coma>
    </div>
</template>

<script>
    import tabBar from '@/components/tab';
    import proCir from '@/components/list/progeress';
    import authLi from '@/components/list/auth';
    import popCom from '@/components/popout';
    import popComa from '@/components/popup/popup_a';
    export default {
        name : 'Index',
        data() {
            return {
                isShowAppPage:true,
                isShowPopa:false,
                isShowLoading : true,
                desc : '认证中心首页',
                isShow:false,
                commonTools:[],   //常用资料
                addinfo:[],  //补充资料
                userGrade:''    //用户资料
            }
        },
        components : {
            //组件
            tabBar,proCir,authLi,popCom,popComa
        },
        created() {
            let _this = this
            //页面渲染前
            _this.verifyInfo();
        },
        mounted() {
            //页面加载完毕
        },
        methods:{
            close(){
                this.isShowPopa = false;
            },
            //首页接口
            verifyInfo(){
                let _this = this;
                let isToken = ''
                if(localStorage.getItem('_token')){
                    isToken = 1
                }else{
                    isToken = 0
                }
                let data = {

                }
                this.$ajax.post('/api/user/verify',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(isToken,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(res.data.status == '0' || res.data.status == -100){
                        //_this.$set(_this,'commonTools',resData.result.commonTools);
                        //_this.$set(_this,'addinfo',resData.result.addinfo);
                        _this.$set(_this,'userGrade',resData.result.userGrade);

                        for(let i=0;i<resData.result.commonTools.length;i++){
                            //_this.commonTools.push(resData.result.commonTools[i])
                            if(resData.result.commonTools[i].code == 'TAOBAO_VERIFY'||resData.result.commonTools[i].code == 'INSURE_VERIFY'
                                ||resData.result.commonTools[i].code == 'FUND_VERIFY'
                                ||resData.result.commonTools[i].code == 'EC_BILL_VERIFY'
                                ||resData.result.commonTools[i].code == 'JD_VERIFY'){
                                
                            }else{
                                _this.commonTools.push(resData.result.commonTools[i])
                            }
                        }
                        for(let i=0;i<resData.result.addinfo.length;i++){
                            _this.addinfo.push(resData.result.addinfo[i])
                            // if(resData.result.addinfo[i].code == 'ADD_IMAGEINFO'){
                                
                            // }else{
                            //     _this.addinfo.push(resData.result.addinfo[i])
                            // }
                        }
                    }else{
                        this.$msg({content:resData.msg})
                    }
                    _this.isShowLoading = false;
                    console.log(res)
                })
            },
            toDetail(code,isjump,li,hasVerify,title){
                let level = this.userGrade.grade;
                let _this = this;
                //如果有没有token
                if(!localStorage.getItem("_token") || level == 'Z') {
                    this.$router.push({ name :'Login'})
                } else {
                    //未实名
                    if(level == 'Y') {
                        //去实名页面
                        this.$router.push({ name : 'AuthBase' });
                    } else {
                        //身份认证授权
                        if(code == 'IDCARD_INFO'){
                            this.Base.interactiveWithApp('getCertifyInfo',{
                                token:localStorage.getItem('_token'),
                                certifyInfo:['smsInfo']
                            }).then(data=>{
                                if(data == 'wap') {
                                    console.log('getCertifyInfo','wap');
                                } else {
                                    console.log('getCertifyInfo',data);
                                }
                            });                                    
                        }
                        //联系人认证
                        if(code == 'CONTACT_INFO'){
                            this.Base.interactiveWithApp('getCertifyInfo',{
                                token:localStorage.getItem('_token'),
                                certifyInfo:['contactInfo']
                            }).then(data=>{
                                if(data == 'wap') {
                                    console.log('getCertifyInfo','wap');
                                } else {
                                    console.log('getCertifyInfo',data);
                                }
                            });
                        }
                        //运营商认证
                        if(code == 'OPERATOR_VERIFY'){
                            let _this = this;
                            this.Base.interactiveWithApp('getCertifyInfo',{
                                token:localStorage.getItem('_token'),
                                certifyInfo:['smsInfo']
                            }).then(data=>{
                                if(data == 'wap') {
                                    console.log('getCertifyInfo','wap');
                                } else {
                                    console.log('getCertifyInfo',data);
                                }
                            });                                    
                        }
                        //  跳成功页
                        if(hasVerify){
                            if(code=='IDCARD_INFO'){
                                this.$router.push({name:'AuthIdentity'});
                            }else if(code == 'CONTACT_INFO'){
                                if(this.Base.getClientType().type=='wap'){
                                    this.isShowPopa = true;
                                    return false;
                                }                                
                                this.$router.push({name:'AuthContact'});
                            }else{
                                this.$router.push({ name:'AuthSuccess' });
                            }                      
                        }else{
                            if(isjump) {
                                if(code == 'EC_BILL_VERIFY'||code == 'IBANK_VERIFY'){
                                    //this.isShowPopa = true;
                                    this.$msg({content:'暂未开放'})
                                    return false;
                                }
                                //跳第三方
                                let jumpData = {
                                    title:title,url:`${li}${location.origin}/undertake`, startColor:"#6A5CF6",endColor:"#8BE2F1",reload:true
                                }
                                this.Base.interactiveWithApp('openNewWindow',jumpData).then(data=>{
                                    // location.href = `${li}${location.href}&themeColor=527BEC`;            
                                    if(data == 'wap') {
                                        //wap端逻辑
                                        _this.Base.setIframePageInfo(_this,{
                                            title : title,
                                            url : `${li}${location.href}`
                                        })
                                        console.log('jumpToSharing','wap');
                                    } else {
                                        console.log('jumpToSharing',data);
                                    }
                                });                                
                            } else {
                                //跳路由
                                switch (code) {
                                    case 'IDCARD_INFO': //身份认证
                                        this.$router.push({name:'AuthIdentity',query:{type:1}});
                                        break;
                                    case 'CONTACT_INFO':   //联系人认证
                                        if(this.Base.getClientType().type=='wap'){
                                            this.isShowPopa = true;
                                            return false;
                                        } 
                                        this.$router.push({name:'AuthContact'});
                                        break;
                                    case 'ADD_CREDITCARD':    //添加信用卡
                                        this.$router.push({name:'AuthAddCard'});
                                        break;
                                    case 'ADD_WORKINFO':    //添加工作信息
                                        this.$router.push({name:'AuthAddWork'});
                                        break;
                                    case 'ADD_SOCIALINFO':    //添加社交信息
                                        this.$router.push({name:'AuthSocial'});
                                        break;
                                    case 'ADD_BONUSINFO':    //添加加分认证
                                        this.$router.push({name:'BonusProve'});
                                        break;
                                    case 'ADD_IMAGEINFO':    //添加照片资料
                                        if(this.Base.getClientType().type=='wap'){
                                            this.isShowPopa = true;
                                            return false;
                                        }
                                        this.$router.push({name:'PhotoInfor'});
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    } 
                }
            },
            testfnc(params) {
                this.isShow = false;
            },
            testfnc2() {
                this.isShow = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        //padding-top:1.4rem;
        .page_top{
            background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
            padding: .88rem .64rem .47rem;
            display: flex;
            align-items: center;
            .top_info{
                margin-left: .3rem;
                .p1{
                    font-size:.28rem;
                    color:rgba(255,255,255,1);
                    line-height:1;                    
                }
                .p2{
                    font-size:.24rem;
                    color:rgba(223,225,253,1);
                    line-height:1;
                    margin-top: .24rem;
                    .sname{
                        color: #FEEB50;
                    }
                }
            }
        }
        .auth_list{
            margin-bottom: 1rem;
            .auth_item{
                background: #fff;
                margin-top: .2rem;
                .auth_con{
                    width: 100%;
                }
                .auth_title{
                    padding: .28rem .3rem;
                    .a1{
                        font-size:.32rem;
                        font-weight:500;
                        color:rgba(62,71,93,1);
                        line-height:1;                            
                    }
                    .a2{
                        font-size:.24rem;
                        color:rgba(168,170,178,1);
                        line-height:1;
                        margin-left: .24rem;                          
                    }
                }
            }
        }        
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>