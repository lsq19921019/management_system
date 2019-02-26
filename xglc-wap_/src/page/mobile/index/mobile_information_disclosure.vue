<template>
    <div class="disclosure">
        <nav>
            <ul>
                <li 
                    :class="{'cur':componentName == 0}" 
                    @click="switchTab(0)">
                    <a href="javascript:;">备案信息</a><i></i>
                </li>
                <li 
                    :class="{'cur':componentName == 1}" 
                    @click="switchTab(1)">
                    <a href="javascript:;">组织信息</a><i></i>
                </li>
                <li 
                    :class="{'cur':componentName == 2}" 
                    @click="switchTab(2)">
                    <a href="javascript:;">重大事项</a><i></i>
                </li>
                <li 
                    :class="{'cur':componentName == 3}" 
                    @click="switchTab(3)">
                    <a href="javascript:;">收费标准</a><i></i>
                </li>
                <li 
                    :class="{'cur':componentName == 4}" 
                    @click="switchTab(4)">
                    <a href="javascript:;">承诺函</a><i></i>
                </li>
                <li 
                    :class="{'cur':componentName == 5}" 
                    @click="switchTab(5)">
                    <a href="javascript:;">其他信息</a><i></i>
                </li>
            </ul>
        </nav>
        <van-swipe @change="switchTab" ref="swipeCenter" :show-indicators="false" :loop="false" :duration="300">
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <baxx></baxx>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <organization></organization>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <matters></matters>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <charge-standard></charge-standard>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <commitment-letter></commitment-letter>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="component" :style="'height:' + centerTabHeight + 'px'">
                    <other></other>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import baxx from "./component_baxx"; //备案信息
import organization from "./component_organizational"; //组织信息
import matters from "./component_matters"; //重大事项
import chargeStandard from "./component_chargeStandard"; //收费标准
import commitmentLetter from "./component_commitmentLetter"; //承诺函
import other from "./component_other"; //承诺函

export default {
  data() {
    return {
      componentName: 0,
      centerTabHeight: 0
    };
  },
  components: {
    baxx,
    organization,
    matters,
    chargeStandard,
    commitmentLetter,
    other
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.setEmptyHeight();
  },
  methods: {
    setEmptyHeight() {
      //自动调节scroll盒子的高度
      this.centerTabHeight =
        document.documentElement.clientHeight -
        (document.documentElement.clientWidth / 750) * 100 * 1.1;
    },
    switchTab(index) {
      this.$refs.swipeCenter.swipeTo(index);
      this.componentName = index;
    }
  }
};
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.disclosure {
  font-size: 0.28rem;
  line-height: 1.2;
  color: #404451;
  background: #fff;
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    overflow-x: scroll;
    height: 0.9rem;
    border-bottom: 1px solid #ede9e9;
    background: #fff;
    ul {
      width: 10.2rem;
      li.cur {
        a {
          color: #ff5637;
        }
        i {
          display: block;
        }
      }
      li {
        float: left;
        height: 0.9rem;
        line-height: 0.9rem;
        width: 1.7rem;
        text-align: center;
        position: relative;
        a {
          color: #333;
        }
        i {
          display: none;
          position: absolute;
          width: 0.4rem;
          height: 2px;
          background: #ff5637;
          bottom: 0;
          left: 50%;
          margin-left: -0.2rem;
        }
      }
    }
  }
  .component {
    overflow: auto;
    margin-top: 0.9rem;
    border-top: 0.2rem solid #f2f2f2;
  }
}
</style>