/**
 * 处理事件
 * @description date:2017-12-09 王志勇
 */


export default {
  updated(){
   this.data=this.defaultData;
   this.total=this.defaultTotal;
  },
    mounted(){
    
   
    },
    methods:{
        /**
          *列表序号计算
               * @param {number}  index 当前行号
          */
          indexMethod(index){
           
              return (this.pageIndex-1)*this.pageSize+index+1;
           },
          
            /**
             * 当前行被选中
             * @param {Object}  row 当前行数据
             */
            focus(row){
              //获取得焦点
               this.$emit('focus',{...row})
              
            },
            /**
             * 排序
             * @param {*} sortArgs 排序参数
             */
            sort(sortArgs)
            {
            
              if(sortArgs.prop)
              {//如果返回排序字段，则
                // this.$emit("sort",{sortName:sortArgs.prop,sortOrder:sortArgs.order==="ascending"?"asc":"desc"});
                this.sortName=sortArgs.prop;
                this.sortOrder=sortArgs.order==="ascending"?"asc":"desc";
                this.reload();
              }
             
            },
            /**
             * 刷新，等于查询数据
             * 
             */
            reload(){
           
              this.$emit('reload',{pageIndex:this.pageIndex,pageSize:this.pageSize,sortName:this.sortName,sortOrder:this.sortOrder})
            },

            /**
             * 分页大小改变
             * @param {number} pageSize 分页大小
             */
            handleSizeChange(pageSize){
             this.pageSize=pageSize;
             this.reload();
            },
            /**
             * 
             * @param {number} pageIndex 页号
             */
            handleCurrentChange(pageIndex)
            {
              this.pageIndex=pageIndex;
              this.reload();
            }
           

  }
}