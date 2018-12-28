/**
 * create : 田鹏伟 2018-10-23
 * desc : 订单系统
 */

//订单模块首页 
import orderList from '../pages/order/index';
//订单详情
import orderDetail from '../pages/order/detail';
export default [
    {
        path: '/order/list/:orderStatus',
        name: 'OrderList',      
        component: orderList,
        meta : {
            title : '订单列表'
        }
    },
    {
        path: '/order/detail/:orderNo/:tab?',
        name: 'OrderDetail',      
        component: orderDetail,
        meta: {
            title : '订单详情'
        }
    }
];
