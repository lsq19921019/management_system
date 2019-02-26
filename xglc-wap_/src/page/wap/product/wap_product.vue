<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :pulling-text="'下拉刷新'" :loosing-text="'释放即可刷新'" :loading-text="'刷新中...'">
        <div class="product">
            <x-list ref="gList"></x-list>
        </div>
    </van-pull-refresh>
    <wap-footer ref="footer"></wap-footer>
  </div>
</template>
<script>
import wapFooter from "../wap_footer.vue";
import wapAlert from "../wap_alert.vue";
import xList from "./wap_product_x_list.vue";

export default {
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    "wap-alert": wapAlert,
    "wap-footer": wapFooter,
    "x-list": xList
  },
  mounted: function() {
    this.$refs.footer.activeProduct();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$refs.gList.postList(1);
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>
<style scoped>
.product {
  padding-top: 7px;
}
</style>
