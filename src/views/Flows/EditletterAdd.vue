<template>
    <div class="EditletterAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a href="/Browse_Abandonment"><span class="el-icon-right"> </span> Browse Abandonment</a></li>
            <li><a><span class="el-icon-right"> </span>Edit</a></li>
        </ul>
        <div class="bigBox">
            <div class="leftBox">
                <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass" :rules="rules">
                    <h4>Edit Template</h4>
                    <div class="fromBox">
                        <div class="fromSon"> 
                            <label>Email Subject</label>
                            <div class="content">
                                <el-form-item prop="SubjectText" class="W100">
                                    <el-input v-model="fromData.SubjectText" class="W100" maxlength="120" placeholder="Length of 5 to 120 characters"></el-input>
                                </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="发送邮件的主题，即用户收到邮件的标题" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-form-item prop="HeadingText" class="W100">
                                    <el-input v-model="fromData.HeadingText" class="W100" maxlength="120" placeholder="Length of 5 to 120 characters"></el-input>
                                </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="默认位于banner背景的左上角，可自行调节" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Logo</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"
                                    :show-file-list="false"
                                    :on-success="logoSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="fromData.logoUrl && fromData.bannerUrl != -1" :src="fromData.logoUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"
                                    :show-file-list="false"
                                    :on-success="bannerSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="fromData.bannerUrl && fromData.bannerUrl != -1" :src="fromData.bannerUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Headline</label>
                            <div class="content">
                                <el-form-item prop="Headline" class="W100">
                                    <el-input v-model="fromData.Headline" maxlength="120" placeholder="Length of 5 to 120 characters"></el-input>
                                </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="位于HeadingText之下，可自行调节" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
                            </div>
                        </div>
                        <div class="fromSon"> 
                            <label>Body Text</label>
                            <div class="content">
                                <el-form-item prop="bodyText" class="W100">
                                    <el-input type="textarea" v-model="fromData.bodyText" placeholder="It seems like you didn't find what you were looking for during your last visit to {店铺名}.Do you need another look?"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Custom Product Recommendations</label>
                            <div class="content">
                                <el-select v-model="fromData.searchImgType" class="W100" @change="searchImgType">
                                    <el-option v-for="(item,index) in searchImgTypeArray" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="fromSon checkAll"  @click="checkAllFn">
                        <div class="stateBox">
                            <span  v-if="checkAllState" class="el-icon-check"></span>
                        </div>
                        全选,共计 {{checkNum}} 条
                        </div>
                        <div class="fromSon imgBigBox" v-if="productArray.length>0">
                            <div v-for="(item,index) in productArray" :key="index" class="imgBox" @click="imgClick(item)">
                                <!-- <a :href="item.url" target="_blank">
                                    <img :src="item.image_url" />
                                </a>  -->
                                <img :src="item.image_url" />
                                <div class="stateBox">
                                    <span v-if="item.state" class="el-icon-check"></span>
                                </div>
                            </div>
                        </div>
                        <span class="littleMsg" v-if="productArray.length>0">Max 6 products</span>
                    </div>
                    <div>
                        <el-button type="info" style="margin:20px 20px 20px 0;" plain @click="goBack">Cancel</el-button>
                        <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                    </div>
                </el-form>        
            </div>
            <div class="rightBox">
                <h4>Preview</h4>
                <!-- <el-button type="primary" class="sendMail" @click="sendMail('fromRef')" >Send Test Mail</el-button> -->
                <div ref="showBox">
                    <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;background-color: rgba(248,248,248,1);width:650px;">
                        <div style="margin: 0px auto;width: 100%;border-bottom: 1px solid #ccc;padding-bottom: 20px;">
                            <div style="margin:0 auto;width:30%;">
                                <h2>Subject Line</h2>
                                <div v-if="fromData.SubjectText">{{fromData.SubjectText}}</div>
                                <div v-else>We just picked up some new items for you</div>
                            </div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div style="margin:0 auto;width:70%;line-height:20px;padding: 20px 0;">
                                <div v-if="fromData.HeadingText" style="padding: 10px 0;">{{fromData.HeadingText}}</div>
                                <div v-else style="padding: 10px 0;">Styles you love - selling fast!</div>
                                <div style="padding: 10px 0;">If you are having trouble viewing this email, please <a :href="'http://'+Shop.domain + '?utm_source=smartsend'" target="_blank">click here</a> .</div>
                            </div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div v-if="fromData.logoUrl && fromData.logoUrl != -1" style="width: 30%;margin: 0 auto;">
                                <img :src="fromData.logoUrl" style="width: 100%;max-width:150px;"/>
                            </div>
                            <div v-else-if="fromData.logoUrl == -1" style="width: 30%;margin: 0 auto;">
                            </div>
                            <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div v-if="fromData.bannerUrl && fromData.bannerUrl != -1" style="width: 100%;">
                                <img :src="fromData.bannerUrl" style="width: 100%;"/>
                            </div>
                            <div v-else-if="fromData.bannerUrl == -1" style="width: 30%;margin: 0 auto;">
                            </div>
                            <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;">YOUR BANNER</div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div style="font-size: 28px;font-weight: 700;" v-if="fromData.Headline">{{fromData.Headline}}</div>
                            <div style="font-size: 28px;font-weight: 700;" v-else>STILL SEARCHING FOR WHAT YOU NEED?</div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-if="fromData.bodyText">{{fromData.bodyText}}</div>
                            <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-else>It seems like you didn't find what you were looking for during your last visit to {shop name}.Do you need another look?</div>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;">
                            <template v-if="fromData.searchImgType == 'Shopping cart goods' || fromData.searchImgType == 'Personal Product Recommendation' || fromData.searchImgType == 'Relevant product recommendation' || fromData.searchImgType == 'no product'">
                                <!-- <span style="display: none;">specialProduct</span> -->
                                *[tr_specialProduct]*
                                <!-- <template v-for='(item,index) in 6'>
                                    <div style="width:calc(50% - 24px);margin:10px;vertical-align: top;border:1px solid #ccc;display:inline-block;display: none;">
                                        <a :href="'%product_url_'+(index + 1)+'%'">
                                            <img :src="'%product_image_url_'+(index + 1)+'%'" style="width:100%;"/>
                                        </a>
                                        <h3 style="font-weight:700;">{{'%product_name_'+(index + 1)+'%'}}</h3>
                                        <h3>{{'%product_price_'+(index + 1)+'%'}}</h3> 
                                    </div>
                                </template> -->
                            </template>
                            <template v-else>
                                <template v-for="(item,index) in productArray" >
                                    <div :key="index" v-if="item.state" style="width:calc(50% - 24px);margin:10px;display:inline-block;vertical-align: top;border:1px solid #ccc;">
                                        <a :href="item.url">
                                            <img :src="item.image_url" style="width:100%;"/>
                                        </a>
                                        <h3 style="font-weight:700;">{{item.name}}</h3>
                                        <h3>{{item.price}}</h3> 
                                    </div>
                                </template>
                            </template>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;" v-if="fromData.searchImgType == 'Shopping cart goods'" >
                            <a href="88888888" style="display: inline-block;padding: 20px;background: #000;color: #fff;font-size: 16px;font-weight: 900;border-radius: 10px;text-decoration:none;">Go to Shopping Cart</a>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;">
                            <a :href="'http://'+Shop.domain + '?utm_source=smartsend'" target="_blank">
                                <div style="display: inline-block;padding: 20px;background: #000;color: #fff;font-size: 16px;font-weight: 900;border-radius: 10px;">Back to Shop >>></div>
                            </a>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;">
                            <div>{{Shop.email}}</div>
                        </div> 
                        <div style="width:100%;padding-bottom: 20px;">
                            <div>{{new Date().getFullYear()}} {{Shop.name}}. All rights reserved.</div>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;">
                            <div>{{Shop.domain}}</div>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;">
                            <a href="*[link_unsubscribe]*">
                                <div style="display: inline-block;padding: 10px;color: #ccc;font-size: 14px;border-radius: 10px;border: 1px solid #ccc;">Unsubscribe</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DialogFound :dialog='dialog' :fromData="fromData"></DialogFound>
    </div>
