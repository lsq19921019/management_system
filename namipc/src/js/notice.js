(function(){
    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn={
        init:function(){
            mainFn.notice()
            mainFn.noticedeta()
        },
        notice:function(){
            tools.fetchAjax(apiUrl.data + '/message/notice_list').done(function(ret){
                if(ret.status==0){
                    var iconList = ret.result.list
                    var $noticeSection = $('.about-content');
                    tools.renderTpl($noticeSection.find('.platform-desc'), $('#plat-notice-template'), {iconList: iconList});
                }
            })
        },
        noticedeta:function(){
            var id = tools.getUrlParam('id');
            var reqData = {
                // projectId: id,
                noticeId: id
            };
            tools.fetchAjax(apiUrl.data +'/message/notice_detail',reqData).done(function(ret){
                if(ret.status==0){
                    console.log(ret)
                    var noticedeta = ret.result
                    var $noticeSection = $('.main-section');
                    $noticeSection.find('.notice-body .content').html(noticedeta.content)
                    $noticeSection.find('.notice-header h5').text(noticedeta.title)
                    $noticeSection.find('.notice-header .time').text(noticedeta.time)
                    $noticeSection.find('.notice-body .sign-time').text(noticedeta.time)
                }
            })
        }
    }
    mainFn.init()
})()