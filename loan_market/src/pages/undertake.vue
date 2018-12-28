<!--
    create : 田鹏伟 2018-11-14
    desc : 第三方认证回跳页面
-->
<template>
    <div>
        <!-- 加载中 -->
        <loading :text="'加载中...'"></loading>
    </div>
</template>

<script>
    export default {
        created() {
            this.Base.interactiveWithApp('finishWindow',{}).then(data=>{
                if(data == 'wap') {
                    console.log('finishWindow','wap');
                } else {
                    console.log('finishWindow',data);
                }
            });
        }
    }
</script>

<style scoped>

</style>