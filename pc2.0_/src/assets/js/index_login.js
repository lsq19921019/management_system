import { Base, $} from './pub/packages';
require('../css/pages/index_login.scss');
let DES3 = require('./pub/3DES');
//渲染公共头部
Base.initModules(['loginFooter','loginHeader'],{
    logoDesc : ''
});
Base.showPage();
var main = {
    data : {
        loginApiPath : '/api/user/login'
    },
    doms : {
        btnLogin : $('#J_loginBtn'),  //登录按钮
        iptMobile : $('#J_mobile'),  //手机号码输入框
        iptPwd : $('#J_password'),  //密码输入框
        msgTips : $('#J_tips'),  //提示信息
    },
    init() {
        this.bind();
    },
    //事件绑定
    bind() {        
        this.doms.btnLogin.click(function() {
            main.fncs.login();
        });
    },
    fncs : {
        //登录
        login() {
            let valMobile = main.doms.iptMobile.val(),
                valPassword = main.doms.iptPwd.val();
            if(!Base.checkNullStr(valMobile)) {
                main.doms.msgTips.text(Base.tips.nullPassword);
                return;
            }
            if(!Base.checkPhone(valMobile)) {
                main.doms.msgTips.text(Base.tips.errorPassword);
                return;
            }
            if(!Base.checkNullStr(valPassword)) {
                main.doms.msgTips.text(Base.tips.nullPassword);
                return;
            }
            if(!Base.checkLoginPassword(valPassword)) {
                main.doms.msgTips.text(Base.tips.errorPassword);
                return;
            }
            valPassword = DES3.encrypt(Base.desKey, valPassword);
            let params = {
                loginName : valMobile,
                password : valPassword
            };
            $.ajax({
                type : 'post',
                headers : Base.initAjaxHeader(0,params),
                dataType : 'json',
                async : false,
                data : params,
                url : main.data.loginApiPath,
                success(data) {
                    if(data.status == 0) {
                        main.doms.msgTips.text('');
                        var userInfo = {
                            headImg: data.result.headImg,
                            nickName: data.result.nickName,
                            phone: data.result.phone,
                            userName: data.result.userName,
                        };
                        if (!data.result.headImg) {
                            userInfo.headImg = ""
                        }
                        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                        localStorage.setItem('_token', data.result.token);
                        location.href = './';
                    } else {
                        main.doms.msgTips.text(data.msg);
                    }
                },
                error() {
                    alert(data.msg);
                }
            });
        }
    }
};
main.init();


