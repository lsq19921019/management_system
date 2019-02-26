<template>
    <div class="content">
        <div class="con_top">
            <h1>{{details.title}}</h1>
            <p>{{details.dateStr}}</p>
        </div>
        <div class="con" v-html="details.context">
        </div>
        <footer-table ref="footer"></footer-table>
    </div>
</template>

<script>
import footerTable from "../components/footer_table.vue";
export default {
  data() {
    return {
      details: []
    };
  },
  components: {
    footerTable
  },
  created() {
    this.postDetail();
  },
  mounted() {
    this.$refs.footer.activePlatform();
  },
  methods: {
    postDetail() {
      let thatData = this;

      let data = {};

      this.$http
        .post(
          base.apiStr +
            "/platformDynamic/platformDetails/" +
            thatData.$route.params.detail +
            ".do",
          this.$qs.stringify(data),
          {
            headers: base.ajaxHeaderWithoutToken(data)
          }
        )
        .then(function(response) {
          //console.log(response);
          let resData = response.data;

          if (resData.resultCode == 600001) {
            thatData.details = resData.resultData;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.content {
  color: #333;
}
.con_top {
  box-shadow: 0 2px 5px 0 rgba(221, 221, 221, 0.5);
  padding: 0 5.2%;
  background: #fff;
}
.con_top h1 {
  font-size: 1.335rem;
  line-height: 1.875rem;
  padding: 0.835rem 0;
}
.con_top p {
  color: #666;
  line-height: 1.25rem;
  padding-bottom: 1rem;
}
.con {
  background: #fff;
  padding: 1.25rem 5.2%;
  margin-top: 1rem;
  font-size: 1.25rem;
  line-height: 1.79rem;
  padding-bottom: 2.5rem;
}
.con p {
  text-indent: 2.5rem;
  text-align: justify;
}
</style>
<style lang="css">
#app {
  padding-bottom: 4.1rem;
}
</style>