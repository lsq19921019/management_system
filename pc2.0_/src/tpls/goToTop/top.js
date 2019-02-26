import html from './top.html';
require('./top.scss');
function renderGoTop(id,$) {
    document.getElementById(id).innerHTML = html;
    $('#J_desk').click(function() {
        window.open("https://xiaoge.udesk.cn/im_client/?web_plugin_id=54058&channel=PC&cur_url=" + escape(location.href) + "&pre_url=" + escape(document.referrer), "udesk_im", "width=780,height=560,top=200,left=350,resizable=yes");
    });
    $('#J_goToTop').click(function() {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
    });
}
module.exports = renderGoTop;