<template>
    <div class="Browse">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
             <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a><span class="el-icon-right"> </span> Browse Abandonment</a></li>
        </ul>
        <el-form :inline="true" :model="bigModel" >
            <div class="Browse_table">
                <div class="table_right">
                    <div class="trigger_top">
                        <div class="trigger_left">
                                <i class="iconfont icon-star"></i>
                                <span>Trigger</span>
                        </div>
                        <div class="trigger_right">
                            <div class="trigger_Eye">
                                <i class="iconfont icon-yanjing"></i>
                                <span>Preview</span>
                            </div>
                            <div class="trigger_Edit" @click="EditFun">
                                <i class="iconfont icon-edit"></i>
                                <span>Edit</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <template v-for="(item,index) in bigModel.triggerModel">
                            <div class="trigger_center" :key="index">
                                <el-input v-model="item.condition" placeholder="" class="trigger_input_one"></el-input>
                                <i class="iconfont icon-chahao" @click="addDelete(index)"></i>
                            </div>
                        </template>
                    </div>
                    <div class="rigger_bottom">
                        <span>Note:</span><br/>
                        <span>1> &nbsp;Do not send if the customer if your customer makes a purchase.</span><br/>
                        <span>2> &nbsp;Do not send if the customer received an email from this campaign in the last 7 days.</span>
                    </div>
                </div>
            </div>
        </el-form>
        <div class="Broese_public">
            <img src="../../assets/img/u448.png" class="Broese_img">
            <i class="iconfont icon-jiahao1" @click="showBox()"></i>
        </div>
        <div class="delay_email" v-if="firstState">
            <div class="delay_left" @click="addDelay()">
                <span>DELAY</span>
            </div> 
            <div class="delay_right" @click="addEmail()">
                <span>EMAIL</span>
            </div> 
        </div>
        <template v-for="(item,index) in bigData">
            <div :key="index">
                <div class="Browse_table" >
                    <div class="table_right Browse_email">
                        <div class="trigger_top">
                            <div class="trigger_left">
                                <i :class="'iconfont '+item.icon"></i>
                                <span>{{item.title}}</span>
                            </div>
                            <div class="trigger_right">
                                <div class="trigger_Eye">
                                    <i class="iconfont icon-yanjing"></i>
                                    <span>Preview</span>
                                </div>
                                <template>
                                    <div class="trigger_Edit"  @click="email_Edit" v-if="item.title == 'Email'">
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                    <div class="trigger_Edit" @click="DelayFun(item)" v-else>
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <template>
                            <div class="rigger_center" v-if="item.title == 'Email'">
                                <span class="Subject">Subject Line</span><br/>
                                <template>
                                    <span>Are you still interested?</span>   
                                </template>
                            </div>
                            <div class="rigger_center" v-else>
                                <template v-if="item.value">
                                    <span class="Subject Wait">{{'Wait '+item.value+' '+item.unit}}</span>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="Broese_public">
                    <img src="../../assets/img/u448.png" class="Broese_img">
                    <i class="iconfont icon-jiahao1" v-on:click="showBox(item,index)"></i>
                </div>
                <div class="delay_email" v-show="item.state">
                    <div class="delay_left" @click="addDelay(item,index)">
                        <span>DELAY</span>
                    </div> 
                    <div class="delay_right" @click="addEmail(item,index)">
                        <span>EMAIL</span>
                    </div> 
                </div>
            </div>
        </template>
        <div class="exit">
            <div class="exit_input">
                <p>EXIT</p>
            </div>
            <div class="Enable_button Enable_buttom">
                <el-button type="primary" @click="EnableFlow">Enable Flow</el-button> 
            </div>
        </div>
        <DialogFound :dialog='dialog'></DialogFound>
        <DialogFound2 :dialog='dialog2' :itemData='itemData'></DialogFound2>
    </div>
</template>

