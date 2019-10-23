<template>
<div class="NewHistorical_title">
    <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
        <div class='NewHistorical'>
            <!-- <el-form :inline="true" :model="searchData" class="demo-form-inline fromClass" label-width="100px">
                <el-form-item>
                    <el-input v-model="searchData.create_time" placeholder="Search Site Name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="edit" type="primary" @click="init">Search</el-button>
                </el-form-item>
            </el-form> -->
            <div class="table_right">
                <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight">
                        <el-table-column prop="create_time" align="center" label="Sent time" width="250">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.create_time">{{scope.row.create_time}}</div>
                                <div class="columnContent" v-else>0</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sender" align="center" label="Sender" width="280">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.sender">{{scope.row.sender}}</div>
                                <div class="columnContent" v-else>0</div>
                            </template> 
                        </el-table-column>
                        <el-table-column prop="recipient" align="center" label="Recipient" width="250">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.recipient">{{scope.row.recipient}}</div>
                                <div class="columnContent" v-else>0</div>
                            </template>
                        </el-table-column>                    
                        <el-table-column prop="is_open" align="center" label="Is open" width="150">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.is_open">{{scope.row.is_open}}</div>
                                <div class="columnContent" v-else>false</div>
                            </template> 
                        </el-table-column>
                        <el-table-column prop="status" align="center" label="Send Status" width="150">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.status">{{scope.row.status}}</div>
                                <div class="columnContent" v-else>0</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="error_info" align="center" label="Remark" width="150">
                            <template slot-scope="scope">
                                <div class="columnContent" v-if="scope.row.error_info">{{scope.row.error_info}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operation" label="Operation" align="center">
                            <template slot-scope="scope">
                                <el-button icon="edit" type="primary" size="small" @click="ViewFun(scope.row)">View</el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
            <div class="paging">
                <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange"
                    @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
                </el-pagination>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
    import router from '../../router'
    import * as base from '../../assets/js/base'
    export default {
        name: 'NewHistorical',
        props: {
            dialog: Object,
            itemData:Object
        }, 
        watch:{
            dialog: {
                handler: function() {
                    this.init();
                },
            },
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
                // searchData:{
                //     create_time:'',
                //     typeVal:'',
                //     timeValue:[new Date(new Date().getTime()-1000*24*60*60),new Date().getTime()], // 时间戳
                // },
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
        },
        methods: {
            init() {
                let _url = `/api/v1/mail/history/?page=${this.page.currentPage}&page_size=${this.page.pagesize}&type=${0}&template_id=${this.itemData.id}`;
                // if (this.searchData.site_name) {
                //     _url += `&site_name=${this.searchData.site_name}`;
                // }
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
.NewHistorical .el-table th.is-leaf{border-right:0;}
.NewHistorical .topictable{border-left: 0;border-right:0;} 
.NewHistorical .el-table__body-wrapper tbody td{border-right: 0;}
.NewHistorical .fromClass{width: 97%;}
.NewHistorical .titleClass{cursor: pointer;}
.NewHistorical .titleClass:hover{color: #000;}
.NewHistorical .el-table th.is-leaf {border-bottom: 1px solid #ccc;}
.NewHistorical_title .el-dialog{width: 75%!important;}
.NewHistorical_title .el-message-box{width: 1000px; max-height: 800px;;overflow-y: auto;}
</style>