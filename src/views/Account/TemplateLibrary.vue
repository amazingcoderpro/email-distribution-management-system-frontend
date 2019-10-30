<template>
    <div class="Template">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Template Library</a></li>
        </ul>
        <el-form :inline="true" :model="Template" class="demo-form-inline fromClass" label-width="100px">
          <el-form-item>
            <el-input v-model="Template.nameVal" placeholder="Search Flow Name"></el-input>
          </el-form-item>
          <el-form-item>
            <template>
                <el-select v-model="Template.typeVal">
                    <el-option v-for="item in typeArray" :key="item.value"  :label="item.label" :value="item.value"></el-option>
                </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button icon="edit" type="primary" @click="init">Search</el-button>
          </el-form-item>
          <el-form-item style="float:right">
              <el-button type="primary" class="select_button" @click="Create_New">Create New</el-button>
          </el-form-item>
          <el-form-item style="float:right">
              <template slot-scope="scope">
                        <el-button type="primary" class="select_button" @click="Create_Url(scope.row)">Template Url</el-button>
              </template>
          </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :show-header="headStatus" :height="tableHeight"> 
            <el-table-column prop="title" align="center" width="230">
              <template slot-scope="scope">
                <div class="columnLable">Title</div>
                <div class="columnLable ColumnTitle">{{scope.row.title}}</div>
              </template>
            </el-table-column> 
            <el-table-column prop="description" align="center" width="230">
              <template slot-scope="scope">
                <div class="columnLable">Description</div>
                <div class="columnLable ColumnTitle">{{scope.row.description}}</div>
              </template>
            </el-table-column> 

            <el-table-column prop="subject" align="center" width="230">
              <template slot-scope="scope">
                <div class="columnLable">SubjectText</div>
                <div class="columnLable ColumnTitle">{{scope.row.subject}}</div>
              </template>
            </el-table-column> 
            <el-table-column prop="heading_text" align="center" width="230">
              <template slot-scope="scope">
                <div class="columnLable">HeadingText</div>
                <div class="columnLable ColumnTitle">{{scope.row.heading_text}}</div>
              </template>
            </el-table-column> 
            <el-table-column prop="headline" align="center" width="230">
              <template slot-scope="scope">
                <div class="columnLable">Headline</div>
                <div class="columnLable ColumnTitle">{{scope.row.headline}}</div>
              </template> 
            </el-table-column>     
            <el-table-column prop="state" align="center" width="230">
                  <template slot-scope="scope">
                    <div class="columnLable">Source</div>
                    <template v-if="scope.row.source == 0">
                          <el-button icon="edit" type="plain" size="small">customize</el-button>
                    </template>
                    <template v-else-if="scope.row.source == 1">
                          <el-button icon="edit" type="plain" size="small">external</el-button>
                    </template>
                  </template> 
            </el-table-column>     
            <el-table-column prop="operation" align="left" width="260" >
              <template slot-scope="scope">
                  <template v-if="scope.row.source == 0">
                          <el-button class="WW80" icon="edit" type="primary" size="small" @click="EditFun(scope.row)">Edit</el-button>
                  </template>
                  <template v-if="scope.row.source == 1">
                          <el-button class="WW80" icon="edit" type="primary" size="small" @click="EditSource(scope.row)">Edit</el-button>
                  </template>
                  <!-- <el-button class="WW80" icon="edit" type="primary" size="small" @click="EditFun(scope.row)">Edit</el-button> -->
                  <el-button class="WW80 MT10" icon="edit" type="danger" size="small" @click="deleteFun(scope.row)">Delete</el-button> 
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
import DialogFound from "./TemplateUrl";

export default {
    name: "TemplateLibrary",
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
            Template:{
                nameVal:'',
                typeVal:-1,
                allBtnState:true,
            },
            typeArray: [
                {value: -1,label: 'All'},
                // {value: 1,label: 'Live'},
                // {value: 0,label: 'Disabled'},
            ],
            tableData:[],
        }
    },
    watch: {
        'Template.allBtnState': {
            handler: function() {
                this.tableData.map(e =>{
                    e.state = this.Template.allBtnState;
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
          let _url = `/api/v3/center_template/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
          if(this.Template.nameVal){
            _url += `&title=${this.Template.nameVal}`;
          }
          this.$axios.get(_url)
          .then(res => {
              if(res.data.code == 1){
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
        Create_New(){
            let TemplateVal = {
                banner:'',
                banner_text:'',
                create_time:'',
                update_time:'',
                title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl:'',
                bannerUrl:'',
                banner_url:'',
                Headline:'', 
                html:'',  
                bodyText:'',
            }
            localStorage.setItem("TemplateVal", JSON.stringify(TemplateVal));
            router.push('/TemplateDisplay')
        },
        Create_Url(row){
            this.itemData = row;
            this.dialog = {
                show: true,
                title: "Template Url",
                option: "post"
            };
        },
        EditFun(row){
           let TemplateVal = {
                banner:row.banner,
                banner_text:row.banner_text,
                create_time:row.create_time,
                update_time:row.update_time,
                title:row.title,
                description:row.description,
                SubjectText:row.subject,
                HeadingText:row.heading_text,
                logoUrl:row.logo,
                bannerUrl:row.banner,
                banner_url:row.banner_url,
                Headline:row.headline, 
                html:row.html,
                bodyText: row.body_text,
            }
            localStorage.setItem("TemplateVal", JSON.stringify(TemplateVal));
            router.push('/TemplateDisplay');
        },
        EditSource(row){
              let TemplateSourceVal = {
                title:row.title,
                description:row.description,
                url_template:row.url_template,
                id:row.id,
            }
            console.log(row.id)
            localStorage.setItem("TemplateSourceVal", JSON.stringify(TemplateSourceVal));
            router.push('/TemplateSource');
        },
        deleteFun(row){
          this.$confirm('Are you sure you wanna delete?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              let _data ={
                status:2,
                id:row.id
              }
              this.$axios.put(`/api/v3/center_template_edit/`,_data)
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
.Template .fromClass{width: 97%;}
.Template .topictable{border-left: 0;border-right:0;} 
.Template .el-table__body-wrapper tbody td{border-right: 0;}
.Template .columnLable{font-weight: 700;margin-bottom: 10px;}
.Template .select_button{float: right;margin-right: 15px;}
.Template .ColumnTitle{cursor: pointer;}
.Template .switchShdow{cursor: pointer; position: absolute;left: 0;width: 50%;height: 34px;top: 40px;margin-left: 25%;}
.Template .columnContent{display: -webkit-box !important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:44px;}
</style>
