<template>
    <div class="SegmentList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>SegmentList</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
          <!-- Pinterest -->
          <el-form-item>
            <el-input v-model="searchData.nameVal" placeholder="Search Flow Name"></el-input>
          </el-form-item>
          <el-form-item class="FR">
                <el-button icon="edit" type="primary" size="small" @click="addFun">Create New Segment</el-button>
          </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :show-header="headStatus">
            <!-- <el-table-column align="center" type="index"  label="ID" width="50" fixed="left"></el-table-column> -->
            <el-table-column prop="title,description" align="left" width="500">
              <template slot-scope="scope">
                <div class="columnLable">{{scope.row.title}}</div>
                <div class="columnContent">{{scope.row.description}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="open" align="center" label="123" width="200">
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
            <el-table-column prop="Members" align="center" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Members</div>
                <div class="columnContent">{{scope.row.Members}}</div>
              </template>
            </el-table-column> -->
            <el-table-column prop="LastUpdateTime" align="center" width="300">
              <template slot-scope="scope">
                <div class="columnLable">Last Update Time</div>
                <div class="columnContent">{{scope.row.update_time}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" width="300" fixed="right">
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small">Edit</el-button>
                <el-button icon="edit" type="success" size="small">Clone</el-button>
                <el-button icon="edit" type="danger" size="small">Delete</el-button>
              </template>
            </el-table-column> 
          </el-table>
        </div>      
    </div>
</template>

<script>
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "SegmentList",
    data() {
        return {
            page:{
                total:0,//默认数据总数
                pagesize:10,//每页的数据条数
                pagesizes:[10, 20, 30, 40],//分组数量
                currentPage:1,//默认开始页面
            },
            headStatus:false,
            searchData:{
                nameVal:'',
                typeVal:''
            },
            tableData:[
            //     {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","Members":"123","LastUpdateTime":"Apr 10, 2019, 10:52 am"},
            //     {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","Members":"123","LastUpdateTime":"Apr 10, 2019, 10:52 am"},
            //     {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","Members":"123","LastUpdateTime":"Apr 10, 2019, 10:52 am"},
            //     {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","Members":"123","LastUpdateTime":"Apr 10, 2019, 10:52 am"},
            //     {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","Members":"123","LastUpdateTime":"Apr 10, 2019, 10:52 am"},
            ],
        }
    },
    components:{
    },
    mounted() {
      this.init();
    },
    methods:{
        addFun(){
          let SegmentVal = {
            "description":"",
            "title":"",
            "relation_info":{"relation":"","group_condition" : []},
          }
          localStorage.setItem("SegmentVal", JSON.stringify(SegmentVal));
          router.push('/SegmentAdd');
        },
        init(){
          this.$axios.get(`/api/v1/customer_group/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`)
          .then(res => {
              if(res.data.code == 1){
                // console.log(res.data.data.results)
                this.tableData = res.data.data.results;
              }else{
                this.$message("Acquisition failure!");
              }
          })
          .catch(error => {
              this.$message("Interface timeout!");
          }); 
        }

    },
    beforeDestroy() {

    }
}
</script>

<style>
.SegmentList .topictable{border-left: 0;border-right:0;} 
.SegmentList .el-table__body-wrapper tbody td{border-right: 0;}
.SegmentList .fromClass{width: 97%;}
</style>