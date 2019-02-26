<!--
    create : 田鹏伟 2018-9-10
    desc : 平台数据li
    update : 田鹏伟 2018-10-23
    desc : 2.0-修改样式&添加进度条
-->
<template>
    <div>
        <li @click="getUserInfo(item)">
            <div class="c_detail por">
                <!-- 平台logo & 名称 -->
                <dl class="c">
                    <dt class="fl"><img v-lazy="item.iconURL" alt=""></dt>
                    <dd class="fl">{{ item.platformName }}</dd>
                </dl>
                <div class="detail fs24 fc2">
                    <div>
                        <p><span class="num">{{ item.minimumAmount==item.maximumAmount ? item.minimumAmount : item.minimumAmount +'-'+ item.maximumAmount }}</span></p>
                        <p>额度(元)</p>
                    </div>
                    <div>
                        <p>期限：<span class="fc1">{{ item.minimumPeriod == item.maximumPeriod ? item.minimumPeriod : item.minimumPeriod +'-'+ item.maximumPeriod }}天</span></p>
                        <p>日利率：<span class="fc1">{{ item.interestrate }}%</span></p>
                    </div>
                </div>
                <div class="progress poa">
                    <!-- <progress-bar :value="item.applyRate"
                    :options="{
                        pathColors: ['#507DEF','#CCCED6'],
                        radius:radius,
                        circleWidth:circleWidth,
                        text:item.applyRate==100?'满额':'申请',
                        textColor:item.applyRate==100?'#A8AAB2':'#507DEF',
                    }"></progress-bar>
                    <span class="fc2" v-if="item.applyRate != 0">已申请{{ item.applyRate }}%</span> -->
                    <a href="javascript:;" :class="{
                        gray : item.applyRate == 100
                    }">{{ item.applyRate == 100 ? '已满额' : '立即申请' }}</a>
                    <div v-if="item.applyRate != 100 && item.apiFinished=='true' && item.applyRate != 0" class="bar"><span :style="{
                        width : item.applyRate+'%'
                    }"></span></div>
                    <p v-if="item.applyRate != 100 && item.apiFinished=='true' && item.applyRate != 0">已申请{{ item.applyRate }}%</p>
                </div>
            </div>
            <div class="c_desc fc2 f24">{{ item.desc }}</div>
        </li>
        <div v-show="hrefing" class="mask"></div>
    </div>
</template>

<script>
    // import progressBar from 'svg-progress-bar';
    export default {
        data() {
            return {
                hrefing : false,
                circleWidth : 0,
                apiPath : {
                    user : '/api/user/index',
                    user_operate : '/api/browse/user_operate',
                    union_login : '/api/union/login'
                }
            }
        },
        components : {
            // progressBar
        },
        props : {
            item : {

            }
        },
        created() {
            this.radius = this.Base.calcPx(0.84)/2;
            this.circleWidth = this.Base.calcPx(0.06);          
        },
        methods: {
            //跳转平台详情页面
            goPlatformDetail(item) {
                let _this = this;
                let platformNo = item.platformNo;  //平台id
                let apiFinished = item.apiFinished;  //是否对接完成
                let platformPushMax = item.platformPushMax;
                let applyRate = item.applyRate;
                let productURL = item.productURL;  //第三方平台链接
                let platformName = item.platformName; //平台名称
                let orderNo = item.orderNo;  //订单编号
                let hashUnfinishedOrder = item.hashUnfinishedOrder;
                if(applyRate == 100) {
                    this.$msg({ content : '该平台今日已经满额请明日再来' });
                    return;
                }
                _this.hrefing = false;
                if(apiFinished == 'true') {
                    //已完成对接
                    /**
                     * 1是否登录 去登录
                     * 2是否实名 去实名
                     * 3是否二推（改为详情页面判断）
                     */
                    // this.getUserInfo(platformNo);
                    //如果有订单编号跳转订单详情页面
                    if(hashUnfinishedOrder && orderNo) {
                        _this.$router.push({ name : 'OrderDetail', params : { orderNo : orderNo } }); 
                    //否则跳转平台详情
                    } else {
                        _this.$router.push({ name : 'PlatformDetail', params : { id : item.platformNo } });
                    }
                    
                } else {
                    //跳转第三方页面
                    //this.Base.setIframePageInfo(this,{ url : productURL, title : platformName });
                    this.Base.interactiveWithApp('openNewWindow',{
                        url : productURL, title : platformName, startColor:"#6A5CF6",endColor:"#8BE2F1"
                    }).then(data=>{
                        if(data == 'wap') {
                            console.log('openNewWindow','wap');
                            _this.Base.setIframePageInfo(_this,{ url : productURL, title : platformName });
                        } else {
                            console.log('openNewWindow',data);
                        }
                    }); 
                    //location.href = productURL; 
                }
            },
            getUserInfo(item) {                                     
                if(!localStorage.getItem('_token')) {
                    this.$router.push({ name : 'Login' });
                    return;
                } 
                if(this.hrefing) {
                    return;
                };
                this.hrefing = true; 
                //统计浏览足迹
                //this.userOperate(item.platformNo);
                let _this = this;
                return new Promise((reslove,reject)=>{
                    this.$ajax.post(_this.apiPath.user,_this.$qs.stringify({}),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    }).then(res=>{
                        let result = res.data; 
                        if(result.status == 0) {
                            // resolve(0);
                            _this.getPv(item);
                        } else if(result.status == '-9') {
                            _this.setHrefing(); 
                            _this.$router.push({ name : 'AuthBase'});
                            // debugger;
                            // _this.$msg({ content : result.msg });
                            // //未认证                             
                            // setTimeout(_=>{
                            //     _this.$router.push({ name : 'AuthBase',query:{type:1}});
                            // },1800);
                        } else if(result.status == '-100') {
                            _this.$msg({ content : result.msg });
                            setTimeout(_=>{
                                _this.setHrefing(); 
                                _this.$router.push({ name : 'Login' });
                            },1800);                            
                        } else {
                            _this.setHrefing(); 
                            _this.$msg({ content : result.msg });
                        }                
                    });
                });
            },
            //统计浏览足迹--点击触发，成败不作处理
            // userOperate(platformNo) {
            //     let _this = this;
            //     let data = {
            //         platformNo : platformNo
            //     };
            //     _this.$ajax.post(_this.apiPath.user_operate,_this.$qs.stringify(data),{
            //         headers: _this.Base.initAjaxHeader(1,{})
            //     }).then(res=>{
            //         //console.log(res.data);
            //     });
            // },
            //统计pv
            getPv(item) {
                let _this = this;
                let platformNo = item.platformNo;  //平台id
                let apiFinished = item.apiFinished;  //是否对接完成
                let platformPushMax = item.platformPushMax;
                let applyRate = item.applyRate;
                let productURL = item.productURL;  //第三方平台链接
                let platformName = item.platformName; //平台名称
                let orderNo = item.orderNo;  //订单编号
                let hashUnfinishedOrder = item.hashUnfinishedOrder;
                let data = {
                    platformNo : platformNo
                };
                _this.$ajax.post(_this.apiPath.union_login,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    res = res.data;
                    if(res.status == 0) {
                        _this.setHrefing(); 
                        if(applyRate == 100) {
                            this.$msg({ content : '该平台今日已经满额请明日再来' });
                            return;
                        }
                        if(res.result.jump == '-1') {
                            //已完成对接
                            //如果有订单编号跳转订单详情页面
                            if(hashUnfinishedOrder && orderNo) {
                                _this.$router.push({ name : 'OrderDetail', params : { orderNo : orderNo } }); 
                            //否则跳转平台详情
                            } else {
                                this.$router.push({ name : 'PlatformDetail', params : { id : item.platformNo } });
                            }
                            
                        } else if(res.result.jump == '0'){
                            //跳转第三方页面
                            //this.Base.setIframePageInfo(this,{ url : productURL, title : platformName });
                            this.Base.interactiveWithApp('openNewWindow',{
                                url : res.result.url, title : platformName, startColor:"#6A5CF6",endColor:"#8BE2F1",backUrl:'回到人人贷款'
                            }).then(data=>{
                                if(data == 'wap') {
                                    console.log('openNewWindow','wap');
                                    _this.Base.setIframePageInfo(_this,{ url : res.result.url, title : platformName });
                                } else {
                                    console.log('openNewWindow',data);
                                }
                            }); 
                            //location.href = productURL; 
                        } else if(res.result.jump == 1) {
                            //跳转引导下载第三方平台app页面
                            this.$router.push({ name : 'DetailPagea', params : {
                                pfNo : platformNo
                            } });
                        }
                    } else {
                        _this.setHrefing(); 
                        _this.$msg({ content : res.msg });
                    }
                });


            },
            setHrefing() {
                setTimeout(_=>{
                    this.hrefing = false; 
                },200);
            }
        },
    }
