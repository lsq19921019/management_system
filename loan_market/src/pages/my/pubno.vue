<!--
    create:luofeifei 12-26
    desc:关注公众号
-->
<template>
    <div class="main">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>        
        <div class="content">
            <div class="t1">
                <div class="t1_title">
                    关注公众号：<span class="pub_nub" data-clipboard-text="人人小助理" @click="copy">人人小助理</span>(点击复制)咨询在线人工客服
                </div>
                <div class="code_img">
                    <img src="../../assets/my/gzgzh_qrcode_img.png" alt="">
                </div>
            </div>
            <div class="t2">
                <div class="d1">方法一：复制微信号：<span class="pub_nub" data-clipboard-text="rrdkxzl" @click="copy">rrdkxzl</span>
                (点击复制)或者公众号名称：<span class="pub_nub" data-clipboard-text="人人小助理" @click="copy">人人小助理</span>(点击复制)。打开微信，粘贴在搜索框内，搜索公众号并关注。</div>
                <div class="d2">方法二：截图保存二维码到相册，打开微信，点击扫一扫，点击“相册”选择二维码图片扫码关注。</div>
            </div>
        </div>
    </div>
</template>

<script>
import Clipbord from 'clipboard'
export default {
    name:'pubNo',
    data(){
        return{

        }
    },
    methods:{
        copy(){
            let clipboard = new Clipbord('.pub_nub');
            clipboard.on('success',e=>{
                this.$msg({content:'复制公众号成功'})
                clipboard.destroy()
            })
            clipboard.on('error',e=>{            
                this.$msg({content:'复制公众号失败'})
                clipboard.destroy()
            })
        },   
    }
}
</script>

<style lang='scss' scoped>
.main{
    margin-top:2.6rem;
    .content{
        width: 6.24rem;
        height: 9.24rem;
        background: url('../../assets/my/gzgzh_bg.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        padding-top: .95rem;
        .t1{            
            margin: 0 auto;
            width: 3.75rem;   
            .t1_title{
                font-size:.32rem;
                line-height:.4rem;
                color:#3E475D;
                text-align: center;
                width: 4.2rem;                   
            }
            .code_img{
                margin-top: .46rem;   
            }
        }
        .t2{
            font-size:.24rem;
            color:rgba(168,170,178,1);
            line-height:.36rem;
            width: 5.21rem;
            margin: .92rem auto 0;
            .d2{
                margin-top: .3rem;
            }
        }
    }
}
    .pub_nub{
        color:#527BEC;
    }
</style>
