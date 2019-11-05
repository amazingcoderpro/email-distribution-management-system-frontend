<template>
  <div class="NewsletterAdd">
    <ul id="breadcrumb">
      <li><a href="/dashboard"><span class="el-icon-right"> </span>Home</a></li>
      <li><a href="/NewsletterList"><span class="el-icon-house"> </span>Newsletters</a></li>
      <li><a><span class="el-icon-right"> </span>Add Template</a></li>
    </ul>
    <div class="bigBox">
      <div class="leftBox"> 
        <el-form :inline="true"
                 :model="fromData"
                 ref="fromRef"
                 class="demo-form-inline fromClass"
                 :disabled="fromData.fromDataType == 'preview'"
                 :rules="rules">
          <h4>Edit Template</h4>
          <div class="Template_Center">
            <h4 style="display: inline;">Template Center</h4>
            <div class="Template_Center_select"
                 style="margin:20px 0">
              <el-select v-model="fromData.title"
                         class="W100"
                         @change="ProductTemplateFun"
                         placeholder="Please select a template">
                <el-option v-for="item in TemplateCenterArray"
                           :key="item.id"
                           :label="item.title"
                           :value="item.title">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="TemplateClassic">
            <h4>Edit Sent Time</h4>
            <div class="fromBox">
              <div class="fromSon">
                <label>Choose Segment</label>
                <div class="content">
                  <el-form-item prop="SegmentValue"
                                class="W100">
                    <template>
                      <el-checkbox-group v-model="fromData.SegmentState"
                                         @change="SegmentStateChange">
                        <el-checkbox :label="'Select All'">Select All</el-checkbox>
                      </el-checkbox-group>
                      <el-checkbox-group class="SegmentValueBox"
                                         v-model="fromData.SegmentValue"
                                         @change="SegmentValueChange">
                        <el-checkbox v-for="item in SegmentArray"
                                     :label="item.id"
                                     :key="item.id">{{item.title}}</el-checkbox>
                      </el-checkbox-group>
                    </template>
                  </el-form-item>
                </div>
              </div>
              <div class="fromSon">
                <label>Choose Valid Period</label>
                <div class="content">
                  <el-form-item prop="periodTime"
                                class="W100">
                    <el-date-picker class="W100"
                                    v-model="fromData.periodTime"
                                    :picker-options="pickerOptions"
                                    type="daterange"
                                    range-separator="-"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="fromSon">
                <label>Choose Send Time</label>
                <div class="content">
                  <el-form-item prop="SendValue"
                                class="W100">
                    Every
                    <el-select v-model="fromData.SendTimeType"
                               class="SendTimeType">
                      <el-option v-for="item in SendTimeTypeArray"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.label"></el-option>
                    </el-select>
                    <el-time-picker v-model="fromData.SendValue"></el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div>
              <el-button type="info"
                         style="margin:20px 20px 20px 0;"
                         plain>Cancel</el-button>
              <el-button type="primary"
                         style="margin:20px 20px 20px 0;"
                         @click="saveFun('fromRef')">Save</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <!-- rightBox -->
      <div class="rightBox">
        <h4>Preview</h4>
        <el-button type="primary"
                   class="sendMail"
                   @click="sendMail('fromRef')">Send Test Mail</el-button>
        <div ref="showBox">
          <div class="showBox"
               style="word-wrap:break-word;text-align:center;font-size:14px;width: 100%;margin: 0 auto;">
            <div>
              <iframe class="Template_iframe"
                      :src="fromData.url_template"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogFound :dialog='dialog'
                 :fromData="fromData"
                 :trueProductArray="trueProductArray"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "./Send_mail";
