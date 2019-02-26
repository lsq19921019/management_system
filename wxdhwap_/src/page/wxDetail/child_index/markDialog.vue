<template>
    <span>
        <el-button type="text" @click="dialogFormVisible = true"> 标注 </el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="标注" id="multidialog" width="550px">
    		<el-form class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    			<el-form-item label="">
    				<el-radio-group v-model="markVal.markStatus" @change="getRadioVal">
                        <el-radio :label="1">待观察</el-radio>
                        <el-radio :label="2">可投放</el-radio>
                        <el-radio :label="3">搁置</el-radio>
                    </el-radio-group>
                    <el-input v-model="markVal.reason" v-show="reasonVisible" placeholder="请输入搁置原因"></el-input>
    			</el-form-item>
    		</el-form>
    		<div slot="footer" class="dialog-footer">
    			<el-button @click="dialogFormVisible = false">取 消</el-button>
    			<el-button type="primary" @click="multiMark">确 定</el-button>
    		</div>
    	</el-dialog>
    </span>
</template>
<script>
    export default{
        data(){
            return{
                dialogFormVisible: false,
                reasonVisible:false,
                markVal:{
                    markStatus:'',
                    reason:'',
                    wechatId:''
                }
            }
        },
        methods:{
            getRadioVal(val){
                if(val == "3"){
                    this.reasonVisible = true;
                }else{
                    this.reasonVisible = false;
                }
            },
            multiMark() {
                if(this.markVal.markStatus){
                    if(this.markVal.markStatus == '3'){
                        if(this.markVal.reason !==''){
                            this.markVal.wechatId = this.$route.query.wechatId;
                            this.$emit("multiMarkID",this.markVal);
                            this.dialogFormVisible = false;
                            this.reasonVisible = false;
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '请输入搁置原因!'
                            });
                        }
                    }else{
                        this.markVal.wechatId = this.$route.query.wechatId;
                        this.$emit("multiMarkID",this.markVal);
                        this.dialogFormVisible = false;
                        this.reasonVisible = false;
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请选择标注!'
                    });
                    this.dialogFormVisible = true;
                }
            },
        }
    }
</script>