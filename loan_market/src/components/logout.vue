<template>
    <transition name="ec">
        <div class="logout pof" v-if="isShowLogout">
                <div class="content poa">
                    <div class="sure tac">
                        <p class="fc999 fs28">是否退出该账号？</p>
                        <div><a href="JavaScript:;" @click="logout">退出登录</a></div>
                    </div>
                    <div class="return tac">
                        <a href="javascript:;" @click="hideLogout">取消</a>
                    </div>
                </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name : 'Logout',
        props : {
            isShowLogout : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {
                 
            }
        },
        methods: {
            hideLogout() {
                this.$emit('hideLogout');
            },
            logout() {
                localStorage.removeItem('_token');
                localStorage.removeItem('_mobile');
                localStorage.removeItem('iframeTitle');
                localStorage.removeItem('iframeSrc');
                localStorage.removeItem('pfNo');
                this.$router.push({ name : 'Index' });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .logout{
        z-index:1000;
        background:rgba(0,0,0,.45);
        height:100%;
        width:100%;
        left:0;
        top:0;
        .content{
            width:7.1rem;
            left:50%;
            margin-left:-3.55rem;
            bottom:.16rem;
            .sure{
                background:#fff;
                border-radius:.16rem;
                p{
                    line-height:.9rem;
                    border-bottom:1px solid #e6e6e6;
                }
                div{
                    line-height:1rem;
                    a{
                        display:block;
                        color:#F06C76;
                        font-size:.34rem;
                    }
                }
            }
            .return{
                background:#fff;
                line-height:1rem;
                border-radius:.16rem;
                font-size:.34rem;
                margin-top:.16rem;
                a{
                    display:block;
                }
            }
        }
    }
     .ec-enter {
        opacity: 0;
        .content {
            transform :translateY(100%);
        }
    }

    .ec-enter-active {
        transition: opacity .4s;
        .content {
            transition: all .4s;
        }
    }
    .ec-leave-active{
        transition: opacity .2s;
        .content {
            transition: all .2s;
        }
    }
    .ec-leave-active {
        opacity: 0;
        .content {
            transform :translateY(100%);
        }
    }
</style>