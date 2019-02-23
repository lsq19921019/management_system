<!--
    create:luofeifei 2018/11/22
    desc: 弹窗
-->
<template>
    <div class="main">
        <div class="pop_con">
            <div class="pop_info">
                <p class="p1">该功能需在最新APP内才能使用</p>
                <p class="p2">立即下载，获得最新平台动态，提高贷款成功率。</p>
                <button @click="toDown">前去下载</button>
            </div>
        </div>
        <div class="info">
            <span class="s1">如遇到问题请</span>
            <!-- <span class="s2">联系客服</span> -->
            <a href="tel:0755-26604482" class="s2">客服热线</a>
        </div>
        <div class="close">
            <img src="../../assets/popup/chacha.png" alt="" @click="this.$parent.close">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        toDown(){
            let _this = this;
            if(_this.Base.getSysType() == 'IOS') {
                location.href = this.Base.downloadUrl.ios;
            } else {
                location.href = this.Base.downloadUrl.android;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.main{
    position: fixed;
    top: 0rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: rgba(0,0,0,.5);
    height: 100%;
    width: 100%;
    z-index: 9999;
    .pop_con{
        background: url(../../assets/popup/popup_bg_a.png) no-repeat;
        background-size: 100% 100%;
        width: 6.2rem;
        height: 6.49rem;
        margin: 2.07rem auto 0;
        position: relative;
        .pop_info{
            position: absolute;
            top: 4rem;
            left: 0;
            right: 0;
            text-align: center;
            .p1{
                font-size:.28rem;
                font-weight:500;
                color:rgba(62,71,93,1);
            }
            .p2{
                font-size:.24rem;
                color:rgba(62,71,93,1);
                margin-top: .19rem;
            }
            button{
                width:5.36rem;
                height:.9rem;
                background:rgba(82,123,236,1);
                border-radius:.45rem;
                font-size:.34rem;
                font-weight:500;
                color:rgba(255,255,255,1);
                margin-top: .42rem;
            }
        }
    }
    .info{
        font-size: .22rem;
        text-align: center;
        margin-top: .2rem;
        .s1{          
            color: #fff;
        }
        .s2{
            color: #FFEA3F;
        }
    }
    .close{
        width: .8rem;
        height: .8rem;
        margin: 2.07rem auto 0;
    }
}
</style>
