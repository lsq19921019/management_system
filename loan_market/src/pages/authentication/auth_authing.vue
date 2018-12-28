<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="success">
            <img src="../../assets/authimg.png" alt="">
            <p class="info">请稍等，资料正在认证中！</p>
            <p class="info" style="margin-top:0.15rem;">大概需要3-5分钟</p>
            <btn-com btnval='返回' width='4rem' @click.native="toBack"></btn-com>
        </div>
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    export default {
        name : 'AuthSuccess',
        data() {
            return {
                
            }
        },
        components : {
            //组件
            btnCom
        },
        created() {
            //页面渲染前
        },
        mounted() {
            //页面加载完毕 
        },
        methods:{
            toBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        .success{
            text-align: center;
            margin-top: 3rem;
            img{
                width: 2.75rem;
                height: 2.28rem;
            }
            .info{
                font-size:.36rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                line-height:1;
                margin-top: .78rem;          
            }
        }
    }
</style>