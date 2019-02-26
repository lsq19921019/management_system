import {Base, $} from './pub/packages';
require('../css/about.scss');
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
let main = {
    data : {
        userInfo : {
            nickName : null
        }
    },
    doms : {},
    fncs : {
        //重置userInfo
        initUserInfo() {
            if(sessionStorage.getItem('userInfo')) {
                main.data.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            }
        },
    },
    bind() {},
    init() {
        this.fncs.initUserInfo();
        //渲染公共头部
        Base.initModules(['footer','header','goToTop','aboutNav'],this.data.userInfo,'about');
        Base.showPage();
    }
};
main.init();