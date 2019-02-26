import {getToken} from '@/utils/auth/'

export default  {
    token: getToken(),
    loginname: '', // 手机号
    roleName:'', // 角色名称
    username:'',  // 用户名
    role: {}
};