import router from '../../router'
import * as base from '../../assets/js/base'
export default {
  name: "NewsletterAdd",
  data () {
    return {
      emsp: "&emsp;",
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 1000 * 24 * 60 * 60;//设置选择明天之前的日期
        }
      },
      dialog: {
        show: false,
        title: "Send Mail",
        option: "edit"
      },
      loadingState: {},
      headerdata: {
        Authorization: localStorage.eleToken
      },
      Shop: {},
      TemplateSource: true,
      TemplateSourceRight: true,
      Template_iframe: false,
      fromData: {
        fromDataType: 'add',
        url_template: '',
        source: '',
        title: '',
        description: '',
        subject:'',
        SegmentValue: [],
        SegmentState: [],
        periodTime: [],
        SendTimeType: 'Monday',
        SendValue: new Date(2019, 9, 10, 18, 40),
      },
      SendTimeTypeArray: [
        { value: '0', label: 'Monday' },
        { value: '1', label: 'Tuesday' },
        { value: '2', label: 'Wednesday' },
        { value: '3', label: 'Thursday' },
        { value: '4', label: 'Friday' },
        { value: '5', label: 'Saturday' },
        { value: '6', label: 'Sunday' },
        { value: '7', label: '1st day of the month' },
        { value: '8', label: '15th day of the month' },
        { value: '9', label: 'Last day of the month' },
        { value: '10', label: 'Everyday' },
      ],
      SegmentArray: [],
      TemplateCenterArray: [],
      productArray: [],
      trueProductArray: [],
      rules: {
        SegmentValue: [{ required: true, message: 'Please Choose Segment', trigger: 'blur' }],
      }
    }
  },
  components: {
    DialogFound,
  },
  watch: {
    productArray: {
      handler: function () {
        this.trueProductArray = [];
        this.productArray.map(e => {
          if (e.state) {
            this.trueProductArray.push(e);
          }
        });
      },
      deep: true
    },
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      let _thisData = JSON.parse(localStorage["NewsletterSourceVal"]);
      this.fromData = _thisData;
      this.fromData.url_template = this.fromData.html;
      if (this.fromData.fromDataType == "add") {
        this.fromData.periodTime = [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)];
      } else if (this.fromData.fromDataType == "clone") {
        if (new Date(this.fromData.periodTime[0]).getTime() < new Date().getTime()) {
          this.fromData.periodTime = [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)];
        }
      }
      this.$axios.get(`/api/v1/customer_group/`)
        .then(res => {
          if (res.data.code == 1) {
            this.SegmentArray = res.data.data;
            this.SegmentValueChange();
          } else {
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
      this.$axios.get(`/api/v3/center_template/`)
        .then(res => {
          if (res.data.code == 1) {
            this.TemplateCenterArray = res.data.data.results;
          } else {
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
    },
    ProductTemplateFun (val) {
      this.TemplateCenterArray.map(e => {
        if (e.title === val) {
          this.fromData.title = e.title
          this.fromData.html = e.html
          this.fromData.description = e.description
          this.fromData.subject = e.subject
          this.fromData.periodTime = e.periodTime
          this.fromData.SendTimeType = e.SendTimeType
          this.fromData.SendValue = e.SendValue
          this.fromData.SendTimeType = e.SendTimeType
          this.fromData.url_template = e.url_template
        }
      })
    },
    SegmentStateChange () {
      if (this.fromData.SegmentState.length > 0) {
        let _arr = [];
        this.SegmentArray.map(e => {
          _arr.push(e.id);
        });
        this.fromData.SegmentValue = _arr;
      } else {        this.Segme
        this.fromData.SegmentValue = [];
      }
    },
    SegmentValueChange () {
      if (this.fromData.SegmentValue.length == this.SegmentArray.length) {
        this.fromData.SegmentState = ["Select All"];
      } else {
        if (this.fromData.SegmentState.length > 0) {
          this.fromData.SegmentState = [];
        }
      }
    },
    saveFun (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let
            _showHtml = this.fromData.html;
          let _thisData = {
            title: this.fromData.title,
            description: this.fromData.description,
            subject:this.fromData.SubjectText,
            customer_group_list: JSON.stringify(this.fromData.SegmentValue),
            send_rule: JSON.stringify({
              begin_time: base.dateFormat(this.fromData.periodTime[0]),
              end_time: base.dateFormat(this.fromData.periodTime[1]),
              cron_type: this.fromData.SendTimeType,
              cron_time: base.dateFormat(this.fromData.SendValue, "hour")
            }),
            html: _showHtml,
            enable: 0,
            source: 1
          }
          this.$axios.post(`/api/v1/email_template/`, _thisData)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({ message: "Successfully!", type: "success" });
                router.push('/NewsletterList');
              } else {
                this.$message(res.data.msg);
              }
            })
            .catch(error => {
              this.$message("Interface timeout!");
            });
        } else {
          let topNum = document.getElementsByClassName("rightContainer")[0].scrollTop;
          var time = setInterval(function () {
            if (topNum <= 0) {
              clearInterval(time)
            } else {
              document.getElementsByClassName("rightContainer")[0].scrollTop = topNum;
            }
            topNum = topNum - 200;
          }, 20);
        }
      });
    },
    sendMail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog.show = true;
        } else {
          this.$message.error('Incomplete information!');
        }
      });
    },
  },
}
</script>

