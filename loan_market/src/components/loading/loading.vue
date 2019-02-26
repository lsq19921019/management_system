<template>
    <div class="loading">
        <dl>
            <dt></dt>
            <dd>{{ text }}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props : {
            text : {
                type : String,
                default : '加载中...'
            }
        }
    }
</script>

<style scoped lang="scss">
    .loading{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:100;
        display:flex;
        align-items: center;
        justify-content:center;
        dl{
            min-width:1.2rem;
            height:1.2rem;
            background:rgba(0,0,0,.4);
            border-radius:.1rem;
            dt{
                width:.4rem;
                height:.4rem;
                margin:auto;
                margin-top:.2rem;
                //border-top:2px solid #507DEF;
                background: url(../../assets/timg.png) no-repeat;
                background-size: .4rem .4rem;
                border-radius:50%;
                animation:spinner 1.5s linear infinite;
            }
            dd{
                font-size:.2rem;
                color:#fff;
                text-align:center;
                line-height:2.5;
                padding:0 .2rem;
            }
        }
    }
    @keyframes spinner{
        to{transform:rotate(360deg);
    }
}
</style>