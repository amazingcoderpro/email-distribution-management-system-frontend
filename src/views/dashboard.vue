<template>
    <div class="dashboard">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Dashboard</a></li>
        </ul>
        <div class="dataBox">
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
            <div class="dataBoxSon">
                <div class="title">Total Revenue</div>
                <div class="content">$535467.58</div>
            </div>
        </div>
        <el-form :inline="true" :model="echartData" class="demo-form-inline fromClass " label-width="100px">
          <!-- Pinterest -->
          <el-form-item>
            <el-select placeholder="Pinterest" v-model="echartData.echartType" :class="'W200'">
              <el-option v-for="(item,index) in echartData.echartTypeArray" :key="index" :label="item.title" :value="item.value"></el-option>
            </el-select>
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
    </div>
</template>

<script>
import echarts from 'echarts'
import * as base from '../assets/js/base'
export default {
    name: "dashboard",
    data() {
        return {
            echartData:{
                class:"myEchart",
                id:"myEchart",
                height:"90%",
                width:"500px",
                echartType:0, // 数据类型
                echartTimeType:0, // 展示几天
                echartTimeValue:[], // 时间戳
                echartTimeState:'1',
                echartTypeArray:[
                    {title:'Revenue',value:0},
                    {title:'Orders',value:1},
                    {title:'Traffics',value:2},
                    {title:'Sent',value:3},
                    {title:'Opens',value:4},
                    {title:'Clicks',value:5}
                ],
                echartTimeTypeArray:[
                    {"label":"Yesterday","value":0},
                    {"label":"Today","value":1},
                    {"label":"近7天","value":2},
                    {"label":"本月","value":3},
                    {"label":"本年","value":4},
                    {"label":"Custom","value":5},
                ],
            },
            chart: null,
            Xvalue:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            Yvalue:[10, 52, 200, 334, 390, 330, 220],
        }
    },
    components:{
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
        this.initChart();   
    },
    methods:{
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            this.chart.setOption({
                xAxis: {type: 'category',boundaryGap: false,data: this.Xvalue},
                grid:{top:"50px",left:"50px",right:"15px",bottom:"50px"},
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
                var _star;
                var _end;
                if(this.echartData.echartTimeType == 0){
                    // 昨天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.echartData.echartTimeType == 1){
                    // 今天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.echartData.echartTimeType == 2){
                    // 近七天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-6*1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.echartData.echartTimeType ==3){
                    // 本月
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.echartData.echartTimeType ==4){
                    //本年度
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }
                this.echartData.echartTimeValue = [_star,_end]
            }

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
.dashboard .dataBoxSon{width: calc(25% - 100px);
background-color: #F2F2F2;
    padding: 20px 0;
    border: 1px solid #ccc;
    display: inline-block;
    margin-left: 80px;
    box-shadow: 4px 4px 6px #ccc;
    margin-bottom: 16px;    text-align: center;}

.dashboard .dataBoxSon .title{
    margin-bottom: 20px;
}
.dashboard .dataBoxSon .content{
    font-weight: 400;
    font-style: normal;
    font-size: 28px;
    text-align: center;
}
.dashboard .fromClass{
    position: relative;
    bottom: -25px;
    width: calc(90% - 50px);
    margin-left: 50px;
}

</style>