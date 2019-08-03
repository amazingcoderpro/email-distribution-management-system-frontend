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
                        <div v-for="(item,index) in bigGroupArrayTest" :key="index" class="triggerCenter_input">
                            <el-select v-model="item.condition" class="W270" @change="EditChange(item)">
                                <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                <el-option :label="'Customer last orde created time'" :value="'Customer last orde created time'"></el-option>
                                <el-option :label="'Customer last order status'" :value="'Customer last order status'"></el-option>
                                <el-option :label="'Customer order number is'" :value="'Customer order number is'"></el-option>
                                <el-option :label="'Customer last open email time'" :value="'Customer last open email time'"></el-option>
                                <el-option :label="'Customer last click email time'" :value="'Customer last click email time'"></el-option>
                                <el-option :label="'Customer who accept marketing is'" :value="'Customer who accept marketing is'"></el-option>
                            </el-select>
                            <template v-for="(itemSon,index) in item.relations">
                                <div :key="index" style="display:inline-block">
                                    <el-select v-model="itemSon.relation" class="W150" @change="itemSonRelationChange(itemSon)">
                                        <template v-if="item.condition == 'Customer who accept marketing is' || item.condition == 'Customer last open email time'">
                                            <el-option :label="'ture'" :value="'ture'"></el-option>
                                            <el-option :label="'false'" :value="'false'"></el-option>
                                        </template>
                                        <template v-if="item.condition == 'Customer last orde created time' || item.condition == 'Customer subscribe time' || item.condition == 'Customer last click email time' 
                                        || item.condition == 'Customer sign up time'">
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
                                        <template v-if="item.condition == 'Customer order number is' ||  item.condition == 'Customer sign up time'">
                                            <el-option :label="'equals'" :value="'equals'"></el-option>
                                            <el-option :label="'more than'" :value="'more than'"></el-option>
                                            <el-option :label="'less than'" :value="'less than'"></el-option>
                                        </template>
                                    </el-select>   
                                        <template v-if="itemSon.relation == 'is in the past' || itemSon.relation == 'is more than'">
                                            <div  class="PORE DisplayInline">
                                                <el-input v-model="itemSon.values[0]" placeholder="Number" class="W150"></el-input>
                                            </div>
                                            <el-select v-model="itemSon.unit" class="W150">
                                                <el-option :label="'days'" :value="'days'"></el-option>
                                                <el-option :label="'weeks'" :value="'weeks'"></el-option>
                                                <el-option :label="'months'" :value="'months'"></el-option>
                                                <el-option :label="'years'" :value="'years'"></el-option>
                                            </el-select>
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
                                        <el-input v-model="itemSon.values[0]" placeholder="Number" class="W150"></el-input>
                                        <div class="centerClass">and</div>
                                        <div  class="PORE DisplayInline">
                                            <el-input v-model="itemSon.values[1]" placeholder="Number" class="W150"></el-input>
                                        </div>
                                        <el-select v-model="itemSon.unit" class="W150">
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
        bigGroupArrayTest: Array
    },
    data(){
        return {
            // bigGroupArrayTest:[]
        }
    },  
    mounted(){
        // this.init();
    },
    methods:{
        addGroup(){
            console.log(this.bigGroupArrayTest)
            this.bigGroupArrayTest.push({"condition":"Customer subscribe time","relations":[{"relation":"is over all time", "values":[30], "unit":"days","errorMsg":""}]})
        },
        addDelete(index){
            this.bigGroupArrayTest.splice(index,1);
        },
        EditChange(item){
            let str = "";
               if(item.condition == 'Customer subscribe time'){
                    str = 'is in the past';
                }
                else if(item.condition == 'Customer sign up time'){
                    str ='is over all time'; 
                }
                else if(item.condition == 'Customer last orde created time'){
                    str ='is more than';
                }
                else if(item.condition == 'Customer order number is' || item.condition == 'Customer sign up time' ){
                    str ="equals"
                }
                else if(item.condition == 'Customer last open email time'){
                    str ="true"
                }
                else if(item.condition == 'Customer last click email time'){
                    str ="is between"
                }
                else if(item.condition == 'Customer last order status'){
                    str ="is paid"
                }
                else if(item.condition == 'Customer who accept marketing is'){
                    str ="ture"
                }
                item.relations.map(e =>{
                    e.relation = str;
                });
        },
        saveFun(){
            this.dialog.show = false;
            let lastArray = [];
            this.bigGroupArrayTest.map(e => {
                if(e.condition == 'Customer subscribe time' || e.condition == 'Customer last click email time' || e.condition == 'Customer last orde created time'
                || e.condition =='Customer sign up time'){
                    let _str = e.condition + " ";
                    e.relations.map(x =>{
                        _str += x.relation + " ";
                        if(x.relation != 'is over all time'){

                            if(x.relation == 'is before' || x.relation == 'is after'){
                                x.values.map(z =>{
                                   _str += base.dateFormat(z,"day") ;
                                });
                                 
                            }else if(x.relation == 'is between date'){
                                x.values.map((z,index) =>{
                                    if(index == 1){
                                        _str += " and ";
                                    }
                                    _str +=base.dateFormat(z,"day") ;
                                });
                            }else if(x.relation == 'is between'){
                                x.values.map((z,index) =>{
                                    if(index ==1){
                                        _str += "and ";
                                    }
                                    _str += z + " ";
                                });
                                _str += x.unit + " ago ";

                            }else{
                                x.values.map(z =>{
                                    _str += z + " ";
                                });
                                _str += x.unit + " ";
                            }
                        }
                    });
                    e.lastVal = _str;
                }else if(e.condition == 'Customer order number is' || e.condition == 'Customer last order status' 
                    || e.condition =='Customer last open email time' || e.condition == 'Customer who accept marketing is'){
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
            if(itemSon.relation == "is before" || itemSon.relation == "is after" || itemSon.relation == "is between date"){
                itemSon.values = ["2019-8-1"];
            }else{
                itemSon.values = [30];
            }
        }
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


