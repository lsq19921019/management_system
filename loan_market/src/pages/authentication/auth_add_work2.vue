<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        {{ this.$route.meta.title }}
    </div>
</template>

<script>
    export default {
        name : 'AuthIdentity3',
        data() {
            return {
                
            }
        },
        components : {
            //组件
        },
        created() {
            //页面渲染前
        },
        mounted() {
            //页面加载完毕   
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.3rem;
    }
</style>