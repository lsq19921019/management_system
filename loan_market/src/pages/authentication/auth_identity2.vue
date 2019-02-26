<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="identity2">
            <ul>
                <item-li name='身份证验证' val='点此进行验证' type='3'></item-li>
                <item-li name='姓名' val='**邡' type='1' rcolor='#A8AAB2'></item-li>
                <item-li name='身份证号码' val='4****************1' type='1' rcolor='#A8AAB2'></item-li>
                <item-li name='工作类型' val='请选择' type='3'></item-li>
                <item-li name='学历' val='请选择' type='3'></item-li>
                <item-li name='现居地址' val='请选择' type='3'></item-li>
                 <item-li name='详细地址' val='请选择' placeholder='请输入详细地址' type='2'></item-li>
            </ul>
        </div>
        <btn-com btnval='保存'></btn-com>
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li'
    export default {
        name : 'AuthIdentity2',
        data() {
            return {
                
            }
        },
        components : {
            //组件
            btnCom,itemLi
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
        margin-top:1.6rem;
        .identity2{
            background: #fff;
        }
    }
</style>