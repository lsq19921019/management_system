<template>
    <div>
        <loading v-if="isShowLoading" :text="'处理中...'"></loading>
        <!-- <button class="btn" @click="clone" style="width: 100%;height: 50px;">关闭</button> -->
    </div>
</template>

<script>
export default {
    name: 'DistributeApp',
    data() {
        return {
            isShowLoading : true,
            status : '',
            apiPath : {
                bindCard : '/api/modify/bindCard',  //订单详情-绑卡
                auth : '/api/modify/auth',  //确认用款
                sign : '/api/modify/sign',  //去签约
                repay : '/api/modify/repay',//去还款
            }
        }
    },
    components : {
        
    },
    mounted() {
    },
    created() {
        this.handlerRequest();
    },
    methods:{
        clone(){
            this.Base.interactiveWithApp_ttj('onClose',{}).then(data=>{
                if(data == 'wap') {
                    console.log('selectContact','wap');
                } else {
                    console.log('selectContact','app');
                }
            });    
        },
        handlerRequest() {
            let type = this.$route.params.type;
            this.getData(type)
        }, 
        getData(type) {
            let url=this.apiPath[type];
            //去绑卡
            let data = {
                type : type,
                status : this.$route.query.bind_status,
                orderSn : this.$route.query.order_sn  //订单编号
            };
            //去确认
            let data2 = {
                type : this.$route.query.type,
                title : this.$route.query.title,
                orderSn : this.$route.query.order_sn
            }; 
            //去签约
            let data3 = {
                result: this.$route.query.result || '',
                orderSn : this.$route.query.order_sn
            }; 
            //去还款
            let data4 = {
                orderSn: this.$route.query.order_sn || '',
                repayResult : this.$route.query.repay_result || '',
                pfNo: this.$route.query.orderNo || ''
            };
            let parData = '';
            switch (type) {
                case 'bindCard':
                    parData = data;
                    break;
                case 'auth':
                    parData = data2;
                    break;
                case 'sign':
                    parData = data3;
                    break;
                case 'repay':
                    parData = data4;
                    break;                                                    
                default:
                    break;
            }
            this.$ajax.post(url,this.$qs.stringify(parData),{
                headers: this.Base.initAjaxHeader(1,data)
            }).then(data=>{
                let res = data.data;
                setTimeout(() => {
                    this.Base.interactiveWithApp_ttj('onClose',{}).then(data=>{
                        if(data == 'wap') {
                            console.log('selectContact','wap');
                        } else {
                            console.log('selectContact','app');
                        }
                    });                     
                }, 5000);   
            }).catch(err=>{
                setTimeout(() => {
                    this.Base.interactiveWithApp_ttj('onClose',{}).then(data=>{
                        if(data == 'wap') {
                            console.log('selectContact','wap');
                        } else {
                            console.log('selectContact','app');
                        }
                    });                     
                }, 5000);  
            })
        }                
    }
}
</script>

<style lang="scss" scoped>
.btn{
    background: red;
    color: #fff;
    position: absolute;
    bottom: 0;
}
</style>
