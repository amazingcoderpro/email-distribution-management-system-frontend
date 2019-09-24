<template>
    <div class='SiteStatistics'>
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>Site Statistics</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
            <el-form-item>
                <el-date-picker type="daterange" v-model="searchData.timeValue" range-separator="--" start-placeholder="start time" end-placeholder="End time"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.store_name" placeholder="Search Store Name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="edit" type="primary" @click="init">Search</el-button>
            </el-form-item>
        </el-form>
        <div class="table_right">
            <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight">
                <el-table-column prop="name" align="center" label="Store Name" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent">{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="domain" label="Domain" align="center" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent">{{scope.row.domain}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="email" align="center" label="Email" width="250">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.email">{{scope.row.email}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="url" align="center" label="Url" width="250">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.url"><a :href="'http://' + scope.row.url"
                                target="_blank">{{scope.row.url}}</a></div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="timezone" align="center" label="Time Zone" width="250">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.timezone">{{scope.row.timezone}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" align="center" label="Update Time" width="250">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.update_time">{{scope.row.update_time}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="Operation" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button icon="edit" type="primary" size="small" @click="editFun(scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
            <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange"
                @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import router from '../../router'
    import * as base from '../../assets/js/base'
    export default {
        name: 'SiteStatistics',
        data() {
            return {
                page:{
                    total:0,//默认数据总数
                    pagesize:10,//每页的数据条数
                    pagesizes:[10, 20, 30, 40],//分组数量
                    currentPage:1,//默认开始页面
                },
                tableHeight:"100",
                searchData:{
                    store_name:'',
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
                let _star = base.dateFormat(this.searchData.timeValue[0],"day");
                let _end = base.dateFormat(this.searchData.timeValue[1],"day");
                let _url = `/api/v1/store/list/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
                if (this.searchData.store_name) {
                    _url += `&name=${this.searchData.store_name}`;
                }
                if (this.searchData.timeValue.length>0) {
                    _url += `&begin_time=${_star}&end_time=${_end}`;
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
            }
        },
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