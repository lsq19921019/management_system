<template>
    <div class="agreement">  
        <div class="page_title">
            <p>服务协议</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>      
        <div class="content" v-html="agreement"></div>
        <!-- <a href="javascript:;" style="display:block;line-height:1rem;border:1px solid red;" @click="share">点我分享</a> -->
    </div>
</template>

<script>
    export default {
        name : 'Agreement',
        data() {
            return {
                apiPath : {
                    //agreement : '/api/help/detail'
                    agreement: '/api/sysTerm/detail'
                },
                agreement : '',
                // agreementType : this.$route.query.type
            }
        },
        created() {
            this.getAgreement();
        },
        methods: {
            share() {
                let data = {
                    status : 0,
                    msg : 'success',
                    result : {
                        title : '注册协议啊啊啊',
                        content : '小鸽注册协议内容',
                        url : location.href,
                        icon : 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg',
                        shareType : 'all'
                    }
                };
                this.Base.interactiveWithApp('jumpToSharing',data).then(data=>{
                    alert('data:'+data);
                });
            },
            getAgreement() {
                let _this = this;
                let data = { position : 2 };
                _this.$ajax.post(_this.apiPath.agreement,_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(0,data)
                }).then(res=>{
                    if(res.data.status == 0) {
                        _this.agreement = res.data.result.content;
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .agreement{
        .content{
            margin-top:1.4rem;
            padding:.2rem .3rem;
        }
    }
</style>