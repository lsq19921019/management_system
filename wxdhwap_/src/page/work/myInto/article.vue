<template>
    <div class="detail-info-con">
        <p class="detail-title">文章信息</p>
        <div class="info-box">
            <el-table
                :data="articleData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="300">
                    <template slot-scope="scope">
                        <a v-bind:href="scope.row.sourceUrl" target="_blank" class="wechatNameLink"><p>{{scope.row.title}}</p></a>
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布位置"
                    >
                    <template slot-scope="scope">
                        {{scope.row.advertisementNum | formattPostion}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="publistTime"
                    width="200"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    prop="readNum"
                    label="阅读">
                </el-table-column>
                <el-table-column
                    prop="likeNum"
                    label="点赞">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button @click="viewDetail(scope.row.id)" type="text" size="small">详情</el-button> -->
                        <router-link :to="{path:'/trackDetail',query:{articleId:scope.row.id,name:wechatNo,wechatNo:wechatId}}" target="_blank" class="myIntoLink">
							详情
						</router-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    props:['articleData','wechatNo','wechatId'],
    data() {
    return {
        }
    },
    watch:{
        tableData(){
            // this.tableData = this.articleData;
        }
    },
    filters:{
        formattPostion(val){
            if(val == '1'){
                return '头条';
            }else if(val == '2'){
                return '次条';
            }else{
                let fp = val + '条';
                return fp;
            }
        },
    },
    mounted(){
    },
    methods:{
        viewDetail(id){

        }
    }
}
</script>
<style lang="scss" scoped>
.detail-info-con{
    width: 970px;
    margin-left: 30px;
}
.detail-title{
    font-weight: bold;
    font-size: 15px;
    color: #5a5e66;
    padding: 20px 30px;
}
.info-box{
    border: 1px solid #ccc;
    border-radius: 3px;
}
.info-box-style{
    color: #5a5e66;
    padding: 10px 30px;
    font-size: 14px;
}
  .wechatNameLink{
	color: #5a5e66;
  }
</style>