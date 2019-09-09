<template>
    <div class="SendMail">
        <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false'>
            <div class="SendMail_input" style="padding: 20px 20px 50px 90px;">
                <el-form :inline="true" :model="sendData" ref="sendEmail" class="demo-form-inline fromClass">
                    <el-form-item prop="email" class="W100" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                        <el-input v-model="sendData.email"  placeholder="Email" ></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="send('sendEmail')">Send Test Mail</el-button>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"SendMail",
    props: {
        dialog: Object,
        fromData: Object,
        trueProductArray:Array
    },
    data(){
        return{
            sendData:{
                email:""
            }
        }
    },
    methods:{
        send(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$parent.fromData.logoUrl = -1;
                    this.$parent.fromData.bannerUrl = -1;
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title></head><body><div style="width:1200px;margin:0 auto;">';
                        _showHtml += this.$parent.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                    let _thisData = {
                        "subject":this.fromData.SubjectText,
                        "email_address":this.sendData.email,
                        "product_condition":this.fromData.searchImgType,
                        "email_title":this.fromData.Title,
                        "html":_showHtml,
                        "product_list":JSON.stringify(this.trueProductArray)         
                    }
                    this.$axios.post(`/api/v1/send_mail/`, _thisData)
                        .then(res => {
                            if(res.data.code == 1){
                                this.$message({message: "Successfully!",type: "success"});
                                this.dialog.show = false;
                            }else{
                                this.$message("Fail In Send!");
                            }
                        })
                        .catch(error => {
                            this.$message("Interface timeout!");
                        });
                }
            });
        }
    }
}
</script>



