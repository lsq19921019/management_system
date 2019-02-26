import {Base, $} from './pub/packages';
require('../css/about.scss');
require('../css/pages/myAccount_payPage.scss');
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
            $(function(){
                let len = 0;
                let t = setInterval(function(){
                    len += 3;
                    $('#J_progress').css('width',len+'px');
                    if(len >=979) {
                        clearInterval(t);
                        Base.go("myAccount_onlineBank.html");
                    }
                },10);
            });
        },
    },
    bind() {},
    init() {
        this.fncs.initUserInfo();
        //渲染公共头部
        Base.initModules(['footer','header','goToTop'],this.data.userInfo);
        Base.showPage();
    }
};
main.init();