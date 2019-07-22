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
            <el-table-column prop="title,description" align="left" width="500">
              <template slot-scope="scope">
                <div class="columnLable">{{scope.row.title}}</div>
                <div class="columnContent">{{scope.row.description}}</div>
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
                <el-button icon="edit" type="success" size="small" @click="cloneFun(scope.row)">Clone</el-button>
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
        let NewsletterVal = {
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                bannerUrl:'',
                Headline:'',
                bodyText:'',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                periodTime:[new Date(2019, 9, 1, 0, 0),new Date(2019, 9, 2, 0, 0)],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
            }
        localStorage.setItem("NewsletterVal", JSON.stringify(NewsletterVal));
        router.push('/NewsletterAdd');
      },
      cloneFun(row){
        let _send_rule = {
          "begin_time":"2019-07-16T16:00:00.000Z",
          "end_time":"2019-08-15T16:00:00.000Z",
          "cron_type":"Monday",
          "cron_time":"2016-10-10T10:40:04.000Z"
        };
        let _customer_group_list = [];
        if(row.send_rule){
           _send_rule = JSON.parse(row.send_rule);
        }
        if(row.customer_group_list){
           _customer_group_list = JSON.parse(row.customer_group_list);
        }
        let NewsletterVal = {
                Title:row.title,
                description:row.description,
                SubjectText:row.subject,
                HeadingText:row.heading_text,
                logoUrl: row.logo,
                bannerUrl: row.banner,
                Headline: row.headline,
                bodyText: row.body_text,
                searchImgType:'top_three',
                SegmentValue:_customer_group_list,
                SegmentState:[],
                periodTime:[new Date(_send_rule.begin_time),new Date(_send_rule.end_time)],
                SendTimeType:_send_rule.cron_type,
                SendValue:new Date(_send_rule.cron_time)
            }
        localStorage.setItem("NewsletterVal", JSON.stringify(NewsletterVal));
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