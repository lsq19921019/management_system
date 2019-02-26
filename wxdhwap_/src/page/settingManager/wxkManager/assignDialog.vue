<template>
    <span>
        <el-button type="text" @click="assignHandle"> {{btnText}} </el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="指派" id="multidialog" width="550px">
			<el-form :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="跟进人"> 
                    <el-select v-model="form.userId" placeholder="请选择">
                        <el-option 
                            v-for="item in trackPerson" 
                            :key="item.userId"
                            :label="item.username"
                            :value="item.userId">
                        </el-option>
                    </el-select>
                </el-form-item>   
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="multiMark">确认</el-button>
                </el-form-item>      
            </el-form>
    	</el-dialog>
    </span>
</template>
<script>
    export default{
        props:['btnText', 'multiMarkedID', 'trackPerson'],
        data(){
            return{
                dialogFormVisible: false,
                form:{
                    userId: '',
                    wechatnos:''
                }
            }
        },
        mounted(){
            this.init();
            console.log("haha", this.trackPerson)
        },
        methods:{
            init(){
                
            },
            multiMark(){
                if(this.form.userId){
                    this.form.wechatnos = this.multiMarkedID.toString();
                    this.$emit("multiAssignID",this.form);
                    this.dialogFormVisible = false;
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请选择跟进人!'
                    });
                    this.dialogFormVisible = true;
                }
            },
            assignHandle(){
                if(this.multiMarkedID ==''){
                    this.$message({
                        type: 'warning',
                        message: '请先选择需要指派的微信号!'
                    });
                }else{
                    // this.resetTemp();
                    this.dialogFormVisible = true;
                    // this.reasonVisible = false;
                }
            }
        }
    }
</script>