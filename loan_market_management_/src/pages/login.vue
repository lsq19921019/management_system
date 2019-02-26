<template>
    <div class="login" ref="login">
        <router-link :to="{ name : 'PlatformManagementList' }"></router-link>
        <ul>
            <li>
                <el-input placeholder="请输入账号" v-model="userName">
                    <template slot="prepend">账号</template>
                </el-input>
            </li>
            <li>
                <el-input placeholder="请输入密码" v-model="password" type="password">
                    <template slot="prepend">密&nbsp;&nbsp;码</template>
                </el-input>
            </li>
            <li>
                <el-button style="width:100%;" type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Base64 } from 'js-base64';
    export default {
        name : 'Index',
        data() {
            return {
                userName : localStorage.getItem('loginName'),
                password : ''
            }
        },
        methods : {
            login() {
                if(this.userName.length < 1) {
                   this.$message({
                        message : '请输入用户名',
                        type : 'warning'
                    });
                    return;
                }
                if(this.password.length < 1) {
                   this.$message({
                        message : '请输入密码',
                        type : 'warning'
                    });
                    return;
                }
                this.http(this,{
                    url : 'user/login',
                    data : {
                        loginName : Base64.encode(this.userName),
                        password : Base64.encode(this.password)
                    }
                }).then((data)=>{
                    if(data.token) {
                        this.$message({
                            message : '登录成功',
                            type : 'success'
                        });
                        localStorage.setItem('loginName',this.userName);
                        localStorage.setItem('_token',data.token);
                        localStorage.setItem('userName',data.userName);
                        setTimeout(_=>{
                            this.$refs.login.style.display = 'none';
                            // this.$router.push({ 
                            //     name : 'PlatformManagementList'
                            //  });
                            location.href = '/platformManagement/list';
                        },200);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        padding-top:100px;
        display:flex;
        justify-content:center;
        align-items:center;
        ul{
            width:280px;
            margin:auto;
            li{
                padding:10px;
                text-align:center;
            }
        }
    }
    
</style>