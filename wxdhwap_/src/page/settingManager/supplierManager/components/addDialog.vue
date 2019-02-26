<template>
    <span class="updataDialog">
        <el-button type="primary" size="mini" @click="handleAdd()">新增</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="添加代理商" id="multidialog" width="550px">
			<el-form class="small-space" 
					 ref="temps"
					 :model="temp" 
					 :rules="rules"
					 status-icon
					 label-position="right" 
					 label-width="100px" 
					 style='width: 400px; margin-left:50px;'
					 >
				<el-form-item label="名称" prop="providername">
					<el-input v-model="temp.providername" size="small" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="hideDialog">取 消</el-button>
				<el-button type="primary" @click="create">确 定</el-button>
			</div>
    	</el-dialog>
    </span>
</template>
<script>
import $ from "jquery";
export default {
//   props: ["btnText"],
  data() {
    return {
      temp: {
        providername: ""
      },
      rules: {
        providername: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      },

      dialogFormVisible: false
    };
  },
  mounted() {
      this.$refs["temps"].resetFields();
  },
  methods: {
    create() {
      this.$refs["temps"].validate(valid => {
        if (valid) {
          this.$emit("updateData", this.temp);
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.providername = "";
    //   this.$refs["temps"].resetFields();
    },
    hideDialog() {
      this.dialogFormVisible = false;
      this.$refs["temps"].resetFields();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.resetTemp();
      this.$refs["temps"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>

</style>