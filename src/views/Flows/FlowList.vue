<template>
    <div class="FlowList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span>Home</a></li>
            <li><a><span class="el-icon-right"> </span>FlowList</a></li>
        </ul>

    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
    name: "FlowList",
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
</style>