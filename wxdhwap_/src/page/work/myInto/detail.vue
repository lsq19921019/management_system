<template>
    <div>
        <el-row class="top-info">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p class="top-info-strong">{{wechatname}}</p>  
                    <p>{{wechatid}}</p>      
                </div>
            </el-col>
            <el-col :span="8" style="line-height:40px">
                <div class="grid-content bg-purple-light">
                    <span>{{deliverytime}}</span>
                    <span>{{position|formattPostion}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>{{deliverystate|formattDeliverystate}}</p>  
                    <p>{{updatetime}}</p> 
                </div>
            </el-col>
        </el-row>
        <!--投放信息组件-->
        <publish-form :publishData ="publishData" v-show="checkRights.publish.state"></publish-form>
        <!--效果信息组件-->
        <effect-form :effectData ="effectData" v-show="checkRights.effect.state"></effect-form>
        <!--文章组件-->
        <article-table :articleData ="articleData" 
                       :wechatNo="wechatname"
                       :wechatId="wechatid"
                       v-show="checkRights.article.state">
        </article-table>
        <!--记录组件-->
        <record :recordData ="recordData"
                @paginationCurrentPage="getCurrentPage" 
                @paginationPageSize="getPageSize"
                v-show="checkRights.record.state"></record>
    </div>
</template>
<script>
import {
  leftOutNull,
  mergePrivateKey,
  valFixedTel,
  valMoveTel
} from "@/config/mUtils";
import {
  publishInto,
  queryWechatArticle,
  getLogger,
  checkRights
} from "@/service/getData";
import {roleCheckRights} from '@/utils/index.js';
import publishForm from "./publishForm.vue";
import effectForm from "./effectForm.vue";
import articleTable from "./article.vue";
import record from "./record.vue";
import $ from "jquery";
export default {
  data() {
    return {
      sizeForm: "mini",
      detailDisabled: true,
      btnStatus: true,
      isPublishShow: true, //是否显示投放信息
      isArticleShow: true, //是否显示文章信息
      isRecordShow: true, //是否显示记录
      inputWidth: {
        width: "50%"
      },
      dsoptions: [
        { value: 1, label: "硬广" },
        { value: 2, label: "软广" },
        { value: 3, label: "贴图" },
        { value: 4, label: "其他" }
      ],
      pageIndex: 1,
      pageSize: 10,
      wechatname: "", //微信号名称
      wechatid: "", //wechatid
      position: "", //文章位置
      updatetime: "",
      deliverytime: "",
      deliverystate: "",
      publishData: "",
      effectData: "",
      articleData: "",
      recordData: "",
      saveData: "",
      checkRights: {
            publish:{
                url: '/delivery/findWechatDeliveryList',
                state: true
            },
            effect:{
                url: '/delivery/queryWechatDelivery',
                state: true
            },
            article:{
                url: '/delivery/queryWechatArticle',
                state: true
            },
            record:{
                url: '/logmanage/query',
                state: true
            }
        }
    };
  },
  components: {
    publishForm,
    effectForm,
    articleTable,
    record
  },
  filters: {
    formattPostion(val) {
      if (val == "1") {
        return "头条";
      } else if (val == "2") {
        return "次条";
      } else {
        let fp = val + "条";
        return fp;
      }
    },
    formattDeliverystate(val) {
      if (val == "1") {
        return "预备投放";
      } else if (val == "2") {
        return "完成投放 ";
      } else if (val == "3") {
        return "正在投放";
      } else if (val == "4") {
        return "投放失败";
      }
    }
  },
  mounted() {
    this.initPublishInfo(this.$route.query.wid);
    this.initQueryWechatArticle(this.$route.query.wid);
    // roleCheckRights(this.checkRights);

  },
  methods: {
    //初始数据
    async initPublishInfo(wid) {
      let result = await publishInto({ id: wid });
      if (result.data == "-3") {
        //登陆态失效
        this.$message.error(result.message);
        setTimeout(function() {
          window.location.href = "./login";
        }, 1000);
      }
      if (result.resultCode == "600001") {
        let pdata = result.resultData;
        this.wechatname = pdata.wechatname;
        this.wechatid = pdata.wechatids;
        this.position = pdata.position;
        this.deliverystate = pdata.deliverystate;
        this.deliverytime = pdata.deliverytime;
        this.updatetime = pdata.updatetime;
        this.publishData = pdata;
        this.effectData = pdata;
        this.initGetLogger(this.wechatid);
      }
    },
    // //查询权限
    // async checkRights(url) {
    //   let result = await checkRights({ roleMenu: url });
    //   if (url == "/delivery/findWechatDeliveryList") {
    //     this.isPublishShow = result.success; //是否显示投放信息
    //   } else if (url == "/delivery/queryWechatDelivery") {
    //     this.isArticleShow = result.success; //是否显示文章信息
    //   } else if (url == "/delivery/queryWechatArticle") {
    //     this.isRecordShow = result.success; //是否显示记录
    //   }
    // },
    //文章
    async initQueryWechatArticle(wid) {
      let result = await queryWechatArticle({ id: wid });
      if (result.data == "-3") {
        //登陆态失效
        this.$message.error(result.message);
        setTimeout(function() {
          window.location.href = "./login";
        }, 1000);
      }
      if (result.resultCode == "600001") {
        let arr = new Array();
        arr[0] = result.resultData;
        this.articleData = arr;
      }
    },
    //记录
    async initGetLogger(wid) {
      let result = await getLogger(this.pageModel(wid));
      if (result.data == "-3") {
        //登陆态失效
        this.$message.error(result.message);
        setTimeout(function() {
          window.location.href = "./login";
        }, 1000);
      }
      if (result.success == true) {
        this.recordData = result.data;
      }
    },
    //请求参数
    pageModel(wechatid, pageIndex, pageSize) {
      let model = {
        wechatId: this.wechatid,
        pageIndex: pageIndex || this.pageIndex,
        pageSize: pageSize || this.pageSize
      };
      return model;
    },
    //获取子组件传出来的页面参数
    getCurrentPage(val) {
      this.pageIndex = val;
      this.initGetLogger(this.pageModel("", this.pageIndex));
    },
    //获取子组件传出来的页面参数
    getPageSize(val) {
      this.pageSize = val;
      this.initGetLogger(this.pageModel("", "", this.pageSize));
    }
  }
};
</script>
<style lang="scss" scoped>
.top-info {
  color: #5a5e66;
  padding: 20px 30px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.top-info-strong {
  font-weight: bold;
  font-size: 16px;
}
.top-info span {
  margin-right: 10px;
}
</style>

