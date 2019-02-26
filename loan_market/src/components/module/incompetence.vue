<!--
    create : 田鹏伟 2018-10-25
    desc : 平台详情资质不符弹窗
-->
<template>
<transition name="fade">
    <div class="wrap pof" v-if="incompetenceConfig.isZhfy || incompetenceConfig.isHksm || incompetenceConfig.isZzbf" @click="offWrap($event)" >
        <!-- 资质不符 -->
        <div class="zzbf" v-if="incompetenceConfig.isZzbf">
           <div class="title">
               <p v-if="status == 'VF00001'">该平台暂无法借款，请稍后再试</p>
               <p v-else>您的资质不符合该产品申请要求，<br>您可以浏览其它产品</p>
            </div> 
            <div class="list">
                <ul>
                    <li v-for="(item,index) in listData" :key="index" @click="getPv(item)">
                        <div class="td fc2">
                            <div>
                                <span>¥{{ item.minimumAmount +'-'+ item.maximumAmount }}元</span>
                                {{ item.desc }}
                            </div> 
                            <div>
                                <dl class="c">
                                    <dt><img :src="item.iconURL" alt=""></dt><dd>{{ item.platformName }}</dd>
                                </dl>
                                {{ item.minimumPeriod +'-'+ item.maximumPeriod }}天
                            </div> 
                        </div>
                    </li>
                </ul>
            </div>
            <div @click="off('goback')"><btn :btnval="'知道了'" :width="'100%'"></btn></div>
        </div>
        <!-- 还款说明 -->
        <!-- <div class="hksm" v-if="incompetenceConfig.isHksm">
            <div class="title">还款说明</div>
            <div class="list fc2">
                <ul>
                    <li v-for="(item,index) in hksmData" :key="index">
                        <span>{{ item.voKey || '' }}</span>
                        {{ item.voValue|| '' }}
                    </li>
                </ul>
            </div>
            <div @click="off"><btn :btnval="'知道了'" :width="'100%'"></btn></div>
        </div> -->
        <!-- 还款说明 -->
        <div class="hksm" v-if="incompetenceConfig.isHksm">
            <div class="title">还款说明</div>
            <div class="list fc2">
                <ul>
                    <li>
                        <span>还款方式</span>
                        {{ hksm.repaymeentDesc }}
                    </li>
                    <li>
                        <span>提前还款</span>
                        {{ hksm.adRepayDesc }}
                    </li>
                    <li>
                        <span>逾期政策</span>
                        {{ hksm.overduePolicy }}
                    </li>
                </ul>
            </div>
            <div @click="off"><btn :btnval="'知道了'" :width="'100%'"></btn></div>
        </div>
        <!-- 综合费用 -->
        <div class="zhfy" v-if="incompetenceConfig.isZhfy">
            <div class="title tac">综合费用</div>
            <div class="list fs26">
                <ul>
                    <li>
                        <span>总费用</span><span>{{ incompetenceConfig.zhfy.service_fee }}元</span>
                    </li>
                    <li>
                        <span>利息</span><span>{{ incompetenceConfig.zhfy.interest_fee }}元</span>
                    </li>
                    <li>
                        <span>本期应还</span><span>{{ incompetenceConfig.zhfy.repay_plan[0].repay_amount }}元</span>
                    </li>
                    <li>
                        <span>应还总金额</span><span>{{ incompetenceConfig.zhfy.repay_amount }}元</span>
                    </li>
                </ul>
            </div>
            <div @click="off"><btn :btnval="'知道了'" :width="'100%'"></btn></div>
            <p class="tips fc2 fs20">
                利息将在交易成功后于订单页可见
                <!-- {{ incompetenceConfig.zhfy.service_fee_desc }} -->
            </p>
        </div>
        <!-- 遮罩 -->
        <div v-if="hrefing" class="zz"></div>
    </div>
 </transition>
</template>

