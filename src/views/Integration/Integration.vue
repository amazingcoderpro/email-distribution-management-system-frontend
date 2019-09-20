<template>
    <div class="Integration">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Integration</a></li>
        </ul>
        <div class="storeSetting">
            <el-button v-if="goSiteListBtnState" type="primary" class="goSiteListBtn" @click="goSiteList">Site Management</el-button>
            <el-form :model="storeShop"  ref="fromRef" label-width="180px" prop="sender_address" class="personalForm"  :rules="rules">
                <section class="form_container">
                        <div class="storename">
                            <div>
                                <span>Shop Name</span>
                                <el-input v-model="storeShop.name" disabled class="btn_input"></el-input>
                            </div>
                        </div>
                        <div class="storename">
                            <div>
                                <span>Shop URL</span>
                                <el-input v-model="storeShop.url" disabled class="btn_input"></el-input>
                            </div>
                        </div>
                        <div class="storename">
                            <div>
                                <span>Shop Domain</span>
                                <el-input v-model="storeShop.domain" disabled class="btn_input"></el-input>
                            </div>
                        </div>
                        <div class="storeurl">
                            <span>Sender</span>
                            <el-input v-model="storeShop.sender" class="btn_input"></el-input>
                        </div>
                        <div class="storeurl">
                            <div>
                                <span>Sender Address</span>
                            </div>
                            <el-input v-model="storeShop.sender_address_one" class="Senderdomain_three">    
                            </el-input>
                            @&nbsp;  
                            <el-select v-model="storeShop.sender_address_two" placeholder="请选择" class="Senderdomain_one">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <span> . </span>
                            <el-input v-model="storeShop.sender_address_three" class="Senderdomain_two"></el-input>
                        </div>
                        <div class="storeurl">
                            <span>Service Email</span>
                            <el-form-item prop="service_email" style="display:inline;">
                                <el-input v-model="storeShop.service_email" class="btn_input"></el-input>
                            </el-form-item>
                        </div>
                        <div class="storeurl">
                            <span>Time Zone</span>
                            <el-input v-model="storeShop.timezone" class="btn_input"></el-input>
                        </div>
                        <div class="content">
                            <span>LOGO</span>
                            <el-form-item class="W100" style="margin-top:10px;" prop="logo">
                                <el-upload
                                class="avatar-uploader"
                                action="/api/v1/upload_picture/"
                                :auto-upload="true"
                                :headers="headerdata"
                                :show-file-list="false"
                                :on-success="logoSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="storeShop.logo" :src="storeShop.logo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 2MB</span>
                        </div>
                </section>
                <div class="goole_analytics">
                    <p class="title">Google Analytics Tracking</p>
                    <p>Setp 1.  Sign up for a Google Analytics account.</p>
                    <p class="steo_two">Step 2.  Add <span style="color:red;">test123@eternal-argon-241002.iam.gserviceaccount.com</span> a user in your <b>GA view user management</b>. Give us data read & Analyze permissions.</p>
                    <p>
                        Step 3.  Add your VIEW ID here <el-input v-model="storeShop.store_view_id" placeholder="请输入内容"></el-input>
                        <el-button type="primary" size="small" @click="showStatement()" class="btn_stat" style="margin-left:20px;background: #339999;border-color: #339999;">Statement</el-button>
                    </p>
                    <el-button type="primary" class="goole_save" @click="submitwo('fromRef')">SAVE</el-button>
                </div>
            </el-form>
            <DialogFound :dialog="dialog" ref="dailog"></DialogFound>
        </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import router from '../../router';
