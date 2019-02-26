(function(){
    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();
    var mainFn = {
        init: function () {
            mainFn.withdrawRecord();
            mainFn.withdrwaApp();
            mainFn.withdrwa();
            mainFn.onEvent();
        },
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
        //提现页面
        withdrwa:function(){
            tools.fetchAjax(apiUrl.data + '/user/index').done(function (ret) {
                if (ret.status == 0) {
                    var userInfo = ret.result;
                    $(".withdraw-body").find('.withing .withing-txt').text(userInfo.withdrawAmount);
                }
            });

            tools.fetchAjax(apiUrl.data+'/assets/withdraw_index').done(function(ret){
                if(ret.status==0){
                    $bankcard=$("#bankcard")
                    var bank=ret.result
                    if(bank.dealPasswordStatus==2){
                        $bankcard.find(".pay-password").attr("placeholder","请设置交易密码")
                        $bankcard.find(".withdraw-btn").addClass("disabled")
                    }
                    if(bank.cardNo!=""){
                        $('.nobind').css('display','none')
                        $('.bank-card').css('display','block')
                    }else{
                        $('.nobind').css('display','block')
                        $('.bank-card').css('display','none')
                    }
                    $bankcard.find(".bank-card").attr("data-bankid",bank.cardId)
                    $bankcard.find(".balance").attr("placeholder","可用余额"+bank.userAmount+"元")
                    $bankcard.find(".name").text(bank.bankName)
                    $bankcard.find(".card-id").text(bank.cardNo)
                    $(".withdrawall").on('click',function(){
                        $bankcard.find(".balance").val(bank.userAmount)
                        $bankcard.find(".balance").focus()
                    })
                }
            });
            
        },
        //提现申请
        withdrwaApp:function(){
            $bankcard=$("#bankcard")
            $bankcard.find(".withdraw-btn").on("click",function(){
                var money=$bankcard.find(".balance").val()||"";
                var cardid=$bankcard.find(".bank-card").attr("data-bankid");
                var password=$bankcard.find(".pay-password").val()||"";
                var arg={
                    money:money,
                    cardId:cardid,
                    dealPassword:DES3.encrypt('b8a5483ed47744f7b4978104afdcc075',password)
                }
                if(!money){
                    $bankcard.find(".balance").focus()
                    $bankcard.find(".tips-register").text("请输入提现金额").fadeIn()
                }else if(!password){
                    $bankcard.find(".pay-password").focus()
                    $bankcard.find(".tips-register").text("请输入交易密码").fadeIn()
                }else{
                    tools.fetchAjax(apiUrl.data+"/assets/withdraw",arg).done(function(ret){
                        if(ret.status=='0'){
                            $bankcard.find(".balance").val("")
                            $bankcard.find(".pay-password").val("")
                            tools.tipsAlert("提现成功")
                            setTimeout(function(){
                                location.href="../withdrawRecord.html"
                            },1500)              
                        }else{
                            tools.tipsAlert(ret.msg||"提现失败")
                        }
                    })
                }
            })
        },
        onEvent:function(){
            $withdraw=$('.withdraw-content');
            $withdraw.find('.bankid').click(function(){
                window.location.href = "../safe.html"
            })
        },
         withdrawRecord:function(){
            var $taskPage = $('.withdraw-body');
            var $page = $taskPage.find('.page-list');
            var searchInvestRecord = function (pageNum){
                var reqData={
                    pageNum:pageNum || 1
                }
                tools.fetchAjax(apiUrl.data + '/assets/balance_list',reqData).done(function(ret){
                    if (ret.status == 0) {
                        var banklist = ret.result && ret.result.list;
                        console.log(ret)
                        var pageData = ret.result && ret.result.pageEntity;
                        tools.renderTpl(
                            $('.table-list .banklist-hbs'),
                            $('#banklist-template'),
                            {banklist: banklist}
                        );
                        if(banklist.length==0){
                            $(".null-tips").show()
                        }else{
                            $(".null-tips").hide()
                        }
                        mainFn.setPageDate($page, pageData);
                    }
                })
            };
            //默认查询
            searchInvestRecord()
            // 分页点击
            mainFn.pageClick($page, function (pageNum) {
                searchInvestRecord(pageNum);
            });
        },
    }
    mainFn.init();
})()