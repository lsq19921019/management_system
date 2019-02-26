import tpl from './header.tpl';
import loginHeader from './login_header.tpl';
require('./header.scss');
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b7f00304029723fca4fc0f1946ce8012";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();
module.exports = {
    header(id,$,data,Base) {
        document.getElementById(id).innerHTML = tpl(data);
        //导航定位
        let pageActive = $('body').attr('module'),
            navAs = $('#J_mainNav').find('a.parent');
        if(pageActive == 'index') {
            navAs.eq(2).addClass('active');
            console.log(navAs.eq(2).text());
        } else if(pageActive == 'about') {
            navAs.eq(1).addClass('active');
        } else if(pageActive == 'myAccount') {
            navAs.eq(0).addClass('active');
        }
        
        //信息披露下拉导航
        $('#J_mainNav').find('li').eq(1).hover(function(){
            $('#J_navAbout').stop().slideDown();
        },function(){
            $('#J_navAbout').stop().slideUp();
        });
        //退出登录
        $('#J_loginOut').click(function() {
            if(window.confirm('是否退出登录？')) {
                $('li#loginInfo').html("大额充值");
                localStorage.removeItem('_token');
                sessionStorage.removeItem('userInfo');
                location.href = './';
                // data.nickName = null;
                // document.getElementById(id).innerHTML = tpl(data);
            }
        });
        //点击 我的账户
        $('#J_myAccount').click(function() {
            if(!Base.isLogin()) {
                location.href = './index_login.html';
            } else {
                location.href = './myAccount.html';
            }
        });        
    },
    loginHeader(id,$,data) {
        document.getElementById(id).innerHTML = loginHeader(data);
    }   
};