<!--
    create:luofeifei 2018/11/22
    desc: 产品详情
-->
<template>
    <div class="main">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>                     
        </div>
        <div class="place">
            <div class="info">
                <div class="d1">{{ platformName }}</div>
                <div class="d2">{{ desc }}</div>
            </div>
            <div class="downApp">
                <img src="../../assets/activity/success.png" alt="">
                <p class="p1">申请已提交</p>
                <p class="p2">请下载APP，完成资料补充，等待放款</p>
                <a :href="appLink">前往下载APP</a>
            </div>            
        </div>
        <div class="content">
            
            <div class="list">
                <div class="title">精选推荐</div>
                <ul>
                    <platform-item v-for="(item,index) in listData" :key="index" :item="item"></platform-item>
                </ul>
            </div>
        </div>
        <button class="bom_btn" @click="toDetail">更多推荐</button>
    </div>
</template>

<script>
import platformItem from '@/components/module/platform';
export default {
    data(){
        return{
            isShowLoading : true,
            isShowItem:true,
            pfNo : this.$route.params.pfNo,
            listData:[],
            //当前页
            pageNum : 1,
            type : '',   
            appLink : '',  //app下载链接   
            platformName : '',  //平台名称
            desc : ''  //平台描述

        }
    },
    components:{
        platformItem
    },
    beforeMount(){
        this.getList();
        this.getAppLink();
    },
    methods:{
        toDetail(){
            this.$router.push({ name : 'Loan'}); 
        },
        //获取列表数据
        getList() {      
            let _this = this;                     
            let data = {
                pageNum : this.pageNum,
                type : this.type
            };                              
            this.$ajax.post('/api/platform/index',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            }).then(res=>{
                let result = res.data; 
                if(result.status == 0 || result.status == -100 || result.status == -9) {
                    if(_this.pageNum > _this.totalPage) {
                        
                    } else {
                        let nub=5;
                        for(let i=0;i<nub;i++){
                            if(result.result.list[i].platformNo == 'YQBA2018112802' || result.result.list[i].platformNo == 'LFQA2018112801'){
                                nub++;
                            }else{
                                _this.listData.push(result.result.list[i])
                            }                      
                        }
                        //_this.listData = [ ..._this.listData, ...result.result.list ];
                    }
                    _this.pageNum += 1;
                } else {
                    _this.$msg({ content : result.msg });
                }
                _this.isShowLoading = false;
            });
        },
        //获取app下载链接
        getAppLink() {
            let _this = this;
            let data = {
                platformNo : this.pfNo
            };
            _this.$ajax.post('/api/app/download',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            }).then(res=>{
                res = res.data;
                if(res.status == 0) {
                    if(_this.Base.getSysType() == 'IOS') {
                        _this.appLink = res.result.ios;
                    } else {
                        _this.appLink = res.result.android;
                    }
                    _this.platformName = res.result.platformName;
                    _this.desc = res.result.desc;
                } else {
                    _this.$msg({ content : res.msg });
                }
            });
        },
    }
}
</script>

<style lang='scss' scoped>
.main{
    background: #fff;
    .page_title{
        background:linear-gradient(270deg,rgba(255,128,59,1),rgba(255,96,59,1));
        height: 1.3rem;      
    }
    .place{
        margin-top: 1.3rem;
        background:linear-gradient(270deg,rgba(255,128,59,1),rgba(255,96,59,1));
        height: 3.1rem;
        .info{
            color: #fff;
            margin: .6rem 0 0 .32rem;
            padding-top: .4rem;
            .d1{
                font-size:.36rem;
            }
            .d2{
                font-size:.24rem;
                opacity: .6;
                margin-top: .1rem;
            }
        }
        .downApp{
            background:rgba(255,255,255,1);
            width:6.86rem;
            box-shadow:0px 3px 14px 0px rgba(37,33,89,0.12);
            border-radius:.08rem;
            margin: .56rem auto 0;
            text-align: center;
            padding-bottom: .3rem;
            img{
                width: .88rem;
                height: .88rem;
                margin-top: .2rem;
            }
            .p1{
                font-size:.32rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                margin-top: .18rem;
            }
            .p2{
                font-size:.24rem;
                font-weight:500;
                color:rgba(168,170,178,1);
                margin-top: .14rem;
            }
            a{
                width:2.4rem;
                margin:auto;
                line-height:.7rem;
                border:1px solid rgba(255,109,59,1);
                border-radius:.08rem;
                font-size:.26rem;
                font-weight:500;
                color:rgba(255,109,59,1);
                margin-top: .18rem;
                display: inline-block;
            }
        }           
    }
    .content{
        z-index: 1;
        margin-top: 2.2rem;
        margin-bottom: 1rem;
        background:rgba(255,255,255,1);
        .list{            
            .title{
                height:1rem;
                line-height: 1rem;
                background:rgba(255,255,255,1);
                font-size:.32rem;
                font-weight:500;
                margin-left: .3rem;
                border-bottom: 1px solid #E6E6E6;
            }
        }
    }
    .bom_btn{
        width: 100%;
        height: .98rem;
        background:rgba(82,123,236,1);
        font-size:.34rem;
        font-weight:500;
        color:rgba(255,255,255,1);
        position: fixed;
        bottom: 0;
    }
}
</style>
