<template>
    <div class="nomore pof">
        <dl>
            <dt><img src="../../assets/module/nomore.png" alt=""></dt>
            <dd>{{ tips }}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        props : {
            tips : ''
        }
    }
</script>

<style lang="scss" scoped>
    .nomore{
        width:100%;
        height:100%;
        display:flex;
        top:0;
        left:0;
        background:#f5f5f5;
        align-items:center;  
        dl{
            width:80%;
            margin:auto;
            dt{
                width:1.4rem;
                margin:auto;
            }
            dd{
                font-size:.28rem;
                color:#a8aab2;
                text-align:center;
                margin-top:.35rem;
            }
        }  
    }
</style>