<template>
  <div>
      <header-table :curnav="1"></header-table>
      <!-- 分享弹窗 -->
    <div class="share-dom">
      <div class="share-top">
        <img src="/static/img/newsletter_index_08.png">
      </div>
      <div class="share-date">
        <p>{{shareDate}}</p>
      </div>
      <div class="share-title">
        <p v-html="shareTitle"></p>
      </div>
      <div class="share-content">
        <p v-html="shareContent"></p>
      </div>
      <div class="footer-border"></div>
      <div class="footer-2d">
        <p class="left">扫码关注<span>火凤凰快讯</span>公众号
          <br>获取更多全面互金资讯</p>
        <img class="right" src="/static/img/img-2d.png">
        <div style="clear:both;"></div>
      </div>
    </div>
    <div class="scroll-date padding">
      <p>2018年8月13日 星期一</p>
    </div>
    <div class="newsletter">
      <!-- <div class="newsletter-banner">
        <img src="/static/img/newsletter_index_07.png">
      </div> -->
      <div class="date-news" :class="{'import-news':news.highlight_color == '1'}" v-for="(news,index) in newsList" :key="index">
        <div class="date-line padding scroll-dom" v-if="news.firstNum == 1">
          <p>{{news.title_publish_time}}</p>
        </div>
        <div class="letter-card" v-else-if="news.firstNum == 0">
          <div class="letter-line" :class="{'after-line':index == newsList.length - 1}">
            <div class="time-line">
              <p>{{news.publish_time.split(" ")[1]}}</p>
            </div>
            <div class="letter-title">
              <p v-html="news.content"></p>
            </div>
            <div class="letter-content" @click="showTextDetail(index)">
              <p :class="{'omit':index == omitClass}" v-html="news.website"></p>
            </div>
            <div class="original" v-show="original">
              <a :href="news.source_url" class="original" v-if="news.source_url">查看原文</a>
            </div>
            <div class="news-like clear">
              <span class="like" :class="{'show-plus':news.clickStatus === 1}" @click="evaluation(news.id, 1, index)"><img class="like-inactivated" src="/static/img/newsletter_index_01.png?v=1" v-show="news.clickStatus === '' || news.clickStatus == '0'"><img class="like-activated" src="/static/img/newsletter_index_02.png?v=1" v-show="news.clickStatus == 1">{{news.up_counts}}</span>
              <span class="oppose" :class="{'show-plus':news.clickStatus === 0}" @click="evaluation(news.id, 0, index)"><img class="oppose-inactivated" src="/static/img/newsletter_index_03.png?v=1" v-show="news.clickStatus === '' || news.clickStatus == 1"><img class="oppose-activated" src="/static/img/newsletter_index_04.png?v=1" v-show="news.clickStatus == '0'">{{news.down_counts}}</span>
              <span class="share" @click="shareCavans(news.title_publish_time,news.content,news.website)"><img src="/static/img/newsletter_index_06.png?v=1">分享</span>
            </div>
          </div>
        </div>
      </div>
      <p class="no-more" v-show="isLastPage">没有更多快讯了</p>
      <transition name="share-alert">
        <div id="share-alert" v-show="shareAlert">
          <div class="block" @click="closeCavans()"></div>
          <div class="window" id="windows">
            <img :src="shareImg" id="shaImg">
          </div>
        </div>
      </transition>
    </div>
    <footer-table ref="footer"></footer-table>
  </div>
