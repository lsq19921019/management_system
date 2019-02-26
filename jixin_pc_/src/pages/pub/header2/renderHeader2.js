import html from './header2.html';
require('./header2.scss');
$(document).ready(function(){
    $('#server').hover(function(){
        $('.nav_server').stop().slideDown();
    },function(){
        $('.nav_server').stop().slideUp();
    });
})
module.exports = function() {
    if(document.getElementById('Js_header')) {
        document.getElementById('Js_header').innerHTML = html;
    }
}
