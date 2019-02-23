<template>
    <div>
        <loading v-if="isShowLoading" :text="'处理中...'"></loading>
        <div class="progressbar" v-if="showTime">
            <dl>
                <dt>
                    <span>{{ text }}</span>
                    <progress-bar :value="100" 
                    :options="{
                        pathColors: ['#ddd','#527BEC'],
                        radius:radius,
                        circleWidth:circleWidth,
                        duration : 5000,
                        text:'',
                        textColor : '#527BEC'
                    }"></progress-bar>
                </dt><dd></dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import progressBar from 'svg-progress-bar';
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
                    sign : '/api/modify/sign',  //去签约
                    repay : '/api/modify/repay',    //去还款
                },
                radius : 0,
                circleWidth : 0,
                text : 5,
                showTime : false
            }
        },
        components : {
            progressBar
        },
        mounted() {
        },
        created() {            
            this.radius = this.Base.calcPx(2)/2;
            this.circleWidth = this.Base.calcPx(0.15);  
            this.handlerRequest();
        },
        methods : {
            handlerRequest() {
                console.log(location.href);
                console.log(this.$route.params.type);
                let type = this.type;
                this[type]();
            },
            handlerTime() {
                this.showTime = true;
                this.isShowLoading = false;
                let st = setInterval(_=>{
                    if(this.text == 1) {
                        clearInterval(st);
                    }
                    this.text --;
                },1000);
            },
            //去绑卡
            bindCard() {
                let pathname = localStorage.getItem('distributeConfigPath');
                if(!pathname || pathname.indexOf('/') < 0) {
                    this.isShowLoading = false;
                    this.$msg({
                        content : '未查询到订单号'
                    });
                }                
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
                    this.handlerTime(); 
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
                }).catch(err=>{
                    this.handlerTime();
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
                })
            },
            //确认用款
            auth() {
                console.log('确认用款');
                let pathname = localStorage.getItem('distributeConfigPath');
                if(!pathname || pathname.indexOf('/') < 0) {
                    this.isShowLoading = false;
                    this.$msg({
                        content : '未查询到订单号'
                    });
                } 
                let orderNo = pathname.split('/')[3];  //订单编号在数组第二位3
                let data = {
                    type : this.$route.query.type,
                    title : this.$route.query.title,
                    orderSn : orderNo
                };
                this.$ajax.post(this.apiPath.auth,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{
                    this.handlerTime();
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
                }).catch(err=>{
                    this.handlerTime();
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
                })
            },
            //去签约
            sign() {
                console.log('去签约');
                let pathname = localStorage.getItem('distributeConfigPath');
                if(!pathname || pathname.indexOf('/') < 0) {
                    this.isShowLoading = false;
                    this.$msg({
                        content : '未查询到订单号'
                    });
                } 
                let orderNo = pathname.split('/')[3];  //订单编号在数组第二位3
                let data = {
                    result: this.$route.query.result || '',
                    orderSn : orderNo
                };
                this.$ajax.post(this.apiPath.sign,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{
                    this.handlerTime();
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
                }).catch(err=>{
                    this.handlerTime();
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
                })
            },
            //去还款
            repay() {
                console.log('去还款');
                let pathname = localStorage.getItem('distributeConfigPath');
                if(!pathname || pathname.indexOf('/') < 0) {
                    this.isShowLoading = false;
                    this.$msg({
                        content : '未查询到订单号'
                    });
                } 
                let orderNo = pathname.split('/')[3];  //订单编号在数组第二位3
                let data = {
                    orderSn: this.$route.query.order_sn || '',
                    repayResult : this.$route.query.repay_result || '',
                    pfNo: localStorage.getItem('pfNo')
                };
                this.$ajax.post(this.apiPath.repay,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{
                    this.handlerTime();
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
                }).catch(err=>{
                    this.handlerTime();
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
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .progressbar{
        position:fixed;
        top:0;
        height:100%;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        dl{
            width:2rem;
            dt{
                position:relative;
                span{
                    position:absolute;
                    display:block;
                    color:#527BEC;
                    font-size:.4rem;
                    width:100%;
                    text-align:center;
                    line-height:2rem;
                }
            }
        }
    }
</style>