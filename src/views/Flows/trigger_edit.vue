<template>
    <div class="triggerEdit">
        <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
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
                        <el-button type="primary" icon="el-icon-plus" @click="addGroup" style="font-weight:600;"> Add Filter</el-button>
                    </div>
                    <div class="triggerCenter_buttom">
                        <div v-for="(item,index) in thisData.bigGroupArrayTest" :key="index" class="triggerCenter_input">
                            <el-select v-model="item.condition" class="W270" @change="EditChange(item)">
                                <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                <el-option :label="'Customer last order created time'" :value="'Customer last order created time'"></el-option>
                                <el-option :label="'Customer last order status'" :value="'Customer last order status'"></el-option>
                                <el-option :label="'Customer order number'" :value="'Customer order number'"></el-option>
                                <el-option :label="'Customer last open email time'" :value="'Customer last open email time'"></el-option>
                                <el-option :label="'Customer last click email time'" :value="'Customer last click email time'"></el-option>
                                <el-option :label="'Customer who accept marketing'" :value="'Customer who accept marketing'"></el-option>
                            </el-select>
                            <template v-for="(itemSon,index) in item.relations">
                                <div :key="index" style="display:inline-block">
                                    <el-select v-model="itemSon.relation" class="W150" @change="itemSonRelationChange(itemSon)">
                                        <template v-if="item.condition == 'Customer who accept marketing'">
                                            <el-option :label="'is true'" :value="'is true'"></el-option>
                                            <el-option :label="'is false'" :value="'is false'"></el-option>
                                        </template>
                                        <template v-if="item.condition == 'Customer last order created time' || item.condition == 'Customer subscribe time' || item.condition == 'Customer last click email time' 
                                        || item.condition == 'Customer sign up time' || item.condition == 'Customer last open email time'">
                                            <el-option :label="'is over all time'" :value="'is over all time'"></el-option>
                                            <el-option :label="'is in the past'" :value="'is in the past'"></el-option>
                                            <el-option :label="'is before'" :value="'is before'"></el-option>
                                            <el-option :label="'is after'" :value="'is after'"></el-option>
                                            <el-option :label="'is more than'" :value="'is more than'"></el-option>
                                            <el-option :label="'is between date'" :value="'is between date'"></el-option>
                                            <el-option :label="'is between'" :value="'is between'"></el-option>
                                        </template>
                                        <template v-if="item.condition == 'Customer last order status'">
                                            <el-option :label="'is paid'" :value="'is paid'"></el-option>
                                            <el-option :label="'is unpaid'" :value="'is unpaid'"></el-option>
                                        </template>
                                        <template v-if="item.condition == 'Customer order number'">
                                            <el-option :label="'equals'" :value="'equals'"></el-option>
                                            <el-option :label="'more than'" :value="'more than'"></el-option>
                                            <el-option :label="'less than'" :value="'less than'"></el-option>
                                        </template>
                                    </el-select>   
                                    <template v-if="itemSon.relation == 'is in the past' || itemSon.relation == 'is more than'">
                                            <div  class="PORE DisplayInline">
                                                <el-input v-model="itemSon.values[0]" @keyup.native="numberFun(itemSon,0)" placeholder="Number" class="W150"></el-input>
                                            </div>
                                            <el-select v-model="itemSon.unit" class="W150">
                                                <el-option :label="'minutes'" :value="'minutes'"></el-option>
                                                <el-option :label="'hours'" :value="'hours'"></el-option>
                                                <el-option :label="'days'" :value="'days'"></el-option>
                                                <el-option :label="'weeks'" :value="'weeks'"></el-option>
                                                <el-option :label="'months'" :value="'months'"></el-option>
                                                <el-option :label="'years'" :value="'years'"></el-option>
                                            </el-select>
                                    </template>
                                    <template v-if="itemSon.relation == 'equals' || itemSon.relation == 'more than' || itemSon.relation == 'less than'">
                                            <el-input v-model="itemSon.values[0]" @keyup.native="numberFun(itemSon,0)" placeholder="Number" class="W150"></el-input>
                                            <div class="centerClass">times</div>
                                    </template>
                                    <template v-if="itemSon.relation == 'is before' || itemSon.relation == 'is after'">
                                            <el-date-picker v-model="itemSon.values[0]" type="date" placeholder="enter Time" class="W150"></el-date-picker>
                                    </template>
                                    <template v-if="itemSon.relation == 'is between date'">
                                        <el-date-picker v-model="itemSon.values[0]" type="date" placeholder="enter Time" class="W150"></el-date-picker>
                                        <div class="centerClass">and</div>
                                        <div class="PORE DisplayInline">
                                            <el-date-picker v-model="itemSon.values[1]" type="date" placeholder="enter Time" class="W150"></el-date-picker>
                                        </div>
                                    </template>
                                    <template v-else-if="itemSon.relation == 'is between'">
                                        <el-input v-model="itemSon.values[0]" @keyup.native="numberFun(itemSon,0)" placeholder="Number" class="W150"></el-input>
                                        <div class="centerClass">and</div>
                                        <div  class="PORE DisplayInline">
                                            <el-input v-model="itemSon.values[1]" @keyup.native="numberFun(itemSon,1)" placeholder="Number" class="W150"></el-input>
                                        </div>
                                        <el-select v-model="itemSon.unit" class="W150">
                                            <el-option :label="'minutes'" :value="'minutes'"></el-option>
                                            <el-option :label="'hours'" :value="'hours'"></el-option>
                                            <el-option :label="'days'" :value="'days'"></el-option>
                                            <el-option :label="'weeks'" :value="'weeks'"></el-option>
                                            <el-option :label="'months'" :value="'months'"></el-option>
                                            <el-option :label="'years'" :value="'years'"></el-option>
                                        </el-select>
                                        <div class="centerClass">ago</div>
                                    </template>
                                </div>     
                            </template>
                                
                            <i class="iconfont icon-chahao" @click="addDelete(index)" style="float:right;margin-right:20px;line-height:40px;"></i>
                        </div>
                    </div>   
                </div>
                <div class="triggerButton">
                    <el-button type="primary" style="font-weight:600;"  @click="saveFun">Save Changes</el-button>        
                </div>  
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
    name:"triggerEdit",
    props: {
        dialog: Object,
        FatherTriggerModel: Array
    },
    watch: {
        dialog: {
            handler: function() {
                let array = [];
                this.FatherTriggerModel.map(e =>{
                    array.push(e);
                });
                this.thisData.bigGroupArrayTest = array;
                this.$forceUpdate();
            },
            deep: true
        }
    },
    data(){
        return {
            thisData:{
                bigGroupArrayTest:[],
            },
        }
    },  
    mounted(){
    },
    methods:{
        addGroup(){
            this.thisData.bigGroupArrayTest.push({"condition":"Customer subscribe time","relations":[{"relation":"is over all time", "values":[30], "unit":"days","errorMsg":""}]})
        },
        addDelete(index){
            this.thisData.bigGroupArrayTest.splice(index,1);
        },
        EditChange(item){
            let str = "";
                if(item.condition == 'Customer subscribe time'){
                    str = 'is in the past';
                }
                else if(item.condition == 'Customer sign up time'){
                    str ='is over all time'; 
                }
                else if(item.condition == 'Customer last order created time'){
                    str ='is in the past';
                }
                else if(item.condition == 'Customer order number'){
                    str ="equals"
                }
                else if(item.condition == 'Customer last open email time'){
                    str ="is in the past"
                }
                else if(item.condition == 'Customer last click email time'){
                    str ="is between"
                }
                else if(item.condition == 'Customer last order status'){
                    str ="is paid"
                }
                else if(item.condition == 'Customer who accept marketing'){
                    str ="is true"
                }
                item.relations.map(e =>{
                    e.relation = str;
                });
        },
        saveFun(){
            this.dialog.show = false;
            let lastArray = [];
            this.thisData.bigGroupArrayTest.map(e => {
                if(e.condition == 'Customer subscribe time' || e.condition == 'Customer last click email time' || e.condition == 'Customer last order created time'
                || e.condition =='Customer sign up time' || e.condition == 'Customer order number' || e.condition == 'Customer last open email time'){
                    let _str = e.condition + " ";
                    e.relations.map(x =>{
                        _str += x.relation + " ";
                        if(x.relation != 'is over all time'){
                            if(x.relation == 'is before' || x.relation == 'is after'){
                                x.values.map((z,index) =>{
                                    x.values[index] = base.dateFormat(z);
                                    _str += base.dateFormat(z,"day");
                                });
                            }else if(x.relation == 'is between date'){
                                x.values.map((z,index) =>{
                                    if(index == 1){
                                        _str += " and ";
                                    }
                                    x.values[index] = base.dateFormat(z);
                                    _str += base.dateFormat(z,"day");
                                });
                            }else if(x.relation == 'is between'){
                                x.values.map((z,index) =>{
                                    if(index ==1){
                                        _str += "and ";
                                    }
                                    _str += z + " ";
                                });
                                _str += x.unit + " ago ";
                            }else if(x.relation == 'equals' || x.relation == 'more than' ||x.relation == 'less than' ){
                                x.values.map((z,index) =>{
                                    if(index ==1){
                                        _str += "and ";
                                    }
                                    _str += z + " ";
                                });
                                _str += " times";
                            }else{
                                x.values.map(z =>{
                                    _str += z + " ";
                                });
                                _str += x.unit + " ";
                            }
                        }
                    });
                    e.lastVal = _str;
                }else if(e.condition == 'Customer order number' || e.condition == 'Customer last order status' 
                    || e.condition == 'Customer who accept marketing'){
                        let _str = e.condition + " ";
                        e.relations.map(x =>{
                            _str += x.relation;
                        });
                        e.lastVal = _str;
                }
                lastArray.push(e);
            });
            this.$parent.changeTiggerVal(lastArray);
        },
        itemSonRelationChange(itemSon){
            if(itemSon.relation == "is before" || itemSon.relation == "is after"){
                itemSon.values = [base.dateFormat(new Date())];
            }else if( itemSon.relation == "is between date"){
                itemSon.values = [base.dateFormat(new Date()),base.dateFormat(new Date())];
            }else if( itemSon.relation == "is between"){
                itemSon.values = [30,30];
            }
            else{
                itemSon.values = [30];
            }
        },
        numberFun(item,index){　　
            let  arr = []; 
            if(item.values[index]){
                item.values[index] = parseInt(item.values[index]);
            }else{
                item.values[index] = 0;
            }
            if(index == 0){
                arr.push(item.values[0]);
                if(item.values.length>1){
                    arr.push(item.values[1]);
                }
                if(item.relation == "is between"){
                    if(item.values[1]<=item.values[0]){
                        item.errorMsg = "must greater than the previous number";
                    }else{
                        item.errorMsg = "";
                    }
                }
            }else{
                if(item.values[1]<=item.values[0]){
                    item.errorMsg = "must greater than the previous number";
                }else{
                    item.errorMsg = "";
                }
                arr.push(item.values[0]);
                arr.push(item.values[1]);
            }
            item.values = arr;
    　　},
    },
}
</script>

