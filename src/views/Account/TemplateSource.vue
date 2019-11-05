<template>
    <div class="NewsletterAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/TemplateLibrary"><span class="el-icon-house"> </span>Template Library</a></li>
            <li><a><span class="el-icon-right"> </span>Add Template</a></li>
        </ul>
        <div class="bigBox">
            <div class="leftBox" >
                <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass">
                    <h4>Edit Template</h4>
                    <div class="fromBox">
                        <el-form-item style="font-weight: 600;">
                            <label>Title</label>
                            <el-input v-model="fromData.title" placeholder="Enter Flow Name"></el-input>
                        </el-form-item>
                        <el-form-item style="font-weight: 600;">
                            <label>Description</label>
                            <el-input v-model="fromData.description" placeholder="Enter Description"></el-input>
                        </el-form-item>
                        <el-form-item style="font-weight: 600;">
                            <label>Banner Url</label>
                            <el-input v-model="fromData.url_template" placeholder="Enter Banner Url"></el-input>
                        </el-form-item>
                        <el-form-item style="font-weight: 600;">
                            <label>Email Subject</label>
                            <el-input v-model="fromData.subject" placeholder="Enter Subject"></el-input>
                        </el-form-item>
                    </div>
                    <div class="TemplateClassic">
                        <div>
                            <el-button type="info" style="margin:20px 20px 20px 0;" plain>Cancel</el-button>
                            <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                        </div>
                    </div>
                </el-form>        
            </div>
            <!-- rightBox -->
            <div class="rightBox">
                <h4>Preview</h4>
                <div ref="showBox">
                    <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;width: 100%;margin: 0 auto;">
                        <div>
                            <iframe class="Template_iframe" :src="fromData.url_template"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "NewsletterAdd",
    data() {
        return {
            emsp:"&emsp;",
            fromData:{
                title:'',
                description:'',
                subject:'',
                url_template:'',
                id:''
            },
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["TemplateSourceVal"]);
            this.fromData = _thisData;
        },
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let
                        _showHtml = this.fromData.url_template;
                        let _thisData = {
                            title:this.fromData.title,
                            description:this.fromData.description,
                            subject:this.fromData.subject,
                            url_template:this.fromData.url_template,
                            id:this.fromData.id,
                            html:_showHtml,
                        }
                        console.log(this.fromData.id)
                        this.$axios.put(`/api/v3/center_template_edit/`, _thisData) 
                            .then(res => {
                                if(res.data.code == 1){
                                    this.$message({message: "Successfully!",type: "success"});
                                    router.push('/TemplateLibrary');
                                }else{
                                    this.$message(res.data.msg);
                                }
                            })
                            .catch(error => {
                                this.$message("Interface timeout!");
                            }); 
                    }
            });
        },
    },
}
</script>

<style>
.NewsletterAdd .leftBox{display:inline-block;width:40%;}
.NewsletterAdd .fromBox{position: relative; min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;margin-top: 20px;}
.NewsletterAdd .rightBox{position: relative;width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.NewsletterAdd .rightBox .sendMail{position: absolute;right: 0px;top: 15px;}
.NewsletterAdd .showBox{min-height:500px;border:1px solid #ccc;}
.NewsletterAdd .fromSon{color:#606266;margin-bottom:20px;}
.NewsletterAdd .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.NewsletterAdd .fromSon .content{position:relative;}
.NewsletterAdd .littleMsg{font-size:14px;color:#999;}
.NewsletterAdd .bodyText .littleMsg{color: #606266;}
.NewsletterAdd .bigBox{margin-bottom:40px;}
.NewsletterAdd textarea{height:150px;}
.NewsletterAdd .imgBigBox{padding:10px;overflow:hidden;border:1px solid #ccc;margin-top:10px;padding-right:0;cursor:pointer;}
.NewsletterAdd .imgBox{width:calc(33.33333% - 10px);display:inline-block;margin-right:10px;position:relative;}
.NewsletterAdd .imgBox img{width:100%;}
.NewsletterAdd .imgBox .stateBox{position:absolute;left:5px;top:5px;border:1px solid #000;border-radius:4px;width:24px;height:25px;background:rgba(255,255,255,0.2);}
.NewsletterAdd .imgBox .stateBox .el-icon-check{font-weight:900;font-size:32px;position:absolute;top:-5px;color: #000;}
.NewsletterAdd .el-checkbox{width: 100%;padding: 0!important;color: #333333!important;font-weight: normal!important;padding-left: 5px!important;}
.NewsletterAdd .SegmentValueBox{background: #F2F2F2;}
.NewsletterAdd .SendTimeType{margin:0 20px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
.NewsletterAdd .uploadClass{z-index: 100;}
.NewsletterAdd .uploadBtnBox{z-index: 200;position: absolute;width: 100%;height: 100%;top: 0;}
.NewsletterAdd .uploadBtnBox button{right: 90px;position: absolute;top: 60px;}
.NewsletterAdd .el-form--inline .el-form-item__content{width:100%;}
.NewsletterAdd .bannerTextBox{position: absolute;width: 88%;background: #fff;z-index: 500;border-radius: 10px;}
.NewsletterAdd .bannerTextBox .fromSon {width: 50%;}
.NewsletterAdd .bodyText .ql-container.ql-snow{height:200px;}
.NewsletterAdd .languageTextBox{position:fixed;width:32%;background:#fff;z-index:500;border-radius:10px;bottom:200px;left:266px;}
.NewsletterAdd .languageTextBox .fromSon{width: 50%;margin-bottom:0;}
.NewsletterAdd .languageTextBox .el-form-item{margin-bottom:0;}
.NewsletterAdd .languageTextBox .fromSon label{padding:0;}
.NewsletterAdd .bannerText p{margin:0!important;}
.NewsletterAdd .Template_iframe{width: 885px;height:880px;border: none;overflow-x: hidden;box-shadow: 4px 10px 10px #ccc;}
.NewsletterAdd .el-form--inline .el-form-item{display: block;}
</style>