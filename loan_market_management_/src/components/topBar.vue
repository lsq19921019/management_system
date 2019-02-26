<template>
    <div class="top_bar">
        <div class="content">
            <div class="left">
                <!-- 面包屑 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <!-- <el-breadcrumb-item :to="{ name: 'PlatformManagementList' }">首页</el-breadcrumb-item> -->
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(path,index) in metaPaths" :key="index"><span class="routespan" @click="linkTo(path)">{{ path.split('-')[1] }}</span></el-breadcrumb-item>
                    <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
                </el-breadcrumb>

            </div>
            <div class="right" >
                <span>{{ userName }}</span>
                <span @click="dialogVisible = true">退出</span>
            </div>
        </div>
        <el-dialog
            title="提示"
            center
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span style="display:block;text-align:center;font-size:16px;">确定退出？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="loginOut">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                metaPaths : this.$route.meta.paths,
                dialogVisible : false,
                userName : localStorage.getItem('userName')
            }
        },
        created() {
            
        },
        methods : {
            //面包屑路由跳转
            linkTo(path) {
                return;  //产品要求不加链接
                const arr = path.split('-');   
                setTimeout(_=>{
                    if(this.$route.meta.currentMenu) {
                        this.$store.state.currentMenu = this.$route.meta.currentMenu;
                    } 
                },50);                            
                if(arr[0] != 'nopath') {                    
                    this.$router.push({
                        name : arr[0]
                    });
                }
            },
            //退出登录
            loginOut() {                
                this.dialogVisible = true;
                localStorage.removeItem('userName');
                localStorage.removeItem('_token');
                // this.$router.push({ name : 'Login' });
                location.href = '/login';
            },
            //关闭对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            }
        },
        watch : {
            '$route'() {
                this.metaPaths = this.$route.meta.paths;
                console.log(this.$route);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top_bar{
        width:100%;
        background:#fff;
        // position:fixed;
        // left:0;
        // top:0;
        // z-index:99;
        border-bottom:1px solid #ddd;
        min-width:1020px;
        .content{
            height:60px;
            display:flex;
            padding-left:215px;
            align-items:center;
            .left{
                .routespan{
                    // cursor:pointer;
                }
            }
            .right{
                margin-left:auto;
                padding-right:15px;
                color:#666;
                span:nth-child(1){
                    color:#409EFF;
                    padding-right:10px;
                }
                span:nth-child(2){
                    cursor:pointer;
                }
            }
        }
    }
</style>