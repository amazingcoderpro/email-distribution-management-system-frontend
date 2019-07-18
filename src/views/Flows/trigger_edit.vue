<template>
    <div class="triggerName">
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
                        <el-button type="primary" icon="el-icon-plus" @click="addGroup"> Add Filter</el-button>
                    </div>
                    <div class="triggerCenter_buttom">
                        <div v-for="(item,index) in bigGroup.children" :key="index" class="triggerCenter_input">
                            <el-select v-model="item.condition" class="W300">
                                <el-option :label="'Customer subscribe time was'" :value="'Customer subscribe time was'"></el-option>
                                <el-option :label="'Customer sign up time was'" :value="'Customer sign up time was'"></el-option>
                                <el-option :label="'Customer last orde created time was'" :value="'Customer last orde created time was'"></el-option>
                                <el-option :label="'Customer last order status was'" :value="'Customer last order status was'"></el-option>
                                <el-option :label="'Customer order number is'" :value="'Customer order number is'"></el-option>
                                <el-option :label="'Customer last cart created time was'" :value="'Customer last cart created time was'"></el-option>
                                <el-option :label="'Customer cart status is'" :value="'Customer cart status is'"></el-option>
                                <el-option :label="'Customer last open email time was'" :value="'Customer last open email time was'"></el-option>
                                <el-option :label="'Customer last click email time was'" :value="'Customer last click email time was'"></el-option>
                                <el-option :label="'Customer who accept marketing is'" :value="'Customer who accept marketing is'"></el-option>
                            </el-select>
                             <el-select v-model="item.relation" class="W300">
                                 <template v-if="item.condition == 'Customer cart status is'">
                                    <el-option :label="'empty'" :value="'empty'"></el-option>
                                    <el-option :label="'not empty'" :value="'not empty'"></el-option>
                                 </template>
                            </el-select>
                            <i class="iconfont icon-chahao" @click="addDelete(index)" style="float:right;margin-right:20px;line-height:40px;"></i>
                        </div>
                    </div>   
                </div>
                <div class="triggerButton">
                    <el-button type="primary">Save Changes</el-button>        
                </div>  
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"triggerName",
    props: {
        dialog: Object
    },
    data(){
        return {
            bigGroup:{
                "group_name":"Customer subscribe time",
                "relation":"&&",
                "children":[
                ]
            },
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
        },
        addGroup(){
            this.bigGroup.children.push({"condition":"Customer cart status is","relation":"empty", "value":["30"], "unit":"days"})
        },
        addDelete(index){
            this.bigGroup.children.splice(index,    1);
            this.bigGroup = this.bigGroup;
        },
    },
}
</script>

<style>
.edit_header{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.edit_left{width: 150px;height:50px;float: left;display: inline-flex;}
.edit_left span{font-size: 13px;font-weight: 600;padding-left: 20px;line-height: 50px;}
.edit_right i{float: right;font-size: 25px;padding: 12px;}
.trigger_edit{width: 100%;margin: 0 auto;height: 380px;border: 1px solid rgb(15, 4, 4);}
.trigger_edit .edit_left i{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.edit_right i{font-size: 30px;color: #6d6666;padding-right: 20px;}
.triggerEdit_center{width: 100%;overflow: auto;height: 260px;}
.triggerCenter_top{margin-top: 15px;padding-left: 50px;}
.triggerCenter_top button{float: right;background-color: #339999!important;border: 1px solid #339999!important;margin-right: 20px;}
.triggerCenter_input{margin-top: 30px;}
.triggerCenter_buttom{padding-left: 50px;}
.triggerButton button{background-color: #339999!important;border: 1px solid #339999!important;display: block;margin: 0 auto;margin-top: 10px;}
</style>


