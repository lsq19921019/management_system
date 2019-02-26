<template>
<!--     <div class="multi-menu" :wechatOptions = "wechatOptions">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <span class="el-checkbox__label multi-span">删除</span>
                <span class="el-checkbox__label multi-span">标注</span>
                <span class="el-checkbox__label multi-span">收集</span>
                <div style="margin: 20px 0;"></div>
                <div class="el-row"  v-for="item in wechats" style="border-top:1px solid #ccc">
                        <el-col :span="6">
                               <el-checkbox-group v-model="checkedWechats" @change="handleCheckedWechatIDsChange" style="display:inline-block;height:80px;line-height:80px">
                                       <el-checkbox  :label="item.id" :key="item.id">{{item.id}}</el-checkbox>
                               </el-checkbox-group>
                        </el-col>
                       <el-col :span="6">
                               <dl style="margin-top:10px;">
                                       <dt class="font24">{{item.name}}</dt>
                                       <dt>{{item.wechatNumber}}</dt>
                               </dl>
                        </el-col>
                        <el-col :span="6"  style="line-height:80px">
                               <span class="font24">{{item.status}}</span>
                        </el-col>
                         <el-col :span="6"  style="line-height:80px; cursor: pointer;">
                                <span @click="editInfo(item.id)">编辑</span>
                                <span @click="deleteInfo(item.id)">删除</span>
                         </el-col>
                </div>
    </div> -->
      <el-table  :data="tableData" style="width: 100%">
                <el-table-column
                  label="全选"   
                  type="selection"
                  width="55">
               </el-table-column>
                <el-table-column  label=""   width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label=""
                  width="180">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>姓名: {{ scope.row.name }}</p>
                      <p>住址: {{ scope.row.address }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
</template>
<script>
  export default {
        props:['wechatOptions'],
        data() {
                return {
                        checkAll: false,
                        checkedWechats: [],
                        wechats: [],
                        isIndeterminate: false,
                         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
                };
        },
        updated(){
                this.wechats = this.wechatOptions;
        },
        mounted(){
                this.wechats = this.wechatOptions;
        },
        methods: {
                handleCheckAllChange(val) {
                        var arr = [];
                        this.wechatOptions.forEach( function(element, index) {
                         arr.push(element.id);
                        });
                        this.checkedWechats = val ? arr : [];
                        this.isIndeterminate = false;
                },
                handleCheckedWechatIDsChange(value) {
                        console.log(value)
                        let checkedCount = value.length;
                        this.checkAll = checkedCount === this.wechats.length;
                        this.isIndeterminate = checkedCount > 0 && checkedCount < this.wechats.length;
                },
                editInfo(id){
                          console.log(id);
                },
                deleteInfo(id){

                }
        }
  };
</script>
<style lang="scss">
.multi-menu{
        color: #5a5e66;
        font-weight: 500;
}
.multi-span{
        font-size: 14px;
        cursor: pointer;
}
.font24{
  font-size:24px;
}
</style>