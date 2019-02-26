<template>
    <transition name="fade">
        <div class="tips_wrap" id="JS_tipsWrap" v-if="show">
            <div class="tips">{{ content }}</div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                show : false,
                content : ''
            }
        },
        computed: {},
        mounted () {
        },
        methods: {
            //按钮事件
            success () {
                this.show = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tips_wrap{
        position:fixed;
        width:100%;
        height:100%;
        z-index:1000;
        top:0;
        left:0;
        display:flex;
        align-items:center;
        justify-content:center;
        div{
            background:rgba(0,0,0,.7);
            color:#fff;
            padding:.1rem .3rem;
            font-size:.28rem;
            line-height:.72rem;
            height: .72rem;
            max-width:75%;
            border-radius:.08rem;
            
        }
    }
    .fade-enter{
        opacity : 0;
        transform :scale(0);
    }
    .fade-enter-active{
        transition:all .3s ease;
    }
    .fade-leave-active{
        transition:all .2s ease;
        opacity : 0;
        transform :scale(0);
    }
    
</style>