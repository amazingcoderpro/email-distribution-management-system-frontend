<template>
    <el-row class="menu_page leftMenu" ref="leftMenu">
         <el-col>
           <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo" router>
              <template v-for="(item,index) in items">
                  <el-menu-item  :index="item.menu_url" :key="index">
                      <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                  </el-menu-item>
              </template>
          </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  computed: {
    // items () {
    //   return window.localStorage.getItem('menu_tree') ? JSON.parse(window.localStorage.getItem('menu_tree')) : this.$store.getters.menu_tree
    // }
  },
  created() {
  },
  mounted() {
      setTimeout(() => {
        this.leftHeight = window.innerHeight - this.$refs.leftMenu.$el.offsetTop +"px";
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("leftMenu").length>0){
            this.leftHeight = window.innerHeight - document.getElementsByClassName("leftMenu")[0].offsetTop +"px";
        }
      });
  },
  data() {
    return {
      // items: this.$store.getters.menu_tree
      // items: JSON.parse(window.localStorage.getItem('menu_tree'))
      items:[
              {"id":1,"menu_name":"DashBoard","menu_url":"/dashboard","parent_id":null,"icon":"iconfont icon-zhuye1","childs":[]},
              {"id":2,"menu_name":"Newsletters","menu_url":"/NewsletterList","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
              {"id":3,"menu_name":"Flows","menu_url":"/FlowList","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
              {"id":4,"menu_name":"Customers","menu_url":"/SegmentList","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
              {"id":5,"menu_name":"Integration","menu_url":"/Integration","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
              {"id":6,"menu_name":"Image Library","menu_url":"/ImageList","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
            ]  
            // ,
            // "childs":[
            //   {"id":3,"menu_name":"Daily Report","menu_url":"/sub_account_daily_report","parent_id":2,"icon":null,"childs":[]},
            //   {"id":7,"menu_name":"Sub-Account Report","menu_url":"/sub_account_report","parent_id":2,"icon":null,"childs":[]}
            // ]
    };
  },
  methods:{
  }
  
};
</script>
<style scoped>
.menu_page{position:fixed;top:71px;left:0;bottom:0;background-color:#324057;z-index:99;overflow-y:auto;}
.el-menu{border:none;}
.fa-margin{margin-right:5px;}
.el-menu-vertical-demo:not(.el-menu--collapse){width:255px;min-height:400px;}
.el-menu-vertical-demo{width:35px;}
.el-submenu .el-menu-item{min-width:180px;}
.hiddenDropdown,.hiddenDropname{display:none;}
a{text-decoration:none;}
.iconfont{padding-right:10px;font-size:25px;}
</style>
