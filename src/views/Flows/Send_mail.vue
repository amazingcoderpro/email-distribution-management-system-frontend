<template>
    <div class="SendMailList">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false'>
            <div class="SendMail_input" style="padding: 20px 20px 50px 180px;">
                <el-form :inline="true"  :model="sendData" ref="sendEmail" class="demo-form-inline fromClass">
                    <el-button type="primary" @click="Add()" style="font-weight:600;margin-left:489px;margin-bottom:20px;padding: 12px 27px;">Add</el-button>
                    <div v-for="(item,index) in array" :key="index" >
                        <template>
                            <template v-if="index == array.length-1">
                                <el-form-item prop="email" class="W60" >
                                    <el-input v-model="item.value" class="W100" placeholder="Email"></el-input>
                                </el-form-item>
                                <el-button type="danger" @click="Delete(index)" style="font-weight:600;margin-left:55px;">Delete</el-button>
                            </template>
                            <template v-else>
                                <el-form-item prop="email" class="W60" >
                                    <el-input v-model="item.value" class="W100" placeholder="Email"></el-input>
                                </el-form-item>
                                <el-button type="danger" @click="Delete(index)" style="font-weight:600;margin-left:55px;">Delete</el-button>
                            </template>
                        </template>
                    </div>
                    <span class="errorMsg" v-if="errorMsg">{{errorMsg}}</span>
                    <el-button type="primary" @click="send('sendEmail')">Send Test Mail</el-button>
                </el-form>
            <!-- <p style="color:#F56C6C;">Tips: If you want to receive more than one email in a short time, please set the appropriate note.</p> -->
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
                email:"",
            }
        } 
    },
    methods:{
        send(formName){
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
            if(this.array.length == 0 ){
                this.array.push({"value":""})
            }else if(item.value){
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
.SendMailList .errorMsg{margin-bottom: 10px;color: #F56C6C;font-size: 14px;display: block;}
.SendMailList .el-input__inner{width: 450px!important;}
</style>


