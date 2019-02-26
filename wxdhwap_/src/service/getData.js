import fetch from '../config/fetch'

/**
 *  获取日志列表
 */

export const getLogger = data => fetch('/logmanage/query', data, 'POST');


/**
 *  获取追踪列表
 */
export const getTrack = data => fetch('/track/histrack', data, 'POST');


/**
 * 获取公众号基础信息
 */
export const getBaseInfo = data => fetch('/wechatmanage/baseinfo', data, 'POST');


/**
 * 公众号基础信息修改
 */
export const editWXDetail = data => fetch('/wechatmanage/edit', data, 'POST');


/**
 * 历史发文
 */
export const getMsgHistory = data => fetch('/wechatmanage/hisarticle', data, 'POST');


/**
 * 接洽查询
 */
export const queryContact = data => fetch('/contactmanage/query', data, 'POST');


/**
 * 初次接洽
 */
export const firstSaveContact = data => fetch('/contactmanage/first/save', data, 'POST');


/**
 * 二次接洽
 */
export const secSaveContact = data => fetch('/contactmanage/second/save', data, 'POST');


/**
 * 开始收集
 */
export const startCollect = data => fetch('/wechatmanage/collect', data, 'POST');


/**
 * 历史发文详情
 */
export const hisarticleQuery = data => fetch('/wechatmanage/hisarticlequery', data, 'POST');


/**
 * 文章追踪详情
 */
export const trackDetail = data => fetch('/track/trackdetail', data, 'POST');


/**
 * 开始追踪
 */
export const executeTrack = data => fetch('/track/executeTrack', data, 'POST');


/**
 * 公众号标注
 */
export const mark = data => fetch('/wechatmanage/mark', data, 'POST');


/**
 * 我的投放
 */
export const myInto = data => fetch('/delivery/findWechatDeliveryList', data, 'POST');
/**
 * 我的投放--删除公众号
 */
export const myIntoDelete = data => fetch('/delivery/deleteDelivery', data, 'POST');
/**
 * 投放信息
 */
export const publishInto = data => fetch('/delivery/queryWechatDelivery', data, 'POST');
/**
 * 编辑投放信息
 */
export const editDelivery = data => fetch('/delivery/editDelivery', data, 'POST');
/**
 * 编辑效果信息
 */
export const saveWechatDeliveryEffect = data => fetch('/delivery/saveWechatDeliveryEffect', data, 'POST');
/**
 * 文章信息
 */
export const queryWechatArticle = data => fetch('/delivery/queryWechatArticle', data, 'POST');
/**
 * 投放记录
 */
// export const loginlog = data => fetch('/logmanage/query', data, 'POST');
/**
 * 获取验证码
 */
export const getIdentify = () => fetch('/kaptcha', {}, 'POST',  'noToken');


/**
 * 用户登录
 */
export const login = data => fetch('/userManage/login', data, 'POST', 'noToken');


/**
 * 用户列表
 */
export const findUserList = data => fetch('/userManage/findUserList', data, 'POST');


/**
 * 角色查询
 */
export const findRoleList = data => fetch('/role/findRoleList', data, 'POST');


/**
 * 删除用户
 */
export const deleteUser = data => fetch('/userManage/deleteUser', data, 'POST');

/**
* 工作台-微信库
*/
export const wxkTable = data => fetch('/wechatmanage/query/2',data,'POST');

/**
* 工作台-微信库-收藏
*/
export const wxkAreen = data => fetch('/wechatHouse/addWechatHouse',data,'POST');

/**
* 工作台-微信库-删除收藏记录
*/
export const wxkcancelAreen = data => fetch('/wechatHouse/deleteWechatHouse',data,'POST');

/**
 * 微信号下面的投放记录
 */
export const findDeliveryByWechatIdList = data => fetch('/delivery/findDeliveryByWechatIdList', data, 'POST');


/**
 * 删除投放记录
 */
export const deleteDelivery = data => fetch('/delivery/deleteDelivery', data, 'POST');


/**
 * 修改用户信息
 */
export const updateUser = data => fetch('/userManage/updateUser', data, 'POST');


/**
 * 添加用户
 */
export const addUser = data => fetch('/userManage/addUser', data, 'POST');

/**
 * 修改密码
 */
export const resetPwd = data => fetch('/userManage/resetPwd', data, 'POST');


/**
 * 查询当前登录用户信息
 */
export const currentUserInfo = data => fetch('/userManage/currentUserInfo', data, 'POST');


/**
 * 查询用户
 */
export const findUserById = data => fetch('/userManage/findUserById', data, 'POST');   


/**
 * 添加投放信息
 */
export const addDelivery = data => fetch('/delivery/addDelivery', data, 'POST');  

//微信库管理
/**
 * 公众号查询
 */
export const wechatmanageQuery = data => fetch('/wechatmanage/query', data, 'POST');  
/**
 * 公众号批量选中
 */
export const wechatmanageBatchchoose = data => fetch('/wechatmanage/batchchoose', data, 'POST'); 
/**
 * 公众号删除
 */
