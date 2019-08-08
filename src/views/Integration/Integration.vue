<template>
    <div class="Integration">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Integration</a></li>
        </ul>
        <div class="storeSetting">
            <section class="form_container">
                <el-form :model="storeShop" label-width="180px" prop="sender_address" class="personalForm">
                    <!-- Your Shop -->
                    <div class="storename">
                        <div>
                            <span>Your Shop</span>
                        </div>
                        <el-input v-model="storeShop.name" class="storename_one"></el-input>
                        <el-input v-model="storeShop.url" class="storename_two"></el-input>
                    </div>
                    <!-- Sender -->
                    <div class="storeurl">
                        <span>Sender</span>
                        <el-input v-model="storeShop.sender" class="Sender_input"></el-input>
                    </div>
                    <!-- Sender Address -->
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
                            <el-input v-model="storeShop.sender_address_three" class="Senderdomain_two"></el-input>
                        </div>
                        <!-- <el-form-item
                            prop="sender_address"
                            :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', }
                            ]"
                        >
                            <el-input v-model="storeShop.sender_address"></el-input>
                        </el-form-item> -->
                    <!-- Time Zone -->
                    <div class="storeurl">
                        <span>Time Zone</span>
                        <el-input v-model="storeShop.timezone" class="btn_input"></el-input>
                    </div>
                    <!-- 点击 -->
                    <!-- <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitReset()">RESET</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_save" @click="submiSave()">SAVE</el-button>
                    </el-form-item>  -->
                </el-form>
            </section>
            <div class="goole_analytics">
                <p class="title">Google Analytics Tracking</p>
                <p>Setp 1.  Sign up for a Google Analytics account.</p>
                <p class="steo_two">Step 2.  Add <a :href="storeShop.email" target="_blank" style="color:red">{{storeShop.email}}</a> a user in your <b>GA view user management</b>. Give us data read & Analyze permissions.</p>
                <p>Step 3.  Add your VIEW ID here <el-input v-model="storeShop.store_view_id" placeholder="请输入内容"></el-input></p>
                <el-button type="primary" class="goole_save" @click="submitwo()">SAVE</el-button>
            </div>
         </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import router from '../../router';
export default {
    name: "storeSetting",
    created() {
            this.init();
        },
    data() {
        return {
            loadingState:{},
            storeShop: {
                url:"",
                sender: "",
                id: "",
                name: "",
                timezone: "",
                sender_address:"",
                sender_address_one:"",
                sender_address_two:"",
                sender_address_three:"",
                store_view_id: "",
                email:"",
            },
            input:'',
            options: [
                {value: 'lette',label: 'lette'},
                {value: 'news',label: 'news'},
                {value: 'message',label: 'message'} ,
            ],
            value:'', 
        }
    },
    components:{
    },
    methods:{
        init() {
            this.$axios.get(`/api/v1/store/`)
            .then(res => {
                if (res.data.code == 1) {
                this.storeShop.id = res.data.data[0].id;
                this.storeShop.url = res.data.data[0].url.split(".")[1]+".com";
                this.storeShop.name = res.data.data[0].name;
                this.storeShop.sender = res.data.data[0].sender;
                this.storeShop.timezone = res.data.data[0].timezone;
                this.storeShop.sender_address = res.data.data[0].sender_address;
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
        submitwo(){
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
    },
}
</script>

<style>
.Integration{margin-left: 20px;}
.Integration .storeSetting .form_container{font-weight: 600;font-size: 15px;}
.Integration .storeSetting .el-input{display:block;margin-top:10px;}
.Integration .storeSetting .el-select{display:block;width:400px;}
.Integration .storeSetting .storename_one{width: 200px;display: inline-block;}
.Integration .storeSetting .storename_two{width: 315px;display: inline-block;padding-left: 15px;}
.Integration .storeSetting .Sender_input{width: 200px;}
.Integration .storeSetting .Senderdomain_one{width: 120px;display: inline-block;}
.Integration .storeSetting .Senderdomain_two{width: 255px;display: inline-block;padding-left: 15px;}
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
</style>
