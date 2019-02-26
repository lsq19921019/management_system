<!--
    create : luofeifei 2018-09-02
    desc : 客服中心-首页
-->
<template>
    <div class="quesCon">
        <div class="wrap">
            <div class="ques-tit">
                <span class="ques-name">{{ quesans.title }}</span>
                <img class="" src="../images/ico-close.png" alt="" @click="hideCom">
            </div>
            <div class="ques-con">
                <div class="ques-key">
                    <div class="ques-key-tit" v-html="quesans.answer">
                        
                    </div>
                </div>
                <div class="line-cor" v-if="listLen"></div>
                <div class="ques-cor" v-if="listLen">
                    <p class="ques-cor-tit">相关问题</p>
                    <div class="ques-cor-item">
                        <p v-for="(item,index) in quesans.list" :key="index" @click="queskey(item.id,1)">{{ item.title }}</p>
                    </div>
                </div>
            </div>
            <div class="isHelp">
                <span class="ishelp-tit">是否对您有帮助:</span>
                <div class="ishelp-item use-help" @click="hasHas==0?ishelp(quesans.id,1):isNone()">
                    <img src="../images/ico-praise-s.png" alt="" v-if="hasHas==0">
                    <img src="../images/ico-praise-i.png" alt="" v-if="hasHas==1">
                    <img src="../images/ico-praise.png" alt="" v-if="hasHas==2">
                    <span class="ishelp-txt" :class="hasHas==1?'hasHas':(isColor==2?'noHas':'')">有用</span>
                </div>
                <div class="ishelp-item no-help" @click="noHas==0?ishelp(quesans.id,2):isNone()">
                    <img src="../images/ico-nopraise-s.png" alt="" v-if="noHas==0">
                    <img src="../images/ico-nopraise-i.png" alt="" v-if="noHas==1">
                    <img src="../images/ico-nopraise.png" alt="" v-if="noHas==2">
                    <span class="ishelp-txt" :class="noHas==1?'hasHas':(isColor==2?'noHas':'')">没用</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
           quesans:'',
           isuse:'',
           hasHas:0,
           noHas:0,
           isColor:'',
           listLen:true
        }
    },
    props : {
        parentParam : {
            type : Number
        }
    },
    created() {     
        this.queskey(this.parentParam,1)
    },
    methods:{    
        hideCom:function(){
            this.$parent.hideQueskey()
        },
        queskey:function(id,type){
            let thatData = this;
            let data = {
                id:id,
                type:type,
                isColor:''
            }
            this.$http
                .post("/api/help/centerQuestionDetail", this.$qs.stringify(data), {
                    headers: base.ajaxHeaderWithoutToken(data)
                })
                .then(function(res) {
                    if(res.data.status == 0){
                        thatData.quesans = res.data.result
                        if(res.data.result.list == false){
                            thatData.listLen = false
                        }
                        console.log(res)
                    }
                });
                this.hasHas = 0
                this.isColor = 1
                this.noHas = 0
        },
        //是否对您有帮助
        ishelp:function(id,type){
            let thatData = this;
            let data = {
                id:id,
                isHasUse:type
            }
            this.$http
                .post("/api/help/centerQuestionCollectUseCount", this.$qs.stringify(data), {
                    headers: base.ajaxHeaderWithoutToken(data)
                })
                .then(function(res) {
                    if(res.data.status == 0){
                        thatData.isuse = res.data.result
                    }
                });
            if(type == 1){
                mui.toast("感谢您的支持!")
                this.hasHas = 1
                this.noHas = 2
                this.isColor = 2
            }
            if(type == 2){
                mui.toast("我们会继续努力!")
                this.hasHas = 2
                this.noHas = 1
                this.isColor = 2
            }            
        },
        isNone:function(){}
    }
}
</script>

<style lang="scss" scoped>
.quesCon{
    background: #FFF;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    .ques-con{
        max-height: 6.8rem;
        min-height: 6.8rem;
        overflow: auto;
        .line-cor{
            position: relative;
                &::before{
                    content: "";
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    width: 200%;
                    height: 1px;
                    border-top: 1px solid #ddd;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scale(0.5, 0.5);
                    transform: scale(0.5, 0.5);
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                }
        }
    }
    .ques-tit{
        display: flex;
        justify-content: space-between;
        padding: .3rem;
        word-break: break-all;
        position: relative;
        color: #171717;
        &::after{
            content: "";
            bottom: 0;
            left: 0;
            position: absolute;
            width: 200%;
            height: 1px;
            border-bottom: 1px solid #ddd;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scale(0.5, 0.5);
            transform: scale(0.5, 0.5);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .ques-name{
            font-size:.3rem;
            font-weight:400;
            color:rgba(23,23,23,1);
        }
        img{
            width: .28rem;
            height: .28rem;
        }
    }
    .ques-key{
        margin:0 .3rem;
        .ques-key-tit{
            font-size:.3rem;
            font-weight:400;
            color:rgba(51,51,51,1);
            padding: .3rem 0;
        }
    }
    .ques-cor{
        padding: .3rem;      
        .ques-cor-tit{
            font-size:.3rem;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        .ques-cor-item p{
            font-size:.3rem;
            font-weight:400;
            color:rgba(255,86,55,1);
            margin-top: .3rem;  
        }
    }
    .isHelp{
        display: flex;
        align-items: center;
        padding: .3rem;
        border-top: 0.1px solid #ddd;
        .ishelp-tit{
            font-size:.3rem;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        .ishelp-item{
            display: flex;
            align-items: center;
            img{
                width: .3rem;
                height: .3rem;
            }
            .ishelp-txt{
                font-size:.3rem;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-left: .2rem;      
            }
            .hasHas{
                color: #FF5637;
            }
            .noHas{
                color: #ddd;
            }
        }
        .use-help{
            margin-left: .53rem;
        }
        .no-help{
            margin-left: .78rem;
        }
    }
}
</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity 0.3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}
</style>