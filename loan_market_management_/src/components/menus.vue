<!--
    create : 田鹏伟 2018-11-20
    desc : 菜单slider
-->
<template>
    <div class="menus">
        <!-- 头像&昵称 -->
        <!-- <dl>
            <dt><img src="http://192.168.2.109:8112/static/img/girl.gif" alt=""></dt>
            <dd>嘿嘿嘿</dd>
        </dl> -->
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                :default-active="currentMenu"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>平台信息管理</span>
                        </template>
                        <el-menu-item-group>
                        <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="1-1" @click="linkRouter('PlatformManagementList')">平台列表</el-menu-item>
                            <!-- <el-menu-item index="2-2" @click="linkRouter('PlatformManagementArea')">平台专区</el-menu-item>
                            <el-menu-item index="2-3" @click="linkRouter('PlatformManagementConfiguration')">平台配置</el-menu-item>
                            <el-menu-item index="2-4" @click="linkRouter('PlatformManagementBroadcastAd')">轮播广告</el-menu-item>
                            <el-menu-item index="2-5" @click="linkRouter('PlatformManagementBanner')">平台Banner</el-menu-item>
                            <el-menu-item index="2-6" @click="linkRouter('PlatformManagementManage')">平台管理</el-menu-item> -->
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>用户信息</span>
                        </template>
                        <el-menu-item index="2-1" @click="linkRouter('PlatformUserInfoProfile')">用户信息概况</el-menu-item>
                        <el-menu-item index="2-2" @click="linkRouter('PlatformUserList')">用户列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>运营管理</span>
                        </template>
                        <el-menu-item-group>
                        <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="3-1" @click="linkRouter('OperationMangementPv')">平台点击数据</el-menu-item>
                            <!-- <el-menu-item index="3-2" @click="linkRouter('OperationMangementUnionPlatform')">联登平台推荐数据</el-menu-item> -->
                            <el-menu-item index="3-3" @click="linkRouter('OperationMangementBanner')">banner管理</el-menu-item>
                            <el-menu-item index="3-4" @click="linkRouter('OperationMangementZone')">专区管理</el-menu-item>
                            <el-menu-item index="3-5" @click="linkRouter('OperationMangementBannerStatistics')">banner统计</el-menu-item>
                            <el-menu-item index="3-6" @click="linkRouter('OperationMangementClauses')">条款管理</el-menu-item>

                            <el-menu-item index="3-7" @click="linkRouter('OperationMangementNotices')">平台公告</el-menu-item>

                            <el-menu-item index="3-8" @click="linkRouter('OperationMangementBroadcastNotice')">轮播公告</el-menu-item>

                            <el-menu-item index="3-9" @click="linkRouter('OperationMangementFeedback')">意见反馈</el-menu-item>

                            <el-menu-item index="3-10" @click="linkRouter('OperationMangementClearCache')">清除缓存</el-menu-item>
                                
                            <el-menu-item index="3-11" @click="linkRouter('OperationMangementClearWhiteList')">清除白名单账号</el-menu-item>
                            <el-menu-item index="3-12" @click="linkRouter('OperationMangementDockingPlatform')">对接平台统计</el-menu-item>
                            <el-menu-item index="3-13" @click="linkRouter('OperationMangementOrderStatus')">订单状态</el-menu-item>
                            <el-menu-item index="3-14" @click="linkRouter('OperationMangementUlCalculate')">联登平台推荐数据</el-menu-item>
                            <el-menu-item index="3-15" @click="linkRouter('OperationPromotionChannel')">推广渠道管理</el-menu-item>
                            <!-- <el-menu-item index="3-2" @click="linkRouter  ('OperationMangementUserNotics')">用户公告</el-menu-item>
                            <el-menu-item index="3-3" @click="linkRouter('OperationMangementFootprints')">浏览足迹</el-menu-item>
                            <el-menu-item index="3-4" @click="linkRouter('OperationMangementInforList')">网站信息列表</el-menu-item> -->
                        </el-menu-item-group>
                    </el-submenu>

                    <!-- <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <span slot="title">代码生成</span>
                    </el-menu-item>
                    
                    <el-menu-item index="5">
                        <i class="el-icon-location"></i>
                        <span slot="title">平台用户</span>
                    </el-menu-item>

                    <el-menu-item index="6">
                        <i class="el-icon-edit"></i>
                        <span slot="title">意见反馈</span>
                    </el-menu-item>
                    
                    <el-menu-item index="7">
                        <i class="el-icon-tickets"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item> -->

                </el-menu>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentMenu : this.$store.state.currentMenu
            }
        },
        mounted() {
            console.log(this.$store.state.currentMenu);
            if(this.$route.meta.currentMenu) {
                this.currentMenu = this.$route.meta.currentMenu;
            } 
        },
        methods : {
            linkRouter(name,param) {
                if(!param) {
                    this.$router.push({ name : name });
                }  
                if(this.$route.meta.currentMenu) {
                    this.$store.state.currentMenu = this.$route.meta.currentMenu;
                }               
            }
        },
        watch : {
            '$route'() {
                setTimeout(_=>{
                    this.currentMenu = this.$store.state.currentMenu;
                },60);
            }
        }
    }
</script>

<style scoped>
    .menus{
        width:200px;
        overflow-x:hidden;
        position:fixed;
        top:0;
        left:0;
        height:100%;       
        background:#545c64;
        z-index:100;
    }
    .el-menu{
        border-right:none;
    }
    dl{
        padding:20px 60px 5px 0;
    }
    dl dt{
        width:80px;
        margin:auto;
    }
    dl dt img{
        width:100%;
    }
    dl dd{
        color:#fff;
        font-size:16px;
        line-height:2;
        text-align:center;
    }
</style>