<template>
  <div>
    <div class="under">
      <div class="tab-title">
        <a v-for="(tab ,index) in tabs" :class="{active:iscur==index}" @click="iscur=index,tabChange('tabS' + (index + 1))">{{tab.name}}</a>
      </div>
      <div class="tab-box">
        <component v-bind:is="tabView"></component>
      </div>
    </div>
  </div>
</template>
<script>
import tabS1 from './mobile_company_qualification.vue'
import tabS2 from './mobile_bank_dep.vue'
import tabS3 from './mobile_risk_control.vue'
import tabS4 from './mobile_security_assurance.vue'

export default {
  data() {
    return {
      tabView: tabS1,
      tabs: [{ name: "公司资质" }, { name: "银行存管" }, { name: "风控体系" }, { name: "安全保障" }],
      iscur: 0
    }
  },
  components: {
    tabS1,
    tabS2,
    tabS3,
    tabS4,
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    }
  },
  mounted() {}
}

</script>
<style>
.under {
  padding-top: 39px;
}
.under .tab-title{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 10;
}
.under .tab-title:after {
  content: "";
  display: none;
  clear: both;
}

.under .tab-title a {
  float: left;
  line-height: 38px;
  font-size: 15px;
  color: #545454;
  width: 20%;
  margin: 0 2.5%;
  text-align: center;
  border-bottom: 1px solid #fff;
}

.under .tab-title a.active {
  color: #ff5637;
  border-bottom: 1px solid #ff5637;
}

</style>
