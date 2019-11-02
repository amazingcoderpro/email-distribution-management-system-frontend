<template>
<div class="SegmentGroup_title">
    <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
        <div class='SegmentGroup'>
            <div class="table_right">
                <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight">
                        <el-table-column prop="email" align="center" label="Email" width="350">
                            <template slot-scope="scope">
                                <div class="columnContent">{{scope.row.email}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="update_time" align="center" label="UpdateTime" width="350">
                            <template slot-scope="scope">
                                <div class="columnContent">{{scope.row.update_time}}</div>
                            </template> 
                        </el-table-column>
                        <el-table-column prop="accepts_marketing" align="center" label="AcceptsMarketing" width="350">
                            <template slot-scope="scope">
                                <div class="columnContent">{{scope.row.accepts_marketing}}</div>
                            </template>
                        </el-table-column>                    
                        <el-table-column prop="created_at" align="center" label="CreatedTime" width="330">
                            <template slot-scope="scope">
                                <div class="columnContent">{{scope.row.created_at}}</div>
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
        name: 'SegmentGroup',
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
                    pagesize:500,//每页的数据条数
                    pagesizes:[500, 1000, 1500, 2000,2500],//分组数量
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
        },
        methods: {
            init() {    
                this.$axios.get(`/api/v1/customer_group_email/?id=${this.itemData.id}`)
                    .then(res => {
                        if (res.data.code == 1) {
                            let _thisData = res.data.data.detail;
                            this.tableData = res.data.data.detail;
                            this.page.total = res.data.data.len_email;
                            this.tableData.map(e => {
                                if (e.created_at) {
                                    e.created_at = base.dateFormat(e.created_at);
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
.SegmentGroup .el-table th.is-leaf{border-right:0;}
.SegmentGroup .topictable{border-left: 0;border-right:0;} 
.SegmentGroup .el-table__body-wrapper tbody td{border-right: 0;}
.SegmentGroup .fromClass{width: 97%;}
.SegmentGroup .titleClass{cursor: pointer;}
.SegmentGroup .titleClass:hover{color: #000;}
.SegmentGroup .el-table th.is-leaf {border-bottom: 1px solid #ccc;}
.SegmentGroup_title .el-dialog{width: 75%!important;}
</style>