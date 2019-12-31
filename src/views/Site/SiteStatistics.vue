<template>
    <div class='SiteStatistics'>
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>Trigger Statistics</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
            <!--<el-form-item>
                <el-date-picker type="daterange" v-model="searchData.timeValue" range-separator="0" start-placeholder="start time" end-placeholder="End time"></el-date-picker>
            </el-form-item> -->
            <el-form-item>
                <el-input v-model="searchData.site_name" placeholder="Search Site Name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="edit" type="primary" @click="init">Search</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
              
                  <el-tooltip class="questionTooltip" effect="dark" content="You can export the cumulative mail sent of all sites in the last month" placement="top-start">
                <el-button
              v-on:click="handleDownload"
              type="primary">
              <i class="mdi mdi-download"></i>
              Download</el-button>
                  </el-tooltip>
            </el-form-item>
        </el-form>
        <div class="table_right">
            <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight">
                    <el-table-column prop="site_name" align="center" label="Site Name" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.site_name">{{scope.row.site_name}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trigger_name" align="center" label="Trigger Name" width="400">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.trigger_name">{{scope.row.trigger_name}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_sent" align="center" label="Sent" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_sent">{{scope.row.total_sent}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_open" align="center" label="Open" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_open">{{scope.row.total_open}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_click" align="center" label="Click" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_click">{{scope.row.total_click}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_sessions" align="center" label="Sessions (GA)" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_sessions">{{scope.row.total_sessions}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column> 
                    <el-table-column prop="total_orders" align="center" label="Orders (GA)" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_orders">{{scope.row.total_orders}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_revenue" align="center" label="Revenue (GA)" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.total_revenue">{{scope.row.total_revenue}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="avg_conversion_rate" align="center" label="Avg Conversion Rate" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.avg_conversion_rate">{{scope.row.avg_conversion_rate}}</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="click_rate" align="center" label="Click Rate" width="120">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.click_rate">{{(scope.row.click_rate*100).toFixed(2)}}%</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="open_rate" align="center" label="Open Rate">
                        <template slot-scope="scope">
                            <div class="columnContent" v-if="scope.row.open_rate">{{(scope.row.open_rate*100).toFixed(2)}}%</div>
                            <div class="columnContent" v-else>0</div>
                        </template>
                    </el-table-column>
                <!-- <el-table-column prop="operation" label="Operation" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button icon="edit" type="primary" size="small" @click="ShowHistoy(scope.row)">History</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="paging">
            <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange"
                @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
        <DialogFound :dialog='dialog'></DialogFound>
    </div>
</template>

<script>
    import DialogFound from "./History";
    import router from '../../router'
    import axios from 'axios'
    
    import * as base from '../../assets/js/base'
    export default {
        name: 'SiteStatistics',
        components: {
            DialogFound
        },
        data() {
            return {
                exportingData:false,
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
                tableHeight:"100",
                searchData:{
                    site_name:'',
                    typeVal:'',
                    timeValue:[new Date(new Date().getTime()-1000*24*60*60),new Date().getTime()], // 时间戳
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
        methods: {
            init() {
                if(window.localStorage.getItem('user')){
                    if(JSON.parse(window.localStorage.getItem('user')).username != "admin"){
                    router.push('/dashboard');
                    }
                }
                let _url = `/api/v1/store_statistics/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
                if (this.searchData.site_name) {
                    _url += `&site_name=${this.searchData.site_name}`;
                }
                this.$axios.get(_url)
                    .then(res => {
                        if (res.data.code == 1) {
                            let _thisData = res.data.data.results;
                            this.tableData = res.data.data.results;
                            this.page.total = res.data.data.count;
                            this.tableData.map(e => {
                                if (e.update_time) {
                                    e.update_time = base.dateFormat(e.update_time);
                                }
                            });
                        } else {
                            this.$message("Acquisition failure!");
                        }
                    })
                    .catch(error => {
                        this.$message("Interface Timeout!");
                    });
            },
            ShowHistoy() {
                // 展示发送历史记录
                this.dialog = {
                    show: true,
                    title: "Add Rule",
                    option: "post"
                };
            },
            current_change(val) {
                //点击数字时触发
                this.page.currentPage = val;
                this.init();
                this.$refs.topictable.bodyWrapper.scrollTop = 0;
            },
            handleSizeChange(val) {
                //修改每页显示多少条时触发
                this.page.pagesize = val;
                this.init();
                this.$refs.topictable.bodyWrapper.scrollTop = 0;
            },
            async handleDownload () {
                let _url = `/api/v1/store_sents_statistics/`;
                this.$axios.get(_url)
                    .then(res => {
                        if (res.data.code == 1) {
                            let a = document.createElement('a')
                            a.href = res.data.data.base64_str
                            a.click()
                        } else {
                            this.$message("Acquisition failure!");
                        }
                    })
                    .catch(error => {
                        this.$message("Interface Timeout!");
                    });

                // this.exportingData = true
                // var _this = this
                // axios.get('/api/v1/store_sents_statistics/', {
                //     responseType: 'blob',
                //     headers: {
                //       'Content-Type': 'application/vnd.ms-excel;charset=UTF-8',
                //       'Access-Token': localStorage.getItem('token')
                //         ? localStorage.getItem('token')
                //         : ''
                //     }
                //     // params: Object.assign({ total: this.pageBean.total }, this.searchData)
                //   })
                //   .then(function (response) {
                //     _this.exportingData = false
                //     let url = window.URL.createObjectURL(response.data)
                //     let link = document.createElement('a')
                //     link.style.display = 'none'
                //     link.href = url
                //     link.setAttribute('download', '下载已孵化广告账户.xlsx')
                //     document.body.appendChild(link)
                //     link.click()
                //   })
            }
        }
    }
</script>
<style>
.SiteStatistics .el-table th.is-leaf{border-right:0;}
.SiteStatistics .topictable{border-left: 0;border-right:0;} 
.SiteStatistics .el-table__body-wrapper tbody td{border-right: 0;}
.SiteStatistics .fromClass{width: 97%;}
.SiteStatistics .titleClass{cursor: pointer;}
.SiteStatistics .titleClass:hover{color: #000;}
.SiteStatistics .el-table th.is-leaf {border-bottom: 1px solid #ccc;}
</style>