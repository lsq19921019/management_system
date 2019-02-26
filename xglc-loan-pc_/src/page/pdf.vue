<template>
  <div>
    <div class="pdf" v-loading.fullscreen.lock="fullscreenLoading">
      <iframe :height="height" :src="pdfBase"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfBase: "",
      height: "",
      id: "",
      fullscreenLoading: false,
    }
  },
  created() {
    this.autoHeight()
    this.getId()
  },
  mounted() {

  },
  methods: {
    autoHeight: function() {
      this.height = document.documentElement.clientHeight - 4 + "px"
    },
    getId: function() {
      this.id = this.$route.params.id
      this.postPDF()
    },
    postPDF: function() {
      var thatData = this
      thatData.fullscreenLoading = true;
      var data = {
        projectid: thatData.id,
        userRole: "1",
        protocolType: "1",
      }

      this.$http.post('/api/user/protocolPDFdown', this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.pdfBase = "data:application/pdf;base64," + resData.result
          } else if (resData.status == '-3') {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: 'error',
            })
            thatData.$router.push({ path: "/login" })
          } else {
            thatData.$alert('协议还未生成，请稍后再试', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.opener = null;
                window.close()
              }
            }).catch(action => {
              window.opener = null;
              window.close()
            });
          }
          setTimeout(() => {
            thatData.fullscreenLoading = false;
          }, 1500);
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  }
}

</script>
<style scoped>
iframe {
  display: block;
  width: 99.7%;
}

</style>
<style>
* {
  padding: 0;
  margin: 0;
  font-family: "微软雅黑", "Microsoft YaHei", Arial, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", sans-serif;
}

</style>
