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
                            <label style="cursor: pointer;" ><el-button @click="bannerTextState = !bannerTextState"  type="primary">Adjust text position</el-button></label>
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
                        <div class="fromSon">
                            <label>Email Title</label>
                            <div class="content">
                                <el-form-item prop="Title" class="W100">
                                    <el-input v-model="fromData.Title" class="W100"  placeholder="Title"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Email Description</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.description" class="W100"  placeholder="Description"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Email Subject</label>
                            <div class="content">
                                <el-form-item prop="SubjectText" class="W100">
                                    <el-input v-model="fromData.SubjectText" class="W100"  placeholder="We just picked up some new items for you"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-form-item prop="HeadingText" class="W100">
                                    <el-input v-model="fromData.HeadingText" class="W100"  placeholder="Styles you love - selling fast!"></el-input>
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
                                    :before-upload="beforeAvatarUpload">
                                    <!-- <img v-if="fromData.logoUrl" :src="'data:image/jpeg;base64,'+fromData.logoUrl" class="avatar"> -->
                                    <img v-if="fromData.logoUrl && fromData.logoUrl != -1" :src="fromData.logoUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <div class="uploadBtnBox"><el-button type="info">Upload</el-button></div> -->
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 5MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Banner</label>
                            <div class="content">
                                <!-- <el-form-item prop="bannerUrl" class="uploadClass W100"> -->
                                <el-form-item class="uploadClass W100">
                                        <el-upload
                                    class="avatar-uploader"
                                    action="/api/v1/upload_picture/"
                                    :auto-upload="true"
                                    :headers="headerdata"    
                                    :show-file-list="false"
                                    :on-success="bannerSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <!-- <img v-if="fromData.bannerUrl" :src="'data:image/jpeg;base64,'+ fromData.bannerUrl" class="avatar"> -->
                                    <img v-if="fromData.bannerUrl && fromData.bannerUrl != -1" :src="fromData.bannerUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <div class="uploadBtnBox"></div> -->
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 5MB</span>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Shopping Cart</label>
                            <div class="content">
                                <el-form-item class="W100">
                                        <el-switch v-model="fromData.is_cart" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>Headline</label>
                            <div class="content">
                                <el-form-item prop="Headline" class="W100">
                                    <el-input v-model="fromData.Headline" placeholder="STILL SEARCHING FOR WHAT YOU NEED?"></el-input>
                                </el-form-item>
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
                                <img :src="fromData.logoUrl" style="width: 100%;"/>
                            </div>
                            <div v-else-if="fromData.logoUrl == -1" style="width: 30%;margin: 0 auto;">
                            </div>
                            <div v-else style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;">YOUR LOGO</div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;position: relative;overflow: hidden;">
                            <template>
                                <div class="bannerText" :style="'position: absolute;left: '+bannerText.left+'px;top:'+bannerText.top+'px;text-align: '+bannerText.textAlign+';width:'+bannerText.width+'px;line-height: 30px;font-size:'+bannerText.fontSize+'px;color:'+bannerText.color +';border:'+ bannerText.border+';'">
                                    <div>
                                        <template v-if="fromData.SubjectText">
                                                {{fromData.SubjectText}}
                                        </template>
                                        <template v-else>
                                                Did you forget something?
                                        </template>
                                    </div>
                                    <div>
                                        <template v-if="fromData.HeadingText">
                                                {{fromData.HeadingText}}
                                        </template>
                                        <template v-else>
                                                We are still waiting for you at {shop.name}
                                        </template>
                                    </div>
                                    <div>
                                        <template v-if="fromData.Headline">
                                                {{fromData.Headline}}
                                        </template>
                                        <template v-else>
                                                Did you forget something?
                                        </template>
                                    </div>
                                    <div>
                                        <template v-if="fromData.bodyText">
                                                {{fromData.bodyText}}
                                        </template>
                                        <template v-else>
                                                We noticed you left {shop.name} without completing your order. Don’t worry, we saved your shopping cart so you can easily click back and continue shopping any time.
                                        </template>
                                    </div>
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
                        <div style="width: 100%;padding-bottom: 20px;position: relative;" v-if="fromData.is_cart">
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
                        </div>
                        <div class="*[tr_products_title]*" style="width: 100%;padding-bottom: 20px;font-size: 20px;font-weight: 800;" v-if="fromData.searchImgType != 'no product'">
                            <template v-if="fromData.productTitle">
                                    {{fromData.productTitle}}
                            </template>
                            <template v-else>
                                    Product Title
                            </template>
                        </div>
                        <div style="width: 856px;padding: 20px 12px;">
                            <template v-if="fromData.searchImgType != 'no product'">
                                *[tr_top_products]*
                            </template>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            @2006-{{new Date().getFullYear()}} <a href="*[tr_store_url]*" target="_blank">*[tr_domain]*</a>  Copyright,All Rights Reserved
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            <a href="*[link_unsubscribe]*" style="text-decoration: none;cursor: pointer; color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">UNSUBSCRIBE</a>
                            <a href="*[tr_help_center_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">HELP CENTER</a>
                            <a href="*[tr_privacy_policy_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">PRIVACY POLICY</a>
                            <a href="*[tr_about_us_url]*" style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;font-size: 24px;" target="_blank">ABOUT US</a>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            This email was sent a notification-only address that cannot accept incoming email PLEASE
                            DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="rightBox">
                <h4>Preview</h4>
                <el-button type="primary" class="sendMail" @click="sendMail('fromRef')" >Send Test Mail</el-button>
                <div ref="showBox">
                    <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;">
                        <div style="margin: 0px auto;width: 100%;border-bottom: 1px solid #ccc;padding-bottom: 20px;">
                            <div style="margin:0 auto;width:30%;">
                                <h2>Email Subject</h2>
                                <div v-if="fromData.SubjectText">{{fromData.SubjectText}}</div>
                                <div v-else>We just picked up some new items for you</div>
                            </div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div style="margin:0 auto;width:70%;line-height:20px;padding: 20px 0;">
                                <div v-if="fromData.HeadingText" style="padding: 10px 0;">{{fromData.HeadingText}}</div>
                                <div v-else style="padding: 10px 0;">Styles you love - selling fast!</div>
                                <div style="padding: 10px 0;">If you are having trouble viewing this email, please <a :href="'http://'+Shop.domain+'?utm_source=smartsend'" target="_blank">click here</a> .</div>
                            </div>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;">
                            <div v-if="fromData.logoUrl && fromData.logoUrl != -1" style="width: 30%;margin: 0 auto;">
                                <img :src="fromData.logoUrl" style="width: 100%;"/>
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
                                    *[tr_specialProduct]*
                            </template>
                            <template v-else>
                                <template v-for="(item,index) in productArray" >
                                    <div :key="index" v-if="item.state" style="width:calc(50% - 24px);margin:10px;display:inline-block;vertical-align: top;border:1px solid #ccc;">
                                        <a :href="item.url" target="_blank">
                                            <img :src="item.image_url" style="width:100%;"/>
                                        </a>
                                        <h3 style="font-weight:700;">{{item.name}}</h3>
                                        <h3>{{item.price}}</h3>
                                    </div>
                                </template>
                            </template>
                        </div>
                        <div style="width:100%;padding-bottom: 20px;">
                            <a :href="'http://'+Shop.domain+'?utm_source=smartsend'" target="_blank">
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
            </div> -->
        </div>
        <DialogFound :dialog='dialog' :fromData="fromData" :trueProductArray="trueProductArray" ></DialogFound>
    </div>
