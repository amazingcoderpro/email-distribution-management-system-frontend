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
                    <el-form :inline="true" :model="fromData" class="demo-form-inline fromClass">
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
                                <el-upload
                                class="avatar-uploader"
                                action="/xxxxxxxx"
                                :auto-upload="false"    
                                :show-file-list="false"
                                :on-change="onLogoChange">
                                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <el-upload
                                class="avatar-uploader"
                                action="/xxxxxxxx"
                                :auto-upload="false"
                                :show-file-list="false"
                                :on-change="onBannerChange">
                                <img v-if="bannerUrl" :src="bannerUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
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
                        <div class="fromSon">
                            <label>Custom Product Recommendations</label>
                            <div class="content">
                                <el-input type="textarea" v-model="fromData.Proposal" placeholder="481148,143687"></el-input>
                            </div>
                        </div>
                    </el-form>   
                    <div>
                        <el-button type="info" style="margin:20px 20px 20px 0;" plain>Cancel</el-button>
                        <el-button type="primary" style="margin:20px 20px 20px 0;background-color: rgba(51, 153, 153, 1);border:1px solid rgba(51, 153, 153, 1)">Save</el-button>
                    </div>     
                </div>
               
            </div>
            <div class="rightBox">
                <span style="font-weight:600;line-height:63px;">Preview</span>
                <el-button type="primary" style="float:right;background-color: rgba(51, 153, 153, 1);border:1px solid rgba(51, 153, 153, 1)" @click="SendFun">Send Test Mail</el-button>
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
                        <div v-if="logoUrl" style="width: 30%;margin: 0 auto;">
                            <img :src="logoUrl" style="width: 100%;"/>
                        </div>
                        <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                    </div>
                    <div style="width: 100%;padding-bottom: 20px;">
                        <div v-if="bannerUrl" style="width: 100%;">
                            <img :src="bannerUrl" style="width: 100%;"/>
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
                                <img :src="item.url" style="width:100%;"/>
                                <h3 style="font-weight:700;">{{item.title}}</h3>
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
                    <!-- <div style="width:100%;padding-bottom: 20px;">
                        <div style="display: inline-block;padding: 10px;color: #ccc;font-size: 14px;border-radius: 10px;border: 1px solid #ccc;">Unsubscribe</div>
                    </div> -->
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
            loadingState:{},
            logoUrl: '',
            bannerUrl:'',
            fromData:{
                SubjectText:'',
                HeadingText:'',
                Headline:'',
                bodyText:'',
                Proposal:'',
                SegmentValue:[],
                SegmentState:[],
                periodTime:[],
                SendTimeType:'0',
                SendValue:new Date(2016, 9, 10, 18, 40),
            },
            imgArray:[
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"},
                {"state":true,"url":"http://sysadmin.koudl.com//UPloadFiles/AppHomeImage/829287888f6149d8b52135c66fc5eb6cpic.jpg?t=20190704104027756","title":"God T-xunste","price":"12.32"}
            ],
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
        }
    },
    watch: {
        // 'fromData.SegmentState': {
        //     handler: function() {
        //     },
        // }
    },
    components:{
        DialogFound,
    },
    mounted() {
    },
    methods:{
      onLogoChange(file,fileList) {
        let state = this.beforeAvatarUpload(file);
        if(state){
            this.logoUrl = URL.createObjectURL(file.raw);
        }
      },
      onBannerChange(file,fileList) {
        let state = this.beforeAvatarUpload(file);
        if(state){
            this.bannerUrl = URL.createObjectURL(file.raw);
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;
        console.log(file)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      imgClick(item){
          item.state = !item.state;
      },
      SendFun(){
            this.dialog = {
            show: true,
            title: "Test mail",
            option: "post"
            };
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
.NewsletterAdd .SendTimeType{margin:0 20px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
</style>