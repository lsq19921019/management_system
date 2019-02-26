<template>
  <div>
    <div class="coupon_descrip">
      <p class="title in-padding">投资红包</p>
      <p class="text in-padding">如何使用：投资红包可在投资G自动服务和散标时使用，投资成功满标复审后会返现至用户小鸽理财账户余额；
        <br>使用条件：单次投资仅能使用一个投资红包且不能与其他优惠券同时使用；
        <br>使用投资红包需满足该投资红包的使用条件，具体条件见投资红包上标注；
        <br>如何获得：用户可通过新手活动或其他活动获得投资红包；
        <br>如何查看：用户可在APP"首页-我的优惠券-投资红包”中查看红包金额，使用条件等信息；
      </p>
      <p class="title in-padding">加息券</p>
      <p class="text in-padding">如何使用：加息券可在投资G自动服务和散标时使用，使用加息券后的项目可增加额外的年化收益；
        <br>使用条件：单笔投资只能使用一张加息券，且不能与其他优惠券同时使用，加息券使用一次后失效；使用加息券需满足该加息券使用条件，具体条件见加息券上标注；
        <br>加息券收益：使用加息券的项目，加息券收益将在该项目到期后一次性返还至用户小鸽理财账户余额；若G自动服务匹配的项目或散标债权转让成功则加息券失效并失去加息券收益。
        <br>
        （确认投资时显示的加息券收益金额为预计加息券收益，到期后实际获得的加息券收益金额以投资记录详情页面为准）
        <br>如何查看：用户可在APP"首页-我的优惠券-加息券"中查看加息券加息利率、使用条件等信息。
      </p>
      <p class="title in-padding">返现券</p>
      <p class="text in-padding">如何使用：返现券可在投资G自动服务时（不包括新手标和权益标）使用，投资成功满标复审后会按照投资金额的0.5%，注意返现金额是1的整数倍（比如当出借金额为1100元，则返现金额为5元）。
        <br>使用条件：返现券不能与其他优惠券同时使用，新手标、权益标、90天以下期限G自动服务和债权专区项目不能使用返现券；
        <br>加息券收益：使用加息券的项目，加息券收益将在该项目到期后一次性返还至用户小鸽理财账户余额；若G自动服务匹配的项目或散标债权转让成功则加息券失效并失去加息券收益。
        <br>如何查看：用户可在APP"首页-我的优惠券-返现券"中查看返现券可用金额等信息。
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
body {
  background: #f2f2f2;
}

.coupon_descrip .in-padding {
  padding-left: 5.3%;
  padding-right: 5.3%;
}

.coupon_descrip .title {
  font-size: 15px;
  line-height: 40px;
  color: #545454;
  border-bottom: 1px solid #f2f2f2;
  margin-top: 10px;
  background: #fff;
}

.coupon_descrip .text {
  font-size: 13px;
  line-height: 24px;
  color: #333;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 15px;
}
</style>
