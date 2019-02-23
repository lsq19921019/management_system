<template>
    <div class="feedback">
        <div class="page_title">
            <p>意见反馈</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <loading v-if="isShowLoading" :text="'提交中...'"></loading>
        <div class="title">
            <input type="text" maxlength="50" @blur="save($event)" v-model="title" placeholder="请输入标题">
        </div> 
        <div class="content">
            <textarea maxlength="500" @blur="save($event)" v-model="content" placeholder="请输入建议详细描述" />
        </div>
        <a href="javascript:;" @click="send" class="sure tac dsb">确定</a>
    </div>
</template>

<script>
    export default {
        name : 'Feedback',
        data() {
            return {
                isShowLoading : false,
                apiPath : {
                    feedback : '/api/user/feedback'
                },
                title : '',
                content : '',
                clientVersion : '1.0',
                sourceCode : this.$route.params.sourceCode ? this.$route.params.sourceCode : ''
            }
        },
        created() {
            this.getResiterInfo();
        },
        mounted() {
            this.title = localStorage.getItem('feedbackTitle') ? localStorage.getItem('feedbackTitle') : '';
            this.content = localStorage.getItem('feedbackContent') ? localStorage.getItem('feedbackContent') : '';
        },
        methods : {
            send() {                           
                let _this = this;
                let title = this.title;
                let content = this.content;
                if(title.replace(/\s/g,'').length < 1) {
                    return this.$msg({ content : '请输入标题' });
                }
                if(content.replace(/\s/g,'').length < 1) {
                    return this.$msg({ content : '请输入意见内容' });
                } else if(content.length < 10) {
                    return this.$msg({ content : '至少输入10个字符' });
                }
                this.isShowLoading = true;
                let data = {
                    title : title,
                    content : content,
                    modules : '',
                    netType : '',
                    modules : '',
                    clientVersion : this.clientVersion,
                    deviceSystem : '',
                    deviceDpi : '',
                    deviceType : ''                    
                };
                _this.$ajax.post(_this.apiPath.feedback,_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    if(res.data.status == 0) {                      
                        localStorage.removeItem('feedbackTitle');
                        localStorage.removeItem('feedbackContent');
                        _this.$msg({ content : '提交成功' });
                        setTimeout(_=>{
                            this.$router.push({ name : 'My' });
                        },1800);
                    } else {
                        _this.$msg({ content : res.data.msg });
                    }
                    _this.isShowLoading = false;
                });
            },
            //保存内容到本地存储
            save(e) {
                let key = 'feedbackContent';
                if(e.target.nodeName == 'INPUT') key = 'feedbackTitle';
                localStorage.setItem(key,e.target.value);
            }
        },
        //从app获取sourceCode
        getResiterInfo() {
            let _this = this;
            _this.Base.interactiveWithApp('getCertifyInfo',{
                token : localStorage.getItem("_token"),
                certifyInfo : ['deviceInfo']
            }).then(data=>{
                if(data == 'wap') {
                    console.log('getCertifyInfo','wap');
                } else {
                    console.log('getCertifyInfo',data);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .feedback{
        .title{
            margin-top:1.56rem;
            background:#fff;
            padding:.2rem .3rem;
            font-size:.32rem;
            input{
                line-height:.6rem;
                width:100%;
                font-size:.32rem;
            }
        }
        .content{
            margin-top:.16rem;
            background:#fff;
            padding:.2rem .3rem;
            textarea{
                resize:none;
                height:2.2rem;
                line-height:.45rem;
                font-size:.32rem;
                width:100%;
            }
        }
        .sure{
            width:6.86rem;
            margin:auto;
            background:#527BEC;
            line-height:.9rem;
            border-radius:.45rem;
            font-size:.34rem;
            margin-top:.5rem;
            color:#fff;
        }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #ccc;}
　　input:-moz-placeholder, textarea:-moz-placeholder { color:#ccc;}
　　input::-moz-placeholder, textarea::-moz-placeholder { color:#ccc; }
　　input:-ms-input-placeholder, textarea:-ms-input-placeholder { color:#ccc; }
</style>