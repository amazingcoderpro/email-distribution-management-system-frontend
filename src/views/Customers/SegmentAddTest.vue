<template>
    <div class="SegmentAddTest">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/SegmentList"><span class="el-icon-house"> </span>SegmentList</a></li>
            <li><a><span class="el-icon-right"> </span>New SegmentAddTest</a></li>
        </ul>
        <el-form :inline="true" :model="bigData" class="demo-form-inline fromClass" label-width="100px" :disabled="postData.showState == '1'">
            <el-form-item label="Flow Name">
                <el-input v-model="postData.title" placeholder="Enter Flow Name"></el-input>
            </el-form-item>
            <br/>
            <el-form-item>
                <el-input v-model="group_name" placeholder="Group Name"></el-input>
            </el-form-item>
            <el-form-item class="addGroupClass">
                <el-button type="primary" @click="addGroup">Add Group</el-button>
            </el-form-item>

           
            <div v-for="(item,index) in bigData.group_condition" :key="index" style="background-color: rgba(242, 242, 242, 1);padding:20px;">
                <el-form-item>
                    <el-input v-model="item.group_name" placeholder="Group Name" style="width:240px;padding-left:10px;"></el-input>
                </el-form-item>
                <div class="centerClass">fit for</div>
                <el-select v-model="item.relation" style="width:240px;padding-left:10px;">
                    <el-option  :label="'any conditons'" :value="'||'"></el-option>
                    <el-option  :label="'all conditions'" :value="'&&'"></el-option>
                </el-select>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="addCondition(item)">Add Group</el-button>
                    <el-button type="danger" @click="addGroup">Delete</el-button>
                </el-form-item>
                <div class="branch" v-for="(itemFZ,indexFZ) in item.children" :key="indexFZ">
                    <div class="smailLine"></div>
                    <el-form-item>
                        <template>
                            <el-select v-model="itemFZ.condition" style="width:240px;padding-left:10px;">
                                <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                <el-option :label="'Customer last order created time'" :value="'Customer last order created time'"></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "SegmentAddTest",
    data() {
        return {
            segment_Choice:false,
            group_name:"",
            bigData:{
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
    watch: {
    },    
    components:{
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["SegmentVal"])
            this.bigData = _thisData.relation_info;
        },
       addGroup(){
           this.bigData.group_condition.push({"group_name":this.group_name,"relation":"||","children":[]})   
       },
       addCondition(item){
            item.children.push({"condition":"Customer last click email time","relations":[{"relation":"is over all time", "value":["30"], "unit":"days"}]})
        },
    },
    beforeDestroy() {

    }
}
</script>

<style>
.SegmentAddTest .ConditionBox{
    position: relative;
    padding: 40px 20px;
    background: #F2F2F2;
    margin-bottom: 80px;}
   .SegmentAddTest .centerClass{
           display: inline-block;
    padding: 9px 16px 8px 10px;color: #606266;font-size: 14px;
   }
   .SegmentAddTest .addConditionClass{
    position: absolute;
    right: 20px;
    top: 20px;
   }
   .SegmentAddTest .ConditionBoxBody{
       position: relative;
       margin-left: 50px;
   }
   .SegmentAddTest .ConditionBoxHead{margin-bottom: 20px;}
   .SegmentAddTest .smailLine{
    border-left: 1px solid #DCDFE6;
    height: 65px;
    position: absolute;
    left: -20px;
    border-bottom: 1px solid #DCDFE6;
    width: 20px;
    top: -42px;
   }
   .SegmentAddTest .relationBigBox{    width: calc(100% - 350px);
    display: inline-block;}
   .SegmentAddTest .relationBox{display: inline-block;}
   .SegmentAddTest .fatherRelationBox{
    position: absolute;
    top: -58px;
   }
   .SegmentAddTest .btnBox{
       text-align: right;
    padding-right: 60px;
    padding-bottom: 50px;
   }
   .SegmentAddTest .deleteBtn{
    position: absolute;
    right: 20px;
    top: 11px;
   }
   .postData_flow{display: block;}
   .groupName{width: 200px;padding-right: 10px;}
   .segment_heade{background-color: rgba(242, 242, 242, 1);padding: 20px;}
   .segment_words{display: inline-block;color:gray;font-size: 14px;line-height: 40px;}
</style>