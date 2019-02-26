<!--
    create : 田鹏伟 2018-9-10
    desc : 贷款首页
-->
<template>
    <div class="index">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <keep-alive><tab-bar :navIndex="1"></tab-bar></keep-alive> 
        <div class="page_title">
            <p>贷款</p>
        </div>
        <!-- 头部tabbar -->
        <nav>
            <ul>
                <li @click="handlerScreen(3)" :class="{ cur : isShowScreenMoney }"><span>{{ tabText3 }}</span><span></span></li>
                <li @click="handlerScreen(1)" :class="{ cur : isShowScreenRecommend }"><span>{{ tabText1 }}</span><span></span></li>
                <li @click="handlerScreen(2)" :class="{ cur : isShowScreenType }"><span>{{ tabText2 }}</span><span></span></li>
            </ul>
        </nav> 
        <!-- 消息通知 -->
        <div class="tips pof">
            <div>
                <span></span>
                <span class="fs22">据统计，申请五款以上产品，贷款成功率超过99%</span>
            </div>
        </div>
        <!-- 列表数据 -->
        <div class="list">
            <ul>
                <platform-item v-for="(item,index) in listData" :key="index" :item="item"></platform-item>
            </ul>
            <div class="getMore">
                <more-loading  v-if="pageNum <= totalPage && listData.length != 0"></more-loading> 
                <span v-if="isShowListTips" class="fc2 fs28">没有更多了</span>
            </div>
        </div>
        <!-- 筛选条件遮罩 -->
        <transition name="fadein">
            <div class="screen_bg pof" @click="offScreen($event)" v-show="isShowScreenRecommend || isShowScreenType || isShowScreenMoney">
                <!-- 推荐排序 -->
                <div class="dklx contain fs28" v-show="isShowScreenRecommend">
                    <a v-for="(item,index) in screen.sortType" :key="index" :class="{ cur : sortType==index+1 }" @click="handlerRecommend(item)">{{ item.value }}</a>
                </div>
                <!-- 贷款类型 -->
                <div class="dklx contain c fs28" v-show="isShowScreenType">
                    <a href="javascript:;"
                     :class="{ cur : loanType=='' }" @click="noLimit">不限</a>
                    <a href="javascript:;" 
                    v-for="(item,index) in screen.loanType" 
                    :key="index" @click="handlerType(index+1)" 
                    :class="{ cur : loanType==item.value }">{{ item.value }}</a>
                </div>
                <!-- 金额范围 -->
                <div class="dklx contain fs28" v-show="isShowScreenMoney">
                    <a v-for="(item,index) in screen.monescope" :key="index" :class="{ cur : monescope==index+1 }" @click="handlerMoney(item)">{{ item.value }}</a>
                </div>
            </div>
        </transition>
        <!-- 暂无站内信 -->
        <no-more v-if="listData.length < 1" :tips="'暂无平台'"></no-more>
    </div>
</template>

