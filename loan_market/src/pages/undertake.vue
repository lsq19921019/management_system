<!--
    create : 田鹏伟 2018-11-14
    desc : 第三方认证回跳页面
-->
<template>
    <div>
        <!-- 加载中 -->
        <loading :text="'加载中...'"></loading>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                apiPath : {
                    repay : '/api/modify/verify',    //去认证
                },
            }
        },
        created() {
            this.Base.interactiveWithApp('finishWindow',{}).then(data=>{
                if(data == 'wap') {
                    console.log('finishWindow','wap');
                } else {
                    console.log('finishWindow',data);
                }
            });
            this.handlerRequest();
        },
        methods: {
            handlerRequest() {
                console.log(this.$route);
                this.verify();
            },  
            verify(){                        
                let data = {
                    verifyType : this.$route.query.verifyType,
                    type : this.$route.query.type,
                    title : this.$route.query.title
                };
                this.$ajax.post(this.apiPath.repay,this.$qs.stringify(data),{
                    headers: this.Base.initAjaxHeader(1,data)
                }).then(data=>{                  
                    let res = data.data;  
                    setTimeout(() => {
                        this.$router.push({
                            name : 'PlatformDetail',
                            params : {
                                id : localStorage.getItem("pfNo")
                            },
                            query : {
                                offAppTitle : 'true'
                            }
                        });                        
                    }, 5000);                  
                }).catch(err=>{
                    setTimeout(() => {
                        this.$router.push({
                            name : 'PlatformDetail',
                            params : {
                                id : localStorage.getItem("pfNo")
                            },
                            query : {
                                offAppTitle : 'true'
                            }
                        });                        
                    }, 5000);  
                })                
            }          
        }
    }
</script>

<style scoped>

</style>