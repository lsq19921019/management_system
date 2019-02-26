<!--
    create:luofeifie 10-17
    desc:充值详情
-->
<template>
    <div class="rechargeDetail">
        <div class="rec_top">
            <p class="money" :class="dataDetail.rechargeResultCN=='充值成功'?'c5637':''">{{ dataDetail.amount }}</p>
            <p class="res">{{ dataDetail.rechargeResultCN }}</p>
        </div>
        <div class="rec_list">
            <div class="rec_list_item" v-show="dataDetail.rechargeTypeName!='网银支付'">
                <span class="key">付款方式</span>
                <span class="val">{{ dataDetail.cardNo }}</span>
            </div>
            <div class="rec_list_item boder">
                <span class="key">充值说明</span>
                <span class="val">{{ dataDetail.rechargeTypeName }}</span>
            </div>
            <div class="rec_list_item">
                <span class="key">时间</span>
                <span class="val">{{ dataDetail.date }}</span>
            </div>
            <div class="rec_list_item">
                <span class="key">流水号</span>
                <span class="val">{{ dataDetail.payNo }}</span>
            </div>
        </div>
        <div class="rec_bom">如有疑问？请<a :href="'tel:'+userCenterData.hotline">联系客服</a></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userCenterData: {},
            dataDetail:[]
        }
    },
    created(){
        this.recDetail()
        this.postServers()
    },
    methods:{
        //  详情
        recDetail(){
            let _this = this;
            let data = {
                rechargeId:this.$route.query.id
            };
            this.$http.post("/api/assets/rechargeRecordDetail",this.$qs.stringify(data),{
                headers: base.ajaxHeadersWithToken(data)
            })
            .then(function(res){
                if(res.status == '200'){
                    _this.dataDetail = res.data.result.data;
                }
            })            
        },
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
.rechargeDetail{
    background: #FFF;
    .rec_top{
        height: 2.29rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .money{
            font-size:.6rem;
            color:rgba(51,51,51,1);
            line-height:1;            
        }
        .res{
            font-size:.28rem;
            color:rgba(170,170,170,1);
            line-height:1;
            margin-top: .3rem;          
        }
    }
    .rec_list{
        margin: 0 .3rem;
        .rec_list_item{
            display: flex;
            justify-content: space-between;
            padding: .32rem 0;
            .key{
                color: #999;
                font-size: .28rem;
                line-height: 1;
            }
            .val{
               color: #545454;
               font-size: .28rem;
               line-height: 1;
               max-width: 5rem;
               word-wrap: break-word;
               text-align: right; 
            }
        }
        .boder{
            position: relative;
            &::after{
                content: "";
                bottom: 0;
                left: 0;
                position: absolute;
                width: 200%;
                height: 1px;
                border-bottom: 1px solid #EDE9E9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scale(0.5, 0.5);
                transform: scale(0.5, 0.5);
                -webkit-box-sizing: border-box;
                box-sizing: border-box;            
            }            
        }
    }
    .rec_bom{
        color: #AAAAAA;
        font-size: .28rem;
        position: absolute;
        bottom: .52rem;
        left: 2.36rem;
        a{
            color: #FF9C1C;
        }
    }  
}
.c5637{color: #ff5637!important}
</style>
