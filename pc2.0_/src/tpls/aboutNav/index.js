import aboutNav from './index.tpl';
require('./index.scss');

function renderAboutNav(id,$,type) {
    let config = [];    
    switch(type) {
        case 'about': //关于我们
        config = [
            { text : '公司简介', href : './about_xg_company.html' },
            { text : '组织信息', href : './about_xg_basicInfo.html' },
            { text : '管理团队', href : './about_xg_team.html' },
            { text : '收费标准', href : './about_xg_toll.html' },
            { text : '联系我们', href : './about_xg_contact.html' }
        ];
        break;
        
        case 'notice':  //对外公告
        config = [
            { text : '备案信息', href : './record_info.html' },
            { text : '重大事项', href : './about_xg_major.html' },
            { text : '平台公告', href : './noticePop_list.html' },
            // { text : '审查报告', href : './iper.html' }
        ];
        break;

        case 'security':  //安全保障
        config = [
            { text : '安全保障', href : './security.html' },            
            // { text : '银行存管', href : './bank_dep.html' },
            { text : '风险管理', href : './risk_management.html' }
        ];
        break;

        case 'news':  //新闻报道
        config = [
            { text : '新闻动态', href : './news.html' },
            { text : '小鸽课堂', href : './classroom.html' }
        ];
        break;

        case 'lendersEdu':  //出借人教育
        config = [
            { text : '法律法规', href : './laws_page.html' },
            { text : '监管机构', href : './supervision.html' },
            { text : '风险提示', href : './risk.html' }
        ];
        break;
    }
    document.getElementById(id).innerHTML = aboutNav({ config : config });
    //导航定位
    let pathName = location.pathname.replace('.html','').split('/')[1];
    $(`#J_${pathName}`).addClass('active');
}
module.exports = renderAboutNav;