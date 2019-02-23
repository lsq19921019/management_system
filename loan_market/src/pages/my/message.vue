<template>
    <div class="message">
        <div class="page_title">
            <p>我的消息</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <!-- 站内信列表 -->
        <div class="list" v-if="msgList.length > 0">
            <ul>
                <li v-for="(item,index) in msgList" :key="index" @click="goDetail(item.id)">
                    <div class="title"><span>{{ item.title }}</span><span v-if="item.status == false"><img src="../../assets/my/ico_wd.png" alt=""></span></div>
                    <div class="time">{{ item.releaseTimeDesc }}</div>
                </li>
            </ul>
            <div class="getMore tac">
                <more-loading v-if="pageNum <= totalPage && msgList.length != 0"></more-loading> 
                <span v-if="isShowListTips" class="fc2 fs28">没有更多了</span>
                <!-- <a href="javascript:;" @click="getList()" class="fc4 fs28">查看更多</a> -->
            </div>
        </div>
        <!-- 暂无站内信 -->
        <no-more v-if="msgList.length < 1" :tips="'暂未收到消息'"></no-more>
    </div>
</template>

<script>
    import noMore from '@/components/module/nomore';
    export default {
        data() {
            return {
                isShowLoading : true,
                msgList : [],
                totalPage : 0,
                pageNum : 1,
                isShowListTips : false,
                apiPath : {
                    msgList : '/api/message/mail_list',
                    notList : '/api/sysNotice/list'
                },
                isLoading : false,
            }
        },
        components : {
            noMore
        },
        created() {
            //this.getList();
            this.getListNotice();
        },
        mounted() {
            window.addEventListener('scroll', this.scrollBottom);  
        },
        methods : {
            //跳转文章详情
            goDetail(id) {
                location.href = '/msgDetail?id='+ id;
            },
            //获取站内信列表
            getList() {
                if(!localStorage.getItem('_token')) {
                    //return this.Base.setSourceUrl();
                    return this.$router.push({ name : 'Login' });
                } 
                let _this = this;
                let data = {
                    pageNum : _this.pageNum
                };
                _this.$ajax.post(_this.apiPath.msgList,_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(rs=>{
                    let res = rs.data;
                    if(res.status == 0) {
                        _this.msgList = [..._this.msgList,...res.result.list];  
                        _this.totalPage = res.result.pageEntity.totalPage; 
                        _this.pageNum += 1;                 
                    } else if(res.status == -100) {
                        _this.$router.push({ name : 'Login' });
                    } else {
                        _this.msgList = [];
                    }
                    _this.isShowLoading = false;
                    _this.isLoading = false;
                });
            },
            //获取平台公告列表
            getListNotice() {
                if(!localStorage.getItem('_token')) {
                    //return this.Base.setSourceUrl();
                    return this.$router.push({ name : 'Login' });
                } 
                let _this = this;
                let data = {
                    pageNum : _this.pageNum
                };
                _this.$ajax.post(_this.apiPath.notList,_this.$qs.stringify(data),{
                    headers : _this.Base.initAjaxHeader(1,{})
                }).then(rs=>{
                    let res = rs.data;
                    if(res.status == 0) {
                        _this.msgList = [..._this.msgList,...res.result.list];  
                        _this.totalPage = res.result.pageEntity.totalPage; 
                        _this.pageNum += 1;                 
                    } else if(res.status == -100) {
                        _this.$router.push({ name : 'Login' });
                    } else {
                        _this.msgList = [];
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
                        this.getListNotice();
                    }
                } else {
                    this.isShowListTips = true;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        padding-top:1.4rem;
        background:#fff;
        ul{
            padding:0 .32rem;
            li{
                height:1.4rem;
                line-height:1;
                border-bottom:1px solid #e6e6e6;
                overflow:hidden;
                .title{
                    padding-top:.3rem;
                    font-size:.32rem;
                    display:flex;
                    align-items:center;
                    span:nth-child(1){
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        max-width:5.8rem;
                    }
                    span:nth-child(2){
                        width:.64rem; 
                        margin-left:.13rem;  
                    }
                }
                .time{
                    color:#A8AAB3;
                    padding-top:.2rem;
                }
            }
            li:last-child{
                border:none;
            }
        } 
        .getMore{
            padding-bottom:.2rem;
        }
    }
</style>