</template>

<script>
import DialogFound from "./Send_mail";
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
    name: "NewsletterAdd",
    data() {
        return {
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
            fromData:{
                is_cart:true,
                fromDataType:'add',
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
                SegmentSelectState:"All",
                periodTime:[],
                SendTimeType:'Monday',
                SendValue:new Date(2019, 9, 10, 18, 40),
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
                Title: [{ required: true, message: 'Please enter SubjectText', trigger: 'change' }],
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
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let _thisData = JSON.parse(localStorage["NewsletterVal"]);
            this.fromData = _thisData;
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
        saveFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.fromData.logoUrl){
                        this.fromData.logoUrl = -1;
                    }
                    if(!this.fromData.bannerUrl){
                        this.fromData.bannerUrl = -1;
                    }
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title><style>';
                        _showHtml += 'a:hover{text-decoration: underline!important; }.hide{display:none!important;}.bannerText{border:0px!important;}';
                        _showHtml += '</style></head><body><div style="width:880px;margin:0 auto;">';
                        _showHtml += this.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                        _showHtml = _showHtml.replace('2px dashed #ccc','');
                        if(this.fromData.logoUrl == -1){
                            this.fromData.logoUrl = "";
                        }
                        if(this.fromData.bannerUrl == -1){
                            this.fromData.bannerUrl = "";
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
                            customer_group_list:JSON.stringify(this.fromData.SegmentValue),
                            send_rule:JSON.stringify({
                                begin_time:base.dateFormat(this.fromData.periodTime[0]),
                                end_time:base.dateFormat(this.fromData.periodTime[1]),
                                cron_type:this.fromData.SendTimeType,
                                cron_time:base.dateFormat(this.fromData.SendValue,"hour")
                            }),
                            html:_showHtml,
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
</style>