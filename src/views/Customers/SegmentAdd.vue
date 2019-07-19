<template>
    <div class="SegmentAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/SegmentList"><span class="el-icon-house"> </span>SegmentList</a></li>
            <li><a><span class="el-icon-right"> </span>New Customers</a></li>
        </ul>
        <el-form :inline="true" :model="bigData" class="demo-form-inline fromClass" label-width="100px" :disabled="postData.showState == '1'">
            <el-form-item label="Flow Name">
                <el-input v-model="postData.title" placeholder="Enter Flow Name"></el-input>
                <div class="el-form-item__error" v-if="errorState.title_state == 0">Please enter Flow Name</div>
            </el-form-item>
            <br/>
            <el-form-item label="Description">
                <el-input v-model="postData.description" placeholder="Enter Description"></el-input>
                <div class="el-form-item__error" v-if="errorState.description_state == 0">Please enter Description</div>
            </el-form-item>
            <br/>
            <el-form-item>
                <el-input v-model="group_name" placeholder="Group Name"></el-input>
                <div class="el-form-item__error" v-if="errorState.group_name_state == 0">Please enter Group Name</div>
            </el-form-item>
            <el-form-item class="addGroupClass">
                <el-button type="primary" icon="el-icon-plus" @click="addGroup">Add Group</el-button>
            </el-form-item>
            <div class="ConditionBigBox">
                <div class="ConditionBox" v-for="(item,index) in bigData.group_condition" :key="index">
                    <div class="fatherRelationBox" v-if="index>=1">
                        <el-select v-model="relationArray[index-1]" class="W200">
                            <el-option  :label="'OR'" :value="'||'"></el-option>
                            <el-option  :label="'AND'" :value="'&&'"></el-option>
                        </el-select>
                    </div>
                    <div class="ConditionBoxHead">
                        <el-form-item>
                            <el-input v-model="item.group_name" placeholder="Group Name" class="W400"></el-input>
                        </el-form-item>
                        <div class="centerClass">fit for</div>
                        <el-form-item>
                            <template>
                                <el-select v-model="item.relation" class="W200">
                                    <el-option  :label="'any conditons'" :value="'||'"></el-option>
                                    <el-option  :label="'all conditions'" :value="'&&'"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item class="addConditionClass">
                            <el-button type="primary" icon="el-icon-plus" @click="addCondition(item)">Add Condition</el-button>
                            <el-button type="danger" @click="deleteCondition(index)">Delete Condition</el-button>
                        </el-form-item>
                    </div>
                    <div class="ConditionBoxBody" v-for="(itemSon,indexSon) in item.children" :key="indexSon">
                        <div class="smailLine"></div>
                        <el-form-item>
                            <template>
                                <el-select v-model="itemSon.condition" class="W300" @change="relationChang(itemSon)">
                                    <el-option :label="'Customer subscribe time'" :value="'Customer subscribe time'"></el-option>
                                    <el-option :label="'Customer sign up time'" :value="'Customer sign up time'"></el-option>
                                    <!-- <el-option :label="'Customer last cart created time'" :value="'Customer last cart created time'"></el-option>
                                    <el-option :label="'Customer last cart status'" :value="'Customer last cart status'"></el-option> -->
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
                        <div class="relationBigBox">
                            <template v-for="(itemSonRelation,index) in itemSon.relations">
                                <div class="relationBox" :key="index" :data-text="index">
                                        <template>
                                            <el-select v-model="itemSonRelation.relation" class="W150" @change="itemSonRelationChange(itemSonRelation)">
                                                <template v-if="
                                                    itemSon.condition == 'Customer subscribe time' || 
                                                    itemSon.condition == 'Customer sign up time'|| 
                                                    itemSon.condition == 'Customer last order created time'|| 
                                                    itemSon.condition == 'Customer last cart created time'|| 
                                                    itemSon.condition == 'Customer last opened email time'|| 
                                                    itemSon.condition == 'Customer last click email time'">
                                                        <el-option :label="'is over all time'" :value="'is over all time'"></el-option>
                                                        <el-option :label="'is in the past'" :value="'is in the past'"></el-option>
                                                        <!-- <el-option :label="'is more than'" :value="'is more than'"></el-option>
                                                        <el-option :label="'is less than'" :value="'is less than'"></el-option> -->
                                                        <el-option :label="'is before'" :value="'is before'"></el-option>
                                                        <el-option :label="'is after'" :value="'is after'"></el-option>
                                                        <el-option :label="'is between date'" :value="'is between date'"></el-option>
                                                        <el-option :label="'is between'" :value="'is between'"></el-option>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer placed order' ||
                                                    itemSon.condition == 'Customer paid order'||
                                                    itemSon.condition == 'Customer opened email'||
                                                    itemSon.condition == 'Customer clicked email'">
                                                    <template v-if="index == 0">
                                                        <el-option :label="'equals'" :value="'equals'"></el-option>
                                                        <el-option :label="'more than'" :value="'more than'"></el-option>
                                                        <el-option :label="'less than'" :value="'less than'"></el-option>
                                                    </template>
                                                    <template v-else>
                                                        <el-option :label="'is over all time'" :value="'is over all time'"></el-option>
                                                        <el-option :label="'is in the past'" :value="'is in the past'"></el-option>
                                                        <!-- <el-option :label="'is more than'" :value="'is more than'"></el-option>
                                                        <el-option :label="'is less than'" :value="'is less than'"></el-option> -->
                                                        <el-option :label="'is before'" :value="'is before'"></el-option>
                                                        <el-option :label="'is after'" :value="'is after'"></el-option>
                                                        <el-option :label="'is between date'" :value="'is between date'"></el-option>
                                                        <el-option :label="'is between'" :value="'is between'"></el-option>
                                                    </template>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer last order status'">
                                                        <el-option :label="'is paid'" :value="'is paid'"></el-option>
                                                        <el-option :label="'is unpaid'" :value="'is unpaid'"></el-option>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer last cart status'">
                                                        <el-option :label="'is empty'" :value="'is empty'"></el-option>
                                                        <el-option :label="'is not empty'" :value="'is not empty'"></el-option>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer who accept marketing'">
                                                        <el-option :label="'is true'" :value="'is true'"></el-option>
                                                        <el-option :label="'is false'" :value="'is false'"></el-option>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer Email'">
                                                        <el-option :label="'contains'" :value="'contains'"></el-option>
                                                        <el-option :label="'is started with'" :value="'is started with'"></el-option>
                                                        <el-option :label="'is end with'" :value="'is end with'"></el-option>
                                                </template>
                                                <template v-else-if="
                                                    itemSon.condition == 'Customer total order payment amount'">
                                                        <el-option :label="'is more than'" :value="'is more than'"></el-option>
                                                        <el-option :label="'is less than'" :value="'is less than'"></el-option>
                                                </template>
                                            </el-select>
                                        </template>
                                        <template>
                                            <template v-if=" itemSonRelation.relation == 'is more than' || itemSonRelation.relation == 'is less than' || itemSonRelation.relation == 'is in the past'">
                                                <el-form-item>
                                                    <el-input v-model="itemSonRelation.values[0]" @keyup.native="numberFun(itemSonRelation,0)" placeholder="Number" class="WW100"></el-input>
                                                </el-form-item>
                                                <template>
                                                    <template v-if="itemSon.condition == 'Customer total order payment amount'">
                                                        <div class="centerClass">USD</div>
                                                    </template>
                                                    <template v-else>
                                                        <el-select v-model="itemSonRelation.unit" class="W150">
                                                            <el-option :label="'days'" :value="'days'"></el-option>
                                                            <el-option :label="'weeks'" :value="'weeks'"></el-option>
                                                            <el-option :label="'months'" :value="'months'"></el-option>
                                                            <el-option :label="'years'" :value="'years'"></el-option>
                                                        </el-select>
                                                    </template>
                                                </template>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'is before' || itemSonRelation.relation == 'is after'">
                                                <el-date-picker v-model="itemSonRelation.values[0]" type="date" placeholder="enter Time" @change="timeChang(itemSonRelation,0)" class="W150"></el-date-picker>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'is between date'">
                                                <el-date-picker v-model="itemSonRelation.values[0]" type="date" placeholder="enter Time" @change="timeChang(itemSonRelation,0)" class="W150"></el-date-picker>
                                                <div class="centerClass">and</div>
                                                <div class="PORE DisplayInline">
                                                    <el-date-picker v-model="itemSonRelation.values[1]" type="date" placeholder="enter Time" @change="timeChang(itemSonRelation,1)" class="W150"></el-date-picker>
                                                    <div class="errorClass el-form-item__error" v-if="itemSonRelation.errorMsg">{{itemSonRelation.errorMsg}}</div>
                                                </div>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'is between'">
                                                <el-input v-model="itemSonRelation.values[0]" @keyup.native="numberFun(itemSonRelation,0)" placeholder="Number" class="W150"></el-input>
                                                <div class="centerClass">and</div>
                                                <div  class="PORE DisplayInline">
                                                    <el-input v-model="itemSonRelation.values[1]" @keyup.native="numberFun(itemSonRelation,1)" placeholder="Number" class="W150"></el-input>
                                                    <div class="errorClass el-form-item__error" v-if="itemSonRelation.errorMsg">{{itemSonRelation.errorMsg}}</div>
                                                </div>
                                                <el-select v-model="itemSonRelation.unit" class="W150">
                                                    <el-option :label="'days'" :value="'days'"></el-option>
                                                    <el-option :label="'weeks'" :value="'weeks'"></el-option>
                                                    <el-option :label="'months'" :value="'months'"></el-option>
                                                    <el-option :label="'years'" :value="'years'"></el-option>
                                                </el-select>
                                                <div class="centerClass">ago</div>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'contains' || itemSonRelation.relation == 'is started with' || itemSonRelation.relation == 'is end with'" >
                                                <el-input v-model="itemSonRelation.values[0]"  class="W150"></el-input>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'equals' || itemSonRelation.relation == 'more than' || itemSonRelation.relation == 'less than'" >
                                                <el-input v-model="itemSonRelation.values[0]"  class="W150"></el-input>
                                                <div class="centerClass">times</div>
                                            </template>
                                            <template v-else-if="itemSonRelation.relation == 'is over all time'" >
                                                <!-- 啥都不要 -->
                                            </template>
                                        </template>
                                </div>
                            </template>
                        </div>
                        <div class="deleteBtn" >
                            <el-button type="danger" @click="deleteConditionChild(index,indexSon)">Delete</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <el-button type="text" @click="cancelFun">CANCEL</el-button>
                <el-button type="primary" @click="saveFun">SAVE</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "SegmentAdd",
    data() {
        return {
            errorState:{
                group_name_state:1,
                title_state:1,
                description_state:1
            },
            Customerval:"Customer subscribe time",
            relationArray:[],
            group_name:"",
            bigData:{},
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
        relationArray:function(){
             this.bigData.relation = this.relationArray.join(",");
        }
    },    
    components:{
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            // console.log(JSON.parse(localStorage["SegmentVal"]))
            let _thisData = JSON.parse(localStorage["SegmentVal"])
            this.postData.title = _thisData.title.toString();
            this.postData.description = _thisData.description;
            this.bigData = _thisData.relation_info;
            if(_thisData.id){
                this.postData.id = _thisData.id;
            }
            if(_thisData.showState){
                this.postData.showState = _thisData.showState;
            }
            if(this.bigData.relation){
                this.relationArray = this.bigData.relation.split(",");
            }
        },
        saveFun(){
           // console.log(this.bigData.relation)
           //console.log(this.postData)
            if(this.postData.title && this.postData.title.trim().length != 0){
                this.errorState.title_state = 1;
            }else{
                this.errorState.title_state = 0;
                let topNum = document.getElementsByClassName("rightContainer")[0].scrollTop;
                var time = setInterval(function(){
                    if(topNum <= 0){
                        clearInterval(time)
                    }else{
                        document.getElementsByClassName("rightContainer")[0].scrollTop = topNum;
                    }
                    topNum = topNum-200;
                },20)
            }
            console.log(this.bigData)
            this.postData.relation_info = JSON.stringify(this.bigData);
             if(this.errorState.title_state == 1 && document.getElementsByClassName("errorClass").length == 0){
                if(this.postData.id != ''){
                    // 修改
                    this.$axios.put(`/api/v1/customer_group/${this.postData.id}/`, this.postData)
                    .then(res => {
                        if(res.data.code == 1){
                            this.$message({message: "Successfully!",type: "success"});
                            router.push('/SegmentList');
                        }else{
                            this.$message(res.data.msg);
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    }); 
                }else{
                    this.$axios.post(`/api/v1/customer_group/`, this.postData)
                    .then(res => {
                        if(res.data.code == 1){
                            this.$message({message: "Successfully!",type: "success"});
                            router.push('/SegmentList');
                        }else{
                            this.$message(res.data.msg);
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    }); 
                }
            }
        },
        addGroup(){
            if(this.group_name && this.group_name.trim().length != 0){
                this.errorState.group_name_state = 1;
                this.bigData.group_condition.push({"group_name":this.group_name,"relation":"&&","children":[]});
                this.relationArray.push("||");
                this.group_name = "";
            }else{
                this.errorState.group_name_state = 0;
            }
        },
        addCondition(item){
            item.children.push({"condition":"Customer last click email time","relations":[{"relation":"is over all time", "values":[30], "unit":"days","errorMsg":""}]})
        },
    　　numberFun(itemSon,index){　　
            let  arr = [];
            if(itemSon.values[index]){
                itemSon.values[index] = parseInt(itemSon.values[index]);
            }else{
                itemSon.values[index] = 0;
            }
            if(index == 0){
                arr.push(itemSon.values[0]);
                if(itemSon.values.length>1){
                    arr.push(itemSon.values[1]);
                }
                if(itemSon.relation == "is between"){
                    if(itemSon.values[1]<=itemSon.values[0]){
                        itemSon.errorMsg = "must greater than the previous number";
                    }else{
                        itemSon.errorMsg = "";
                    }
                }
            }else{
                if(itemSon.values[1]<=itemSon.values[0]){
                    itemSon.errorMsg = "must greater than the previous number";
                }else{
                    itemSon.errorMsg = "";
                }
                arr.push(itemSon.values[0]);
                arr.push(itemSon.values[1]);
            }
            itemSon.values = arr;
    　　},
        timeChang(itemSon,index){
            let arr = [];
            if(index == 0){
                let _thisNewTime = base.dateFormat(itemSon.values[0]);
                arr.push(_thisNewTime);
                if(itemSon.values.length>1){
                    arr.push(itemSon.values[1]);
                }
                if(itemSon.relation == "is between date"){
                    if(new Date(itemSon.values[1]).getTime()<=new Date(itemSon.values[0]).getTime()){
                        itemSon.errorMsg = "must more than the previous date";
                    }else{
                        itemSon.errorMsg = "";
                    }
                }
            }else{
                if(new Date(itemSon.values[1]).getTime() <= new Date(itemSon.values[0]).getTime()){
                    itemSon.errorMsg = "must more than the previous date";
                }else{
                    itemSon.errorMsg = "";
                }
                let _thisNewTime = base.dateFormat(itemSon.values[1]);
                arr.push(itemSon.values[0]);
                arr.push(_thisNewTime);
            }
            itemSon.values = arr;
           console.log(itemSon.values)
        },
        relationChang(itemSon){
            let str = "";
                    if(itemSon.condition == 'Customer subscribe time' || itemSon.condition == 'Customer sign up time'|| itemSon.condition == 'Customer last order created time'|| 
                        itemSon.condition == 'Customer last cart created time'|| itemSon.condition == 'Customer last opened email time'|| itemSon.condition == 'Customer last click email time'){
                            str = 'is over all time';
                        }
                        else if(itemSon.condition == 'Customer placed order' ||itemSon.condition == 'Customer paid order'||
                                itemSon.condition == 'Customer opened email'||itemSon.condition == 'Customer clicked email'){
                            str = 'equals';
                        }
                        else if(itemSon.condition == 'Customer last order status'){
                            str = 'is paid';
                        }
                        else if(itemSon.condition == 'Customer last cart status'){
                            str = 'is empty';
                        }
                        else if(itemSon.condition == 'Customer who accept marketing'){
                            str = 'is true';
                        }
                        else if(itemSon.condition == 'Customer Email'){
                            str = 'contains';
                        }
                        else if(itemSon.condition == 'Customer total order payment amount'){
                            str = 'is more than';
                        }
                        itemSon.relations.map(e =>{
                            e.relation = str;
                        });
                if(itemSon.condition == 'Customer placed order' ||itemSon.condition == 'Customer paid order'|| 
                    itemSon.condition == 'Customer opened email'||itemSon.condition == 'Customer clicked email'){
                        // 这四个需要添加新的一组数据
                        if(itemSon.relations.length<2){
                            itemSon.relations.push({"relation":"is in the past", "values":[0,1], "unit":"days","errorMsg":""});
                        }
                    }else{
                        if(itemSon.relations.length>0){
                            itemSon.relations.splice(1,1);
                            console.log(itemSon.relations)
                        }
                    }
        },
        deleteCondition(index){
            if(index != 0){
                this.relationArray.splice(index-1,1);
            }else{
                this.relationArray.splice(0,1);
            }
            this.bigData.group_condition.splice(index,1);
            this.bigData = this.bigData;
            
            // console.log(this.bigData.group_condition.length)
            // console.log(this.bigData.relation)
        },
        deleteConditionChild(index,indexSon){
            this.bigData.group_condition[index].children.splice(indexSon,1)
            this.bigData = this.bigData;
        },
        cancelFun(){
            this.$confirm('Are you sure you wanna cancel?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                router.push('/SegmentList');
            }) 
        },
        itemSonRelationChange(itemSonRelation){
            // console.log(itemSonRelation.values)
            if(itemSonRelation.relation == "is before" || itemSonRelation.relation == "is after" || itemSonRelation.relation == "is between date"){
                itemSonRelation.values = ["2019-1-1","2019-1-2"];
            }else{
                itemSonRelation.values = [0,1];
            }
        }
    },
    beforeDestroy() {

    }
}
</script>

<style>
.SegmentAdd .ConditionBox{position:relative;padding:40px 20px;background:#F2F2F2;margin-bottom:80px;}
.SegmentAdd .centerClass{display:inline-block;padding:9px 16px 8px 10px;color:#606266;font-size:14px;}
.SegmentAdd .addConditionClass{position:absolute;right:20px;top:20px;}
.SegmentAdd .ConditionBoxBody{position:relative;margin-left:50px;}
.SegmentAdd .ConditionBoxHead{margin-bottom:20px;}
.SegmentAdd .smailLine{border-left:1px solid #DCDFE6;height:65px;position:absolute;left:-20px;border-bottom:1px solid #DCDFE6;width:20px;top:-42px;}
.SegmentAdd .relationBigBox{width:calc(100% - 350px);display:inline-block;}
.SegmentAdd .relationBox{display:inline-block;}
.SegmentAdd .fatherRelationBox{position:absolute;top:-58px;}
.SegmentAdd .btnBox{text-align:right;padding-right:60px;padding-bottom:50px;}
.SegmentAdd .deleteBtn{position:absolute;right:20px;top:11px;}
.SegmentAdd .errorClass{top:42px;}
</style>