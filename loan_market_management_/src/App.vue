<template>
    <div ref="wrap" :class="{
        wrap1 : pathType == 1
    }">
        <!-- 左侧菜单 -->
        <menus v-if="!$route.meta.isShowMenus"></menus>
        <!-- 顶部栏 -->
        <top-bar v-if="!$route.meta.isShowTopBar"></top-bar>
        <!-- 标签 -->
        <!-- <labels v-if="!route.meta.isShowLabels"></labels> -->
        <!-- 组件容器 -->
        <transition name="fade">
            <router-view />
        </transition>
        
    </div>
</template>

<script>
    import menus from '@/components/menus';
    import topBar from '@/components/topBar';
    import labels from '@/components/labels';
    export default {
        data() {
            return {
                route : {},
                pathType : 0
            }
        },
        components : {
            menus,
            topBar,
            labels
        },
        created() {
            this.route = this.$route;
            this.setContainClass();
        },
        watch : {
            '$route'() {
                this.setContainClass();
            }
        },
        methods : {
            setContainClass() {
                let route = this.$route;
                if(route.path == '/operationManagement/notices' || route.path == '/operationManagement/clauses') {
                    this.pathType = 1;
                } else {
                    this.pathType = 0;
                }
            }
        }
    }
</script>

<style lang="scss">
    .wrap1{
        position:relative;z-index:1;
    }
    *{
        margin:0;
        padding:0;
    }
    a{
        text-decoration:none;
    }
    ul,li,ol{
        list-style:none;
    }
    ._contain{
        padding:15px 15px 15px 215px;
        min-width:1100px;
        color:#333;
    }
    .mt5{
        margin-top:5px;
    }
    .mt10{
        margin-top:10px;
    }
    .mt15{
        margin-top:15px;
    }
    .mt20{
        margin-top:20px;
    }
    .pt10{
        padding-top:10px;
    }
    .pb5{
        padding-bottom:5px;
    }
    .pb10{
        padding-bottom:10px;
    }
    /* 组件切换动画 */
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease;
    }
    .fade-enter {
        transform: translateX(20px);
        opacity:0;
    }
    .fade-leave-to{
        display:none;
    }
    /* 分页居中 */
    .el-pagination{
        text-align:center;
    }

    .search{
        display:flex;
        div{
            margin-right:10px;
        }
        .td{
           flex:1; 
        }
        .w1{
            min-width:278px;
        }
    }
    .search_title{
        color:#909399;
        font-size:14px;
    }
    .el-date-editor.el-input{
        width:193px;
    } 
    .login .el-input-group__prepend{
        width:50px;
        text-align:right;
    }
    .form_wrap{
        max-height:700px;
        overflow-y:scroll;
    } 

</style>
