<template>
    <div class="Browse">
         <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
             <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a><span class="el-icon-right"> </span> Browse Abandonment</a></li>
        </ul>
        <!-- Trigger -->
        <div class="Browse_table">
            <div class="Enable_button">
                <el-button type="primary">Enable Flow</el-button>
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
                        <div class="trigger_Edit">
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


            <el-form :inline="true" :model="bigTile" >
                <div class="Browse_edit trigger_edit">
                    <div class="edit_top">
                        <div class="edit_header">
                            <div class="edit_left">
                                <i class="iconfont icon-star"></i>
                                <span>Trigger</span>
                            </div>
                            <div class="edit_right">
                                <i class="iconfont icon-shezhi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="triggerEdit_center">
                        <div class="triggerCenter_top">
                            <span>Will trigger customers that fit all the following conditions.</span>
                            <el-button type="primary" icon="el-icon-plus" @click="addCondition(item)"> Add Filter</el-button>
                        </div>
                
                     
                        <div v-for="(item,index) in bigTile.group_condition" :key="index" style="background-color: rgba(242, 242, 242, 1);padding:20px;">
                            <div v-for="(itemTr,indexTr) in item.children" :key="indexTr">
                                <el-form-item>
                                    <template>
                                        <el-select v-model="itemTr.condition" style="width:240px;padding-left:10px;">
                                            <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                            <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                            <el-option :label="'Customer last order created time'" :value="'Customer last order created time'"></el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>
            
        </div>
        <!-- 公用 -->
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
                                <div class="trigger_Edit">
                                    <i class="iconfont icon-edit"></i>
                                    <span>Edit</span>
                                </div>
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
                <el-button type="primary">Enable Flow</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input:'',
            bigData:[
                {"title":"email","icon":"icon-youjian","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
                {"title":"delay","icon":"icon-shizhong","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
                {"title":"email","icon":"icon-youjian","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
                // {"title":"delay","state":false,"content":{"EmailSubject":"123","HeadingText":"123","Headline":"123","ProductRule":"123","BodyText":"123"}},
            ],
           
            options:[
            {value: '1',label: '123'},
            {value: '2',label: '456'}
            ],
            bigTile:{
                "relation":"||,||,&&,||,&&,||",
                "group_condition" : [
                    {
                        "group_name":"Customer subscribe time",
                        "relation":"&&",
                        "children":[
                                {
                                    "condition":"Customer last click email time",
                                    "relations":[{"relation":"is over all time", "value":["30"], "unit":"days"}]
                                },
                                {"condition":"Customer sign up time","relations":[
                                    {"relation":"is more than", "value":["90"], "unit":"months"}]},
                                {"condition":"Customer last order created time","relations":[
                                    {"relation":"is less than", "value":["90"], "unit":"months"}]},
                                {"condition":"Customer last cart created time","relations":[
                                    {"relation":"is in the past", "value":["32"], "unit":"days"}]},
                                {"condition":"Customer last opened email time","relations":[
                                    {"relation":"is before", "value":["2019-07-17"], "unit":"months"}]},
                                {"condition":"Customer subscribe time","relations":[
                                    {"relation":"is after", "value":["2019-07-17"], "unit":"months"}]},
                                {"condition":"Customer subscribe time","relations":[
                                    {"relation":"is between date", "value":["2019-07-17","2019-07-19"], "unit":"months"}]},
                                {"condition":"Customer subscribe time","relations":[
                                    {"relation":"is between", "value":["123","33"], "unit":"months"}]},
                        ]
                    },
                    {
                        "group_name":"G2",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer placed order",
                                    "relations":[{"relation":"equals", "value":["1"], "unit":"days"},{"relation":"is over all time", "value":["1"], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer paid order",
                                    "relations":[{"relation":"equals", "value":["1"], "unit":"days"},{"relation":"is over all time", "value":["1"], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer opened email",
                                    "relations":[{"relation":"equals", "value":["1"], "unit":"days"},{"relation":"is over all time", "value":["1"], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer clicked email",
                                    "relations":[{"relation":"equals", "value":["1"], "unit":"days"},{"relation":"is over all time", "value":["1"], "unit":"days"}]
                                }
                        ]
                    },
                    {
                        "group_name":"Customer last order status",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer last order status",
                                    "relations":[{"relation":"is paid", "value":[1], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer last order status",
                                    "relations":[{"relation":"is unpaid", "value":[1], "unit":"days"}]
                                },
                        ]
                    },
                    {
                        "group_name":"Customer last cart status",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer last cart status",
                                    "relations":[{"relation":"is empty", "value":[1], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer last cart status",
                                    "relations":[{"relation":"is cart status", "value":[1], "unit":"days"}]
                                }
                        ]
                    },
                    {
                        "group_name":"Customer who accept marketing",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer who accept marketing",
                                    "relations":[{"relation":"is true", "value":[1], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer who accept marketing",
                                    "relations":[{"relation":"is false", "value":[1], "unit":"days"}]
                                }
                        ]
                    },
                    {
                        "group_name":"Customer Email",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer Email",
                                    "relations":[{"relation":"contains", "value":['3edds'], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer Email",
                                    "relations":[{"relation":"is started with", "value":['3edds'], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer Email",
                                    "relations":[{"relation":"is end with", "value":['3edds'], "unit":"days"}]
                                }
                        ]
                    },
                    {
                        "group_name":"Customer total order payment amount",
                        "relation":"||",
                        "children":[
                                {
                                    "condition":"Customer total order payment amount",
                                    "relations":[{"relation":"is more than", "value":['123'], "unit":"days"}]
                                },
                                {
                                    "condition":"Customer total order payment amount",
                                    "relations":[{"relation":"is less than", "value":['123'], "unit":"days"}]
                                },
                        ]
                    }
                ]
            },
            postData:{
                "id":"",
                "showState":"",
                "title":"",
                "relation_info":"",
                "description":""
            }
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["SegmentVal"])
            this.bigTile = _thisData.relation_info;
        },
        addCondition(item){
            item.children.push({"condition":"Customer last click email time","relations":[{"relation":"is over all time", "value":["30"], "unit":"days"}]})
        },
        showBox(item){
            item.state = true;
        },
        addDelay(item,index){
            item.edit = true;
            // this.bigData.splice(index+1,0,{"title":"delay","state":false})
            item.state = false;
        },
        addEmail(item,index){
            this.bigData.splice(index+1,0,{"title":"email","state":false})
            item.state = false;
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
.trigger_edit{width: 100%;margin: 0 auto;height: 300px;border: 1px solid rgba(121, 121, 121, 1);margin-top: 20px;}
.trigger_edit .edit_left i{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.edit_right i{font-size: 30px;color: #6d6666;padding-right: 20px;}
.triggerEdit_center{width: 90%;margin: 0 auto;}
.triggerCenter_top{margin-top: 15px;}
.triggerCenter_top button{float: right;background-color: #339999;border: 1px solid #339999;}
</style>

