(function () {
    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn = {
        init: function () {
            mainFn.getImgCode();
            mainFn.onEvent();
            mainFn.getParams();
        },
        getParams:function(){
            var Urlsearch = location.search,
            theRequest = {};
            if (Urlsearch.indexOf("?") != -1) {
            var str = Urlsearch.substr(1);
                strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            $(".InvitePeople ").val(theRequest.invitecode);
        },
        getImgCode: function () {
            var $register = $('.main-section .register-box');
            tools.fetchAjax(apiUrl.data + '/message/image_code').done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    var imgBase64 = 'data:image/png;base64,' + (ret.result && ret.result.imgVal);
                    $register.find('.img-code').attr('src', imgBase64);
                    $register.find('.img-code').attr('data-imei', (ret.result && ret.result.imei));
                }
            });
        },
        getSmsCode: function (type, cellphone, imgCode, imei) {
            var $register = $('.main-section .register-box');
            var reqData = {
                type: type,
                cellphone: cellphone,
                imgCode: imgCode
            };

            tools.fetchAjax(apiUrl.data + '/message/sms_code', reqData, 'post', {imei: imei}).done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    $register.find('.tips-register').text('验证码发送成功!').fadeIn();
                    setTimeout(function () {
                        $register.find('.tips-register').text('').hide();
                    }, 2500);
                    // 获取手机验证码倒计时
                    var $getCode = $register.find('.get-sms-code');
                    var countDown = 60;
                    $getCode.addClass('disabled');
                    var countDownFn = function (seconds, speed) {
                        $getCode.html('再次获取(' + seconds + 's)');
                        var timeId = setTimeout(function () {
                            seconds--;
                            countDownFn(seconds, speed);
                        }, speed);
                        if (seconds == 0) {
                            clearTimeout(timeId);
                            timeId = null;
                            $getCode.removeClass('disabled').html('获取验证码');
                        }
                    };
                    countDownFn(countDown, 1000);
                } else {
                    // alert(ret.error || ret.msg);
                    // 获取失败，更新图片验证码
                    // mainFn.getImgCode();
                    // $register.find('.code-input').val('');
                    // $register.find('.code-input').focus();
                    $register.find('.tips-register').text(ret.error || ret.msg).fadeIn();
                }
            });
        },
        onEvent: function () {
            var InvitePeople  = $("#InvitePeoplefont");
            var $register = $('.main-section .register-box');
            InvitePeople.on('click',function(){
                $(".triangle_border_down").toggleClass('animate-down')
                $(this).siblings('.hideInput').toggleClass('hide')
            });
            $register.find('input[data-must != "false"]').blur(function(){
                if (!$(this).val()) {
                    $(this).addClass('input-tips');
                    $register.find('.tips-register').text($(this).attr('placeholder')).fadeIn();
                } else {
                    $(this).removeClass('input-tips');
                    $register.find('.tips-register').text('').hide();
                }
            });

            // 获取图片验证码
            $register.find('.img-code').on('click', function () {
                mainFn.getImgCode();
            });

            // 获取手机验证码
            $register.find('.get-sms-code').on('click', function () {
                var $this = $(this);
                var phone = $register.find('.phone').val();
                var imgCode = $register.find('.code-input').val();
                var imei = $register.find('.img-code').attr('data-imei');
                if ($this.hasClass('disabled')) {
                    return;
                }
                if (!phone) {
                    $register.find('.phone').addClass('input-tips');
                    $register.find('.tips-register').text('手机号不能为空').fadeIn();
                } else if (!imgCode) {
                    $register.find('.code-input').addClass('input-tips');
                    $register.find('.tips-register').text('请填写图片验证码').fadeIn();
                } else {
                    mainFn.getSmsCode(1, phone, imgCode, imei);
                }
            });

            // 点击注册
            $register.on('click', '.register-btn', function () {
                var phone = $register.find('.phone').val(),InvitePeople;
                var imgCode = $register.find('.imageCode').val();
                var smsCode = $register.find('.phone-code-input').val();
                var psw = $register.find('.password').val();
                var psw2 = $register.find('.password-again').val();
                var inviteCode = $register.find('.invite-code').val();
                if (!phone) {
                    $register.find('.phone').addClass('input-tips');
                    $register.find('.tips-register').text('手机号不能为空').fadeIn();
                } else if (!imgCode) {
                    $register.find('.imageCode').addClass('input-tips');
                    $register.find('.tips-register').text('图形验证码不能为空').fadeIn();
                } else if (!smsCode) {
                    $register.find('.phone-code-input').addClass('input-tips');
                    $register.find('.tips-register').text('手机验证码不能为空').fadeIn();
                } else if (!psw) {
                    $register.find('.password').addClass('input-tips');
                    $register.find('.tips-register').text('密码不能为空').fadeIn();
                } else if (!(psw === psw2)) {
                    $register.find('.password-again').addClass('input-tips');
                    $register.find('.tips-register').text('两次密码不一致').fadeIn();
                } else {
                    InvitePeople =  $(".InvitePeople ").val() ?  $(".InvitePeople ").val() : 'none';
                    var registerData = {
                        register: DES3.encrypt('b8a5483ed47744f7b4978104afdcc075', JSON.stringify({
                            cellphone: phone,
                            password: psw,
                            code: smsCode,
                            referrer: inviteCode,
                            inviteCode: InvitePeople

                        }))
                    };
                    tools.fetchAjax(apiUrl.data + '/user/register', registerData).done(function (ret) {
                        if (ret.status === 0 || ret.status === '0') {
                            console.log('注册成功，跳转中...');
                            Cookies.set("token", ret.result && ret.result.token);
                            Cookies.set("name", ret.result && ret.result.name || phone);
                            Cookies.set("phone", phone);
                            Cookies.set("headImg", ret.result && ret.result.headImg || '');
                            location.href = '/';
                        } else {
                            // 注册失败，更新图片验证码
                            mainFn.getImgCode();
                            $register.find('.code-input, .phone-code-input').val('');
                            $register.find('.code-input').focus();
                            $register.find('.tips-register').text(ret.msg).fadeIn();
                            setTimeout(function () {
                                $register.find('.tips-register').text('').hide();
                            }, 3500);
                        }
                    }).fail(function (err) {
                        console.log(err);
                    });
                }
            });
            $("body").keydown(function(event) {
                if (event.keyCode == "13") {
                    $('.register-btn').click();
                }
            });
        }
    };

    mainFn.init();

})();