import {Base, $} from './pub/packages';
require('../css/about.scss');
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
        Base.initModules(['footer','header','goToTop','aboutNav'],this.data.userInfo,'notice');
        Base.showPage();
    }
};
main.init();