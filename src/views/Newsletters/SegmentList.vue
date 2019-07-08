<template>
    <div class="SegmentList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Segments</a></li>
        </ul>

    </div>
</template>

<script>
import echarts from 'echarts'
import * as base from '../../assets/js/base'
export default {
    name: "SegmentList",
    data() {
        return {
            loadingState:{}
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
.dashboard{width:calc(100% - 20px)}
</style>