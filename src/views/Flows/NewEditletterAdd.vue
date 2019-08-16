<template>
    <div class="NewEditletterAdd">
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
                            </div>
                        </div>
                        <div class="fromSon">
                            <label>HeadingText</label>
                            <div class="content">
                                <el-form-item prop="HeadingText" class="W100">
                                    <el-input v-model="fromData.HeadingText" class="W100" maxlength="120" placeholder="Length of 5 to 120 characters"></el-input>
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
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="fromData.logoUrl && fromData.logoUrl != -1" :src="fromData.logoUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
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
                                    <img v-if="fromData.bannerUrl && fromData.bannerUrl != -1" :src="fromData.bannerUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 10MB</span>
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
                                    <el-input v-model="fromData.Headline" maxlength="120" placeholder="Length of 5 to 120 characters"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="fromSon"> 
                            <label>Body Text</label>
                            <div class="content">
                                <el-form-item prop="bodyText" class="W100">
                                    <el-input type="textarea" v-model="fromData.bodyText" placeholder="It seems like you didn't find what you were looking for during your last visit to {店铺名}.Do you need another look?"></el-input>
                                </el-form-item>
                                <span class="littleMsg">*[tr_shop_name]*    *[tr_firstname]*</span>
                            </div>
                        </div>
                        <div class="fromSon"> 
                            <label>Product Title</label>
                            <div class="content">
                                <el-form-item class="W100">
                                    <el-input v-model="fromData.productTitle" class="W100" maxlength="120" placeholder="Product Title"></el-input>
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
                            <div v-for="(item,index) in productArray" :key="index" class="imgBox" @click="imgClick(item)">
                                <a :href="item.url" target="_blank">
                                    <img :src="item.image_url" />
                                </a> 
                                <div class="stateBox">
                                    <span v-if="item.state" class="el-icon-check"></span>
                                </div>
                            </div>
                        </div>
                        <span class="littleMsg" v-if="productArray.length>0">Max 6 products</span>
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
                    <div class="showBox" style="word-wrap:break-word;text-align:center;font-size:14px;">
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
                                <div class="bannerText" style="position: absolute;left: 30px;top: 20px;text-align: left;width: 50%;line-height: 30px;">
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
                                <table style="width: calc(100% - 40px);font-weight: 800;margin-left: 20px;"  border="0" cellspacing="0">
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
                                        <!-- <tr>
                                            <td style="padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #E8E8E8;margin: 10px 0;">
                                                <div style="width: calc(35% - 20px);display: inline-block;">
                                                    <img src="../../assets/img/none.png" style="width: 100%;"/>
                                                </div>
                                                <div style="width: calc(60% - 20px);display: inline-block;vertical-align: top;margin-left: 20px;line-height: 26px;">
                                                    <div style="display: -webkit-box !important;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"> <a href="跳转路径" target="_blank" style="color: #000;text-decoration: none;">Product Name</a> </div>
                                                    <div style="background: #000;color: #fff;padding: 5px;display: inline-block;line-height: 10px;">Falsh Sale</div>
                                                    <div style="color: #666;width: 100%;">Color:bule</div>
                                                    <div style="color: #666;width: 100%;">Size:Girl_90</div>
                                                </div>
                                            </td>
                                            <td valign="top" style="padding: 10px 0px;border-bottom: 1px solid #E8E8E8;line-height: 26px;">
                                                <div>$30.90</div>
                                                <div style="text-decoration: line-through;color: #666;">$30.90</div>
                                            </td>
                                            <td valign="top" style="padding: 10px 0px;border-bottom: 1px solid #E8E8E8;">2</td>
                                            <td valign="top" style="padding: 10px 0px;border-bottom: 1px solid #E8E8E8;">$38.29</td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </template>
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;text-align: right" v-if="fromData.is_cart">
                            <a href="*[tr_abandoned_checkout_url]*" style="cursor: pointer; color: #fff;background: #000;padding: 10px;font-weight: 800;display: inline-block;    margin-right: 20px;">CHECK TO PAY</a>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;">
                            <template v-if="fromData.searchImgType != 'no product'">
                                *[tr_top_products]*
                            </template>
                            <!-- <template v-for="(item,index) in productArray" >
                                <div :key="index" v-if="item.state" style="width:calc(50% - 24px);margin:10px;display:inline-block;vertical-align: top;">
                                    <a :href="item.url">
                                        <img :src="item.image_url" style="width:100%;"/>
                                    </a>
                                    <h3 style="font-weight:700;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px;">{{item.name}}</h3>
                                </div>
                            </template> -->
                        </div>
                        <div style="width: 100%;padding-bottom: 20px;font-size: 20px;font-weight: 800;" v-if="fromData.searchImgType != 'no product'">
                            <template v-if="fromData.productTitle">
                                    {{fromData.productTitle}}
                            </template>
                            <template v-else>
                                    Product Title
                            </template>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            @2006-{{new Date().getFullYear()}} calladream.com Copyright,All Rights Reserved
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            <a href="*[link_unsubscribe]*" style="cursor: pointer; color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">UNSUBSCRIBE</a>
                            <a style="cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">HELP CENTER</a>
                            <a style="cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;" target="_blank">PRIVACY POLICY</a>
                            <a href="*[tr_about_us]*" style="cursor: pointer;color: #FE222E;padding: 0 10px;font-size: 24px;" target="_blank">ABOUT US</a>
                        </div>
                        <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
                            This email was sent a notification-only address that cannot accept incoming email PLEASE
                            DO NOT REPLY to this message. if you have any questions or concerns.please email us:service@calladream.com
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
    name: "NewEditletterAdd",
    data() {
        return {
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
                is_cart:true,
                Title:'',
                description:'',
                SubjectText:'',
                HeadingText:'',
                logoUrl: '',
                bannerUrl:'',
                Headline:'',
                bodyText:'',
                productTitle:'',
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
                {value: 'top_three',label: 'Top 4 products in last 3 days'},
                {value: 'top_seven',label: 'Top 4 products in last 7 days'},
                {value: 'top_fifteen',label: 'Top 4 products in last 15 days'},
                {value: 'top_thirty',label: 'Top 4 products in last 30 days'},
                // {value: 'Shopping cart goods',label: 'Shopping cart goods'},
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
                    // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur" }
                ],
                HeadingText: [
                    { required: true, message: 'Please enter HeadingText', trigger: 'change' },
                    // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
                ],
                logoUrl: [{ required: true, message: 'Please choose logo', trigger: 'change' }],
                bannerUrl: [{ required: true, message: 'Please choose banner', trigger: 'change' }],
                Headline: [
                    { required: true, message: 'Please enter Headline', trigger: 'change' },
                    // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
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
                this.productArray.map(e =>{
                    if(e.state){
                        this.trueProductArray.push(e);
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
                        this.fromData.is_cart = res.data.data.is_cart?true:false;
                        this.fromData.SubjectText = res.data.data.subject;
                        this.fromData.HeadingText = res.data.data.heading_text;
                        this.fromData.logoUrl = res.data.data.logo;
                        this.fromData.bannerUrl = res.data.data.banner;
                        this.fromData.Headline = res.data.data.headline;
                        this.fromData.bodyText = res.data.data.body_text;
                        this.fromData.productTitle = res.data.data.product_title;
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
                    let _showHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title><style>';
                        _showHtml += 'a:hover{text-decoration: underline!important; }@media screen and (min-width:1201px){.bannerText{line-height: 60px!important;font-size: 20px;}}';
                        _showHtml += '</style></head><body><div style="width:1200px;margin:0 auto;">';
                        _showHtml += this.$refs.showBox.innerHTML;
                        _showHtml += '</div></body></html>';
                        
                    if(this.fromData.logoUrl == -1){
                        this.fromData.logoUrl = "";
                    }
                    if(this.fromData.bannerUrl == -1){
                        this.fromData.bannerUrl = "";
                    }
                        let _thisData = {
                            is_cart:this.fromData.is_cart?1:0,
                            subject:this.fromData.SubjectText,
                            heading_text:this.fromData.HeadingText,
                            logo:this.fromData.logoUrl,
                            banner:this.fromData.bannerUrl,
                            headline:this.fromData.Headline,
                            body_text:this.fromData.bodyText,
                            product_condition:this.fromData.searchImgType,
                            product_title:this.fromData.productTitle,
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
                                    let _email_delay = JSON.parse(_thisData.email_delay); 
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
            // if(this.fromData.searchImgType == "Shopping cart goods" || this.fromData.searchImgType == "no product" || this.fromData.searchImgType == "Personal Product Recommendation" || this.fromData.searchImgType == "Relevant product recommendation"  ){
            //     this.productArray = [];
            // }else{
            //     this.productArray = this.top_product[this.fromData.searchImgType];
            //     console.log(this.productArray)
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
 .NewEditletterAdd a:hover{text-decoration: underline!important; }   
.NewEditletterAdd .leftBox{display:inline-block;width:40%;}
.NewEditletterAdd .fromBox{min-height:500px;border:1px solid #ccc;box-shadow:4px 10px 10px #ccc;padding:20px;}
.NewEditletterAdd .rightBox{position: relative;width:calc(60% - 100px);display:inline-block;vertical-align:top;margin-left:45px;}
.NewEditletterAdd .rightBox .sendMail{position: absolute;right: 0px;top: 15px;}
.NewEditletterAdd .showBox{min-height:500px;border:1px solid #ccc;}
.NewEditletterAdd .fromSon{color:#606266;margin-bottom:20px;}
.NewEditletterAdd .fromSon label{display:inline-block;font-weight:700;font-size:14px;padding:12px 0;color: #000;}
.NewEditletterAdd .fromSon .content{position:relative;}
.NewEditletterAdd .littleMsg{font-size:14px;color:#999;}
.NewEditletterAdd .bigBox{margin-bottom:40px;}
.NewEditletterAdd textarea{height:150px;}
.NewEditletterAdd .imgBigBox{padding:10px;overflow:hidden;border:1px solid #ccc;margin-top:10px;padding-right:0;cursor:pointer;}
.NewEditletterAdd .imgBox{width:calc(33.33333% - 10px);display:inline-block;margin-right:10px;position:relative;}
.NewEditletterAdd .imgBox img{width:100%;}
.NewEditletterAdd .imgBox .stateBox{position:absolute;left:5px;top:5px;border:1px solid #000;border-radius:4px;width:24px;height:25px;background:rgba(255,255,255,0.2);}
.NewEditletterAdd .imgBox .stateBox .el-icon-check{font-weight:900;font-size:32px;position:absolute;top:-5px;color: #000;}
.NewEditletterAdd .el-checkbox{width:40%;}
.NewEditletterAdd .SendTimeType{margin:0 20px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;}
.avatar-uploader .el-upload:hover{border-color:#409EFF;}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;}
.avatar{width:178px;height:178px;display:block;}
.NewEditletterAdd .el-form--inline .el-form-item__content{width:100%;}





</style>