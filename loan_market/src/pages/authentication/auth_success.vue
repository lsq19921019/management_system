<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="success">
            <img src="../../assets/successImg.png" alt="">
            <p class="info">认证成功!</p>
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
        methods:{
            toBack(){
                this.$router.go(-1);
            }
        },
        mounted() {
            //页面加载完毕
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
                width: 3.15rem;
                height: 1.82rem;
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