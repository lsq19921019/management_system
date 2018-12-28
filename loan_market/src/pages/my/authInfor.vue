<!--
    create:luofeifei 10/30
    desc:认证信息
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" @click="goback" class="goback"></a>
            <div class="person">
                <div class="top">
                    <div class="top_l">
                        <img src="../../assets/my/my_head_n.png" alt="">
                    </div>
                    <div class="top_r">
                        <span class="top_r_phone">{{ userMyselfInfo.phone }}</span>
                        <!-- <span class="top_r_info">已实名</span> -->
                        <img v-if="userMyselfInfo.hasVerify" class="top_r_info" src="../../assets/name4.png" alt="">
                        <img v-else class="top_r_info" src="../../assets/name2.png" alt="">
                    </div>
                </div>
                <div class="bom">
                    <span class="bom_name">资料完成度</span>
                    <div class="bom_box">
                        <div class="degree" :style="'margin-left:'+(degwidth-5)+'%;'">
                            <img class="map_mark" src="../../assets/map_mark.png" alt="">
                            <span class="degree_txt">{{ degwidth }}%</span>
                        </div>
                        <span class="progress">
                            <span class="progressBar" :style="'width:'+degwidth+'%;'">
                            </span>
                            <span class="cir" :style="'left:'+(degwidth-5)+'%;'"></span>
                        </span>                       
                    </div>
                </div>
            </div>
        </div>
        <div class="con_box">
            <div style="background:#fff;height:1.24rem;"></div>
            <div class="con_list">
                <div class="con_item">
                    <div class="item_title">
                        <span class="mark"></span>
                        <span class="name">申请资格</span>
                        <span class="info">请填写真实资料，有助于订单审核通过</span>
                    </div>
                    <div class="item_bom">
                        <div class="item_bom_info">
                            <div class="card_item" v-for="(item,index) in appCondition" :key='index' @click="toDetail(item.code,item.jump,item.url,item.hasVerify,item.name)">
                                <div class="cardimg" :style="'background: url('+item.logo+') no-repeat;'" :class="item.hasVerify?'yrz':'wrz'"></div>
                                <span class="name">{{ item.name }}</span>
                            </div>                                                                                                               
                        </div>
                    </div>
                </div>
                <div class="con_item">
                    <div class="item_title">
                        <span class="mark"></span>
                        <span class="name">高级认证</span>
                        <span class="info"></span>
                    </div>
                    <div class="item_bom">
                        <div class="item_bom_info">
                            <div class="card_item" v-for="(item,index) in advancedVerifies" :key='index' @click="toDetail(item.code,item.jump,item.url,item.hasVerify,item.name)">
                                <div class="cardimg" :style="'background: url('+item.logo+') no-repeat;'" :class="item.hasVerify?'yrz':'wrz'"></div>
                                <span class="name">{{ item.name }}</span>
                            </div>                                                                                                                                                                        
                        </div>                                                                                
                    </div>
                </div>
                <!-- <div class="con_item">
                    <div class="item_title">
                        <span class="mark"></span>
                        <span class="name">电商资料</span>
                        <span class="info"></span>
                    </div>
                    <div class="item_bom">
                        <div class="item_bom_info">
                            <div class="card_item" v-for="(item,index) in etradeVerifies" :key="index" @click="toDetail(item.code,item.jump,item.url,item.hasVerify,item.name)">
                                <div class="cardimg" :style="'background: url('+item.logo+') no-repeat;'" :class="item.hasVerify?'yrz':'wrz'"></div>
                                <span class="name">{{ item.name }}</span>
                            </div>                                                                                                               
                        </div>
                    </div>
                </div>                                 -->
            </div>
        </div>
        <pop-coma v-show="isShowPopa"></pop-coma>      
    </div>
</template>

