<template>
  <div>
    <div class="center">
      <div class="title">
        <p>啊欧，你来到了未知的领域</p>
      </div>
      <div class="img">
        <img src="/static/img/404.gif">
      </div>
      <!-- <div class="text">
        <p>如果您在正常操作中来到了这里
          <br>请联系客服热线 4007-00-4007</p>
      </div>
      <button @click="windowGo" class="footer">点击这里回到我们的网页</button> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    this.chBg("#fff")
  },
  methods: {
    windowGo: function() {
      window.location.href = "/"
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg
    }
  }
}

</script>
<style>
.center .title {
  padding-top: 60px;
  height: 40px;
}

.center .title p {
  font-size: 16px;
  text-align: center;
  animation: title 0.08s infinite;
}

.center .img {
  height: 300px;
  position: relative;
}

.center .img img {
  height: 50%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  animation: img 1.6s linear infinite;
}

.center .text p {
  text-align: center;
  font-size: 12px;
  color: #999
}

.center .footer {
  display: block;
  outline: none;
  width: 89%;
  margin: 20px auto 0;
  height: 44px;
  font-size: 16px;
  border: none;
  border-radius: 22px;
  color: #fff;
  box-shadow: 0 0 20px rgba(255, 86, 55, 0.5);
  background: linear-gradient(left, #fe7229, #ff5637);
  text-align: center;
}

@keyframes title {
  0% {
    transform: translate(0, -15px);
  }
  50% {
    transform: translate(0, 30px);
  }
  100% {
    transform: translate(0, -15px);
  }
}

@keyframes img {
  0% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(30deg);
  }
}

</style>
