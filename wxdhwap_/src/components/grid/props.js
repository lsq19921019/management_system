/**
 * 对外接口
 * @description date:2017-12-09 王志勇
 */

export default {
    props: {
        /**
         *样式
         */
        width: {
            type: [String, Number],
            default: ""
        },
        /**
         *高度
         */
        height: {
            type: [String, Number],
            default: "745"
        },
        /**
         * 是否显示边框 
         */
        border: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否允许获取焦点
         */
        focusAble: {
            type: Boolean,
            default: true,
        },
        /**
         * 是否可选择
         */
        selectAble: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否选择序号 
         */
        rowNumber: {
            type: Boolean,
            default: false,
        },
        /**
         * 后台url
         */
        url: {
            type: String,
            default:""
        },
        /**
         *列,可以不传，按table 组件中el-table-column
         */
        columns: {
            type: Array,
            default: function () {
                return []
            }
        },
        /**
         * 默认数据 
         */
        defaultData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        /**
         * 默认总记录数
         */
        defaultTotal: {
            type: Number,
            default: function () {
                return 0;
            }
        },
        /**
         * 默认页号
         * */
        defaultPageIndex: {
            type: Number,
            default: 1,
        },
        /**
         * 默认分页大小 
         * */
        defaultPageSize: {
            type: Number,
            default: 10,
        },
        /**
         *默认后台数据源
         */
        dataSource: {
            type: String,
            default: "data",
        },
        /**
         * 默认总记录数据源
         */
        totalSource: {
            type: String,
            default: "total",
        },
        /**
         * 参数
         */
        params:{
            type: [Object],
          
        }

    }
}