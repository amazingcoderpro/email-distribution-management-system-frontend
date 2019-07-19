<template>
    <div class="SendMail">
        <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false'>
            <div class="SendMail_input" style="padding: 20px 20px 50px 90px;">
                <el-input v-model="input" placeholder="请输入内容" style="width:500px;"></el-input>
                <el-button type="primary" style="background-color: rgba(51, 153, 153, 1);border:1px solid rgba(51, 153, 153, 1);margin-left:10px;">Send Test Mail</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"SendMail",
    props: {
        dialog: Object
    },
    data(){
        return{
            input:'',
        }
    }
}
</script>



