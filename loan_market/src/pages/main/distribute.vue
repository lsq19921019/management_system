<template>
    <div>
        <loading v-if="isShowLoading" :text="'处理中...'"></loading>
    </div>
</template>

<script>
    export default {
        name : 'Distribute',
        data() {
            return {
                isShowLoading : true,
                type : this.$route.params.type,  //业务类型
                status : '',
                apiPath : {
                    bindCard : '/api/modify/bindCard',  //订单详情-绑卡
                    auth : '/api/modify/auth',  //确认用款
                }
            }
        },
        created() {
            this.handlerRequest();
            //关闭app头部
            // if(this.$route.query.offAppTitle) {
            //     this.Base.interactiveWithApp('finishWindow',{}).then(data=>{
            //         if(data == 'wap') {
            //             console.log('finishWindow','wap');
            //             this.handlerRequest();
            //         } else {
            //             console.log('finishWindow',data);
            //             this.handlerRequest();
            //         }
            //     });
            // } else {
            //     this.handlerRequest();
            // }
        },
        methods : {
            handlerRequest() {
                console.log(location.href);
                console.log(this.$route.params.type);
                let type = this.type;
                this[type]();
            },
            //去绑卡
            bindCard() {
                console.log('去绑卡');
                let pathname = localStorage.getItem('distributeConfigPath');
                let orderNo = pathname.split('/')[3];  //订单编号在数组第二位3
                let data = {
                    type : this.type,
                    status : this.$route.query.bind_status,
                    orderSn : orderNo
                };
                this.$ajax.post(this.apiPath.bindCard,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{
                    let res = data.data;
                    
                    this.$router.push({
                        name : 'OrderDetail',
                        params : {
                            orderNo : orderNo,
                            tab : pathname.split('/')[4]
                        },
                        query : {
                            offAppTitle : 'true'
                        }
                    });
                    //执行成功
                    // if(res.status == 0) {
                    //     this.$router.push({
                    //         name : 'OrderDetail',
                    //         params : {
                    //             orderNo : orderNo,
                    //             tab : pathname.split('/')[4]
                    //         },
                    //         query : {
                    //             offAppTitle : 'true'
                    //         }
                    //     });
                    // }
                })
            },
            //确认用款
            auth() {
                console.log('确认用款');
                let pathname = localStorage.getItem('distributeConfigPath');
                let orderNo = pathname.split('/')[3];  //订单编号在数组第二位3
                let data = {
                    type : this.$route.query.type,
                    title : this.$route.query.title,
                    orderSn : orderNo
                };
                this.$ajax.post(this.apiPath.auth,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{
                    let res = data.data;
                    this.$router.push({
                        name : 'OrderDetail',
                        params : {
                            orderNo : orderNo,
                            tab : pathname.split('/')[4]
                        },
                        query : {
                            offAppTitle : 'true'
                        }
                    });
                    // //执行成功
                    // if(res.status == 0) {
                    //     this.$router.push({
                    //         name : 'OrderDetail',
                    //         params : {
                    //             orderNo : orderNo,
                    //             tab : pathname.split('/')[4]
                    //         },
                    //         query : {
                    //             offAppTitle : 'true'
                    //         }
                    //     });
                    // } else {

                    // }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>