(function () {

    // 加载公共模块
    var tools = require('../mod/tools');
    var apiUrl = tools.apiUrl();

    var mainFn = {
        init: function () {
            mainFn.getSearchOption();
            mainFn.getFinanceList();
            mainFn.getBtnClick();
            mainFn.pageClick();
        },
        getSearchOption: function () {
            var resetDate = function (dataList) {
                var returnArr = [];
                for (var i in dataList) {
                    var item = {};
                    for (var j in dataList[i]) {
                        item.key = j;
                        item.value = dataList[i][j];
                    }
                    returnArr.push(item);
                }
                return returnArr;
            };
            tools.fetchAjax(apiUrl.data + '/finance/query_criteria').done(function (ret) {
                if (ret.status == 0) {
                    var annualized = resetDate(ret.result && ret.result.annualized);
                    var deadline = resetDate(ret.result && ret.result.deadline);
                    (ret.result && ret.result.list).unshift({pfname: '不限'});
                    var companyList = ret.result.list;
                        tools.renderTpl(
                        $('.search-section .ann-hbs'),
                        $('#ann-template'),
                        {annualized: annualized}
                    );
                    tools.renderTpl(
                        $('.search-section .deadline-hbs'),
                        $('#deadline-template'),
                        {deadline: deadline}
                    );
                    tools.renderTpl(
                        $('.search-section .company-hbs'),
                        $('#company-template'),
                        {companyList: companyList}
                    );
                }
            });
        },
        getFinanceList: function (type, value, pageNum) {
            var projectRange = $('body').attr('class').indexOf('plat') > -1 ? '0' : '1';
            var reqData = {
                type: type || 1,
                projectRange: projectRange,
                value: value || '',
                pageNum: pageNum || 1
            };
            tools.fetchAjax(apiUrl.data + '/finance/project_list', reqData).done(function (ret) {
                if (ret.status === '0' || ret.status === 0) {
                    console.log(ret)
                    var recommendList = ret.result && ret.result.list || [];
                    tools.renderTpl(
                        $('.recommend-section .recommend-box'),
                        $('#recommend-box-template'),
                        {recommendList: recommendList}
                    );
                    if (!recommendList.length) {
                        $('.null-tips').show();
                    }else{
                        $('.null-tips').hide();
                    }

                    // 分页
                    var pageData = ret.result && ret.result.pageEntity;
                    mainFn.setPageDate(pageData);
                }
            }).fail(function (err) {
                console.log(err);
            });
        },
        getBtnClick: function () {
            var $searchOption = $('.search-section');
            var $sort = $('.sort-section');

            // 筛选按钮
            $searchOption.on('click', 'a', function () {
                var $this = $(this);
                $searchOption.find('a').removeClass('active');
                $searchOption.find('a.first').addClass('active');
                $sort.find('a').removeClass('active');
                $sort.find('a.first').addClass('active');
                var parentNode = $this.parents('.search-item');
                parentNode.find('a').removeClass('active');
                $this.addClass('active');
                var type = $this.attr('data-type');
                var value = $this.attr('data-key');
                $('body').attr('data-type', type);
                $('body').attr('data-key', value);
                mainFn.getFinanceList(type, value);
            });

            // 排序按钮
            $sort.on('click', 'a', function () {
                var $this = $(this);
                $searchOption.find('a').removeClass('active');
                $searchOption.find('a.first').addClass('active');
                $sort.find('a').removeClass('active');
                $this.addClass('active');
                var type = $this.attr('data-type');
                var value = $this.attr('data-key');
                $('body').attr('data-type', type);
                $('body').attr('data-key', value);
                mainFn.getFinanceList(type, value);
            });
        },
        setPageDate: function (pageData) {
            var $page = $('.page-list');
            if (pageData.totalPage > 1) {
                $page.show();
            }else{
                $page.hide();
            }
            $page.attr('data-totalPage', pageData.totalPage);
            $page.find('.all').text('共' + pageData.totalCount + '条');
            $page.find('.cur-page').text(pageData.currentPage + '/' + pageData.totalPage);
        },
        pageClick: function () {
            var $page = $('.page-list');
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
                var type = $('body').attr('data-type') || '';
                var value = $('body').attr('data-key') || '';
                mainFn.getFinanceList(type, value, pageNum * 1);
            });
        }
    };

    mainFn.init();

})();