<!--
    create : 田鹏伟 2018-9-10
    desc : 平台分类
-->
<template>
    <div class="c">
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <!-- 导航栏 -->
        <div class="page_title">
            <p v-html="pageConfig[pageType-1].title"></p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <!-- banner -->
        <div class="banner">
            <img :src="pageConfig[pageType-1].bannerSrc" alt="">
        </div>
        <!-- 平台列表 -->
        <div class="list">
            <ul>
                <platform-item v-for="(item,index) in listData" :key="index"  :item="item"></platform-item>
            </ul>
            <div class="getMore" v-if="listData.length > 0">
                <more-loading  v-if="pageNum <= totalPage && listData.length != 0"></more-loading> 
                <span v-if="isShowListTips" class="fc2 fs28">没有更多了</span>
            </div>
        </div>
    </div>
</template>

<script>
    import platformItem from '@/components/module/platform';
    export default {
        name : 'Classification',
        data() {
            return {
                isShowLoading : true,
                isLoading : false,
                //页面配置
                pageConfig : [
                    {
                        title : '高通过率',
                        bannerSrc : require('../../assets/main/banner1.png')
                    },
                    {
                        title : '大额低息',
                        bannerSrc : require('../../assets/main/banner2.png')
                    },
                    {
                        title : '闪电放款',
                        bannerSrc : require('../../assets/main/banner3.png')
                    },
                    {
                        title : '新上平台',
                        bannerSrc : require('../../assets/main/banner4.png')
                    }
                ],
                //页面类型参数 1-高通过率，2-大额低息，3-闪电放款，4-新上平台
                pageType : this.$route.params.class,
                //接口地址
                apiPath : {
                    //zone : '/api/platform/zone/new'
                    zone : '/api/platform/zone'
                },
                //当前页码
                pageNum : 1,
                //总页数
                totalPage : 0,
                //平台数据
                listData : [],
                //是否显示'没有更多了'提示
                isShowListTips : false

            }
        },
        components : {
            platformItem
        },
        created() {
            this.getList();
        },
        mounted() {
            window.addEventListener('scroll', this.scrollBottom);
        },
        methods : {
            //获取数据
            getList() {      
                let _this = this;                     
                let data = {
                   pageNum : this.pageNum,
                   zoneType : this.pageType
                };                              
                this.$ajax.post(this.apiPath.zone,_this.$qs.stringify(data),{
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
                        _this.$msg({ content : result.msg });
                    }
                    _this.isShowLoading = false;
                    _this.isLoading = false;
               });
            },
            //滚动底部方法
            scrollBottom() {
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
        }
    }
</script>

<style lang="scss" scoped>
    .c{
        background:#fff;
        .banner{
            margin-top:1.38rem;
        }
        .list{
            padding-bottom:.1rem;
            .getMore{
                text-align:center;
            }
        }
    }
</style>