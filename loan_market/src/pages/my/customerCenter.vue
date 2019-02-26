<template>
    <div>
        <div class="page_title">
            <p>客服中心</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="customer_center">
            <div class="top por">
                <dl class="poa">
                    <dt><img src="../../assets/my/service_tx.png" alt=""></dt><dd>专属客服</dd>
                </dl>
            </div>
            <div class="icos c">
                <!-- <router-link class="fl" :to="{name : 'Service'}">在线咨询</router-link> -->
                <router-link class="fl" :to="{name : 'Pubno'}">关注公众号</router-link>
                <a href="tel:0755-26604482" class="fr">客服热线</a>
            </div>
            <div class="time tac">
                <p>服务时间</p>
                电话：工作日9：00-18：00<br>在线：工作日9：00-18：00，休息日可留言<br>节假日以公告为准，12：00-13：30为午休时间
            </div>
            <!-- <router-link :to="{ name : 'Feedback' }" class="dsb btn tac">意见反馈</router-link> -->
            <a href="javascript:;" @click="getUserInfo" class="dsb btn tac">意见反馈</a>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'CustomerCenter',
        data() {
            return {
                apiPath : {
                    user : '/api/user/index'
                }
            }
        },
        created() {
        },
        methods : {
            goFeedback() {
                this.$router.push({ name : 'Feedback' });
            },
            getUserInfo() {
                if(!localStorage.getItem('_token')) {
                    this.$router.push({ name : 'Login' });
                    return;
                }
                let _this = this;
                return new Promise((reslove,reject)=>{
                    this.$ajax.post(_this.apiPath.user,_this.$qs.stringify({}),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    }).then(res=>{
                        let result = res.data;
                        if(result.status == 0) {  
                            _this.$router.push({ name : 'Feedback' });
                        } else if(result.status == '-9') {
                            _this.$router.push({ name : 'Feedback' });
                        } else if(result.status == '-100') {
                            _this.$msg({ content : result.msg });
                            setTimeout(_=>{
                                _this.$router.push({ name : 'Login' });
                            },1800);
                        } else {
                            _this.$msg({ content : result.msg });
                        }                
                    });
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .page_title{
        background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
    }
    .customer_center{
        color:#3E475D;
        .top{
            height:1.82rem;
            margin-top:1.4rem;
            background:linear-gradient(90deg,rgba(106,92,246,1),rgba(139,226,241,1));
            dl{
               width:5rem;
               bottom:-.6rem;
               left:.3rem;
               dt{
                   width:1.64rem;
                   float:left;
               } 
               dd{
                   line-height:1.4rem;
                   color:#fff;
                   font-size:.32rem;
                   padding-left:.26rem;
                   float:left;
               }
            }
        }
        .icos{
            margin-top:1.64rem;
            padding:0 1.42rem;
            a{
                text-align:center;
                color:#3E475D;
                font-size:.32rem;
                padding-top:1.33rem;
            }
            a:nth-child(1){
                background:url(../../assets/my/ico_udesk.png) top center no-repeat;
                background-size:1.1rem 1.1rem;
            }
            a:nth-child(2){
                background:url(../../assets/my/ico_phone.png) top center no-repeat;
                background-size:1.1rem 1.1rem;
            }
        }
        .time{
            padding-top:1.09rem;
            color:#A8AAB2;
            font-size:.24rem;
            line-height:.34rem;
            p{
                font-size:.28rem;
                color:#3E475D;
                padding-bottom:.14rem;
            }
        }
        .btn{
            width:6.86rem;
            color:#fff;
            line-height:.9rem;
            border-radius:.45rem;
            font-size:.34rem;
            background:rgba(82,123,236,1);
            margin:auto;
            margin-top:.8rem;
        }
    }
</style>