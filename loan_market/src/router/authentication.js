
import authentication from '../pages/authentication/index';
//身份认证
import authBase from '../pages/authentication/auth_base';
import authIdentity from '../pages/authentication/auth_identity';
import authIdentity2 from '../pages/authentication/auth_identity2';
import identityProve from '../pages/authentication/identity_prove';
//联系人认证
import authContact from '../pages/authentication/auth_contact';
//添加信用卡1
import authAddCard from '../pages/authentication/auth_add_card';
//添加信用卡2
import authAddCard2 from '../pages/authentication/auth_add_card2';
//添加工作信息
import authAddWork from '../pages/authentication/auth_add_work';
//添加工作信息2
import authAddWork2 from '../pages/authentication/auth_add_work2';
//添加工作信息3
import authAddWork3 from '../pages/authentication/auth_add_work3';
//上传图片共用模板
import uploadPhoto from '../pages/authentication/upload_photo';
//社交信息
import authSocial from '../pages/authentication/auth_social';
//其他信息
import authOther from '../pages/authentication/auth_other';
//加分认证
import bonusProve from '../pages/authentication/auth_bonus_prove';
//照片资料
import photoInfor from '../pages/authentication/auth_photo_infor';
//认证成功
import authSuccess from '../pages/authentication/auth_success';
//认证中
import authAuthing from '../pages/authentication/auth_authing';
//绑卡
import authBindBankCard from '../pages/authentication/auth_bind_bankcard';
//身份证验证
import newIdentity from '../pages/authentication/auth_new_identity';
// auth_photo_infor
export default [
    {
        path: '/authentication',
        name: 'Authentication',      
        component: authentication,
        meta : {
            title : '认证中心'
        }
    },
    {
        path: '/auth/base',
        name: 'AuthBase',
        component: authBase,
        meta : {
            title : '基础信息'
        }
    },
    {
        path: '/auth/identity',
        name: 'AuthIdentity',
        component: authIdentity,
        meta : {
            title : '身份认证'
        }
    },
    {
        path: '/auth/identity2',
        name: 'AuthIdentity2',      
        component: authIdentity2,
        meta : {
            title : '身份认证'
        }
    },
    {
        path: '/auth/identityProve',
        name: 'IdentityProve',
        component: identityProve,
        meta : {
            title : '身份证验证'
        }
    },
    {
        path: '/auth/contact',
        name: 'AuthContact',      
        component: authContact,
        meta : {
            title : '联系人认证'
        }
    },
    {
        path: '/auth/addCard',
        name: 'AuthAddCard',      
        component: authAddCard,
        meta : {
            title : '信用卡认证'
        }
    },
    {
        path: '/auth/addCard2',
        name: 'AuthAddCard2',      
        component: authAddCard2,
        meta : {
            title : '信用卡认证'
        }
    },
    {
        path: '/auth/addWork',
        name: 'AuthAddWork',      
        component: authAddWork,
        meta : {
            title : '工作信息',
            // keepAlive: true
            //页面不重新加载；
        }
    },
    {
        path: '/auth/addWork2',
        name: 'AuthAddWork2',      
        component: authAddWork2,
        meta : {
            title : '工作信息'
        }
    },
    {
        path: '/auth/addWork3',
        name: 'AuthAddWork3',      
        component: authAddWork3,
        meta : {
            title : '工作信息'
        }
    },
    {
        path: '/auth/uploadPhoto/:type',
        name: 'UploadPhoto',      
        component: uploadPhoto,
        meta : {    
            title : '工作照片'
        }
    },
    {
        path: '/auth/social',
        name: 'AuthSocial',      
        component: authSocial,
        meta : {    
            title : '社交信息'
        }
    },
    {
        path: '/auth/other',
        name: 'AuthOther',      
        component: authOther,
        meta : {    
            title : '其他信息'
        }
    },
    {
        path: '/auth/bonusProve',
        name: 'BonusProve',      
        component: bonusProve,
        meta : {    
            title : '加分认证'
        }
    },
    {
        path: '/auth/photoInfor',
        name: 'PhotoInfor',
        component: photoInfor,
        meta : {    
            title : '照片资料'
        }
    },
    {
        path: '/auth/authSuccess',
        name: 'AuthSuccess',      
        component: authSuccess,
        meta : {    
            title : '认证成功'
        }
    },
    {
        path: '/auth/authAuthing',
        name: 'AuthAuthing',      
        component: authAuthing,
        meta : {    
            title : '资料正在认证中'
        }
    },
    {
        path: '/auth/bindCard/:orderNo',
        name: 'bindCard',      
        component: authBindBankCard,
        meta : {    
            title : '绑卡'
        }
    },
    {
        path: '/auth/newIdentity',
        name: 'newIdentity',      
        component: newIdentity,
        meta : {    
            title : '身份证验证'
        }
    }
];



//uploadPhoto 