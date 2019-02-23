<!--
    create : 田鹏伟 2018-9-10
    desc : 首页
-->
<template>
    <div class="index">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <!-- <keep-alive><tab-bar :navIndex="0"></tab-bar></keep-alive>  -->
        <tab-bar :navIndex="0"></tab-bar>
        <div class="page_title">
            <p>首页</p>
        </div> 
        <!-- 轮播图 -->
        <div class="banner" ref="banner">
            <swiper v-if="bannerList.length > 1 && isShowSwiper" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(img,index) in bannerList" :key="index"><img :src="img.imgUrl" alt="" @click="bannerLink(img)"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <!-- 消息通知&平台分类 -->
        <div class="floor2">
            <div class="class c">
                <dl @click="goClassification(4)">
                    <dt><img src="../assets/ico_label4.png" alt=""></dt>
                    <dd>新上平台</dd>
                </dl> 
                <dl @click="goClassification(1)">
                    <dt><img src="../assets/ico_label1.png" alt=""></dt>
                    <dd>高通过率</dd>
                </dl>
                <dl @click="goClassification(2)">
                    <dt><img src="../assets/ico_label2.png" alt=""></dt>
                    <dd>大额低息</dd>
                </dl>
                <dl @click="goClassification(3)" class="fire_box">
                    <div class="fire"><img src="../assets/ico_fire.png" alt=""></div>
                    <dt><img src="../assets/ico_label3.png" alt=""></dt>
                    <dd>闪电放款</dd>
                </dl> 
            </div>
            <div class="tips">
                <div class="notices">
                    <div></div>
                    <div id="getH" class="por">
                        <ul class="marquee_list" :style="{ top: -num + 'px'}" :class="{marquee_top:num}">
                            <li v-for="(item,index) in carouseList" :key="index">{{ item.content }}</li>
                        </ul>
                    </div>
                </div>
            </div>   
        </div> 
        <!-- <router-link to='/platformDetail2/LDJQ2019012201' style="color:green">测试</router-link> -->
        <!-- 列表数据 -->
        <div class="list">
            <div class="title"><span ref='test'>热门推荐</span><span @click="toLoan">更多</span>
            </div>
            <ul>
                <platform-item v-for="(item,index) in listData" :key="index" :item="item"></platform-item>
            </ul>
            <!-- <div class="getMore">
                <more-loading  v-if="pageNum <= totalPage && listData.length != 0"></more-loading> 
                <span v-if="isShowListTips" class="fc2 fs28">没有更多了</span>
            </div> -->
        </div>       
    </div>
</template>

