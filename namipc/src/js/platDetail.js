(function () {

    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn = {
        init: function () {          
            mainFn.getImgCode();
            mainFn.onClickEvent();
            mainFn.getDetailData();
            mainFn.countCalculator();
            mainFn.receipt();
        },
        getImgCode: function () {
            var $receipt = $('.fillreceipt .yzm');
            tools.fetchAjax(apiUrl.data + '/message/image_code').done(function (ret) {
                if (ret.status === 0 || ret.status === '0') {
                    var imgBase64 = 'data:image/png;base64,' + (ret.result && ret.result.imgVal);

                    $receipt.find('.img-code').attr('src', imgBase64);
                    $receipt.find('.img-code').attr('data-imei', (ret.result && ret.result.imei));
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
            var _that = this;
            
            
            if (!$receipt.length) {
                return;
            }
            $receipt.find('.yzm .img-code').on('click', function () {
                mainFn.getImgCode();
            });
            // 时间控件
            var picker = new Pikaday({
                field: $('#datePicker-time')[0],
                format: 'YYYY-MM-DD',
                onSelect: function(data) {
                    console.log(this.getMoment().format('YYYY-MM-DD'));
                }
            });
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
            //点击提交按钮
            $('.fill-con .submit').on('click',function(){
                var pfNo=$(".detail-in").find(".detail-tit span").data("pfno");
                var $investDeclare = $('.fill-con');
                var imei = $investDeclare.find('.img-code').attr('data-imei');
                var reqData = {
                    pfNo: pfNo||'',
                    pfusername: $investDeclare.find('.name').val() || '',
                    phone: $investDeclare.find('.user-phone').val() || '',
                    projectid: $investDeclare.find('.item-list-hbs').val() || '',
                    investamount: $investDeclare.find('.money').val() || '',
                    investtime: $investDeclare.find('.time').val() || '',                   
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
                }else if (!reqData.code) {
                    $investDeclare.find('.code').focus();
                    tools.tipsAlert('请输入图形验证码');
                }else if (!reqData.projectid) {
                    tools.tipsAlert('请选择标的名称');
                }else if (!reqData.code) {
                    $investDeclare.find('.phoneCode').focus();
                    tools.tipsAlert('请输入短信验证码');
                } else{
                    tools.fetchAjax(apiUrl.data + '/assets/apply_invest_record', reqData,'post',{imei:imei}).done(function (ret) {
                        if (ret.status == 0) {
                            mainFn.getImgCode()
                            tools.tipsAlert(ret.msg || '申报成功！');
                            $('.platform-list-hbs').val('');
                            $investDeclare.find('.code').val('');
                            // 刷新申报记录
                            setTimeout(function () {                           
                                location.reload();
                              }, 1500);  
                        } else {
                            mainFn.getImgCode()
                            tools.tipsAlert(ret.error || ret.msg || '申报失败，请稍后重试', 3000);
                        }
                    });
                }
            })
        },
        onClickEvent: function () {
            var $platformInfo = $('.platform-info');
            var $header = $platformInfo.find('.header');
            $header.on('click', 'a', function () {
                var $this = $(this);
                var getTabClass = $this.attr('data-tab');
                $header.find('a').removeClass('active');
                $this.addClass('active');
                $platformInfo.find('.tab-content').hide();
                $platformInfo.find('.' + getTabClass).show();
            });
            //直达链接弹窗
            $(document).on('click','.lianjie',function(){
                var token = Cookies.get('token') || '';
                if (!token) {
                    location.href = '/login.html';
                }else{
                    $('.popout').css('display','block')
                    $('#cover').css('display','block')
                }

            })
            //关闭弹窗
            $(document).on('click','.close',function(){
                $('.popout').css('display','none')
                $('#cover').css('display','none')
            })
            //提交投资回单弹窗
            $(document).on('click','.tijiao',function(){
                var token = Cookies.get('token') || '';
                if(!token){
                    location.href = '/login.html';
                }else{
                    $('.fillreceipt').css('display','block')
                    $('#cover').css('display','block')
                }
            })
            //关闭弹窗
            $(".fillreceipt").on('click','.close',function(){
                $('.fillreceipt').css('display','none')
                $('#cover').css('display','none')
            })
        },
        countCalculator: function () {
            $(function () {
                $('.detail-section').find('.calculator .cal-btn').on('click', function () {
                    var money = $('.calculator').find('.money-input').val();
                    var percent = $('.calculator').find('.percent-input').val() / 100;
                    var time = $('.calculator').find('.time-input').val();
                    var profit = (money * percent * time / 360).toFixed(2);
                    $('.calculator .profit-input').val(profit);
                });
            });
        },
        getDetailData: function () {
            var id = tools.getUrlParam('id');
            var pfNo = tools.getUrlParam('pfNo');
            var reqData = {
                projectId: id,
                platformNo: pfNo
            };
            tools.fetchAjax(apiUrl.data + '/platform/detail', reqData).done(function (ret) {
                if (ret.status == 0) {
                    var detailData = ret.result;
                    detailData.pfcreatetime = new Date(detailData.pfcreatetime).toLocaleDateString();
                    $(".pfdesc").html(ret.result.pfdesc)
                    tools.renderTpl(
                        $('.platform-info .platform-content'),
                        $('#platform-hbs-template'),
                        detailData
                    );
                    $(".zhnh .mark-img").hover(function(){  
                        $('.zhnh .hint').css("display","block")
                    },function(){
                        $('.zhnh .hint').css("display","none")
                    })

                    
                }             
            });
            tools.fetchAjax(apiUrl.data +"/finance/project_detail",reqData).done(function(ret){
                if(ret.status==0){
                    var detail=ret.result
                    $(".investmentStrategy").html(detail.investmentStrategy)
                    $(".setion-tit").text(detail.borrowTitle)
                    if(detail.objectRange=='1'||detail.objectRange==1){
                        $(".tz-img").attr("src",__uri('./img/ft-ico.png'))
                    }else{
                        $(".tz-img").attr("src",__uri('./img/st-ico1.png'))
                    }
                    detail.pfcreatetime = new Date(detail.pfcreatetime).toLocaleDateString();
                    tools.renderTpl(
                        $('.detail-section .detail-content .detail-in'),
                        $('#detail-content-template'),
                        detail
                    );
                    tools.fetchAjax(apiUrl.data + '/finance/platform_project_list_all', {platformNo: pfNo}).done(function (ret) {
                        if (ret.status == 0) {
                            var itemList = ret.result && ret.result.list;
                            tools.renderTpl(
                                $('.fillreceipt .item-list-hbs'),
                                $('#item-list-template'),
                                {itemList: itemList}
                            );
                            $(".item-list-hbs").val(detail.id);
                        }
                    });
                    $(".zhnh .mark-img").hover(function(){  
                        $('.zhnh .hint').css("display","block")
                    },function(){
                        $('.zhnh .hint').css("display","none")
                    })
                }
            })
        }
    };

    mainFn.init();

})();