<template>
    <span>
        <el-button type="success" size="mini" @click="handleAdd"> {{btnText}} </el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="基础信息" id="multidialog" width="550px">
			<div class="baseinfo-con">
                <p><span>发掘人:</span>{{baseInfo.sourcename||"暂无信息"}}</p>
                <p><span>对接人:</span>{{baseInfo.dockingpeople||"暂无信息"}}</p>
                <p><span>职位:</span>{{baseInfo.position||"暂无信息"}}</p>
                <p><span>地址:</span>{{baseInfo.companyaddress||"暂无信息"}}</p>
                <p><span>微信:</span>{{baseInfo.wechatno||"暂无信息"}}</p>
                <p><span>QQ:</span>{{baseInfo.qqno||"暂无信息"}}</p>
                <p><span>电话:</span>{{baseInfo.telphone||"暂无信息"}}</p>
                <p><span>备注:</span>{{baseInfo.sourcename||"暂无信息"}}</p>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">确定</el-button>
			</div>
    	</el-dialog>
    </span>
</template>
<script>
export default {
  props: ["btnText", "baseInfo"],
  data() {
    return {
      dialogFormVisible: false,
      reasonVisible: false,
      markVal: {
        endId: "",
        markStatus: "",
        reason: "",
        sourceMarkStatus: "",
        sourceTrackStatus: "",
        startId: "",
        wechatIds: ""
      }
    };
  },
  mounted() {
    console.log(this.baseInfo);
  },
  methods: {
    multiMark() {
      if (this.markVal.markStatus) {
        if (this.markVal.markStatus == "3") {
          if (this.markVal.reason !== "") {
            this.markVal.wechatIds = this.multiMarkedID.toString();
            this.$emit("multiMarkID", this.markVal);
            this.dialogFormVisible = false;
            this.reasonVisible = false;
          } else {
            this.$message({
              type: "warning",
              message: "请输入搁置原因!"
            });
          }
        } else {
          this.markVal.wechatIds = this.multiMarkedID.toString();
          this.$emit("multiMarkID", this.markVal);
          this.dialogFormVisible = false;
          this.reasonVisible = false;
        }
      } else {
        this.$message({
          type: "warning",
          message: "请选择标注!"
        });
        this.dialogFormVisible = true;
      }
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.reasonVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
    .baseinfo-con{
        padding: 0 30px;
    }
    .baseinfo-con p{
        margin-bottom: 15px
    }
    .baseinfo-con span{
        margin-right: 10px;
        font-weight: bold;
    }
</style>