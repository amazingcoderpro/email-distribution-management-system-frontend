<template>
    <div class="NewsletterAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li><a href="/Browse_Abandonment"><span class="el-icon-right"> </span> Browse Abandonment</a></li>
            <li><a><span class="el-icon-right"> </span>Edit</a></li>
        </ul>
        <div class="bigBox">
            <div class="leftBox">
                <h4>Edit</h4>
                <div class="fromBox">
                    <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass">
                        <div class="fromSon">
                            <label>Email Subject</label>
                            <div class="content">
                                <el-input v-model="fromData.SubjectText" placeholder="We just picked up some new items for you"></el-input>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-input v-model="fromData.HeadingText" placeholder="Styles you love - selling fast!"></el-input>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Logo</label>
                            <div class="content">
                                    <el-form-item prop="logoUrl" class="W100">
                                        <el-upload
                                        class="avatar-uploader"
                                        action="/api/v1/upload_picture/"
                                        :auto-upload="true"
                                        :headers="headerdata"
                                        :show-file-list="false"
                                        :on-success="logoSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="fromData.logoUrl" :src="'data:image/jpeg;base64,'+fromData.logoUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>
                                    <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
                                </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <el-form-item prop="logoUrl" class="W100">
                                    <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"
                                    :show-file-list="false"
                                    :on-success="bannerSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="fromData.bannerUrl" :src="'data:image/jpeg;base64,'+ fromData.bannerUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Headline</label>
                            <div class="content">
                                <el-input v-model="fromData.Headline" placeholder="STILL SEARCHING FOR WHAT YOU NEED?"></el-input>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Body Text</label>
                            <div class="content">
                                <el-input type="textarea" v-model="fromData.bodyText" placeholder="It seems like you didn't find what you were looking for during your last visit to {店铺名}.Do you need another look?"></el-input>
                            </div>
                        </div>
                        <!-- <div class="fromSon">
                            <label>Custom Product Recommendations</label>
                            <div class="content">
                                <el-input type="textarea" v-model="fromData.Proposal" placeholder="481148,143687"></el-input>
                            </div>
                        </div> -->
                        <div class="fromSon">
                            <label>Custom Product Recommendations</label>
                            <div class="content">
                                <el-select v-model="fromData.searchImgType" class="W100" @change="searchImgType">
                                    <el-option v-for="(item,index) in searchImgTypeArray" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <!-- <div class="fromSon imgBigBox">
                            <div v-for="(item,index) in productArray" :key="index" class="imgBox" @click="imgClick(item)">
                                <img :src="item.image_url" />
                                <div class="stateBox">
                                    <span v-if="item.state" class="el-icon-check"></span>
                                </div>
                            </div>
                        </div>
                        <span class="littleMsg">Max 6 products</span> -->
                    </el-form>   
                    <div>
                        <el-button type="info" style="margin:20px 20px 20px 0;" plain>Cancel</el-button>
                        <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                    </div>     
                </div>
               
            </div>
            <div class="rightBox">
                <span style="font-weight:600;line-height:63px;">Preview</span>
                <el-button type="primary" style="float:right;" @click="SendFun">Send Test Mail</el-button>
                <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;">
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
                            <div style="padding: 10px 0;">If you are having trouble viewing this email, please click here.</div>
                        </div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div v-if="fromData.logoUrl" style="width: 30%;margin: 0 auto;">
                            <img :src="'data:image/jpeg;base64,'+fromData.logoUrl" style="width: 100%;"/>
                        </div>
                        <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div v-if="fromData.bannerUrl" style="width: 100%;">
                            <img :src="'data:image/jpeg;base64,'+ fromData.bannerUrl" style="width: 100%;"/>
                        </div>
                        <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;">YOUR BANNER</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div style="font-size: 28px;font-weight: 700;" v-if="fromData.Headline">{{fromData.Headline}}</div>
                        <div style="font-size: 28px;font-weight: 700;" v-else>STILL SEARCHING FOR WHAT YOU NEED?</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-if="fromData.bodyText">{{fromData.bodyText}}</div>
                        <div style="font-family: 'Segoe UI Emoji';font-weight: 400;font-style: normal;font-size:16px;" v-else>It seems like you didn't find what you were looking for during your last visit to {店铺名}.Do you need another look?</div>
                    </div>
                    <div style="width: calc(100% - 24px);padding: 20px 12px;">
                        <template v-for="(item,index) in imgArray" >
                            <div :key="index" v-if="item.state" style="width:calc(50% - 24px);margin:10px;height:100px;display:inline-block;border:1px solid #ccc;">
                                <img :src="item.image_url" style="width:100%;"/>
                                <h3 style="font-weight:700;">{{item.name}}</h3>
                                <h3>{{item.price}}</h3>
                            </div>
                        </template>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="display: inline-block;padding: 20px;background: #000;color: #fff;font-size: 16px;font-weight: 900;border-radius: 10px;">Back to Shop >>></div>
                    </div> 
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{shop_email}</div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{year} {shop_name}. All rights reserved.</div>
                    </div>
                    <div style="width:100%;padding-bottom: 20px;">
                        <div style="">{shop_address}</div>
                    </div>
                     <el-button type="primary" style="margin:20px 20px 20px 0;background-color:white;border-color: rgba(121, 121, 121, 1);color:#3333;color:#333;">Unsubscribe</el-button>
                </div>
            </div>
        </div>
        <DialogFound :dialog='dialog'></DialogFound>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import DialogFound from "./Send_mail";
