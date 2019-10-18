<template>
<div class="SiteListEdit_title">
     <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
        <div class='SiteListEdit'>
            <el-form :model="itemData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Store Name">
                    <el-input v-model="itemData.name"></el-input>
                </el-form-item>
                <el-form-item label="Domain" prop="domain">
                    <el-input v-model="itemData.domain"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="itemData.email"></el-input>
                </el-form-item>
                <el-form-item label="Url" prop="url">
                    <el-input v-model="itemData.url"></el-input>
                </el-form-item>
                 <el-form-item label="View Id" prop="store_view_id">
                    <el-input v-model="itemData.store_view_id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">Submit</el-button>
                </el-form-item>
            </el-form>  
        </div> 
    </el-dialog>
</div>
</template>

<script>
    import router from '../../router'
    import * as base from '../../assets/js/base'
    export default {
        name: 'SiteListEdit',
        props: {
            dialog: Object,
            itemData:Object,
        }, 
        data() {
            return {
                rules: {
                       email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.itemData)
                   this.$axios.put(`/api/v1/store/update/?&site_id=${this.itemData.id}&name=${this.itemData.name}&url=${this.itemData.url}&domain=${this.itemData.domain}&email=${this.itemData.email}&store_view_id=${this.itemData.store_view_id}`)
                //    let store_id ={
                //        site_id:this.itemData.id,
                //        name:this.itemData.name,
                //        url:this.itemData.url,
                //        domain:this.itemData.domain,
                //        email:this.itemData.email,
                //        store_view_id:this.itemData.store_view_id
                //    }
                //    this.$axios.put(`/api/v1/store/update/`, store_id)
                    .then(res => {
                        if(res.data.code == 1){
                            this.dialog.show = false;
                            this.$message({message: res.data.msg,type: 'success'});
                            this.$parent.init();
                        }else{
                            this.dialog.show = false;   
                            this.$message("Modification failed!");
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    });
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style>
.SiteListEdit_title .el-dialog{width: 60%!important;}
</style>