<script>
    import tabBar from '@/components/tab';
    import platformItem from '@/components/module/platform';    
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    import popCom from '@/components/popout';
    export default {
        data() {
            return {
                apiPath : {
                    //列表
                    list : '/api/platform/list',
                    //首页列表
                    //index : '/api/platform/index/new',
                    index : '/api/platform/index',
                    //个人中心
                    user : '/api/user/index',
                    //banner pv/uv 统计接口
                    bannerPv : '/api/platform/bannerPv'
                },
                //是否显示加载中组件
                isShowLoading : true,
                //列表数据
                listData : [],
                //当前页
                pageNum : 1,
                //总页数
                totalPage : 1,
                //是否显示查看更多
                isShowGetMore : false,
                //回传后端类型字段
                type : '',
                //后端筛选条件
                tabText1 : '推荐排序',
                tabText2 : '贷款类型',
                isLoading : false,
                num : 0,
                //swiper配置
                swiperOption: {
                    loop: true,
                    autoplay: {
                        delay: 3000, //3秒切换一次
                        disableOnInteraction: false
                    },
                    speed: 400,
                    observeParents:true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    on : {}
                },
                carouseList : [],
                //banner
                bannerList : [],
                //是否显示'没有更多了'提示
                isShowListTips : false,
                isShowSwiper : true,
                dialogConfig : {
                    btns : ['立即下载'],
                    isShow:false,
                    showTitle : true,
                    title : '更新提示',
                    content : '<span style="line-height:1.5">当前App版本过低,请升级至最新版本继续使用</span>'
                },                
                
            }
        },
        components : {
            tabBar, platformItem, swiper, swiperSlide, popCom
        },
        mounted() {
            // window.addEventListener('scroll', this.scrollBottom); 
            let sourceCode = this.$route.params.sourceCode;
            if(sourceCode == 'ios_qianjinjin') {
                localStorage.setItem('sourceCode_qianjinjin',sourceCode);
            } else if(sourceCode == 'ios_renrendai'){
                localStorage.setItem('sourceCode_renrendai',sourceCode);
            }                  
        },
        computed : {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created() {       
            // document.body.scrollTop = 200+'px';
            // console.log(111);
        },
        beforeMount() {         
            this.getList();
            //通过token获取用户默认信息
            if(localStorage.getItem('_token')) {                                     
                this.Base.interactiveWithApp('getCertifyInfo',{
                    token : localStorage.getItem('_token'),
                    certifyInfo : ['locationInfo','deviceInfo','allInstallAppInfo']
                }).then(data=>{
                    if(data == 'wap') {
                        console.log('getCertifyInfo','wap');
                    } else {
                        console.log('getCertifyInfo',data);
                    }
                });
            }
        },
        methods : {
            //滚动底部方法
            scrollBottom() {
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(this.pageNum <= this.totalPage) {
                    if ((window.screen.height + sTop) >= (document.body.clientHeight) && !this.isLoading) { 
                        this.isLoading = true;
                        this.getList();
                    } else {
                        this.isShowListTips = true;
                    }
                }
            },
            //滚动公告
            showMarquee(_this,num) {
                _this.carouseList.push(_this.carouseList[0]);
                var max = _this.carouseList.length;
                var that = _this;
                let h = document.getElementById('getH').offsetHeight;
                var marqueetimer =  setInterval(function(){
                    num++;
                    if(num>=max ){
                        num=0;
                    }
                    that.num=num*h;
                }, 3000);
            },
            //获取列表数据
            getList() {      
                let _this = this;                     
                let data = {
                   pageNum : this.pageNum,
                   type : this.type
                };                              
                this.$ajax.post(this.apiPath.index,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    let result = res.data; 
                    if(result.status == 0 || result.status == -100 || result.status == -9) { 
                        //首页只展示十条数据，不用分页 
                        //_this.totalPage = result.result.pageEntity.totalPage;
                        _this.bannerList = result.result.bannerList;
                        _this.carouseList = result.result.carouseList;
                        _this.showMarquee(_this,0);
                        if(_this.pageNum > _this.totalPage) {
                            
                        } else {
                            _this.listData = [ ..._this.listData, ...result.result.list ];
                        }
                        _this.pageNum += 1; 
                    } else {
                        _this.$msg({ content : result.msg });
                    }
                    _this.isShowLoading = false;
                    _this.isLoading = false;
                    //解决一个问题，ios返回莫名出现遮罩层
                    window.scrollTo(0,1); 
                    window.scrollTo(0,0); 
               });
            },
            //跳转平台详情页面
            goPlatformDetail(id) {
                this.$router.push({ name : 'PlatformDetail', params : { id : id } });
            },
            //跳转分类列表
            goClassification(type) {
                this.$router.push({ name : 'Classification', params : { class : type } });
            },
            //banner跳转到第三方平台
            bannerHref(url) {
                if(url.length > 0) {
                    this.Base.interactiveWithApp('openNewWindow',{
                        url : url, title : '人人贷款', startColor:"#6A5CF6",endColor:"#8BE2F1",backUrl:'回到人人贷款'
                    }).then(data=>{
                        if(data == 'wap') {
                            console.log('openNewWindow','wap');
                            this.Base.setIframePageInfo(this,{ url : url, title : '人人贷款' });
                        } else {
                            console.log('openNewWindow',data);
                        }
                    });
                }
            },
            //banner跳转
            bannerLink(img) {
                this.getUserInfo().then(data=>{
                    let obj = {
                        bannerId : img.bannerId
                    };
                    //有登录态判断
                    if(data == 0) {                        
                        let _this = this;
                        _this.$ajax.post(_this.apiPath.bannerPv,_this.$qs.stringify(obj),{
                            headers : this.Base.initAjaxHeader(1,obj)
                        }).then(res=>{                            
                            if(res.data.status == 0) {
                                //type 1 活动页面；2 第三方平台页面
                                let type = img.type;
                                if(type == 1) {
                                    location.href = img.url;
                                } else if(type == 2) {
                                   _this.bannerHref(img.url); 
                                }
                            } else {
                                _this.$msg({ content : res.msg });
                            }
                        });
                    }
                });
            },
            getUserInfo(item) {
                if(!localStorage.getItem('_token')) {
                    this.$router.push({ name : 'Login' });
                    return;
                }
                //统计浏览足迹
                //this.userOperate(item.platformNo);
                let _this = this;
                return new Promise((resolve,reject)=>{
                    this.$ajax.post(_this.apiPath.user,_this.$qs.stringify({}),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    }).then(res=>{
                        let result = res.data;
                        resolve(result.status);
                        if(result.status == 0) {  
                        } else if(result.status == '-9') {
                            _this.$router.push({ name : 'AuthBase'});
                        } else if(result.status == '-100') {
                            _this.$msg({ content : result.msg });
                            setTimeout(_=>{
                                _this.$router.push({ name : 'Login' });
                            },1800);
                        } else {
                            _this.$msg({ content : result.msg });
                        }                
                    });
                });
            },
            toLoan() {
                this.$router.push({ name : 'Loan' });
            }
        },
        beforeRouteEnter(to,from,next) {
            if(localStorage.getItem('scrollTop')) {
                setTimeout(_=>{
                    window.scrollTo(0,localStorage.getItem('scrollTop')-0);
                    localStorage.removeItem('scrollTop');
                },100);
            }
            next();
        },
        beforeRouteLeave(to,from,next) {
            //去详情页之前记录当前页面滚动位置
            if(to.name == 'PlatformDetail') {
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                localStorage.setItem('scrollTop',sTop);
            }
            next();
        }
    }
