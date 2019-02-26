import {Base, $} from './packages';
let DES3 = require('./3DES');
let txtTips = $('#J_tips');
let Register = {
    //注册主方法
    register(config) {
        $('#J_register').click(_=>{
            let valMobile = $('#J_mobile').val();
            let valPassword = $('#J_password').val();
            let valMobileCode = $('#J_mobileCode').val();
            let valPicCode = $('#J_picCode').val();
            let valInvite = null; 
            let isAgree = null; 
            if(config.isNeedAgree) {
                isAgree = $('#J_agree').attr('agree');
            }
            if($('#J_invite')) {
                valInvite = $('#J_invite').val();
            }
            //校验手机号
            if(!Base.checkNullStr(valMobile)) {                    
                return txtTips.text(Base.tips.nullMobile);
            } else if(!Base.checkPhone(valMobile)) {
                return txtTips.text(Base.tips.errorMobile);
            }
            //校验密码
            if(!Base.checkNullStr(valPassword)) {                    
                return txtTips.text(Base.tips.nullPassword);
            } else if(!Base.checkPassword(valPassword)) {
                return txtTips.text(Base.tips.errorRegPassword);
            }
            //校验图片验证码
            if(!Base.checkNullStr(valPicCode)) {                    
                return txtTips.text(Base.tips.nullPicCode);
            } else if(!Base.checkCode(valPicCode)) {
                return txtTips.text(Base.tips.errorPicCode);
            }
            //校验短信验证码
            if(!Base.checkNullStr(valMobileCode)) {                    
                return txtTips.text(Base.tips.nullMobileCode);
            } else if(!Base.checkCode(valMobileCode)) {
                return txtTips.text(Base.tips.errorMobileCode);
            }
            //如果需要同意协议
            if(config.isNeedAgree) {
                if(isAgree == 'false') {
                    return txtTips.text('* 请仔细阅读协议');
                }
            }
            let dataJson = {
                cellphone : valMobile,
                code : valMobileCode,
                password : valPassword
            };
            if(Base.getQueryParameter('type')) {
                dataJson.sourceType = Base.getQueryParameter('type');
            }
            if(valInvite != null) {
                dataJson.referrer = valInvite;
            }
            console.log(dataJson);
            dataJson = DES3.encrypt(Base.desKey, JSON.stringify(dataJson));               
            $.ajax({
                type : 'post',
                url : '/api/user/register',
                headers : Base.initAjaxHeader(0,{ register : dataJson }),
                dataType : 'json',
                data : { register : dataJson },
                success(data) {
                    if(data.status == '0') {
                        txtTips.text('');
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
                        location.href = './index_displayPage.html';
                    } else {
                        txtTips.text(data.msg);
                    }
                },
                error() {

                }
            });
            
        });
    },
    //获取图片验证码
    getPicCode(mobile) {
        let cellphone = mobile || '15888888888';
        $.ajax({
            type : 'post',
            headers : Base.initAjaxHeader(0,{
                cellphone : cellphone
            }),
            data : {
                cellphone : cellphone
            },
            dataType : 'json',
            async : false,
            url : '/api/img/code',
            success(data) {
                if(data.status == 0) {
                    $('#J_getPicCode').attr('src', 'data:image/png;base64,' + data.result);
                } else {
                    txtTips.text(data.msg);
                }
            }
        });
    },
    //获取短信验证码
    getMobileCode(picCode,mobile) {
        //校验手机号
        if(!Base.checkNullStr(mobile)) {                    
            return txtTips.text(Base.tips.nullMobile);
        } else if(!Base.checkPhone(mobile)) {
            return txtTips.text(Base.tips.errorMobile);
        }
        //校验图片验证码
        if(!Base.checkNullStr(picCode)) {                    
            return txtTips.text(Base.tips.nullPicCode);
        } else if(!Base.checkCode(picCode)) {
            return txtTips.text(Base.tips.errorPicCode);
        }

        var timer;
        var jsonData = {
            imgCode: picCode,
            cellphone: mobile,
            type: 1,
        };
        $.ajax({
            type: "POST",
            headers: Base.initAjaxHeader(0,jsonData),
            data: jsonData,
            dataType: 'json',
            async: false,
            url: '/api/sms/register',
            success: function(data) {
                if (data.status == 0) {
                    var i = 60;
                    var timer = setInterval(function() {
                        $('#J_getMobileCode').attr('disabled', true);
                        $('#J_getMobileCode').html(i + 's');
                        if (i == 0) {
                            clearInterval(timer);
                            $('#J_getMobileCode').attr('disabled', false);
                            $('#J_getMobileCode').html('重新发送');
                        }
                        i--;
                    }, 1000);
                    txtTips.text('');
                } else {
                    txtTips.text(data.msg);
                    //重新获取图片验证码
                    Register.getPicCode(mobile);
                }
            }
        });
    }
};
module.exports = Register;