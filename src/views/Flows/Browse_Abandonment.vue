<template>
    <div class="Browse">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
             <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a><span class="el-icon-right"> </span> Browse Abandonment</a></li>
        </ul>
        <el-form :inline="true" :model="bigModel" >
            <div class="Browse_table">
                <div class="Enable_button">
                    <el-button type="primary" style="background-color: rgba(51, 153, 153, 1);border:1px solid rgba(51, 153, 153, 1)">Enable Flow</el-button>
                </div>
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
                        <div class="trigger_center">
                            <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                            <i class="iconfont icon-chahao"></i>
                        </div>
                        <div class="trigger_center trigger_centertwo">
                            <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                            <i class="iconfont icon-chahao"></i>
                        </div>
                        <div class="trigger_center trigger_centertwo">
                            <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                            <i class="iconfont icon-chahao"></i>
                        </div>
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
            <i class="iconfont icon-jiahao1"></i>
        </div>
        <template v-for="(item,index) in bigData">
            <div :key="index">
                <div class="Browse_table">
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
                                    <div class="trigger_Edit" @click="Editletter" v-if="item.title == 'Email'">
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                    <div class="trigger_Edit" v-else>
                                        <i class="iconfont icon-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="rigger_center">
                            <span class="Subject">Subject Line</span><br/>
                            <span>Are you still interested?</span>
                        </div>
                    </div>
                </div>
                <div class="Broese_public">
                    <img src="../../assets/img/u448.png" class="Broese_img">
                    <i class="iconfont icon-jiahao1" @click="showBox(item)"></i>
                </div>

                <div class="delay_email" v-if="item.state">
                    <div class="delay_left" @click="addDelay(item,index)">
                        <span>DELAY</span>
                    </div> 
                    <div class="delay_right" @click="addEmail(item,index)">
                        <span>EMAIL</span>
                    </div> 
                </div>
              
                <div class="Browse_edit" v-if="item.edit">
                    <div class="edit_top">
                        <div class="edit_header">
                            <div class="edit_left">
                                <i class="iconfont icon-shizhong"></i>
                                <span>Delay</span>
                            </div>
                            <div class="edit_right">
                                <i class="iconfont icon-edit"></i>
                            </div>
                        </div>
                    </div>
                    <div class="edit_center">
                        <span style="padding-right:10px;">Wait</span>
                        <el-input v-model="input" placeholder="请输入内容" style="width:150px;padding-right:15px;"></el-input>
                        <el-select v-model="input" placeholder="请选择" style="width:150px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary">Save Changes</el-button>
                    </div>
                </div>
            </div>
        </template>
        <div class="exit">
            <div class="exit_input">
                <p>EXIT</p>
            </div>
            <div class="Enable_button Enable_buttom">
                <el-button type="primary" style="background-color: rgba(51, 153, 153, 1);border:1px solid rgba(51, 153, 153, 1)">Enable Flow</el-button>
            </div>
        </div>
        <DialogFound :dialog='dialog'></DialogFound>
    </div>

</template>

<script>
import DialogFound from "./trigger_edit";
import router from '../../router';
export default {
    data() {
        return {
            input:'',
            bigData:[
                {"title":"Email","icon":"icon-youjian","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
                {"title":"Delay","icon":"icon-shizhong","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
                {"title":"Email","icon":"icon-youjian","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
            ],
            bigModel:{},
            options:[
                {value: '1',label: '123'},
                {value: '2',label: '456'}
            ],
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
        }
    },
    components: {
        DialogFound,
    },
    mounted(){
        // this.init();
    },
    methods:{
        showBox(item){
            item.state = true;
        },
        addDelay(item,index){
            item.edit = true;
            // this.bigData.splice(index+1,0,{"title":"delay","state":false})
            item.state = false;
        },
        addEmail(item,index){
            this.bigData.splice(index+1,0,{"title":"Email","state":false})
            item.state = false;
        },
        EditFun() {
            this.dialog = {
            show: true,
            title: "Trigger Edit",
            option: "post"
            };
        },
        Editletter(){
                router.push('./EditletterAdd')
        }
    },
}
</script>

<style scoped>
.Browse .Browse_table{width: 65%;margin: 0 auto;}
.Browse .Enable_button{margin:30px 0 30px;margin-left: 943px;}
.Browse .Browse_table .table_right{height: 360px;border: 1px solid rgba(121, 121, 121, 1);}
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
.Browse .trigger_center .trigger_input_one{width: 45%;margin-left: 28%;margin-top: 40px;position: relative;}
.Browse .trigger_center .icon-chahao{position: absolute;margin-top: 53px;margin-left: -23px;color: #908f8f;font-size: 14px;font-weight: 600;}
.Browse .trigger_centertwo{margin-top: -20px;}
.Browse .rigger_bottom{width: 52%;margin: 0 auto;margin-top: 25px;}
.Browse .rigger_bottom span{font-size: 14px;color: #333333;font-family: 'Arial Cursiva', 'Arial Normal', 'Arial';font-style: italic;}
.Browse .Broese_public{width: 65%;margin: 0 auto;text-align: center;}
.Browse .Broese_img{position: relative;}
.Browse .icon-jiahao1{position: absolute;font-size: 25px;margin-left: -27px;margin-top: 25px;background-color: white;color: red;cursor: pointer;}
.Browse .Browse_email{height: 150px!important;}
.Browse .icon-youjian{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .rigger_center{width: 52%;margin: 0 auto;margin-top: 25px;text-align: center;}
.Browse .rigger_center .Subject{font-weight: 600;font-size: 13px;color: #333333;line-height: normal;}
.Browse .rigger_center span{font-size: 13px;color: #333333;line-height: 40px;}
.Browse .icon-shizhong{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .exit{width: 65%;margin: 0 auto;}
.Browse .exit .exit_input{width: 40%;margin: 0 auto;height: 45px;text-align: center;background-color: rgba(228, 228, 228, 1);border:1px solid rgba(121, 121, 121, 1);}
.Browse .exit .exit_input p{font-size: 13px;font-weight: 600;line-height: 20px;}
.Browse .exit .Enable_buttom{margin-top: 50px!important;}
.Browse .delay_email{width: 30%;height:150px;margin: 0 auto;border:1px solid rgba(121, 121, 121, 1);margin-bottom: 10px;text-align: center;}
.Browse .delay_left{display: inline-block;background-color: rgba(51, 153, 153, 1);color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}
.Browse .delay_right{display: inline-block;background-color: rgba(51, 153, 153, 1);margin-left: 50px;color: #fff;cursor: pointer;width: 24%;height: 60%;text-align: center;line-height: 80px;margin-top: 30px;}
.Browse_edit{width: 40%;margin: 0 auto;height: 200px;border: 1px solid rgba(121, 121, 121, 1);margin-bottom: 20px;}
.edit_header{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.edit_left{width: 100px;height:50px;float: left;display: inline-flex;}
.edit_left span{font-size: 13px;font-weight: 600;padding-left: 20px;line-height: 50px;}
.edit_right i{float: right;font-size: 25px;padding: 12px;}
.Browse_edit .edit_left i{font-size: 30px;padding-top: 2px;}
.Browse_edit .edit_center{margin: 0 auto;margin-top: 25px;text-align: center;}
.Browse_edit .edit_center button{display: block;margin: 0 auto;margin-top: 25px;background-color: rgba(22, 155, 213, 1);}
</style>

