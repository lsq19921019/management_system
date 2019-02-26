<!--
  create : dxc 2018-11-09
  desc : 关于我们-资质荣誉模块
  update : 
  desc : 
-->
<template>
  <div class="pro_det_img">
      <div class="padding_inner">
        <div class="mui-row">
          <div v-for="(imgList,index) in borrowImgEntities" :key="index" class="mui-col-xs-6 detail_img">
              <div class="img_box">
                <img :src="imgList.url" preview="0" :preview-text="imgList.name">
              </div>
              <p>{{imgList.name}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowImgEntities: []
    };
  },
  components: {},
  created() {
    this.chBg("#fff");
  },
  mounted() {},
  methods: {
    chBg: function(bg) {
      this.postData();
      document.body.style.backgroundColor = bg;
    },
    postData: function() {
      let that = this;

      var data = {
        borrowId: that.$route.query.borrowId
      };

      this.$http
        .post("/api/borrow/borrowImgList", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            that.borrowImgEntities = resData.result.borrowImgEntities;
            that.$previewRefresh();
          }
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.pro_det_img {
  .padding_inner {
    padding-left: 0.17rem;
    padding-right: 0.17rem;
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    .detail_img {
      box-sizing: border-box;
      padding-left: 0.13rem;
      padding-right: 0.13rem;
      padding-top: 0.19rem;
      .img_box {
        height: 2.2rem;
        overflow: hidden;
        border: 1px solid #eae7e7;
        img {
          width: 100%;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      p {
        font-size: 0.28rem;
        line-height: 0.67rem;
        color: #333;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>