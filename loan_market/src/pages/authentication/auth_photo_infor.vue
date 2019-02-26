<!--
    create:luofeifei 10/25
    desc:照片资料
-->
<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <!--
            工作证明 到 其他 跳转链接为 /auth/uploadPhoto/0 到 /auth/uploadPhoto/10
            -->
        <div class="photo_list">
            <ul>
                <item-li v-for="(item,index) in photoList" :key='index' :name='item.name' :val='item.num' type='3' rcolor='#3E475D' @click.native="toPhoto(index)"></item-li>
            </ul>
        </div>
        <p class="photo_bom">可以上传保单、税单等资料</p>
    </div>
</template>

<script>
    import itemLi from '@/components/list/li'
    export default {
        name : 'PhotoInfor',
        data() {
            return {
                photoList:[]
            }
        },
        components : {
            //组件
            itemLi
        },
        created() {
            //页面渲染前
        },
        mounted() {
            //页面加载完毕
            this.photoData()
        },
        methods:{
            //跳转照片下载页面
            toPhoto(subType){
                this.$router.push({path:"/auth/uploadPhoto/"+subType})
            },
            // 图片资料接口
            photoData(){
                let _this = this;
                let data = {
                    userId:1211
                };
                this.$ajax.post('/api/userimg/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                })
                .then(res=>{
                    console.log(res)
                    if(res.status == '200'){
                        _this.photoList = res.data.result.fileItems;
                    }else{
                        console.log(res)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
    }
    .photo_list{background: #fff;}
    .photo_bom{
        font-size:.26rem;
        font-weight:500;
        color:rgba(168,170,178,1);
        padding: .33rem;     
    }
</style>