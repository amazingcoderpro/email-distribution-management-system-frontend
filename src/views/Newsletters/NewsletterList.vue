<template>
    <div class="NewsletterList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> NewsletterList</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
          <!-- Pinterest -->
          <el-form-item>
            <el-input v-model="searchData.nameVal" placeholder="Search Newsletter Title"></el-input>
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
          <el-form-item class="FR">
                <el-button icon="edit" type="primary" @click="addFun">Create New</el-button>
                <!-- <el-switch v-model="searchData.allBtnState" active-color="#13ce66" inactive-color="#ff4949"></el-switch> -->
          </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :show-header="headStatus"  :height="tableHeight">
            <!-- <el-table-column align="center" type="index"  label="ID" width="50" fixed="left"></el-table-column> -->
            <el-table-column prop="title,description" align="left" width="260">
              <template slot-scope="scope">
                <div class="columnLable">{{scope.row.title}}</div>
                <div class="columnContent">{{scope.row.description}}</div>
              </template>
            </el-table-column>
             <el-table-column prop="excute_time" align="center" label="123" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Execute Time</div>
                <!-- <div class="columnContent" v-for="(item,index) in scope.row.execute_time_list">{{item}}</div> -->
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link" v-for="(item,index) in scope.row.execute_time_list" v-if="index==0" :key="index">
                    {{item}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in scope.row.execute_time_list" :key="index">{{item}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column prop="open" align="center" label="123" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Total Sent</div>
                <div class="columnContent">{{scope.row.total_sent}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="open_rate" align="center" label="123" width="150">
              <template slot-scope="scope">
                <div class="columnLable">Open Rate</div>
                <div class="columnContent">
                  <template>
                      {{(scope.row.open_rate*100).toFixed(2) + "%"}}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="click_rate" align="center" width="190">
              <template slot-scope="scope">
                <div class="columnLable">Click Rate</div>
                <div class="columnContent">
                    <template>
                        {{(scope.row.click_rate*100).toFixed(2) + "%"}}
                    </template>
                  </div>
              </template>
            </el-table-column>
            <el-table-column prop="revenue" align="center" width="180">
              <template slot-scope="scope">
                <div class="columnLable">Revenue</div>
                <div class="columnContent">
                  <template>
                      {{"$" + (scope.row.revenue).toFixed(2)}}
                  </template>
                  </div>
              </template>
            </el-table-column>
            <el-table-column prop="enable" align="center" width="180">
              <template slot-scope="scope">
                  <div class="columnLable">State</div>
                  <div class="columnContent">
                      <el-switch
                          v-model="scope.row.enable"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                      </el-switch>
                      <div class="switchShdow" @click="stateFun(scope.row)"></div>
                    </div>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" width="330">
              <template slot-scope="scope">
                <template v-if="scope.row.source == 0">
                    <el-button icon="edit" type="primary" class="WW80" size="small" @click="cloneFun(scope.row,'preview')">Preview</el-button>
                    <el-button icon="edit" type="success" class="WW80" size="small" @click="cloneFun(scope.row)">Clone</el-button>
                </template>
                <template v-if="scope.row.source == 1">
                    <el-button icon="edit" type="primary" class="WW80" size="small" @click="cloneSource(scope.row,'preview')">Preview</el-button>
                    <el-button icon="edit" type="success" class="WW80" size="small" @click="cloneSource(scope.row)">Clone</el-button>
                </template>
                <br/>
                <el-button icon="edit" type="danger" class="WW80" size="small" @click="deleteFun(scope.row)">Delete</el-button>
                <el-button icon="edit" type="primary" class="WW80" size="small" @click="HistoryEdit(scope.row)">History</el-button>
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
import DialogFound from "./NewHistorical";
export default {
    name: "NewsletterList",
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
    // watch: {
    //     'searchData.allBtnState': {
    //         handler: function() {
    //                 this.tableData.map(e =>{
    //                     e.state = this.searchData.allBtnState;
    //                 });
    //         },
    //     }
    // },
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
          let _url = `/api/v1/email_template/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
          if(this.searchData.nameVal){
            _url += `&title=${this.searchData.nameVal}`;
          }
          if(this.searchData.typeVal != -1){
            _url += `&enable=${this.searchData.typeVal}`;
          }
          this.$axios.get(_url)
          .then(res => {
              if(res.data.code == 1){
                this.tableData = res.data.data.results;
                this.page.total = res.data.data.count;
                this.tableData.map(e => {
                  e.enable?e.enable = true:e.enable = false;
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
        let NewsletterVal = {
                is_cart:true,
                fromDataType:'add',
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                bannerUrl:'',
                banner_url:'',
                Headline:'',
                bodyText:'',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                SegmentSelectState:"All",
                periodTime:[new Date(2019, 9, 1, 0, 0),new Date(2019, 9, 2, 0, 0)],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
                productTitle:"",
                languageData:'{"Copy":"Copyright,All Rights Reserved","unsubscribe":"UNSUBSCRIBE","helpCenter":"HELP CENTER","privacy":"PRIVACY POLICY","aboutUs":"ABOUT US","bottom":"This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"}'
            }
        localStorage.setItem("NewsletterVal", JSON.stringify(NewsletterVal));
        router.push('/NewsletterAdd');
      },
      cloneFun(row,preview){
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
                is_cart:true,
                banner_text:row.banner_text,
                fromDataType:'clone',
                Title:row.title,
                description:row.description,
                SubjectText:row.subject,
                HeadingText:row.heading_text,
                logoUrl: row.logo,
                bannerUrl: row.banner,
                banner_url:row.banner_url,
                Headline: row.headline,
                bodyText: row.body_text,
                searchImgType:'top_three',
                SegmentValue:_customer_group_list,
                SegmentState:[],
                SegmentSelectState:"All",
                periodTime:[new Date(_send_rule.begin_time),new Date(_send_rule.end_time)],
                SendTimeType:_send_rule.cron_type,
                SendValue:new Date("2019-1-1 "+ _send_rule.cron_time),
                productTitle:row.product_title,
                languageData:row.customer_text,
                product_list:row.product_list,
                column_num:row.column_num,
                html:row.html,
                time:row.send_rule
            }
        if(preview){
          NewsletterVal.fromDataType = "preview";
        }
        localStorage.setItem("NewsletterVal", JSON.stringify(NewsletterVal));
        router.push('/NewsletterAdd');
      },
      cloneSource(row,preview){
          let _send_rule = {
          "begin_time":"2019-07-16T16:00:00.000Z",
          "end_time":"2019-08-15T16:00:00.000Z",
          "cron_type":"Monday",
          "cron_time":"2016-10-10T10:40:04.000Z"
        };
        let _customer_group_list = [];
        let TemplateType_list = [];
        if(row.send_rule){
          _send_rule = JSON.parse(row.send_rule);
        }
        if(row.customer_group_list){
          _customer_group_list = JSON.parse(row.customer_group_list);
        }
        if(row.TemplateType_list){
          TemplateType_list = JSON.parse(row.TemplateType_list)
        }
        let NewsletterSourceVal = {
                title:row.title,
                description:row.description,
                url_template:row.url_template,
                source:row.source,
                TemplateCenterType:TemplateType_list,
                SegmentValue:_customer_group_list,
                SegmentState:[],
                periodTime:[new Date(_send_rule.begin_time),new Date(_send_rule.end_time)],
                SendTimeType:_send_rule.cron_type,
                SendValue:new Date("2019-1-1 "+ _send_rule.cron_time),
                html:row.html,
                time:row.send_rule
            }
          if(preview){
            NewsletterSourceVal.fromDataType = "preview";
          }
          localStorage.setItem("NewsletterSourceVal", JSON.stringify(NewsletterSourceVal));
          router.push('/NewsletterSource');
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
              this.$axios.put(`/api/v1/email_template/${row.id}/`,_data)
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
      stateFun(row){
        this.$confirm('Are you sure you wanna change state?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              let _data = {
                enable:0
              };
              row.enable? _data.enable = 0:_data.enable = 1;
              this.$axios.put(`/api/v1/email_template/${row.id}/`,_data)
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
      HistoryEdit(row){
           this.itemData = row;
            this.dialog = {
                show: true,
                title: "New Historical",
                option: "post"
            };
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
.NewsletterList .fromClass{width:98%;}
.NewsletterList .topictable{border-left:0;border-right:0;}
.NewsletterList .el-table__body-wrapper tbody td{border-right:0;}
.NewsletterList .columnLable{font-weight:700;margin-bottom:10px;}
.NewsletterList .switchShdow{cursor:pointer;position:absolute;left:0;width:50%;height:34px;top: 40px;margin-left:25%;}
.NewsletterList .columnContent{display: -webkit-box !important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:44px;}
.NewsletterList .el-button--small, .el-button--small.is-round{margin-bottom: 10px;}
.NewsletterList .el-button--primary{margin-right: 40px;}
.el-dropdown-link {
    cursor: pointer;
    color: #606266;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>