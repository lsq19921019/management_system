import {Base, $} from './pub/packages';
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
        //渲染公共头部
        //Base.initModules(['footer','header','goToTop'],this.data.userInfo);
    }
};
main.init();