export default {
    name: "NewsletterAdd",
    data() {
        return {
            headerdata:{
                Authorization : localStorage.eleToken
            },
            fromData:{
                SubjectText:'',
                HeadingText:'',
                Headline:'',
                bodyText:'',
                Proposal:'',
                logoUrl: '',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                periodTime:[],
                bannerUrl:'',
            },
            // productArray:[],
            trueProductArray:[],
            imgArray:[],
            searchImgTypeArray:[
                {value: 'top_three',label: 'Top 6 products in last 3 days'},
                {value: 'top_seven',label: 'Top 6 products in last 7 days'},
                {value: 'top_fifteen',label: 'Top 6 products in last 15 days'},
                {value: 'top_thirty',label: 'Top 6 products in last 30 days'},
            ],
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
        }
    },
    watch: {
        productArray: {
            handler: function() {
                this.trueProductArray = [];
                this.productArray.map(e =>{
                    if(e.state){
                        this.trueProductArray.push(e);
                    }
                });
               console.log(this.trueProductArray)
            },
            deep: true
        }
    },
    components:{
        DialogFound,
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["FlowsVal"])
            this.fromData = _thisData;
            this.$axios.get(`/api/v1/customer_group/`)
            .then(res => {
                if(res.data.code == 1){
                    this.SegmentArray = res.data.data;
                    this.SegmentValueChange();
                }else{
                this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
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
        },
        imgClick(item){
            console.log(item)
            item.state = !item.state;
            console.log(item.state)
        },
        SegmentStateChange(){
            if(this.fromData.SegmentState.length>0){
                let _arr = [];
                this.SegmentArray.map(e =>{
                    _arr.push(e.id);
                });
                this.fromData.SegmentValue = _arr;
            }else{ this.Segme
                this.fromData.SegmentValue = [];
            }
        },
        SegmentValueChange(){
            if(this.fromData.SegmentValue.length == this.SegmentArray.length){
            this.fromData.SegmentState = ["Select All"];
            }else{
                if(this.fromData.SegmentState.length>0){
                this.fromData.SegmentState = [];
                }
            }
            console.log(this.fromData.SegmentValue)
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
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        let _thisData = {
                            subject:this.fromData.SubjectText,
                            heading_text:this.fromData.HeadingText,
                            logo:this.fromData.logoUrl,
                            banner:this.fromData.bannerUrl,
                            headline:this.fromData.Headline,
                            body_text:this.fromData.bodyText,
                            product_list:JSON.stringify(this.trueProductArray),
                            customer_group_list:JSON.stringify(this.fromData.SegmentValue),
                            send_rule:JSON.stringify({
                                begin_time:this.fromData.periodTime[0],
                                end_time:this.fromData.periodTime[1],
                            })
                        }
                        this.$axios.post(`/api/v1/email_template/`, _thisData)
                            .then(res => {
                                if(res.data.code == 1){
                                    this.$message({message: "Successfully!",type: "success"});
                                    // router.push('/EditletterAdd');
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
                        },20)
                    }
            });
        },
        SendFun(){
                this.dialog = {
                show: true,
                title: "Test mail",
                option: "post"
                };
        },
        searchImgType(){
            this.productArray = this.top_product[this.fromData.searchImgType];
            this.productArray.map(e =>{
                e.state = true;
            });
            this.productArray = this.productArray;
        }
    },
    beforeDestroy() {
    }
}
</script>

<style>
.NewsletterAdd .leftBox{display:inline-block;width:40%;}
.NewsletterAdd .fromBox{min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;background-color: rgba(242, 242, 242, 1);}
.NewsletterAdd .rightBox{width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.NewsletterAdd .showBox{min-height:500px;border:1px solid #ccc;}
.NewsletterAdd .fromSon{color:#606266;margin-bottom:20px;}
.NewsletterAdd .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.NewsletterAdd .fromSon .content{position:relative;}
.NewsletterAdd .littleMsg{font-size:14px;color:#999;}
.NewsletterAdd .bigBox{margin-bottom:40px;}
.NewsletterAdd textarea{height:150px;}
.NewsletterAdd .imgBigBox{padding:10px;overflow:hidden;border:1px solid #ccc;margin-top:10px;padding-right:0;cursor:pointer;}
.NewsletterAdd .imgBox{width:calc(33.33333% - 10px);display:inline-block;margin-right:10px;position:relative;}
.NewsletterAdd .imgBox img{width:100%;}
.NewsletterAdd .imgBox .stateBox{position:absolute;left:5px;top:5px;border:1px solid #000;border-radius:4px;width:24px;height:25px;background:rgba(255,255,255,0.2);}
.NewsletterAdd .imgBox .stateBox .el-icon-check{font-weight:900;font-size:32px;position:absolute;top:-5px;color: #000;}
.NewsletterAdd .el-checkbox{width:40%;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
</style>