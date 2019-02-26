<template>
    <div class="order_item" :class="[{pd_basic:!renderData.is_check_fail},{pd_error:renderData.is_check_fail}]">
        <div class="oh row_top" @click="toDetail(renderData.orderNo)">
            <div class="fll oh">
                <div class="order_logo fll" :style="imgBack"></div>
                <div class="order_name fll">{{renderData.platformName}}</div>
            </div>
            <!-- <img src="/../../assets/my_arrow.png" alt=""> -->
            <div class="flr order_status" style="overflow:hidden;" :class="[{cred:renderData.is_check_fail},{cblue:!renderData.is_check_fail}]">
                {{renderData.statusTxet}}<img src="../../../assets/my_arrow.png" alt="" style="height:.22rem;width:0.12rem;padding:.07rem 0;padding-left:.16rem">
            </div>
        </div>
        <!-- 显示还款进度 -->
        <div class="show_period" v-if="renderData.showPeriod == 1">{{ renderData.repayPeriod }}</div>
        <div class="row_middle" :class="{bob:renderData.is_check_fail}" @click="toDetail(renderData.orderNo)">
            <div class="fll borrow_amount"><p :class=" {'lh' : renderData.showPeriod == 1} ">{{renderData.borrowAmount}}</p></div>
            <div class="flr cgrey borrow_time"><p>{{renderData.time}}</p></div>
        </div>
        <div class="oh row_bottom" v-if="renderData.is_check_fail">
            <div class="flr reloan_btn cblack" @click="toReloanPage">
                重新借款
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            order_status : this.$route.params.orderStatus,
            imgBack:{
                backgroundImage:''
            }
        }
    },
    props:{
        renderData:{},
        tab_status:'',
    },
    created(){
        this.imgBack.backgroundImage = 'url('+this.renderData.platformLoge+')';
    },
    methods:{
        toReloanPage(){
            this.$router.push({name:'Index'});
            // window.location.href = '/index';
        },
        toDetail(orderNo){
            localStorage.removeItem('tabStatus');
            this.$router.push({name:'OrderDetail',params:{orderNo:orderNo,tab:this.tab_status}});
            // window.location.href = '/order/detail/'+orderNo+'/'+this.tab_status;
        }
    }
}
</script>
<style lang="scss" scoped>
    .pd_basic{
        padding: .30rem .3rem;
    }
    .pd_error{
        padding: .30rem .3rem;
        padding-bottom: 0rem;
    }
    .order_item{
                background-color: #fff;
                margin-bottom: .15rem;
                .row_top{
                    padding: .10rem 0;
                    font-size: .3rem;
                    .order_logo{
                        background: url('../../../assets/order/test.png');
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: .36rem;
                        width: .36rem;
                        border-radius: .18rem;
                        display: inline-block;
                    }
                    .order_name{
                        display: inline-block;
                        line-height: .36rem;
                        margin-left: .18rem;
                        font-size: .32rem;
                    }
                    .order_status{
                        line-height: .36rem;
                        font-size: .28rem;
                    }
                    .borrow_amount{
                        line-height: .36rem;
                        font-size: .24rem;
                    }
                    .borrow_time{
                        line-height: .36rem;
                        font-size: .24rem;
                    }
                }
                .row_middle{
                    padding: .1rem 0 .2rem 0;
                    .lh{
                        position:relative;
                        top:-.25rem;
                        z-index:5;
                    }
                }
                .bob{
                    border-bottom: 1px solid #f5f5f5;
                }
                .row_bottom{
                    padding: .14rem 0;
                    .reloan_btn{
                        // height: .5rem;
                        // line-height: .5rem;
                        // padding: .15rem;
                        padding: .15rem 0;
                        height: .54rem;
                        box-sizing: border-box;
                        line-height: .24rem;
                        font-size: .24rem;
                        border: 1px solid #ccc;
                        border-radius: .3rem;
                        width: 1.5rem;
                        text-align: center;
                    }
                }
                .show_period{
                    text-align:right;
                    color:#A8AAB2;
                    font-size:.24rem;
                }
            }
            
        .oh{
            overflow: hidden;
        }
        .fll{
            float: left;
        }
        .flr{
            float: right;
        }
        .cred{
            color: red;
        }
        .cblue{
            color: #527BEC;
        }
        .cgrey{
            color: #cccccc;
        }
        .cblack{
            color: #555555;
        }
</style>


