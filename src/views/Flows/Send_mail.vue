<template>
    <div class="SendMailList">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false'>
            <div class="SendMail_input" style="padding: 20px 20px 50px 90px;">
                <el-form :inline="true"  :model="sendData" ref="sendEmail" class="demo-form-inline fromClass">
                    <el-button type="primary" @click="Add()" style="font-weight:600;margin-left:500px;margin-bottom:20px;">Add</el-button>
                    <div v-for="(item,index) in array" :key="index" >
                        <template>
                            <template v-if="index == array.length-1">
                                <el-form-item prop="email" class="W60" >
                                    <el-input v-model="item.value"  class="W100" placeholder="Email"></el-input>
                                </el-form-item>
                                <el-button type="danger" @click="Delete(index)" style="font-weight:600;">Delete</el-button>
                                <!-- <el-button type="primary" @click="Add(item)" style="font-weight:600;">Add</el-button> -->
                            </template>
                            <template v-else>
                                <el-form-item prop="email" class="W60" >
                                    <el-input v-model="item.value" disabled="" class="W100" placeholder="Email"></el-input>
                                </el-form-item>
                                <el-button type="danger" @click="Delete(index)" style="font-weight:600;">Delete</el-button>
                            </template>
                        </template>
                    </div>
                    <span class="errorMsg" v-if="errorMsg">{{errorMsg}}</span>
                    <el-button type="primary" @click="send('sendEmail')">Send Test Mail</el-button>
                </el-form>
            <p style="color:red;">Tips: If you want to receive more than one email in a short time, please set the appropriate note.</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"SendMailList",
    props: {
        dialog: Object,
        itemData:Object
    },
    data(){
        return{
            array:[
                {"value":""},
            ],
            errorMsg:"",
            sendData:{
                email:""
            }
        } 
    },
    methods:{
        send(formName){
            this.dialog.show = false;
            var reg = /[a-z0-9A-Z]?[-|a-z0-9A-Z._]+@[-|0-9a-zA-Z_]+\.[a-zA-Z]+[a-zA-Z.]/;
                if(reg.test(this.array[this.array.length-1].value)){
                    this.errorMsg = "";
                    let _lastArray = [];
                    this.array.map(e =>{
                        _lastArray.push(e.value);
                    });
                    let _thisData = {
                        "trigger_id":this.itemData.id,
                        "customers_email_list":JSON.stringify(_lastArray) 
                    }
                    this.$axios.post(`/api/v1/email_trigger/test/`, _thisData)
                    .then(res => {
                        if(res.data.code == 1){
                            this.$message({message: "Successfully!",type: "success"});
                            this.dialog.show = false;
                        }else{
                            this.$message(res.data.msg.detail);
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    });
                }else{
                    this.errorMsg = "Please enter the correct email!";
                }
        },
        Add(){
            let item = this.array[this.array.length-1];
            if(item.value){
                this.errorMsg = "";
                var reg = /[a-z0-9A-Z]?[-|a-z0-9A-Z._]+@[-|0-9a-zA-Z_]+\.[a-zA-Z]+[a-zA-Z.]/;
                    if(reg.test(item.value)){
                        this.errorMsg = "";
                        this.array.push({"value":""});
                    }else{
                        this.errorMsg = "Please enter the correct email!";
                    }
            }else{
                this.errorMsg = "Please enter the email!";
            }
        },
        Delete(index){
            this.array.splice(index,1);
        },
    } 
}
</script>

<style>
.SendMailList .errorMsg{margin-bottom: 10px;
    color: red;
    display: block;}
.SendMailList .el-input__inner{width: 450px!important;}
</style>


