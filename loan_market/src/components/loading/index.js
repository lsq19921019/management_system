import Vue from 'vue'
import loading from './loading.vue';
import moreLoading from './more_loading.vue';
export default ()=>{
    Vue.component("loading",loading);
    Vue.component("more-loading",moreLoading);
}