<template>
  <div>
    <div class="follow" :style="{'min-height':height}">
      <div class="top-tip"><img src="/static/img/follow_us_01.png"></div>
      <div class="public-num">
        <p class="public-title">复制微信公众号</p>
        <input class="num-text" value="hfhkx1" readonly="text" type="text">
      </div>
      <div class="code-2d">
        <p class="code-tips">长按下图二维码进行识别，关注微信公众号，获取更多维权帮助和行业独家资讯</p>
        <div class="img-2d">
          <img src="/static/img/img-2d.png">
        </div>
      </div>
      <div class="disclaimer">
        <p class="disclaimer-title">免责声明</p>
        <p class="disclaimer-content">本网站所载信息内容均为用户举报或第三方提供，不作为投资参考，如有侵权，请及时联系我们</p>
      </div>
    </div>
    <footer_table ref="footer"></footer_table>
  </div>
</template>
<script>
import footerTable from '../components/footer_table.vue'
export default {

  data() {
    return {
      height: "",
    }
  },
  components: {
    "footer_table": footerTable,
  },
  mounted() {
    this.autoBg()
    this.$refs.footer.activeUs()
  },
  methods: {
    autoBg: function() {
      this.height = (document.documentElement.clientHeight - 54.5) + "px"
    },
  },
}

</script>
<style lang="css" scoped>
@import "../style/css/follow_us.css";

</style>
