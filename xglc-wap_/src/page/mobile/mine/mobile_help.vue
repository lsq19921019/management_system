<template>
  <div>
    <div class="mobile-help">
      <div class="main-box" v-for="(help,index) in interlocutions" :key="index">
        <div class="clear"></div>
        <div class="tit"><span class="ask"></span>
          <p v-html="help.question"></p>
        </div>
        <div class="answer" v-html="help.answer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interlocutions: []
    };
  },
  mounted: function() {
    this.postData();
  },
  methods: {
    postData: function() {
      var that = this;

      var data = {
        planType: that.$route.query.id
      };

      this.$http
        .post("/api/help/interlocution", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response.data)
          let resData = response.data;
          if (resData.status == 0) {
            for (var i = 0; i < resData.result.interlocutions.length; i++) {
              let helpList = resData.result.interlocutions[i];
              that.interlocutions.push(helpList);
            }
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="css" scoped>
@import "../../../style/css/mobile_help.css";
</style>
