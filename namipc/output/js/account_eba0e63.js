// var clip = require('../lib/js/clipboard.js');
(function () {
    // 加载公共模块
    var tools = require('mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn = {
        init: function () {
            mainFn.bindbank();
            mainFn.loginCheck();
            mainFn.accountPage();
            mainFn.safePage();
            mainFn.declarePage();
            mainFn.getImgCode();
            mainFn.onEvent();
            mainFn.receipt();
            mainFn.getInviteCode();
        },
        // 检查登录token
        loginCheck: function () {
            var token = Cookies.get('token') || '';
            if (!token) {
                location.href = '/login.html';
            }
        },
        // 获取邀请码
        getInviteCode(){
            tools.fetchAjax(apiUrl.data + '/user/get_invite_code').done(function (ret) {
                if(ret && ret.status == 0){
                    $("#foo").text(ret.result);
                }
            });
                var clipboard = new ClipboardJS('.copy-btn');
                clipboard.on('success', function(e) {
                    $(".copy-success").removeClass('hide');
                    setTimeout(function(){
                         $(".copy-success").addClass('hide');
                    },1500)
                })
        },  
        // /
        // 分页点击
        pageClick: function ($page, callback) {
            $page.on('click', 'a', function (e) {
                var pageNum = 1;
                var getCurrentPage = $page.find('.cur-page').text().split('/')[0] * 1;
                var getEndPage = $page.find('.cur-page').text().split('/')[1] * 1;
                var getType = $(this).attr('data-page');
                if (getType === 'first') {
                    pageNum = 1;
                } else if (getType === 'prev') {
                    pageNum = getCurrentPage - 1 > 0 ? getCurrentPage - 1 : 1;
                } else if (getType === 'next') {
                    pageNum = getCurrentPage + 1 < getEndPage ? getCurrentPage + 1 : getEndPage;
                } else if (getType === 'end') {
                    pageNum = $page.attr('data-totalPage');
                }
                callback(pageNum * 1);
            });
        },
        // 更新分页页码
        setPageDate: function ($page, pageData) {
            if (pageData.totalPage > 1) {
                $page.show();
            }
            $page.attr('data-totalPage', pageData.totalPage);
            $page.find('.all').text('共' + pageData.totalCount + '条');
            $page.find('.cur-page').text(pageData.currentPage + '/' + pageData.totalPage);
        },
        getImgCode: function () {
            var $register = $('.update-content .bank-img');
            var $receipt = $('.fillreceipt .yzm');
            tools.fetchAjax(apiUrl.data + '/message/image_code').done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    var imgBase64 = 'data:image/png;base64,' + (ret.result && ret.result.imgVal);
                    $register.find('.img-code').attr('src', imgBase64);
                    $register.find('.img-code').attr('data-imei', (ret.result && ret.result.imei));

                    $receipt.find('.img-code').attr('src', imgBase64);
                    $receipt.find('.img-code').attr('data-imei', (ret.result && ret.result.imei));
                }
            });
        },
        onEvent:function(){
            // 提现按钮
            var $withdraw = $('.account-content .withdraw')
            $withdraw.find('.withdraw-btn').on('click',function(){
                location.href='../withdraw.html'
            })
            $(document).on('click','.close,.hint-btn .zbbd',function(){
                $('.hint').css('display','none')
                $('#cover').css('display','none')
            })
            $('.entry-info').on('click','.entry-btn',function(){
                var $investDeclare = $('.quick-entry');
                var reqData = {
                    pfNo: $investDeclare.find('.platform-list-hbs').val() || '',
                };
                if (!reqData.pfNo) {
                    tools.tipsAlert('请选择投资平台');
                }else{
                    $('.fillreceipt').css('display','block')
                    $('#cover').css('display','block')
                }       
            })
            $(document).on('click','.fillreceipt .close',function(){
                $('.fillreceipt').css('display','none')
                $('#cover').css('display','none')
            })
            //查看回单记录
            $(".fillreceipt-check").find("input").attr("readonly","readonly")
            $(".fillreceipt-check").find("select").attr("disabled","disabled")
            $('.record').on("click","a.btn",function(){
                var id=$(this).parent().data("id");
                $(".fillreceipt-check").show()
                $("#cover").show();
                tools.fetchAjax(apiUrl.data+"/assets/query_invest_details",{id:id}).done(function(ret){
                    var $check=$(".fillreceipt-check")
                    if(ret.status==0){
                        var res=ret.result
                        $check.find(".money").val(res.investamount)
                        $check.find(".user-phone").val(res.phone)
                        $check.find("#datePicker-time").val(res.investtime)
                        $check.find(".name").val(res.pfusername)
                        $check.find(".bdmc").val(res.pfName)
                    }                    
                })
            })
            $(".fillreceipt-check").on("click",".close",function(){
                $(".fillreceipt-check").hide()
                $("#cover").hide();
            })
            //删除回单记录
            $('.record').on("click","a.reject",function(){
                var delid=$(this).parent().data("id");
                tools.fetchAjax(apiUrl.data+"/assets/delete_apply_invest",{investId:delid}).done(function(ret){
                    if(ret.status==0){
                        $(this).parents('tr').remove();
                        tools.tipsAlert("删除成功");
                        setTimeout(function () {                             
                            location.reload();
                        }, 1500);
                    }else{
                        tools.tipsAlert(ret.msg);
                    }
                    // console.log(ret)
                })
            })
        },
        // 账户概览页面
        accountPage: function () {
            var $account = $('#account-content');
            if (!$account.length) {
                return;
            }

            var fixedMoney = function (val) {
                if (val == 0) {
                    return '0.00';
                } else if (val) {
                    return val.toFixed(2);
                } else {
                    return val;
                }
            };
            // 首页数据
            tools.fetchAjax(apiUrl.data + '/user/index').done(function (ret) {
                // console.log(ret)
                if (ret.status == 0) {
                    var userInfo = ret.result;
                    Cookies.set("count",ret.result && ret.result.count||'0')
                    $account.find('#js-nav-account .myacc').text(userInfo.cellphone);
                    $account.find('.withdraw-info .all-money .money').text(fixedMoney(userInfo.usableAmount));
                    $account.find('.withdraw-info .money-info .my-money').text(fixedMoney(userInfo.earningsAmount));
                    $account.find('.withdraw-info .money-info .day-money').text(fixedMoney(userInfo.toDayearnings));
                    $account.find('.withdraw-info .money-info .wait-money').text(userInfo.waitAuitNum);
                }
            });

        },
        isPoneAvailable: function (pone) {  
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
            if (!myreg.test(pone)) {  
              return false;  
            } else {  
              return true;  
            }  
        },
        //填写回单说明页面
        receipt:function(){
            var $receipt = $('.fillreceipt');
            if (!$receipt.length) {
                return;
            };
            $receipt.find('.sendCode').on('click',function(){
                if($(this).hasClass('disabled')){return false}
                var $investDeclare = $('.fill-con');
                var imei = $investDeclare.find('.img-code').attr('data-imei');
                var reqData = {
                    phone: $investDeclare.find('.user-phone').val() || '',
                    code: $investDeclare.find('.code').val() || '',                    
                };
                if(!reqData.phone){
                    tools.tipsAlert("请输入注册手机号码")
                    $investDeclare.find('.user-phone').focus();
                }else if(!mainFn.isPoneAvailable(reqData.phone)){
                    tools.tipsAlert("手机号码无效")
                }else if (!reqData.code) {
                    $investDeclare.find('.code').focus();
                    tools.tipsAlert('请输入图形验证码');
                }else{
                    // mainFn.getSmsCode(8,reqData.phone, reqData.code,imei)
                    var requireData = {
                        type: 8,
                        cellphone: reqData.phone,
                        imgCode: reqData.code
                    }
                    tools.fetchAjax(apiUrl.data + '/message/sms_code', requireData, 'post', {imei: imei}).done(function (ret) {
                    if (ret.status === 0 || ret.status === '0') {
                        // 获取手机验证码倒计时
                        var $getCode = $investDeclare.find('.sendCode');
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
                        tools.tipsAlert(ret.msg)
                        $(".img-code").trigger('click')
                    }
            });
                }
            });
            $receipt.find('.yzm .img-code').on('click', function () {
                mainFn.getImgCode();
            });
            // 时间控件
            var picker = new Pikaday({
                field: $('#datePicker-time')[0],
                format: 'YYYY-MM-DD',
                onSelect: function() {
                    console.log(this.getMoment().format('YYYY-MM-DD'));
                }
            });
            //点击提交按钮
            $('.fill-con .submit').on('click',function(){
                var $investDeclare = $('.fill-con');
                var imei = $investDeclare.find('.img-code').attr('data-imei');
                var reqData = {
                    pfNo: $('.platform-list-hbs').val() || '',
                    pfusername: $investDeclare.find('.name').val() || '',
                    phone: $investDeclare.find('.user-phone').val() || '',
                    projectid: $investDeclare.find('.item-list-hbs').val() || '',
                    investamount: $investDeclare.find('.money').val() || '',
                    investtime: $investDeclare.find('.time').val() || '',
                    imageCode: $investDeclare.find('.code').val() || '',                    
                    code: $investDeclare.find('.phoneCodeInput').val() || '',                    
                    propId:'',
                    type:8

                };
                if(!reqData.pfusername){
                    tools.tipsAlert("请输入平台认证姓名")
                    $investDeclare.find('.name').focus();
                }else if(!reqData.investamount){
                    tools.tipsAlert("请输入投资金额")
                    $investDeclare.find('.money').focus();
                }else if(!reqData.phone){
                    tools.tipsAlert("请输入注册手机号码")
                    $investDeclare.find('.user-phone').focus();
                }else if(!mainFn.isPoneAvailable(reqData.phone)){
                    tools.tipsAlert("手机号码无效")
                }else if (!reqData.investtime) {
                    tools.tipsAlert('请选择投资时间');
                }else if (!reqData.imageCode) {
                    $investDeclare.find('.code').focus();
                    tools.tipsAlert('请输入图形验证码');
                }else if (!reqData.projectid) {
                    tools.tipsAlert('请选择标的名称');
                }else if (!reqData.code) {
                    $investDeclare.find('.phoneCode').focus();
                    tools.tipsAlert('请输入短信验证码');
                }else{
                    tools.fetchAjax(apiUrl.data + '/assets/apply_invest_record', reqData,'post',{imei:imei}).done(function (ret) {
                        if (ret.status == 0) {
                            mainFn.getImgCode();
                            tools.tipsAlert(ret.msg || '申报成功！');
                            $('.platform-list-hbs').val('');
                            $investDeclare.find('.code').val('');
                            // 刷新申报记录                            
                            setTimeout(function () {                             
                                location.href = "../account.html";
                              }, 1500);    
                        } else {
                            mainFn.getImgCode();
                            tools.tipsAlert(ret.error || ret.msg || '申报失败，请稍后重试', 3000);
                        }
                    });
                }
            })
        },
        getSmsCode: function (type, cellphone, imgCode, imei) {
            var $register = $('.main-content .bank-card');
            var reqData = {
                type: type,
                cellphone: cellphone,
                imgCode: imgCode
            };

            tools.fetchAjax(apiUrl.data + '/message/sms_code', reqData, 'post', {imei: imei}).done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    tools.tipsAlert('验证码发送成功!');                    
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
                            mainFn.getImgCode();
                            clearTimeout(timeId);
                            timeId = null;
                            $getCode.removeClass('disabled').html('获取验证码');
                        }
                    };
                    countDownFn(countDown, 1000);
                } else {
                    $register.find('.tips-register').text(ret.msg).fadeIn();
                }
            });
        },
        //绑定银行卡
        bindbank: function () {
            var $bank = $('.main-content .bank-card');
            // 获取图片验证码
            $bank.find('.bank-img .img-code').on('click', function () {
                mainFn.getImgCode();
            });
            var getPhone = Cookies.get('phone');
            $bank.find('.phone').text(getPhone);
           
            // 获取手机验证码
            $bank.find('.get-sms-code').on('click', function () {
                var $this = $(this);
                var phone = getPhone;
                var imgCode = $bank.find('.code-input').val();
                var imei = $bank.find('.img-code').attr('data-imei');
                if ($this.hasClass('disabled')) {
                    return;
                }
                if (!imgCode) {
                    $bank.find('.code-input').addClass('input-tips');
                    $bank.find('.tips-register').text('请填写图片验证码').fadeIn();
                } else {
                    mainFn.getSmsCode(6, phone, imgCode, imei);
                }
            });
            //获取银行卡列表
            $.getJSON("../mockData/indexData.json",function(res){
                for(var i in res.result.banklist[0]){
                    var html="<option value=''>"+res.result.banklist[0][i]+"</option>"
                    $bank.find(".khyh").append(html)
                }
            });
            $bank.find('.con-btn').on('click',function(){
                var imei = $bank.find('.img-code').attr('data-imei');
                var reqData={
                    userName:$bank.find('.name').val()||'',
                    bankName:$bank.find('.khyh option:selected').text()||'',
                    branchAddress:$bank.find('.zhmc').val()||'',
                    cardNo:$bank.find('.yhkh').val()||'',
                    code:$bank.find('.sjyzm').val()||'',
                    province:'',                   
                    city:'',
                    phone:getPhone
                }
                if(!reqData.userName){
                    $bank.find('.name').focus()
                    $bank.find('.tips-register').text('请输入姓名').fadeIn();
                }else if(reqData.bankName=='请选择'){
                    $bank.find('.khyh').focus()
                    $bank.find('.tips-register').text('请输入开户银行').fadeIn();
                }else if(!reqData.branchAddress){
                    $bank.find('.zhmc').focus();
                    $bank.find('.tips-register').text('请输入银行支行').fadeIn();
                }else if(!reqData.cardNo){
                    $bank.find('.yhkh').focus();
                    $bank.find('.tips-register').text('请输入银行卡号').fadeIn();
                }else if($bank.find('.code-input').val()==''){
                    $bank.find('.code-input').focus();
                    $bank.find('.tips-register').text('请输入图形验证码').fadeIn();
                }else if(!reqData.code){
                    $bank.find('.sjyzm').focus();
                    $bank.find('.tips-register').text('请输入手机验证码').fadeIn();
                }else{
                    tools.fetchAjax(apiUrl.data + '/assets/bind_bankcard',reqData,'post',{imei:imei}).done(function(ret){
                        if(ret.status === 0 || ret.status === '0'){
                            tools.tipsAlert('绑定成功!');
                            mainFn.getImgCode();
                            $bank.find('.name').val('');
                            $bank.find('.khyh').val('');
                            $bank.find('.zhmc').val('');
                            $bank.find('.code-input').val('')
                            $bank.find('.sjyzm').val('');
                            $bank.find('.tips-register').text('').hide();
                            setTimeout(function () {                             
                              location.href = "../safe.html";
                            }, 3500);                            
                        }else{
                            tools.tipsAlert(ret.msg||'绑定失败!');
                            $bank.find('.tips-register').text(ret.msg)
                            //注册失败
                            mainFn.getImgCode();
                            $bank.find('.name').val('');
                            $bank.find('.khyh').val('');
                            $bank.find('.zhmc').val('');
                            $bank.find('.code-input').val('')
                            $bank.find('.sjyzm').val('');
                            setTimeout(function () {
                                $bank.find('.tips-register').text('').hide();
                            }, 3500);
                        }
                    }).fail(function(err){
                        mainFn.getImgCode();
                        console.log(err);
                    })
                }
                
            })

        },
        getSmsCodes: function (type, cellphone, imgCode, imei) {
            var $register = $('.main-content .update-pay-password');
            var reqData = {
                type: type,
                cellphone: cellphone,
                imgCode: imgCode
            };

            tools.fetchAjax(apiUrl.data + '/message/sms_code', reqData, 'post', {imei: imei}).done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    tools.tipsAlert('验证码发送成功!');
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
                    // alert(ret.msg);
                    // 获取失败，更新图片验证码
                    // mainFn.getImgCode();
                    // $register.find('.code-input').val('');
                    // $register.find('.code-input').focus();
                    $register.find('.tips-register').text(ret.msg).fadeIn();
                }
            });
        },
        // 安全认证页面
        safePage: function () {

            var $safe = $('#safe-content');
            if (!$safe.length) {
                return;
            }
            var $safeMain = $safe.find('.safe-item-content');

            $safeMain.on('click', '.update-btn', function () {
                var $this = $(this);
                var getUpdateItem = $this.attr('data-label');
                $safeMain.hide();
                $safe.find('.' + getUpdateItem).show();
            });
            //返回
            $safe.find('.back-btn, .cancel').on('click', function () {
                $safe.find('.update-content').hide();
                $safeMain.show();
            });

            var resetStatus = function ($item, state) {
                var status = state == 1 ? '已设置' : (state == 2 ? '未填写' : state);
                $item.find('.state').text(status);
                if (state == 1) {
                    $item.find('.state-mark').attr('src', '/img/icon_true_00ebfb9.png');
                } else {
                    $item.find('.state-mark').attr('src', '/img/icon_false_2a147f8.png');
                }
            };
            // 绑定状态接口
            var getAllStatus = function () {
                tools.fetchAjax(apiUrl.data + '/user/setting_index').done(function (ret) {
                    // console.log(ret)
                    if (ret.status == 0) {
                        var dataInfo = ret.result;
                        //银行卡状态
                        $safeMain.find('.bindbank .name').text(dataInfo.bankCard);
                        resetStatus($safeMain.find('.bindbank'), dataInfo.bindBankCardStatus);
                        //交易密码状态
                        resetStatus($safeMain.find('.update-deal-pass'), dataInfo.dealPasswordStatus);
                        if (dataInfo.bindBankCardStatus == 1) {
                            $(".bindbank").find(".update-btn").unbind('click')
                            $(".bindbank").find(".update-btn").text("立即修改")
                        }else{
                            $(".bindbank").find(".update-btn").text("立即绑定")
                        }
                        if(dataInfo.dealPasswordStatus==1){
                            $(".update-deal-pass").find(".update-btn").text("立即修改")
                        }else{
                            $(".update-deal-pass").find(".update-btn").text("立即设置")
                        }
                    }
                });
            };
            getAllStatus();

            // 修改登录密码
            $safe.find('.update-password').on('click', 'a.confirm', function () {
                var $updateItem = $safe.find('.update-password');
                var oldPassword = $updateItem.find('.old-psw').val() || '';
                var newPassword = $updateItem.find('.new-psw').val() || '';
                var confirmPassword = $updateItem.find('.new-psw-again').val() || '';
                if (!oldPassword) {
                    tools.tipsAlert('请输入您的原密码');
                } else if (!newPassword || !confirmPassword) {
                    tools.tipsAlert('请输入您的新密码');
                } else if (newPassword !== confirmPassword) {
                    tools.tipsAlert('两次输入密码不一致');
                } else {
                    tools.fetchAjax(apiUrl.data + '/user/modify_login_pwd',
                        {
                            value: DES3.encrypt('b8a5483ed47744f7b4978104afdcc075', JSON.stringify({
                                oldPassword: oldPassword,
                                newPassword: newPassword,
                                confirmPassword: confirmPassword
                            }))
                        }).done(function (ret) {
                        if (ret.status == 0) {
                            tools.tipsAlert(ret.msg || '修改成功');
                            $updateItem.find('.input-name').val('');
                            // 需要清除token，重新验证登录状态
                            Cookies.remove('token');
                            setTimeout(function () {
                                location.href = '/login.html';
                            }, 1500);
                        } else {
                            tools.tipsAlert(ret.msg || '修改失败', 2300);
                        }
                    });
                }
            });
            //修改交易密码
            var $updatepass=$(".update-pay-password");
            var getPhone = Cookies.get('phone').substring(0,3)+'****'+Cookies.get('phone').substring(7,11);
            var getPhones = Cookies.get('phone')
            $updatepass.find(".pass-phone").text(getPhone)
            $updatepass.find(".img-code").on("click",function(){
                mainFn.getImgCode();
            })
            // 获取手机验证码
            $updatepass.find('.get-sms-code').on('click', function () {
                var $this = $(this);
                var phone = getPhones;
                var imgCode = $updatepass.find('.code-input').val();
                var imei = $updatepass.find('.img-code').attr('data-imei');
                if ($this.hasClass('disabled')) {
                    return;
                }
                if (!imgCode) {
                    $updatepass.find('.code-input').addClass('input-tips');
                    $updatepass.find('.tips-register').text('请填写图片验证码').fadeIn();
                } else {
                    mainFn.getSmsCodes(3, phone, imgCode, imei);
                }
            });
            $updatepass.find(".confirm").on("click",function(){
                var yzm = $updatepass.find('.code-input').val() || '';
                var phoneyzm = $updatepass.find('.phoneyzm').val() || '';
                var password = $updatepass.find('.new-password').val() || '';
                var passwords = $updatepass.find('.password-again').val() || '';
                var passData={
                    code:phoneyzm,
                    value: DES3.encrypt('b8a5483ed47744f7b4978104afdcc075', JSON.stringify({
                        password: password,
                        confirmPassword: passwords
                    }))
                }
                if(!yzm){
                    $updatepass.find('.tips-register').text('请填写图片验证码').fadeIn();
                }else if(!phoneyzm){
                    $updatepass.find('.tips-register').text('请填写手机验证码').fadeIn();
                }else if(!password){
                    $updatepass.find('.tips-register').text('请填写新交易密码').fadeIn();
                }else if(!passwords){
                    $updatepass.find('.tips-register').text('请再次输入新密码').fadeIn();
                }else if(password!=passwords){
                    $updatepass.find('.tips-register').text('密码不一致,重新输入').fadeIn();
                }else{
                    tools.fetchAjax(apiUrl.data+"/user/set_deal_pwd",passData).done(function(ret){
                        if(ret.status=='0'){
                            tools.tipsAlert("设置成功")
                            setTimeout(() => {
                                location.href = "../safe.html";
                            }, 3000);
                        }else{
                            tools.tipsAlert(ret.msg||"设置失败，请稍后重试")
                        }
                    })
                }
            })
        },
        // 投资申报页面
        declarePage: function () {

            /**
             * 投资申报tab
             * */
            // 获取投资平台列表
            tools.fetchAjax(apiUrl.data + '/platform/list_all').done(function (ret) {
                if (ret.status == 0) {
                    var platformList = ret.result && ret.result.list;
                    platformList.unshift({pfno: '', pfname: '选择网贷平台'});
                    tools.renderTpl(
                        $('.entry-info .platform-list-hbs'),
                        $('#platform-list-template'),
                        {platformList: platformList}
                    );
                }
            });
            // 获取标的名称列表
            var getItemList = function (id) {
                if (id) {
                    tools.fetchAjax(apiUrl.data + '/finance/platform_project_list_all', {platformNo: id}).done(function (ret) {
                        if (ret.status == 0) {
                            var itemList = ret.result && ret.result.list;
                            itemList.unshift({id: '', borrowTitle: '请选择'});
                            tools.renderTpl(
                                $('.fillreceipt .item-list-hbs'),
                                $('#item-list-template'),
                                {itemList: itemList}
                            );
                        }
                    });
                } else {
                    tools.renderTpl(
                        $('.fillreceipt .item-list-hbs'),
                        $('#item-list-template'),
                        {itemList: [{id: '', pfName: '请选择'}]}
                    );
                }
            };
            // 选择平台联动标的名称
            $('.platform-list-hbs').change(function (e) {
                var $this = $(this);
                var getId = $this.children('option:selected').val();
                getItemList(getId);
            });
            /**
             * 投资记录tab
             * */
            // var $page = $('.declare-content .declare-record .page-list');
            var $taskPage = $('#account-content');
            var $page = $taskPage.find('.page-list');
            var searchInvestRecord = function (pageNum, pfName, status) {
                var searchData = {
                    investTime: '',
                    pageNum: pageNum || 1,
                    pfname: pfName || '',
                    status: status || '',
                    type: 1
                };
                tools.fetchAjax(apiUrl.data + '/assets/platform_invest_list', searchData).done(function (ret) {
                    if (ret.status == 0) {
                        var investRecordList = ret.result && ret.result.list;
                        var pageData = ret.result && ret.result.pageEntity;
                        tools.renderTpl(
                            $('.record .declare-record-table-hbs'),
                            $('#declare-record-table-template'),
                            {investRecordList: investRecordList}
                        );
                        if(investRecordList.length==0){
                            $(".null-tips").css('display','block')
                        }
                        mainFn.setPageDate($page, pageData);
                    }
                });
            };
            // 默认查询
            searchInvestRecord();

            // var $tagList = $('.declare-record .option-status-item');
            // var $inputPlat = $('.declare-record .option-platform-item .platform-name');
            // 分页点击
            mainFn.pageClick($page, function (pageNum) {
                // var getStatus = $tagList.find('a.active').attr('data-status');
                // var pfName = $inputPlat.val();
                searchInvestRecord(pageNum);
            });
        }
        
    };

    mainFn.init();

})();