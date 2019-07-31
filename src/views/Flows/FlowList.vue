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
              <el-button type="primary" class="select_button" @click="Selectbutton">Select All</el-button>
              <el-button type="primary" class="select_button" @click="Create_New">Create New</el-button>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :show-header="headStatus" :height="tableHeight"> 
            <el-table-column type="selection" align="center" prop="cheched"></el-table-column>
            <el-table-column prop="name,description" align="left" width="500">
              <template slot-scope="scope">
                <div class="columnLable ColumnTitle">{{scope.row.title }}</div>
                <div class="columnContent">{{scope.row.description}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Open Rate</div>
                <div class="columnContent">{{scope.row.open_rate+"%"}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="click" align="center" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Click Rate</div>
                <div class="columnContent">{{scope.row.click_rate+"%"}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="revenue" align="center" width="200">
              <template slot-scope="scope">
                <div class="columnLable">Revenue</div>
                <div class="columnContent">
                  <template v-if="scope.row.revenue">
                     {{"$"+scope.row.revenue}}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="state" align="center" width="190">
              <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" width="300">
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small" @click="CloneEdit(scope.row)">Clone</el-button>
                <el-button icon="edit" type="danger" size="small" @click="deleteFun(scope.row)">Delete</el-button>
              </template>
            </el-table-column> 
          </el-table>
        </div> 
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
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
                typeVal:'',
                allBtnState:true,
            },
            typeArray: [
                {value: '',label: 'All'},
                {value: '1',label: 'Live'},
                {value: '2',label: 'Draft'},
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
    components:{
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
          this.$axios.get(`/api/v1/email_trigger/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`)
            .then(res => {
                if(res.data.code == 1){
                  this.tableData = res.data.data.results;
                  this.page.total = res.data.data.count;
                  this.tableData.map(e =>{
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
        Create_New(){
          let FlowsVal = {
                title:"",
                email_delay:"[]",
                relation_info:"[]",
            }
            localStorage.setItem("FlowsVal", JSON.stringify(FlowsVal));
            router.push('./Browse_Abandonment')
        },
        CloneEdit(row){
          let FlowsVal = {
                title:row.title,
                email_delay:row.email_delay,
                relation_info:row.relation_info,
                description:row.description,
            }
          localStorage.setItem("FlowsVal", JSON.stringify(FlowsVal));
          router.push('/Browse_Abandonment');
        },
        Selectbutton(){
        },
        deleteFun(){
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
.flows .select_button{float: right;margin-right: 20px;}
.flows .ColumnTitle{cursor: pointer;}
</style>