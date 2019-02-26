import html from './footer.html';
require('./footer.scss');
module.exports = function() {
    if(document.getElementById('Js_footer')) {
        document.getElementById('Js_footer').innerHTML = html;
        console.log($('.footer'));
    }
}

/*
{
    footer(id,$) {
        document.getElementById(id).innerHTML = footer;
        
    },
    loginFooter(id,$) {
        document.getElementById(id).innerHTML = loginFooter;
        
    }
};
*/