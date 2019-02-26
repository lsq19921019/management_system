<template>
  <div>
    <div class="debt-activity">
      <div class="img-line">
        <img src="/static/img/mobile_debt_activity_01.png">
      </div>
      <div class="img-line">
        <img src="/static/img/mobile_debt_activity_02.png">
        <div class="btn-line">
          <img @click="guide()" src="/static/img/mobile_debt_activity_05.png">
        </div>
      </div>
      <div class="img-line">
        <img src="/static/img/mobile_debt_activity_03.png">
        <div class="btn-line">
          <img @click="goInest()" src="/static/img/mobile_debt_activity_06.png">
        </div>
      </div>
      <div class="img-line">
        <img src="/static/img/mobile_debt_activity_04.0.3.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    guide: function() {
      location.href = "/debt_guide";
    },
    goInest: function() {
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "goToBorrowList",
          transferData: {
            productTypeIndex: "1" //要跳转到产品列表打开的产品类型table，以目前app产品类型为例，定存宝x为1、散标为2、债权为3，排序不受产品名称更换增减影响。示例为跳转到定存宝x。
          }
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          location.href = "/invest_index";
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/mobile_debt_activity.css";
</style>
