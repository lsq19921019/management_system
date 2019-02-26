<template>
    <div>
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
            <!-- <a href="javascript:;" @click="returnPage()" class="goback"></a> -->
        </div> 
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_container_top">
            <div class="status_info_box">
                <div style="float:left">
                    <div v-if="pageData.statusText" style="padding:.6rem .5rem;padding-bottom:.3rem;font-size:.3rem;color:#fff;"> {{pageData.statusText}}</div>
                    <div v-if="pageData.statusDesc" style="padding:.1rem .5rem;font-size:.2rem;color:#fff;"> {{pageData.statusDesc}}</div>
                </div>
                <div style="float:right;">
                    <div style="padding:.95rem .5rem;font-size:.25rem;">  
                        <div v-if="pageData.tabText" style="padding:.1rem .2rem;background-color:#fff;border-radius:.4rem;" @click="toNextPage(pageData.tabText)">{{pageData.tabText}}</div>
                    </div>
                </div>
            </div>
            <order-process v-if="processList&&processList.length>0" :processList="processList"></order-process>
        </div>
        <div class="page_container_middle">
            <div style="padding-bottom:.2rem;border-bottom: 1px solid #eee;">
                <div style="overflow:hidden;">
                    <div class="order_title" :style="imgBack">
                        {{pageData.pfName}}
                    </div> 
                </div>
            </div>
            <div v-if="pageData.borrowAmount" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">贷款金额</div>
                <div style="float:right;">{{pageData.borrowAmount}}</div>
            </div>
            <div v-if="pageData.borrrowDealine" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">借款期限</div>
                <div style="float:right;">{{pageData.borrrowDealine}}</div>
            </div>
            <div v-if="pageData.borrrowDealine && pageData.totalPeriods != null" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">还款期数</div>
                <div style="float:right;">第{{pageData.currentPeriods}}期（共{{pageData.totalPeriods}}期）</div>
            </div>
            <div v-if="pageData.applyTime" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">申请日期</div>
                <div style="float:right;">{{pageData.applyTime}}</div>
            </div>
            <div v-if="pageData.loanBankCard" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">到账银行卡</div>
                <div style="float:right;">{{pageData.loanBankCard}}</div>
            </div>
            <div v-if="pageData.borrowUsage" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">借款用途</div>
                <div style="float:right;">{{pageData.borrowUsage}}</div>
            </div>
            <div v-if="pageData.borrowIntetest" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">借款费息</div>
                <div style="float:right;">{{pageData.borrowIntetest}}</div>
            </div>
            <div v-if="pageData.overdueIntetest" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">逾期费息</div>
                <div style="float:right;">{{pageData.overdueIntetest}}</div>
            </div>            
            <div v-if="pageData.acountAmount" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">到账金额</div>
                <div style="float:right;">{{pageData.acountAmount}}</div>
            </div>
            <div v-if="pageData.protocolDesc&&pageData.protocolDesc.length>0" style="overflow:hidden;padding:.15rem .1rem;">
                <div style="float:left;color:#bbb;">协议说明</div>
                <div style="float:right;width:50%;text-align:right;"><a v-for="(item,index) in pageData.protocolDesc" :key="index" @click="toProtocolPage(item.protocolClickUrl,item.protocolName)" style="color:#507def;display:inline-block;">&nbsp;《{{item.protocolName}}》</a></div>
            </div>
        </div>
        <a class="page_container_bottom" :href="'tel:'+pageData.customPhone">
            <div class="phone_box">
                客服电话
            </div>
            <div class="phone_num">
                {{pageData.customPhone}}
            </div>
        </a>
        
        <!-- 列表数据 -->
        <div class="list">
            <div class="title">
                <span></span><span>热门推荐</span><span @click="toLoan">更多 ></span>
            </div>
            <ul>
                <platform-item v-for="(item,index) in listData" :key="index" :item="item"></platform-item>
            </ul>
            <!-- <div class="getMore">
                <more-loading  v-if="pageNum <= totalPage && listData.length != 0"></more-loading> 
                <span v-if="isShowListTips" class="fc2 fs28">没有更多了</span>
            </div> -->
        </div>
        <div v-if="pageData.countAmount" class="page_container_fixed clearfloat">
            <div class="account_total">
                <p>总计  ¥{{pageData.countAmount}}</p>
            </div>
            <div class="pay_money_btn" @click="toNextPage(pageData.tabText)" v-if="pageData.tabText">
                {{pageData.tabText}}
            </div>
        </div>
        <div class="downBtn" v-if="false">
            <button>下载APP</button>
        </div>
        <transition name="fade">
            <div v-if='showVerifyBox' style="position:fixed;top:0rem;display:flex;align-items:center;width:100%;height:100%;background:rgba(0,0,0,0.5);">
                <div style="text-align:center;border:1px solid #ccc;background:rgba(255,255,255,1);width:5.3rem;margin:0 auto;box-sizing:border-box;border-radius:.2rem;position:relative;">
                    <div style="text-align:center;padding:.5rem 0;font-size:.3rem;line-height:.6rem;color:2d2d2d;">请输入验证码&nbsp;&nbsp;&nbsp;<input v-model="inputVerifyCode" type="text" style="border:1px solid #ccc;text-indent:.2rem;;-webkit-appearance: none;width:2.18rem;height:.6rem;line-height:.6rem;" maxlength="6"/></div>
                    <div style="width:100%;font-size:.34rem;overflow:hidden;border-top:1px solid #ccc;line-height:.9rem;">
                        <div @click="hideVerifyBox" style="width:50%;float:left;">取消</div>
                        <div @click="sendVerifyCodeFun" style="width:50%;float:left;box-sizing:border-box;border-left:1px solid #ccc;color:#527bec;">确认</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <pop-com v-if="dialogConfig.isShow" :config="dialogConfig" v-on:parentSure="showVerifyBoxFun('hk')" v-on:parentOff="closeWin"></pop-com>
        </transition>
        <transition name="fade">
            <pop-com v-if="dialogConfig1.isShow" :config="dialogConfig1" v-on:parentSure="showVerifyBoxFun('bk')" v-on:parentOff="closeWin"></pop-com>
        </transition>
    </div>
