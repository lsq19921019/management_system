<template>
    <div class="platform">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_title">
            <p>{{ detail.platformName||'平台详情' }}</p>
            <a href="javascript:;" @click="goback" class="goback"></a>
        </div>
        <!-- 贷款详情页面 -->
        <div v-show="isShowPage" class="detail">            
            <div class="panel por">
                <div class="bg poa"></div>
                <!-- 详细数据 -->
                <div class="data por">
                    <!-- 额度&期限 -->
                    <div class="one c">
                        <div class="fl one_left">
                            <p v-if="detail.minimumAmount">额度：{{detail.minimumAmount}}-{{detail.maximumAmount}}元</p>
                            <p v-else>额度：{{detail.maximumAmount}}元</p>
                            <div class="ipt c por">
                                <input type="tel" v-model="iptAmount" disabled>
                                <span class="txt poa">元</span>
                                <i v-if="detail.minimumAmount"></i>
                            </div>
                        </div>
                        <div class="fl one_right">
                            <p v-if="detail.userAccept.terms.length > 1">期限：{{ detail.userAccept.terms[0] }}-{{ detail.userAccept.terms[detail.userAccept.terms.length-1]}}
                                {{ detail.userAccept.term_type | termType }}
                            </p>
                            <p v-if="detail.userAccept.terms.length == 1">期限：{{ detail.userAccept.terms[0] }}
                                {{ detail.userAccept.term_type | termType }}
                            </p>
                            <!-- @click="showPicker0" -->
                            <div class="ipt c por" >
                                <div class="ipt c por">
                                <input type="tel" v-model="iptPeriod" disabled>
                                <span class="txt poa">{{ detail.userAccept.term_type | termType }}</span>
                                <i v-if="detail.userAccept.terms.length > 1"></i>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- 详细信息 -->
                    <div class="two">
                        <div>
                            <p>到期应还</p>
                            <p><span>{{ detail.orderLoanCalculate.repay_amount.max }}</span>元</p>
                        </div>
                        <div>
                            <p>到账金额</p>
                            <p><span>{{ detail.orderLoanCalculate.receive_amount }}</span>元</p>
                        </div>
                        <div>
                            <p class="por">利息和费用<i v-if="detail.orderLoanCalculate.repay_plan.length > 0" class="two_question" @click="showIncompetence('zhfy')"></i></p>
                            <p><span>{{ detail.orderLoanCalculate.interest_fee.max }}</span>元</p>
                        </div>
                    </div>
                    <p class="fc2 tac tips tac"><span @click="showIncompetence('ckxq')">查看详情 ></span></p>

                </div>
            </div>
            <!-- 进度 -->
            <div class="progress">
                <div class="con">
                    <p class="fs28">今日已抢份额 {{detail.platformBaseInfo.dayRestAmount.countResult}}%</p>
                    <div class="bar">
                        <span :style="{ width : detail.platformBaseInfo.dayRestAmount.countResult+'%'}"></span>
                    </div>
                </div>
            </div>
            <!-- 申请条件 -->
            <div class="condition">
                <div class="title">
                    <span></span><span>申请资格</span>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="(li,index) in detail.platformBaseInfo.conditions" :key="index" @click="goAuth(li,index)">
                            <div>
                                <span :style="'background:url('+li.logo+') '+ (li.hasVerify?'right':'left') +' top no-repeat;'"></span>
                                <span>{{ li.name }}</span>
                            </div>
                            <div :class="{ 'go' : li.hasVerify==false }">{{ li.text }}</div>
                        </li> 
                    </ul>
                </div>
            </div>
            <!-- 客服电话 -->
            <div class="tel_wrap fs28">
                <p>{{ detail.platformBaseInfo.baseInfo.tip }}</p>
                <a class="tel" :href="'tel:'+detail.platformBaseInfo.baseInfo.kfPhone">
                    <span>客服电话咨询</span>
                    <span>{{ detail.platformBaseInfo.baseInfo.kfPhone }}</span>
                </a>
            </div>
            <!-- 协议 -->
            <div class="agreement">
                <div class="operate">
                    <div @click="handlerAgreement" :class="{
                        selected : isAgree
                    }"></div>
                    <div>
                        我已阅读并同意
                        <a v-for="(agree,index) in detail.platformBaseInfo.baseInfo.protocols" :key="index" @click="linkToPlatformAgreement(agree)">《{{ agree.protocolName }}》</a> 
                    </div>
                </div>
                <div class="txt">
                    {{ detail.platformBaseInfo.baseInfo.orderTip }}
                </div>
            </div>
        </div>
        <a v-show="isShowPage" href="javascript:;" @click="handlerBtn(detail.platformBaseInfo.pass)" :class="{
            apply : true, dsb : true, tac : true, pof : true,
            gray : detail.platformBaseInfo.pass == 0 || detail.platformBaseInfo.pass == 1
        }">{{ detail.platformBaseInfo.passText }}</a>
        <!-- 资质不符 组件 -->
        <incompetence :incompetenceConfig="incompetenceConfig" v-on:offIncompetence="offIncompetence" :hksm="detail.platformBaseInfo.baseInfo" :status="zzbfStatus"></incompetence>
        <!-- 期限 下拉选择框 -->
        <awesome-picker
            ref="picker0"
            :textTitle="picker0.textTitle"
            :data="picker0.data"
            :anchor="picker0.anchor"
            :swipeTime="picker0.swiperTime"
            @confirm="handlePicker0Confirm">
        </awesome-picker>
    </div>
