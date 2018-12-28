<template>
    <div class="tabbar pof">
        <ul>
            <li :class="{ cur : navIndex == 0 }">
                <a :class="{ cur0 : navIndex == 0 }" @click="linkTo('Index')">首页</a>
            </li>
            <li :class="{ cur : navIndex == 1 }">
                <a :class="{ cur1 : navIndex == 1 }" @click="linkTo('Loan')">贷款</a>
            </li>
            <li :class="{ cur : navIndex == 2 }">
                <a :class="{ cur2 : navIndex == 2 }" @click="linkTo('Authentication')">认证</a>
            </li>
            <li :class="{ cur : navIndex == 3}">
                <a :class="{ cur3 : navIndex == 3 }" @click="linkTo('My')">我的</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name : 'Tab',
        data() {
            return {
                sourceCode : this.$route.params.sourceCode
            }
        },
        props : {
            navIndex : {
                type : Number,
                default : 0
            }
        },
        methods: {
            linkTo(route) {                
                this.$router.push({ name : route}); 
            }
            // linkTo(route) {
            //     let path = this.$router.history.current.fullPath;
            //     if(path.indexOf(route) == -1) {
            //         location.href = route;
            //     }
            // }
        },
    }
</script>

<style lang="scss" scoped>
    .tabbar{
        width:100%;
        height:.97rem;
        bottom:0;
        border-top:1px solid #e3e3e3;
        z-index:50;
        background:#fff;
        li:nth-child(1){
            a{
                background:url(../assets/tab_home_normal.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
        }
        li:nth-child(2){
            a{
                background:url(../assets/tab_dk_normal.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
        }
        li:nth-child(3){
            a{
                background:url(../assets/tab_rz_normal.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
        }
        li:nth-child(4){
            a{
                background:url(../assets/tab_my_normal.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
        }
        li{
            float:left;
            width:25%;
            a{
                display:block;                
                padding-top:.43rem;
                text-align:center;
                font-size:.22rem;
                margin-top:.15rem;
            }
            a.cur0{
                background:url(../assets/tab_home_selected.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
            a.cur1{
                background:url(../assets/tab_dk_selected.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
            a.cur2{
                background:url(../assets/tab_rz_selected.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
            a.cur3{
                background:url(../assets/tab_my_selected.png) no-repeat top center;
                background-size:.4rem .4rem;
            }
        }
        
    }
</style>