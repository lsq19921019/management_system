/**
 * 数据模型
 * @description date:2017-12-09 王志勇
 */
export default {
    data() {
        return {
          
            pageIndex:this.defaultPageIndex,//当前页号
            pageSize:this.defaultPageSize,//分页大小
            /**数据 */
          data: this.defaultData,
          total:this.defaultTotal,//总记录数
        }
      } ,
      computed:{
        /**
         * 自定义样式
         */
        style(){
            return  this.width?"width:"+this.width+"px":"";
        }
    },
}
