<template>
  <div class="NewEditletterAdd">
    <ul id="breadcrumb">
      <li>
        <a href="/dashboard">
          <span class="el-icon-right"></span>Home
        </a>
      </li>
      <li>
        <a href="/FlowList">
          <span class="el-icon-right"></span> Flows
        </a>
      </li>
      <!-- <li><a><span class="el-icon-right"> </span>{{title}}</a></li> -->
      <li v-if="title">
        <a href="/Browse_Abandonment">
          <span class="el-icon-right"></span>
          {{title}}
        </a>
      </li>
      <li>
        <a href="/NewEditletterAdd">
          <span class="el-icon-right"></span>EditletterAdd
        </a>
      </li>
    </ul>
    <div class="bigBox">
      <div class="leftBox">
        <el-form
          :inline="true"
          :model="fromData"
          ref="fromRef"
          class="demo-form-inline fromClass"
          :rules="rules"
        >
          <h4>Edit Template</h4>
          <div class="fromBox">
            <div class="fromSon">
              <el-button
                @click="bannerTextState = !bannerTextState"
                type="primary"
              >Adjust text position</el-button>
              <el-button
                @click="languageDataState = !languageDataState"
                type="primary"
              >Change Language</el-button>
            </div>
            <div
              class="bannerTextBox"
              :style="bannerTextState?'border: 1px solid #ccc;padding: 20px;':''"
            >
              <el-collapse-transition>
                <div v-show="bannerTextState" style="width:100%;">
                  <el-button
                    @click="bannerTextState = !bannerTextState"
                    style="position: absolute;right: 18px;"
                  >Close</el-button>
                  <div class="fromSon">
                    <label>Top</label>
                    <div class="content">
                      <el-form-item class="WW100">
                        <el-input-number
                          v-model="bannerText.top"
                          maxlength="120"
                          placeholder="width"
                        ></el-input-number>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <label>Left</label>
                    <div class="content">
                      <el-form-item class="WW100">
                        <el-input-number
                          v-model="bannerText.left"
                          maxlength="120"
                          placeholder="width"
                        ></el-input-number>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <label>Width</label>
                    <div class="content">
                      <el-form-item class="WW100">
                        <el-input-number
                          v-model="bannerText.width"
                          maxlength="120"
                          placeholder="width"
                        ></el-input-number>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <label>Font Size</label>
                    <div class="content">
                      <el-form-item class="WW100">
                        <el-input-number
                          v-model="bannerText.fontSize"
                          :min="12"
                          :max="20"
                          maxlength="120"
                          placeholder="width"
                        ></el-input-number>
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
            <div
              class="languageTextBox"
              :style="languageDataState?'border: 1px solid #ccc;padding: 20px;':''"
            >
              <el-collapse-transition>
                <div v-show="languageDataState" style="width:100%;">
                  <el-button
                    @click="languageDataState = !languageDataState"
                    style="position: absolute;right: 18px;z-index: 500;top: 9px;"
                  >Close</el-button>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="ITEM Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.items"
                          placeholder="ITEM(S)"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Price Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.price"
                          placeholder="UNIT PRICE"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Quantity Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.quantity"
                          placeholder="QUANTITY"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Amount Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.amount"
                          placeholder="AMOUNT"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Pay Button Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.pay"
                          placeholder="CHECK TO PAY"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Copyright Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.Copy"
                          placeholder="Copyright,All Rights Reserved"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Unsubscribe Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.unsubscribe"
                          placeholder="UNSUBSCRIBE"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Help Center Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.helpCenter"
                          placeholder="HELP CENTER"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Privacy Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.privacy"
                          placeholder="PRIVACY POLICY"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="About Us Text" class="W300">
                        <el-input
                          v-model="fromData.languageData.aboutUs"
                          placeholder="ABOUT US"
                          class="W300"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="fromSon">
                    <div class="content">
                      <el-form-item label="Bottom Text" class="W300">
                        <el-input
                          type="textarea"
                          v-model="fromData.languageData.bottom"
                          placeholder="This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"
                          class="W300"
                        ></el-input>
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
                  <el-tooltip class="questionTooltip" effect="dark" content="发送邮件的主题，即用户收到邮件的标题" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
              </div>
            </div>
            <div class="fromSon">
              <label>HeadingText</label>
              <div class="content">
                <el-form-item class="W100">
                  <el-input v-model="fromData.HeadingText" class="W100" maxlength="120"></el-input>
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
                    :before-upload="beforeAvatarUploadLogo"
                  >
                    <img
                      v-if="fromData.logoUrl && fromData.logoUrl != -1"
                      :src="fromData.logoUrl"
                      class="avatar"
                    />
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
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      style="width: 400px!important;"
                      v-if="fromData.bannerUrl && fromData.bannerUrl != -1"
                      :src="fromData.bannerUrl"
                      class="avatar"
                    />
                    <i
                      style="width: 400px!important;"
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
                <span class="littleMsg">Image must be in JPG or PNG or JIF format. Max size 5MB</span>
              </div>
            </div>
            <div class="fromSon">
              <label>Shopping Cart</label>
              <div class="content">
                <el-form-item class="W100">
                  <el-switch
                    v-model="fromData.is_cart"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                </el-form-item>
              </div>
            </div>
            <div class="fromSon">
              <label>Headline</label>
              <div class="content">
                <el-form-item class="W100">
                  <el-input v-model="fromData.Headline" maxlength="120"></el-input>
                </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="位于HeadingText之下，可自行调节" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
              </div>
            </div>
              <div class="fromSon">
                <label>Middle Line</label>
                <div class="content">
                  <el-form-item class="W100">
                    <el-input v-model="fromData.middle_text"></el-input>
                  </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="位于banner和产品中间的文案信息" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
                </div>
              </div>
            <div class="fromSon">
              <label>Body Text</label>
              <div class="content bodyText">
                <quill-editor
                  ref="bodyTextRef"
                  v-model="fromData.bodyText"
                  class="myQuillEditor"
                  @change="bodyTextChange($event)"
                />
                <span
                  class="littleMsg"
                >Shop Name:*[tr_shop_name]*&emsp;&emsp;&emsp;&emsp;First Name:*[tr_firstname]*&emsp;&emsp;&emsp;&emsp; Space:{{emsp}}</span>
              </div>
            </div>
            <div class="fromSon">
              <label>Product Title</label>
              <div class="content">
                <el-form-item class="W100">
                  <el-input v-model="fromData.productTitle" class="W100" maxlength="120"></el-input>
                </el-form-item>
                  <el-tooltip class="questionTooltip" effect="dark" content="产品的文案标题" placement="top-start">
                    <i class="questionIcon el-icon-info"></i>
                  </el-tooltip>
              </div>
            </div>
            <div class="fromSon">
              <label>Custom Product Recommendations</label>
              <div class="content">
                <el-select v-model="fromData.searchImgType" class="W100" @change="searchImgType">
                  <el-option
                    v-for="(item,index) in searchImgTypeArray"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="fromSon checkAll">
              <div class="stateBox" @click="checkAllFn">
                <span v-if="checkAllState" class="el-icon-check"></span>
              </div>
              全选,共计 {{checkNum}} 条
            </div>
            <div class="fromSon imgBigBox" v-if="productArray.length>0">
              <div
                v-for="(item,index) in productArray"
                :key="index"
                class="imgBox"
                @click="imgClick(item)"
              >
                <!-- <a :href="item.url" target="_blank">
                                    <img :src="item.image_url" />
                </a>-->
                <img :src="item.image_url" />
                <div class="stateBox">
                  <span v-if="item.state" class="el-icon-check"></span>
                </div>
              </div>
            </div>
            <span class="littleMsg" v-if="productArray.length>0">Max 28 products</span>
          </div>
          <div>
            <el-button type="info" style="margin:20px 20px 20px 0;" plain @click="goBack">Cancel</el-button>
            <el-button
              type="primary"
              style="margin:20px 20px 20px 0;"
              @click="saveFun('fromRef')"
            >Save</el-button>
          </div>
        </el-form>
      </div>
      <div class="rightBox">
        <h4>Preview</h4>
        <div ref="showBox">
          <div
            class="showBox"
            style="word-wrap:break-word;text-align:center;font-size:14px;width: 650px;margin: 0 auto;"
          >
            <div style="width: 100%;padding:20px 0;">
              <div
                v-if="fromData.logoUrl && fromData.logoUrl != -1"
                style="width: 30%;margin: 0 auto;"
              >
                <a :href="'http://'+fromData.domain" target="_blank">
                  <img :src="fromData.logoUrl" style="width: 100%;" />
                </a>
              </div>
              <div
                v-else
                style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 12px 0;width: 30%;margin: 0 auto;"
              >YOUR LOGO</div>
            </div>
            <div style="width: 100%;padding-bottom: 20px;position: relative;overflow: hidden;">
              <template>
                <div
                  class="bannerText"
                  :style="'position: absolute;left: '+bannerText.left+'px;top:'+bannerText.top+'px;text-align: '+bannerText.textAlign+';width:'+bannerText.width+'px;line-height: 30px;font-size:'+bannerText.fontSize+'px;color:'+bannerText.color +';border:'+ bannerText.border+';'"
                >
                  <!-- <div>{{fromData.SubjectText}}</div> -->
                  <div>{{fromData.HeadingText}}</div>
                  <div>{{fromData.Headline}}</div>
                  <div v-html="fromData.bodyHtml"></div>
                </div>
              </template>
              <template>
                <div v-if="fromData.bannerUrl && fromData.bannerUrl != -1" style="width: 100%;">
                  <img :src="fromData.bannerUrl" style="width: 100%;" />
                </div>
                <div v-else-if="fromData.bannerUrl == -1" style="width: 30%;margin: 0 auto;"></div>
                <div
                  v-else
                  style="font-size: 30px;border: 1px solid #ddd;font-weight: 900;padding: 130px;"
                >YOUR BANNER</div>
              </template>
            </div>
            <div
              style="width: 100%;padding-bottom: 20px;position: relative;"
              v-if="fromData.is_cart"
            >
              <template>
                <div
                  style="position: absolute;width: 100%;height: 3px;background: #000;top: 40px;left: 0;"
                ></div>
                <table
                  style="width: 100%;font-weight: 800;"
                  border="0"
                  cellspacing="0"
                >
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
                        <template
                          v-if="fromData.languageData.quantity"
                        >{{fromData.languageData.quantity}}</template>
                        <template v-else>QUANTITY</template>
                      </td>
                      <td>
                        <template
                          v-if="fromData.languageData.amount"
                        >{{fromData.languageData.amount}}</template>
                        <template v-else>AMOUNT</template>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    *[tr_cart_products]*
                    <!-- <tr>
                                            <td style="padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #E8E8E8;margin: 10px 0;">
                                                <div style="width: 35%;display: inline-block;">
                                                    <img src="../../assets/img/none.png" style="width: 100%;"/>
                                                </div>
                                                <div style="width: 60%;display: inline-block;vertical-align: top;margin-left: 20px;line-height: 26px;">
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
                    </tr>-->
                  </tbody>
                </table>
              </template>
            </div>
            <div style="width: 100%;padding-bottom: 20px;text-align: right" v-if="fromData.is_cart">
              <a
                href="*[tr_abandoned_checkout_url]*"
                style="cursor: pointer; color: #fff;background: #000;padding: 10px;font-weight: 800;display: inline-block;margin-right: 20px;"
              >
                <template v-if="fromData.languageData.pay">{{fromData.languageData.pay}}</template>
                <template v-else>CHECK TO PAY</template>
              </a>
            </div>
            <div
              class="*[tr_products_title]*"
              style="width: 100%;padding-bottom: 20px;font-size: 20px;font-weight: 800;"
              v-if="fromData.searchImgType != 'no product'"
            >{{fromData.productTitle}}</div>
              <div
                style="width: 100%;padding-bottom: 20px;font-size: 20px;font-weight: 800;"
                v-if="fromData.middle_text"
              >{{fromData.middle_text}}</div>
            <div style="padding: 20px 12px;">
              <template v-if="fromData.searchImgType != 'no product'">*[tr_top_products]*</template>
              <!-- <template v-for="(item,index) in productArray" >
                                <div :key="index" v-if="item.state" style="width:48%;margin:10px;display:inline-block;vertical-align: top;">
                                    <a :href="item.url">
                                        <img :src="item.image_url" style="width:100%;"/>
                                    </a>
                                    <h3 style="font-weight:700;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px;">{{item.name}}</h3>
                                </div>
              </template>-->
            </div>
            <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
              <a href="*[tr_store_url]*" target="_blank">*[tr_domain]*</a>
              @2006-{{new Date().getFullYear()}}
              <template
                v-if="fromData.languageData.Copy"
              >{{fromData.languageData.Copy}}</template>
              <template v-else>Copyright,All Rights Reserved</template>
            </div>
            <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
              <a
                href="*[link_unsubscribe]*"
                style="text-decoration: none;cursor: pointer; color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;"
                target="_blank"
              >
                <template
                  v-if="fromData.languageData.unsubscribe"
                >{{fromData.languageData.unsubscribe}}</template>
                <template v-else>UNSUBSCRIBE</template>
              </a>
              <a
                href="*[tr_help_center_url]*"
                style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;"
                target="_blank"
              >
                <template
                  v-if="fromData.languageData.helpCenter"
                >{{fromData.languageData.helpCenter}}</template>
                <template v-else>HELP CENTER</template>
              </a>
              <a
                href="*[tr_privacy_policy_url]*"
                style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;border-right: 2px solid #ccc;font-size: 24px;"
                target="_blank"
              >
                <template v-if="fromData.languageData.privacy">{{fromData.languageData.privacy}}</template>
                <template v-else>PRIVACY POLICY</template>
              </a>
              <a
                href="*[tr_about_us_url]*"
                style="text-decoration: none;cursor: pointer;color: #FE222E;padding: 0 10px;font-size: 24px;"
                target="_blank"
              >
                <template v-if="fromData.languageData.aboutUs">{{fromData.languageData.aboutUs}}</template>
                <template v-else>ABOUT US</template>
              </a>
            </div>
            <div style="width: calc(100% - 24px);padding: 20px 12px;text-align:center;">
              <template v-if="fromData.languageData.bottom">{{fromData.languageData.bottom}}</template>
              <template
                v-else
              >This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*</template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogFound :dialog="dialog" :fromData="fromData"></DialogFound>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import DialogFound from "./Send_mail";
