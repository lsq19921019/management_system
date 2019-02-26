<template>
  <div>
    <div class="problem-plat">
      <div class="top-table">
        <div class="mui-row">
          <div class="mui-col-xs-6" @click="timeTable = true,nameTable = false,switchTable(0)" :class="{'active' : timeTable}">
            <span>按时间排序</span>
          </div>
          <div class="mui-col-xs-6" @click="timeTable = false,nameTable = true,switchTable(1)" :class="{'active' : nameTable}">
            <span>按名称排序</span>
          </div>
        </div>
      </div>
      <div class="content-table">
        <div class="time-table" v-show="timeTable">
          <div class="time-table-bg">
            <div class="total-platform">
              <p>共{{totalPlatforms}}家问题平台</p>
            </div>
            <div class="time-list">
              <div class="date-line" v-for="(time,index) in timeList" :key="time.problemDate" :class="{'first-date-line':index == 0}">
                <div class="date-ymd">
                  <p><span class="list-style"><span class="style-center"></span></span><span class="ymd">{{time.problemDate}}</span><span class="total-num"><span class="num">{{time.porblemCount}}</span>家问题平台</span>
                  </p>
                </div>
                <div class="plat-line" v-for="line in time.list" :key="line.platformName">
                  <p @click="toDetials(line)"><span class="plat-name">{{line.platformName}}</span><span class="plat-status">{{line.problem}}<img src="/static/img/problem_platform_04.png"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="name-table" v-show="nameTable">
          <div id='list' class="mui-indexed-list">
            <div class="mui-indexed-list-search mui-input-row mui-search" style="display: none;">
              <input type="search" class="mui-input-clear mui-indexed-list-search-input">
            </div>
            <div class="mui-indexed-list-bar">
              <a>A<span></span></a>
              <a>B<span></span></a>
              <a>C<span></span></a>
              <a>D<span></span></a>
              <a>E<span></span></a>
              <a>F<span></span></a>
              <a>G<span></span></a>
              <a>H<span></span></a>
              <a>I<span></span></a>
              <a>J<span></span></a>
              <a>K<span></span></a>
              <a>L<span></span></a>
              <a>M<span></span></a>
              <a>N<span></span></a>
              <a>O<span></span></a>
              <a>P<span></span></a>
              <a>Q<span></span></a>
              <a>R<span></span></a>
              <a>S<span></span></a>
              <a>T<span></span></a>
              <a>U<span></span></a>
              <a>V<span></span></a>
              <a>W<span></span></a>
              <a>X<span></span></a>
              <a>Y<span></span></a>
              <a>Z<span></span></a>
            </div>
            <div class="mui-indexed-list-alert"></div>
            <div class="mui-indexed-list-inner">
              <ul class="mui-table-view">
                <li v-for="name in nameList.list" :key="name.firstPingYin">
                  <div :data-group="name.firstPingYin" class="mui-table-view-divider mui-indexed-list-group list-initials">{{name.firstPingYin}}</div>
                  <div class="plat-item-list">
                    <div class="mui-table-view-cell mui-indexed-list-item border-one-half-bottom plat-item" v-for="item in name.list" :key="item.platformName" @click="toDetials(item)">{{item.platformName}}<span class="status">{{item.problem}}</span></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer_table ref="footer"></footer_table>
  </div>
