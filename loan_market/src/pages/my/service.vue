<template>
    <div>
        <div class="page_title">
            <p>在线客服</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="iframe">
            <iframe width="100%" frameborder="0" src="https://18475607440.udesk.cn/im_client/?web_plugin_id=57031"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Service'
    }
</script>

<style lang="scss" scoped>
    .iframe{
        z-index:20;
        position:fixed;
        top:0;
        width:100%;
        height:100%;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        iframe{
            height:100%;
            border:1px soid green;
            overflow-y:scroll;
        }
    }
</style>