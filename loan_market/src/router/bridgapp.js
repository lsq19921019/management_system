import distributeapp from '../pages/bridgapp/distributeapp';
import undertakeapp from '../pages/bridgapp/undertakeapp';

export default[
    {
        path: '/h5/distributeapp/:type?',
        name : 'DistributeApp',
        component: distributeapp,
        meta : {
            title : '跳转中'
        }
    }, 
    {
        path: '/h5/undertakeapp/:type?',
        name : 'Undertakeapp',
        component: undertakeapp,
        meta : {
            title : '跳转中'
        }
    },     
]