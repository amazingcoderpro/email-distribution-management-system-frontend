<template>
    <div class="flows">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Flows</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
          <el-form-item>
            <el-input v-model="searchData.nameVal" placeholder="Search Flow Name"></el-input>
          </el-form-item>
          <el-form-item>
            <template>
                <el-select v-model="searchData.typeVal">
                    <el-option v-for="item in typeArray" :key="item.value"  :label="item.label" :value="item.value"></el-option>
                </el-select>
            </template>
          </el-form-item>
          <el-form-item class="FR">
                <el-switch v-model="searchData.allBtnState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
               <el-button type="primary" class="select_button" @click="Selebutton">Select All</el-button>
          </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :show-header="headStatus">
            <el-table-column type="selection" align="center" prop="cheched"></el-table-column>
            <el-table-column prop="name,describe" align="left" width="500">
              <template slot-scope="scope">
                <div class="columnLable">{{scope.row.name}}</div>
                <div class="columnContent">{{scope.row.describe}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Open Rate</div>
                <div class="columnContent">{{scope.row.open+"%"}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="click" align="center" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Click Rate</div>
                <div class="columnContent">{{scope.row.click+"%"}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="revenue" align="center" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Revenue</div>
                <div class="columnContent">{{"$"+scope.row.revenue}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="state" align="center" width="180">
              <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" width="250" fixed="right">
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small" @click="deteleEdit(scope.row)">Edit</el-button>
                <el-button icon="edit" type="danger" size="small" @click="deteleFun(scope.row)">Delete</el-button>
              </template>
            </el-table-column> 
          </el-table>
        </div>        
    </div>
</template>
<script>
import * as base from '../../assets/js/base'
import router from '../../router';
export default {
    name: "NewsletterList",
    data() {
        return {
            // tableHeight:700,
            headStatus:false,
            searchData:{
                nameVal:'',
                typeVal:'',
                allBtnState:true,
            },
            typeArray: [
                {value: '',label: 'All'},
                {value: '1',label: 'Live'},
                {value: '2',label: 'Draft'},
            ],
            tableData:[
                {"id":"1","name":"Browse Abandonment","describe":"Bring back customers who have browsed your website but haven't started checking out","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
                {"id":"2","name":"Cart Abandonment","describe":"Bring back customers who added items to the cart but never completed the purchase","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
                {"id":"3","name":"Inactive Customer Winback","describe":"Wake up customers who haven't purchased from you in a while","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
                {"id":"4","name":"Occasional Customer Winback","describe":"Win back customers who've only made a single purchase and never returned","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
                {"id":"5","name":"Thank Repeat Purchaser","describe":"Re-engage your customers by sending them a Happy Birthday promotion","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
                {"id":"6","name":"Reward VIP Customers","describe":"Re-engage your customers by sending reward them somthing","open":"1.22","click":"1.22","revenue":"1222.22","state":true,},
            ],
        }
    },
    watch: {
        'searchData.allBtnState': {
            handler: function() {
                this.tableData.map(e =>{
                    e.state = this.searchData.allBtnState;
                });
            },
        },
    },
    components:{
    },
    mounted() {
        // setTimeout(function(){
        //      this.tableHeight = window.innerHeight - document.getElementsByClassName("table_right")[0].offsetTop - 100;
        // },50);
        // window.addEventListener('resize', () => {
        //     if(document.getElementsByClassName("table_right").length>0){
        //         this.tableHeight = window.innerHeight - document.getElementsByClassName("table_right")[0].offsetTop - 100;
        //     }
        // });
    },
    methods:{
      deteleEdit(){
          router.push('/Browse_Abandonment')
      },
      Selebutton(){
        
      }
    },
    beforeDestroy() {

    }
}
</script>

<style>
.flows .fromClass{width: 97%;}
.flows .topictable{border-left: 0;border-right:0;} 
.flows .el-table__body-wrapper tbody td{border-right: 0;}
.flows .columnLable{font-weight: 700;margin-bottom: 10px;}
.flows .select_button{float: right;margin-right: 20px;}
</style>