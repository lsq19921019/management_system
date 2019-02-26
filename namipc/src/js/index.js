(function () {
    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();
    // tools.loginCheck()
    var mainFn = {
        init: function () {                   
            mainFn.getIndexData();
            mainFn.getcooperationData();
            mainFn.onload();
            mainFn.scroll();
        },
        scroll:function(){
            setInterval(mainFn.AutoScroll,5000);
        },
        AutoScroll:function() {
            $('.notice_active').find("ul").animate({
                marginTop: "-116px"},1000,
            function() {
                $(this).css({
                    marginTop: "-58px"
                }).find("li:first").appendTo(this);
            });
        },
        onload:function(){
            var token = Cookies.get('token') || '';
            if (!token) {
                $('.login-fast').css('display','flex');
                $('.logged').css('display','none');
            }else{
                var count = Cookies.get('count');
                $(".login-fast").css('display','none');
                $(".logged").css('display','flex');
                $('.logged .nub').text(count)
            }
        },
        getIndexData: function () {
            // url: apiUrl.data + 'index/index_data'
            // url: '/mockData/indexData.json'
            var noticeinfo = $(".notice-info")
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.'
            };
            tools.fetchAjax(apiUrl.data + '/index/index_data').done(function (ret) {
                if (ret.status === '0' || ret.status === 0) {
                    var bannerList = ret.result && ret.result.bannerList || [];
                    var noticeList = $.extend((ret.result && ret.result.helpList), (ret.result && ret.result.iconStatistics));
                    noticeList.title = noticeList.title || noticeList.titile;
                    var projectList_tj = ret.result && ret.result.projectList_tj;
                    var projectList_st = ret.result && ret.result.projectList_st;
                    var projectList_ft = ret.result && ret.result.projectList_ft;
                    var $noticeSection = $('.notice-section');
                    var $recommendSection = $('.recommend-section');
                    //公告信息
                        // var money1 = new CountUp('money1', 0, noticeList.invest, 0, 1.5, options),
                        //     money2 = new CountUp('money2', 0, noticeList.profit, 0, 1.5, options)
                        //     money3 = new CountUp('money3', 0, noticeList.register, 0, 1.5, options)
                        //     money4 = new CountUp('money4', 0, noticeList.sccumulative, 0, 1.5, options)
                        // money1.start();
                        // money2.start();
                        // money3.start();
                        // money4.start();
                    //noticeinfo.find(".invest-money").text(noticeList.invest)
                    // noticeinfo.find(".profit-money").text(noticeList.profit)
                    // noticeinfo.find(".register-money").text(noticeList.register)
                    // noticeinfo.find(".sccumulative-money").text(noticeList.sccumulative)

                    tools.renderTpl($('.banner'), $('#banner-template'), {bannerList: bannerList});
                    tools.renderTpl($noticeSection.find('.notice-info .notice_active ul'), $('#notice-info-template'), {noticeList:noticeList});
                    tools.renderTpl($recommendSection.find('.recommend-plat'), $('#recommend-plat-template'), {projectList_st: projectList_st});
                    tools.renderTpl($recommendSection.find('.recommend-super'), $('#recommend-super-template'), {projectList_ft: projectList_ft});
                    // banner轮播
                    // $('.banner').lubo({});
                    $(".bigger .b-more").attr("src",__uri('../img/more.png'))

                }
            }).fail(function (err) {
                console.log(err);
            });
        },
        getcooperationData: function () {
            // type，1 合作伙伴 2 友情连接
            tools.fetchAjax(apiUrl.data + '/help/cooperation_list', {pageNum: '1', type: '1'}).done(function (ret) {
                if (ret.status === '0' || ret.status === 0) {
                    if (ret.status === '0' || ret.status === 0) {
                        var cooperationList = ret.result && ret.result.list;
                        tools.renderTpl($('.partner-section .partner-hbs'), $('#partner-template'), {cooperationList: cooperationList});
                    }
                }
            });
        }
    };

    mainFn.init();

})();