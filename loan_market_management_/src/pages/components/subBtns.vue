<!--
    create : 田鹏伟 2019-01-10
    desc : 副按钮组（搜索框下面的按钮）
-->
<template>
    <div class="mt10">
        <el-button 
            v-for="(btn,index) in subBtnsConfig"
            :key="index"
            size="small" 
            :type="btn.type || 'primary'" 
            @click="btn.fncName"
            :icon="btn.icon">
            {{ btn.text }}
        </el-button>
        <!-- <el-button size="small" type="primary" icon="el-icon-circle-plus-outline">新增联登平台</el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-plus-outline">新增全流程平台</el-button> -->
    </div>
</template>

<script>
    export default {
        name : 'SubBtns',
        data() {
            return {}
        },
        props : {
            subBtnsConfig : {
                default : []
            }
        }
    }
</script>

<style scoped>

</style>