<style>
.triggerEdit .el-dialog{width: 1200px;}
.triggerEdit .centerClass{display:inline-block;padding:9px 16px 8px 10px;color:#606266;font-size:14px;}
.triggerEdit .edit_header{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.triggerEdit .edit_left{width: 150px;height:50px;float: left;display: inline-flex;}
.triggerEdit .edit_left span{font-size: 13px;font-weight: 600;padding-left: 20px;line-height: 50px;}
.triggerEdit .edit_right i{float: right;font-size: 25px;padding: 12px;}
.triggerEdit .trigger_edit{width: 100%;margin: 0 auto;height: 380px;border: 1px solid rgb(15, 4, 4);}
.triggerEdit .trigger_edit .edit_left i{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.triggerEdit .edit_right i{font-size: 30px;color: #6d6666;padding-right: 20px;}
.triggerEdit .triggerEdit_center{width: 100%;overflow: auto;height: 260px;}
.triggerEdit .triggerCenter_top{margin-top: 15px;padding-left: 50px;}
.triggerEdit .triggerCenter_top button{float: right;margin-right: 20px;}
.triggerEdit .triggerCenter_input{margin-top: 30px;}
.triggerEdit .triggerCenter_buttom{padding-left: 50px;}
.triggerEdit .triggerButton button{display: block;margin: 0 auto;margin-top: 10px;}
</style>


