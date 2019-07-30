<template>
    <div class="Browse">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
             <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a><span class="el-icon-right"> </span> Browse Abandonment</a></li>
        </ul>

        <el-form :inline="true" :model="bigModel">
            <el-form-item label="Title" style="margin-left:290px;">
                <el-input v-model="title" placeholder="Enter Flow Name"></el-input>
                <!-- <div class="el-form-item__error" v-if="errorState.title_state == 0">Please enter Flow Name</div> -->
            </el-form-item>
            <div class="Browse_table">
                <div class="table_right">
                    <div class="trigger_top">
                        <div class="trigger_left">
                                <i class="iconfont icon-star"></i>
                                <span>Trigger</span>
                        </div>
                        <div class="trigger_right" style="width:140px;">
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
                                <el-input v-model="item.lastVal" placeholder="" class="trigger_input_one"></el-input>
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
                                    <div class="trigger_Edit"  @click="email_Edit(index)" v-if="item.title == 'Email'">
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                    <div class="trigger_Edit" @click="DelayFun(item)" v-else>
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                </template>
                                <div class="trigger_Delete" @click="DeleteFun(index)">
                                    <i class="iconfont icon-chahao"></i>
                                    <span>Delete</span>
                                </div>
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
                    <template>
                        <div class="delay_left" v-if="item.title == 'Delay'" style="cursor: no-drop;" >
                            <span>DELAY</span>
                        </div> 
                        <div class="delay_left" v-else  @click="addDelay(item,index)">
                            <span>DELAY</span>
                        </div>
                    </template>
                    <template>
                        <div class="delay_right" v-if="item.title == 'Email'" style="cursor: no-drop;">
                            <span>EMAIL</span>
                        </div> 
                        <div class="delay_right" v-else @click="addEmail(item,index)">
                            <span>EMAIL</span>
                        </div>
                    </template>
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
            title:"",
            itemData:{},
            firstState:false,
            Search_input:'',
            bigData:[],
            bigModel:{
                triggerModel:[],
                relation_info:""
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
            }
        }
    },
    components: {
        DialogFound,
        DialogFound2
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){ 
            let _thisData = JSON.parse(localStorage["FlowsVal"]);
            this.title = _thisData.title;
            this.bigData = JSON.parse(_thisData.email_delay);
            this.bigModel.triggerModel = JSON.parse(_thisData.relation_info);
        },
        testFun(item,index){
            item.state = false;
            console.log(this.testarray)
        },
        testTwoFun(item,index){
            item.state = true;
            console.log(this.testarray)
        },
        showBox(item,index){
            console.log(index+"---"+this.bigData.length)
            if(item){
                this.bigData[index].state = true;
            }else{
                this.firstState = true;
                if(this.bigModel.triggerModel == ""){
                    this.firstState = false;
                    this.$message({
                    showClose: true,
                    message: 'please click "edit" to add trigger first',
                    });
                }
            }
        },
        addDelete(index){
            this.bigModel.triggerModel.splice(index,1);
        },
        addDelay(item,index){
            if('title' == 'Delay'){
                this.bigData[index].state = false;
                this.bigData.splice(index+1,0,{
                    "type":"email",
                    "value":"",
                    "title":"Email",
                    "icon":"icon-youjian",
                state:false
                });
            }
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
            this.bigModel.relation_info = JSON.stringify(array);
        },
        email_Edit(index){ 
            let NewsletterVal = {
                fromDataType:'Flow',
                index:'',
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                bannerUrl:'',
                Headline:'',
                bodyText:'',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                SegmentSelectState:"All",
                periodTime:[new Date(2019, 9, 1, 0, 0),new Date(2019, 9, 2, 0, 0)],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
            }
        localStorage.setItem("NewsletterVal", JSON.stringify(NewsletterVal));
        router.push('/NewsletterAdd');
        },
        DelayFun(item){
            this.itemData = item;
            this.dialog2 = {
                show: true,
                title: "Delay Edit",
                option: "post"
            };
        },
        DeleteFun(index){
            this.bigData.splice(index,1);
        },
        EnableFlow(formName){
          let  _thisData = {    
                title:this.title,
                relation_info:JSON.stringify(this.bigModel.triggerModel),
                email_delay:JSON.stringify(this.bigData)
            }
            this.$axios.post(`/api/v1/email_trigger/`,_thisData)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({message: "Successfully!",type: "success"});
                        router.push('/FlowList');
                    }else{
                        this.$message("Acquisition failure!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
            }); 
        },
    },
}
</script>

<style scoped>
.Browse .Browse_table{width: 65%;margin: 0 auto;}
.Browse .Browse_table .iconfont{color: #6d6666}
.Browse #breadcrumb{margin-bottom: 50px;}
.Browse .Enable_button{margin:30px 0 30px;margin-left: 943px;}
.Browse .Browse_table .table_right{border: 1px solid rgba(121, 121, 121, 1);padding-bottom:20px;}
.Browse .Browse_table .table_right .trigger_top{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.Browse .Browse_table .table_right .trigger_top .trigger_left{width: 150px;height:50px;float: left;display: inline-flex;}
.Browse .Browse_table .table_right .trigger_top .trigger_left .icon-star{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .Browse_table .table_right .trigger_top .trigger_left span{font-size: 13px;font-weight: 600;padding-left: 35px;line-height: 50px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right{float: right;width: 210px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Eye{text-align: center;padding-top: 5px;float: left;padding-right: 30px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .icon-yanjing{font-size: 20px;color: #6d6666;}
.Browse .Browse_table .table_right .trigger_top .trigger_right span{font-size: 14px;color: #333333;}
.Browse .Browse_table .table_right .trigger_top .trigger_right  span{display: block;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit{float: left;padding-right: 30px;text-align: center;padding-top: 6px;cursor: pointer;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit .icon-edit{font-size: 17px;color: #6d6666;font-weight: 600;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit span{font-size: 14px;color: #333333;}
.Browse .Browse_table .trigger_Delete{float: right;margin-top: 6px;text-align: center;margin-right: 29px;cursor: pointer;}
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

