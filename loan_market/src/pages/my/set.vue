<template>
    <div class="set">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_title">
            <p>账户设置</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <ul class="set_list set_list1">
            <li class="c">
                <span class="fl fs32">真实姓名</span>
                <span class="fr fs28 fc2">{{ realname }}</span>
            </li>
            <li class="c">
                <span class="fl fs32">身份证号</span>
                <span class="fr fs28 fc2">{{ idcardno }}</span>
            </li>
        </ul>
        <ul class="set_list">
            <li class="c">
                <span class="fl fs32">当前版本</span>
                <span class="fr fs28">{{ this.Base.version }}</span>
            </li>
            <li class="c por ico" onclick=" location.href='/agreement?type=2' ">
                <span class="fl">服务协议</span>
                <span class="poa dsb"></span>
            </li>
        </ul>
        <div class="btn">
            <a href="javascript:;" @click="logout" class="dsb tac fc3 fs32">退出登录</a>
        </div>
        <logout :isShowLogout="isShowLogout" @hideLogout="hideLogout"></logout>
    </div>
</template>

<script>
    import logout from '../../components/logout';
    export default {
        name : 'Set',
        data() {
            return {
                isShowLoading : true,
                idcardno : '',
                realname : '',
                apiPath : {
                    user : '/api/user/index'
                },
                isShowLogout : false
            }
        },
        created() {
            this.getUserInfo();
        },
        components : {
            logout
        },
        methods: {
            getUserInfo() {
                if(!localStorage.getItem('_token')) {
                    this.$router.push({ name : 'Login' });
                    return;
                }
                let _this = this;
                this.$ajax.post(_this.apiPath.user,_this.$qs.stringify({}),{
                    headers: _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0) { 
                        _this.realname = result.result.realname;
                        _this.idcardno = result.result.idcardno;
                    } else {
                        _this.$router.push({ name : 'Login' });
                    }
                    _this.isShowLoading = false;
                });
            },
            //退出登录
            logout() {
                this.isShowLogout = true;
            },
            hideLogout() {
                this.isShowLogout = false;
            }
        },
    }
</script>

<style lang="scss" scoped>    
    .set{
        .set_list{
            margin-top:.2rem;
            padding-left:.3rem;
            background:#fff;
            li{
                border-bottom:1px solid #e6e6e6;
                line-height:1rem;
                padding-right:.3rem;
                span:nth-child(1){
                    font-size:.32rem;
                }
                span:nth-child(2){
                    font-size:.28rem;
                }
            }
            li:last-child{
                border-bottom:0;
            }
            .ico{
                span:nth-child(2){
                    width:.12rem;
                    height:.22rem;
                    background:url(../../assets/my_arrow.png) no-repeat;  
                    background-size:.12rem .22rem;
                    top:.4rem;
                    right:.31rem; 
                }
            }
        }
        .set_list1{
            margin-top:1.6rem;
        }
        .btn{
            background:#fff;
            line-height:1rem;
            margin-top:.2rem;
        }
    }
</style>