<script>
    import tabBar from '@/components/tab';
    import platformItem from '@/components/module/platform';
    import noMore from '@/components/module/nomore';
    export default {
        data() {
            return {
                apiPath : {
                    //列表
                    list : '/api/platform/list',
                    //条件
                    query_criteria : '/api/dict/pkey',
                    //平台详情
                },
                //是否显示加载中组件
                isShowLoading : true,
                //列表数据
                listData : [],
                //当前页
                pageNum : 1,
                //总页数
                totalPage : 0,
                //是否显示查看更多
                isShowGetMore : false,
                //是否显示推荐排序
                isShowScreenRecommend : false,
                //是否显示类型筛选
                isShowScreenType : false,
                isShowScreenMoney: false,
                //回传后端排序字段
                sortType : '1',
                //回传后端类型字段
                loanType : '',
                //回传后端类型字段
                monescope:'',
                //后端筛选条件
                screen : {
                    loanType : [],  //类型
                    sortType : [],  //推荐
                    monescope:[]    //金额范围
                },
                tabText1 : '推荐排序',
                tabText2 : '贷款类型',
                tabText3 : '金额范围',
                isLoading : false,
                isShowListTips : false,
            }
        },
        components : {
            tabBar, platformItem, noMore
        },
        mounted() {
            window.addEventListener('scroll', this.scrollBottom);            
        },
        created() {
            this.getQueryKeys(this);                      
            this.getList();           
        },
        beforeMount() {
        },
        methods : {
            //获取列表数据
            getList() {     
                let _this = this;                     
                let data = {
                    pageNum : this.pageNum,
                    loanType: this.loanType,
                    sortType: this.sortType,
                    amountType: this.monescope
                };
                if(arguments[0]) {
                   this.isShowGetMore = false;
                }               
                this.$ajax.post(this.apiPath.list,_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0 || result.status == -100) {  
                        _this.totalPage = result.result.pageEntity.totalPage;
                        if(_this.pageNum > _this.totalPage) {
                            
                        } else {
                            _this.listData = [ ..._this.listData, ...result.result.list ];
                        }
                        _this.pageNum += 1; 
                    } else {
                        // _this.$msg({ content : result.msg });                        
                    }
                    //解决一个问题，ios返回莫名出现遮罩层
                    window.scrollTo(0,1); 
                    window.scrollTo(0,0); 
                    _this.isShowLoading = false;
                    _this.isLoading = false;
               });
            },
            //获取查询条件
            getQueryKeys(_this) {
                this.$ajax.post(this.apiPath.query_criteria,_this.$qs.stringify({
                    pkeys : 'SYS_LOAN_TYPE,SYS_SORT_TYPE,SYS_LOAN_AMOUNT'
                }),{
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0) {
                        _this.screen.loanType = result.result.SYS_LOAN_TYPE;
                        _this.screen.sortType = result.result.SYS_SORT_TYPE;
                        _this.screen.monescope = result.result.SYS_LOAN_AMOUNT;
                    }
                });
            },
            //显示筛选条件
            handlerScreen(type) {
                if(type == 1) {
                     this.isShowScreenRecommend = true;
                     this.isShowScreenType = false;
                     this.isShowScreenMoney = false;
                }
                if(type == 2) {
                    this.isShowScreenRecommend = false;
                    this.isShowScreenMoney = false;
                    this.isShowScreenType = true;
                }
                if(type == 3){
                    this.isShowScreenMoney = true;
                    this.isShowScreenRecommend = false;
                    this.isShowScreenType = false;
                }
            },
            //点击推荐排序列表项
            handlerRecommend(item) {
                window.scrollTo(0,0);
                this.isShowListTips = false;
                this.listData = [];
                this.pageNum = 1;
                this.sortType = item.vkey;
                this.tabText1 = item.value;
                this.isShowScreenRecommend = false;
                this.isShowLoading = true; 
                this.getList(this);
            },
            //点击贷款类型列表项
            handlerType(index) {
                window.scrollTo(0,0);
                this.isShowListTips = false;
                this.listData = [];
                this.pageNum = 1;
                this.loanType = this.screen.loanType[index-1].value;
                this.tabText2 = this.screen.loanType[index-1].value;
                this.isShowLoading = true;
                this.isShowScreenType = false;  
                this.getList(this);
            },
            //点击金额范围列表项
            handlerMoney(item) {
                window.scrollTo(0,0);
                this.isShowListTips = false;
                this.listData = [];
                this.pageNum = 1;
                this.monescope = item.vkey;
                this.tabText3 = item.value;
                this.isShowLoading = true;
                this.isShowScreenMoney = false;  
                this.getList(this);
            },            
            //不限
            noLimit() {
                this.loanType = '';
                this.tabText2 = '贷款类型';
                this.listData = [];
                this.pageNum = 1;
                this.isShowLoading = true;
                this.isShowScreenType = false;  
                this.getList(this);
            },
            //点击空白关闭筛选
            offScreen(e) {
                if(e.target.className.indexOf('screen_bg') > -1) {
                    this.isShowScreenRecommend = false,
                    this.isShowScreenType = false;
                    this.isShowScreenMoney = false;
                }
            },
            //跳转平台详情页面
            goPlatformDetail(id) {
                this.$router.push({ name : 'PlatformDetail', params : { id : id } });
            },
            //滚动底部方法
            scrollBottom() {
                if(this.$route.path.indexOf('loan') < 0) return;
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(this.pageNum <= this.totalPage) {
                    if ((window.screen.height + sTop) >= (document.body.clientHeight) && !this.isLoading) { 
                        this.isLoading = true;
                        this.getList();
                    }
                } else {
                    this.isShowListTips = true;
                }
            },
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
        padding-bottom:1rem;
        padding-top:2.8rem;
        background:#fff;
        nav{
            position:fixed;
            width:100%;
            top:1.4rem;
            left:0;
            z-index:52;
            height:.48rem;
            padding:.2rem 0;
            background:#fff;
            ul{
                li{
                    height:.48rem;
                    width:32.3%;
                    float:left;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    span{
                        font-size:.28rem;
                    }
                    span:nth-child(2){
                        width:.149rem;
                        height:.09rem;
                        background:url(../../assets/dk_filter_arrow_normal.png);
                        background-size:.16rem .1rem;
                        margin-left:.08rem;
                        overflow: hidden;
                    }
                }
                li:nth-child(1){
                    border-right:1px solid #e6e6e6;
                }
                li:nth-child(2){
                    border-right:1px solid #e6e6e6;
                }                
                li.cur{
                    color:#507DEF;
                    span:nth-child(2){
                        background:url(../../assets/dk_filter_arrow_high.png);
                        background-size:.16rem .1rem;
                    }
                }
            }
        }
        .tips{
            top:2.273rem;
            width:100%;
            left:0;
            background:#DEEFFF;
            z-index:20;
            div{
                padding:0 .32rem;
                display:flex;
                height:.6rem;
                align-items:center;
                span:nth-child(1){
                    width:.26rem;
                    height:.24rem;
                    background:url(../../assets/dk_tips_icon.png) no-repeat;
                    background-size:.26rem .24rem;
                    margin-right:.06rem;
                }
                span:nth-child(2){
                    color:#668FF8;
                }
            }
        }
        .list{
            padding-bottom:.1rem;
            .getMore{
                text-align:center;
                padding-top:.1rem;
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