import DialogFound from "./statement";
export default {
    name: "storeSetting",
    components: {
        DialogFound
    },
    created() {
            this.init();
        },
    data() {
        return {
            goSiteListBtnState:false,
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
            rules: {
                logo: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                service_email:[{ required: true, message: 'Please enter your email address', trigger: 'blur' },{ type: 'email', message: 'Please enter the correct email address'}]
            },
            loadingState:{},
            storeShop: {
                url:"",
                sender: "",
                domain:"",
                id: "",
                name: "",
                timezone: "",
                sender_address:"",
                sender_address_one:"",
                sender_address_two:"",
                sender_address_three:"",
                store_view_id: "",
                email:"",
                logo:"",
                service_email:""
            },
            headerdata:{
                Authorization : localStorage.eleToken
            },
            input:'',
            options: [
                {value: 'letter',label: 'letter'},
                {value: 'news',label: 'news'},
                {value: 'message',label: 'message'} ,
            ],
            value:'', 
        }
    },
    methods:{
        init() {
            if(window.localStorage.getItem('user')){
                if(JSON.parse(window.localStorage.getItem('user')).username == "admin"){
                    this.goSiteListBtnState = true;
                }
            };
            this.$axios.get(`/api/v1/store/`)
            .then(res => {
                if (res.data.code == 1) {
                this.storeShop.id = res.data.data[0].id;
                this.storeShop.url = res.data.data[0].url;
                this.storeShop.name = res.data.data[0].name;
                this.storeShop.domain = res.data.data[0].domain;
                this.storeShop.sender = res.data.data[0].sender;
                this.storeShop.timezone = res.data.data[0].timezone;
                this.storeShop.sender_address = res.data.data[0].sender_address;
                this.storeShop.service_email = res.data.data[0].service_email;
                this.storeShop.logo = res.data.data[0].logo;
                if(res.data.data[0].sender_address){
                    this.storeShop.sender_address_one = this.storeShop.sender_address.split("@")[0];
                    this.storeShop.sender_address_two = this.storeShop.sender_address.split("@")[1].split(".")[0];
                    this.storeShop.sender_address_three =this.storeShop.sender_address.split("@")[1].split(".")[1]+".com";
                }
                this.storeShop.store_view_id = res.data.data[0].store_view_id;
                this.storeShop.email = res.data.data[0].email;
                } else {
                this.$message({
                    message: "code Abnormal!",
                    type: "warning",
                    center: true 
                });
                }
            });       
        },
        logoSuccess(response, file, fileList) {
            if(response.data.base64_str){
                this.storeShop.logo = response.data.base64_str;
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
                    let lastSender = this.storeShop.sender_address_one + "@" + this.storeShop.sender_address_two + "." + this.storeShop.sender_address_three;
                    this.storeShop.sender_address = lastSender;
                    this.$axios.put(`api/v1/store/${this.storeShop.id}/`,this.storeShop)
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
        showStatement() {
            this.dialog = {
                show: true,
                title: "",
                option: "post"
            };
        },
        goSiteList(){
            router.push('/SiteList');
        }
    },
    
}
</script>

<style>
.Integration{margin-left: 10px;margin-right: 35px;}
.Integration .storeSetting .form_container{font-weight: 600;font-size: 15px;}
.Integration .storeSetting .el-input{display:block;margin-top:10px;}
.Integration .storeSetting .el-select{display:block;width:400px;}
.Integration .storeSetting .storename_one{width: 200px;display: inline-block;}
.Integration .storeSetting .storename_two{width: 315px;display: inline-block;padding-left: 15px;}
.Integration .storeSetting .Sender_input{width: 200px;}
.Integration .storeSetting .Senderdomain_one{width: 120px;display: inline-block;}
.Integration .storeSetting .Senderdomain_two{width: 255px;display: inline-block;}
.Integration .storeSetting .Senderdomain_three{width: 100px;display: inline-block;margin-right: 15px;}
.Integration .storeSetting .btn_input{width: 530px;}
.Integration .storeSetting .newpass{padding-left:17px;color:#0f8fcf;}
.Integration .storeSetting .storename{margin-top:30px;}
.Integration .storeSetting .storeurl{margin-top:15px;}
.Integration .storeSetting .submit_save{background:#339999;border-color:#339999;color:#fff;padding:13px 18px;font-size:12px;margin-left: -260px;}
.Integration .storeSetting .submit_btn{background:#339999;border-color:#339999;color:#fff;padding:13px 13px;font-size:12px;margin-left:-180px;margin-top:30px;}
.Integration .storeSetting .el-form-item{display: inline-block}
.Integration .storeSetting .goole_analytics{margin-top: 60px;margin-bottom: 60px;}
.Integration .storeSetting .goole_analytics .title{font-weight: 600;font-size: 16px;}
.Integration .storeSetting .goole_analytics .el-input{width: 200px;display: inline-block;}
.Integration .storeSetting .goole_analytics .steo_two{padding-top: 10px;}
.Integration .storeSetting .goole_analytics .goole_save{background:#339999;border-color:#339999;color:#fff;padding:13px 18px;font-size: 12px;}
.Integration .content{margin-top: 30px;}
.Integration .el-form-item__content{margin-left: 0!important;}
.Integration .littleMsg{font-size: 12px;color: #606266;}
.Integration .goSiteListBtn{position: absolute;right: 30px;}
</style>
