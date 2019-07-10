<template>
    <div class="SegmentAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/SegmentList"><span class="el-icon-house"> </span>SegmentList</a></li>
            <li><a><span class="el-icon-right"> </span>New Customers</a></li>
        </ul>
        <el-form :inline="true" :model="bigData" class="demo-form-inline fromClass" label-width="100px">
            <!-- Pinterest -->
            <el-form-item>
                <el-input v-model="bigData.segment_name" placeholder="Segment Name"></el-input>
                <div class="el-form-item__error" v-if="errorState.segment_name_state == 0">Please enter Segment Name</div>
            </el-form-item>
            <el-form-item class="addGroupClass">
                <el-button type="primary" icon="el-icon-plus" @click="addGroup">Add Group</el-button>
            </el-form-item>
            <div class="ConditionBigBox">
                <div class="ConditionBox" v-for="(item,index) in bigData.group_condition" :key="index">
                    
                    <div class="ConditionBoxHead">
                        <el-form-item class="W200">
                            <el-input v-model="item.group_name" placeholder="Group Name"></el-input>
                        </el-form-item>
                        <div class="centerClass">fit for</div>
                        <el-form-item class="W200">
                            <template>
                                <el-select v-model="item.relation">
                                    <el-option  :label="'any conditons'" :value="'||'"></el-option>
                                    <el-option  :label="'all conditions'" :value="'&&'"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item class="addConditionClass">
                            <el-button type="primary" icon="el-icon-plus" @click="addGroup">Add Condition</el-button>
                        </el-form-item>
                    </div>
                    <div class="ConditionBoxBody" v-for="(itemSon,indexSon) in item.children" :key="indexSon">
                        <div class="smailLine"></div>
                        <el-form-item>
                            <template>
                                <el-select v-model="itemSon.condition" class="W300">
                                    <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                    <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                    <el-option :label="'Customer last cart created time'" :value="'Customer last cart created time'"></el-option>
                                    <el-option :label="'Customer last cart status'" :value="'Customer last cart status'"></el-option>
                                    <el-option :label="'Customer last click email time'" :value="'Customer last click email time'"></el-option>
                                    <el-option :label="'Customer last opened email time'" :value="'Customer last opened email time'"></el-option>
                                    <el-option :label="'Customer last order created time'" :value="'Customer last order created time'"></el-option>
                                    <el-option :label="'Customer last order status'" :value="'Customer last order status'"></el-option>
                                    <el-option :label="'Customer placed order'" :value="'Customer placed order'"></el-option>
                                    <el-option :label="'Customer paid order'" :value="'Customer paid order'"></el-option>
                                    <el-option :label="'Customer total order payment amount'" :value="'Customer total order payment amount'"></el-option>
                                    <el-option :label="'Customer opened email'" :value="'Customer opened email'"></el-option>
                                    <el-option :label="'Customer clicked email'" :value="'Customer clicked email'"></el-option>
                                    <el-option :label="'Customer who accept marketing'" :value="'Customer who accept marketing'"></el-option>
                                    <el-option :label="'Customer Email'" :value="'Customer Email'"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </div>
                </div>
            </div>



        </el-form>

    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
    name: "SegmentAdd",
    data() {
        return {
            errorState:{
                segment_name_state:1,
            },
            relationArray:{
                label:"any conditons",value:"any conditons",
                label:"all conditions",value:"all conditions"
            },
            Customerval:"Customer subscribe time",
            bigData:{
                "segment_name":"",
                "relation":"G1&&G2||G3",
                "group_condition" : [
                    {
                        "group_name":"G1",
                        "relation":"&&",
                        "children":[
                                {"condition":"Customer subscribe time", "relation":"is in the past", "value":[1], "unit":"days"},
                                {"condition":"Customer sign up time", "relation":"is in the past", "value":["2019-07-17"], "unit":"days"},
                        ]
                    },
                    {
                        "group_name":"G2",
                        "relation":"||",
                        "children":[
                            {"condition":"Customer sign up time", "relation":"is in the past", "value":[1], "unit":"days"},
                            {"condition":"Customer sign up time", "relation":"is in the past", "value":["2019-07-17"], "unit":"days"}
                        ]
                    }
                ]
            }
        }
    },
    components:{
    },
    mounted() {
        // let arr = JSON.stringify(this.bigData);
        // console.log(arr)
        // console.log(JSON.parse(arr))
    },
    methods:{
        addGroup(){
            if(this.bigData.segment_name && this.bigData.segment_name.trim().length != 0){
                this.errorState.segment_name_state = 1;
            }else{
                this.errorState.segment_name_state = 0;
            }
        },
    },
    beforeDestroy() {

    }
}
</script>

<style>
.SegmentAdd .ConditionBox{
    position: relative;
    padding: 40px 20px;
    background: #F2F2F2;
    margin-bottom: 10px;}
   .SegmentAdd .centerClass{
           display: inline-block;
    padding: 9px 16px 8px 10px;
   }
   .SegmentAdd .addConditionClass{
    position: absolute;
    right: 20px;
    top: 20px;
   }
   .SegmentAdd .ConditionBoxBody{
       position: relative;
       margin-left: 50px;
   }
   .SegmentAdd .ConditionBoxHead{margin-bottom: 20px;}
   .SegmentAdd .smailLine{
    border-left: 1px solid #DCDFE6;
    height: 65px;
    position: absolute;
    left: -20px;
    border-bottom: 1px solid #DCDFE6;
    width: 20px;
    top: -42px;
   }
</style>