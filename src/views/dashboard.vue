<template>
    <div class="dashboard">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Dashboard</a></li>
        </ul>
        <div class="dataBox">
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">${{echartData.topDashboard.total_revenue}}</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Orders</div>
                <div class="content">{{echartData.topDashboard.total_orders}}</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Avg. Repeat Purchase Rate</div>
                <div class="content">{{(echartData.topDashboard.avg_repeat_purchase_rate*100).toFixed(2)}}%</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Avg. Conversion Rate</div>
                <div class="content">{{(echartData.topDashboard.avg_conversion_rate*100).toFixed(2)}}%</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Sent</div>
                <div class="content">{{echartData.topDashboard.total_sent}}</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Avg. Open Rate</div>
                <div class="content">{{(echartData.topDashboard.avg_open_rate*100).toFixed(2)}}%</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Avg. Click Rate</div>
                <div class="content">{{(echartData.topDashboard.avg_click_rate*100).toFixed(2)}}%</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Avg. Unsubscribe Rate</div>
                <div class="content">{{(echartData.topDashboard.avg_unsubscribe_rate*100).toFixed(2)}}%</div>
            </div>
        </div>
        <el-form :inline="true" :model="echartData" class="demo-form-inline fromClass " label-width="100px">
            <el-form-item>
                <el-select placeholder="Pinterest" v-model="echartData.echartType" :class="'W200'" @change="echartTypeChange">
                    <el-option v-for="(item,index) in echartData.echartTypeArray" :key="index" :label="item.title" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="FR">
                    <el-button type="primary" :disabled="echartData.echartTimeType != 5" @click="searchFun">Search</el-button>
            </el-form-item>
            <el-form-item class="FR">
                <el-date-picker type="daterange" v-model="echartData.echartTimeValue" range-separator="--" start-placeholder="start time" end-placeholder="End time" :disabled="echartData.echartTimeState=='1'"></el-date-picker>
            </el-form-item>
            <el-form-item class="FR">
                <el-select placeholder="Pinterest" v-model="echartData.echartTimeType" @change="timeTypeChange" :class="'W200'">
                    <el-option v-for="(item,index) in echartData.echartTimeTypeArray" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div :class="echartData.className" :id="echartData.id" :style="'height:500px;width:90%;'" ref="myEchart">
        </div>
        <div class="el-loading-mask is-fullscreen" style="background-color: rgba(0, 0, 0, 0.7); z-index: 2000;" v-if="loadingState.top_dashboard || loadingState.bottom_dashboard">
            <div class="el-loading-spinner">
                <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                <p class="el-loading-text">lodding...</p>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import * as base from '../assets/js/base'
