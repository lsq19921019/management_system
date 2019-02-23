<template>
    <div class="platform">
        <!-- 加载中 -->
        <div class="loading" v-if="isShowLoading"><img src="../../assets/main/detail_loading.gif" alt=""></div>
        <div class="page_title">
            <p>{{ detail.platformName||'平台详情' }}</p>
            <a href="javascript:;" @click="goback" class="goback"></a>
        </div>
        <!-- 内容 -->
        <transition>
        <!-- <transition name="fade"> -->
        <div class="detail" v-show="isShowPage">
            <!-- 数据展示 -->
            <div class="data_wrap por">
                <!-- 渐变背景 -->
                <div class="bg poa"></div>  
                <!-- 进度 -->
                <div class="progress poa">
                    <div>
                        <span class="fs32 dsb">{{ detail.platformName }}</span>
                        <span>
                            <!-- 信用卡工薪卡，无需抵押当天放贷 -->
                            {{ detail.platfromDesc }}
                        </span>
                    </div>
                </div>
                <!-- 数据 -->
                <div class="data poa">
                    <div class="content">
                        <!-- 主数据 -->
                        <div class="c_content">
                            <div class="cc ccl">
                                <p>额度（元）</p>
                                <div class="cci" @click="showPicker1">
                                    <span><input type="tel" ref="ipt1" maxlength="8" v-model="iptAmount" disabled></span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="cc ccr">
                                <p>期限（天）</p>
                                <div class="cci" @click="showPicker2">
                                    <span><input type="tel" ref="ipt2" maxlength="3" v-model="iptPeriod" disabled></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <!-- 到期应还&到账金额&利息和费用 -->
                        <div class="c_detail">
                            <div class="td">
                                <div class="number fs32">{{ add_money }}</div>
                                <div class="desc">到期应还款(元)</div>
                            </div>
                            <div class="td">
                                <div class="number fs32">{{ iptAmount }}</div>
                                <div class="desc">到账金额(元)</div>
                            </div>
                            <div class="td">
                                <div class="number fs32"><span>{{ com_Interest }}</span></div>
                                <div class="desc">利息和费用(元)</div>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <span class="s1">详情：</span>
                        <div class="d1">
                            <img src="../../assets/cpxq_rll_icon.png" alt="">
                            <span>最快十分钟放款</span>
                        </div>
                        <div class="d1" style="margin-left:.2rem;">
                            <img src="../../assets/cpxq_sfzfk_icon.png" alt="">
                            <span>日利率：{{ detail.detailRate || 0 }}</span>
                        </div>
                        <span class="s2" @click="showIncompetence('ckxq')">···</span>                        
                    </div>
                </div>
            </div>
            <!-- 申请资格 -->
            <div class="auth">
                <p class="title fs32">申请资格</p>
                <ul class="list">
                    <li class="por" v-for="(li,index) in authList.list" :key="index" @click="goAuth(li,index)">                     
                        <span>{{ li.verifyName }}</span>
                        <span :class="{ 'done' : li.verifyStatus != 1 }">{{ li.verifyStatusTxt }}</span>
                        <i class="poa dsb" :style="'background:url('+li.verifyLoge+') right top no-repeat;'"></i>
                    </li>
                </ul>
            </div>
            <!-- 其他信息 -->
            <div class="description">
                <!-- 公司信息 -->
                <div class="commpany">
                    <p><span>公司</span>{{ detail.phoneDesc }}</p>
                    <p><span>电话</span><a :href="'tel:'+detail.phones">{{ detail.phones }}</a></p>
                </div>
                <!-- 协议 -->
                <div class="agreement por">
                    <i :class="{
                        dsb : true,poa : true,
                        selected : isAgree
                    }" @click="handlerAgreement"></i>我已阅读并同意<a v-for="(agree,index) in detail.protocols" :key="index" @click="linkToPlatformAgreement(agree)">《{{ agree.protocolName }}》</a> 
                </div>
                <!-- 小提示 -->
                <div class="tips">
                    温馨提示：{{ detail.kindlyReminder }}
                </div>
            </div>
        </div>
        </transition>
        <!-- 资质不符 组件 -->
        <incompetence :incompetenceConfig="incompetenceConfig" v-on:offIncompetence="offIncompetence" :status="zzbfStatus" :pfno='pfNo'></incompetence>
        <!-- 对话框 -->
        <popout :config="popoutConfig" v-on:parentOff="parentOff"></popout>
        <!-- 按钮 -->
        <button @click="handlerBtn(authList.canPushInfo)" :disabled="dis" :class="{
            cur : authList.canPushInfo != 0 && authList.canPushInfo != false
        }">{{ authList.canPushInfo?'立即申请':'补充认证' }}</button>
        <!-- 期限下拉 -->
        <awesome-picker
            ref="picker2"
            :textTitle="picker2.textTitle"
            :data="picker2.data"
            :anchor="picker2.anchor"
            :swipeTime="picker2.swiperTime"
            @confirm="handlePicker2Confirm">
        </awesome-picker>
        <!-- 额度下拉 -->
        <awesome-picker
            ref="picker1"
            :textTitle="picker1.textTitle"
            :data="picker1.data"
            :anchor="picker1.anchor"
            :swipeTime="picker1.swiperTime"
            @confirm="handlePicker1Confirm">
        </awesome-picker>
        <pop-coma v-show="isShowPopa"></pop-coma>
    </div>
