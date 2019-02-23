<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" @click="toMyPage" class="goback"></a>
        </div> 
        <div class="tab_container">
            <div class='of_box'>
                <div class="tab_item" :class="{tab_active:tab_status===0}" @click="switchTab(0)">全部</div>
                <div class="tab_item" :class="{tab_active:tab_status===1}" @click="switchTab(1)">待补充</div>
                <div class="tab_item" :class="{tab_active:tab_status===2}" @click="switchTab(2)">待审核</div>
                <div class="tab_item" :class="{tab_active:tab_status===3}" @click="switchTab(3)">待绑卡</div>
                <div class="tab_item" :class="{tab_active:tab_status===4}" @click="switchTab(4)">待确认</div>
                <div class="tab_item" :class="{tab_active:tab_status===8}" @click="switchTab(8)">待还款</div>
                <!-- <div class="tab_item" :class="{tab_active:tab_status===9}" @click="switchTab(9)">审核失败</div> -->
             </div>
        </div>
        <div class="no_order_container" v-if="show_no_order">
            <div class="no_order_img"></div>
            <div class="no_order_info">您还没有相关订单哦<br>快去申请借款吧</div>
            <div class="apply_loan_btn" @click="toIndex">
                申请借款
            </div>
        </div>
        <div class="order_list_container" v-if="!show_no_order">
            <!-- <div class="order_item">
                <div class="oh row_top">
                    <div class="fll oh">
                        <div class="order_logo fll"></div>
                        <div class="order_name fll">驻马店小额贷</div>
                    </div>
                    <div class="flr order_status cred">
                        审核失败
                    </div>
                </div>
                <div class="oh row_middle">
                    <div class="fll">借款1000元</div>
                    <div class="flr cgrey"><span>2018-10-13</span>&nbsp;<span>15:15:15</span></div>
                </div>
                <div class="oh row_bottom">
                    <div class="flr reloan_btn cblack">
                        重新借款
                    </div>
                </div>
            </div> -->
            <div v-for="(render_data,index) in orderList" :key="index">
                <order-item :renderData='render_data' :tab_status='tab_status'></order-item>
            </div>
        </div>
    </div>
</template>

<script>
    import orderItem from './components/order_item';
    import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                name : 'OrderList',
                tab_status:parseInt(this.$route.params.orderStatus),
                show_no_order:true,
                orderList:[],
                // showEmptyPage:false
            }
        },
        created(){
            // alert(1111111);
            // this.getListTabStatus();
            this.getPageData(this.tab_status);
        },
        mounted(){
        },
        components:{
            orderItem

        },
        methods:{
            toMyPage(){
                this.$router.push({name:'My'});
            },
            // getListTabStatus(){
            //     if(localStorage.getItem('orderListStatus')){
            //         this.tab_status = localStorage.getItem('orderListStatus');
            //     }
            // },
            toMyPage(){
                this.$router.push({
                    name:'My'
                });
            },
            toIndex(){
                this.$router.push({name:'Index'});
                // window.location.href='/index';
            },
            getPageData(tab_status){
                let _this = this;
                let data = {
                    listStatus:tab_status
                };
                this.$ajax.post('/api/order/orderList',this.$qs.stringify(data),{headers: this.Base.initAjaxHeader(1,data)}).then(res=>{
                    if(res.data.status==='0'){
                        if(res.data.result.length>0){
                            _this.show_no_order=false;
                            _this.orderList = res.data.result;
                            // console.log(_this.orderList);
                            (_this.orderList).forEach((element,index)=>{
                                    //判断审核状态是否审核失败;
                                if(element.statusTxet==='审核失败'){
                                    _this.orderList[index].is_check_fail = true;
                                }else{
                                    _this.orderList[index].is_check_fail = false;
                                }
                            });
                            console.log(_this.orderList);
                        }else{
                            _this.show_no_order=true;
                        }
                    }else{
                        _this.show_no_order=true;
                    }
                });
            },
            switchTab(status){
                this.tab_status = status;
                let _this = this;
                this.$router.push({name:'OrderList',params:{orderStatus:status}});
                _this.getPageData(status);
                // window.location.href='/order/list/'+status;
                // setTimeout(_=>{
                //     _this.getPageData(status);
                // },300);
            },
            
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        .no_order_container{
            margin-top: 2rem;
            .no_order_img{
                height: 2rem;
                width: 2rem;
                background: url('../../assets/order/no_order.png');
                background-size: contain;
                margin: 0 auto;
            }
            .apply_loan_btn{
                width: 1.8rem;
                margin: 0 auto;
                text-align: center;
                padding: .3rem;
                color: #fff;
                background-color: #527BEC;
                font-size: .3rem;
                line-height: .3rem;
                border-radius: .5rem;
                margin-top: .4rem;
            }
            .no_order_info{
                text-align: center;
                width: 3rem;
                margin: 0 auto;
                margin-top: .2rem;
                color: #CCCCCC;
            }
        }
        .tab_container{
            // display:flex;
            // width:100%;
            margin-top:1.4rem;
            width: 100%;
            height:1rem;
            background-color:#fff;
            text-align:center;
            overflow-x: auto;
            overflow-y: hidden;
            border-bottom: 1px solid #f5f5f5;
            .of_box{
                width: 9rem;
                .tab_item{
                    // flex:1;
                    width:1.5rem;height:1rem;
                    float: left;
                    box-sizing: border-box;
                    line-height: 1rem;
                    font-size: .3rem;
                }
            }
        }
        // .order_list_container{
            
        // }
        .tab_active{
            border-bottom: 2px solid #527BEC;
            color: #527BEC;
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
    }
</style>