<template>
    <div class="detail">
        <div class="page_title">
            <p>我的消息</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <p class="title">{{ detail.title }}</p>
        <p class="time">{{ detail.time || '' }}</p>
        <div class="content" v-html="detail.content"></div>
    </div>
</template>

<script>
    export default {
        name : 'MsgDetail',
        data() {
            return {
                detail : {
                    title : '',
                    time : '',
                    content : ''
                },
                apiPath : {
                    //detail : '/api/message/mail_detail',
                    detail : '/api/sysNotice/detail',
                },
                id : this.$route.query.id,
            }
        },
        mounted() {            
            this.getDetail();
        },
        created() {
            // this.getDetail();
        },
        methods : {
            getDetail() {
                let _this = this;
                let data = {
                    id : _this.id
                };
                _this.$ajax.post(_this.apiPath.detail,_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(rs=>{
                    let res = rs.data;
                    if(res.status == 0) {
                        _this.detail.title = res.result.title;
                        _this.detail.content = res.result.content;
                        _this.detail.time = res.result.createTimeDesc;
                    } else {
                        _this.$msg({ content : result.msg });
                    }
                });
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    .detail{
        padding:.32rem;
        padding-top:1.6rem;
        .title{
            font-size:.32rem;
            padding-top:.1rem;
            line-height:1.2;
        }
        .time{
            color:#A8AAB2;
            padding-top:.15rem;
        }
        .content{
            padding-top:.34rem;
            color:#A8AAB2;
            font-size:.28rem;
            line-height:.38rem;
        }
    }
</style>