</script>

<style lang="scss" scoped>
    .index{
        // padding-top:4.54rem;
        background:#fff;
        padding-bottom:.97rem;
        .banner{
            // position:fixed;
            // top:1.3rem;
            // width:100%;
            // left:0;
            // z-index:100;
            height:3.3rem;
            background:url(../assets/loading.gif) center center no-repeat;
            background-size:.32rem .32rem;
            margin-top:1.285rem;
            .swiper-slide{
                height:3.3rem;
            }
            .swiper-pagination{
                bottom:.1rem;
            }
            
        }
        .floor2{
            //平台分类
            .fire_box{
                position: relative;
            }
            .fire{
                position: absolute;
                top: .1rem;
                right: .18rem;;
                width: .46rem;
                height: .3rem;
            }
            .class{
                width:6.96rem;
                border-bottom:1px solid #EDEDED;
                margin:auto;
                dl{
                    float:left;
                    width:1.435rem;
                    padding-top:.23rem;
                    padding-bottom:.35rem;
                    dt{
                       width:.9rem;
                       height:.95rem;
                       margin:auto;
                       border-radius:.1rem;
                       overflow:hideen;
                    }
                    dd{
                        text-align:center;
                    }
                }
                dl:nth-child(2){
                    padding-left:.4rem;
                }
                dl:nth-child(3){
                    padding-left:.4rem;
                    padding-right:.4rem;
                }
            }
            //消息提示
            .tips{
                // top:4rem;
                // width:100%;
                // left:0;
                background:#fff;
                z-index:20;
                .notices{
                    height:.7rem;
                    padding:0 .3rem;
                    display:flex;
                    align-items:center;
                    div:nth-child(1){
                        width:1.27rem;
                        height:.3rem;
                        background:url(../assets/tips1.png) no-repeat;
                        background-size: 1.27rem .3rem;
                        margin-right:.06rem;
                    }
                    div:nth-child(2){
                        height:27px;
                        width:5.6rem;
                        overflow:hidden;
                        ul{
                            li{
                                line-height:27px;
                                height:27px;
                                padding-left:.15rem;
                                overflow:hidden;
                                color:#3E475D;
                                font-size:.26rem;
                            }
                        }
                    }
                    .marquee_list{
                        display: block;
                        position: absolute;
                        top:0;
                        left: 0;
                    }
                    .marquee_top{transition: top 0.5s ;}
                }
            }
        }
        .list{
            padding-bottom:.1rem;
            border-top:.2rem solid #f5f5f5;
            .title{
                height:.88rem;
                width:6.9rem;
                margin:auto;
                display:flex;
                align-items:center;
                border-bottom:1px solid #e6e6e6;
                // span:nth-child(1){
                //     width:.08rem;
                //     height:.25rem;
                //     background:#527BEC;
                // }
                span:nth-child(1){
                    font-size:.32rem;
                }
                span:nth-child(2){
                    font-size:.28rem;
                    color:#a8aab2;
                    margin-left:auto;
                    padding-right:.25rem;
                    background:url(../assets/my_arrow.png) right center no-repeat;
                    background-size:.12rem .22rem;
                }
            }
            .getMore{
                text-align:center;
            }
        }
        .screen_bg{
            width:100%;
            height:100%;
            background:rgba(0,0,0,.5);
            z-index:51;
            top:0;
            bottom:0;            
            .contain{
                background:#fff;
                width:100%;
                top:2.08rem;
                left:0;
                position:absolute;
            }
            //推荐排序
            .tjpx{
                ul{
                    padding-left:.3rem;
                    li{
                        border-bottom:1px solid #e6e6e6;
                        line-height:.88rem;
                        font-weight:400;
                    }
                    li:last-child{
                        border:none;
                    }
                    li.cur{
                        color:#507DEF;
                    }
                }
            }
            //贷款类型
            .dklx{
                padding-bottom:.3rem;
                a{
                    float:left;
                    width:2.05rem;
                    line-height:.66rem;
                    text-align:center;
                    border:1px solid #e6e6e6;
                    border-radius:.08rem;
                    margin:.3rem 0 0 .3rem;
                }
                a.cur{
                    border-color:#507DEF;
                    color:#507DEF;
                }
            }
        }
    }
</style>
<style>
    .banner .swiper-pagination .swiper-pagination-bullet{
        background:url(../assets/swiper-pagination-bulle.png);
        width:.09rem;
        height:.04rem;
        opacity:1;
        background-size:.09rem .04rem;
    }
    .banner .swiper-pagination .swiper-pagination-bullet-active{
        width:.12rem;
        height:.12rem;
        border-radius:50%;
        background:url(../assets/swiper-pagination-bullet-active.png);
        background-size:.12rem .12rem;
        position:relative;
        top:.05rem;
    }
</style>