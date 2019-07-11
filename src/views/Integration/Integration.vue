<template>
    <div class="Integration">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Integration</a></li>
        </ul>
        <div class="storeSetting">
            <section class="form_container">
                <el-form :model="storeUser" label-width="180px" class="personalForm">
                    <!-- Your Shop -->
                    <div class="storename">
                        <div>
                            <span>Your Shop</span>
                        </div>
                        <el-input v-model="storeUser.name" class="storename_one"></el-input>
                        <el-input v-model="storeUser.name" class="storename_two"></el-input>
                    </div>
                    <!-- Sender -->
                    <div class="storeurl">
                        <span>Sender</span>
                        <el-input v-model="storeUser.url" class="Sender_input"></el-input>
                    </div>
                    <!-- Sender Address -->
                    <div class="storeurl">
                        <div>
                            <span>Sender Address</span>
                        </div>
                        <el-input v-model="storeUser.url_format" class="Senderdomain_three"></el-input>@&nbsp;
                        <el-select v-model="value" placeholder="请选择" class="Senderdomain_one">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input v-model="storeUser.url_format" class="Senderdomain_two"></el-input>
                    </div>
                    <!-- <div class="storeurl">
                        <div>
                             <span>Sender Address</span>
                        </div>
                        <el-input v-model="storeUser.store_view_id" placeholder="" class="btn_input"></el-input>
                    </div> -->
                      <!-- Time Zone -->
                    <div class="storeurl">
                        <span>Time Zone</span>
                        <el-input v-model="storeUser.timezone" class="btn_input"></el-input>
                    </div>
                    <!-- 点击 -->
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitwo()">RESET</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_save" @click="submitwo()">SAVE</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <div class="goole_analytics">
                <p class="title">Google Analytics Tracking</p>
                <p>Setp 1.  Sign up for a Google Analytics account.</p>
                <p class="steo_two">Step 2.  Add <a href="#">............</a> as a user in your GA view user management. Give us data read & Analyze permissions.</p>
                <p>Step 3.  Add your VIEW ID here <el-input v-model="input" placeholder="请输入内容"></el-input></p>
                <el-button type="primary" class="goole_save">SAVE</el-button>
            </div>
         </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
    name: "Integration",
    name: "storeSetting",
    data() {
        return {
            loadingState:{},
            storeUser: {
                url: "",
                id: "",
                name: "",
                timezone: "",
                url_format: "",
                store_view_id: ""
            },
            input:'',
            options: [
                {value: '选项1',label: '你好'},
                {value: '选项2',label: '很好'} ,
            ],
            value:'', 
        }
    },
    components:{
    },
    mounted() {
    },
    methods:{
    },
    beforeDestroy() {

    }
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
