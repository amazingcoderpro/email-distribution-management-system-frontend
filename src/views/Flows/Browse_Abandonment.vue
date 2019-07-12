<template>
    <div class="Browse">
         <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
             <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a><span class="el-icon-right"> </span> Browse Abandonment</a></li>
        </ul>
        <!-- Trigger -->
        <div class="Browse_table">
            <div class="Enable_button">
                <el-button type="primary">Enable Flow</el-button>
            </div>
            <div class="table_right">
                <div class="trigger_top">
                    <div class="trigger_left">
                            <i class="iconfont icon-star"></i>
                            <span>Trigger</span>
                    </div>
                    <div class="trigger_right">
                        <div class="trigger_Eye">
                            <i class="iconfont icon-yanjing"></i>
                            <span>Preview</span>
                        </div>
                        <div class="trigger_Edit">
                            <i class="iconfont icon-edit"></i>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="trigger_center">
                        <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                        <i class="iconfont icon-chahao"></i>
                    </div>
                    <div class="trigger_center trigger_centertwo">
                        <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                        <i class="iconfont icon-chahao"></i>
                    </div>
                    <div class="trigger_center trigger_centertwo">
                        <el-input v-model="input" placeholder="请输入内容" class="trigger_input_one"></el-input>
                        <i class="iconfont icon-chahao"></i>
                    </div>
                </div>
                <div class="rigger_bottom">
                    <span>Note:</span><br/>
                    <span>1> &nbsp;Do not send if the customer if your customer makes a purchase.</span><br/>
                    <span>2> &nbsp;Do not send if the customer received an email from this campaign in the last 7 days.</span>
                </div>
            </div>
        </div>
        <!-- 公用 -->
        <div class="Broese_public">
            <img src="../../assets/img/u448.png" class="Broese_img">
            <i class="iconfont icon-jiahao1" @click="getCity"></i>
        </div>
        <div class="delay_email" v-if="detailShow">
            <div class="delay_left">
                <span>DELAY</span>
            </div> 
            <div class="delay_right">
                <span>EMAIL</span>
            </div> 
        </div>
        <div class="Browse_table">
            <div class="table_right Browse_email">
                <div class="trigger_top">
                    <div class="trigger_left">
                            <i class="iconfont icon-youjian"></i>
                            <span>Email</span>
                    </div>
                    <div class="trigger_right">
                        <div class="trigger_Eye">
                            <i class="iconfont icon-yanjing"></i>
                            <span>Preview</span>
                        </div>
                        <div class="trigger_Edit">
                            <i class="iconfont icon-edit"></i>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
                <div class="rigger_center">
                    <span class="Subject">Subject Line</span><br/>
                    <span>Are you still interested?</span>
                </div>
            </div>
        </div>
        <!-- 公用 -->
        <div class="Broese_public">
            <img src="../../assets/img/u448.png" class="Broese_img">
            <i class="iconfont icon-jiahao1"></i>
        </div>
        <!-- Delay -->
        <div class="Browse_table">
            <div class="table_right Browse_email">
                <div class="trigger_top">
                    <div class="trigger_left">
                            <i class="iconfont icon-shizhong"></i>
                            <span>Delay</span>
                    </div>
                    <div class="trigger_right">
                        <div class="trigger_Eye">
                            <i class="iconfont icon-yanjing"></i>
                            <span>Preview</span>
                        </div>
                        <div class="trigger_Edit">
                            <i class="iconfont icon-edit"></i>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
                <div class="rigger_center">
                    <span>Wait 7 day(s)</span>
                </div>
            </div>
        </div>
        <!-- 公用 -->
        <div class="Broese_public">
            <img src="../../assets/img/u448.png" class="Broese_img">
            <i class="iconfont icon-jiahao1"></i>
        </div>
        <!-- email -->
        <div class="Browse_table">
            <div class="table_right Browse_email">
                <div class="trigger_top">
                    <div class="trigger_left">
                            <i class="iconfont icon-youjian"></i>
                            <span>Email</span>
                    </div>
                    <div class="trigger_right">
                        <div class="trigger_Eye">
                            <i class="iconfont icon-yanjing"></i>
                            <span>Preview</span>
                        </div>
                        <div class="trigger_Edit">
                            <i class="iconfont icon-edit"></i>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
                <div class="rigger_center">
                    <span class="Subject">Subject Line</span><br/>
                    <span>Let me send you back to{ {shop.name} }</span>
                </div>
            </div>
        </div>
        <!-- 公用 -->
        <div class="Broese_public">
            <img src="../../assets/img/u448.png" class="Broese_img">
            <i class="iconfont icon-jiahao1"></i>
        </div>
        <!-- EXIT -->
        <div class="exit">
            <div class="exit_input">
                <p>EXIT</p>
            </div>
            <div class="Enable_button Enable_buttom">
                <el-button type="primary">Enable Flow</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            headStatus:false,
            input:'',
            detailShow: false,        //默认值
        }
    },
     methods:{
         getCity:function(){
             this.detailShow = !this.detailShow;
         }
    },
}
</script>