</template>
<script>
import footerTable from "../components/footer_table.vue";
import headerTable from "../components/header_table";
export default {
  data() {
    return {
      //classOmit: -1,
      //activeLike: -1,
      //activeOppose: -1,
      original: true,
      pageIndex: 1,
      newsList: [],
      evaluaList: [],
      omitClass: -1,
      postLock: true,
      isLastPage: false,
      shareAlert: false,
      shareDate: "",
      shareTitle: "",
      shareContent: "",
      shareImg: ""
    };
  },
  components: {
    footerTable,
    headerTable
  },
  created() {
    this.hideOriginal();
    this.postNewsData();
  },
  mounted() {
    //this.listenScroll();
    window.addEventListener("scroll", this.listenScroll);
    this.$refs.footer.activeInfor();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenScroll);
  },
  methods: {
    hideOriginal() {
      if (sessionStorage.getItem("miniPrograms")) {
        this.original = false;
      }
    },
    shareCavans(date, title, content) {
      let thatData = this;
      thatData.$refs.footer.shareLoading();
      thatData.shareDate = date;
      thatData.shareTitle = title;
      thatData.shareContent = content;

      setTimeout(function() {
        html2canvas(document.querySelector(".share-dom")).then(canvas => {
          thatData.shareAlert = true;
          thatData.shareImg = canvas.toDataURL();
          setTimeout(function() {
            let shaImg = document.querySelector("#shaImg");
            let windows = document.querySelector("#windows");
            console.log(shaImg.clientHeight);
            console.log(windows.clientHeight);
            if (shaImg.clientHeight > windows.clientHeight) {
              console.log("long");
              shaImg.style.width = "auto";
              shaImg.style.height = "100%";
              windows.style.width = shaImg.clientWidth + "px";
              shaImg.style.opacity = "1";
            } else {
              console.log("short");
              shaImg.style.width = "100%";
              shaImg.style.height = "auto";
              windows.style.height = shaImg.clientHeight + "px";
              shaImg.style.opacity = "1";
            }
          }, 100);
        });
      }, 50);
    },
    closeCavans() {
      let thatData = this;
      let shaImg = document.querySelector("#shaImg");
      let windows = document.querySelector("#windows");
      thatData.shareAlert = !thatData.shareAlert;
      shaImg.style.opacity = "0";
      shaImg.style.width = "100%";
      shaImg.style.height = "auto";
      windows.style.height = "73.96%";
      windows.style.width = "79.77%";
    },
    evaluation(id, clickType, index) {
      let thatData = this;
      //点赞
      let clickSt = thatData.newsList[index].clickStatus;
      //console.log(clickSt)
      if (clickSt === "") {
        //console.log("没点过")
        if (clickType == 1) {
          //console.log("没点过-点了赞")
          thatData.newsList[index].up_counts++;
          thatData.newsList[index].clickStatus = clickType;
        } else if (clickType == 0) {
          //console.log("没点过-点了踩")
          thatData.newsList[index].down_counts++;
          thatData.newsList[index].clickStatus = clickType;
        }
        thatData.postEvalua(id, clickType);
      } else if (clickSt == 0 || clickSt == 1) {
        //console.log('点过了')
        if (clickType == 1 && clickSt == 1) {
          //console.log("点过了-点了赞")
          thatData.newsList[index].up_counts--;
          thatData.newsList[index].clickStatus = "";
        } else if (clickType == 0 && clickSt == 0) {
          //console.log("点过了-点了踩")
          thatData.newsList[index].down_counts--;
          thatData.newsList[index].clickStatus = "";
        } else if (clickType == 1 && clickSt == 0) {
          //console.log("点过了踩-点了赞")
          thatData.newsList[index].down_counts--;
          thatData.newsList[index].up_counts++;
          thatData.newsList[index].clickStatus = clickType;
        } else if (clickType == 0 && clickSt == 1) {
          //console.log("点过了赞-点了踩")
          thatData.newsList[index].up_counts--;
          thatData.newsList[index].down_counts++;
          thatData.newsList[index].clickStatus = clickType;
        }
        thatData.postEvalua(id, clickType);
      }
    },
    showTextDetail(index) {
      let thatData = this;
      if (thatData.omitClass == index) {
        thatData.omitClass = -1;
      } else {
        thatData.omitClass = index;
      }
    },
    listenScroll() {
      let thatData = this;
      let sTop = $(window).scrollTop() + $(".header_table").height();
      thatData.showDateTip(sTop);
      let wScrollY = window.scrollY;
      let wInnerH = window.innerHeight;
      let bScrollH = document.body.scrollHeight;
      if (wScrollY + wInnerH >= bScrollH && wScrollY > 0) {
        if (thatData.postLock) {
          if (!thatData.isLastPage) {
            thatData.postLock = false;
            thatData.$refs.footer.loading();
            thatData.postNewsData();
          }
        }
      }
    },
    showDateTip(sTop) {
      $(".date-news .scroll-dom").each(function(i) {
        let h2Top = $(this).offset().top;
        if (h2Top - sTop < 0) {
          $(".scroll-date").css("display", "block");
          $(".scroll-date p").html(
            $(this)
              .children("p")
              .html()
          );
        }
        if (sTop < $(".header_table").height()) {
          $(".scroll-date").css("display", "none");
        }
      });
    },
    postEvalua(id, clickType) {
      let thatData = this;

      let data = {
        id: id,
        clickStatus: clickType
      };

      this.$http
        .post(
          base.apiStr + "/projects/changeTheNewsFlashCount.do",
          this.$qs.stringify(data),
          {
            headers: base.ajaxHeaderWithoutToken(data)
          }
        )
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
    },
    postNewsData() {
      let thatData = this;

      let data = {
        pageIndex: thatData.pageIndex,
        pageSize: 10
      };

      this.$http
        .post(
          base.apiStr + "/projects/newsFlashList.do",
          this.$qs.stringify(data),
          {
            headers: base.ajaxHeaderWithoutToken(data)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.resultCode == 600001) {
            for (var i = 0; i < resData.resultData.list.length; i++) {
              thatData.newsList.push(resData.resultData.list[i]);
            }
            if (resData.resultData.hasNextPage) {
              thatData.pageIndex = resData.resultData.nextPage;
            }
            if (resData.resultData.isLastPage) {
              thatData.isLastPage = resData.resultData.isLastPage;
            }
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
<style lang="css" scoped>
@import "../style/css/newsletter_index.css";
</style>
