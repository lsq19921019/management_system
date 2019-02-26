(function () {
    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn = {
        init: function () {
            mainFn.onEvent();
        },
        onEvent: function () {
            var $login = $('.main-section .login-box');
            $login.find('.phone').blur(function(){
                if (!$login.find('.phone').val()) {
                    $login.find('.phone').addClass('input-tips');
                    $login.find('.tips-phone').fadeIn();
                } else {
                    $login.find('.phone').removeClass('input-tips');
                    $login.find('.tips-phone').hide();
                }
            });
            $login.find('.password').blur(function(){
                if (!$login.find('.password').val()) {
                    $login.find('.password').addClass('input-tips');
                    $login.find('.tips-psw').hide();
                } else {
                    $login.find('.password').removeClass('input-tips');
                    $login.find('.tips-psw').hide();
                }
            });

            $login.on('click', '.login-btn', function () {
                var phone = $login.find('.phone').val(); // 18617150740
                var psw = $login.find('.password').val(); // 123456
                if (!phone) {
                    $login.find('.phone').addClass('input-tips');
                    $login.find('.tips-phone').fadeIn();
                } else if (!psw) {
                    $login.find('.password').addClass('input-tips');
                    $login.find('.tips-psw').fadeIn();
                } else {
                    var loginData = {
                        login: DES3.encrypt('b8a5483ed47744f7b4978104afdcc075', JSON.stringify({
                            cellphone: phone,
                            password: psw
                        }))
                    };
                    tools.fetchAjax(apiUrl.data + '/user/login', loginData).done(function (ret) {
                        if (ret.status === 0 || ret.status === '0') {
                            Cookies.set("token", ret.result && ret.result.token);
                            Cookies.set("count",ret.result && ret.result.count||'0')
                            Cookies.set("name", ret.result && ret.result.name || '187185*****');
                            Cookies.set("phone", phone);
                            Cookies.set("headImg", ret.result && ret.result.headImg || '');
                            location.href = '/index.html';
                        } else {
                            // location.href = '/account.html';
                            $login.find('.tips-login').text(ret.msg).fadeIn();
                            setTimeout(function () {
                                $login.find('.tips-login').text('').hide();
                            }, 3000);
                        }
                    }).fail(function (err) {
                        console.log(err);
                    });
                }
            });
            $("body").keydown(function(event) {
                if (event.keyCode == "13") {
                    $('.login-btn').click();
                }
            });
        }
    };

    mainFn.init();

})();