<script>
    import btn from '../list/btn';
    export default {
        data() {
            return {
                apiPath : {
                    index : '/api/platform/index',
                    hksm : '',  //还款说明
                    union_login : '/api/union/login',
                    getHksm : '/api/enhance/produces/detaildesc',
                },
                hrefing : false,
                listData : [],
                hksmData:[{'voKey':'','voValue':''}],
                platformNo : this.$route.params.id
                // hksm : {
                //     type : '还款方式字段',
                //     repayment : '提前还款字段',
                //     overduePolicy : '逾期政策字段'
                // }
            }
        },
        props : {
            incompetenceConfig : {
                type : Object,
                default : _=>{
                    return {
                        //是否显示资质不符
                        isZzbf : false,
                        //是否显示还款说明
                        isHksm : false,
                        //是否显示综合费用
                        isZhfy : false
                    }
                }
            },
            pfno:'',
            hksm : {},            
            status : ''
        },
        components : {
            btn
        },
        created() {
            this.getList();
            this.getHksm();
            console.log()
        },
        methods : {
            off(param) {
                if(param == 'goback') {
                    this.$router.back(-1);  
                } else {
                    this.$emit('offIncompetence');
                }
            },
            //获取还款说明接口
            getHksm(){
                let _this = this;
                let data = {
                    platformNo:this.pfno||''
                };
                this.$ajax.post(this.apiPath.getHksm,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(0,data)
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        _this.hksmData = resData.result.list;
                    }
                })
            },
            //获取列表
            getList() {
                let _this = this;                     
                let data = {
                   pageNum : 1,
                   type : '-1'
                };
                this.$ajax.post(this.apiPath.index,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(0,data)
                }).then(res=>{
                    let result = res.data; 
                    if(result.status == 0) { 
                        //首页只展示十条数据，不用分页 
                        //_this.totalPage = result.result.pageEntity.totalPage;
                        let list = result.result.list;
                        let id = this.platformNo;  //平台编号
                        for(let i=0; i<list.length; i++) {
                            if(list[i].platformNo == id) {
                                list.splice(i,1);
                                break;
                            }
                        }
                        _this.listData = list.splice(0,3);
                        // _this.listData = result.result.list.splice(0,3);
                        console.log(this.listData);
                    }
               });
            },
            //跳转到第三方平台
            linkTo(item) {
                console.log(item);
                this.Base.interactiveWithApp('openNewWindow',{
                    url : item.productURL, title : item.platformName, startColor:"#6A5CF6",endColor:"#8BE2F1"
                }).then(data=>{
                    if(data == 'wap') {
                        console.log('openNewWindow','wap');
                        this.Base.setIframePageInfo(this,{ url : item.productURL, title : item.platformName });
                    } else {
                        console.log('openNewWindow',data);
                    }
                });
            },
            offWrap(e) {
                if(this.status == 'VF00001') {
                    return;
                }
                if(e.target.getAttribute('class') == 'wrap pof') {
                    this.off();
                }
            },
            setHrefing() {
                setTimeout(_=>{
                    this.hrefing = false; 
                },200);
            },
            getPv(item) {
                if(this.hrefing) return;
                this.hrefing = true;
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
                console.log(data);
                _this.$ajax.post(_this.apiPath.union_login,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    res = res.data;
                    _this.setHrefing(); 
                    if(res.status == 0) {
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
                                _this.$router.push({ name : 'PlatformDetail', params : { id : item.platformNo } });
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
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:100%;
        top:0;
        left:0;
        background:rgba(0,0,0,.45);
        z-index:100;
        display:flex;
        align-items:center;
        justify-content:center;
        //资质不符
        .zzbf{
            width:5.4rem;
            padding:.3rem;
            background:#fff;
            border-radius:.1rem;
            .title{
                border-bottom:1px solid #E6E6E6;
                line-height:.4rem;
                padding-left:.3rem;
                padding-top:.25rem;
                padding-bottom:.31rem;
                font-size:.3rem;
            }
            .list{
                ul{
                    li{
                        padding:.3rem;
                        border-bottom:1px solid #E6E6E6;
                        display:flex;
                        align-items:center;
                        font-size:.26rem;
                        .td{
                            display:flex;
                            width:100%;
                            div:nth-child(1){
                                margin-right:auto;
                                padding-right:.15rem;
                                span{
                                    color:#F96376;
                                    font-size:.3rem;
                                    display:block;  
                                    padding-bottom:.12rem;
                                    line-height:.44rem;
                                    height:.44rem;
                                }
                            }
                            div:nth-child(2){
                                flex-shrink:0;
                                width:2.1rem;
                                dl{
                                    padding-bottom:.12rem; 
                                    dt{
                                        width:.44rem;
                                        height:.44rem;
                                        float:left;
                                        padding-right:.12rem;
                                    }
                                    dd{
                                        color:#3E475D;
                                        font-size:.3rem;
                                        line-height:.44rem;
                                        float:left;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .btn{
                padding-bottom:.05rem;
            }
        }
        //还款说明
        .hksm{
            width:4.8rem;
            background:#fff;
            border-radius:.1rem;
            padding:.3rem;
            .title{
                padding:.3rem;
                font-size:.32rem;
                border-bottom:1px solid #e6e6e6;
            }
            .list{
                ul{
                    padding:0 .3rem;
                    li{
                        padding-top:.3rem;
                        font-size:.26rem;
                        span{
                            font-size:.28rem;
                            color:#3E475D;
                            display:block;
                            padding-bottom:.1rem;
                        }
                    }
                }
            }
        }
        //综合费用
        .zhfy{
            width:4.8rem;
            background:#fff;
            border-radius:.1rem;
            padding:.3rem;
            .title{
                padding:.3rem;
                font-size:.32rem;
                border-bottom:1px solid #e6e6e6;
            }
            .list{
                ul{
                    li{
                        height:.77rem;
                        display:flex;
                        align-items:center;
                        border-bottom:1px solid #e6e6e6;
                        padding:0 .3rem;
                        span:nth-child(2){
                            color:#a8aab2;
                            margin-left:auto;
                        }
                    }
                }
            }
            .tips{
                line-height:.3rem;
                padding-top:.08rem;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .zz{position:fixed;width:100%;height:100%;top:0;left:0;z-index:100;}
</style>