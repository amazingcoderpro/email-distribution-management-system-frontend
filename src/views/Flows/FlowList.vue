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
          <el-form-item>
            <el-button icon="edit" type="primary" @click="init">Search</el-button>
          </el-form-item>
              <el-button type="primary" class="select_button" @click="Create_New">Create New</el-button>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :show-header="headStatus" :height="tableHeight"> 
            <el-table-column prop="name,description" align="left" width="400">
              <template slot-scope="scope">
                <div class="columnLable ColumnTitle">{{scope.row.title }}</div>
                <div class="columnContent">{{scope.row.description}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Total Sent</div>
                <div class="columnContent">{{scope.row.total_sents}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Open Rate</div>
                <div class="columnContent">{{(scope.row.open_rate*100).toFixed(2)}}%</div>
              </template>
            </el-table-column>
            <el-table-column prop="click" align="center" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Click Rate</div>
                <div class="columnContent">{{(scope.row.click_rate*100).toFixed(2)}}%</div>
              </template>
            </el-table-column>
            <el-table-column prop="revenue" align="center" width="200">
              <template slot-scope="scope"> 
                <div class="columnLable">Revenue</div>
                <div class="columnContent">
                    ${{(scope.row.revenue).toFixed(2)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" align="center" width="150">
              <template slot-scope="scope">
                  <div class="columnLable">State</div>
                  <div class="columnContent">
                      <el-switch
                          v-model="scope.row.status"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                      </el-switch>
                      <div class="switchShdow" @click="stateFun(scope.row)"></div>
                    </div>
              </template> 
            </el-table-column>
            <el-table-column prop="operation" align="center" width="350">
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small" @click="CloneEdit(scope.row,'preview')">Preview</el-button>
                <el-button icon="edit" type="primary" size="small" @click="CloneEdit(scope.row,'clone')">Clone</el-button>
                <el-button icon="edit" type="primary" size="small" @click="TestEdit(scope.row)">Test</el-button>
                <el-button icon="edit" type="danger" size="small" @click="deleteFun(scope.row)">Delete</el-button> 
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
import * as base from '../../assets/js/base'
import router from '../../router';
import DialogFound from "./Send_mail";
export default {
    name: "NewsletterList",
    components: {
        DialogFound
    },
    data() {
        return {
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
            itemData:{},
            page:{
                total:0,//默认数据总数
                pagesize:10,//每页的数据条数
                pagesizes:[10, 20, 30, 40],//分组数量
                currentPage:1,//默认开始页面
            },
            tableHeight:"100",
            headStatus:false,
            searchData:{
                nameVal:'',
                typeVal:-1,
                allBtnState:true,
            },
            typeArray: [
                {value: -1,label: 'All'},
                {value: 1,label: 'Live'},
                {value: 0,label: 'Disabled'},
            ],
            tableData:[],
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
    mounted() {
        setTimeout(() => {
        this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
          this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
      });
      this.init()
    },
    methods:{
        init(){
          let _url = `/api/v1/email_trigger/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
          if(this.searchData.nameVal){
            _url += `&title=${this.searchData.nameVal}`;
          }
          if(this.searchData.typeVal != -1){
            _url += `&status=${this.searchData.typeVal}`;
          }
          this.$axios.get(_url)
          .then(res => {
              if(res.data.code == 1){
                this.tableData = res.data.data.results;
                this.page.total = res.data.data.count;
                this.tableData.map(e =>{
                  e.status?e.status = true:e.status = false;
                });
              }else{
                this.$message("Acquisition failure!");
              }
          })
          .catch(error => {
              this.$message("Interface timeout!");
          }); 
        },
        Create_New(){
          let FlowsVal = {
                title:"",
                email_delay:"[]",
                relation_info:[{"group_name":"LAST 60 DAYS PURCAHSE","relation":"&&","children":[]}],
                note:[],
            }
            localStorage.setItem("FlowsVal", JSON.stringify(FlowsVal));
            router.push('./Browse_Abandonment')
        },
        CloneEdit(row,preview){
          let _bigData = JSON.parse(row.relation_info);
          let FlowsVal = {
                id:row.id,
                fromDataType:preview,
                title:row.title,
                email_delay:row.email_delay,
                relation_info:_bigData.group_condition,
                description:row.description,
                note:JSON.parse(row.note),
            }
          localStorage.setItem("FlowsVal", JSON.stringify(FlowsVal));
          router.push('/Browse_Abandonment');
        },
        deleteFun(row){
          this.$confirm('Are you sure you wanna delete?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              let _data ={
                status:2
              }
              this.$axios.put(`/api/v1/email_trigger/${row.id}/`,_data)
              .then(res => {
                  if(res.data.code == 1){
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
        TestEdit(row) {
            this.itemData = row;
            this.dialog = {
                show: true,
                title: "Test mail",
                option: "post"
            };
        },
        stateFun(row){
          this.$confirm('Are you sure you wanna change state?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }).then(() => {
                let _data = {
                  status:0
                }; 
                row.status? _data.status = 0:_data.status = 1;
                this.$axios.put(`/api/v1/email_trigger/${row.id}/`,_data)
                  .then(res => {
                      if(res.data.code == 1){
                          this.$message({message: res.data.msg,type: "success"});
                          this.init();
                      }else{
                          this.$message({message: res.data.msg});
                      }
                  })
                  .catch(error => {
                      this.$message("Interface timeout!");
                  });
              }) 
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
}
</script>

<style>
.flows .fromClass{width: 97%;}
.flows .topictable{border-left: 0;border-right:0;} 
.flows .el-table__body-wrapper tbody td{border-right: 0;}
.flows .columnLable{font-weight: 700;margin-bottom: 10px;}
.flows .select_button{float: right;margin-right: -7px;}
.flows .ColumnTitle{cursor: pointer;}
.flows .switchShdow{cursor: pointer; position: absolute;left: 0;width: 50%;height: 34px;top: 40px;margin-left: 25%;}
.flows .columnContent{display: -webkit-box !important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:44px;}
</style>