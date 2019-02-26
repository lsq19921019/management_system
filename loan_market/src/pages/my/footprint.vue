<template>
    <div class="footprint">
        <div class="page_title">
            <p>浏览足迹</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
         <!-- 加载中 -->
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <!-- 浏览列表 -->
        <div class="list">
            <ul>
                <platform-item v-for="(item,index) in listData" :key="index" :item="item"></platform-item>
            </ul>
        </div>
        <!-- 暂无浏览记录 -->
        <no-more v-if="listData.length < 1 && isShowLoading" :tips="'暂无浏览记录'"></no-more>
    </div>
</template>

<script>
    import platformItem from '@/components/module/platform';
    import noMore from '@/components/module/nomore';
    export default {
        name : 'Footprint',
        data() {
            return {
                isShowLoading : true,
                apiPath : {
                    list : '/api/browse/userlist',
                },
                listData : [
                    
                ],
                pageNum : 1
            }
        },
        components : {
            platformItem,noMore
        },
        created() {
            this.getList();
        },
        methods : {
            //获取列表数据
            getList() {  
                if(!localStorage.getItem('_token')) {
                    //return this.Base.setSourceUrl();
                    return this.$router.push({ name : 'Login' });
                }    
                let _this = this;                
                this.$ajax.post(this.apiPath.list,_this.$qs.stringify({}),{
                    headers: _this.Base.initAjaxHeader(1,{})
                }).then(res=>{
                    let result = res.data;
                    if(result.status == 0) {  
                        _this.listData = result.result;
                    } else if(result.status == -100){
                        return _this.$router.push({ name : 'Login' });
                    }
                    _this.isShowLoading = false;
               });
            }
        },

    }
</script>

<style lang="scss" scoped>
    .footprint{
        padding-top:1.4rem;
        .list{
            padding-bottom:.1rem;
        }
    }
</style>