<style scoped>
.Browse .Browse_table{width: 65%;margin: 0 auto;}
.Browse .Enable_button{margin:30px 0 30px;margin-left: 943px;}
.Browse .Browse_table .table_right{height: 360px;border: 1px solid rgba(121, 121, 121, 1);}
.Browse .Browse_table .table_right .trigger_top{height: 50px;background-color: rgba(228, 228, 228, 1);border-bottom: 1px solid rgba(121, 121, 121, 1);}
.Browse .Browse_table .table_right .trigger_top .trigger_left{width: 150px;height:50px;float: left;display: inline-flex;}
.Browse .Browse_table .table_right .trigger_top .trigger_left .icon-star{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .Browse_table .table_right .trigger_top .trigger_left span{font-size: 13px;font-weight: 600;padding-left: 35px;line-height: 50px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right{float: right;width: 140px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Eye{display: inline-block;text-align: center;padding-top: 5px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .icon-yanjing{font-size: 20px;color: #6d6666;}
.Browse .Browse_table .table_right .trigger_top .trigger_right span{font-size: 14px;color: #333333;}
.Browse .Browse_table .table_right .trigger_top .trigger_right  span{display: block;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit{float: right;padding-right: 30px;text-align: center;padding-top: 6px;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit .icon-edit{font-size: 16px;color: #6d6666;}
.Browse .Browse_table .table_right .trigger_top .trigger_right .trigger_Edit span{font-size: 14px;color: #333333;}
.Browse .trigger_center .trigger_input_one{width: 45%;margin-left: 28%;margin-top: 40px;position: relative;}
.Browse .trigger_center .icon-chahao{position: absolute;margin-top: 53px;margin-left: -23px;color: #908f8f;font-size: 14px;font-weight: 600;}
.Browse .trigger_centertwo{margin-top: -20px;}
.Browse .rigger_bottom{width: 52%;margin: 0 auto;margin-top: 25px;}
.Browse .rigger_bottom span{font-size: 14px;color: #333333;font-family: 'Arial Cursiva', 'Arial Normal', 'Arial';font-style: italic;}
.Browse .Broese_public{width: 65%;margin: 0 auto;text-align: center;}
.Browse .Broese_img{position: relative;}
.Browse .icon-jiahao1{position: absolute;font-size: 25px;margin-left: -27px;margin-top: 25px;background-color: white;color: red;cursor: pointer;}
.Browse .Browse_email{height: 150px!important;}
.Browse .icon-youjian{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .rigger_center{width: 52%;margin: 0 auto;margin-top: 25px;text-align: center;}
.Browse .rigger_center .Subject{font-weight: 600;font-size: 13px;color: #333333;line-height: normal;}
.Browse .rigger_center span{font-size: 13px;color: #333333;line-height: 40px;}
.Browse .icon-shizhong{font-size: 30px;color: #6d6666;padding-left: 15px;margin-top: 7px;}
.Browse .exit{width: 65%;margin: 0 auto;}
.Browse .exit .exit_input{width: 40%;margin: 0 auto;height: 45px;text-align: center;background-color: rgba(228, 228, 228, 1);border:1px solid rgba(121, 121, 121, 1);}
.Browse .exit .exit_input p{font-size: 13px;font-weight: 600;line-height: 20px;}
.Browse .exit .Enable_buttom{margin-top: 50px!important;}
.Browse .delay_email{width: 30%;height:150px;margin: 0 auto;border:1px solid rgba(121, 121, 121, 1);margin-bottom: 10px;}
.Browse .delay_left{display: inline-block;background-color: rgba(51, 153, 153, 1);padding: 35px;color: #fff;margin: 33px 20px 0 90px;cursor: pointer;}
.Browse .delay_right{display: inline-block;background-color: rgba(51, 153, 153, 1);padding: 35px;margin-left: 50px;color: #fff;cursor: pointer;}
</style>