</template>
<script>
import footerTable from "../components/footer_table.vue";
export default {
  data() {
    return {
      timeTable: true,
      nameTable: false,
      totalPlatforms: "",
      timeList: [],
      nameList: {},
      pageIndex: 0,
      totalPage: -1,
      postLock: true
    };
  },
  components: {
    footer_table: footerTable
  },
  created() {
    this.postPlatTimeList();
    this.postPlatNameList();
    this.reloadTable();
  },
  mounted() {
    $("#app").css({
      paddingBottom: "4.1rem"
    });
    window.addEventListener("scroll", this.listenScroll);
    //this.$refs.footer.loading();
    this.$refs.footer.activePlatform();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenScroll);
  },
  methods: {
    listenScroll() {
      let thatData = this;
      let wScrollY = window.scrollY;
      let wInnerH = window.innerHeight;
      let bScrollH = document.body.scrollHeight;
      if (wScrollY + wInnerH >= bScrollH && wScrollY > 0) {
        if (thatData.postLock) {
          if (thatData.pageIndex <= thatData.totalPage) {
            thatData.postLock = false;
            thatData.$refs.footer.loading();
            thatData.postPlatTimeList();
          }
        }
      }
    },
    reloadTable() {
      let thatData = this;
      if (localStorage.getItem("problemData") == "namePlat") {
        thatData.timeTable = false;
        thatData.nameTable = true;
        thatData.setListRestart();
      }
    },
    switchTable(index) {
      let thatData = this;
      if (index == 0) {
        localStorage.setItem("problemData", "timePlat");
      } else if (index == 1) {
        localStorage.setItem("problemData", "namePlat");
        thatData.setListRestart();
      }
    },
    toDetials(l) {
      let thatData = this;
      localStorage.setItem("platDetails", JSON.stringify(l));
      thatData.$router.push({ path: "/plat_details" });
    },
    setListRestart() {
      setTimeout(function() {
        let topTable = document.querySelector(".top-table");
        let footTable = document.querySelector(".footer");
        let list = document.getElementById("list");
        //calc hieght
        list.style.height =
          document.body.offsetHeight -
          topTable.offsetHeight -
          1 -
          footTable.offsetHeight +
          "px";
        //create
        window.indexedList = new mui.IndexedList(list);
        $(".mui-indexed-list-bar span").css(
          "width",
          $(".mui-indexed-list-bar a").css("height")
        );
      }, 300);
    },
    postPlatTimeList() {
      let thatData = this;

      let data = {
        orderRule: 0,
        pageIndex: thatData.pageIndex + 1
      };

      this.$http
        .post(
          base.apiStr + "/projects/projectsList.do",
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
              thatData.timeList.push(resData.resultData.list[i]);
            }
            thatData.pageIndex = resData.resultData.pageEntity.currentPage * 1;
            thatData.totalPage = resData.resultData.pageEntity.totalPage * 1;
            thatData.totalPlatforms = resData.resultData.totalPlatforms;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
          thatData.postLock = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postPlatNameList() {
      let thatData = this;

      let data = {
        orderRule: 1
      };

      this.$http
        .post(
          base.apiStr + "/projects/projectsList.do",
          this.$qs.stringify(data),
          {
            headers: base.ajaxHeaderWithoutToken(data)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.resultCode == 600001) {
            thatData.nameList = resData.resultData;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="css" scoped>
@import "../style/css/problem_platform.css";
</style>
<style>
.mui-indexed-list {
  border-top: none;
  border-bottom: none;
}

.mui-ios .mui-indexed-list-group,
.mui-ios .mui-indexed-list-item,
.mui-ios .mui-indexed-list-empty-alert {
  padding-left: 2.165rem;
}

.mui-indexed-list-group {
  background: #f2f2f2;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.mui-table-view-divider:before {
  display: none;
}

.mui-table-view-divider:after {
  display: none;
}

.mui-table-view:before {
  display: none;
}

.mui-table-view:after {
  display: none;
}

.mui-indexed-list-bar {
  background: none;
  width: 55px;
  padding-top: 12px;
}

.mui-indexed-list-bar.active {
  background: none;
}

.mui-indexed-list-bar a {
  font-size: 1.085rem;
  color: #c4c4c4;
  position: relative;
  z-index: 0;
}

.mui-indexed-list-bar a span {
  display: block;
  width: auto;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.mui-indexed-list-bar a.active {
  color: #fff !important;
  /*background: #ff8445;*/
  border-radius: 50%;
}

.mui-indexed-list-bar a.active span {
  background: #ff8445;
}
</style>
