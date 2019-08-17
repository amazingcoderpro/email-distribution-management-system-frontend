<template>
    <div class='UploadExcel'>
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>UploadExcel</a></li>
        </ul>
        <el-upload
        class="upload-demo"
        action="/api/v1/store/create/"
        :auto-upload="true"
        :headers="headerdata"
        :show-file-list="false"
        :on-success="successFun"
        :on-error="errorFun"
        :before-upload="beforeAvatarUpload">
            <el-button type="primary">Upload</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
        name: 'UploadExcel',
        components: {},
        data() {
            return {
                headerdata:{
                    Authorization : localStorage.eleToken
                },
            };//这里存放数据
        },
        methods: {
            successFun(response, file, fileList) {
                if(response.code == 1){
                    this.$message({message: "Successfully!",type: "success"});
                }else{
                    this.$message(response.msg);
                }
            },
            errorFun(err, file, fileList){
                this.$message("Interface Error");
            },
            beforeAvatarUpload(file) {
                let typeState = false;
                if(file.name.indexOf(".csv")>=0){
                    typeState = true;
                }
                if (!typeState) {
                    this.$message.error('csv');
                }
                return typeState;
            },
            handleRemove(file, fileList) {
            console.log(file, fileList);
            },
            handlePreview(file) {
            console.log(file);
            },
            handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },//方法集合
        created() {},//生命周期 - 创建完成（可以访问当前this实例）
        mounted() {
            
        },//生命周期 - 挂载完成（可以访问DOM元素）
}
</script>
<style lang='scss' scoped>
</style>