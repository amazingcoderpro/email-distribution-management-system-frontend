<template>
        <div class="Browse">
            <ul id="breadcrumb">
                <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
                <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
                <li v-if="title"><a href="/Browse_Abandonment"><span class="el-icon-right"> </span>{{title}}</a></li>
            </ul>
            <el-form :inline="true" :model="bigModel" :data-text="fromDataType" :disabled="fromDataType == 'preview'">
                <el-form-item label="Title" style="margin-left:285px;">
                    <el-input v-model="title" placeholder="Enter Flow Name" style="width:315px;"></el-input>
                    <div class="el-form-item__error" v-if="State.title == 0">Please enter Flow Name</div>
                </el-form-item>
                <el-form-item label="Description" style="margin-left:295px;">
                    <el-input v-model="description" placeholder="Enter Description" style="width:315px;"></el-input>
                    <div class="el-form-item__error" v-if="State.title == 0">Please enter Description</div>
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
                                <template>
                                    <div class="trigger_Edit" v-if="fromDataType == 'preview'" style="cursor: no-drop;">
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                    <div class="trigger_Edit" @click="EditFun" v-else>
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                </template>
                            </div>
                        </div> 
                        <div> 
                            <template v-for="(item,index) in bigModel.triggerModel">
                                <div class="trigger_center" :key="index">
                                    <el-input v-model="item.lastVal" placeholder="" class="trigger_input_one"></el-input>
                                    <template>
                                        <template  v-if="fromDataType != 'preview'">
                                            <i class="iconfont icon-chahao"  @click="addDelete(index)"></i>
                                        </template>
                                    </template>
                                </div>
                            </template>
                        </div>
                        <div class="rigger_bottom" v-if="noteArray.length>0">
                            <span>Note:</span><br/>
                            <el-checkbox-group class="SegmentValueBox" v-model="noteTrueArray">
                                <el-checkbox-group class="SegmentValueBox" v-model="noteTrueArray">
                                    <el-checkbox v-for="item in noteArray" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </el-checkbox-group>
                            <div class="noteBox">
                                    <el-input v-model="noteValue" placeholder="Number" class="noteHeight WW100" @keyup.native="noteValueChange"></el-input> 
                                    <el-select v-model="noteUnit" class="noteHeight WW100">
                                        <el-option  :label="'minutes'" :value="'minutes.'"></el-option>
                                        <el-option  :label="'hours'" :value="'hours.'"></el-option>
                                        <el-option  :label="'days'" :value="'days.'"></el-option>
                                        <el-option  :label="'weeks'" :value="'weeks.'"></el-option>
                                    </el-select>.
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>
            <div class="Broese_public">
                <img src="../../assets/img/u448.png" class="Broese_img">
                <template>
                    <template v-if="fromDataType == 'preview'">
                        <i class="iconfont icon-jiahao1"></i>
                    </template>
                    <template v-else>
                        <i class="iconfont icon-jiahao1" @click="showBox()"></i>
                    </template>
                </template>
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
                                        <div class="trigger_Edit"  @click="email_Edit(item,index)" v-if="item.title == 'Email'">
                                            <i class="iconfont icon-edit"></i>
                                            <span>Edit</span>
                                        </div>
                                        <template v-else>
                                            <div class="trigger_Edit" v-if="fromDataType == 'preview'" style="cursor: no-drop;">
                                                <i class="iconfont icon-edit"></i>
                                                <span>Edit</span>
                                            </div>
                                            <div class="trigger_Edit" @click="DelayFun(item)" v-else>
                                                <i class="iconfont icon-edit"></i>
                                                <span>Edit</span>
                                            </div>
                                        </template>
                                    </template>
                                    <template>
                                        <div class="trigger_Delete" v-if="fromDataType == 'preview'" style="cursor: no-drop;">
                                            <i class="iconfont icon-chahao"></i>
                                            <span>Delete</span>
                                        </div>
                                        <div class="trigger_Delete" @click="DeleteFun(index)" v-else>
                                            <i class="iconfont icon-chahao"></i>
                                            <span>Delete</span>
                                        </div>
                                    </template>
                                </div>
                            </div> 
                            <template>
                                <div class="rigger_center" v-if="item.title == 'Email'">
                                    <span class="Subject">Subject Line</span><br/>
                                    <template>
                                        <span>{{item.SubjectText}}</span>   
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
                        <template>
                            <template v-if="fromDataType == 'preview'">
                                <i class="iconfont icon-jiahao1"></i>
                            </template>
                            <template v-else>
                                <i class="iconfont icon-jiahao1" v-on:click="showBox(item,index)"></i>
                            </template>
                        </template>
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
                <div class="Enable_button Enable_buttom" >
                    <el-button type="primary" @click="EnableFlow" :disabled="fromDataType == 'preview'">Save</el-button> 
                </div>
            </div>
            <DialogFound :dialog='dialog' :FatherTriggerModel='bigModel.triggerModel'></DialogFound>
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
                noteValue:"7",
                noteUnit:"days.",
                disabledSon:"",
                id:-1,
                fromDataType:"",
                title:"",
                description:"",
                itemData:{},
                firstState:false,
                Search_input:'',
                bigData:[],
                noteTrueArray:[],
                noteArray:[
                    "Do not send if the customer if your customer makes a purchase.",
                    "Do not send if the customer received an email from this campaign in the last"
                ],
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
                },
                State:{
                    title:1,
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
                this.fromDataType = _thisData.fromDataType;
                if(_thisData.fromDataType == "clone"){
                    this.$axios.put(`/api/v1/email_trigger/clone/${_thisData.id}/`)
                    .then(res => {
                        if(res.data.code == 1){
                            this.id = res.data.data.id;
                            this.title = res.data.data.title;
                            this.description = res.data.data.description;
                            this.bigData = JSON.parse(res.data.data.email_delay);
                            this.bigModel.triggerModel = JSON.parse(res.data.data.relation_info).group_condition[0].children;
                            this.noteTrueArray = JSON.parse(res.data.data.note);
                            this.noteTrueArray.map((e, index, array) =>{
                                if(e.indexOf("Do not send if the customer received an email from this campaign in the last")>=0){
                                    let _array = e.split(" ");
                                    this.noteValue = _array[_array.length-2];
                                    this.noteUnit = _array[_array.length-1].replace(".","")+".";
                                    this.noteTrueArray[index] = "Do not send if the customer received an email from this campaign in the last";
                                }
                            });
                            this.$forceUpdate();
                        }else{
                            this.$message("Acquisition failure!");
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    }); 
                }else{
                    this.title = _thisData.title;
                    this.description = _thisData.description;
                    this.bigData = JSON.parse(_thisData.email_delay);
                    this.bigModel.triggerModel = _thisData.relation_info[0].children;
                    this.noteTrueArray = _thisData.note;
                    this.noteTrueArray.map((e, index, array) =>{
                        if(e.indexOf("Do not send if the customer received an email from this campaign in the last")>=0){
                            let _array = e.split(" ");
                            this.noteValue = _array[_array.length-2];
                            this.noteUnit = _array[_array.length-1].replace(".","")+".";
                            this.noteTrueArray[index] = "Do not send if the customer received an email from this campaign in the last";
                        }
                    });
                }
            },
            showBox(item,index){
                if(item){
                    this.bigData[index].state = true;
                }else{
                    this.firstState = true;
                    if(this.bigModel.triggerModel.length == 0){
                        this.firstState = false;
                        this.$message({
                        showClose: true,
                        message: 'Please Click "Edit" To Add Trigger First',
                        });
                    }
                }
            },
            addDelete(index){
                this.bigModel.triggerModel.splice(index,1);
            },
            addDelay(item,index){
                if(item){
                    this.bigData[index].state = false;
                    this.bigData.splice(index+1,0,{
                        "type":"Delay",
                        "value":0,
                        "unit":"days",
                        "title":"Delay",
                        "icon":"icon-shizhong",
                        state:false
                    });
                }else{
                    this.bigData.splice(0,0,{
                        "type":"Delay",
                        "value":0,
                        "unit":"days",
                        "title":"Delay",
                        "icon":"icon-shizhong",
                        state:false
                    })
                    this.firstState = false;
                }
            },
            addEmail(item,index){
                if(item){
                    this.bigData.splice(index+1,0,{
                        "type":"Email",
                        "value":"",
                        "title":"Email",
                        "unit": "",
                        "icon":"icon-youjian",
                        state:false
                    });
                    item.state = false;
                }else{
                    this.bigData.splice(0,0,{
                        "type":"Email",
                        "value":"",
                        "title":"Email",
                        "unit": "first",
                        "icon":"icon-youjian",
                        state:false
                    })
                    this.firstState = false;
                }
                let Number = 0;
                this.bigData.map(e => {
                    if(e.title == "Email"){
                        Number++;
                        if(Number == 1){
                           e.unit = "first";
                        }else{
                           e.unit = "";
                        }
                    }
                });
            },
            EditFun() {
                this.dialog = {
                show: true,
                title: "Trigger Edit",
                option: "post",
                };
            },
            changeTiggerVal(array){
                this.bigModel.triggerModel = array;
                this.bigModel.relation_info = JSON.stringify(array);
            },
            email_Edit(item,index){
                let _relation_info = {
                    "group_name":"LAST 60 DAYS PURCAHSE",
                    "relation":"&&",
                    "children":this.bigModel.triggerModel,
                };
                let _array = [];
                    _array.push(_relation_info);
                this.noteTrueArray.map((e,index) =>{
                    if(e.indexOf("Do not send if the customer received an email from this campaign in the last")>=0){
                        this.noteTrueArray[index] = "Do not send if the customer received an email from this campaign in the last " + this.noteValue +" "+ this.noteUnit;
                    }
                });
                let _thisData = {
                    index:index,
                    title:this.title,
                    description:this.description,
                    relation_info:_array,
                    email_delay:JSON.stringify(this.bigData),
                    note:this.noteTrueArray,
                }
                if(this.fromDataType == "preview"){
                    _thisData.fromDataType = "preview";
                }
                localStorage.setItem("FlowsVal",JSON.stringify(_thisData));
                if(item.value){
                    router.push(`/NewEditletterAdd?id=${item.value}`);
                }else{
                    router.push('/NewEditletterAdd');
                }
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
                let _bigData={
                    "relation":"",
                    "group_condition":[]
                }
                let  _relation_info = {
                    "group_name":"LAST 60 DAYS PURCAHSE",
                    "relation":"&&",
                    "children":this.bigModel.triggerModel,
                };
                _bigData.group_condition.push(_relation_info);
                this.noteTrueArray.map((e,index) =>{
                    if(e.indexOf("Do not send if the customer received an email from this campaign in the last")>=0){
                        this.noteTrueArray[index] = "Do not send if the customer received an email from this campaign in the last " + this.noteValue +" "+ this.noteUnit;
                    }
                });
                let  _thisData = {    
                    title:this.title,
                    description:this.description,
                    relation_info:JSON.stringify(_bigData),
                    email_delay:JSON.stringify(this.bigData),
                    note:JSON.stringify(this.noteTrueArray),
                }
                console.log(_thisData)
                if(this.title && this.title.trim().length != 0){
                    this.State.title = 1;
                    if(this.bigData.length == 0){                                                        
                        this.$message({
                            message: 'Please add edit Email or Delay!',
                        });
                    }else{
                        let _state = true;
                        this.bigData.map(e => {
                            if(e.value == ""){
                                _state = false;
                            }
                        });
                        if(_state){
                            if(this.fromDataType == "clone"){
                                this.$axios.put(`/api/v1/email_trigger/edit/${this.id}/`,_thisData)
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
                            }else{
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
                            }
                        }else{
                            this.$message({
                                message: 'Email Edit cannot be empty!',
                            });
                        }
                    }
                }else{  
                    this.State.title = 0;
                }
            },
            noteValueChange(){
                if(this.noteValue){
                    this.noteValue = parseInt(this.noteValue);
                }else{
                    this.noteValue = 0;
                }
                console.log(this.noteUnit)
                // this.noteArray[1] = "Do not send if the customer received an email from this campaign in the last "+this.noteValue+" "+this.noteUnit;
                
                // this.noteTrueArray.map(e => {
                //     if(e.indexOf("Do not send if the customer received an email from this campaign in the last ")>=0){
                //         e = "Do not send if the customer received an email from this campaign in the last "+this.noteValue+" "+this.noteUnit;
                //     }
                // });
                // this.$forceUpdate();
            },
        },
    }
    </script>
    
    <style scoped>
    .Browse{position: relative;}    
    .Browse .Browse_table{width: 65%;margin: 0 auto;}
    .Browse .Browse_table .iconfont{color: #6d6666}
    .Browse #breadcrumb{margin-bottom: 50px;}
    .Browse .Enable_button{margin:30px 0 30px;float: right;}
    .Browse .Browse_table .table_right{position: relative; border: 1px solid rgba(121, 121, 121, 1);padding-bottom:20px;}
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
    .Browse .trigger_center .trigger_input_one{width: 55%;margin-left: 22%;margin-top: 40px;position: relative;}
    .Browse .trigger_center .icon-chahao{position: absolute;margin-top: 53px;margin-left: -23px;color: #908f8f;font-size: 14px;font-weight: 600;cursor: pointer;}
    .Browse .trigger_centertwo{margin-top: -20px;}
    .Browse .rigger_bottom{position: relative;width: 52%;margin: 0 auto;margin-top: 25px;}
    .Browse .rigger_bottom span{font-size: 14px;color: #333333;font-family: 'Arial Cursiva', 'Arial Normal', 'Arial';font-style: italic;}
    .Browse .Broese_public{width: 65%;margin: 0 auto;text-align: center;}
    .Browse .Broese_img{position: relative;}
    .Browse .icon-jiahao1{position: absolute;font-size: 25px;margin-left: -28px;margin-top: 25px;background-color: white;color: red;cursor: pointer;}
    .Browse .Browse_email{height: 150px!important;}
    .Browse .icon-youjian{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
    .Browse .rigger_center{width: 52%;margin: 0 auto;margin-top: 25px;text-align: center;}
    .Browse .rigger_center .Subject{font-size: 13px;color: #333333;line-height: normal;font-weight: 600;line-height: 30px;}
    .Browse .rigger_center .Wait{line-height: 60px;font-weight: normal!important}
    .Browse .rigger_center span{font-size: 13px;color: #333333;}
    .Browse .icon-shizhong{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
    .Browse .exit{width: 65%;margin: 0 auto;}
    .Browse .exit .exit_input{width: 40%;margin: 0 auto;height: 45px;text-align: center;background-color: rgba(228, 228, 228, 1);border:1px solid rgba(121, 121, 121, 1);}
    .Browse .exit .exit_input p{font-size: 13px;font-weight: 600;line-height: 20px;}
    .Browse .exit .Enable_buttom{margin-top: 50px!important;}
    .Browse .delay_email{width: 30%;height:150px;margin: 0 auto;border:1px solid rgba(121, 121, 121, 1);margin-bottom: 10px;text-align: center;}
    .Browse .delay_left{display: inline-block;background-color: rgba(51, 153, 153, 1);color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}
    .Browse .delay_right{display: inline-block;background-color: rgba(51, 153, 153, 1);margin-left: 50px;color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}
    .Browse .noteBox{position: absolute;right: -215px;bottom: -9px;background: #fff;z-index: 500;}
    input[type='text']{height:20px;}
    
    .Browse .noteHeight .el-input__inner{height:20px;}
    </style>
    
    