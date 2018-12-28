<!--
    desc:暂时不用
-->
<template>
    <div class="btn">
        <button v-show="sendAuthCode">点击获取</button>
        <span class="sBtn" v-show="!sendAuthCode">{{ auth_time }}s</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            sendAuthCode:true,
            auth_time: 0
        }
    },
    props:{

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.btn{
    text-align: center;
    button{
        width:1.58rem;
        height:.6rem;
        background:rgba(82,123,236,1);
        border-radius:.3rem;
        color: #FFF;
        font-size: .24rem;
    };
    .sBtn{
        width:1.58rem;
        height:.6rem;
        background:rgba(53,87,181,1);
        border-radius:.3rem;
        color: #FFF;
        font-size: .24rem;
        display: inline-block;
        line-height: .6rem;   
    }
}
</style>
