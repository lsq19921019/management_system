import {Base, $} from './pub/packages';
require('../css/pages/index_register.scss');
let Register = require('./pub/register');
//渲染公共头部
Base.initModules(['loginFooter','loginHeader'],{
    logoDesc : ''
});
Base.showPage();
let main = {
    data : {
        registerUrl : '/api/user/register',  //注册接口
        imgCodeUrl : '/api/img/code',  //图片验证码接口
        msgCodeUrl : '/api/sms/register',  //短信验证码接口
    },
    doms : {
        btnAgree : $('#J_agree'),
        btnGetMobileCode : $('#J_getMobileCode'),
        btnGetPicCode : $('#J_getPicCode'),
        iptPicCode : $('#J_picCode'),
        iptMobile : $('#J_mobile'),
    },
    fncs : {},
    bind() {
        this.doms.btnGetPicCode.click(_=>{
            Register.getPicCode(main.doms.iptMobile.val());
        });
        // this.doms.iptMobile.blur(_=>{
        //     Register.getPicCode(main.doms.iptMobile.val());
        // });
        this.doms.btnGetMobileCode.click(_=>{
            Register.getMobileCode(main.doms.iptPicCode.val(),main.doms.iptMobile.val());
        });
        this.doms.btnAgree.click(function() {
            let agree = $(this).attr('agree');
            if(agree == 'false') {
                $(this).attr('agree','true').addClass('checked');
            } else {
                $(this).attr('agree','false').removeClass('checked');
            }
        });
    },
    init() {
        this.bind();
        Register.getPicCode();
        Register.register({
            isNeedAgree : true
        });
    }
};
main.init();