</template>
<script>
    import orderProcess from './components/order_process';
    import platformItem from '@/components/module/platform';
    import popCom from '@/components/popout';
import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                name : 'OrderDetail',
                //订单编号；
                inputVerifyCode: '',
                orderNo: this.$route.params.orderNo ,
                tabType: this.$route.params.tab ,
                //进度列表；
                processList:[],
                pfNo:localStorage.getItem('pfNo')||'',
                //页面数据；
                pageData:'',
                //列表数据
                listData : [],
                isShowLoading : true,
                //当前页
                pageNum : 1,
                //总页数
                totalPage : 1,
                //回传后端类型字段
                type : '',
                //请求url
                apiPath : {
                    //首页列表
                    index : '/api/platform/index',
                },
                dialogConfig : {
                    btns : ['取消','确定'],
                    isShow:false,
                    showTitle : true,
                    title : '提示',
                    isShow:false,
                    content : '<span style="line-height:1.5">一旦实名认证通过，相关信息不允许修改，是否确认进行实名认证？</span>'
                },
                dialogConfig1 : {
                    btns : ['取消','确定'],
                    isShow:false,
                    showTitle : true,
                    title : '提示',
                    isShow:false,
                    content : '<span style="line-height:1.5">一旦实名认证通过，相关信息不允许修改，是否确认进行实名认证？</span>'
                },    
                showVerifyBox:false,
                platformLogeImg:'',
                imgBack:{
                    backgroundImage: '',
                }
            }
        },
        components:{
            orderProcess,platformItem,popCom
        },
        created(){
            // alert(this.tabType);
            // this.orderNo = this.getUrlParam('orderNo');
            // localStorage.setItem('tabStatus',this.tabType);
            this.getPageData(this.orderNo);
            this.getList();
            if(this.$route.query.offAppTitle) {
                this.Base.interactiveWithApp('finishWindow',{
                }).then(data=>{
                    if(data == 'wap') {
                        console.log('finishWindow','wap');
                    } else {
                        console.log('finishWindow',data);
                    }
                });
            }
        },
        methods:{
            hideVerifyBox(){
                this.showVerifyBox = false;
            },
            sendVerifyCodeFun(){
                let _this = this;
                this.showVerifyBox = true;
                this.closeWin();
                if(!_this.inputVerifyCode){
                    _this.$msg({content:'验证码不能为空!'});
                    return;
                }
                let data = {
                            pfNo:_this.pfNo,
                            repayPeriods:[],
                            repayType:'0',
                            orderSn:_this.orderNo,
                            verifyCode:_this.inputVerifyCode,
                        };
                        this.$ajax.post('/api/order/confirmRepay',_this.$qs.stringify(data),{
                            headers: _this.Base.initAjaxHeader(1,data)
                        })
                        .then(res=>{
                            if(res.data.status==='0'){
                                _this.$msg({content:res.data.msg});
                                setTimeout(()=>{
                                    location.reload();
                                },500);
                            }else{
                                _this.$msg({content:res.data.msg});
                            }
                        });
            },
            showVerifyBoxFun(type){
                if(type=='hk'){
                    let _this = this;
                    this.showVerifyBox = true;
                    this.closeWin();
                    let data = {
                                pfNo:_this.pfNo,
                                repayPeriods:[],
                                repayType:'1',
                                orderSn:_this.orderNo,
                                verifyCode:_this.inputVerifyCode,
                                // verifyCode:'',
                            };
                            this.$ajax.post('/api/order/confirmRepay',_this.$qs.stringify(data),{
                                headers: _this.Base.initAjaxHeader(1,data)
                            })
                            .then(res=>{
                                if(res.data.result.needVerifyCode){
                                    this.showVerifyBox = true;
                                }else if(res.data.result.resultStatus){
                                    _this.$msg({content:res.data.result.resultMsg});
                                    setTimeout(()=>{
                                        location.reload();
                                    },500);
                                }else{
                                    _this.$msg({content:res.data.result.resultMsg});
                                    setTimeout(()=>{
                                        location.reload();
                                    },500);
                                }
                            });
                }else if(type == 'bk'){
                    this.$router.push({name:'bindCard',params:{orderNo:this.orderNo}});
                }
            },
            openWin(){
                let _this = this;
                if(_this.pageData.supportRepayImity){
                    _this.dialogConfig.title = '提示';
                    _this.dialogConfig.showTitle = true;
                    _this.dialogConfig.btns = ['取消','确定'];
                    _this.dialogConfig.content = '<span style="line-height:1.5">是否提前还款？</span>';
                    _this.dialogConfig.isShow = true;
                }else{
                    _this.dialogConfig.title = '';
                    _this.dialogConfig.showTitle = false;
                    _this.dialogConfig.btns = ['确定'];
                    _this.dialogConfig.content = '<span style="line-height:1.5">是否提前还款？</span>';
                    _this.dialogConfig.isShow = true;
                }
            },
            openBindCard(){
                let _this = this;
                _this.dialogConfig1.title = '绑卡提示';
                _this.dialogConfig1.showTitle = true;
                _this.dialogConfig1.btns = ['取消','确定'];
                _this.dialogConfig1.content = '<span style="line-height:1.5">绑卡审核需要一定时间，一有结果我们就会反馈给您，请耐心等待。</span>';
                _this.dialogConfig1.isShow = true;
            },
            closeWin(){
                this.dialogConfig1.isShow = false;
                this.dialogConfig.isShow = false;
            },
            //还款
            payMoney(){
                let _this = this;
                 _this.dialogConfig.isShow = false;
                if(_this.pageData.supportRepayImity){
                    if(_this.pageData.redirectH5){
                        _this.dialogConfig.isShow = false;
                        let config = {
                            url : encodeURI(_this.pageData.tabClickUrl+location.href),
                            title : '订单详情',
                            startColor:"#6A5CF6",
                            endColor:"#8BE2F1"
                        };
                        this.Base.interactiveWithApp('openNewWindow',config).then(data=>{
                            if(data == 'wap') {
                                //wap端逻辑
                                _this.Base.setIframePageInfo(_this,{url : encodeURI(_this.pageData.tabClickUrl+location.href),title : '订单详情'});
                            } else {
                            }
                        }); 
                    }else{
                        let data = {
                            pfNo:_this.pfNo,
                            repayPeriods:[],
                            repayType:'1',
                            orderSn:_this.orderNo,
                            verifyCode:_this.inputVerifyCode,
                        };
                        this.$ajax.post('/api/order/confirmRepay',_this.$qs.stringify(data),{
                            headers: _this.Base.initAjaxHeader(1,data)
                        })
                        .then(res=>{
                            if(res.data.result.needVerifyCode){
                                this.showVerifyBox = true;
                            }else if(res.data.result.resultStatus){
                                _this.$msg({content:res.data.result.resultMsg});
                                setTimeout(()=>{
                                    location.reload();
                                },500);
                            }else{
                                _this.$msg({content:res.data.result.resultMsg});
                                setTimeout(()=>{
                                    location.reload();
                                },500);
                            }
                        });
                    }
                }else{
                    closeWin()
                    return;
                }
            },
            //openNewWindow
            openNewWindow(toPage){
                let _this = this;
                let config = {
                    url : toPage,
                    title : '订单详情',
                    startColor:"#6A5CF6",
                    endColor:"#8BE2F1"
                };
                this.Base.interactiveWithApp('openNewWindow',config).then(data=>{
                    if(data == 'wap') {
                        //wap端逻辑
                        _this.Base.setIframePageInfo(_this,{
                    url : toPage+location.href,
                    title : '订单详情',});
                        console.log('jumpToSharing','wap');
                    } else {
                        console.log('jumpToSharing',data);
                    }
                }); 
            },
            toNextPage(type){
                let _this = this;                
                let distributePage = location.origin + '/distribute/bindCard';
                if(_this.pageData.tabText == '去确认'){
                    distributePage = location.origin + '/distribute/auth'
                }
                if(_this.pageData.tabText == '去签约'){
                    distributePage = location.origin + '/distribute/sign'
                    console.log(distributePage)
                }
                if(_this.pageData.tabText == '立即还款'){
                    distributePage = location.origin + '/distribute/repay'
                }
                if(_this.pageData.tabText == '下载APP'){
                    console.log('下载APP')
                }
                console.log(`即将跳转${_this.pageData.tabText }：${distributePage}`);
                let config = {
                    title:_this.pageData.tabText,
                    url:encodeURI(_this.pageData.tabClickUrl+distributePage).replace('%0D%0A', ""),
                    startColor:"#6A5CF6",
                    endColor:"#8BE2F1",
                    reload : true
                };                
                        // window.location.href = '/auth/bindCard/'+_this.orderNo;
                        // return;                 
                if(_this.pageData.redirectH5){
                    localStorage.setItem('distributeConfigPath',location.pathname);
                    this.Base.interactiveWithApp('openNewWindow',config).then(data=>{
                        if(data == 'wap') {
                            //wap端逻辑跳转iframe;
                            _this.Base.setIframePageInfo(_this,{title:_this.pageData.tabText,url:encodeURI(_this.pageData.tabClickUrl+distributePage)});
                            // console.log('jumpToSharing','wap');
                        } else {
                            // alert(1111);
                            // alert('刷新！');
                            console.log('jumpToSharing',data);
                        }
                    });
                    // window.location.href = _this.pageData.tabClickUrl+location.href;
                }else{
                    if(_this.pageData.tabText==='催单'){
                        _this.$msg({content:'已将请求推送至平台'});
                    }else if(_this.pageData.tabText==='去补充'){
                        localStorage.setItem('pfNo',_this.pageData.pfNo);
                        // window.location.href = '/auth/other';
                        _this.$router.push({ name : 'PlatformDetail', params : { id : _this.pageData.pfNo } });
                    }else if(_this.pageData.tabText==='去绑卡'){
                        this.openBindCard();
                        //_this.$router.push({name:'bindCard',params:{orderNo:_this.orderNo}});
                        // window.location.href = '/auth/bindCard/'+_this.orderNo Distribute
                    }else if(_this.pageData.tabText==='去签约'){
                        _this.$router.push({path: '/distribute/sign'});
                    }else if(_this.pageData.tabText==='立即还款'){
                        _this.openWin();
                    }else{
                        _this.$router.push({name: 'Loan'});
                    }
                }
            },
            toProtocolPage(urlProto,urlName){
                
                // window.location.href = urlProto;
                let _this = this;
                let config = {backUrl:'回到人人贷款',title:urlName,url:urlProto, startColor:"#6A5CF6",endColor:"#8BE2F1",reload:true};
                this.Base.interactiveWithApp('openNewWindow',config).then(data=>{
                    if(data == 'wap') {
                        //wap端逻辑                       
                        _this.Base.setIframePageInfo(_this,config);
                        console.log('jumpToSharing','wap');
                    } else {
                        console.log('jumpToSharing',data);
                    }
                });
            },
            toLoan() {
                this.$router.push({ name : 'Loan' });
            },
            getList() {      
                let _this = this;                     
                let data = {
                   pageNum : this.pageNum,
                   type : this.type
                };                              
                this.$ajax.post(this.apiPath.index,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    let result = res.data; 
                    if(result.status == 0) { 
                        if(_this.pageNum > _this.totalPage) {
                            
                        } else {
                            if(result.result.list&&result.result.list.length>5){
                                _this.listData = result.result.list.slice(0,5);
                            }
                        }
                        _this.pageNum += 1; 
                    } else {
                        _this.$msg({ content : result.msg });
                    }
               });
            },
            //重置进度列表
            resetProcessList(){
                let _this = this;
                let temp_string = _this.processList.join('-');
                if(temp_string.indexOf('true')===0){
                    return;
                }
                try{
                    _this.processList.forEach((v,i)=>{
                        if((i===(_this.processList.length-1))&&(v.showColor)){
                            console.log(v[i])
                            _this.processList[i].active = true;
                            throw 'done';
                        }else if(!v.showColor){ 
                            _this.processList[i-1].active = true;
                            throw 'done';
                        }
                        console.log(_this.processList);
                    });
                }catch (e){
                    console.log(e);
                }
            },
            //获取url参数;
            getUrlParam(para){
                //获取问号的索引;
                let index_para = window.location.href.indexOf('?');
                //获取问号后面的字符串;
                let para_string = window.location.href.slice(index_para+1);
                //获取问号后面的参数; 
                let para_list = para_string.split('&');
                let para_value = null;
                para_list.forEach((v,index)=>{
                    if(v.indexOf(para)>-1){
                        para_value = (v.split('='))[1];
                    }
                });
                if(para_value){
                    console.log('获取参数成功！');
                    return para_value;
                }else{
                    console.log('非法参数！');
                }
            },
            //获取订单详情页面；
            getPageData(orderNo){
                let data = {
                    orderNo: orderNo
                }
                let _this = this;
                this.$ajax.post('/api/order/detial',this.$qs.stringify(data),{headers: this.Base.initAjaxHeader(1,data)}).then(res=>{
                    if(res.data.status == '0'){
                        _this.processList =  res.data.result.showOrderSquence;
                        _this.pageData = res.data.result;
                        _this.pfNo = res.data.result.pfNo;
                        _this.imgBack.backgroundImage = 'url('+_this.pageData.platformLogeImg+')';   
                        _this.isShowLoading = false;
                        localStorage.setItem('pfNo',res.data.result.pfNo)
                        if(_this.processList){
                            _this.resetProcessList();
                        }
                    }else{
                        this.$msg({content:res.data.msg})
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>
    .downBtn{
        position: fixed;
        bottom: 0;
        width: 100%;     
        button{
            font-size:.34rem;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:.16rem;
            width:100%;
            height:.98rem;
            background:rgba(82,123,236,1);               
        }
    }
    .page_container_top{
        padding:.2rem;background-color:#fff;
        margin-top: 1.4rem;
        .status_info_box{
            background-image: url('../../assets/order/order_detail_bg.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            height: 2.5rem;
            width: 100%;
            overflow: hidden;
        }
    }
    .page_container_middle{
        margin-top: .2rem;
        background-color: #fff;
        padding: .2rem;     
        .order_title{
            padding-left: .5rem;
            font-size: .3rem;
            background-position: center left;
            background-size: .4rem 100%;
            background-repeat: no-repeat;
            float:left;
        } 
    }
    .page_container_bottom{
        margin-top: .2rem;
        background-color: #fff;
        padding: .2rem;   
        overflow: hidden;
        display: block;
        .phone_box{
            padding: .1rem 0;
            padding-left: .6rem;
            background-image: url('../../assets/order/phone_icon.png');
            background-position: center left;
            background-size: contain;
            background-repeat: no-repeat;
            float: left;
        }  
        .phone_num{
            padding: .1rem 0;
            padding-left: .6rem;
            float: right;
        }  
    }
    .page_container_fixed{
        background-color: #fff;
        overflow: hidden;
        position: fixed;
        width: 100%;
        box-sizing: border-box;
        bottom: 0;
        .account_total{
            padding: .3rem;
            float: left;
        }  
        .pay_money_btn{
            padding: .3rem;
            float: right;
            background-color: #527BEC;
            color: #fff;
        }  
    }
    
        .list{
            padding-bottom:1.1rem;
            border-top:.2rem solid #f5f5f5;
            .title{
                padding:.32rem 0;
                width:6.9rem;
                margin:auto;
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
                span:nth-child(3){
                    font-size:.28rem;
                    color:#a8aab2;
                    margin-left:auto;
                }
            }
            ul{
                li{
                    padding:.26rem .32rem .2rem .32rem;
                    background:#fff;
                    border-bottom:.16rem solid #f2f2f2;
                    
                }
                li:last-child{border:none;}
            }
            .getMore{
                text-align:center;
            }
        }
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
</style>     