<script>
import DialogFound from "./trigger_edit";
import DialogFound2 from "./Delay_edit";
import router from '../../router';
export default {
    data() {
        return {
            itemData:{},
            firstState:false,
            Search_input:'',
            bigData:[],
            bigModel:{
                triggerModel:[],
                trigger_info:""
            },
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
            dialog2: {
                show: false,
                title: "",
                option: "edit"
            },
            delayData:{
                "type":"rule",
                "value":"",
                "unit":"day(s)",
                "title":"Delay",
                "icon":"icon-shizhong",
                state:false
            },
            emailData:{
                "type":"email",
                "value":"",
                "title":"Email",
                "icon":"icon-youjian",
                state:false
            }
        }
    },
    components: {
        DialogFound,
        DialogFound2
    },
    mounted(){
        // this.init();
    },
    methods:{
        testFun(item,index){
            item.state = false;
            console.log(this.testarray)
        },
        testTwoFun(item,index){
            item.state = true;
            console.log(this.testarray)
        },
        showBox(item,index){

            if(item){
                this.bigData[index].state = true;
                console.log(this.bigData[index])
            }else{
                this.firstState = true;
            }
        },
        addDelete(index){
            this.bigModel.triggerModel.splice(index,1);
        },
        addDelay(item,index){
            if(item){
                this.bigData[index].state = false;
                this.bigData.splice(index+1,0,{
                "type":"rule",
                "value":"",
                "unit":"day(s)",
                "title":"Delay",
                "icon":"icon-shizhong",
                state:false
            });
                this.bigData.map(e => {
                    e.state = false;
                });
                this.bigData = this.bigData;
            }else{
                this.bigData.splice(0,0,{
                "type":"rule",
                "value":"",
                "unit":"day(s)",
                "title":"Delay",
                "icon":"icon-shizhong",
                state:false
            })
                this.firstState = false;
            }
        },
        addEmail(item,index){
            if(item){
                item.state = false;
                this.bigData.splice(index+1,0,{
                "type":"email",
                "value":"",
                "title":"Email",
                "icon":"icon-youjian",
                state:false
            });
            }else{
                this.bigData.splice(0,0,{
                "type":"email",
                "value":"",
                "title":"Email",
                "icon":"icon-youjian",
                state:false
            })
                this.firstState = false;
            }
        },
        EditFun() {
            this.dialog = {
            show: true,
            title: "Trigger Edit",
            option: "post"
            };
        },
        changeTiggerVal(array){
            this.bigModel.triggerModel = array;
            this.bigModel.trigger_info = JSON.stringify(array);
        },
        email_Edit(){
            router.push('./EditletterAdd')
        },
        DelayFun(item){
            this.itemData = item;
            this.dialog2 = {
                show: true,
                title: "Delay Edit",
                option: "post"
            };
        },
        EnableFlow(formName){
          let  _thisData = {
                title:"",
                trigger_info:JSON.stringify(this.bigModel.triggerModel),
                email_delay:JSON.stringify(this.bigData)
            }
            console.log(_thisData)


            this.$axios.post(`/api/v1/email_trigger/`,_thisData)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({message: "Successfully!",type: "success"});
                    }else{
                        this.$message("Acquisition failure!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
            }); 
        }
    },
}
</script>

<style scoped>
.Browse .Browse_table{width: 65%;margin: 0 auto;}
.Browse #breadcrumb{margin-bottom: 50px;}
.Browse .Enable_button{margin:30px 0 30px;margin-left: 943px;}
.Browse .Browse_table .table_right{border: 1px solid rgba(121, 121, 121, 1);padding-bottom:20px;}
.Browse .Browse_table .table_right .trigger_top{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.Browse .Browse_table .table_right .trigger_top .trigger_left{width: 150px;height:50px;float: left;display: inline-flex;}
.Browse .Browse_table .table_right .trigger_top .trigger_left .icon-star{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .Browse_table .table_right .trigger_top .trigger_left span{font-size: 13px;font-weight: 600;padding-left: 35px;line-height: 50px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right{float: right;width: 140px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Eye{display: inline-block;text-align: center;padding-top: 5px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .icon-yanjing{font-size: 20px;color: #6d6666;}
.Browse .Browse_table .table_right .trigger_top .trigger_right span{font-size: 14px;color: #333333;}
.Browse .Browse_table .table_right .trigger_top .trigger_right  span{display: block;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit{float: right;padding-right: 30px;text-align: center;padding-top: 6px;cursor: pointer;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit .icon-edit{font-size: 16px;color: #6d6666;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit span{font-size: 14px;color: #333333;}
.Browse .trigger_center .trigger_input_one{width: 40%;margin-left: 28%;margin-top: 40px;position: relative;}
.Browse .trigger_center .icon-chahao{position: absolute;margin-top: 53px;margin-left: -23px;color: #908f8f;font-size: 14px;font-weight: 600;cursor: pointer;}
.Browse .trigger_centertwo{margin-top: -20px;}
.Browse .rigger_bottom{width: 52%;margin: 0 auto;margin-top: 25px;}
.Browse .rigger_bottom span{font-size: 14px;color: #333333;font-family: 'Arial Cursiva', 'Arial Normal', 'Arial';font-style: italic;}
.Browse .Broese_public{width: 65%;margin: 0 auto;text-align: center;}
.Browse .Broese_img{position: relative;}
.Browse .icon-jiahao1{position: absolute;font-size: 25px;margin-left: -27px;margin-top: 25px;background-color: white;color: red;cursor: pointer;}
.Browse .Browse_email{height: 150px!important;}
.Browse .icon-youjian{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .rigger_center{width: 52%;margin: 0 auto;margin-top: 25px;text-align: center;}
.Browse .rigger_center .Subject{font-size: 13px;color: #333333;line-height: normal;font-weight: 600;}
.Browse .rigger_center .Wait{line-height: 60px;font-weight: normal!important}
.Browse .rigger_center span{font-size: 13px;color: #333333;line-height: 40px;}
.Browse .icon-shizhong{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .exit{width: 65%;margin: 0 auto;}
.Browse .exit .exit_input{width: 40%;margin: 0 auto;height: 45px;text-align: center;background-color: rgba(228, 228, 228, 1);border:1px solid rgba(121, 121, 121, 1);}
.Browse .exit .exit_input p{font-size: 13px;font-weight: 600;line-height: 20px;}
.Browse .exit .Enable_buttom{margin-top: 50px!important;}
.Browse .delay_email{width: 30%;height:150px;margin: 0 auto;border:1px solid rgba(121, 121, 121, 1);margin-bottom: 10px;text-align: center;}
.Browse .delay_left{display: inline-block;background-color: rgba(51, 153, 153, 1);color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}
.Browse .delay_right{display: inline-block;background-color: rgba(51, 153, 153, 1);margin-left: 50px;color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}

</style>

