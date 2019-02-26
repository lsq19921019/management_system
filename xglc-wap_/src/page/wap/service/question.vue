<!--
    create : luofeifei 2018-08-31
    desc : 客服中心-问题列表
-->
<template>
    <div class="quesBox">
        <div v-wechat-title="$route.meta.title = titleTip"></div>
        <div class="quesList">
            <ul>
                <li v-for="(item,index) in quesList" :key="index">
                    <div class="quesItem" @click="quesans(item.id)">
                        <span class="ques-name" v-if="type==1">{{ item.title }}</span>
                        <span class="ques-name" v-if="type==0">{{ item.title }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <ques-pop v-if="isCover" :parentParam="queskey"></ques-pop>
        <div id="cover" v-if="isCover" @click="hideQueskey"></div>
    </div>
</template>

<script>
import quespop from './components/quesPop'
export default {
    data(){
        return {
            quesList:"",
            type:this.$route.query.type,
            isCover:false,
            titleTip:""
        }
    },
    components:{
        'ques-pop':quespop,
    },
    created() {
        this.upTitle();
        this.queslist();
    },
    beforeCreate () {
        document.body.style.background = '#f4f4f4';
    },
    methods:{
        upTitle:function(){
            this.titleTip = this.$route.query.name;
        },        
        queslist:function(){
            let thatData = this;
            let data = {
                id:this.$route.query.id,
                isHasSecondSort:this.$route.query.isHasSecondSort,
                type:this.$route.query.type
            }
            this.$http
                .post("/api/help/centerSecondOrQuestion", this.$qs.stringify(data), {
                    headers: base.ajaxHeaderWithoutToken(data)
                })
                .then(function(res) {
                    if(res.data.status == 0){
                        let resData = res.data;
                        thatData.quesList = resData.result.helpCenterQuestionVos
                        console.log(res)
                    }
                });             
        },
        //问题答案
        quesans:function(id){
            this.queskey = id
            this.isCover = true;
        },
        hideQueskey:function(){
            this.isCover = false;
        }        
    }
}
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0}
html,body{background: #f4f4f4!important;height: 100%;}
.quesBox{
    background: #fff;
}
.quesList {
    margin-top: .14rem;
    ul{
        margin-left: .3rem;
    }
    ul li{
        list-style: none;
        border-bottom:1px solid #F6F6F6;
        &:last-child{border-bottom: none}
        .quesItem{
            line-height:.48rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .35rem .3rem .35rem 0;
            .ques-name{
                font-size: .3rem;
                font-weight: 400;
                color:rgba(85,85,85,1);
                word-break: break-all
            }
            img{
                width: .16rem;
                height: .3rem;;
            }
        }
    }
}
#cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
