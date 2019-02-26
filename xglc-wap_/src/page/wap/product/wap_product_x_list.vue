<template>
  <div>
    <div class="x-list">
      <div class="center-borrow">
        <div class="in-padding">
          <ul>
            <li v-for="(planXData,index) in planXList" :key="index" @click="$router.push({path:'/invest_tenindex/' + planXData.planId })" :class="{'border-one-half-bottom':index!=planXList.length-1}">
              <p class="borrow-title">{{planXData.title}}<span v-if="planXData.templateId == 9" class="right-label">限投一次</span><span v-if="planXData.templateId == 9" class="right-label">100元起投</span></p>
              <div class="left-income">
                <span class="num">{{planXData.yield}}<span class="num-s" v-if="planXData.jxStatus == 1">{{planXData.jxYield}}</span></span>
                <span class="text">{{planXData.yieldText}}</span>
              </div>
              <div class="right-btn">
                <span class="mui-btn lock" v-if="planXData.status == -1 || planXData.status == 3 || planXData.status == 4 || planXData.status == 5 || planXData.status == 7">{{planXData.btnMiddleText}}</span>
                <span class="mui-btn" v-else>{{planXData.btnMiddleText}}</span>
                <span class="remain">剩余<span>{{planXData.remainAmount}}</span>元</span>
              </div>
              <div class="clear"></div>
              <span class="novice" v-if="planXData.templateId == 9"></span>
              <span class="income" v-if="planXData.templateId == 8"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      planXList: []
    };
  },
  created() {
    this.postList();
  },
  methods: {
    postList(type) {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/finance/planXList", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            if (type == 1) {
              thatData.planXList = [];
            }
            for (var i = 0; i < resData.result.list.length; i++) {
              thatData.planXList.push(resData.result.list[i]);
            }
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_product_x_list.css";
</style>
