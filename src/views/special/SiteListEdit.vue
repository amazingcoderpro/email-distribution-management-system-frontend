<template>
<div class="SiteListEdit_title">
     <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
        <div class='SiteListEdit'>
           <div class="table_right">
                <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight" highlight-current-row @row-click="handleCurrentChange">
                    <el-table-column prop="name" align="center" label="Store Name" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent" @change="handleEdit(scope.$index, scope.row)">{{scope.row.name}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="domain" label="Domain" align="center" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent">{{scope.row.domain}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="email" align="center" label="Email" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.email">{{scope.row.email}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="url" align="center" label="Url" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.url"><a :href="'http://' + scope.row.url" target="_blank">{{scope.row.url}}</a></div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="timezone" align="center" label="Time Zone" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.timezone">{{scope.row.timezone}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="update_time" align="center" label="Update Time" width="200">
                    <template slot-scope="scope">
                        <div class="columnContent" v-if="scope.row.update_time">{{scope.row.update_time}}</div>
                        <div class="columnContent" v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="store_view_id" align="center" label="Store View ID" width="180">
                    <template slot-scope="scope">
                        <div class="columnContent">{{scope.row.store_view_id}}</div>
                    </template>
                    </el-table-column>
                </el-table>     
            </div>   
        </div>
        <div class="paging">
            <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange"
                @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
    </el-dialog>
</div>
</template>

<script>
    import router from '../../router'
    import * as base from '../../assets/js/base'
    export default {
        name: 'SiteListEdit',
        props: {
            dialog: Object,
        }, 
        data() {
            return {
                page:{
                    total:0,//默认数据总数
                    pagesize:10,//每页的数据条数
                    pagesizes:[10, 20, 30, 40],//分组数量
                    currentPage:1,//默认开始页面
                },
                tableHeight:"100",
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
                let _url = `/api/v1/store/list/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
                this.$axios.get(_url)
                    .then(res => {
                        if (res.data.code == 1) {
                            let _thisData = res.data.data.results;
                            this.tableData = res.data.data.results;
                            this.page.total = res.data.data.count;
                            this.tableData.map(e => {
                                if (e.create_time) {
                                    e.create_time = base.dateFormat(e.create_time);
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
            ViewFun(row){
                this.$alert(row.html, {
                dangerouslyUseHTMLString: true
                }).catch(() => {
                });
            },
             handleCurrentChange(row, event, column) {
            
          },
            handleEdit(index, row) {
                console.log(index, row);
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
.SiteListEdit_title .el-dialog{width: 75%!important;}
</style>