export const wechatmanageDelete = data => fetch('/wechatmanage/delete', data, 'POST');
/**
 * 公众号收集
 */
export const wechatmanageCollect = data => fetch('/wechatmanage/collect', data, 'POST');    
/**
 * 公众号标注 
 */
export const wechatmanageMark = data => fetch('/wechatmanage/mark', data, 'POST'); 
/**
* 公众号导入查询
*/
export const wechatmanageImportquery = data => fetch('/wechatmanage/importquery', data, 'POST'); 
/**
* 公众号导入编辑
*/
export const wechatmanageImportedit = data => fetch('/wechatmanage/importedit', data, 'POST'); 

/**
* 公众号导入保存
*/
export const wechatmanageImportsave = data => fetch('/wechatmanage/importsave', data, 'POST'); 
/**
* 公众号导入删除
*/
export const wechatmanageImportdelete = data => fetch('/wechatmanage/importdelete', data, 'POST'); 
/**
* 公众号新增
*/
export const wechatmanageImportAdd = data => fetch('/wechatmanage/add', data, 'POST'); 
/**
* 公众号批量导入
*/
export const wechatmanageImport = (url,data) => fetch(url, data, 'POST',true); 



/**
 * 微信库--接洽
 */
export const consultWith = data => fetch('/contactmanage/queryHistory', data, 'POST');   


/**
 * 用户退出
 */
export const logout = () => fetch('/userManage/logout', {}, 'POST');


/**
 * 权限分配
 */
export const queryAllMenuByroleId = data => fetch('/menuManage/queryAllMenuByroleId', data, 'POST');

/**
 * 修改角色名称
 */
export const updateRole = data => fetch('/role/updateRole', data, 'POST');
/**
 * 添加角色名称
 */
export const addRole = data => fetch('/role/addRole', data, 'POST');

/**
 *删除角色
 */
export const deleteRole = data => fetch('/role/deleteRole', data, 'POST');

/**
 *查询角色是否菜单权限
 */
export const checkRights = data => fetch('/role/checkRights', data, 'POST');

/**
 *保存菜单
 */
export const saveRights = data => fetch('/role/saveRights', data, 'POST');

/**
 *供应商详
 */
export const providerCount = data => fetch('/wechatProvider/providerCount', data, 'POST');
/**
 *删除供应商资源信息
 */
export const deleteWechatProvider = data => fetch('/wechatProvider/delete', data, 'POST');
/**
 *供应商详情页
 */
export const queryProviderCount = data => fetch('/wechatProviderResource/query', data, 'POST');
/**
 *供应商详情页--基础信息
 */
export const queryProviderinfo = data => fetch('/wechatProvider/info', data, 'POST');
/**
 *供应商管理列表
 */
export const queryWechatProvider = data => fetch('/wechatProvider/query', data, 'POST');
/**
 *供应商管理列表
 */
export const editWechatProvider = data => fetch('/wechatProvider/edit', data, 'POST');
/**
 *添加供应商
 */
export const addWechatProvider = data => fetch('/wechatProvider/add', data, 'POST');
/**
 *供应商资源列表
 */
export const queryWechatProviderResource = data => fetch('/wechatProviderResource/query', data, 'POST');
/**
 *删除供应商资源信息
 */
export const deleteWechatProviderResource = data => fetch('/wechatProviderResource/delete', data, 'POST');
/**
 *编辑供应商资源信息
 */
export const editWechatProviderResource = data => fetch('/wechatProviderResource/edit', data, 'POST');
/**
 *新增供应商资源信息
 */
// export const addWechatProviderResource = data => fetch('/wechatProviderResource/save', data, 'POST');
export const addWechatProviderResource = data => fetch('/wechatProviderResource/add', data, 'POST');
/**
 *保存供应商资源信息
 */
export const saveWechatProviderResource = data => fetch('/wechatProviderResource/save', data, 'POST');
/**
 *清空/删除供应商资源列表信息
 */
export const cleanWechatProviderResource = data => fetch('/wechatProviderResource/clean', data, 'POST');
/**
 *查询供应商资源添加信息_临时
 */
export const queryImportProviderResource = data => fetch('/wechatProviderResource/queryImportProviderResource', data, 'POST');
/**
 *编辑供应商资源添加信息_临时
 */
 export const editImportProviderResource = data => fetch('/wechatProviderResource/editImportProviderResource', data, 'POST');
 /**
 *模糊查询用户
 */
export const obscureUserList = data => fetch('/userManage/obscureUserList', data, 'POST');
/**
 * 数据统计-任务数据
 */
export const  findContact = data => fetch('/myTaskController/findContact', data, 'POST');

/**
 *接洽任务-任务列表
 */
export const  findMyTaskList= data => fetch('/myTaskController/findMyTaskList', data, 'POST');

/**
 * 指派
 */
export const addTask = data => fetch('/myTaskController/addTask', data, 'POST');


/**
 * 供应商资源列表
 */
export const wprq = data => fetch('/wechatProviderResource/queryWechatProviderById', data, 'POST');


