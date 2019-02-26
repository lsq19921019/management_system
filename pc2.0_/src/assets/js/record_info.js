import {Base, $} from './pub/packages';
import recordInfo from '../images/about_xg_company/recordInfo.png';
require('../css/about.scss');
Base.showPage();
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
       $(".recordInfo_img").attr('href',recordInfo);
        //渲染公共头部
        Base.initModules(['footer','header','goToTop','aboutNav'],this.data.userInfo,'notice');
    }
};
main.init();