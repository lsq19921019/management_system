<!--
    create : 田鹏伟 2018-10-27
    desc : 嵌入第三方页面
-->
<template>
    <div>
        <div class="page_title">
            <p>{{ pageTitle }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="iframe">
            <iframe width="100%" frameborder="0" :src="url"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Iframe',
        data() {
            return {
                url: localStorage.getItem('iframeSrc'),  //第三方链接
                //url: '',  //第三方链接
                pageTitle : localStorage.getItem('iframeTitle'),  //页面标题
            }
        },
        created() {
            console.log(localStorage.getItem('iframeTitle'),localStorage.getItem('iframeSrc'));
            // this.url = 'https://www.jianshu.com/';
            // this.url = 'https://www.rrjc.com/';
        }
    }
</script>

<style lang="scss" scoped>
    .iframe{
            z-index:20;
            position:fixed;
            top:1.3rem;
            width:100%;
            height:100%;
            -webkit-overflow-scrolling: touch;
            overflow-y: scroll;
            iframe{
                height:100%;
                overflow-y:scroll;
            }
        }
</style>