import router from "../../router";
import * as base from "../../assets/js/base";
export default {
  name: "NewEditletterAdd",
  data() {
    return {
        checkAllState:true,
      checkNum: 0,
      emsp: "&emsp;",
      content: "",
      editorOption: {},
      title: "",
      id: -1,
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
      bannerTextState: false,
      bannerText: {
        width: 400,
        left: 10,
        top: 10,
        fontSize: 14,
        textAlign: "left",
        color: "#000",
        border: ""
      },
      fromDataType: "",
      languageDataState: false,
      fromData: {
        is_cart: true,
        Title: "",
        description: "",
        SubjectText: "",
        HeadingText: "",
        logoUrl: "",
        domain: "",
        bannerUrl: "",
        Headline: "",
        middle_text:'',
        bodyText: "",
        bodyHtml: "",
        productTitle: "",
        searchImgType: "top_three",
        SegmentValue: [],
        SegmentState: [],
        periodTime: [new Date(2019, 9, 1, 0, 0), new Date(2019, 9, 2, 0, 0)],
        SendTimeType: "Monday",
        SendValue: new Date(2019, 9, 10, 18, 40),
        languageData: {
          items: "ITEM(S)",
          price: "UNIT PRICE",
          quantity: "QUANTITY",
          amount: "AMOUNT",
          pay: "CHECK TO PAY",
          Copy: "Copyright,All Rights Reserved",
          unsubscribe: "UNSUBSCRIBE",
          helpCenter: "HELP CENTER",
          privacy: "PRIVACY POLICY",
          aboutUs: "ABOUT US",
          bottom:
            "This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"
        }
      },
      SendTimeTypeArray: [
        { value: "0", label: "Monday" },
        { value: "1", label: "Tuesday" },
        { value: "2", label: "Wednesday" },
        { value: "3", label: "Thursday" },
        { value: "4", label: "Friday" },
        { value: "5", label: "Saturday" },
        { value: "6", label: "Sunday" },
        { value: "7", label: "1st day of the month" },
        { value: "8", label: "15th day of the month" },
        { value: "9", label: "Last day of the month" }
      ],
      searchImgTypeArray: [
        { value: "top_three", label: "Top 28 products in last 3 days" },
        { value: "top_seven", label: "Top 28 products in last 7 days" },
        { value: "top_fifteen", label: "Top 28 products in last 15 days" },
        { value: "top_thirty", label: "Top 28 products in last 30 days" },
        // {value: 'Shopping cart goods',label: 'Shopping cart goods'},
        {
          value: "Personal Product Recommendation",
          label: "Personal Product Recommendation"
        },
        {
          value: "Relevant product recommendation",
          label: "Relevant Product Recommendation"
        },
        { value: "no product", label: "No Product" }
      ],
      productArray: [],
      trueProductArray: [],
      top_product: {
        top_three: [],
        top_seven: [],
        top_fifteen: [],
        top_thirty: []
      },
      rules: {
        SubjectText: [
          {
            required: true,
            message: "Please enter SubjectText",
            trigger: "change"
          }
          // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur" }
        ],
        HeadingText: [
          {
            required: true,
            message: "Please enter HeadingText",
            trigger: "change"
          }
          // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
        ],
        logoUrl: [
          { required: true, message: "Please choose logo", trigger: "change" }
        ],
        bannerUrl: [
          { required: true, message: "Please choose banner", trigger: "change" }
        ],
        Headline: [
          {
            required: true,
            message: "Please enter Headline",
            trigger: "change"
          }
          // { min: 5, max: 120, message: "Length of 5 to 120 characters", trigger: "blur"}
        ],
        bodyText: [
          {
            required: true,
            message: "Please enter bodyText",
            trigger: "change"
          }
        ],
        periodTime: [
          {
            required: true,
            message: "Please choose Valid Period",
            trigger: "change"
          }
        ],
        SegmentValue: [
          { required: true, message: "Please Choose Segment", trigger: "blur" }
        ],
        SendValue: [{ required: true, message: "Please Choose Time" }]
      }
    };
  },
  components: {
    DialogFound,
    quillEditor
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
    }
  },
  mounted() {
    this.init();
  },
  methods: {
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
    init() {
      let _thisData = JSON.parse(localStorage["FlowsVal"]);
      this.fromDataType = _thisData.fromDataType ? _thisData.fromDataType : "";
      this.title = _thisData.title;
      this.$axios
        .get(`/api/v1/top_product/`)
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data.top_three) {
              this.top_product.top_three = JSON.parse(res.data.data.top_three);
            }
            if (res.data.data.top_seven) {
              this.top_product.top_seven = JSON.parse(res.data.data.top_seven);
            }
            if (res.data.data.top_fifteen) {
              this.top_product.top_fifteen = JSON.parse(
                res.data.data.top_fifteen
              );
            }
            if (res.data.data.top_thirty) {
              this.top_product.top_thirty = JSON.parse(
                res.data.data.top_thirty
              );
            }
            this.searchImgType();
          } else {
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
      this.$axios
        .get(`/api/v1/store/`)
        .then(res => {
          if (res.data.code == 1) {
            this.Shop = res.data.data[0];
            this.fromData.logoUrl = this.Shop.logo;
            this.fromData.domain = this.Shop.domain;
          } else {
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
      if (!base.getQueryString("id")) {
        this.id = -1;
      } else {
        this.id = base.getQueryString("id");
      }
      if (this.id != -1) {
        this.$axios
          .get(`/api/v1/email_template/detail/${this.id}/`)
          .then(res => {
            if (res.data.code == 1) {
              this.fromData.is_cart = res.data.data.is_cart ? true : false;
              this.fromData.SubjectText = res.data.data.subject;
              this.fromData.HeadingText = res.data.data.heading_text;
              this.fromData.logoUrl = res.data.data.logo;
              this.fromData.bannerUrl = res.data.data.banner;
              this.fromData.Headline = res.data.data.headline;
              this.fromData.middle_text = res.data.data.middle_text;
              this.fromData.bodyText = res.data.data.body_text;
              this.fromData.productTitle = res.data.data.product_title;
              this.fromData.searchImgType = res.data.data.product_condition;
              if (res.data.data.banner_text) {
                this.bannerText = JSON.parse(res.data.data.banner_text);
              }
              if (res.data.data.customer_text) {
                this.fromData.languageData = JSON.parse(
                  res.data.data.customer_text
                );
              } else {
                this.fromData.languageData = {
                  items: "ITEM(S)",
                  price: "UNIT PRICE",
                  quantity: "QUANTITY",
                  amount: "AMOUNT",
                  pay: "CHECK TO PAY",
                  Copy: "Copyright,All Rights Reserved",
                  unsubscribe: "UNSUBSCRIBE",
                  helpCenter: "HELP CENTER",
                  privacy: "PRIVACY POLICY",
                  aboutUs: "ABOUT US",
                  bottom:
                    "This email was sent a notification-only address that cannot accept incoming email PLEASE DO NOT REPLY to this message. if you have any questions or concerns.please email us:*[tr_service_email]*"
                };
              }
              this.bodyTextChange();
            } else {
              this.$message("Acquisition failure!");
            }
          })
          .catch(error => {
            this.$message("Interface timeout!");
          });
      }
    },
    imgClick(item) {
      item.state = !item.state;
        this.checkNum = 0;
        this.trueProductArray = []
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
      if (response.data.base64_str) {
        this.fromData.logoUrl = response.data.base64_str;
      }
    },
    bannerSuccess(response, file, fileList) {
      if (response.data.base64_str) {
        this.fromData.bannerUrl = response.data.base64_str;
      }
    },
    beforeAvatarUploadLogo(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("JPG、png、gif");
      }
      if (!isLt2M) {
        this.$message.error("No more than 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("JPG、png、gif");
      }
      if (!isLt2M) {
        this.$message.error("No more than 5MB!");
      }
      return isJPG && isLt2M;
    },
    saveFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$forceUpdate();
          let _showHtml =
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><title>jquery</title><style>';
          _showHtml +=
            "a:hover{text-decoration: underline!important; }.hide{display:none!important;}.bannerText{border:0px!important;}.bannerText p{margin:0!important;}";
          // _showHtml += '</style></head><body><div style="width:880px;margin:0 auto;">';
          _showHtml +=
            '</style></head><body><div style="width:650px;margin:0 auto;">';
          _showHtml += this.$refs.showBox.innerHTML;
          _showHtml += "</div></body></html>";
          _showHtml +=
            '<img src="https://smartsend.seamarketings.com/api/v1/mail/read/?code=*[tr_mail_send_code]*" style="width:1px;height:1px;opacity:0.1;" />';
          if (!this.fromData.logoUrl) {
            _showHtml = _showHtml.replace(
              "font-weight: 900; padding: 12px 0px; width: 30%; margin: 0px auto;",
              "display:none!important;"
            );
          }
          let _thisData = {
            is_cart: this.fromData.is_cart ? 1 : 0,
            subject: this.fromData.SubjectText,
            heading_text: this.fromData.HeadingText,
            logo: this.fromData.logoUrl,
            banner: this.fromData.bannerUrl,
            headline: this.fromData.Headline,
            middle_text: this.fromData.middle_text,
            body_text: this.fromData.bodyText,
            product_condition: this.fromData.searchImgType,
            product_title: this.fromData.productTitle,
            banner_text: JSON.stringify(this.bannerText),
            customer_group_list: JSON.stringify(this.fromData.SegmentValue),
            send_rule: "{}",
            html: _showHtml,
            customer_text: JSON.stringify(this.fromData.languageData)
          };
          if (this.fromData.searchImgType != "Shopping cart goods") {
            _thisData.product_list = JSON.stringify(this.trueProductArray);
          }
          if (this.fromDataType == "preview") {
            this.$axios
              .put(`/api/v1/email_template/detail/${this.id}/`, _thisData)
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({ message: "Successfully!", type: "success" });
                  let _thisData = JSON.parse(localStorage["FlowsVal"]);
                  let _email_delay = JSON.parse(_thisData.email_delay);
                  _email_delay[_thisData.index].SubjectText =
                    res.data.data.subject;
                  _email_delay[_thisData.index].value = res.data.data.id;
                  _thisData.email_delay = JSON.stringify(_email_delay);
                  localStorage.setItem("FlowsVal", JSON.stringify(_thisData));
                  router.push("/Browse_Abandonment");
                } else {
                  this.$message(res.data.msg);
                }
              })
              .catch(error => {
                this.$message("Interface timeout!");
              });
          } else {
            this.$axios
              .post(`/api/v1/email_template/trigger/`, _thisData)
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({ message: "Successfully!", type: "success" });
                  let _thisData = JSON.parse(localStorage["FlowsVal"]);
                  let _email_delay = JSON.parse(_thisData.email_delay);
                  _email_delay[_thisData.index].SubjectText =
                    res.data.data.subject;
                  _email_delay[_thisData.index].value = res.data.data.id;
                  _thisData.email_delay = JSON.stringify(_email_delay);
                  localStorage.setItem("FlowsVal", JSON.stringify(_thisData));
                  router.push("/Browse_Abandonment");
                } else {
                  this.$message(res.data.msg);
                }
              })
              .catch(error => {
                this.$message("Interface timeout!");
              });
          }
        } else {
          let topNum = document.getElementsByClassName("rightContainer")[0]
            .scrollTop;
          var time = setInterval(function() {
            if (topNum <= 0) {
              clearInterval(time);
            } else {
              document.getElementsByClassName(
                "rightContainer"
              )[0].scrollTop = topNum;
            }
            topNum = topNum - 200;
          }, 20);
        }
      });
    },
    sendMail(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialog.show = true;
        } else {
          this.$message.error("Incomplete information!");
        }
      });
    },
    searchImgType() {
      if (
        this.fromData.searchImgType == "Shopping cart goods" ||
        this.fromData.searchImgType == "no product" ||
        this.fromData.searchImgType == "Personal Product Recommendation" ||
        this.fromData.searchImgType == "Relevant product recommendation"
      ) {
        this.productArray = [];
      } else {
        this.productArray = this.top_product[this.fromData.searchImgType];
        console.log(this.productArray);
        this.productArray.map(e => {
          e.state = true;
        });
      }
      this.productArray = this.productArray;
    },
    bodyTextChange() {
      this.fromData.bodyHtml = this.fromData.bodyText.replace(/&amp;/g, "&");
      this.$forceUpdate();
    }
  },
  beforeDestroy() {}
};
</script>

