<template>
        <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
            <div class="Browse_edit">
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
                    <el-input v-model="itemData.value" @keyup.native="numberFun()" placeholder="请输入内容" style="width:150px;padding-right:15px;"></el-input>
                    <el-select v-model="itemData.unit" placeholder="请选择" style="width:150px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="Save_Changes">Save Changes</el-button>
                </div>
            </div>
        </el-dialog>
</template>

<script>
export default {
    name:"Browse_edit",
    props: {
        dialog: Object,
        itemData:Object
    },
    data(){
        return {
            options:[
                {value: 'minutes',label: 'minutes'},
                {value: 'hours',label: 'hours'},
                {value: 'days',label: 'days'},
                {value: 'weeks',label: 'weeks'}
            ]
        }
    },
    mounted(){

    },
    methods:{
        Save_Changes(){
            this.itemData.value = parseInt(this.itemData.value);
            this.dialog.show = false;
        },
        numberFun(){
            let  arr = []; 
            if(this.itemData.value){
                this.itemData.value = parseInt(this.itemData.value);
            }else{
                this.itemData.value = 0;
            }
        }
    }
}
</script>

<style>
.Browse .icon-shizhong{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse_edit{height: 200px;border: 1px solid rgba(121, 121, 121, 1);margin-bottom: 20px;margin: 0px 10px 0 10px;}
.edit_header{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.edit_left{width: 150px;height:50px;float: left;display: inline-flex;}
.edit_left span{font-size: 13px;font-weight: 600;padding-left: 20px;line-height: 50px;}
.edit_right i{float: right;font-size: 25px;padding: 12px;}
.Browse_edit .edit_left i{font-size: 30px;padding-top: 2px;}
.Browse_edit .edit_center{margin: 0 auto;margin-top: 25px;text-align: center;}
.Browse_edit .edit_center button{display: block;margin: 0 auto;margin-top: 25px;}
</style>

