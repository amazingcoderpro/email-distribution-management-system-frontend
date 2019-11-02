<template>
    <div class="SegmentList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>SegmentList</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
          <!-- Pinterest -->
          <el-form-item>
            <el-input v-model="searchData.nameVal" placeholder="Search Group Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="edit" type="primary" @click="init">Search</el-button>
          </el-form-item>
          <el-form-item class="FR">
                <el-button icon="edit" type="primary" @click="addFun">Create New Segment</el-button>
          </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :show-header="headStatus"  :height="tableHeight">
            <!-- <el-table-column align="center" type="index"  label="ID" width="50" fixed="left"></el-table-column> -->
            <el-table-column prop="title,description" align="left" width="500">
              <template slot-scope="scope">
                <div class="columnLable titleClass" @click="showFun(scope.row)">{{scope.row.title}}</div>
                <div class="columnContent">{{scope.row.description}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Open Rate</div> 
                <!-- <div class="columnContent">{{scope.row.open_rate*100+"%"}}</div> -->
                <div class="columnContent">{{(scope.row.open_rate*100).toFixed(2)}}%</div>
              </template>
            </el-table-column>
            <el-table-column prop="click" align="center" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Click Rate</div>
                <div class="columnContent">{{(scope.row.click_rate*100).toFixed(2)}}%</div>
              </template>
            </el-table-column>
            <el-table-column prop="Members" align="center" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Members</div>
                <div class="columnContent">{{scope.row.members}}</div>
              </template>
            </el-table-column> 
            <el-table-column prop="LastUpdateTime" align="center" width="250">
              <template slot-scope="scope">
                <div class="columnLable">Last Update Time</div>
                <div class="columnContent">{{scope.row.update_time}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="operation" width="350"> 
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" class="WW80 MT10" size="small" @click="editFun(scope.row)" >Edit</el-button>
                <el-button icon="edit" type="success" class="WW80 MT10" size="small" @click="cloneFun(scope.row)">Clone</el-button>
                <el-button icon="edit" type="danger" class="WW80 MT10" size="small" @click="deleteFun(scope.row)">Delete</el-button>
              </template>
            </el-table-column> 
          </el-table>
        </div>   
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
        </div>  
        <DialogFound :dialog='dialog' :itemData='itemData'></DialogFound>
    </div>
</template>

<script>
import router from '../../router'
import * as base from '../../assets/js/base'
import DialogFound from "./SegmentGroup";
export default {
    name: "SegmentList",
    components: {
        DialogFound,
    },
    data() {
        return {
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
            page:{
                total:0,//默认数据总数
                pagesize:10,//每页的数据条数
                pagesizes:[10, 20, 30, 40],//分组数量
                currentPage:1,//默认开始页面
            },
            itemData:{},
            tableHeight:"100",
            headStatus:false,
            searchData:{
                nameVal:'',
                typeVal:''
            },
            tableData:[],
        }
    },
    mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
          this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
      });
      this.init();
    },
    methods:{
        init(){
          let _url = `/api/v1/customer_group/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
          if(this.searchData.nameVal){
            _url += `&title=${this.searchData.nameVal}`;
          }
          this.$axios.get(_url)
          .then(res => {
              if(res.data.code == 1){
                this.tableData = res.data.data.results;
                this.page.total = res.data.data.count;
                this.tableData.map(e =>{
                  if(e.update_time){
                      e.update_time = base.dateFormat(e.update_time);
                  }
                  if(!e.open_rate){
                    e.open_rate = "0.00"
                  }
                  if(!e.open_rate){
                    e.click_rate = "0.00"
                  }
                  if(!e.members){
                    e.click_rate = "0"
                  }
                });
              }else{
                this.$message("Acquisition failure!");
              }
          })
          .catch(error => {
              this.$message("Interface timeout!");
          }); 
        },
        addFun(){
          let SegmentVal = {
            "description":"",
            "title":"",
            "relation_info":{"relation":"","group_condition" : []},
          }
          localStorage.setItem("SegmentVal", JSON.stringify(SegmentVal));
          router.push('/SegmentAdd');
        },
        SegmentAddTest(){
          router.push('/SegmentAddTest');
        },
        deleteFun(row){
          this.$confirm('Are you sure you wanna delete?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }).then(() => {
                    this.$axios.delete(`/api/v1/customer_group/${row.id}/`)
                    .then(res => {
                        if(res.data.code == 1){
                          // console.log(res.data.data.results)
                            this.$message({message: res.data.msg,type: "success"});
                            this.init();
                        }else{
                            this.$message({message: res.data.msg});
                        }
                    })
                    .catch(error => {
                      console.log(error)
                        this.$message("Interface timeout!");
                    }); 
              }) 
        },
        editFun(row){
            this.itemData = row;
            this.dialog = {
                show: true,
                title: "Customer Group",
                option: "post"
            };
        },
        cloneFun(row){
          let SegmentVal = {
            "description":row.description,
            "title":row.title,
            "relation_info":JSON.parse(row.relation_info)
          }
          localStorage.setItem("SegmentVal", JSON.stringify(SegmentVal));
          router.push('/SegmentAdd');
        },
        showFun(row){
          let SegmentVal = {
            "showState":"1",
            "description":row.description,
            "title":row.title,
            "relation_info":JSON.parse(row.relation_info)
          }
          localStorage.setItem("SegmentVal", JSON.stringify(SegmentVal));
          router.push('/SegmentAdd');
        },
        current_change(val){
            //点击数字时触发
            this.page.currentPage = val;
            this.init();
            this.$refs.topictable.bodyWrapper.scrollTop = 0;
        },
        handleSizeChange(val){
            //修改每页显示多少条时触发
            this.page.pagesize = val;
            this.init();
            this.$refs.topictable.bodyWrapper.scrollTop = 0;
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
.SegmentList .titleClass{cursor: pointer;}
.SegmentList .titleClass:hover{color: #000;}
.SegmentList .columnContent{display: -webkit-box !important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:44px;}
</style>