</template>

<script>
    //资质不符弹窗
    import incompetence from '@/components/module/incompetence';
    import progressBar from 'svg-progress-bar';
    import popout from '@/components/popout';
    import popComa from '@/components/popup/popup_a';
    export default {
        name : 'PlatformDetail',
        data() {
            return {
                pfNo:'LDJQ2019012201',
                isShowPopa:false,
                isShowLoading : true,  //加载中...
                apiPath : {
                    borrow : '/api/order/borrow',  //申请借款
                    confirm : '/api/order/confirm',  //完成申请
                    calc : '/api/product/calculate',  //计算利息
                    union_login : '/api/union/login',  //联登接口
                },
                radius: 0,
                circleWidth : 0,
                isShowPage : true,  //请求数据时防止出现undefined
                platformNo : this.$route.params.id,  //平台id
                detail : {
                    //借款金额
                    "canBorrow":{
                        "canBorrowMax":0,
                        "canBorrowMin":0,
                        "canBorrowUnit":0
                    },
                    //借款期限
                    "canTerm":{
                        "canTermMax":0,
                        "canTermMin":0,
                        "canTermUnit":0
                    },
                    "detailDesc":'',
                    "detailRate":'',
                    "kindlyReminder":'',
                    "phoneDesc":'',
                    "phones":'',
                    "platformName":'',
                    "platfromDesc":'',
                    "protocols":[],
                    "rate":''
                },
                // 认证列表
                authList : {
                    "canPushInfo":false,
                    "list":{
                        "client":{
                            "invalidLogoImg":'',
                            "validLogoImg":''
                        },
                        "codeType":'',
                        "enableClick":false,
                        "redirectH5":false,
                        "redirectH5Url":'',
                        "unableClickTip":'',
                        "verifyCode":'',
                        "verifyLoge":'',
                        "verifyName":'',
                        "verifyStatus":'',
                        "verifyStatusTxt":''
                    }
                },
                //输入金额
                iptAmount : '',
                //输入期限
                iptPeriod : '',
                //是否同意协议
                isAgree : true,
                //弹窗显示配置
                incompetenceConfig : {
                    //是否显示资质不符
                    isZzbf : false,
                    //是否显示还款说明
                    isHksm : false,
                    //是否显示综合费用
                    isZhfy : false,
                    zzbf : '',
                    zhfy : ''
                },
                //资质不符状态
                zzbfStatus : '',
                //下拉配置
                picker1: {
                    anchor: [],
                    textTitle: '选择额度',
                    data: [],
                    swiperTime:4000
                },
                //下拉配置
                picker2: {
                    anchor: [],
                    textTitle: '选择期限',
                    data: [],
                    swiperTime:4000
                },
                //平台参考利率
                interestRate : 0,
                dis : false,
                popoutConfig : {
                    btns : ['确定'],
                    content : '',
                    showTitle : true,
                    title : '温馨提示',
                    isShow : false
                }
            }
        },
        components : {
            progressBar, incompetence, popout,popComa
        },
        created() {
            this.radius = this.Base.calcPx(1.1)/2;
            this.circleWidth = this.Base.calcPx(0.1);
            this.getProduces();
            this.getAuthData();
            this.Base.interactiveWithApp('finishWindow',{}).then(data=>{});
        },
        mounted() {
            //初始化文本框长度&文本框输入动态改变长度
            this.handlerInput('ipt1').handlerInput('ipt2');
            localStorage.setItem('pfNo',this.platformNo);
        },
        //计算属性
        computed: {
            com_Interest:function(){
                return this.iptAmount*this.detail.rate*this.iptPeriod || 0;
            },
            add_money(){
                return parseInt(this.com_Interest)+parseInt(this.iptAmount) || 0;
            }
        },
        methods : {
            // 获取数据
            getProduces(){
                let _this = this;
                let data = {
                    platformNo:this.pfNo
                }
                this.$ajax.post('/api/enhance/produces',_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    _this.detail = res.data.result;
                    _this.iptAmount = res.data.result.canBorrow.canBorrowMax;
                    _this.iptPeriod = res.data.result.canTerm.canTermMax;
                    _this.initIptWidth();
                    _this.isShowLoading = false;
                })         
            },
            // 获取认证数据
            getAuthData(){
                let _this = this;
                let data = {
                    platformNo:this.pfNo
                }
                this.$ajax.post('/api/enhance/produces/verify',_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    _this.authList = res.data.result;
                    console.log(res,"认证数据")
                })
            },
            close(){
                this.isShowPopa = false;
            },            
            //页面回跳
            goback() {
                this.$router.push({name:'Loan'});
            },
            //自定义进度条文本样式
            setCircleText(p) {
                return `<div style="line-height:1;padding-top:.25rem;"><span style="font-size:.28rem;color:#FFEA3F;position:relative;">${p==0 ? 0: p}%</span><br><span style="color:#d9dc75;font-size:.18rem;position:relative;top:-.08rem;">今日已抢</span></div>`;
            },
            //初始化文本框长度
            initIptWidth() {
                let fs = 0.47;
                let ipt1 = this.$refs.ipt1;
                let ipt2 = this.$refs.ipt2;
                let len1 = String(this.iptAmount).length;
                let len2 = String(this.iptPeriod).length;
                ipt1.style.width = len1*fs+.2 + 'rem';
                ipt2.style.width = len2*fs+.2 + 'rem';
            },
            //文本框输入动态改变长度
            handlerInput(ref) {
                this.$refs[ref].oninput = function() {
                    let fs = 0.47;
                    let len = this.value.length;
                    this.style.width = len*fs +.2 +'rem';
                }
                return this;
            },
            //阅读协议
            handlerAgreement() {
                this.isAgree = !this.isAgree;
            },
            //关闭对话框
            parentOff() {
                this.popoutConfig.isShow = false;
            },
            //选择期限、额度重新计算到期应还、利息管理费用
            calcFee() {

            },
            //显示弹窗
            showIncompetence(param) {
                if(param == 'zhfy') {
                    //利息和费用弹窗
                    this.incompetenceConfig.isZhfy = true;
                } else if(param == 'ckxq') {
                    //查看详情弹窗
                    this.incompetenceConfig.isHksm = true;
                } else if(param == 'zzbf') {
                    //资质不符弹窗
                    this.incompetenceConfig.isZzbf = true;
                }
            },
            //关闭资质不符弹窗
            offIncompetence() {
                this.incompetenceConfig.isZzbf = 
                this.incompetenceConfig.isHksm = 
                this.incompetenceConfig.isZhfy = false;
            },
            //去认证
            goAuth(li) {
                let linkConfig = [
                    ['BASIC_VERIFY' , 'AuthBase' ] ,  //基础信息
                    //['IDCARD_INFO' , 'IdentityProve' ] ,  //身份认证(身份证上传页面)
                    ['IDCARD_INFO' , 'newIdentity' ] ,  //身份认证(身份证上传页面)
                    ['CONTACT_INFO' , 'AuthContact' ] ,  //联系人认证
                    ['ADD_CREDITCARD' , 'AuthAddCard' ] ,  //添加信用卡
                    ['ADD_WORKINFO' , 'AuthAddWork' ] ,  //添加工作信息
                    ['ADD_SOCIALINFO' , 'AuthSocial' ] ,  //添加社交信息
                    ['ADD_BONUSINFO' , 'BonusProve' ] ,  //添加加分认证
                    ['ADD_OTHERINFO' , 'PhotoInfor' ] ,  //添加照片资料
                    ['OTHER_INFO_VERIFY' , 'AuthOther' ] ,  //其他信息
                ];
                //跳转认证中页面
                if(li.verifyStatus == 2){
                    this.$router.push({ name : 'AuthAuthing' });
                    return
                }
                // 如果已经认证，跳转认证成功页面
                if(li.verifyStatus==3){
                    this.$router.push({ name : 'AuthSuccess' });
                    return
                }
                // 是否可以点击并提示
                if(!li.enableClick){
                    this.$msg({ content : li.unableClickTip });
                    return
                }
                //如果跳转第三方
                if(li.codeType == 'COOPERATION') {
                    localStorage.setItem("code",li.verifyCode||'')
                    let o = {
                        url : `${li.redirectH5Url}${location.origin}/platformDetail2/${this.pfNo}/&themeColor=527BEC`,
                        title : li.verifyName,
                        startColor:"#6A5CF6",
                        endColor:"#8BE2F1",
                        reload : true,
                        backUrl:'回到人人贷款'
                    };
                    this.Base.interactiveWithApp('openNewWindow',o).then(data=>{
                        if(data == 'wap') {
                            this.Base.setIframePageInfo(this,{
                                title : li.verifyName,
                                url : `${li.redirectH5Url}${location.href}`
                            });
                        } else {
                            console.log('openNewWindow',data);
                        }
                    });
                } else if(li.codeType == 'SYSTEM') {
                    for(let i in linkConfig) {
                        if(li.verifyCode == linkConfig[i][0]) {    
                            //进行联系人认证获取通讯录
                            if(li.verifyCode == 'CONTACT_INFO') {
                                if(this.Base.getClientType().type=='wap'){
                                    this.isShowPopa = true;
                                    return false;
                                }
                                this.Base.interactiveWithApp('getCertifyInfo',{
                                    token : localStorage.getItem('_token'),
                                    certifyInfo : ['contactInfo']
                                }).then(data=>{
                                    if(data == 'wap') {
                                        console.log('getCertifyInfo','wap');
                                    } else {
                                        console.log('getCertifyInfo',data);
                                    }
                                });
                            }
                            //身份认证/qianjinjin
                            // if(li.verifyCode == 'IDCARD_INFO'&&li.hasVerify == false) {
                            //     if(this.Base.getClientType().type=='wap'){
                            //         this.isShowPopa = true;
                            //         return false;
                            //     }
                            //     this.Base.interactiveWithApp('getCertifyInfo',{
                            //         token : localStorage.getItem('_token'),
                            //         certifyInfo : ['smsInfo']
                            //     }).then(data=>{
                            //         if(data == 'wap') {
                            //             console.log('getCertifyInfo','wap');
                            //         } else {
                            //             console.log('getCertifyInfo',data);
                            //         }                                                                       
                            //         this.$router.push({ name : linkConfig[i][1] });
                            //     });
                            // }                            
                            //进行身份证认证获取短信权限
                            if(li.verifyCode == 'IDCARD_INFO') {
                                console.log(linkConfig[i][1]);
                                this.Base.interactiveWithApp('getCertifyInfo',{
                                    token : localStorage.getItem('_token'),
                                    certifyInfo : ['smsInfo']
                                }).then(data=>{
                                    if(data == 'wap') {
                                        console.log('getCertifyInfo','wap');
                                    } else {
                                        console.log('getCertifyInfo',data);
                                    } 
                                });
                            }
                            if(li.hasVerify) {
                                if(li.verifyCode == 'CONTACT_INFO' || li.verifyCode == 'OTHER_INFO_VERIFY') {
                                    this.$router.push({ name : linkConfig[i][1] });
                                }else {
                                    this.$router.push({ name : 'AuthSuccess' });
                                }
                            }else {                                
                                this.$router.push({ name : linkConfig[i][1],query:{type:4} });
                            }
                            break;
                        }                        
                    }
                }
                              
            },
            //跳转平台协议
            linkToPlatformAgreement(param) {
                let _this = this;
                let o = {
                    url : param.protocolUrl, title : param.protocolName, startColor:"#6A5CF6",endColor:"#8BE2F1"
                };
                this.Base.interactiveWithApp('openNewWindow',o).then(data=>{
                    if(data == 'wap') {
                        _this.Base.setIframePageInfo(_this,o);
                    } else {
                        console.log('openNewWindow',data);
                    }
                });               
            },
            /**
             * params1 {String} 
             * 'true'
             * 'false'
             */
            handlerBtn(type) {
                //认证列表
                let _this = this;   
                let tips = '请仔细阅读相关协议';
                if(!_this.isAgree) {
                    _this.$msg({ content : tips });
                    setTimeout(_=>{
                        this.dis = false;  
                    },1500);  
                    return;
                }
                if(type) {
                    let data = {
                        pfNo:this.pfNo,
                        borrowAmount:_this.iptAmount,
                        borrowDealine:_this.iptPeriod,
                        borrowUnit:1,
                    }
                    _this.$ajax.post('/api/enhance/union/apply',_this.$qs.stringify(data),{
                        headers : _this.Base.initAjaxHeader(1,{})
                    })
                    .then(res=>{
                        res = res.data;
                        if(res.status==0){
                            _this.$router.push({
                                name : 'OrderDetail',
                                params : {
                                    'orderNo' : this.pfNo
                                }
                            });
                        }else if(res.status==-4){
                            _this.popoutConfig.isShow = true;
                            _this.popoutConfig.content = res.msg;
                            this.dis = false;                             
                        }else {                       
                            _this.$msg({ content : res.msg });
                            setTimeout(_=>{
                                this.dis = false;  
                            },1500);
                        }
                    },err=>{
                        
                    })
                } else {

                }
            },
            //用户是否符合资质
            showAuthPopup(userAccept) {
                //现金白卡认证，非200没有贷款资质
                if(userAccept.result != 200) {
                    this.incompetenceConfig.isZzbf = true;
                }
            },
            handlePicker1Confirm(v){
                if(this.iptAmount == v[0].value || v[0].value == 0) return;
                this.iptAmount = v[0].value;
                this.calcFee(); 
                this.initIptWidth('ipt1');
            },
            showPicker1() {
                this.$refs.picker1.show();  
                let canBorrow = [];           
                for(let i=0;i<(this.detail.canBorrow.canBorrowMax-this.detail.canBorrow.canBorrowMin)/this.detail.canBorrow.canBorrowUnit+1;i++){
                    canBorrow.push(this.detail.canBorrow.canBorrowMin+this.detail.canBorrow.canBorrowUnit*i)
                }
                this.picker1.data = [canBorrow];
            },
            handlePicker2Confirm(v){
                if(this.iptPeriod == v[0].value) return;
                this.iptPeriod = v[0].value;
                this.initIptWidth('ipt3');
            },
            showPicker2() {
                this.$refs.picker2.show();
                let canTerm = [];           
                for(let i=0;i<(this.detail.canTerm.canTermMax-this.detail.canTerm.canTermMin)/this.detail.canTerm.canTermUnit+1;i++){
                    canTerm.push(this.detail.canTerm.canTermMin+this.detail.canTerm.canTermUnit*i)
                }
                this.picker2.data = [canTerm];                             
            }
        },
        filters : {
            termType(value) {
                if(value == 1) return '天';
                if(value == 2) return '月';
                if(value == 3) return '年';
            }
        },
        watch : {
            iptAmount(val) {
                this.iptAmount = String(val);
            },
            iptPeriod(val) {
                this.iptPeriod = String(val);
            },
            '$route'(to,from) {
                if(to.name == 'PlatformDetail') {

                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .platform{
        background:#f5f5f5;
        padding-bottom:1.3rem;
        .page_title{
            background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
        }
        .detail{
            margin-top:1.4rem;
            //数据展示
            .data_wrap{
                height:5.45rem;
                background:#fff;
                //渐变背景
                .bg{
                    background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
                    height:2.8rem;
                    width:100%;
                    z-index:1;
                    left:0;
                    top:0;
                }
                //进度条
                .progress{
                    z-index:2;
                    left:.32rem;
                    width:6.86rem;
                    display:flex;
                    height:1.2rem;
                    align-items:center;
                    padding-top:.1rem;
                    div:nth-child(1){
                        color:#fff;
                        margin-right:auto;
                        span:nth-child(1){
                            font-size:.36rem;
                        }
                        span:nth-child(2){
                            opacity:.6;   
                        }
                    } 
                    div:nth-child(2){
                        width:1.2rem;
                    }
                }
                //数据
                .data{
                    z-index:3;
                    width:6.86rem;
                    top:1.62rem;
                    left:.32rem;
                    .content{
                        height:3.05rem;
                        background:#fff;
                        box-shadow:0px 3px 14px 0px rgba(48, 35, 224, 0.2);
                        border-radius:.08rem;
                        .c_content{
                            width:5.76rem;
                            margin:auto;
                            padding-top:.39rem;
                            overflow:hidden;
                            display:flex;
                            .cc{
                                p{
                                    color:#A8AAB2;
                                    font-size:.22rem;  
                                }
                                .cci{
                                    display:flex;
                                    align-items:center;
                                    height:.9rem;
                                    span:nth-child(1){
                                        input{
                                            color:#3E475D;
                                            font-size:.84rem;
                                            line-height:.9rem;
                                            width:80%;
                                            width:1.4rem;
                                        }
                                    }
                                    span:nth-child(2){
                                        width:.18rem;
                                        height:.11rem;
                                        background:url(../../assets/main/sjx.png);
                                        background-size:.18rem .11rem;
                                    }
                                }
                            }
                            .ccl{
                                min-width:3.9rem;
                                overflow:hidden;
                            }
                        }
                        .c_detail{
                            padding:.3rem 0;
                            margin-top:.35rem;
                            background:#FAFAFA;
                            display:flex;
                            justify-content:center;
                            .td{
                                text-align:center;
                                width:33.3%;
                                border-right:1px solid #E6E6E6;
                                height:.56rem;
                                .number{
                                    position:relative;
                                    top:-.15rem;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    span:nth-child(2){
                                        width:.23rem;
                                        height: .24rem;
                                        margin-left:.12rem;
                                        background:url(../../assets/main/question.png);
                                        background-size:.24rem .25rem;
                                        overflow: hidden;
                                    }
                                }
                                .desc{
                                    font-size:.2rem;
                                    color:#A8AAB2;
                                    position:relative;
                                    top:-.1rem;
                                }
                            }
                            .td:last-child {
                                border:none;
                            }
                        }                        
                    }
                    .info{
                        margin-top:.26rem;
                        display: flex;
                        align-items: center;
                        img{
                           width: .26rem;height: .26rem; 
                        }
                        .d1{
                            display: flex;align-items: center;
                            span{
                                margin-left: .1rem;
                            }
                        }
                        .s1{
                            font-size:.28rem;
                            color:rgba(168,170,178,1);
                        }
                        .s2{
                            font-size: .68rem;
                            color: #A8AAB2;
                            line-height: .2rem;
                            position: absolute;
                            right: 0;
                        }
                    }
                    .btn{
                        display:block;
                        margin:auto;
                        width:2rem;
                        text-align:center;
                        margin-top:.26rem;
                        color:#98A2B2;
                    }
                }
            }

            //申请资格
            .auth{
                padding:0 .32rem;
                margin-top:.16rem;
                background:#fff;
                .title{
                    border-bottom:1px solid #E6E6E6;
                    line-height:.88rem;                      
                }
                .list{
                    padding-left:.69rem;
                    li{
                        display:flex;
                        align-items:center;
                        height:.92rem;
                        border-bottom:1px solid #E6E6E6;
                        i{
                           width:.44rem;
                           height:.44rem;
                           background-size:.9rem .44rem !important;
                           left:-.65rem;
                           top:.28rem; 
                        }
                        span:nth-child(1){
                            font-size:.3rem;
                        }
                        span:nth-child(2){
                            border:1px solid #527BEC;
                            color:#fff;
                            text-align:center;
                            line-height:.47rem;
                            border-radius:.24rem;
                            background:#527BEC;
                            width:1.09rem;
                            margin-left:auto;
                        }
                        span.done{
                            background:#fff;
                            color:#527BEC;
                        }
                    }
                    li:last-child{
                        border:none;
                    }
                }
            }

            //其他信息
            .description{
                margin-top:.24rem;
                .commpany{
                    background:#fff;
                    line-height:.26rem;
                    padding:.3rem .32rem;
                    font-size:.26rem;
                    p{
                        span{
                            color:#A8AAB2;
                            padding-right:.39rem;
                        }
                        a{
                            padding-left:.3rem;
                            background:url(../../assets/main/ico_phone.png) left center no-repeat; 
                            background-size:.24rem .24rem;   
                            color:#527BEC; 
                        }
                    }
                    p:nth-child(2){
                        margin-top:.2rem;
                    }
                }
                .agreement{
                    padding:0 .32rem;
                    margin-top:.21rem;
                    padding-left:.75rem;
                    line-height:1.5;
                    i{
                        width:.33rem;
                        height:.32rem;
                        background:#64A4FA;
                        border-radius:2px;
                        left:.33rem;
                        top:.03rem;
                    }
                    i.selected{
                        background:url(../../assets/main/pd_selected.png) no-repeat;
                        background-size:.32rem .33rem;
                    }
                    a{
                        color:#527BEC;
                    }
                }
                .tips{
                    color:#B2B6C2;
                    padding:0 .32rem;
                    margin-top:.4rem;
                }
            }
        }
        button{
            width:100%;
            left:0;
            position:fixed;
            text-align:center;
            line-height:.98rem;
            background:#A8AAB2;
            font-size:.34rem;
            bottom:0;
            color:#fff;
        }
        button.cur{
            background:#527BEC;
        }

        input[disabled]{
            color:#3E475D;
            opacity:1;
            -webkit-text-fill-color:#3E475D;
        }
        .loading{
            position:fixed;
            width:100%;height:100%;
            z-index:900;
            top:0;
            left:0;
            background-color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            img{
                width:60%;
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