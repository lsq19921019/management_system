<!--
    create:luofeifei 10/16
    desc:提现进度
-->
<template>
    <div class="withplay">
        <div class="content">
            <div class="withplay_box">
                <div class="top">
                    <p class="money" :class="playlist.status=='取消提现'||playlist.status=='提现失败'?'c545454':'money'">{{ playlist.amountStr }}</p>
                    <p class="info">{{ playlist.status }}</p>
                </div>
                <div class="withlist">
                    <div class="withitem backitem" v-show="playlist.desc=='已全额退款'">
                        <span class="name">退款记录</span>
                        <span class="key backmoney">
                            <span :style="'color:#ff5637'">已退款￥{{ playlist.amount }}</span>
                            <span class="applytime">{{ playlist.applytime }}</span>
                        </span>
                    </div>
                    <div v-show="playlist.desc=='已全额退款'" class="withline" :style="'height:0.01rem;'"></div>    
                    <div class="withitem">
                        <span class="name">类型</span>
                        <span class="key">提现</span>
                    </div>
                    <div class="withitem withflow">
                        <span class="name">进度</span>
                        <div class="flow">
                            <!-- 状态一 -->
                            <div class="flow_item">
                                <div class="left">
                                    <div class="icon">
                                        <i class="iconfont" :class="playlist.data[0].showState==1?'c5637 icon-right-1':'cccc icon-dengdai'"></i>
                                        <span class="flowline" :class="playlist.data[1].showState==1?'bg5637':'bgccc'"></span>
                                    </div>
                                    <span class="flow_info c5637">{{ playlist.data[0].status }}</span>
                                </div>                            
                                <span class="right c999">{{ playlist.data[0].time }}</span>                            
                            </div>
                            <!-- 状态二 -->
                            <div class="flow_item">
                                <div class="left">
                                    <div class="icon">
                                        <i class="iconfont" :class="playlist.data[1].showState==1?'c5637 icon-right-1 '+offwithicon:'cccc icon-dengdai'"></i>
                                        <span v-if="isoffwith" class="flowline" :class="playlist.data[2].showState==1?'bg5637':'bgccc'"></span>                                    
                                    </div>
                                    <span class="flow_info" :class="playlist.data[1].showState==1?'c5637':'c999'">{{ playlist.data[1].status }}</span>
                                </div>                            
                                <span class="right c999">{{ playlist.data[1].time }}</span>                            
                            </div>
                            <!-- 状态三 -->
                            <div class="flow_item" v-if="isoffwith">
                                <div class="left">
                                    <div class="icon">
                                        <i class="iconfont" :class="playlist.data[2].showState==1?'c5637 icon-right-1 '+offwithicon:'cccc icon-dengdai'"></i>
                                        <span></span>
                                    </div>
                                    <span class="flow_info" :class="playlist.data[2].showState==1?'c5637':'c999'">{{ playlist.data[2].status }}</span>
                                </div>                           
                                <span class="right c999">{{ playlist.data[2].time }}</span>                            
                            </div>                                                
                        </div>
                    </div>
                    <div class="withitem">
                        <span class="name">提现到</span>
                        <span class="key">{{ playlist.cardNo }}</span>
                    </div>
                    <div class="withitem">
                        <span class="name">手续费</span>
                        <span class="key">{{ playlist.poundage }}</span>
                    </div>  
                    <div class="withitem">
                        <span class="name">到账金额</span>
                        <span class="key">{{ playlist.arriveAmount }}</span>
                    </div>
                    <div class="withline"></div>
                    <div class="withitem pt48">
                        <span class="name">时间</span>
                        <span class="key">{{ playlist.applytime }}</span>
                    </div>
                    <div class="withitem">
                        <span class="name">流水号</span>
                        <span class="key">{{ playlist.orderId }}</span>
                    </div>                                                                              
                </div>            
            </div>
        </div>
        <div class="bom">如有疑问？请<a :href="'tel:'+userCenterData.hotline">联系客服</a></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userCenterData: {},
            playlist:[],
            isoffwith:true,
            offwithicon:''
        }
    },
    created(){
        this.postServers();
        this.playlist = JSON.parse(localStorage.getItem("withplay"));
        console.log(this.playlist)
        if(this.playlist.status == '取消提现'||this.playlist.status == '提现失败'){
            this.isoffwith = false
            this.offwithicon = 'icon-shibai'
        }
    },
    methods:{
        // 获取客服电话
        postServers: function() {
            var thatData = this
            var data = {}
            this.$http.post('/api/user/index', this.$qs.stringify(data), {
                headers: base.ajaxHeadersWithToken(data)
            })
            .then(function(response) {
                let resData = response.data
                if (resData.status == 0) {
                    thatData.userCenterData = resData.result
                } else {
                    mui.toast(resData.msg, { duration: 1000, type: 'div' })                    
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        },        
    }
}
</script>

<style lang="scss" scoped>
@import "../../../style/font/iconfont.css";
*{margin: 0;padding: 0;}
.withplay{
    .content{
        background: #fff;
    }
    .withplay_box{
        margin: 0 .3rem;
    }
    .top{
        padding: .62rem 0;
        text-align: center;
        .money{
            font-size: .6rem;
            color: #ff5637;
            line-height: 1;
        }
        .info{
            font-size: .28rem;
            color: #aaa;
            line-height: 1;
            margin-top: .3rem;
        }
    }
    .withlist{
        padding-bottom: .24rem;
        .withitem{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: .48rem 0;
            .name{
                font-size:.28rem;
                color:rgba(153,153,153,1);
                line-height:1;
            }
            .key{
                font-size:.28rem;
                font-weight:400;
                color:rgba(84,84,84,1);
                line-height:1;
                max-width: 5rem;
                word-wrap: break-word;
                text-align: right;               
            }
            .backmoney{
                display: flex;
                flex-direction: column;
                line-height: 1;
                .applytime{
                    margin-top: .2rem;
                    color: #999;
                    font-size: .26rem;
                }
            }
            .flow{
                .flow_item{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left{
                        display: flex;
                        .icon{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                        .flowline{
                            display: inline-block;
                            width: 0.04rem;
                            height: .52rem;
                            background:rgba(204,204,204,1);
                            margin: -2px 0;
                        }
                    }
                    .flow_info{
                        margin-left: .28rem;
                    }
                    .right{
                        margin-left: 1rem;
                    }                    
                }
            }
        }
        .withflow{
            align-items: flex-start;
        }
    }
    .withline{
        position: relative;
        &::before{
        content: '';
        position: absolute;
        width: 200%;
        height: 100%;
        border-bottom: 1px solid #ddd;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        }         
    }
    .pt48{padding-top: .48rem!important}
    .c999{color: #999999;}
    .cccc{color: #ccc;}
    .c5637{color: #ff5637}
    .bg999{background: #999999!important}
    .bgccc{background: #ccc!important}
    .bg5637{background: #ff5637!important}
}
.bom{
    font-size: .28rem;
    color: #aaa;
    // position: absolute;
    // bottom: .52rem;
    padding: .54rem 0;
    text-align: center;
    a{
        color: #ff9c1c
    }
}
.c545454{color: #545454!important}
</style>
