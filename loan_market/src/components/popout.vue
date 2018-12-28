<!--
    create:luofeifei 10/26
    desc:提示框
-->
<template>
    <div class="cover" v-show="config.isShow">
        <div class="popup">
            <p class="title" v-if="config.showTitle">{{ config.title }}</p>
            <p class="con" v-html="config.content"></p>
            <div class="btn" v-show="config.btns.length > 0">
                <button :class="{ 'onlyone' : config.btns.length == 1 }" v-for="(btn,index) in config.btns" :key="index" @click="hanlderBtns(index)">{{ btn }}</button>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        config : {}
    },
    created() {
        
    },
    mounted() {
        
    },
    methods:{
        // 关闭窗口
        hanlderBtns(type) {
            if(type == 0) {
                this.$emit('parentOff');
            } else {
                this.$emit('parentSure');
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.cover{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
    .popup{
        width: 5.3rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 0px 0px rgba(0,0,0,0.18);
        border-radius:.14rem;
        z-index: 999;
        position: relative;
        .title{
            font-size:.34rem;
            font-weight:bold;
            color:rgba(45,45,45,1);
            line-height:1;
            text-align: center;
            padding-top: .34rem;     
        }
        .con{
            font-size:.28rem;
            font-weight:500;
            color:rgba(45,45,45,1);
            line-height:1.3;
            text-align: center;
            padding:.3rem .15rem;
        }
        .btn{
            border-top: 1px solid #ccc;
            button:nth-child(1){
                font-size:.34rem;
                font-weight:500;
                color:#2E2E2E;
                line-height:1;
                width: 50%;
                height: 100%;
                padding: .28rem 0;
                border-right: 1px solid #ccc;                      
            }            
            button:nth-child(2){
                font-size:.34rem;
                font-weight:500;
                color:rgba(71,119,243,1);
                line-height:1;
                width: 50%;
                height: 100%;
                padding: .28rem 0;                       
            }
            button.onlyone{
                border:none;
                width:100%;
                color:rgba(71,119,243,1);
            }
        }
    }
}
</style>
