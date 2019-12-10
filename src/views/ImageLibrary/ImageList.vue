<template>
    <div class="ImageList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>Image Library</a></li>
        </ul>
         <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable">
            <el-table-column  prop="img" label="Image" align="center"  width="410">
               <template  slot-scope="scope">
                    <img :src="scope.row.head" width="100" height="100"/>
                </template>
            </el-table-column>
            <el-table-column  prop="size" label="Size" align="center"  width="410">

            </el-table-column>
            <el-table-column prop="title" label="Title" align="center" width="408">
              
            </el-table-column>
            <el-table-column  prop="link" label="Link" align="center"  width="405">
            
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
    name: "ImageList",
    data() {
        return {
            loadingState:{},
            tableData:[
                {"img":"","size":"100*100","title":"123","link":"123",},
            ],
        }
    },
    components:{
    },
    mounted() {
    },
    methods:{
    },
    beforeDestroy() {

    }
}
</script>

<style>
.ImageList{margin-left: 20px;}
.el-table thead tr th{background:none;color: #4e3e3e;font-weight: 600;}
</style>