</template>

<script>
    //资质不符弹窗
    import incompetence from '@/components/module/incompetence';
    export default {
        name : 'PlatformDetail',
        data() {
            return {
                apiPath : {
                    detail : '/api/product/detail',  //平台详情
                    borrow : '/api/order/borrow',  //申请借款
                    confirm : '/api/order/confirm',  //完成申请
                },
                isShowLoading : true,
                platformNo : this.$route.params.id,
                detail : {
                    "userAccept":{
                        "result":0,
                        "amount":0,
                        "min_amount":0,
                        "terms":[],
                        "term_type":1,
                        "loan_mode":0,
                        "remark":null,
                        "can_loan_time":null,
                        "acceptUser":true
                    },
                    "orderLoanCalculate":{
                        "service_fee":0,
                        "service_fee_desc":"",
                        "interest_fee":{
                            "min":0,
                            "max":0
                        },
                        "receive_amount":0,
                        "repay_amount":{
                            "min":0,
                            "max":0
                        },
                        "repay_plan":[
                            {
                                "period_no":"1",
                                "repay_amount":{
                                    "min":0,
                                    "max":0
                                },
                                "repay_amount_desc":""
                            }
                        ]
                    },
                    "platformBaseInfo":{
                        "baseInfo":{
                            "pfNo":"",
                            "platfromName":"",
                            "verifies":null,
                            "kfPhone":"",
                            "tip":"",
                            "orderTip":"",
                            "firstPush":false,
                            "protocols":[
                                {
                                    "protocolName":"",
                                    "protocolUrl":"",
                                    "sort":1
                                }
                            ]
                        },
                        "dayRestAmount":{
                            "countType":"",
                            "countResult":""
                        },
                        "conditions":[
                            {
                                "code":"",
                                "name":"",
                                "jump":false,
                                "url":"",
                                "text":"",
                                "hasVerify":true,
                                "logo":""
                            }
                        ],
                        "pass":0,
                        "passText":"",
                        "orderNo":null
                    },
                    "interestrate":null,
                    "lendingTime":null,
                    "maximumAmount":"0",
                    "minimumAmount":"0",
                    "maximumPeriod":null,
                    "minimumPeriod":null,
                    "platformName":"",
                    "platformNo":""
                },
                //输入金额
                iptAmount : '',
                //输入期限
                iptPeriod : '', 
                //到期应还
                repayment : '',
                //平台连接
                platformUrl : '',
                //是否返回到首页
                isReturnIndex : false,
                isLoadingIframe : false,
                isShowPage : false, 
                //是否同意协议
                isAgree : true,
                //下拉配置
                picker0: {
                    anchor: [],
                    textTitle: '选择期限',
                    data: [],
                    swiperTime:4000
                },
                //弹窗显示配置
                incompetenceConfig : {
                    //是否显示资质不符
                    isZzbf : false,
                    //是否显示还款说明
                    isHksm : false,
                    //是否显示综合费用
                    isZhfy : false,
                },
                //是否继续遍历认证
                isFor : true,
                //资质不符状态
                zzbfStatus : ''
            }
        },
        beforeMount() {
            this.getDetail(this);
        },
        components : {
            incompetence
        },
        mounted() {
            localStorage.setItem('pfNo',this.platformNo);             
        },
        methods : {
            //获取平台详情
            getDetail(_this) {              
                let data = { 
                    pfNo : _this.platformNo
                };
                _this.$ajax.post(this.apiPath.detail, _this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    if(res.data.status == 0) {
                        let obj = res.data.result;
                        _this.detail = obj;
                        document.title = _this.detail.platformName;
                        _this.iptAmount = _this.detail.maximumAmount;
                        _this.iptPeriod = _this.detail.userAccept.terms[_this.detail.userAccept.terms.length-1];
                        _this.picker0.data.push(_this.detail.userAccept.terms);
                        _this.incompetenceConfig.zhfy = _this.detail.orderLoanCalculate;
                        _this.isShowPage = true;
                        _this.showAuthPopup(_this.detail.userAccept);
                        _this.handlerFirstPush();
                    } else if(res.data.status == '-9') {
                        _this.$msg({ content : res.data.msg, time : 2000 });
                        setTimeout(_=>{
                            _this.$router.push({ name : 'AuthBase' });
                        },2000);
                    } else if(res.data.status == '-100') {
                        _this.$msg({ content : res.data.msg });
                        setTimeout(_=>{
                            _this.$router.push({ name : 'Login' });
                        },1800);
                    } else if(res.data.status == 'VF00001') {
                        _this.zzbfStatus = res.data.status;
                        _this.incompetenceConfig.isZzbf = true;
                    } else {
                        _this.$msg({ content : res.data.msg });
                    }
                    _this.isShowLoading = false;
                });
            },
            //阅读协议
            handlerAgreement() {
                this.isAgree = !this.isAgree;
            },
            //默认执行，老用户进页面创建订单
            handlerFirstPush() {
                //this.platformBaseInfo.baseInfo.firstPush
                let _this = this;
                if(this.detail.platformBaseInfo.baseInfo.firstPush) {
                    //调取订单创建接口
                    let data = {
                        pfNo : _this.platformNo,
                        borrowAmount : _this.iptAmount,
                        borrowDealine : _this.iptPeriod,
                        borrowUnit : _this.detail.userAccept.term_type
                    };
                     _this.$ajax.post(this.apiPath.borrow, _this.$qs.stringify(data),{
                         headers : _this.Base.initAjaxHeader(1,{})
                     })
                }
            },
            //显示下拉框
            showPicker0 () {
                this.$refs.picker0.show();
            },
            //选择
            handlePicker0Confirm(v){
                this.iptPeriod = v[0].value;
            },
            /**
             * params1 {String} 
             * '0':补充认证，认证完成回跳（按钮置灰）；
             * '1':调接口/order/borrow，刷新页面（前端不作处理）
             * '2':完成申请，调接口，刷新页面
             * '3':跳转订单详情
             */
            handlerBtn(type) {
                //认证列表
                let list = this.detail.platformBaseInfo.conditions;
                let _this = this;   
                let tips = '请仔细阅读相关协议';             
                if(type == 0) {
                    //按申请资格顺序逐个认证
                    // for(let i in list) {
                    //     let l = list[i];
                    //     if(_this.isFor) {
                    //         this.goAuth(l);
                    //     }
                    // }
                } else if(type == 1) { 
                } else if(type == 2) {
                   // 完成申请
                   let data = {
                        pfNo : _this.platformNo,
                        borrowAmount : _this.iptAmount,
                        borrowDealine : _this.iptPeriod,
                        borrowUnit : _this.detail.userAccept.term_type
                    };
                    if(!_this.isAgree) {
                        _this.$msg({ content : tips });
                        return;
                    }
                     _this.$ajax.post(this.apiPath.confirm, _this.$qs.stringify(data),{
                         headers : _this.Base.initAjaxHeader(1,{})
                     }).then(res=>{
                         res = res.data;
                         if(res.status == 0) {
                             //成功刷新页面
                             location.href = location.href;
                         } else {
                             _this.$msg({ content : res.msg });
                         }
                     })  

                } else if(type == 3) {
                    _this.$router.push({
                        name : 'OrderDetail',
                        params : {
                            'orderNo' : _this.detail.platformBaseInfo.orderNo
                        }
                    });
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

            //跳转订单详情
            linkOrderDetail(pass,orderNo) {
                if(pass == 3 && orderNo) {
                    this.$router.push({
                        name : 'OrderDetail',
                        params : {
                            'orderNo' : this.detail.platformBaseInfo.orderNo
                        }
                    });
                }                
            },
            
            //关闭资质不符弹窗
            offIncompetence() {
                this.incompetenceConfig.isZzbf = 
                this.incompetenceConfig.isHksm =
                this.incompetenceConfig.isZhfy = false;
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
            //去认证
            goAuth(li) {
                //已认证 返回
                if(!li.hasVerify) {
                    let linkConfig = [
                        ['BASIC_VERIFY' , 'AuthBase' ] ,  //基础信息
                        ['IDCARD_INFO' , 'IdentityProve' ] ,  //身份认证(身份证上传页面)
                        ['CONTACT_INFO' , 'AuthContact' ] ,  //联系人认证
                        ['ADD_CREDITCARD' , 'AuthAddCard' ] ,  //添加信用卡
                        ['ADD_WORKINFO' , 'AuthAddWork' ] ,  //添加工作信息
                        ['ADD_SOCIALINFO' , 'AuthSocial' ] ,  //添加社交信息
                        ['ADD_BONUSINFO' , 'BonusProve' ] ,  //添加加分认证
                        ['ADD_OTHERINFO' , 'PhotoInfor' ] ,  //添加照片资料
                        ['OTHER_INFO_VERIFY' , 'AuthOther' ] ,  //其他信息
                    ];
                    //如果跳转第三方
                    if(li.jump) {
                        //如果第三方可以回跳回来
                        if(li.apiType == 'backUrl') {
                            //location.href = `${li.url}${location.href}&themeColor=527BEC`;
                            let o = {
                                url : `${li.url}${location.href}&themeColor=527BEC`,
                                title : li.name, 
                                startColor:"#6A5CF6",
                                endColor:"#8BE2F1",
                                reload : true

                            };
                            this.Base.interactiveWithApp('openNewWindow',o).then(data=>{
                                if(data == 'wap') {
                                    this.Base.setIframePageInfo(this,o);
                                } else {
                                    console.log('openNewWindow',data);
                                }
                            });               
                            this.isFor = false;
                        } else {
                            let o = {
                                url : li.url,
                                title : li.name, 
                                startColor:"#6A5CF6",
                                endColor:"#8BE2F1",
                                reload : true
                            };
                            this.Base.interactiveWithApp('openNewWindow',o).then(data=>{
                                if(data == 'wap') {
                                    this.Base.setIframePageInfo(this,o);
                                } else {
                                    console.log('openNewWindow',data);
                                }
                            }); 
                            this.isFor = false;
                        }
                    } else {
                        for(let i in linkConfig) {
                            if(li.code == linkConfig[i][0]) {
                                // if(li.code == 'OTHER_INFO_VERIFY') {
                                //     0
                                // }
                                this.$router.push({ name : linkConfig[i][1] });
                                this.isFor = false;
                                break;
                            }
                        }
                    }
                };
                
            },
            //页面回跳
            goback() {
                this.$router.back(-1);
            },
            //用户是否符合资质
            showAuthPopup(userAccept) {
                //现金白卡认证，非200没有贷款资质
                if(userAccept.result != 200) {
                    this.incompetenceConfig.isZzbf = true;
                }
            }
        },
        filters : {
            termType(value) {
                if(value == 1) return '天';
                if(value == 2) return '月';
                if(value == 3) return '年';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .platform{
        background:#f5f5f5;
        .detail{
            padding-bottom:.98rem;
            margin-top:1.4rem;
            .panel{
                padding-top:.2rem;
                .bg{
                    height:2rem;
                    background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
                    width:100%;
                    top:0;
                    left:0;
                }
                .data{
                    width:6.86rem;
                    margin:auto;
                    background:#fff;
                    border-radius:.08rem;
                    box-shadow:0 0 14px 0px rgba(37,33,89,0.12);
                    //额度&期限
                    .one{
                        font-size:.22rem;
                        padding:.1rem .57rem;
                        input[disabled]{
                            color:#3E475D;
                            opacity:1;
                            -webkit-text-fill-color:#3E475D;
                        }
                        .fl{                            
                            p{
                                padding:.3rem 0 .25rem 0;
                            }
                            .ipt{
                                height:.42rem;
                                line-height:.42rem;
                                font-size:.42rem;
                                input{
                                    line-height:.42rem;
                                    font-size:.42rem;
                                    width:2.2rem;
                                    position:absolute;
                                    top:-.04rem;
                                    left:0;
                                    z-index:2;
                                }
                                .txt{
                                    left:1.5rem;
                                }
                                i{
                                    display:block;
                                    position:absolute;
                                    width:.24rem;
                                    height:.24rem;
                                    background:url(../../assets/main/edit.png) no-repeat;
                                    background-size:.24rem;
                                    left:2rem;
                                    top:.1rem;
                                }
                            }
                        }
                        .one_left{
                            width:3.7rem;                            
                        }
                        .one_right{
                            width:2rem;
                            padding-right:0;
                            .ipt{
                                input{
                                    width:1.3rem;
                                }
                                
                                .txt{
                                    left:.9rem;
                                }
                                i{
                                    width:.18rem;
                                    height:.11rem;
                                    background:url(../../assets/main/sjx.png) no-repeat;
                                    background-size:.18rem;
                                    left:1.4rem;
                                    top:.15rem;
                                }
                            }
                        }
                    }
                    //详细信息
                    .two{
                        display:flex;
                        align-items:center;
                        padding:.1rem .57rem;
                        margin-top:.25rem;
                        justify-content:space-between;
                        div{
                            //width:2.4rem;
                            font-size:.22rem;
                            p.por{
                                padding-right:.26rem;
                            }
                            p:nth-child(1){
                                color:#A8AAB2;
                                .two_question{
                                    position:absolute;
                                    display:block;
                                    width:.24rem;
                                    height:.25rem;
                                    background:url(../../assets/main/question.png);
                                    right:0;
                                    top:.05rem;
                                    background-size:.24rem .25rem;
                                }
                            }
                            p:nth-child(2){
                                padding-top:.2rem;
                                span{
                                    font-size:.34rem;
                                }
                            }
                        }
                    }
                    .tips{
                        padding:.25rem .57rem .3rem .57rem;
                        span{
                            color:#98A2B2;
                            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                            -webkit-user-select: none;
                            -moz-user-focus: none;
                            -moz-user-select: none;
                        }
                    }
                }
            }
            //进度
            .progress{
                margin-top:.2rem;
                background:#fff;
                height:1.3rem;
                display:flex;
                align-items:center;
                justify-content:center;
                .con{
                    width:6.86rem;
                    p{
                       padding-bottom:.15rem; 
                    }
                    .bar{
                        height:.08rem;
                        background:#ddd;
                        border-radius:.04rem;
                        overflow:hidden;
                        span{
                            width:1rem;
                            background:#527BEC;
                            height:.08rem;
                            float:left;
                        }
                    }
                }
            }
        }
        //申请条件
        .condition{
            margin-top:.2rem;
            padding:0 .32rem;
            background:#fff;
            .title{
                padding:.32rem 0;
                display:flex;
                align-items:center;
                border-bottom:1px solid #e6e6e6;
                span:nth-child(1){
                    width:.08rem;
                    height:.25rem;
                    background:#527BEC;
                }
                span:nth-child(2){
                    font-size:.32rem;
                    font-weight:bold;
                    padding-left:.2rem;
                }
            }
            .list{
                padding-left:.4rem;
                li{
                    display:flex;
                    height:1rem;
                    align-items:center;
                    border-bottom:1px solid #E6E6E6;
                    div:nth-child(1){
                        font-size:.3rem;
                        position:relative;
                        padding-left:.1rem;
                        span:nth-child(1){
                            position:absolute;
                            display:block;
                            width:.55rem;
                            height:.54rem;
                            background-size:1.1rem .54rem !important;
                            top:-.04rem;
                            left:-.45rem;
                        }
                    }
                    div:nth-child(2){
                        margin-left:auto;
                        width:1.1rem;
                        height:.52rem;
                        background:#527BEC;
                        color:#fff;
                        border:2px solid #527BEC;
                        border-radius:.27rem;
                        text-align:center;
                        line-height:.52rem;
                    }
                    div.go{
                        background:#A8AAB2;
                        color:#fff;
                        border-color:#A8AAB2;
                    }
                }
            }
        }
        //客服电话
        .tel_wrap{
            background:#fff;
            padding:0 .32rem;
            p{
                line-height:1rem;
                border-bottom:1px solid #E6E6E6;  
            }
            .tel{
                display:flex;
                height:1rem;
                align-items:center;
                padding-left:.55rem;
                background:url(../../assets/main/pd_tel.png) left center no-repeat;
                background-size:.4rem;
                span:nth-child(2){
                    margin-left:auto;
                }
            }
        }
        //协议
        .agreement{
            padding:.22rem .32rem;
            .operate{
                display:flex;                
                div:nth-child(1){
                    flex-shrink:0;
                    width:.32rem;
                    height:.33rem;
                    background:#64A4FA;
                    border-radius:2px;
                    margin-right:.14rem;
                }
                div.selected{
                    background:url(../../assets/main/pd_selected.png) no-repeat;
                    background-size:.32rem .33rem;
                }
                div:nth-child(2){
                    line-height:.33rem;
                    a{
                        color:#64a4fa;
                    }
                }
            }
            .txt{
                color:#B2B6C2;
                line-height:.3rem;
                padding:.2rem 0 .6rem 0;
            }
        }
        .apply{
            font-size:.34rem;
            color:#fff;
            background:#527BEC;
            width:100%;
            bottom:0;
            left:0;
            line-height:.98rem;
        }
        .gray{
            background:#A8AAB2;
        }
        .iframe{
            z-index:20;
            position:fixed;
            top:1.3rem;
            width:100%;
            height:100%;
            -webkit-overflow-scrolling: touch;
            overflow-y: scroll;
            iframe{
                height:100%;
                overflow-y:scroll;
            }
        }
    }
</style>