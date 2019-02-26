<template>
  <div>
    <div class="about-xg">
      <div class="top-table">
        <div class="mui-row">
          <div :class="{
              'mui-col-xs-3': true,
              'active' : activeClass == 'gsjs'
          }" @click="switchTab('gsjs')">
            <a href="#gsjs">公司介绍</a>
          </div>
          <div :class="{
              'mui-col-xs-3': true,
              'active' : activeClass == 'ggxx'
          }" @click="switchTab('ggxx')">
            <a href="#ggxx">高管信息</a>
          </div>
          <div :class="{
              'mui-col-xs-3': true,
              'active' : activeClass == 'ptys'
          }" @click="switchTab('ptys')">
            <a href="#ptys">平台优势</a>
          </div>
          <div :class="{
              'mui-col-xs-3': true,
              'active' : activeClass == 'lxwm'
          }" @click="switchTab('lxwm')">
            <a href="#lxwm">联系我们</a>
          </div>
        </div>
      </div>
      <!-- 公司介绍 -->
      <div class="company-int" id="gsjs">
        <div class="module-title">
          <h5>公司介绍</h5>
        </div>
        <div class="company-info">
          <div class="mui-row">
            <div class="mui-col-xs-4">
              <div class="img-icon">
                <img src="/static/img/mobile_about_xg_01.png">
              </div>
              <div class="cen-text">
                <p>2013年</p>
              </div>
              <div class="foo-text">
                <p>成立时间</p>
              </div>
            </div>
            <div class="mui-col-xs-4">
              <div class="img-icon">
                <img src="/static/img/mobile_about_xg_02.png">
              </div>
              <div class="cen-text">
                <p>深圳</p>
              </div>
              <div class="foo-text">
                <p>总部</p>
              </div>
            </div>
            <div class="mui-col-xs-4">
              <div class="img-icon">
                <img src="/static/img/mobile_about_xg_03.png">
              </div>
              <div class="cen-text">
                <p>xiaogelicai.com</p>
              </div>
              <div class="foo-text">
                <p>官方网站</p>
              </div>
            </div>
          </div>
        </div>
        <div class="info-text">
          <p>小鸽理财成立于2013年12月，定位为专业从事房信贷撮合业务的网络借贷信息中介服务平台，由深圳市温馨港湾网络技术有限公司运营。实缴资本5000万元，总部位于深圳市南山区。自成立以来，小鸽理财秉持规范、安全、透明、诚信的经营准则，坚守合规稳健发展，为有资产的优质用户提供高效、透明、便捷的借贷撮合服务，满足其生意周转和消费需求，为普惠金融贡献自身力量。
          </p>
        </div>
      </div>
      <!-- 资质证书 -->
      <div class="certificate">
        <div class="module-title">
          <h5>资质证书</h5>
        </div>
        <div class="swiper swiper1">
             <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/18.jpg" preview="0" preview-text="等保三级证书" style="height:148px;"></dt>
                        <dd>等保三级证书</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/22.jpg" preview="0" preview-text="胡润新金融最具潜力企业" style="height:146px;"></dt>
                        <dd>胡润新金融最具潜力企业</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/19.jpg" preview="0" preview-text="开户许可证" style="height:146px;"></dt>
                        <dd>开户许可证</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/20.jpg" preview="0" preview-text="信用代码" style="height:140px;"></dt>
                        <dd>信用代码</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/21.jpg" preview="0" preview-text="营业执照" style="width:194px;position:relative;top:10px;"></dt>
                        <dd>营业执照</dd>
                    </dl>
                </swiper-slide>
            </swiper>
        </div>
        <div class="click-tips">
          <p>点击查看大图</p>
        </div>
      </div>
      <!-- 公司环境 -->
      <div class="surrounding">
        <div class="module-title">
          <h5>公司环境</h5>
        </div>
        <div class="swiper swiper2">
             <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/24.png" preview="1" preview-text="前台"></dt>
                        <dd>前台</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/25.png" preview="1" preview-text="员工风采"></dt>
                        <dd>员工风采</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/26.png" preview="1" preview-text="办公区域"></dt>
                        <dd>办公区域</dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dt><img src="./images/27.png" preview="1" preview-text="空中花园"></dt>
                        <dd>空中花园</dd>
                    </dl>
                </swiper-slide>
            </swiper>
        </div>
        <div class="click-tips">
          <p>点击查看大图</p>
        </div>
      </div>
      <!-- 高管团队 -->
      <div class="executive" id="ggxx">
        <div class="module-title">
          <h5>高管团队</h5>
        </div>
        <div class="executive-module clear">
          <div class="left-img">
            <img src="/static/img/mobile_about_xg_04.png" class="preview-img">
          </div>
          <div class="right-text">
            <p class="name">周翔</p>
            <p class="office">总裁</p>
            <p class="bewrite">曾任职于中国工商银行深圳分行及永亨银行（中国）总行资产管理部门，担任资产管理业务主负责人，超10年资产管理行业经验，深入金融资产研究。</p>
          </div>
        </div>
        <div class="executive-module clear">
          <div class="left-img">
            <img src="/static/img/mobile_about_xg_05.png">
          </div>
          <div class="right-text">
            <p class="name">李坚华</p>
            <p class="office">首席风控官</p>
            <p class="bewrite">曾任职于中国工商银行金融信贷部门，担任行长助理等核心岗位， 10余年金融信贷的从业经验，深谙金融风险管控。</p>
          </div>
        </div>
        <div class="executive-module clear">
          <div class="left-img">
            <img src="/static/img/mobile_about_xg_06.png">
          </div>
          <div class="right-text">
            <p class="name">彭磊</p>
            <p class="office">市场营销部总监</p>
            <p class="bewrite">曾担任中国工商银行深圳市分行机构金融资产托管业务负责人，近10年机构金融、资产托管、资产管理经验。深谙资本运作规律和企业融资需求及发展风险，累计运营资产规模近千亿。</p>
          </div>
        </div>
        <div class="executive-module clear no-b-b">
          <div class="left-img">
            <img src="/static/img/mobile_about_xg_07.png">
          </div>
          <div class="right-text">
            <p class="name">陈波</p>
            <p class="office">互联网总监</p>
            <p class="bewrite">曾就职于知名一线互金平台，担任平台用户运营、银行存管、产品优化等大型项目核心负责人。</p>
          </div>
        </div>
      </div>
      <!-- 平台优势 -->
      <div class="advantage" id="ptys">
        <div class="module-title">
          <h5>平台优势</h5>
        </div>
        <div class="mui-row" style="padding-top: 26px;">
          <div class="mui-col-xs-6">
            <div class="img-icon">
              <img src="/static/img/mobile_about_xg_08.png">
            </div>
            <div class="caption">
              <p>银行系管理团队</p>
            </div>
          </div>
          <div class="mui-col-xs-6">
            <div class="img-icon">
              <img src="/static/img/mobile_about_xg_09.png">
            </div>
            <div class="caption">
              <p>优质小额资产</p>
            </div>
          </div>
          <div class="mui-col-xs-6">
            <div class="img-icon">
              <img src="/static/img/mobile_about_xg_10.png">
            </div>
            <div class="caption">
              <p>领先技术风控</p>
            </div>
          </div>
          <div class="mui-col-xs-6">
            <div class="img-icon">
              <img src="/static/img/mobile_about_xg_11.png">
            </div>
            <div class="caption">
              <p>合规第一梯队</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 联系我们 -->
      <div class="contact-us" id="lxwm">
        <div class="module-title">
          <h5>联系我们</h5>
        </div>
        <div class="contact-line">
          <p><span class="line-header">全国服务热线</span><span class="line-content">400-700-4007</span></p>
          <p><span class="line-header">服务时间</span><span class="line-content">工作日9:00~18:30</span></p>
          <p><span class="line-header">客服邮箱</span><span class="line-content">kefu@xiaogelicai.com</span></p>
          <p><span class="line-header">微信公众号</span><span class="line-content">小鸽服务平台</span></p>
          <p><span class="line-header">官方网址</span><span class="line-content">www.xiaogelicai.com</span></p>
          <p><span class="line-header">邮编</span><span class="line-content">518000</span></p>
          <p><span class="line-header">公司地址</span><span class="line-content">深圳市南山区高新九道北理工创新大厦1202</span></p>
          <p><span class="line-header">品牌&商务合作&媒体采访</span><span class="line-content">pr@xiaogelicai.com</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1
      },
      activeClass: "gsjs"
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.$previewRefresh();
  },
  methods: {
    switchTab(str) {
      this.activeClass = str;
      var h = 0;
      if (str == "gsjs") {
        $("body,html").animate({ scrollTop: 0 }, 500);
      } else if (str == "ggxx") {
        h = $(".executive").offset().top;
        $("body,html").animate({ scrollTop: h - 45 }, 500);
      } else if (str == "ptys") {
        //
        h = $(".advantage").offset().top;
        $("body,html").animate({ scrollTop: h - 45 }, 500);
      } else if (str == "lxwm") {
        //
        h = $(".contact-us").offset().top;
        $("body,html").animate({ scrollTop: h - 45 }, 500);
      }
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/mobile_about_xg.css";
</style>
