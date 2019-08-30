<template>
    <div class="NewsletterAdd">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
            <li><a href="/NewsletterList"><span class="el-icon-house"> </span>Newsletters</a></li>
            <li><a><span class="el-icon-right"> </span>Add Template</a></li>
        </ul>
        <div class="bigBox">
            <div class="leftBox">
                <el-form :inline="true" :model="fromData" ref="fromRef" class="demo-form-inline fromClass" :disabled="fromData.fromDataType == 'preview'"  :rules="rules">
                    <h4>Edit Template</h4>
                    <div class="fromBox">
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
                                            <el-form-item label="Copyright" class="W300">
                                                <el-input v-model="fromData.languageData.Copy" placeholder="Copyright,All Rights Reserved"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="fromSon">
                                        <div class="content">
                                            <el-form-item label="Unsubscribe Text" class="W300">
                                                <el-input v-model="fromData.languageData.unsubscribe" placeholder="UNSUBSCRIBE"  class="W300"></el-input>
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
                                                <el-input v-model="fromData.languageData.privacy" placeholder="PRIVACY POLICY"  class="W300"></el-input>
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
                                                <el-input type="textarea" v-model="fromData.languageData.bottom" placeholder="This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"  class="W300"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                        <div class="fromSon">
                            <label>Email Title</label>
                            <div class="content">
                                <el-form-item prop="Title" class="W100">
                                    <el-input v-model="fromData.Title" class="W100" ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Email Description</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.description" class="W100"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Email Subject</label>
                            <div class="content">
                                <el-form-item class="W100" prop="SubjectText">
                                    <el-input v-model="fromData.SubjectText" class="W100"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.HeadingText" class="W100"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Logo</label>
                            <div class="content">
                                <!-- <el-form-item prop="logoUrl" class="uploadClass W100"> -->
                                <el-form-item class="uploadClass W100">
                                    <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"
                                    :show-file-list="false"
                                    :on-success="logoSuccess"
                                    :before-upload="beforeAvatarUploadLogo">
                                    <!-- <img v-if="fromData.logoUrl" :src="'data:image/jpeg;base64,'+fromData.logoUrl" class="avatar"> -->
                                    <img v-if="fromData.logoUrl && fromData.logoUrl != -1" :src="fromData.logoUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <div class="uploadBtnBox"><el-button type="info">Upload</el-button></div> -->
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 2MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <!-- <el-form-item prop="bannerUrl" class="uploadClass W100"> -->
                                <el-form-item class="uploadClass W100" prop="bannerUrl">
                                        <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"    
                                    :show-file-list="false"
                                    :on-success="bannerSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <!-- <img v-if="fromData.bannerUrl" :src="'data:image/jpeg;base64,'+ fromData.bannerUrl" class="avatar"> -->
                                    <img  style="width: 400px!important;" v-if="fromData.bannerUrl && fromData.bannerUrl != -1" :src="fromData.bannerUrl" class="avatar">
                                    <i v-else style="width: 400px!important;" class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <div class="uploadBtnBox"></div> -->
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 5MB</span>
                            </div>
                        </div>
                        <!-- <div class="fromSon">
                            <label>Shopping Cart</label>
                            <div class="content">
                                <el-form-item class="W100">
                                        <el-switch v-model="fromData.is_cart" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-form-item>
                            </div>
                        </div> -->
                        <div class="fromSon">
                            <label>Headline</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.Headline"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Body Text</label>
                            <div class="content bodyText">
                                <quill-editor ref="bodyTextRef" v-model="fromData.bodyText" class="myQuillEditor" @change="bodyTextChange($event)"/>
                                <span class="littleMsg">Shop Name:*[tr_shop_name]*&emsp;&emsp;&emsp;&emsp;First Name:*[tr_firstname]*&emsp;&emsp;&emsp;&emsp; Space:{{emsp}} </span>
                            </div>
                        </div>
                        <div class="fromSon"> 
                            <label>Product Title</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.productTitle" class="W100" maxlength="120"></el-input>
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
                        <div class="fromSon imgBigBox" v-if="productArray.length>0">
                            <div v-for="(item,index) in productArray" :key="index" :data-num="item.state" class="imgBox" @click="imgClick(item)">
                                <img :src="item.image_url" />
                                <div class="stateBox">
                                    <span v-if="item.state" class="el-icon-check"></span>
                                </div>
                            </div>
                        </div>
                        <span class="littleMsg" v-if="productArray.length>0">Max 6 products</span>
                    </div>
                    <el-button type="primary" style="margin:20px 0;">Preview</el-button>
                    <h4>Edit Sent Time</h4>
                    <div class="fromBox">
                        <div class="fromSon">
                            <label>Choose Segment</label>
                            <div class="content">
                                <el-form-item prop="SegmentValue" class="W100">
                                    <template>
                                            <el-checkbox-group v-model="fromData.SegmentState"  @change="SegmentStateChange">
                                                <el-checkbox :label="'Select All'">Select All</el-checkbox>
                                            </el-checkbox-group>
                                            <!-- <el-select v-model="fromData.SegmentSelectState" class="W100">
                                                <el-option :label="'Select All'" :value="'All'"></el-option>
                                            </el-select> -->
                                            <el-checkbox-group class="SegmentValueBox" v-model="fromData.SegmentValue" @change="SegmentValueChange">
                                                <el-checkbox v-for="item in SegmentArray" :label="item.id" :key="item.id">{{item.title}}</el-checkbox>
                                            </el-checkbox-group>
                                    </template>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Choose Valid Period</label>
                            <div class="content">
                                <el-form-item prop="periodTime" class="W100">
                                    <el-date-picker class="W100" v-model="fromData.periodTime" :picker-options="pickerOptions"  type="daterange" range-separator="-"></el-date-picker>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Choose Send Time</label>
                            <div class="content">
                                <el-form-item prop="SendValue" class="W100">
                                    Every
                                    <el-select v-model="fromData.SendTimeType" class="SendTimeType">
                                        <el-option v-for="item in SendTimeTypeArray" :key="item.value" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                    <el-time-picker v-model="fromData.SendValue"></el-time-picker>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button type="info" style="margin:20px 20px 20px 0;" plain>Cancel</el-button>
                        <el-button type="primary" style="margin:20px 20px 20px 0;" @click="saveFun('fromRef')">Save</el-button>
                    </div>
                </el-form>        
            </div>
            <div class="rightBox">
                <h4>Preview</h4>
                <!-- <el-button type="primary" class="sendMail" @click="sendMail('fromRef')" >Send Test Mail</el-button> -->
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
                                        <!-- <div>{{fromData.SubjectText}}</div> -->
                                        <div>{{fromData.HeadingText}}</div>
                                        <div>{{fromData.Headline}}</div>
                                        <div v-html="fromData.bodyHtml"></div>
                                    </div>
                            </template>
                            <template>
                                <div v-if="fromData.bannerUrl && fromData.bannerUrl != -1" style="width: 100%;">
                                    <img :src="fromData.bannerUrl" style="width: 100%;"/>
                                </div>
                                <div v-else-if="fromData.bannerUrl == -1" style="width: 30%;margin: 0 auto;">
                                </div>
                                <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;">YOUR BANNER</div>
                            </template>
                        </div>
                        <!-- <div style="width: 100%;padding-bottom: 20px;position: relative;" v-if="fromData.is_cart">
                            <template>
                                <div style="position: absolute;width: 100%;height: 3px;background: #000;top: 40px;left: 0;"></div>
                                <table style="width: 856px;font-weight: 800;margin-left: 20px;"  border="0" cellspacing="0">
                                    <thead style="padding:20px 0;line-height: 50px;border-bottom: 3px solid #ddd;">
                                        <tr style="font-size: 18px;border-bottom: 10px solid #000;">
                                            <td style="width: 50%;">ITEM(S)</td>
                                            <td>UNIT PRICE</td>
                                            <td>QUANTITY</td>
                                            <td>AMOUNT</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        *[tr_cart_products]*
                                    </tbody>
                                </table>
                            </template>
                        </div> 
                        <div style="width: 100%;padding-bottom: 20px;text-align: right" v-if="fromData.is_cart">
                            <a href="*[tr_abandoned_checkout_url]*" style="cursor: pointer; color: #fff;background: #000;padding: 10px;font-weight: 800;display: inline-block;    margin-right: 20px;">CHECK TO PAY</a>
                        </div>-->
                        <div class="*[tr_products_title]*" style="width: 100%;padding-bottom: 20px;font-size: 20px;font-weight: 800;" v-if="fromData.searchImgType != 'no product'">
                            {{fromData.productTitle}}
                        </div>
                        <div style="width: 856px;padding: 20px 12px;">
                            <template v-if="fromData.searchImgType != 'no product'">
                                *[tr_top_products]*
                            </template>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            @2006-{{new Date().getFullYear()}} <a href="*[tr_store_url]*" target="_blank">*[tr_domain]*</a>  
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
        <DialogFound :dialog='dialog' :fromData="fromData" :trueProductArray="trueProductArray" ></DialogFound>
    </div>