</script>

<style lang="scss" scoped>
    li{
        padding:.24rem .32rem 0 .32rem;
        background:#fff;
        border-bottom:.16rem solid #ededed;
        .c_detail{
            dl{
                dt{
                    width:.36rem;
                    height:.36rem;
                    border-radius:.18rem;
                    overflow:hidden;
                    border:1px solid #cbd7f9;                 
                }
                dd{
                    font-size:.3rem;
                    line-height:.39rem;
                    padding-left:.12rem;
                }
            }
            .detail{
                display:flex;
                margin-top:.2rem;
                div{
                    line-height:1;
                    p:nth-child(1){
                        height:.32rem;
                        line-height:.32rem;
                        display:flex;
                        align-items: flex-end;
                        padding-bottom:.1rem; 
                    }
                }
                div:nth-child(1){
                    min-width:2.6rem;                
                    .num{
                        font-size:.32rem;
                        font-family: PingFangSC-Medium, sans-serif;
                        color:#FB4F67;
                        position:relative;
                        top:-1px;    
                    }
                }
                // div:nth-child(2){
                //     p:nth-child(1){
                        
                //     }
                // }
            }
            .progress{
                // width:1.25rem;
                // text-align:center;
                // top:.2rem;
                // right:.1rem;
                // span{
                //     font-size:.2rem;
                //     display:block;
                //     margin-top:.01rem;
                // }
                width:1.5rem;
                top:.4rem;
                right:0;
                a{
                    display:block;
                    border:1px solid #527BEC;
                    font-size:.26rem;
                    line-height:.48rem;
                    border-radius:.24rem;
                    background:#fff;
                    text-align:center;
                    color:#527BEC;
                }
                a.gray{
                    color:#A8AAB2;
                    border-color:#CCCED6; 
                }
                .bar{
                    height:.04rem;
                    width:1rem;
                    margin:.08rem auto;
                    background:#E6E6E6;
                    border-radius:.02rem;
                    overflow:hidden;
                    span{
                        display:block;
                        background:#F25B67;
                        height:.04rem;
                        width:.5rem;
                    }
                }
                p{
                    text-align:center;
                    font-size:.2rem;
                    color:#A8AAB2;
                    line-height:1;
                }
            }
        }
        .c_desc{
            border-top:1px solid #E6E6E6;
            margin-top:.24rem;
            line-height:1.5;
            padding:.1rem 0;
        }
        
    }
    .mask{
        position:fixed;width:100%;height:100%;top:0;left:0;z-index:100
    }  
</style>