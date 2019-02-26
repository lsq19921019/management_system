<template>
  <div>
    <div class="reg-auth">
      <div class="auth-line" @click="auth1 = !auth1">
        <div class="in-padding clear">
          <div class="left-img">
            <div class="img-broder">
              <img src="/static/img/mobile_regula_authority_01.png">
            </div>
          </div>
          <div class="right-text">
            <h5>中国银监会</h5>
            <p>中国银行业监督管理委员会(简称银监会，CBRC)成立于2003年4月25日，是国务院直属正部级事业单位。</p>
          </div>
        </div>
      </div>
      <div class="auth-line" @click="auth2 = !auth2">
        <div class="in-padding clear">
          <div class="left-img">
            <div class="img-broder">
              <img src="/static/img/mobile_regula_authority_02.png">
            </div>
          </div>
          <div class="right-text">
            <h5>工信部</h5>
            <p>中华人民共和国工业和信息化部(简称工信部)是国务院的直属部门，主要职责为拟订实施行业规划、产业政策和标准</p>
          </div>
        </div>
      </div>
      <div class="auth-line" @click="auth3 = !auth3">
        <div class="in-padding clear">
          <div class="left-img">
            <div class="img-broder">
              <img src="/static/img/mobile_regula_authority_03.png">
            </div>
          </div>
          <div class="right-text">
            <h5>国家互联网信息办公室</h5>
            <p>2011年5月，经国务院同意，设立国家互联网信息办公室。国家互联网信息办公室的主要职责包括</p>
          </div>
        </div>
      </div>
      <div class="auth-line" @click="auth4 = !auth4">
        <div class="in-padding clear">
          <div class="left-img">
            <div class="img-broder">
              <img src="/static/img/mobile_regula_authority_04.png">
            </div>
          </div>
          <div class="right-text">
            <h5>国家工商总局</h5>
            <p>中华人民共和国国家工商行政管理总局（简称国家工商总局)是中华人民共和国国务院主管市场监督管理</p>
          </div>
        </div>
      </div>
      <div class="auth-line" @click="auth5 = !auth5">
        <div class="in-padding clear" style="border-bottom: none;">
          <div class="left-img">
            <div class="img-broder">
              <img src="/static/img/mobile_regula_authority_05.png">
            </div>
          </div>
          <div class="right-text">
            <h5>深圳市金融办</h5>
            <p>深圳市人民政府金融发展服务办公室为隶属于深圳市人民政府的金融服务和监管部门。具体职能包括</p>
          </div>
        </div>
      </div>
      <transition name="auth-alert">
        <div id="auth-alert" v-show="auth1">
          <div class="block"></div>
          <div class="window">
            <div class="inner-scroll">
              <img src="/static/img/mobile_regula_authority_01.png">
              <h3 class="title">中国银监会</h3>
              <p>中国银行业监督管理委员会(简称银监会，CBRC)成立于2003年4月25日，是国务院直属正部级事业单位。根据国务院授权，统一监督管理银行、金融资产管理公司、信托投资公司及其他存款类金融机构，维护银行业的合法、稳健运行。</p>
            </div>
          </div>
          <div class="auth-clos">
            <img src="/static/img/mobile_ei_invite_06.png" @click="auth1 = !auth1">
          </div>
        </div>
      </transition>
      <transition name="auth-alert">
        <div id="auth-alert" v-show="auth2">
          <div class="block"></div>
          <div class="window">
            <div class="inner-scroll">
              <img src="/static/img/mobile_regula_authority_02.png">
              <h3 class="title">工信部</h3>
              <p>中华人民共和国工业和信息化部(简称工信部)是国务院的直属部门，主要职责为拟订实施行业规划、产业政策和标准、监测工业行业日常运行、推动重大技术装备发展和自主创新、管理通信业、指导推进信息化建设、协调维护国家信息安全等，对互联网金融业务涉及的电信业务进行监管。</p>
            </div>
          </div>
          <div class="auth-clos">
            <img src="/static/img/mobile_ei_invite_06.png" @click="auth2 = !auth2">
          </div>
        </div>
      </transition>
      <transition name="auth-alert">
        <div id="auth-alert" v-show="auth3">
          <div class="block"></div>
          <div class="window">
            <div class="inner-scroll">
              <img src="/static/img/mobile_regula_authority_03.png">
              <h3 class="title">国家互联网信息办公室</h3>
              <p>2011年5月，经国务院同意，设立国家互联网信息办公室。国家互联网信息办公室的主要职责包括：落实互联网信息传播方针政策和推动互联网信息传播法制建设，指导、协调、督促有关部门加强互联网信息内容管理，负责对金融信息服务、互联网信息内容等业务进行监管。</p>
            </div>
          </div>
          <div class="auth-clos">
            <img src="/static/img/mobile_ei_invite_06.png" @click="auth3 = !auth3">
          </div>
        </div>
      </transition>
      <transition name="auth-alert">
        <div id="auth-alert" v-show="auth4">
          <div class="block"></div>
          <div class="window">
            <div class="inner-scroll">
              <img src="/static/img/mobile_regula_authority_04.png">
              <h3 class="title">国家工商总局</h3>
              <p>中华人民共和国国家工商行政管理总局（简称国家工商总局)是中华人民共和国国务院主管市场监督管理和有关行政执法工作的正部级国务院直属机构，支持互联网企业依法办理工商注册登记。</p>
            </div>
          </div>
          <div class="auth-clos">
            <img src="/static/img/mobile_ei_invite_06.png" @click="auth4 = !auth4">
          </div>
        </div>
      </transition>
      <transition name="auth-alert">
        <div id="auth-alert" v-show="auth5">
          <div class="block"></div>
          <div class="window">
            <div class="inner-scroll">
              <img src="/static/img/mobile_regula_authority_05.png">
              <h3 class="title">深圳市金融办</h3>
              <p>深圳市人民政府金融发展服务办公室为隶属于深圳市人民政府的金融服务和监管部门。具体职能包括：</p>
              <p>（一）贯彻执行国家、省、市有关金融工作的法律、法规和政策，起草金融发展、服务的地方性法规、规章拟定地方金融业发展规划和相关政策，经批准后组织实施。</p>
              <p>（二）研究分析宏观金融形势、国家金融政策和本市金融运行情况，提出改善金融发展环境，加强服务，促进发展的政策建议。</p>
              <p>（三）负责推进深圳金融改革创新综合实验区建设；指导、推进金融市场体系建设，促进金融发展。</p>
              <p>（四）负责联系中央驻深金融监管机构、金融机构，做好配合协调和信息交流工作。</p>
              <p>（五）配合有关部门维护金融秩序</p>
              <p>（六）完善深圳金融业整体布局，加强对金融功能区的服务指导；协调开展深港金融业交流，促进区域金融合作。</p>
              <p>（七）配合有关部门推进投融资体制改革。</p>
              <p>（八）承办市政府和上级部门交办的其他事项。</p>
            </div>
          </div>
          <div class="auth-clos">
            <img src="/static/img/mobile_ei_invite_06.png" @click="auth5 = !auth5">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auth1: false,
      auth2: false,
      auth3: false,
      auth4: false,
      auth5: false,
    }
  }
}

</script>
<style scoped>
@import "../../../style/css/mobile_regula_authority.css";

</style>
