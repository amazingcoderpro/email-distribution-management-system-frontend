<template>
    <header class="head-nav">
        <el-row>
            <router-link to='/dashboard'>
                <el-col :span="6" class='logo-container'>
                    <img src="../assets/img/SmartSendLogo.png" class='logo' alt="">
                    <span class='title'>SmartSend</span>
                </el-col>
            </router-link>
            <el-col :span='6' class="user">
                <div class="userinfo">
                    <!-- <img src="../assets/img/none.png" class='avatar' alt=""> -->
                    <div class='welcome'>
                      <p class='name comename'>Welcome ,
                        <template>
                            <el-select v-model="user.id" filterable placeholder="请选择" :disabled="adminState == 'false'" @change="UserNameChange">
                              <el-option
                                v-for="item in userArr"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </template>
                          <!-- <span class="avatarname">{{user.username}}</span> -->
                        </p>
                    </div>
                    <span class='username'>
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item command='info'>个人信息</el-dropdown-item> -->
                                <el-dropdown-item  command='modify_password'>Change Password</el-dropdown-item>
                                <el-dropdown-item  command='logout'>Logout</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
        <DialogFound :dialog="dialog"></DialogFound>
    </header>
</template>

<script>
  import router from '../router'
import * as base from '../assets/js/base'
import DialogFound from "../views/special/modifyPassword";
export default {
  name: "head_nav",
  data() {
    return {
      userArr: [],
      user:{},
      adminState:false,
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  mounted(){
    this.adminState = window.localStorage.getItem('adminState');
    if(window.localStorage.getItem('user') == undefined){
      base.LoginOut();
    }else{
      this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : this.$store.getters.user;
      this.init();
    }
  },
  components: {
    DialogFound
  },
  methods: {
    init(){
      this.$axios.get(`/api/v1/account/userlist/login/`)
      .then(res => {
          if(res.data.code == 1){
            this.userArr = res.data.data;
            this.userArr.map(e =>{
              if(e.username && e.username != "admin"){
                e.username = e.username.split(".")[0];
              }
            });
          }else{
            this.$message("Acquisition failure!");
          }
      })
      .catch(error => {
          this.$message("Interface timeout!");
      }); 
    },
    UserNameChange(){
      let _thisData = {
        id:this.user.id,
      };
      this.$axios.post(`/api/v1/account/rootlogin/`, _thisData)
      .then(res => {
          if(res.data.code == 1){
              const token=res.data.data.token;
              localStorage.setItem("eleToken", token);
              localStorage.setItem("user", JSON.stringify(res.data.data.user));
              this.$router.go(0);
          }else{
              this.$message(res.data.msg);
          }
      })
      .catch(error => {
          this.$message("Interface timeout!");
      }); 
    },
    setDialogInfo(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "modify_password":
          this.changeMsg();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    modifyPassword() {
      // 修改密码
      this.$router.push("/modifyPassword");
    },
    logout() {
      // 清除token
      this.$store.dispatch("clearCurrentState");
      base.LoginOut();
    },
    changeMsg(){
      this.dialog = {
        show: true,
        title: "Modify Password",
        option: "put"
      };
    },
  }
};
</script>

<style scoped>
.head-nav{width:100%;height:60px;min-width:600px;padding:5px;background:#324057;color:#fff;border-bottom:1px solid #1f2d3d;}
.logo-container{line-height:60px;min-width:400px;}
.logo{margin-left:20px;margin-right:5px;vertical-align:middle;display:inline-block;width:42px;}
.title{vertical-align:middle;font-size:22px;font-family:"Microsoft YaHei";letter-spacing:3px;color:#ffff;}
.user{line-height:60px;text-align:right;float:right;padding-right:10px;}
.avatar{width:40px;height:40px;border-radius:50%;vertical-align:middle;display:inline-block;}
.welcome{display:inline-block;width:auto;vertical-align:middle;padding:0 5px;}
.name{line-height:20px;text-align:center;font-size:14px;}
.comename{font-size:12px;}
.avatarname{color:#409eff;font-weight:bolder;}
.username{cursor:pointer;margin-right:5px;}
.el-dropdown{color:#fff;}
.router-link-active{
text-decoration: none;
}
</style>