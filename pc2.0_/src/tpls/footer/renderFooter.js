import footer from './footer.html';
import loginFooter from './login_footer.html';
require('./footer.scss');

module.exports = {
    footer(id,$) {
        document.getElementById(id).innerHTML = footer;
        
    },
    loginFooter(id,$) {
        document.getElementById(id).innerHTML = loginFooter;
        
    }
};