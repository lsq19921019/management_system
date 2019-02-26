/**
 * create : 田鹏伟 2018-12-28
 * desc : 运营管理-对接平台统计
 */
module.exports = {
    //校验规则
    check : {
    },
    //需要展示的字段
    keys : {
    },
    //搜索字段
    searchKeys : {
        platformName : '',  //平台名称
        startDate : '',  //开始日期
        endDate : '',  //结束日期
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {

            case 'platformName':
            label = '平台名称';
            break;

            case 'onePushTotal':
            label = '一推单数';
            break;

            case 'onePushWaitTotal':
            label = '一推待推送单数';
            break;

            case 'onePushSuccessTotal':
            label = '一推成功单数';
            break;

            case 'twoPushWaitTotal':
            label = '二推待推送单数';
            break;

            case 'twoPushSuccessTotal':
            label = '二推成功单数';
            break;

            case 'bindCardSuccessTotal':
            label = '绑卡成功单数';
            break;

            case 'toAuditNowTotal':
            label = '待审核单数';
            break;

            case 'passAuditNowTotal':
            label = '审核通过单数';
            break;

            case 'refusedAuditNowTotal':
            label = '审核拒绝单数';
            break;

            case 'withSuccessTotal':
            label = '用款确认成功单数';
            break;

            case 'loanSuccessTotal':
            label = '放款成功单数';
            break;

            case 'passAuditAmountTotal':
            label = '审核通过金额';
            break;

            case 'calculDateDesc':
            label = '日期';
            break;

            case 'loanAmountTotal':
            label = '放款金额';
            break;

            case 'toAuditTotal':
            label = '待审核单数（不依赖绑卡）';
            break;

            case 'passAuditTotal':
            label = '审核通过数（不依赖绑卡）';
            break;

            case 'refusedAuditTotal':
            label = '审核拒绝单数（不依赖绑卡）';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};