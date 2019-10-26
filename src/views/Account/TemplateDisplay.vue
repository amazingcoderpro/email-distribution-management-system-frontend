<template>
    <div class="TemplateDisplay">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/FlowList"><span class="el-icon-right"> </span> Flows</a></li>
            <li v-if="title"><a href="/Browse_Abandonment"><span class="el-icon-right"> </span>{{title}}</a></li>
            <li><a href="/TemplateDisplay"><span class="el-icon-right"> </span>TemplateDisplay</a></li>
        </ul>
        <div class="bigBox">
            <div class="leftBox">
                <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass" :rules="rules">
                    <h4>Edit Template</h4>
                    <div class="fromBox">
                        <el-form-item style="width:290px;font-weight: 600;">
                            <label>Title</label>
                            <el-input v-model="fromData.title" placeholder="Enter Flow Name" style="width:280px;"></el-input>
                        </el-form-item>
                        <el-form-item style="width:290px;font-weight: 600;">
                            <label>Description</label>
                            <el-input v-model="fromData.description" placeholder="Enter Description" style="width:280px;"></el-input>
                        </el-form-item>
                        <div class="fromSon"> 
                            <el-button @click="bannerTextState = !bannerTextState"  type="primary">Adjust text position</el-button>
                            <el-button @click="languageDataState = !languageDataState"  type="primary">Change Language</el-button>
                        </div>
                        <div class="bannerTextBox" :style="bannerTextState?'border: 1px solid #ccc;padding: 20px;':''">
                            <el-collapse-transition >
                                <div v-show="bannerTextState" style="width:100%;">
                                        <el-button @click="bannerTextState = !bannerTextState" style="position: absolute;right: 18px;">Close</el-button>
                                        <div class="fromSon"> 
                                            <label>Top</label>
                                            <div class="content">
                                                <el-form-item class="WW100">
                                                    <el-input-number  v-model="bannerText.top" maxlength="120" placeholder="width"></el-input-number>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="fromSon"> 
                                            <label>Left</label>
                                            <div class="content">
                                                <el-form-item class="WW100">
                                                    <el-input-number  v-model="bannerText.left" maxlength="120" placeholder="width"></el-input-number>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="fromSon"> 
                                            <label>Width</label>
                                            <div class="content">
                                                <el-form-item class="WW100">
                                                    <el-input-number  v-model="bannerText.width" maxlength="120" placeholder="width"></el-input-number>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="fromSon"> 
                                            <label>Font Size</label>
                                            <div class="content">
                                                <el-form-item class="WW100">
                                                    <el-input-number  v-model="bannerText.fontSize" :min="12" :max="20" maxlength="120" placeholder="width"></el-input-number>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="fromSon"> 
                                            <label>Color</label>
                                            <div class="content WW100">
                                                    <el-color-picker v-model="bannerText.color"></el-color-picker>
                                            </div>
                                        </div>
                                        <div class="fromSon"> 
                                            <label>Text Align</label>
                                            <div class="content">
                                                    <template>
                                                        <el-radio v-model="bannerText.textAlign" label="left">Left</el-radio>
                                                        <el-radio v-model="bannerText.textAlign" label="center">Center</el-radio>
                                                        <el-radio v-model="bannerText.textAlign" label="right">Right</el-radio>
                                                    </template>
                                            </div>
                                        </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                        <div class="languageTextBox" :style="languageDataState?'border: 1px solid #ccc;padding: 20px;':''">
                            <el-collapse-transition >
                                <div v-show="languageDataState" style="width:100%;">
                                    <el-button @click="languageDataState = !languageDataState" style="position: absolute;right: 18px;z-index: 500;top: 9px;">Close</el-button>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="ITEM Text" class="W300">
                                                <el-input v-model="fromData.languageData.items" placeholder="ITEM(S)"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Price Text" class="W300">
                                                <el-input v-model="fromData.languageData.price" placeholder="UNIT PRICE" class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Quantity Text" class="W300">
                                                <el-input v-model="fromData.languageData.quantity" placeholder="QUANTITY"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Amount Text" class="W300">
                                                <el-input v-model="fromData.languageData.amount" placeholder="AMOUNT"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Pay Button Text" class="W300">
                                                <el-input v-model="fromData.languageData.pay" placeholder="CHECK TO PAY"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Copyright Text" class="W300">
                                                <el-input v-model="fromData.languageData.Copy" placeholder="Copyright,All Rights Reserved"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Unsubscribe Text" class="W300">
                                                <el-input v-model="fromData.languageData.unsubscribe"  placeholder="UNSUBSCRIBE" class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Help Center Text" class="W300">
                                                <el-input v-model="fromData.languageData.helpCenter" placeholder="HELP CENTER" class="W300" ></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Privacy Text" class="W300">
                                                <el-input v-model="fromData.languageData.privacy"  placeholder="PRIVACY POLICY" class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="About Us Text" class="W300">
                                                <el-input v-model="fromData.languageData.aboutUs" placeholder="ABOUT US"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Bottom Text" class="W300">
                                                <el-input type="textarea" v-model="fromData.languageData.bottom"  placeholder="This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*" class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                        <div class="fromSon"> 
                            <label>Email Subject</label>
                            <div class="content">
                                <el-form-item prop="SubjectText" class="W100">
                                    <el-input v-model="fromData.SubjectText" class="W100" maxlength="120"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-form-item prop="HeadingText" class="W100">
                                    <el-input v-model="fromData.HeadingText" class="W100" maxlength="120"></el-input>
                                </el-form-item>
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
                                    :before-upload="beforeAvatarUploadLogo">
                                    <img v-if="fromData.logoUrl && fromData.logoUrl != -1" :src="fromData.logoUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 2MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <el-form-item class="W100" prop="bannerUrl">
                                    <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"
                                    :show-file-list="false"
                                    :on-success="bannerSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img style="width: 400px!important;" v-if="fromData.bannerUrl && fromData.bannerUrl != -1" :src="fromData.bannerUrl" class="avatar">
                                    <i style="width: 400px!important;" v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 5MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>BannerUrl</label>
                            <el-input v-model="fromData.banner_url" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="fromSon">
                            <label>Headline</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.Headline" maxlength="120"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon"> 
                            <label>Body Text</label>
                            <div class="content bodyText">
                                <quill-editor ref="bodyTextRef" v-model="fromData.bodyText" class="myQuillEditor" @change="bodyTextChange($event)"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button type="info" style="margin:20px 20px 20px 0;" plain>Cancel</el-button>
                        <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                    </div>
                </el-form>        
            </div>
            <!-- rightBox -->
            <div class="rightBox">
                <h4>Preview</h4>
                <div ref="showBox">
                    <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;width: 100%;margin: 0 auto;">
                        <div style="width: 100%;padding:20px 0;">
                            <div v-if="fromData.logoUrl && fromData.logoUrl != -1" style="width: 30%;margin: 0 auto;">
                                <a :href="'http://'+fromData.domain" target="_blank">
                                    <img :src="fromData.logoUrl" style="width: 100%;"/>
                                </a>
                            </div>
                            <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;position: relative;overflow: hidden;">
                            <template>
                                <div class="bannerText" :style="'position: absolute;left: '+bannerText.left+'px;top:'+bannerText.top+'px;text-align: '+bannerText.textAlign+';width:'+bannerText.width+'px;line-height: 30px;font-size:'+bannerText.fontSize+'px;color:'+bannerText.color +';border:'+ bannerText.border+';'">
                                    <div>{{fromData.HeadingText}}</div>
                                    <div>{{fromData.Headline}}</div>
                                    <div v-html="fromData.bodyHtml"></div>
                                </div>
                            </template>
                            <template>
                                <div v-if="fromData.bannerUrl && fromData.bannerUrl != -1" style="width: 100%;">
                                    <a href="*[tr_banner_url]*" target="_blank">
                                        <img :src="fromData.bannerUrl" style="width: 100%;"/>
                                    </a>
                                </div>
                                <div v-else-if="fromData.bannerUrl == -1" style="width: 30%;margin: 0 auto;">
                                </div>
                                <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;">YOUR BANNER</div>
                            </template>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;position: relative;">
                            <template>
                                <div style="position: absolute;width: 100%;height: 3px;background: #000;top: 40px;left: 0;"></div>
                                <table style="width: 840px;font-weight: 800;margin-left: 20px;"  border="0" cellspacing="0">
                                    <thead style="padding:20px 0;line-height: 50px;border-bottom: 3px solid #ddd;">
                                        <tr style="font-size: 18px;border-bottom: 10px solid #000;">
                                            <td style="width: 50%;">
                                                <template v-if="fromData.languageData.items">{{fromData.languageData.items}}</template>
                                                <template v-else>ITEM(S)</template>
                                            </td> 
                                            <td>
                                                <template v-if="fromData.languageData.price">{{fromData.languageData.price}}</template>
                                                <template v-else>UNIT PRICE</template>
                                            </td>
                                            <td>
                                                <template v-if="fromData.languageData.quantity">{{fromData.languageData.quantity}}</template>
                                                <template v-else>QUANTITY</template>
                                            </td>
                                            <td>
                                                <template v-if="fromData.languageData.amount">{{fromData.languageData.amount}}</template>
                                                <template v-else>AMOUNT</template>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            *[tr_cart_products]*
                                    </tbody>
                                </table>
                            </template>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;text-align: right">
                            <a href="*[tr_abandoned_checkout_url]*" style="cursor: pointer; color: #fff;background: #000;padding: 10px;font-weight: 800;display: inline-block;margin-right: 20px;">
                                <template v-if="fromData.languageData.pay">{{fromData.languageData.pay}}</template>
                                <template v-else>CHECK TO PAY</template>
                            </a>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            <a href="*[tr_store_url]*" target="_blank">*[tr_domain]*</a> @2006-{{new Date().getFullYear()}} 
                            <template v-if="fromData.languageData.Copy">{{fromData.languageData.Copy}}</template>
                            <template v-else>Copyright,All Rights Reserved</template>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            <a href="*[link_unsubscribe]*" style="text-decoration: none;cursor: pointer; color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">
                                <template v-if="fromData.languageData.unsubscribe">{{fromData.languageData.unsubscribe}}</template>
                                <template v-else>UNSUBSCRIBE</template>
                            </a>
                            <a href="*[tr_help_center_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">
                                <template v-if="fromData.languageData.helpCenter">{{fromData.languageData.helpCenter}}</template>
                                <template v-else>HELP CENTER</template>
                            </a>
                            <a href="*[tr_privacy_policy_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">
                                <template v-if="fromData.languageData.privacy">{{fromData.languageData.privacy}}</template>
                                <template v-else>PRIVACY POLICY</template>
                            </a>
                            <a href="*[tr_about_us_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;font-size: 24px;" target="_blank">
                                <template v-if="fromData.languageData.aboutUs">{{fromData.languageData.aboutUs}}</template>
                                <template v-else>ABOUT US</template>
                            </a>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            <template v-if="fromData.languageData.bottom">{{fromData.languageData.bottom}}</template>
                            <template v-else>This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*</template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "NewEditletterAdd",
    data() {
        return {
            emsp:"&emsp;",
            content: '',
            editorOption: {} ,
            title:"",
            id:-1,
            loadingState:{},
            headerdata:{
                Authorization : localStorage.eleToken
            },
            Shop:{},
            bannerTextState:false,
            bannerText:{
                width:400,
                left:10,
                top:10,
                fontSize:14,
                textAlign:"left",
                color:"#000",
                border:"2px dashed #ccc",
            },
            fromDataType:"",
            languageDataState:false,
            fromData:{
                title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                domain:'',
                bannerUrl:'',
                banner_url:'',
                Headline:'',
                bodyText:'',
                bodyHtml:'',
                languageData:{
                    items:"ITEM(S)",
                    price:"UNIT PRICE",
                    quantity:"QUANTITY",
                    amount:"AMOUNT",
                    pay:"CHECK TO PAY",
                    Copy:"Copyright,All Rights Reserved",
                    unsubscribe:"UNSUBSCRIBE",
                    helpCenter:"HELP CENTER",
                    privacy:"PRIVACY POLICY",
                    aboutUs:"ABOUT US",
                    bottom:"This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"
                }
            },
            rules: {
                SubjectText: [
                    { required: true, message: 'Please enter SubjectText', trigger: 'change' },
                ],
                HeadingText: [
                    { required: true, message: 'Please enter HeadingText', trigger: 'change' },
                ],
                logoUrl: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                bannerUrl: [{ required: true, message: 'Please choose banner', trigger: 'change' }],
                Headline: [
                    { required: true, message: 'Please enter Headline', trigger: 'change' },
                ],
                bodyText: [{ required: true, message: 'Please enter bodyText', trigger: 'change' },],
            }
        }
    },
    components:{
        quillEditor
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["TemplateVal"]);
            // this.fromData = _thisData;
            this.fromData.title = _thisData.title;
            this.fromData.description = _thisData.description;
            this.fromData.SubjectText = _thisData.SubjectText;
            this.fromData.HeadingText = _thisData.HeadingText;
            this.fromData.logoUrl = _thisData.logoUrl;
            this.fromData.bannerUrl = _thisData.bannerUrl;
            this.fromData.Headline = _thisData.Headline;
            this.fromData.bodyText = _thisData.bodyText;
            this.$axios.get(`/api/v1/store/`)
            .then(res => {
                if(res.data.code == 1){
                    this.Shop = res.data.data[0];
                    // this.fromData.logoUrl = this.Shop.logo;
                    this.fromData.domain = this.Shop.domain;
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
        },
        imgClick(item){
            item.state = !item.state;
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
        beforeAvatarUploadLogo(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('JPG、png、gif');
            }
            if (!isLt2M) {
                this.$message.error('No more than 2MB!');
            }
            return isJPG && isLt2M;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error('JPG、png、gif');
            }
            if (!isLt2M) {
                this.$message.error('No more than 5MB!');
            }
            return isJPG && isLt2M;
        },
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$forceUpdate();
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title><style>';
                        _showHtml += 'a:hover{text-decoration: underline!important; }.hide{display:none!important;}.bannerText{border:0px!important;}.bannerText p{margin:0!important;}';
                        _showHtml += '</style></head><body><div style="width:880px;margin:0 auto;">';
                        _showHtml += this.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                        _showHtml = _showHtml.replace('2px dashed','0px dashed');
                        _showHtml += '<img src="https://smartsend.seamarketings.com/api/v1/mail/read/?code=*[tr_mail_send_code]*" style="width:1px;height:1px;opacity:0.1;" />'
                        if(!this.fromData.logoUrl){
                            _showHtml = _showHtml.replace('font-weight: 900; padding: 12px 0px; width: 30%; margin: 0px auto;','display:none!important;');
                        }
                        let _thisData = { 
                            title:this.fromData.title,
                            description:this.fromData.description,
                            create_time:this.fromData.create_time,
                            update_time:this.fromData.update_time,
                            subject:this.fromData.SubjectText,
                            heading_text:this.fromData.HeadingText,
                            logo:this.fromData.logoUrl,
                            banner:this.fromData.bannerUrl,
                            banner_url:this.fromData.banner_url,
                            headline:this.fromData.Headline,
                            body_text:this.fromData.bodyText,
                            banner_text:JSON.stringify(this.bannerText),
                            html:_showHtml,
                            customer_text:JSON.stringify(this.fromData.languageData),
                        }
                            this.$axios.post(`/api/v3/center_template/`, _thisData)
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
        bodyTextChange() {
            this.fromData.bodyHtml = this.fromData.bodyText.replace(/&amp;/g,"&");
            this.$forceUpdate();
        }
    },
    beforeDestroy() {
    }
}
</script>