<script>
    import popComa from '@/components/popup/popup_a';
    export default {
        data() {
            return {
                isShowPopa:false,
                isShowLoading : true,
                name : 'AuthInfor',
                appCondition:[],    //申请资格
                advancedVerifies:[],   //高级认证
                etradeVerifies:'',  //电商认证
                userMyselfInfo:'',    //用户资料
                degwidth:'0'
            }
        },
        created() {
            let _this = this
            //页面渲染前
            _this.verifyInfo();
        }, 
        components : {
            //组件
            popComa
        },              
        methods:{
            close(){
                this.isShowPopa = false;
            },            
            goback(){
                this.$router.push({name:'My'})
            },
            //首页接口
            verifyInfo(){
                let _this = this;
                let isToken = ''
                if(localStorage.getItem('_token')){
                    isToken = 1
                }else{
                    isToken = 0
                }
                let data = {

                }
                this.$ajax.post('/api/user/info',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(isToken,{})
                })
                .then(res=>{
                    console.log(res)
                    let resData = res.data;
                    if(res.data.status == '0'){
                        // _this.$set(_this,'appCondition',resData.result.appCondition);
                        // _this.$set(_this,'advancedVerifies',resData.result.advancedVerifies);
                        for(let i=0;i<resData.result.appCondition.length;i++){
                            if(resData.result.appCondition[i].code == ''){
                                
                            }else{
                                _this.appCondition.push(resData.result.appCondition[i])
                            }
                        }
                        for(let i=0;i<resData.result.advancedVerifies.length;i++){
                            //_this.advancedVerifies.push(resData.result.advancedVerifies[i])
                            if(resData.result.advancedVerifies[i].code == 'EC_BILL_VERIFY'
                                ||resData.result.advancedVerifies[i].code == 'FUND_VERIFY'
                                ||resData.result.advancedVerifies[i].code == 'INSURE_VERIFY'
                                ||resData.result.advancedVerifies[i].code == 'EC_VERIFY'){
                            }else{
                                _this.advancedVerifies.push(resData.result.advancedVerifies[i])
                            }
                        }
                        // _this.$set(_this,'etradeVerifies',resData.result.etradeVerifies);//电商资料
                        _this.$set(_this,'userMyselfInfo',resData.result.userMyselfInfo);
                        _this.degwidth = resData.result.userMyselfInfo.degree;
                    }
                    _this.isShowLoading = false;                
                })
            },
            toDetail(code,isjump,li,hasVerify,title){
                let level = this.userMyselfInfo.hasVerify;
                let _this = this;
                //如果有没有token
                if(!localStorage.getItem("_token")) {
                    this.$router.push({ name :'Login'})
                } else {
                    //未实名
                    if(!level) {
                        //去实名页面
                        this.$router.push({ name : 'AuthBase' });
                    } else {
                        //  跳成功页
                        if(hasVerify){
                            switch (code) {
                                case 'IDCARD_INFO': //身份认证
                                    this.$router.push({name:'AuthIdentity',query:{type:2}});
                                    break;
                                case 'CONTACT_INFO':   //联系人认证 
                                    if(this.Base.getClientType().type=='wap'){
                                        this.isShowPopa = true;
                                        return false;
                                    }                                
                                    this.$router.push({name:'AuthContact'});
                                    break;
                                case 'ADD_CREDITCARD':    //添加信用卡
                                    this.$router.push({name:'AuthAddCard'});
                                    break;
                                case 'ADD_WORKINFO':    //添加工作信息
                                    this.$router.push({name:'AuthAddWork',query:{type:2}});
                                    break;
                                case 'ADD_SOCIALINFO':    //添加社交信息
                                    this.$router.push({name:'AuthSocial'});
                                    break;
                                case 'ADD_BONUSINFO':    //添加加分认证
                                    this.$router.push({name:'BonusProve'});
                                    break;
                                case 'ADD_IMAGEINFO':    //添加照片资料
                                    if(this.Base.getClientType().type=='wap'){
                                        this.isShowPopa = true;
                                        return false;
                                    }
                                    this.$router.push({name:'PhotoInfor'});
                                    break;                                                                                                                                                                               
                                default:
                                    this.$router.push({ name:'AuthSuccess' });
                                    break;
                            }                                        
                        }else{
                            //身份认证授权
                            if(code == 'IDCARD_INFO'){
                                this.Base.interactiveWithApp('getCertifyInfo',{
                                    token:localStorage.getItem('_token'),
                                    certifyInfo:['smsInfo']
                                }).then(data=>{
                                    if(data == 'wap') {
                                        console.log('getCertifyInfo','wap');
                                    } else {
                                        console.log('getCertifyInfo',data);
                                    }
                                });                                    
                            }
                            //联系人认证
                            if(code == 'CONTACT_INFO'){
                                this.Base.interactiveWithApp('getCertifyInfo',{
                                    token:localStorage.getItem('_token'),
                                    certifyInfo:['contactInfo']
                                }).then(data=>{
                                    if(data == 'wap') {
                                        console.log('getCertifyInfo','wap');
                                    } else {
                                        console.log('getCertifyInfo',data);
                                    }
                                });                                      
                            }
                            //运营商认证授权                            
                            if(code == 'OPERATOR_VERIFY'){
                                let _this = this;
                                this.Base.interactiveWithApp('getCertifyInfo',{
                                    token:localStorage.getItem('_token'),
                                    certifyInfo:['smsInfo']
                                }).then(data=>{
                                    if(data == 'wap') {
                                        console.log('getCertifyInfo','wap');
                                    } else {
                                        console.log('getCertifyInfo',data);
                                    }
                                });                                    
                            }
                            if(isjump) {
                                if(code == 'EC_BILL_VERIFY'||code == 'IBANK_VERIFY'){
                                    this.$msg({content:'暂未开放'})
                                    return false;
                                }                             
                                //跳第三方
                                let jumpData = {
                                    title:title,url:`${li}${location.origin}/undertake`, startColor:"#6A5CF6",endColor:"#8BE2F1",reload : true
                                }
                                this.Base.interactiveWithApp('openNewWindow',jumpData).then(data=>{
                                    // location.href = `${li}${location.href}&themeColor=527BEC`;                                   
                                    if(data == 'wap') {
                                        //wap端逻辑                                       
                                        _this.Base.setIframePageInfo(_this,{
                                            title : title,
                                            url : `${li}${location.href}`
                                        })
                                        console.log('jumpToSharing','wap');
                                    } else {
                                        console.log('jumpToSharing',data);
                                    }
                                });
                            } else {                                
                                //跳路由
                                switch (code) {
                                    case 'IDCARD_INFO': //身份认证
                                        this.$router.push({name:'AuthIdentity',query:{type:2}});
                                        break;
                                    case 'CONTACT_INFO':   //联系人认证
                                        if(this.Base.getClientType().type=='wap'){
                                            this.isShowPopa = true;
                                            return false;
                                        }                                    
                                        this.$router.push({name:'AuthContact'});
                                        break;
                                    case 'ADD_CREDITCARD':    //添加信用卡
                                        this.$router.push({name:'AuthAddCard'});
                                        break;
                                    case 'ADD_WORKINFO':    //添加工作信息
                                        this.$router.push({name:'AuthAddWork'});
                                        break;
                                    case 'ADD_SOCIALINFO':    //添加社交信息
                                        this.$router.push({name:'AuthSocial'});
                                        break;
                                    case 'ADD_BONUSINFO':    //添加加分认证
                                        this.$router.push({name:'BonusProve'});
                                        break;
                                    case 'ADD_IMAGEINFO':    //添加照片资料
                                        if(this.Base.getClientType().type=='wap'){
                                            this.isShowPopa = true;
                                            return false;
                                        }                                      
                                        this.$router.push({name:'PhotoInfor'});
                                        break;                                                                                                                                                                               
                                    default:
                                        this.$router.push({ name:'AuthSuccess' });
                                        break;
                                }
                            }
                        }
                    } 
                }
            },                    
        }
    }
