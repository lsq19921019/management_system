<template>
    <div class="platform">
        <!-- 加载中 -->
        <loading v-if="calcing" :text="'计算中...'"></loading>
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
                            {{ detail.platformBaseInfo.baseInfo.productDesc }}
                        </span>
                    </div>
                    <div v-if="detail.platformBaseInfo.dayRestAmount.countResult != 0">
                        <progress-bar :value="detail.platformBaseInfo.dayRestAmount.countResult"
                        :options="{
                            pathColors: ['#8dc1d5','#f9e757'],
                            radius:radius,
                            circleWidth:circleWidth,
                            text:setCircleText(detail.platformBaseInfo.dayRestAmount.countResult),
                            textColor:'#FFEA3F',
                        }"></progress-bar>
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
                                    <span v-if="detail.userAccept.amountRang.length > 1"></span>
                                </div>
                            </div>
                            <div class="cc ccr">
                                <p>期限（{{ detail.userAccept.term_type | termType }}）</p>
                                <div class="cci" @click="showPicker2">
                                    <span><input type="tel" ref="ipt2" maxlength="3" v-model="iptPeriod" disabled></span>
                                    <span v-if="detail.userAccept.terms.length > 1"></span>
                                </div>
                            </div>
                        </div>
                        <!-- 到期应还&到账金额&利息和费用 -->
                        <div class="c_detail">
                            <div class="td">
                                <div class="number fs32">{{ incompetenceConfig.zhfy.repay_amount }}</div>
                                <div class="desc">到期应还款(元)</div>
                            </div>
                            <div class="td">
                                <div class="number fs32">{{ iptAmount }}</div>
                                <div class="desc">到账金额(元)</div>
                            </div>
                            <div class="td">
                                <div class="number fs32"><span>{{ incompetenceConfig.zhfy.interest_fee-0+(incompetenceConfig.zhfy.service_fee-0) }}</span><span @click="showIncompetence('zhfy')" ></span></div>
                                <div class="desc">利息和费用(元)</div>
                            </div>
                        </div>
                    </div>
                    <span class="btn" @click="showIncompetence('ckxq')">查看详情 ></span>
                </div>
            </div>
            <!-- 申请资格 -->
            <div class="auth">
                <p class="title fs32">申请资格</p>
                <ul class="list">
                    <li class="por"  v-for="(li,index) in detail.platformBaseInfo.conditions" :key="index" @click="goAuth(li,index)">                     
                        <span>{{ li.name }}</span>
                        <span :class="{ 'done' : li.hasVerify }">{{ li.text }}</span>
                        <!-- <i class="poa dsb" :style="'background:url('+li.logo+') '+ (li.hasVerify?'right':'left') +' top no-repeat;'"></i> -->
                        <i class="poa dsb" :style="'background:url('+li.logo+') right top no-repeat;'"></i>
                    </li>
                </ul>
            </div>
            <!-- 其他信息 -->
            <div class="description">
                <!-- 公司信息 -->
                <div class="commpany">
                    <p><span>公司</span>{{ detail.platformBaseInfo.baseInfo.companyFullName }}</p>
                    <p><span>电话</span><a :href="'tel:'+detail.platformBaseInfo.baseInfo.kfPhone">{{ detail.platformBaseInfo.baseInfo.kfPhone }}</a></p>
                </div>
                <!-- 协议 -->
                <div class="agreement por">
                    <i :class="{
                        dsb : true,poa : true,
                        selected : isAgree
                    }" @click="handlerAgreement"></i>我已阅读并同意<a v-for="(agree,index) in detail.platformBaseInfo.baseInfo.protocols" :key="index" @click="linkToPlatformAgreement(agree)">《{{ agree.protocolName }}》</a> 
                </div>
                <!-- 小提示 -->
                <div class="tips">
                    温馨提示：{{ detail.platformBaseInfo.baseInfo.productDescTip }}
                </div>
            </div>
        </div>
        </transition>
        <!-- 资质不符 组件 -->
        <incompetence :incompetenceConfig="incompetenceConfig" v-on:offIncompetence="offIncompetence" :hksm="detail.platformBaseInfo.baseInfo" :status="zzbfStatus"></incompetence>
        <!-- 对话框 -->
        <popout :config="popoutConfig" v-on:parentOff="parentOff"></popout>
        <!-- 按钮 -->
        <button @click="handlerBtn(detail.platformBaseInfo.pass)" :disabled="dis" :class="{
            cur : detail.platformBaseInfo.pass != 0 && detail.platformBaseInfo.pass != 1
        }">{{ detail.platformBaseInfo.passText }}</button>
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
                isShowPopa:false,
                isShowLoading : true,  //加载中...
                apiPath : {
                    detail : '/api/product/detail',  //平台详情
                    borrow : '/api/order/borrow',  //申请借款
                    confirm : '/api/order/confirm',  //完成申请
                    calc : '/api/product/calculate',  //计算利息
                    union_login : '/api/union/login',  //联登接口
                },
                radius: 0,
                circleWidth : 0,
                isShowPage : false,  //请求数据时防止出现undefined
                platformNo : this.$route.params.id,  //平台id
                detail : {
                    "userAccept":{
                        "result":0,
                        "amount":0,
                        "min_amount":0,
                        "terms":[],
                        "term_type":0,
                        "loan_mode":0,
                        "remark":null,
                        "can_loan_time":null,
                        "amountRang":[],
                        "acceptUser":true
                    },
                    "orderLoanCalculate":{
                        "service_fee":"0",
                        "service_fee_desc":"",
                        "interest_fee":"",
                        "receive_amount":"",
                        "repay_amount":"",
                        "repay_plan":[
                            {
                                "period_no":"",
                                "repay_amount":"",
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
                            "protocols":null,
                            "type":null,
                            "repayment":null,
                            "overduePolicy":null,
                            "firstPush":false,
                            "interestRate":"5",
                            "productName":"",
                            "productDesc":"",
                            "productDescTip":"",
                            "companyFullName":""
                        },
                        "dayRestAmount":{
                            "countType":"",
                            "countResult":"0"
                        },
                        "conditions":[
                            {
                                "code":"",
                                "name":"",
                                "jump":false,
                                "url":"",
                                "text":"",
                                "hasVerify":false,
                                "logo":"",
                                "apiType":"",
                                "protocol":null
                            }
                        ],
                        "pass":0,
                        "passText":"",
                        "orderNo":null
                    },
                    "interestrate":null,
                    "lendingTime":null,
                    "maximumAmount":"",
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
                calcing : false,
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
        },
        mounted() {
            //初始化文本框长度&文本框输入动态改变长度
            this.getDetail(this); 
            this.handlerInput('ipt1').handlerInput('ipt2'); 
            localStorage.setItem('pfNo',this.platformNo);
        },
        methods : {
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
                let _this = this;
                let amounts = _this.detail.userAccept.amountRang;
                    let terms = _this.detail.userAccept.terms;
                   // 完成申请
                   let data = {
                        pfNo : _this.platformNo,
                        borrowAmount : _this.iptAmount,
                        borrowDealine : _this.iptPeriod,
                        borrowUnit : _this.detail.userAccept.term_type
                        // borrowAmount : amounts[amounts.length-1],
                        // borrowDealine : terms[terms.length-1],
                        // borrowUnit : _this.detail.userAccept.term_type
                    };
                 _this.$ajax.post(this.apiPath.calc, _this.$qs.stringify(data),{
                        headers : _this.Base.initAjaxHeader(1,{})
                    }).then(res=>{
                    res = res.data;
                    if(res.status == 0) {
                        console.log(res.result);
                        _this.incompetenceConfig.zhfy = res.result;
                        // _this.calcData = res.result; 
                    } else {
                        _this.$msg({ content : res.msg });
                    }   
                    _this.calcing = false;                                         
                })  
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
                if(!li.enabale){
                    this.$msg({ content: li.tip})
                    return
                }
                //跳转认证中页面
                if(li.statusCode == 0){
                    this.$router.push({ name : 'AuthAuthing' });
                    return
                }                
                //如果跳转第三方
                if(li.jump) {
                    //已认证的跳转认证完成页面
                    if(li.hasVerify) {
                        this.$router.push({ name : 'AuthSuccess' });
                    } else {
                        localStorage.setItem("code",li.code||'')                          
                        //如果第三方可以回跳回来
                        if(li.apiType == 'backUrl') {
                            //location.href = `${li.url}${location.href}&themeColor=527BEC`;
                            let o = {
                                url : `${li.url}${location.origin}/undertake/${li.codeType}&themeColor=527BEC`,
                                title : li.name,
                                startColor:"#6A5CF6",
                                endColor:"#8BE2F1",
                                reload : true
                            };
                            this.Base.interactiveWithApp('openNewWindow',o).then(data=>{
                                if(data == 'wap') {
                                    this.Base.setIframePageInfo(this,{
                                        title : li.name,
                                        url : `${li.url}${location.href}`
                                    });
                                } else {
                                    console.log('openNewWindow',data);
                                }
                            });               
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
                        }
                    }                    
                } else {
                    for(let i in linkConfig) {
                        if(li.code == linkConfig[i][0]) {  
                            console.log(li)   
                            //进行联系人认证获取通讯录
                            if(li.code == 'CONTACT_INFO') {
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
                            // if(li.code == 'IDCARD_INFO'&&li.hasVerify == false) {
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
                            if(li.code == 'IDCARD_INFO') {
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
                                if(li.code == 'CONTACT_INFO' || li.code == 'OTHER_INFO_VERIFY') {
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
                if(!_this.isAgree) {
                    _this.$msg({ content : tips });
                    setTimeout(_=>{
                        this.dis = false;  
                    },1500);  
                    return;
                }
                if(type == 0) {
                    //按申请资格顺序逐个认证
                    // for(let i in list) {
                    //     let l = list[i];
                    //     if(_this.isFor) {
                    //         this.goAuth(l);
                    //     }
                    // } 
                } else if(type == 2) {
                    let amounts = _this.detail.userAccept.amountRang;
                    let terms = _this.detail.userAccept.terms;
                    _this.dis = true;
                   // 完成申请
                   let data = {
                        pfNo : _this.platformNo,
                        borrowAmount : amounts[amounts.length-1],
                        borrowDealine : terms[terms.length-1],
                        borrowUnit : _this.detail.userAccept.term_type
                    };
                    // if(!_this.isAgree) {
                    //     _this.$msg({ content : tips });
                    //     setTimeout(_=>{
                    //         this.dis = false;  
                    //     },1500);  
                    //     return;
                    // }
                     _this.$ajax.post(this.apiPath.confirm, _this.$qs.stringify(data),{
                         headers : _this.Base.initAjaxHeader(1,{})
                     }).then(res=>{
                         res = res.data;
                         if(res.status == 0) {
                            //  //成功刷新页面
                            //  location.href = location.href;
                            // 成功再次请求接口
                            _this.getDetail('click');
                         } else if(res.status == -4) {
                             _this.popoutConfig.isShow = true;
                             _this.popoutConfig.content = res.msg;
                             this.dis = false; 
                         } else {                             
                             _this.$msg({ content : res.msg });
                             setTimeout(_=>{
                                 this.dis = false;  
                             },1500);
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
            //用户是否符合资质
            showAuthPopup(userAccept) {
                //现金白卡认证，非200没有贷款资质
                if(userAccept.result != 200) {
                    this.incompetenceConfig.isZzbf = true;
                }
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
            handlePicker1Confirm(v){
                if(this.iptAmount == v[0].value || v[0].value == 0) return;
                this.iptAmount = v[0].value;
                this.calcing = true;
                this.calcFee(); 
                this.initIptWidth('ipt1');
            },
            showPicker1() {
                if(this.detail.userAccept.amountRang.length > 1) {
                    this.$refs.picker1.show();
                    this.picker1.data = [this.detail.userAccept.amountRang];
                }                                
            },
            handlePicker2Confirm(v){
                if(this.iptPeriod == v[0].value) return;
                this.iptPeriod = v[0].value;
                this.calcing = true;
                this.calcFee(); 
                this.initIptWidth('ipt3');
            },
            showPicker2() {
                if(this.detail.userAccept.terms.length > 1) {
                    this.$refs.picker2.show();
                    this.picker2.data = [this.detail.userAccept.terms]; 
                }               
            },
            //计算应还金额
            calcRepayment() {
                let a = this.iptAmount-0;
                let b = this.detail.platformBaseInfo.baseInfo.interestRate -0;
                let c = this.iptPeriod-0;
                // this.detail.orderLoanCalculate.repay_amount.max  = (a+(a*b*c/10000)).toFixed(2);
            },
            //获取平台详情
            getDetail(param) {
                let _this = this;
                let data = {
                    pfNo : _this.platformNo
                }; 
                _this.$ajax.post(_this.apiPath.detail, _this.$qs.stringify(data), {
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    if(res.data.status == 0) { 
                        let obj = res.data.result;
                        _this.detail = obj;
                        _this.iptAmount = _this.detail.userAccept.amount;
                        _this.iptPeriod = _this.detail.userAccept.terms[_this.detail.userAccept.terms.length-1];
                        _this.calcFee(); 
                        _this.initIptWidth();
                        _this.showAuthPopup(_this.detail.userAccept);
                        _this.handlerFirstPush();
                        _this.isShowPage = true;
                        if(_this.detail.platformBaseInfo.pass == 3 && param == 'click') {
                            _this.$router.push({
                                name : 'OrderDetail',
                                params : {
                                    'orderNo' : _this.detail.platformBaseInfo.orderNo
                                }
                            });
                        }   
                        
                        // _this.incompetenceConfig.zhfy = _this.detail.orderLoanCalculate;
                        // //期限
                        // _this.picker2.data.push(_this.detail.userAccept.terms);
                        // //额度
                        // _this.picker2.data.push(_this.detail.userAccept.amountRang);
                        
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
                    // console.log(1111);
                    // alert(1);
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