<style>
.TemplateDisplay a:hover{text-decoration: underline!important; }   
.TemplateDisplay .leftBox{display:inline-block;width:40%;}
.TemplateDisplay .fromBox{position: relative;min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;}
.TemplateDisplay .rightBox{position: relative;width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.TemplateDisplay .rightBox .sendMail{position: absolute;right: 0px;top: 15px;}
.TemplateDisplay .showBox{min-height:500px;border:1px solid #ccc;}
.TemplateDisplay .fromSon{color:#606266;margin-bottom:20px;}
.TemplateDisplay .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.TemplateDisplay .fromSon .content{position:relative;}
.TemplateDisplay .littleMsg{font-size:14px;color:#999;}
.TemplateDisplay .bodyText .littleMsg{color: #606266;}
.TemplateDisplay .bigBox{margin-bottom:40px;}
.TemplateDisplay textarea{height:150px;}
.TemplateDisplay .imgBigBox{padding:10px;overflow:hidden;border:1px solid #ccc;margin-top:10px;padding-right:0;cursor:pointer;}
.TemplateDisplay .imgBox{width:calc(33.33333% - 10px);display:inline-block;margin-right:10px;position:relative;}
.TemplateDisplay .imgBox img{width:100%;}
.TemplateDisplay .imgBox .stateBox{position:absolute;left:5px;top:5px;border:1px solid #000;border-radius:4px;width:24px;height:25px;background:rgba(255,255,255,0.2);}
.TemplateDisplay .imgBox .stateBox .el-icon-check{font-weight:900;font-size:32px;position:absolute;top:-5px;color: #000;}
.TemplateDisplay .el-checkbox{width:40%;}
.TemplateDisplay .SendTimeType{margin:0 20px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
.TemplateDisplay .el-form--inline .el-form-item__content{width:100%;}
.TemplateDisplay .bannerTextBox{position: absolute;width: 88%;background: #fff;z-index: 500;border-radius: 10px;}
.TemplateDisplay .bannerTextBox .fromSon {width: 50%;display: inline-block;}
.TemplateDisplay .bodyText .ql-container.ql-snow{height:200px;}
.TemplateDisplay .languageTextBox{position:fixed;width:35%;background:#fff;z-index:500;border-radius:10px;bottom:100px;left:266px;}
.TemplateDisplay .languageTextBox .fromSon{margin-bottom:0;}
.TemplateDisplay .languageTextBox .el-form-item{margin-bottom:0;}
.TemplateDisplay .languageTextBox .fromSon label{padding:0;}
.TemplateDisplay .languageTextBox .fromSon {width: 50%;display: inline-block;}
.TemplateDisplay .bannerText p{margin:0!important;}


</style>