export default {
    name: "dashboard",
    data() {
        return {
            loadingState:{
                top_dashboard:true,
                bottom_dashboard:true
            },
            echartData:{
                class:"myEchart",
                id:"myEchart",
                height:"90%",
                width:"500px",
                echartType:"revenue", // 数据类型
                bigArray:[],
                dateArr:[],
                topDashboard:{
                    total_orders: 0,
                    avg_repeat_purchase_rate: 0,
                    avg_conversion_rate: 0,
                    total_revenue: 0,
                    total_sent: 0,
                    avg_open_rate: 0,
                    avg_click_rate: 0,
                    avg_unsubscribe_rate: 0
                },
                echartTimeType:2, // 展示几天
                echartTimeValue:[], // 时间戳
                echartTimeState:'1',
                echartTypeArray:[
                    {title:'Revenue',value:"revenue"},
                    {title:'Orders',value:"orders"},
                    // {title:'Traffics',value:2},
                    {title:'Sent',value:"total_sent"},
                    {title:'Opens',value:"total_open"},
                    {title:'Clicks',value:"total_click"}
                ],
                echartTimeTypeArray:[
                    {"label":"Yesterday","value":0},
                    {"label":"Today","value":1},
                    {"label":"Last 7 Days","value":2},
                    {"label":"Current Month","value":3},
                    {"label":"This Year","value":4},
                    {"label":"Custom","value":5},
                ],
            },
            chart: null,
            Xvalue:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            Yvalue:[10, 52, 200, 334, 390, 330, 220],
        }
    },
    mounted() {
        const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
        window.onresize = function() {
            if(document.getElementsByClassName("myEchart").length>0){
                self.chart = echarts.init(self.$refs.myEchart);
                self.chart.resize();
            }
        }
        this.timeTypeChange();
        this.topInit();
    },
    methods:{
        topInit(){
            let urlString = `/api/v1/top_dashboard/`;
            this.$axios.get(urlString).then(res => {
                this.loadingState.top_dashboard = false;
                if(res.data.code==1){
                    this.echartData.topDashboard = res.data.data;
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.loadingState.top_dashboard = false;
                this.$message("Interface timeout!");
            });
        },
        init(){
            let _star = base.dateFormat(this.echartData.echartTimeValue[0])
            let _end = base.dateFormat(this.echartData.echartTimeValue[1])
            let urlString = `/api/v1/bottom_dashboard/?begin_time=${_star}&end_time=${_end}`;
            this.$axios.get(urlString).then(res => {
                this.loadingState.bottom_dashboard = false;
                if(res.data.code==1){
                    this.initBigArray(res.data.data)
                }else{
                    this.$message("Acquisition failure!");
                }
                this.echartTypeChange();
            })
            .catch(error => {
                this.loadingState.bottom_dashboard = false;
                this.$message("Interface timeout!");
                this.echartTypeChange();
            });
        },
        searchFun(){
            if(this.echartData.echartTimeValue!=null && this.echartData.echartTimeValue.length == 2){
                this.getTimeArray(this.echartData.echartTimeValue[0],this.echartData.echartTimeValue[1]);
            }else{
                this.$message("Enter Time!");
            }
        },
        initBigArray(arr){
            this.echartData.bigArray = arr;
            this.echartData.bigArray.map(e => {
                let _thisDay = base.dateFormat(e.create_time,"day");
                if(this.echartData.dateArr.indexOf(_thisDay) >= 0 ){
                    let index = this.echartData.dateArr.indexOf(_thisDay);
                    this.echartData.dateArr[index] = e;
                }
            });
            for(var i=0;i<this.echartData.dateArr.length;i++){
                if(typeof(this.echartData.dateArr[i]) == "string"){
                    let _thisData = {
                        orders: 0,
                        revenue: 0,
                        total_click: 0,
                        total_open: 0,
                        total_orders: 0,
                        total_revenue: 0,
                        create_time:this.echartData.dateArr[i]
                    }
                    this.echartData.dateArr[i] = _thisData;
                }
            }
            this.echartData.bigArray = this.echartData.dateArr;
        },
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            this.chart.setOption({
                xAxis: {type: 'category',boundaryGap: false,data: this.Xvalue},
                grid:{top:"50px",left:"50px",right:"20px",bottom:"50px"},
                tooltip: {trigger: 'axis'},
                yAxis: {type: 'value',min: 0,},
                series: [{data:  this.Yvalue,type: 'line',areaStyle: {},color:['#0065a3'], smooth:true,symbolSize: 12, }]
            })
        },
        timeTypeChange(){
            if(this.echartData.echartTimeType == 5){
                this.echartData.echartTimeState = '0';
            }else{
                this.echartData.echartTimeState = '1';
                let _star;
                let _end;
                if(this.echartData.echartTimeType == 0){
                    // 昨天
                    _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                    _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 23:59:59");
                }else if(this.echartData.echartTimeType == 1){
                    // 今天
                    _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                    _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 23:59:59");
                }else if(this.echartData.echartTimeType == 2){
                    // 近七天
                    _star = new Date(base.dateFormat(new Date(new Date().getTime()-6*1000*24*60*60),"day") + " 00:00:00");
                    _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 23:59:59");
                }else if(this.echartData.echartTimeType ==3){
                    // 本月
                    var time = new Date();
                    _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                    _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 23:59:59");
                }else if(this.echartData.echartTimeType ==4){
                    //本年度
                    var time = new Date();
                    _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                    _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 23:59:59");
                }
                this.echartData.echartTimeValue = [_star,_end];
                this.getTimeArray(_star,_end);
            }
        },
        echartTypeChange(){
            this.Xvalue = [];
            this.Yvalue = [];
            this.echartData.bigArray.map(e => {
                this.Xvalue.push(base.dateFormat(e.create_time,"noyear"));
                this.Yvalue.push(e[this.echartData.echartType]);
            });
            this.initChart();
        },
        getTimeArray(_star,_end){
            let startTime = new Date(_star);
            let endTime = new Date(_end);
            var _dateArr = [];
            while ((endTime.getTime() - startTime.getTime()) > 0) {
                var year = startTime.getFullYear();
                var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);
                var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
                _dateArr.push(year + "-" + month + "-" + day);
                startTime.setDate(startTime.getDate() + 1);
            }
            this.echartData.dateArr = _dateArr;
            this.init();
        }
    },
    beforeDestroy() {
        if (!this.chart) {
        return
        }
        this.chart.dispose();
        this.chart = null;
    }
}
</script>

<style>
.dashboard .dataBox{width:90%}
.dashboard .dataBoxSon{width:calc(25% - 100px);background-color:#F2F2F2;padding:20px 0;border:1px solid #ccc;display:inline-block;margin-left:80px;box-shadow:4px 4px 6px #ccc;margin-bottom:16px;text-align:center;}
.dashboard .dataBoxSon .title{margin-bottom:20px;}
.dashboard .dataBoxSon .content{font-weight:400;font-style:normal;font-size:28px;text-align:center;}
.dashboard .fromClass{position:relative;bottom:-25px;width:calc(90% - 50px);margin-left:50px;}
</style>