<style>
.NewsletterAdd .leftBox {
  display: inline-block;
  width: 40%;
}
.NewsletterAdd .fromBox {
  position: relative;
  min-height: 500px;
  border: 1px solid #ccc;
  box-shadow: 4px 10px 10px #ccc;
  padding: 20px;
  margin-top: 20px;
}
.NewsletterAdd .rightBox {
  position: relative;
  width: calc(60% - 100px);
  display: inline-block;
  vertical-align: top;
  margin-left: 45px;
}
.NewsletterAdd .rightBox .sendMail {
  position: absolute;
  right: 0px;
  top: 15px;
}
.NewsletterAdd .showBox {
  min-height: 500px;
  border: 1px solid #ccc;
}
.NewsletterAdd .fromSon {
  color: #606266;
  margin-bottom: 20px;
}
.NewsletterAdd .fromSon label {
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 0;
  color: #000;
}
.NewsletterAdd .fromSon .content {
  position: relative;
}
.NewsletterAdd .littleMsg {
  font-size: 14px;
  color: #999;
}
.NewsletterAdd .bodyText .littleMsg {
  color: #606266;
}
.NewsletterAdd .bigBox {
  margin-bottom: 40px;
}
.NewsletterAdd textarea {
  height: 150px;
}
.NewsletterAdd .imgBigBox {
  padding: 10px;
  overflow: hidden;
  border: 1px solid #ccc;
  margin-top: 10px;
  padding-right: 0;
  cursor: pointer;
}
.NewsletterAdd .imgBox {
  width: calc(33.33333% - 10px);
  display: inline-block;
  margin-right: 10px;
  position: relative;
}
.NewsletterAdd .imgBox img {
  width: 100%;
}
.NewsletterAdd .imgBox .stateBox {
  position: absolute;
  left: 5px;
  top: 5px;
  border: 1px solid #000;
  border-radius: 4px;
  width: 24px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
}
.NewsletterAdd .imgBox .stateBox .el-icon-check {
  font-weight: 900;
  font-size: 32px;
  position: absolute;
  top: -5px;
  color: #000;
}
.NewsletterAdd .el-checkbox {
  width: 100%;
  padding: 0 !important;
  color: #333333 !important;
  font-weight: normal !important;
  padding-left: 5px !important;
}
.NewsletterAdd .SegmentValueBox {
  background: #f2f2f2;
}
.NewsletterAdd .SendTimeType {
  margin: 0 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.NewsletterAdd .uploadClass {
  z-index: 100;
}
.NewsletterAdd .uploadBtnBox {
  z-index: 200;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.NewsletterAdd .uploadBtnBox button {
  right: 90px;
  position: absolute;
  top: 60px;
}
.NewsletterAdd .el-form--inline .el-form-item__content {
  width: 100%;
}
.NewsletterAdd .bannerTextBox {
  position: absolute;
  width: 88%;
  background: #fff;
  z-index: 500;
  border-radius: 10px;
}
.NewsletterAdd .bannerTextBox .fromSon {
  width: 50%;
  display: inline-block;
}
.NewsletterAdd .bodyText .ql-container.ql-snow {
  height: 200px;
}
.NewsletterAdd .languageTextBox {
  position: fixed;
  width: 32%;
  background: #fff;
  z-index: 500;
  border-radius: 10px;
  bottom: 200px;
  left: 266px;
}
.NewsletterAdd .languageTextBox .fromSon {
  width: 50%;
  display: inline-block;
  margin-bottom: 0;
}
.NewsletterAdd .languageTextBox .el-form-item {
  margin-bottom: 0;
}
.NewsletterAdd .languageTextBox .fromSon label {
  padding: 0;
}
.NewsletterAdd .bannerText p {
  margin: 0 !important;
}
.NewsletterAdd .Template_iframe {
  width: 885px;
  height: 880px;
  border: none;
  overflow-x: hidden;
  box-shadow: 4px 10px 10px #ccc;
}
</style>