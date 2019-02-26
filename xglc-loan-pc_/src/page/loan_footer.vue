<template>
  <div>
    <div class="footer">
      <p class="copyright">copyright©2018-2019 深圳市温馨港湾网络技术有限公司版权所有 | 备案号<a href="http://www.miit.gov.cn">粤ICP备14025100号-5</a>
      </p>
      <div class="icon-line">
        <!-- <logo-one src="https://kxlogo.knet.cn/seallogo.dll?sn=e17081144030068573cqng000000&size=0"></logo-one>
        <logo-two src="https://seal.wosign.com/tws.js"></logo-two> -->
        <div class="bottomIcp kx"></div>
        <div class="bottomIcp jm"></div>
        <div class="bottomIcp">
          <a href="http://www.miit.gov.cn" target="_blank"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  /*components: {
    'logo-one': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
      },
      props: {
        src: { type: String, required: true },
      },
    },
    'logo-two': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },*/
}

</script>
<style scoped>
.footer {
  text-align: center;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer .copyright {
  padding-top: 40px;
  padding-bottom: 20px;
  font-size: 14px;
  line-height: 26px;
  color: #c8c8c8;
}

.footer .copyright a {
  margin-right: 10px;
  margin-left: 10px;
  color: #3a85f6;
}

.footer .icon-line {
  padding-bottom: 45px;
}

.footer .icon-line .bottomIcp {
  display: inline-block;
  width: 103px;
  height: 38px;
  background: url(/static/img/bottomIcp.png)center center no-repeat;
  margin: 0 14px;
}

.footer .icon-line .bottomIcp.kx {
  background: url(/static/img/bottomIcp_kx.png)center center no-repeat;
  background-size: contain;
}

.footer .icon-line .bottomIcp.jm {
  background: url(/static/img/bottomIcp_jm.png)center center no-repeat;
  background-size: contain;
}

.footer .icon-line .bottomIcp a {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
