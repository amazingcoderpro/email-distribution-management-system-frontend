<template>
    <div class='UploadExcel'>
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>Account</a></li>
        </ul>
        <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass" :rules="rules">
                <div class="fromSon">
                    <label>Shopify Domain</label>
                    <div class="content">
                        <el-form-item prop="shopifydomain" class="W300">
                            <el-input v-model="fromData.shopifydomain"  class="W100"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="fromSon">
                    <label>Password</label>
                    <div class="content">
                        <el-form-item prop="password" class="W300">
                            <el-input v-model="fromData.password" class="W100"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="fromSon">
                    <label>Comfirm Password</label>
                    <div class="content">
                        <el-form-item prop="password2" class="W300">
                            <el-input v-model="fromData.password2" class="W100"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="fromSon">
                    <label>Store View ID</label>
                    <div class="content">
                        <el-form-item class="W300">
                            <el-input v-model="fromData.store_view_id" class="W100"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="fromSon">
                    <label>Logo</label>
                    <div class="content">
                        <el-form-item class="W100">
                            <el-upload
                            class="avatar-uploader"
                            action="/api/v1/upload_picture/"
                            :auto-upload="true"
                            :headers="headerdata"
                            :show-file-list="false"
                            :on-success="LogoSuccess"
                            :before-upload="logoUpload">
                            <img v-if="fromData.logo" :src="fromData.logo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 2MB</span>
                    </div>
                </div>
                <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                <el-upload
                    class="upload-demo"
                    action="/api/v1/store/create/"
                    :auto-upload="true"
                    :headers="headerdata"
                    :show-file-list="false"
                    :on-success="successFun"
                    :on-error="errorFun"
                    :before-upload="beforeAvatarUpload">
                        <el-button type="primary">Batch</el-button>
                    </el-upload>
        </el-form>
        
    </div>
</template>

<script>
export default {
        name: 'UploadExcel',
        components: {},
        data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.fromData.password) {
                callback(new Error("Inconsistent password input!"));
            } else {
                callback();
            }
        };
            return {
                fromData:{
                    password:"",
                    password2:"",
                    store_view_id:"",
                    logo:"",
                    shopify_domain:"",
                    shopifydomain:"",
                },
                rules: {
                    password: [{ required: true, message: 'Please enter Password', trigger: 'change' },],
                    shopifydomain: [{ required: true, message: 'Please enter Domain', trigger: 'change' },],
                    password2: [
                        {required: true,message: "Confirmation password cannot be empty",trigger: "blur"},
                        {validator: validatePass2, trigger: "blur" }
                    ]
                },
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
            },
            LogoSuccess(response, file, fileList){
                if(response.data.base64_str){
                    this.fromData.logo = response.data.base64_str;
                }
            },
            logoUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('JPG、png、gif');
                }
                if (!isLt2M) {
                    this.$message.error('No more than 2MB!');
                }
                return isJPG && isLt2M;
            },
            saveFun(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.fromData.shopify_domain = this.fromData.shopifydomain;
                        this.$axios.post(`/api/v2/opstores/store/`, this.fromData)
                        .then(res => {
                            if(res.data.code == 1){
                                this.$message({message: "Successfully!",type: "success"});
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                        .catch(error => {
                            this.$message("Interface timeout!");
                        }); 
                    }
                });
            }
        },//方法集合
        created() {},//生命周期 - 创建完成（可以访问当前this实例）
        mounted() {
            
        },//生命周期 - 挂载完成（可以访问DOM元素）
}
</script>
<style>
.UploadExcel .fromSon{color:#606266;margin-bottom:20px;}
.UploadExcel .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.UploadExcel .fromSon .content{position:relative;}
.UploadExcel .el-form-item__content{width:100%;}
</style>