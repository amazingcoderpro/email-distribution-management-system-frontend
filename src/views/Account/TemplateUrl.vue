<template>
    <div class="Template_url">
        <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
            <div class="template_center">
                <el-form :inline="true" :model="TemplateUrl" class="demo-form-inline fromClass" label-width="100px">
                    <el-form-item label="Title" class="template_input">
                        <el-input v-model="TemplateUrl.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Description" class="template_input">
                        <el-input v-model="TemplateUrl.description"></el-input>
                    </el-form-item>
                    <el-form-item label="Template Url" class="template_input">
                        <el-input v-model="TemplateUrl.url_template"></el-input>
                    </el-form-item>
                    <div>
                        <el-button type="primary" style="margin:20px 0px 0px 100px;" @click="saveFun('fromRef')">Save</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script> 
import * as base from '../../assets/js/base'
import router from '../../router';
export default {
    inject:['reload'],
    name: "TemplateLibrary",
    props: {
            dialog: Object,
            itemData:Object
        }, 
    data() {
        return {
            TemplateUrl:{
                title:'',   
                description:'',
                url_template:''
            },
        }
    },
    methods:{
          saveFun(formName){
              this.$forceUpdate();
                  let _thisData = { 
                      title:this.TemplateUrl.title,
                      description:this.TemplateUrl.description,
                      url_template:this.TemplateUrl.url_template,
                      source:1
                    }
                    this.$axios.post(`/api/v3/center_template/`, _thisData)
                    .then(res => {
                        if(res.data.code == 1){
                            this.$message({message: "Successfully!",type: "success"});
                            this.dialog.show = false;
                            this.reload()// 强制页面刷新
                        }else{
                            this.$message(res.data.msg);
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    }); 
              },
          },
}
</script>

<style>
.Template_url .el-input__inner{width: 300px;}
.Template_url .template_input{margin-top: 20px;}
.Template_url{width: 97%;}
.Template_url .topictable{border-left: 0;border-right:0;} 
.Template_url .el-table__body-wrapper tbody td{border-right: 0;}
.Template_url .columnLable{font-weight: 700;margin-bottom: 10px;}
.Template_url .select_button{float: right;margin-right: 15px;}
.Template_url .ColumnTitle{cursor: pointer;}
.Template_url .switchShdow{cursor: pointer; position: absolute;left: 0;width: 50%;height: 34px;top: 40px;margin-left: 25%;}
.Template_url .columnContent{display: -webkit-box !important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:44px;}
</style>
