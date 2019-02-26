<template>
  <div style="height:100%;">
    <div class="center" id="center">
      <div class="img">
        <img src="/static/img/404.png">
      </div>
      <div class="title">
        <p>抱歉,页面不见啦！</p>
      </div>
      <button onclick="javascript:history.back(-1)" class="back mui-btn">返回上一级</button>
      <button @click="$router.replace({ path: '/invest_index' })" class="footer mui-btn">返回首页</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.autoHeight()
  },
  methods: {
    autoHeight: function() {
      //console.log(document.documentElement.clientHeight)
      let height = document.documentElement.clientHeight - 345
      document.getElementsByClassName("center")[0].style.paddingBottom = height + "px"
    },
  }
}

</script>
<style scoped>
.center {
  height: 100%;
  background: #f2f2f2;
}

.center .img {
  padding-top: 62px;
  height: 118px;
  text-align: center;
}

.center .img img {
  height: 100%;
}

.center .title p {
  font-size: 14px;
  line-height: 50px;
  color: #999;
  text-align: center;
}

.center button {
  display: block;
  height: 40px;
  width: 37%;
  margin: 0 auto;
  outline: none;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  color: #fff;
  text-align: center;
}

.center .back {
  background: #ff5637;
  margin-top: 11px;
}

.center .footer {
  border: 1px solid #e6e6e6;
  background: #fff;
  color: #555;
  margin-top: 24px;
}

</style>
