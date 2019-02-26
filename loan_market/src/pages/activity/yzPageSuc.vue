<!--
    create:luofeifei 2018/11/20
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img"></div>
        <div class="main_con">
            <div class="t1">
                <a href="javascript:;" class="reg_btn" @click="toLink">立即借钱</a>
                <p class="info">
                            借款额度因个人情况资质而定，需您确认用款后才放款，请放心操作</p>
                <div class="list_ico">
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_1.png" alt="">
                        <p class="p1">审核极快</p>
                        <p class="p2">最快3分钟到账</p>
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_2.png" alt="">
                        <p class="p1">门槛超低</p>
                        <p class="p2">身份证就能贷</p>                        
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_3.png" alt="">
                        <p class="p1">产品多样</p>
                        <p class="p2">多重选择通过率高</p>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        components : {

        },
        created() {

        },
        mounted() {
        },
        methods : {
            toLink(){
                let _this = this;
                if(_this.Base.getSysType() == 'IOS') {
                    location.href = this.Base.downloadUrl.ios;
                } else {
                    location.href = this.Base.downloadUrl.android;
                }                
            },
        },
    }
</script>

<style lang='scss' scoped>
.main{
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    background: #E6F3FF;
    .bg_img{
        background: url(../../assets/activity/reg_bg1.png) no-repeat;
        background-size: 100% 100%;
        height: 12.05rem;
        width: 100%;
    }
    .main_con{
        margin-top: -6rem;
    }
    .t1{
        text-align: center;
        .phone_box{
            width:6.3rem;
            height:.9rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(180, 215, 251, 1);
            border-radius:.45rem;
            display: flex;
            align-items: center;
            margin: 0 auto;
        }
        .reg_btn{
            width:6.3rem;
            height:.9rem;
            line-height: .9rem;
            display: inline-block;
            text-align: center;
            margin: .2rem auto .27rem;
            background:rgba(82,123,236,1);
            box-shadow:0px 4px 13px 0px rgba(17,93,190,0.11);
            border-radius:.45rem;
            color:rgba(255,255,255,1);
            font-size:.32rem;
        }
        .info{
            width:6.3rem;
            margin: 0 auto;
            text-align: left;
            font-size:.24rem;
            color:rgba(153,153,153,1);           
        }
        .list_ico{
            display: flex;
            justify-content: space-between;
            margin: .6rem auto 0rem;
            width: 86%;
           .ico_item{
               img{
                  width: .8rem;
                  height: .8rem;
               }
               .p1{
                    font-size:.26rem;
                    font-weight:bold;
                    color:rgba(50,50,51,1);
                    line-height:1;
                    margin-top: .2rem;
               }
               .p2{
                   font-size:.22rem;
                    font-weight:500;
                    color:rgba(50,50,51,1);
                    opacity:0.85;
                    line-height:1;
                    margin-top: .13rem; 
               }
           } 
        }
    }
}
</style>
