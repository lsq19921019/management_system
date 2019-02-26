<template>
    <div>
        <header-table :curnav="2"></header-table>
        <div class="news_list">
            <dl v-for="(entity,index) in entityRets" :key="index">
                <a :href="entity.originUrl">
                    <dd>
                        <h1>{{entity.title}}</h1>
                        <p>{{entity.publishTime}}</p>
                    </dd>
                    <dt><img :src="entity.goodImg"></dt>
                </a>
            </dl>
        </div>
        <p class="no-more" v-show="totalPage * 1 < pageNum">没有更多好文了</p>
        <footer-table ref="footer"></footer-table>
    </div>
</template>

<script>
import footerTable from "../components/footer_table.vue";
import headerTable from "../components/header_table";
export default {
  data() {
    return {
      pageNum: 0,
      entityRets: [],
      totalPage: 1,
      postLock: true
    };
  },
  components: {
    footerTable,
    headerTable
  },
  created() {
    this.postGoodTextData();
  },
  mounted() {
    window.addEventListener("scroll", this.listenScroll);
    this.$refs.footer.activeInfor();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenScroll);
  },
  methods: {
    listenScroll() {
      let thatData = this;
      let sTop = $(window).scrollTop() + $(".header_table").height();
      let wScrollY = window.scrollY;
      let wInnerH = window.innerHeight;
      let bScrollH = document.body.scrollHeight;
      if (wScrollY + wInnerH >= bScrollH && wScrollY > 0) {
        if (thatData.postLock) {
          if (thatData.totalPage * 1 >= thatData.pageNum) {
            thatData.postLock = false;
            thatData.$refs.footer.loading();
            thatData.postGoodTextData();
          }
        }
      }
    },
    postGoodTextData() {
      let thatData = this;

      let data = {
        pageNum: thatData.pageNum + 1,
        pageSize: 10
      };

      this.$http
        .post(base.apiStr + "/projects/goodText.do", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response);
          let resData = response.data;

          if (resData.resultCode == 600001) {
            thatData.pageNum++;
            for (var i = 0; i < resData.resultData.entityRets.length; i++) {
              thatData.entityRets.push(resData.resultData.entityRets[i]);
            }
            thatData.totalPage = resData.resultData.pageEntity.totalPage;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
          thatData.postLock = true;
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
body,
html {
  background: #fff;
}
img {
  width: 100%;
}
ul,
li {
  list-style: none;
}
.news_list {
  margin-top: 3.79rem;
  padding: 0 2.085rem;
  background: #fff;
}
.news_list dl {
  height: 8.35rem;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 1.3rem;
  display: block;
}
.news_list dl a {
  display: block;
  height: 100%;
}
.news_list dl dd h1 {
  font-size: 1.335rem;
  color: #333;
  line-height: 1.875rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.news_list dl dd p {
  color: #666;
  padding-top: 0.835rem;
  font-size: 0.915rem;
  line-height: 1.25rem;
}
.news_list dt {
  float: right;
  width: 33.84%;
  height: 5.835rem;
  border-radius: 5px;
  overflow: hidden;
}
.news_list dd {
  float: left;
  width: 60%;
}
.news_list dl:last-child {
  border: none;
}
p.no-more {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  color: #ccc;
  position: relative;
}
</style>