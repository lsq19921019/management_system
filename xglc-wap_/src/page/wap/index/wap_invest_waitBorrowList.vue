<!--
    create : luofeifei 9-20
    desc : 待出借项目
-->
<template>
  <div id="waitBor">
    <div class="wait_top clearfloat">
      <div class="wait_info">
        <span>以下为本期G自动服务可能出借的借款项目。可能出借的项目类型：房信贷/小微企业经营贷/汽车租金贷</span>
        <router-link class="checkDetail" to="/intro_page">&nbsp;查看详情></router-link>
      </div>
      <div class="wait_line"></div>
      <ul>
        <li>项目名称</li>
        <li>借款期限</li>
        <li>借款金额(元)</li>
      </ul>
    </div>
    <div class="wait_list clearfloat">
      <ul>
        <li v-for="(item,index) in waitBorList" :key="index" @click="toDetail(item.borrowId)">
          <span>{{ item.title }}</span>
          <span>{{ item.deadline }}</span>
          <span>{{ item.borrowAmount }}</span>
        </li>
      </ul>
      <p class="load-more" v-show="pageNum < totalPage" @click="moreWaitBor()">点击加载更多</p>
      <p class="no-more" v-show="pageNum >= totalPage">没有更多数据了</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waitBorList: [],
      pageNum: 0, //当前页
      totalPage: 0 //总页数
    };
  },
  beforeDestroy() {
    this.hiddenRightApp();
  },
  created() {
    this.waitBor();
    this.state();
  },
  methods: {
    hiddenRightApp() {
      let _this = this;
      _this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenRightBarButton",
          transferData: {}
        },
        msg: "success"
      });
    },
    //待出借项目列表
    waitBor: function() {
      var that = this;
      let data = {
        templateId: this.$route.query.templateId,
        pageNum: 1
      };
      this.$http
        .post("/api/finance/waitBorrowList", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            that.waitBorList = resData.result.toLendBorrowEntityList;
            that.pageNum = resData.result.pageEntity.currentPage; //当前页
            that.totalPage = resData.result.pageEntity.totalPage; //总页数
          }
        });
    },
    //加载更多Loading
    moreWaitBor: function() {
      var that = this;
      let data = {
        templateId: this.$route.query.templateId,
        pageNum: that.pageNum * 1 + 1
      };
      this.$http
        .post("/api/finance/waitBorrowList", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            that.pageNum = resData.result.pageEntity.currentPage; //当前页
            that.totalPage = resData.result.pageEntity.totalPage; //总页数
            for (
              var i = 0;
              i < resData.result.toLendBorrowEntityList.length;
              i++
            ) {
              that.waitBorList.push(resData.result.toLendBorrowEntityList[i]);
            }
            console.log(that.pageNum);
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //跳转项目详情
    toDetail: function(borrowId) {
      this.$router.push({
        path: "/pro_det",
        query: { borrowId: borrowId, type: "1" }
      });
    },
    //说明
    state: function() {
      this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "showRightButtonAlert",
          transferData: {
            rightButtonText: "说明",
            messageText:
              "以下为本期G自动服务可能出借的借款项目，仅供参考，实际撮合结果以系统出借为准",
            closeButtonText: "知道了"
          }
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          //wap业务逻辑代码
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
#waitBor {
  ul li {
    list-style: none;
  }
  //  顶部固定
  .wait_top {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 999;
    .wait_line {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        border-bottom: 1px solid #ddd;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    .wait_info {
      font-size: 0.24rem;
      color: #aaa;
      padding: 0.3rem;
      background: #f2f2f2;
      line-height: 0.38rem;
      .checkDetail {
        color: #404451;
      }
    }
    ul {
      padding-right: 4.6%;
      height: 0.9rem;
      line-height: 0.9rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        border-bottom: 1px solid #ddd;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    ul li {
      float: left;
      font-size: 0.24rem;
      color: #909197;
      &:first-child {
        padding-left: 4.6%;
      }
    }
  }
  //  内容项
  .wait_list {
    padding-top: 2.2rem;
    ul {
      padding-left: 4.6%;
      background: #fff;
    }
    ul li {
      padding-right: 4.6%;
      height: 0.9rem;
      line-height: 0.9rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      span {
        &:nth-child(2) {
          position: absolute;
          left: 45%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
      }
      &::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        border-bottom: 1px solid #ddd;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      &:last-child {
        &::before {
          display: block;
          clear: both;
          content: "";
          visibility: hidden;
          height: 0;
        }
      }
    }
  }
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
p.load-more {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  color: #999;
  position: relative;
}

p.no-more {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  color: #ccc;
  position: relative;
}
</style>