</template>

<script>

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import DialogFound from "./Send_mail";
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "NewsletterAdd",
    data() {
        return {
            emsp:"&emsp;",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 1000 * 24 * 60 * 60;//设置选择明天之前的日期
                }
            },
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
            languageDataState:false,
            fromData:{
                is_cart:true,
                fromDataType:'add',
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                domain: '',
                bannerUrl:'',
                Headline:'',
                productTitle:'',
                bodyText:'',
                bodyHtml:'',
                searchImgType:'top_three',
                SegmentValue:[],
                SegmentState:[],
                SegmentSelectState:"All",
                periodTime:[],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
                languageData:{
                    // Copy:"Copyright,All Rights Reserved",
                    // unsubscribe:"UNSUBSCRIBE",
                    // helpCenter:"HELP CENTER",
                    // privacy:"PRIVACY POLICY",
                    // aboutUs:"ABOUT US",
                    // bottom:"This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"
                }
            },
            SegmentArray:[],
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
                {value: '10',label: 'Everyday'},
            ],
            searchImgTypeArray:[
                {value: 'top_three',label: 'Top 4 products in last 3 days'},
                {value: 'top_seven',label: 'Top 4 products in last 7 days'},
                {value: 'top_fifteen',label: 'Top 4 products in last 15 days'},
                {value: 'top_thirty',label: 'Top 4 products in last 30 days'},
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
                Title: [{ required: true, message: 'Please enter Title', trigger: 'change' }],
                SubjectText: [{ required: true, message: 'Please enter SubjectText', trigger: 'change' }],
                HeadingText: [{ required: true, message: 'Please enter HeadingText', trigger: 'change' }],
                logoUrl: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                bannerUrl: [{ required: true, message: 'Please choose banner', trigger: 'change' }],
                Headline: [{ required: true, message: 'Please enter Headline', trigger: 'change' }],
                bodyText: [{ required: true, message: 'Please enter bodyText', trigger: 'change' }],
                periodTime: [{ required: true, message: 'Please choose Valid Period', trigger: 'change' }],
                SegmentValue: [{ required: true, message: 'Please Choose Segment' , trigger: 'blur'}],
                SendValue: [{ required: true, message: 'Please Choose Time' }],
            }
        }
    },
    components:{
        DialogFound,
        quillEditor
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
            },
            deep: true
        },
        bannerTextState(val) {
            if(val){
                this.languageDataState = false;
            }
        },
        languageDataState(val) {
            if(val){
                this.bannerTextState = false;
            }
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["NewsletterVal"]);
            this.fromData = _thisData;
            if(this.fromData.languageData){
                this.fromData.languageData = JSON.parse(this.fromData.languageData);
            }
            if(_thisData.banner_text){
                this.bannerText = JSON.parse(this.fromData.banner_text);
            }
            if(this.fromData.fromDataType == "add"){
                this.fromData.periodTime = [new Date(),new Date(new Date().getTime()+24*60*60*1000)];
            }else if(this.fromData.fromDataType == "clone"){
                if(new Date(this.fromData.periodTime[0]).getTime() < new Date().getTime()){
                    this.fromData.periodTime = [new Date(),new Date(new Date().getTime()+24*60*60*1000)];
                }
            }
            this.bodyTextChange();
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
            this.$axios.get(`/api/v1/store/`)
            .then(res => {
                if(res.data.code == 1){
                    this.Shop = res.data.data[0];
                    this.fromData.logoUrl = this.Shop.logo;
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
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error('JPG、png、gif');
            }
            if (!isLt2M) {
                this.$message.error('No more than 5MB!');
            }
            return isJPG && isLt2M;
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
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title><style>';
                        _showHtml += 'a:hover{text-decoration: underline!important; }.hide{display:none!important;}.bannerText{border:0px!important;}.bannerText p{margin:0;}';
                        _showHtml += '</style></head><body><div style="width:880px;margin:0 auto;">';
                        _showHtml += this.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                        _showHtml = _showHtml.replace('2px dashed','0px dashed');
                        if(!this.fromData.logoUrl){
                            _showHtml = _showHtml.replace('font-weight: 900; padding: 12px 0px; width: 30%; margin: 0px auto;','display:none!important;');
                        }
                        let _thisData = {
                            is_cart:this.fromData.is_cart?1:0,
                            title:this.fromData.Title,
                            description:this.fromData.description,
                            subject:this.fromData.SubjectText,
                            heading_text:this.fromData.HeadingText,
                            logo:this.fromData.logoUrl,
                            banner:this.fromData.bannerUrl,
                            headline:this.fromData.Headline,
                            body_text:this.fromData.bodyText,
                            product_condition:this.fromData.searchImgType,
                            product_list:JSON.stringify(this.trueProductArray),
                            banner_text:JSON.stringify(this.bannerText),
                            product_title:this.fromData.productTitle,
                            customer_group_list:JSON.stringify(this.fromData.SegmentValue),
                            send_rule:JSON.stringify({
                                begin_time:base.dateFormat(this.fromData.periodTime[0]),
                                end_time:base.dateFormat(this.fromData.periodTime[1]),
                                cron_type:this.fromData.SendTimeType,
                                cron_time:base.dateFormat(this.fromData.SendValue,"hour")
                            }),
                            html:_showHtml,
                            customer_text:JSON.stringify(this.fromData.languageData),
                            enable:0
                        }
                        this.$axios.post(`/api/v1/email_template/`, _thisData)
                            .then(res => {
                                if(res.data.code == 1){
                                    this.$message({message: "Successfully!",type: "success"});
                                    router.push('/NewsletterList');
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
                    if(this.fromData.Title && this.fromData.SubjectText && this.fromData.Headline && this.fromData.logoUrl && this.fromData.bannerUrl && this.fromData.HeadingText && this.fromData.bodyText){
                        this.dialog.show = true;
                    }else{
                        this.$message.error('Incomplete information!');
                    }
                }
            });
        },
        searchImgType(){
            // if(this.fromData.searchImgType == "Shopping cart goods" || this.fromData.searchImgType == "no product" || this.fromData.searchImgType == "Personal Product Recommendation" || this.fromData.searchImgType == "Relevant product recommendation"  ){
            //     this.productArray = [];
            // }else{
            //     this.productArray = this.top_product[this.fromData.searchImgType];
            //     this.productArray.map(e =>{
            //         e.state = true;
            //     });
            // }
            // this.productArray = this.productArray;
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
.NewsletterAdd .leftBox{display:inline-block;width:40%;}
.NewsletterAdd .fromBox{position: relative; min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;}
.NewsletterAdd .rightBox{position: relative;width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.NewsletterAdd .rightBox .sendMail{position: absolute;right: 0px;top: 15px;}
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
.NewsletterAdd .bannerTextBox .fromSon {width: 50%;display: inline-block;}
.NewsletterAdd .bodyText .ql-container.ql-snow{height:200px;}
.NewsletterAdd .languageTextBox{position:fixed;width:32%;background:#fff;z-index:500;border-radius:10px;bottom:200px;left:266px;}
.NewsletterAdd .languageTextBox .fromSon{width: 50%;display: inline-block;margin-bottom:0;}
.NewsletterAdd .languageTextBox .el-form-item{margin-bottom:0;}
.NewsletterAdd .languageTextBox .fromSon label{padding:0;}
.NewsletterAdd .bannerText p{margin:0!important;}

</style>