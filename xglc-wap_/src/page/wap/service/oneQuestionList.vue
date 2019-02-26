<!--
    create : luofeifei 2018-08-31
    desc : 客服中心-一级问题列表
-->
<template>
    <div class="oneQuesBox">
        <div v-wechat-title="$route.meta.title = titleTip"></div>
        <div class="quesList">
            <ul>
                <li v-for="(item,index) in quesList" :key="index">
                    <div class="quesItem" @click="queslist(item.id,item.isHaveSecond,item.name)">
                        <span class="ques-name">{{ item.name }}</span>
                        <img src="./images/ico-right.png" alt="">
                    </div>
                </li>                             
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quesList:"",
            titleTip:""
        }
    },
    created() {
        this.upTitle();
        this.conterfirst();
    },
    beforeCreate () {
        document.body.style.background = '#f4f4f4';      
    },
    methods:{
        upTitle:function(){
            this.titleTip = this.$route.query.name;
        },
        //跳转
        queslist:function(id,isHaveSecond,name){
            this.$router.push({path:'/service/question',query:{id:id,isHasSecondSort:isHaveSecond,type:1,name:name}})            
        },
        //客服中心（二级分类列表）
        conterfirst:function(){
            let thatData = this;
            let data = {
                id:this.$route.query.id,
                isHasSecondSort:this.$route.query.isHaveSecond
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
        }        
    }
}
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0}
html,body{background: #f4f4f4!important;height: 100%;}
.oneQuesBox{
    background: #fff;
}
.quesList{
    margin-top: .14rem;
    ul{
        margin-left: .3rem;
    }
    ul li{
        list-style: none;
        position: relative;
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
            }
            img{
                width: .16rem;
                height: .3rem;;
            }
        }
    }
}
</style>