</template>

<script>
import DialogFound from "./Send_mail";
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "EditletterAdd",
    data() {
        return {
            checkAllState:false,
      checkNum: 0,
            id:-1,
            dialog: {
                show: false,
                title: "Send Mail",
                option: "edit"
            },
            loadingState:{},
            headerdata:{
                Authorization : localStorage.eleToken
            },
            Shop:{},
            fromData:{
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                bannerUrl:'',
                Headline:'',
                bodyText:'',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                periodTime:[new Date(2019, 9, 1, 0, 0),new Date(2019, 9, 2, 0, 0)],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
            },
            SendTimeTypeArray:[
                {value: '0',label: 'Monday'},
                {value: '1',label: 'Tuesday'},
                {value: '2',label: 'Wednesday'},
                {value: '3',label: 'Thursday'},
                {value: '4',label: 'Friday'},
                {value: '5',label: 'Saturday'},
                {value: '6',label: 'Sunday'},
                {value: '7',label: '1st day of the month'},
                {value: '8',label: '15th day of the month'},
                {value: '9',label: 'Last day of the month'},
            ],
            searchImgTypeArray:[
                {value: 'top_three',label: 'Top 6 products in last 3 days'},
                {value: 'top_seven',label: 'Top 6 products in last 7 days'},
                {value: 'top_fifteen',label: 'Top 6 products in last 15 days'},
                {value: 'top_thirty',label: 'Top 6 products in last 30 days'},
                {value: 'Shopping cart goods',label: 'Shopping cart goods'},
                {value: 'Personal Product Recommendation',label: 'Personal Product Recommendation'},
                {value: 'Relevant product recommendation',label: 'Relevant Product Recommendation'},
                {value: 'no product',label: 'No Product'},
            ],
            productArray:[],
            trueProductArray:[],
            top_product:{
                top_three:[],
                top_seven:[],
                top_fifteen:[],
                top_thirty:[],
            },
            rules: {
                SubjectText: [
                    { required: true, message: 'Please enter SubjectText', trigger: 'change' },
                    { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur" }
                ],
                HeadingText: [
                    { required: true, message: 'Please enter HeadingText', trigger: 'change' },
                    { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
                ],
                logoUrl: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                bannerUrl: [{ required: true, message: 'Please choose banner', trigger: 'change' }],
                Headline: [
                    { required: true, message: 'Please enter Headline', trigger: 'change' },
                    { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
                ],
                bodyText: [{ required: true, message: 'Please enter bodyText', trigger: 'change' },],
                periodTime: [{ required: true, message: 'Please choose Valid Period', trigger: 'change' }],
                SegmentValue: [{ required: true, message: 'Please Choose Segment' , trigger: 'blur'}],
                SendValue: [{ required: true, message: 'Please Choose Time' }],
            }
        }
    },
    components:{
        DialogFound,
    },
    watch: {
        productArray: {
            handler: function() { 
                this.trueProductArray = [];
                this.checkNum = 0;
                this.productArray.forEach(e => {
                if (e.state) {
                    this.trueProductArray.push(e);
                    this.checkNum = this.checkNum + 1;
                }
                });
            },
            deep: true
        },
    },
    mounted() {
        this.init();
    },
    methods:{
      checkAllFn(){
          if(this.checkAllState){
            this.checkAllState = false
            this.productArray.forEach(e => {
                e.state = false
            });
          }else{
            this.checkAllState = true
            this.productArray.forEach(e => {
            e.state = true
            });
          }
      this.$forceUpdate();
      },
      goBack(){
          this.$router.go(-1)
      },
        init(){
            this.$axios.get(`/api/v1/top_product/`)
            .then(res => {
                if(res.data.code == 1){
                    if(res.data.data.top_three){
                        this.top_product.top_three = JSON.parse(res.data.data.top_three);
                    }
                    if(res.data.data.top_seven){
                        this.top_product.top_seven = JSON.parse(res.data.data.top_seven);
                    }
                    if(res.data.data.top_fifteen){
                        this.top_product.top_fifteen = JSON.parse(res.data.data.top_fifteen);
                    }
                    if(res.data.data.top_thirty){
                        this.top_product.top_thirty = JSON.parse(res.data.data.top_thirty);
                    }
                    this.searchImgType();
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
            this.$axios.get(`/api/v1/store/`)
            .then(res => {
                if(res.data.code == 1){
                    this.Shop = res.data.data[0];
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
            if(!base.getQueryString("id")){
                this.id = -1;
            }else{
                this.id = base.getQueryString("id");
            }
            if(this.id != -1){
                this.$axios.get(`/api/v1/email_template/detail/${this.id}/`)
                .then(res => {
                    if(res.data.code == 1){
                        this.fromData.SubjectText = res.data.data.subject;
                        this.fromData.HeadingText = res.data.data.heading_text;
                        this.fromData.logoUrl = res.data.data.logo;
                        this.fromData.bannerUrl = res.data.data.banner;
                        this.fromData.Headline = res.data.data.headline;
                        this.fromData.bodyText = res.data.data.body_text;
                    }else{
                        this.$message("Acquisition failure!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
                });
            }
        },
        imgClick(item){
            item.state = !item.state;
            this.checkNum = 0;
            this.trueProductArray=[];
            this.productArray.forEach(e => {
            if (e.state) {
            this.trueProductArray.push(e);
                this.checkNum = this.checkNum + 1;
            }
            });
            
        if(this.checkNum === 0){
            this.checkAllState = false
        }else{
            this.checkAllState = true
        }
            this.$forceUpdate();
        },
        logoSuccess(response, file, fileList) {
        if(response.data.base64_str){
            this.fromData.logoUrl = response.data.base64_str;
        }
        },
        bannerSuccess(response, file, fileList) {
        if(response.data.base64_str){
            this.fromData.bannerUrl = response.data.base64_str;
        }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isJPG) {
                this.$message.error('JPG、png、gif');
            }
            if (!isLt2M) {
                this.$message.error('No more than 2MB!');
            }
            return isJPG && isLt2M;
        },
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.fromData.logoUrl){
                        this.fromData.logoUrl = -1;
                    }
                    if(!this.fromData.bannerUrl){
                        this.fromData.bannerUrl = -1;
                    }
                    // let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title></head><body><div style="width:1200px;margin:0 auto;">';
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title></head><body><div style="width:650px;margin:0 auto;">';
                        _showHtml += this.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                        
                    if(this.fromData.logoUrl == -1){
                        this.fromData.logoUrl = "";
                    }
                    if(this.fromData.bannerUrl == -1){
                        this.fromData.bannerUrl = "";
                    }
                        let _thisData = {
                            subject:this.fromData.SubjectText,
                            heading_text:this.fromData.HeadingText,
                            logo:this.fromData.logoUrl,
                            banner:this.fromData.bannerUrl,
                            headline:this.fromData.Headline,
                            body_text:this.fromData.bodyText,
                            product_condition:this.fromData.searchImgType,
                            // product_list:JSON.stringify(this.trueProductArray),
                            customer_group_list:JSON.stringify(this.fromData.SegmentValue),
                            send_rule:"{}",
                            html:_showHtml,
                        }
                        if(this.fromData.searchImgType != "Shopping cart goods"){
                            _thisData.product_list = JSON.stringify(this.trueProductArray);
                        }
                        this.$axios.post(`/api/v1/email_template/trigger/`, _thisData)
                            .then(res => {
                                if(res.data.code == 1){
                                    this.$message({message: "Successfully!",type: "success"});
                                    let _thisData = JSON.parse(localStorage["FlowsVal"]);
                                    let _email_delay =JSON.parse(_thisData.email_delay); 
                                    _email_delay[_thisData.index].SubjectText = res.data.data.subject;
                                    _email_delay[_thisData.index].value = res.data.data.id;
                                    _thisData.email_delay = JSON.stringify(_email_delay);
                                    localStorage.setItem("FlowsVal",JSON.stringify(_thisData));
                                    router.push('/Browse_Abandonment');
                                }else{
                                    this.$message(res.data.msg);
                                }
                            })
                            .catch(error => {
                                this.$message("Interface timeout!");
                            }); 
                    }else{
                        let topNum = document.getElementsByClassName("rightContainer")[0].scrollTop;
                        var time = setInterval(function(){
                            if(topNum <= 0){
                                clearInterval(time)
                            }else{
                                document.getElementsByClassName("rightContainer")[0].scrollTop = topNum;
                            }
                            topNum = topNum-200;
                        },20);
                    }
            });
        },
        sendMail(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialog.show = true;
                }else{
                    this.$message.error('Incomplete information!');
                }
            });
        },
        searchImgType(){
            if(this.fromData.searchImgType == "Shopping cart goods" || this.fromData.searchImgType == "no product" || this.fromData.searchImgType == "Personal Product Recommendation" || this.fromData.searchImgType == "Relevant product recommendation"  ){
                this.productArray = [];
            }else{
                this.productArray = this.top_product[this.fromData.searchImgType];
                this.productArray.map(e =>{
                    e.state = true;
                });
            }
            this.productArray = this.productArray;
        }
    },
    beforeDestroy() {
    }
}
</script>

<style>
.EditletterAdd .leftBox{display:inline-block;width:40%;}
.EditletterAdd .fromBox{min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;}
.EditletterAdd .rightBox{position: relative;width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.EditletterAdd .rightBox .sendMail{position: absolute;right: 0px;top: 15px;}
.EditletterAdd .showBox{min-height:500px;border:1px solid #ccc;}
.EditletterAdd .fromSon{color:#606266;margin-bottom:20px;}
.EditletterAdd .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.EditletterAdd .fromSon .content{position:relative;}
.EditletterAdd .littleMsg{font-size:14px;color:#999;}
.EditletterAdd .bigBox{margin-bottom:40px;}
.EditletterAdd textarea{height:150px;}
.EditletterAdd .imgBigBox{padding:10px;overflow:hidden;border:1px solid #ccc;margin-top:10px;padding-right:0;cursor:pointer;}
.EditletterAdd .imgBox{width:calc(33.33333% - 10px);display:inline-block;margin-right:10px;position:relative;}
.EditletterAdd .imgBox img{width:100%;}
.EditletterAdd .checkAll {
  height: 40px;
  position: relative;
  padding-left: 50px;
  line-height: 40px;
}
.EditletterAdd .checkAll .stateBox {
  position: absolute;
  left: 15px;
  top: 5px;
  border: 1px solid #000;
  border-radius: 4px;
  width: 24px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
}
.EditletterAdd .checkAll .stateBox .el-icon-check {
  font-weight: 900;
  font-size: 32px;
  position: absolute;
  top: -5px;
  color: #000;
}


.EditletterAdd .imgBox .stateBox{position:absolute;left:5px;top:5px;border:1px solid #000;border-radius:4px;width:24px;height:25px;background:rgba(255,255,255,0.2);}
.EditletterAdd .imgBox .stateBox .el-icon-check{font-weight:900;font-size:32px;position:absolute;top:-5px;color: #000;}
.EditletterAdd .el-checkbox{width:40%;}
.EditletterAdd .SendTimeType{margin:0 20px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
.EditletterAdd .el-form--inline .el-form-item__content{width:100%;}
</style>