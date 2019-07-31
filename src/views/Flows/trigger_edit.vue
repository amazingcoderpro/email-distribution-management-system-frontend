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
                        <div v-for="(item,index) in bigGroupArray" :key="index" class="triggerCenter_input">
                            <el-select v-model="item.condition" class="W270" @change="EditChange(item)">
                                <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                <el-option :label="'Customer last orde created time'" :value="'Customer last orde created time'"></el-option>
                                <el-option :label="'Customer last order status'" :value="'Customer last order status'"></el-option>
                                <el-option :label="'Customer order number is'" :value="'Customer order number is'"></el-option>
                                <!-- <el-option :label="'Customer last cart created time'" :value="'Customer last cart created time'"></el-option> -->
                                <!-- <el-option :label="'Customer cart status is'" :value="'Customer cart status is'"></el-option> -->
                                <el-option :label="'Customer last open email time'" :value="'Customer last open email time'"></el-option>
                                <el-option :label="'Customer last click email time'" :value="'Customer last click email time'"></el-option>
                                <el-option :label="'Customer who accept marketing is'" :value="'Customer who accept marketing is'"></el-option>
                            </el-select>
                            <template>
                                <el-select v-model="item.relation" class="W150">
                                    <template v-if="item.condition == 'Customer cart status is'">
                                        <el-option :label="'empty'" :value="'empty'"></el-option>
                                        <el-option :label="'not empty'" :value="'not empty'"></el-option>
                                    </template>
                                    <template v-if="item.condition == 'Customer last cart created time'">
                                        <el-option :label="'more than'" :value="'more than'"></el-option>
                                        <el-option :label="'less than'" :value="'less than'"></el-option>
                                    </template>
                                    <template v-if="item.condition == 'Customer who accept marketing is'">
                                        <el-option :label="'ture'" :value="'ture'"></el-option>
                                        <el-option :label="'false'" :value="'false'"></el-option>
                                    </template>
                                    <template v-if="item.condition == 'Customer last orde created time' || item.condition == 'Customer subscribe time' ||
                                     item.condition == 'Customer sign up time' || item.condition == 'Customer last open email time' || item.condition == 'Customer last click email time'">
                                        <el-option :label="'is over all time'" :value="'is over all time'"></el-option>
                                        <el-option :label="'is in the past'" :value="'is in the past'"></el-option>
                                        <el-option :label="'is before'" :value="'is before'"></el-option>
                                        <el-option :label="'is after'" :value="'is after'"></el-option>
                                        <el-option :label="'is between date'" :value="'is between date'"></el-option>
                                        <el-option :label="'is between'" :value="'is between'"></el-option>
                                    </template>
                                    <template v-if="item.condition == 'Customer last order status'">
                                        <el-option :label="'is paid'" :value="'is paid'"></el-option>
                                        <el-option :label="'is unpaid'" :value="'is unpaid'"></el-option>
                                    </template>
                                    <template v-if="item.condition == 'Customer order number is'">
                                        <el-option :label="'equals'" :value="'equals'"></el-option>
                                        <el-option :label="'more than'" :value="'more than'"></el-option>
                                        <el-option :label="'less than'" :value="'less than'"></el-option>
                                    </template>
                                </el-select>
                            </template>
                            <template v-if="item.condition == 'Customer sign up time'">
                                    <el-input v-model="item.pointime" placeholder="" class="WW80"></el-input>
                                    <span>days ago</span>
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
export default {
    name:"triggerEdit",
    props: {
        dialog: Object
    },
    data(){
        return {
            bigGroupArray:[],
        }
    },
    mounted(){
        // this.init();
    },
    methods:{
        addGroup(){
            this.bigGroupArray.push({"condition":"Customer cart status is","relation":"empty", "value":[" "], "unit":"days","lastVal":""})
        },
        addDelete(index){
            this.bigGroupArray.splice(index,1);
        },
        EditChange(item){
            let str = "";
               if(item.condition == 'Customer cart status is'){
                    str = 'empty';
                }
                else if(item.condition == 'Customer last cart created time'){
                    str ='more than';
                }
                else if(item.condition == 'Customer who accept marketing is'){
                    str ='ture';
                }
                else if(item.condition == 'Customer last orde created time' || item.condition == 'Customer subscribe time'
                 || item.condition == 'Customer sign up time'){
                    str ="is in the past"
                }
                else if(item.condition == 'Customer last order status'){
                    str ="is paid"
                }
                else if(item.condition == 'Customer last open email time'){
                    str ="is between date"
                }
                else if(item.condition == 'Customer last click email time'){
                    str ="is between"
                }
                 else if(item.condition == 'Customer order number is'){
                    str ="equals"
                }
            item.relation = str;
        },
        saveFun(item){
            this.dialog.show = false;
            let lastArray = [];
            this.bigGroupArray.map(e => {
                if(item.condition == 'Customer sign up time'){
                    e.lastVal = e.condition + " " + e.relation + " "  + e.pointime + " " + e.value[0] +" "+ e.unit;
                }else if(item.condition == 'Customer subscribe time'){
                    e.lastVal = e.condition + " " + e.relation + " " +  e.value[0] +" "+ e.unit;
                }
                //  e.lastVal = e.condition + " " + e.relation + " "  +  e.value[0] +" "+ e.unit;
                lastArray.push(e);
                console.log(this.condition)
            });
            this.$parent.changeTiggerVal(lastArray);
        }
    },
}
</script>

<style>
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


