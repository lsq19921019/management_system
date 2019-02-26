<template>
  <div>
    <div class="follow" :style="{'min-height':height}">
      <div class="top-tip"><img src="/static/img/follow_us_mini_01.png?v=1"></div>
      <div class="attention-way">
        <div class="way-title">
          <p>搜索关注</p>
        </div>
        <div class="way-center">
          <p>搜索【火凤凰快讯】，进入公众号，添加关注</p>
        </div>
      </div>
      <div class="attention-way" style="padding-bottom: 10.375rem">
        <div class="way-title">
          <p>小程序关联</p>
        </div>
        <div class="way-center">
          <p class="num"><span>1</span>点击右上角<img src="/static/img/follow_us_mini_02.png">【关于火凤凰快讯】</p>
          <p class="num"><span>2</span>查看【相关公众号】</p>
          <p class="num"><span>3</span>关注公众号【火凤凰快讯】</p>
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
@import "../style/css/follow_us_mini.css";

</style>
