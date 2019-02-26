<!--
    desc:暂时不用
-->
<template>
    <div class="btn">
        <button :style="'width:'+width">{{ btnval }}</button>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        btnval:'',
        width:''
    }
}
</script>

<style lang="scss" scoped>
.btn{
    text-align: center;
    button{
        width:6.86rem;
        height:.9rem;
        background:rgba(82,123,236,1);
        border-radius:.45rem;
        color: #FFF;
        margin-top: .5rem;
        font-size: .34rem;
    }
}
</style>
