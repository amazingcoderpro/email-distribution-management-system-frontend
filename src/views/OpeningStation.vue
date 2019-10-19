<template>
    <div class="OpeningStation">
        <div class="storeSetting">
            <el-form :model="OpenShop" ref="fromRef" label-width="180px" prop="sender_address" class="personalForm" :rules="rules">
                <section class="form_container">
                        <div class="storename_title">
                            <div>
                                <img src="../assets/img/SmartSendLogo.png" alt="SmartSend">
                            </div>
                            <span>Open Site By Myself In SmartSend</span>
                        </div>
                        <div class="storename">
                            <div>
                                <span>Name</span>
                                <el-form-item prop="customer_name" style="display:inline;">
                                        <el-input v-model="OpenShop.customer_name" class="btn_input"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="storename">
                            <div>
                                <span>Email</span>
                                <el-form-item prop="user_email" style="display:inline;">
                                    <el-input v-model="OpenShop.user_email" class="btn_input"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="storeurl" style="position:relative">
                            <span>Domain address</span>
                            <el-form-item prop="domain" style="display:inline;">
                                    <el-input v-model="OpenShop.domain" class="btn_input"></el-input>
                            </el-form-item>
                            <!-- <el-button type="primary" class="storeurl_button" @click="init('fromRef')">Search</el-button> -->
                        </div>
                        <!-- <div class="fromSon">
                            <label>Flow List</label>
                            <div class="content W50">
                                <el-checkbox-group v-model="OpenShop.auth_list">
                                    <el-checkbox class=" W40" v-for="(item,index) in flowList" :label="item.id" :key="index">{{item.title}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div> -->
                        <div class="storeurl">
                            <div>
                                <span>Account type</span>
                            </div>
                            <el-select v-model="OpenShop.source" placeholder="请选择" class="Senderdomain_one">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="content">
                            <span>Shop logo</span>
                            <el-form-item class="W100" style="margin-top:10px;" prop="logo">
                                <el-upload
                                class="avatar-uploader"
                                action="/api/v1/upload_picture/"
                                :auto-upload="true"
                                :headers="headerdata"
                                :show-file-list="false"
                                :on-success="logoSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="OpenShop.logo" :src="OpenShop.logo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 2MB</span>
                        </div>
                </section>
            </el-form>
        </div>
         <div class="goole_analytics">
            <el-button type="primary" class="goole_save" @click="submitwo('fromRef')">SAVE</el-button>
        </div>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import router from '../router';
export default {
    name: "OpeningStation",
    data() {
        return {
            rules: {
                logo: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                customer_name: [{ required: true, message: 'Please enter your name', trigger: 'blur' },],
                domain: [{ required: true, message: 'Please enter the domin address', trigger: 'blur' },],
                user_email:[{ required: true, message: 'Please enter your email address', trigger: 'blur' },{ type: 'email', message: 'Please enter the correct email address'}]
            },
            flowList:[],
            OpenShop: {
               customer_name:"",
               user_email:"",
               domain:"",
               source:"0",
               logo:"",
               auth_list:""
            },
            headerdata:{
                Authorization : localStorage.eleToken
            },
            options: [
                {value: '0',label: 'Shopfy 站点'},
                {value: '1',label: '自建站'},
            ],
            value:'', 
        }
    },
    methods:{
        logoSuccess(response, file, fileList) {
            if(response.data.base64_str){
                this.OpenShop.logo = response.data.base64_str;
            }
        },
        beforeAvatarUpload(file) {
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
        submitwo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _data = {
                        customer_name:this.OpenShop.customer_name,
                        user_email:this.OpenShop.user_email,
                        domain:this.OpenShop.domain,
                        log:this.OpenShop.log,
                        source:this.OpenShop.source
                    }
                    this.$axios.post(`/api/v1/store/store_auth/`, _data)
                    .then(res =>{
                        if (res.data.code == 1) {
                            this.$message({
                            message: "Successful revision!",
                            type: "success"
                            });
                        } else {
                            this.$message("Interface timeout!");
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    });
                }
            });
        },
    },
    
}
</script>

<style>

.OpeningStation .storename_title{height: 60px;margin-top: 50px;font-weight: 600;}
.OpeningStation .storeSetting{width: 530px;margin: 0 auto;}
.OpeningStation .storeSetting .form_container{font-size: 15px;text-align: center;}
.OpeningStation .storeSetting .el-input{display:block;margin-top:15px;}
.OpeningStation .storeSetting .el-select{display:block;}
.OpeningStation .storeSetting .btn_input{width: 530px;}
.OpeningStation .storeSetting .storename{margin-top:15px;}
.OpeningStation .storeSetting .storeurl{margin-top:20px;}
.OpeningStation .storeSetting .submit_save{background:#339999;border-color:#339999;color:#fff;padding:13px 18px;font-size:12px;margin-left: -260px;}
.OpeningStation .storeSetting .submit_btn{background:#339999;border-color:#339999;color:#fff;padding:13px 13px;font-size:12px;margin-left:-180px;margin-top:30px;}
.OpeningStation .storeSetting .el-form-item{display: inline-block}
.OpeningStation  .goole_analytics{text-align: -webkit-center;margin-top: 40px;margin-bottom: 40px;}
.OpeningStation .storeSetting .goole_analytics{margin-top: 60px;margin-bottom: 60px;}
.OpeningStation .storeSetting .goole_analytics .title{font-weight: 600;font-size: 16px;}
.OpeningStation .storeSetting .goole_analytics .el-input{width: 200px;display: inline-block;}
.OpeningStation .storeSetting .goole_analytics .steo_two{padding-top: 10px;}
.OpeningStation .content{margin-top: 20px;}
.OpeningStation .el-form-item__content{margin-left: 0!important;}
.OpeningStation .storeurl_button{top: 35px;margin-left: 300px;display: -webkit-inline-box;position: absolute;}
.OpeningStation .fromSon{float: left;font-weight: 600;display: -webkit-inline-box;}
</style>
