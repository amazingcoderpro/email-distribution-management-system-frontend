<template>
    <div class="NewsletterList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> NewsletterList</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass W90" label-width="100px">
          <!-- Pinterest -->
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
                <el-button icon="edit" type="primary" size="small" @click="addFun" class="MR20">Create New</el-button>
                <el-switch v-model="searchData.allBtnState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :show-header="headStatus"  :height="tableHeight">
            <!-- <el-table-column align="center" type="index"  label="ID" width="50" fixed="left"></el-table-column> -->
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
            <el-table-column prop="state" align="center" width="200">
              <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" width="300" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button icon="edit" type="primary" size="small" @click="deteleFun(scope.row)">Edit</el-button> -->
                <el-button icon="edit" type="success" size="small" @click="deteleFun(scope.row)">Clone</el-button>
                <el-button icon="edit" type="danger" size="small" @click="deteleFun(scope.row)">Delete</el-button>
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
import router from '../../router'
import * as base from '../../assets/js/base'
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
            tableData:[
                {"id":"1","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","revenue":"1222.22","state":true},
                {"id":"2","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","revenue":"1222.22","state":true},
                {"id":"3","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","revenue":"1222.22","state":true},
                {"id":"4","name":"火箭炮一营","describe":"中国人民解放军火箭炮一营","open":"1.22","click":"1.22","revenue":"1222.22","state":true},
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
        }
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
      this.init();
    },
    methods:{
      init(){
          this.$axios.get(`/api/v1/email_template/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`)
          .then(res => {
              if(res.data.code == 1){
                console.log(res.data.data)
                this.tableData = res.data.data.results;
                this.page.total = res.data.data.count;
              }else{
                this.$message("Acquisition failure!");
              }
          })
          .catch(error => {
              this.$message("Interface timeout!");
          }); 
      },
      addFun(){
        router.push('/NewsletterAdd');
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
.NewsletterList .fromClass{width: 97%;}
.NewsletterList .topictable{border-left: 0;border-right:0;} 
.NewsletterList .el-table__body-wrapper tbody td{border-right: 0;}
.NewsletterList .columnLable{font-weight: 700;margin-bottom: 10px;}
</style>