<style>
.NewEditletterAdd a:hover {
  text-decoration: underline !important;
}
.NewEditletterAdd .leftBox {
  display: inline-block;
  width: 40%;
}
.NewEditletterAdd .fromBox {
  position: relative;
  min-height: 500px;
  border: 1px solid #ccc;
  box-shadow: 4px 10px 10px #ccc;
  padding: 20px;
}
.NewEditletterAdd .rightBox {
  position: relative;
  width: calc(60% - 100px);
  display: inline-block;
  vertical-align: top;
  margin-left: 45px;
}
.NewEditletterAdd .rightBox .sendMail {
  position: absolute;
  right: 0px;
  top: 15px;
}
.NewEditletterAdd .showBox {
  min-height: 500px;
  border: 1px solid #ccc;
}
.NewEditletterAdd .fromSon {
  color: #606266;
  margin-bottom: 20px;
}
.NewEditletterAdd .fromSon label {
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 0;
  color: #000;
}
.NewEditletterAdd .fromSon .content {
  position: relative;
}
.NewEditletterAdd .littleMsg {
  font-size: 14px;
  color: #999;
}
.NewEditletterAdd .bodyText .littleMsg {
  color: #606266;
}
.NewEditletterAdd .bigBox {
  margin-bottom: 40px;
}
.NewEditletterAdd textarea {
  height: 150px;
}
.NewEditletterAdd .imgBigBox {
  padding: 10px;
  overflow: hidden;
  border: 1px solid #ccc;
  margin-top: 10px;
  padding-right: 0;
  cursor: pointer;
}
.NewEditletterAdd .imgBox {
  width: calc(33.33333% - 10px);
  display: inline-block;
  margin-right: 10px;
  position: relative;
}
.NewEditletterAdd .imgBox img {
  width: 100%;
  height: 254px;
  object-fit: cover;
}
.NewEditletterAdd .checkAll {
  height: 40px;
  position: relative;
  padding-left: 50px;
  line-height: 40px;
}
.NewEditletterAdd .checkAll .stateBox {
  position: absolute;
  left: 15px;
  top: 5px;
  border: 1px solid #000;
  border-radius: 4px;
  width: 24px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
}
.NewEditletterAdd .checkAll .stateBox .el-icon-check {
  font-weight: 900;
  font-size: 32px;
  position: absolute;
  top: -5px;
  color: #000;
}
.NewEditletterAdd .imgBox .stateBox {
  position: absolute;
  left: 5px;
  top: 5px;
  border: 1px solid #000;
  border-radius: 4px;
  width: 24px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
}
.NewEditletterAdd .imgBox .stateBox .el-icon-check {
  font-weight: 900;
  font-size: 32px;
  position: absolute;
  top: -5px;
  color: #000;
}
.NewEditletterAdd .el-checkbox {
  width: 40%;
}
.NewEditletterAdd .SendTimeType {
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
.NewEditletterAdd .el-form--inline .el-form-item__content {
  width: 100%;
}
.NewEditletterAdd .bannerTextBox {
  position: absolute;
  width: 88%;
  background: #fff;
  z-index: 500;
  border-radius: 10px;
}
.NewEditletterAdd .bannerTextBox .fromSon {
  width: 50%;
  display: inline-block;
}
.NewEditletterAdd .bodyText .ql-container.ql-snow {
  height: 200px;
}
.NewEditletterAdd .languageTextBox {
  position: fixed;
  width: 35%;
  background: #fff;
  z-index: 500;
  border-radius: 10px;
  bottom: 100px;
  left: 266px;
}
.NewEditletterAdd .languageTextBox .fromSon {
  margin-bottom: 0;
}
.NewEditletterAdd .languageTextBox .el-form-item {
  margin-bottom: 0;
}
.NewEditletterAdd .languageTextBox .fromSon label {
  padding: 0;
}
.NewEditletterAdd .languageTextBox .fromSon {
  width: 50%;
  display: inline-block;
}
.NewEditletterAdd .bannerText p {
  margin: 0 !important;
}
</style>