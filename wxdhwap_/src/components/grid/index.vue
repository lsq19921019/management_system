<template>
<div :style="{width:width}" class="grid">
   <el-table
   
    :style="style"
    :border="border"  
    :height="height"
    :highlight-current-row="focusAble"
  
     :data="data"
    @current-change="focus"
    @sort-change="sort"
    >
     <el-table-column
     fixed
      type="index"
      :index="indexMethod"
      v-if="rowNumber"
      >
    </el-table-column>

       <el-table-column
       fixed 
      type="selection"
      width="55"
      v-if="selectAble"
      >
    </el-table-column>
     <el-table-column v-for="(column,index) in columns" :key="index"
      :fixed="column.fixed"
      :prop="column.name"
      :label="column.label"
      :sortable="column.sortable?'custom':false"
      :width="column.width">
    </el-table-column>
    <slot></slot>
  </el-table>
  <div style="text-align:right;margin-top:5px;margin-right:20px;">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 15, 20, 30,40,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
   
    </div>
</template>
<script>
/**
 * @description 王志勇 2017-12-07 分页表格控件
 */
import methods from "./methods.js";
import data from "./data.js";
import props from "./props.js";
export default {
    
    mixins:[methods,data,props]
  }
</script>
<style scoped>

</style>


