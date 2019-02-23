<!--
    create:luofeifei 2018/11/21
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img"></div>
        <div class="main_con">
            <div class="top">
                <p class="p1">最高可借额度  (元)</p>
                <div class="money">200000</div>
                <!-- <number-grow :value='200000'></number-grow> -->
                <p class="p2">1000元借1天最低仅0.2元</p>
            </div>
            <div class="t1">
                <a href="javascript:;" class="reg_btn" @click="toLink">立即拿钱</a>
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
            }            
        },
    }
</script>

<style lang='scss' scoped>
.main{
    width: 100%;
    background-color: #fff;
    position: fixed;
    height: 100%;
    top: 0;
    .main_con{
        .top{
            text-align: center;
            .p1{
                font-size:.3rem;
                font-weight:500;
                color:rgba(136,136,136,1);
                margin-top: .5rem;             
            }
            .money{
                font-size:1rem;
                font-weight:bold;
                color:rgba(69,69,69,1);
                margin-top: .39rem;
                line-height: 1;               
            }
            .p2{
                font-size:.28rem;
                font-weight:500;
                color:rgba(136,136,136,1);
                margin-top: .33rem             
            }
        }
    }
    .bg_img{
        background: url(../../assets/activity/reg_bg2.png) no-repeat;
        background-size: 100% 100%;
        height: 3.8rem;
        width: 100%;
    }
    .t1{
        text-align: center;
        .reg_btn{
            width:6.3rem;
            height:.9rem;
            line-height: .9rem;
            display: inline-block;
            text-align: center;
            margin: .9rem auto 0rem;
            background:rgba(65,98,222,1);
            box-shadow:0px 16px 26px 0px rgba(46,74,176,0.24);
            border-radius:.45rem;
            color:rgba(255,255,255,1);
            font-size:.32rem;
        }
    }
}
</style>