</script>

<style lang="scss" scoped>
.con_box{
    .con_list{
        .con_item{
            background: #fff;
            &:nth-child(n+2){
                margin-top: .16rem;
            }
            .item_title{
                display: flex;
                align-items: center;
                padding: .29rem .32rem;
                border-bottom: 1px solid #e6e6e6;
                .mark{
                   width: .08rem;
                   height: .25rem;
                   display: inline-block;
                   background: #527BEC; 
                }
                .name{
                    font-size:.32rem;
                    font-weight:500;
                    color:rgba(62,71,93,1);
                    line-height:1;
                    margin-left: .2rem;                    
                }
                .info{
                    font-size:.24rem;
                    color:rgba(168,170,178,1);
                    line-height:1;
                    margin-left: .22rem;  
                }
            }
            .item_bom{
                .item_bom_info{
                    display: flex;
                    flex-wrap:wrap;
                    .card_item{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 25%;
                        padding: .29rem 0;
                        .cardimg{
                            width: .56rem;
                            height: .56rem;
                            background-size: 1.14rem .56rem!important;
                            // &:nth-child(1){
                            //     background: url(../../assets/icon.png) no-repeat;    
                            // }
                        }
                        .yrz{
                            background-position: -.57rem 0rem!important;
                        }
                        .wrz{
                            background-position: -0rem 0rem!important;
                        }
                        .name{
                            font-size:.24rem;
                            font-weight:500;
                            color:rgba(62,71,93,1);
                            line-height:1;
                            margin-top: .23rem;                          
                        }
                    }
                }
            }
        }
    }
}

    .page{
        margin-top:3rem;
        .page_title{
            height: 3rem;
        }
        .person{
            width: 6.22rem;
            background:rgba(255,255,255,1);
            box-shadow:0px 6px 14px 0px rgba(82,123,236,0.2);
            border-radius:16px;
            margin: .4rem auto 0;
            left: 0;
            right: 0;
            padding: .4rem .32rem;
            .top{
                display: flex;
                align-items: center;
                .top_l{
                    img{
                        width: 1rem;
                        height: 1rem;
                        border: .08rem solid #f8f9fa;                      
                        border-radius: 50%;
                    }
                }
                .top_r{
                    margin-left: .2rem;
                    display: flex;
                    flex-direction: column;
                    .top_r_phone{
                        font-size:.32rem;
                        color:rgba(92,100,116,1);
                        line-height:1;
                    }
                    .top_r_info{
                        margin-top: .12rem;
                        width: 1.3rem;
                        height: .4rem;
                    }
                }
            }
            .bom{
                display: flex;
                align-items:flex-end;
                .bom_name{
                    font-size:.24rem;
                    font-weight:500;
                    color:rgba(168,170,178,1);
                    line-height:1;                    
                }
                .bom_box{
                    display: flex;
                    flex-direction: column;
                    margin-left: .16rem;
                    .degree{
                        display: inline-block;
                        min-width: 1rem;
                        .degree_txt{
                            font-size:.2rem;
                            font-weight:500;
                            color:rgba(82,123,236,1);
                            line-height:1;
                        }
                    }
                    .map_mark{
                        width: .2rem;
                        height: .22rem;
                        margin-bottom: .04rem;
                    }
                    .progress{
                        background: #F5F5F5;
                        border-radius:.1rem;
                        height: .2rem;
                        width: 4.48rem;
                        display: inline-block;
                        overflow: hidden;
                        position: relative;
                        .progressBar{
                            background: #527BEC;
                            display: block;
                            border-radius:.1rem;
                            height: 100%;
                            display: flex;
                            align-items: center;
                        }
                        .cir{
                            position: absolute;
                            width: .12rem;
                            height: .12rem;
                            display: block;
                            background: #fff;
                            border-radius: 50%;
                            top: 0.04rem;
                        }                        
                    }
                }
            }
        }
    }
</style>