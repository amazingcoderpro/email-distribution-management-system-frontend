<template>
    <el-row class="menu_page leftMenu" ref="leftMenu">
        <el-col>
          <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo" router>
              <!-- <template v-for="(item,index) in items">
                  <el-menu-item  :index="item.menu_url" :key="index">
                      <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                  </el-menu-item>
                  <template v-for="subItem in item.childs">
                      <template>
                        <el-submenu v-if="subItem.childs.length != 0" :index="subItem.menu_url" :key="subItem.menu_url">
                            <template slot="title">{{ subItem.menu_name }}</template>
                        </el-submenu>
                        <el-menu-item  :index="subItem.menu_url" :key="subItem.menu_url"  v-else>
                          {{ subItem.menu_name }}
                        </el-menu-item>
                      </template>
                  </template>
              </template> -->
              <template v-for="item in items">
                  <template v-if="item.childs.length != 0">
                        <el-submenu :index="item.menu_url" :key="item.menu_url">
                          <template slot="title">
                              <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                          </template>
                          <template v-for="subItem in item.childs">
                              <template>
                                <el-submenu v-if="subItem.childs.length != 0" :index="subItem.menu_url" :key="subItem.menu_url">
                                    <template slot="title">{{ subItem.menu_name }}</template>
                                </el-submenu>
                                <el-menu-item  :index="subItem.menu_url" :key="subItem.menu_url"  v-else>
                                  {{ subItem.menu_name }}
                                </el-menu-item>
                              </template>
                          </template>
                      </el-submenu>
                  </template>
                  <!-- 没有二级菜单 -->
                  <template v-else>
                      <el-menu-item  :index="item.menu_url" :key="item.menu_url">
                          <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                      </el-menu-item>
                  </template>
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
      if(window.localStorage.getItem('user')){
        if(JSON.parse(window.localStorage.getItem('user')).username == "admin"){
          this.items.push(
            {"id":4,"menu_name":"Account","menu_url":"3333","parent_id":null,"icon":"iconfont icon-icon-","childs":[
              {"id":5,"menu_name":"Account Manage","menu_url":"/UploadExcel","parent_id":null,"icon":"iconfont icon-icon_pc","childs":[]},
              {"id":6,"menu_name":"Template Library","menu_url":"/TemplateLibrary","parent_id":null,"icon":"iconfont icon-icon_pc","childs":[]}
            ]},
            {"id":7,"menu_name":"System Setting","menu_url":"333","parent_id":null,"icon":"iconfont icon-edit","childs":[
              {"id":8,"menu_name":"Site Management","menu_url":"/SiteList","parent_id":null,"icon":"iconfont icon-icon_pc","childs":[]}
            ]},
            {"id":9,"menu_name":"Statistics","menu_url":"123","parent_id":null,"icon":"iconfont icon-guizezujian","childs":[
              {"id":10,"menu_name":"Trigger Statistics","menu_url":"/SiteStatistics","parent_id":null,"icon":"iconfont","childs":[]},
            ]},
          );
          this.$forceUpdate();
        }
      }
  },
  data() {
    return {
      // items: this.$store.getters.menu_tree
      // items: JSON.parse(window.localStorage.getItem('menu_tree'))
      items:[
          {"id":1,"menu_name":"DashBoard","menu_url":"/dashboard","parent_id":null,"icon":"iconfont icon-zhuye1","childs":[]},
          {"id":2,"menu_name":"Newsletters","menu_url":"/NewsletterList","parent_id":null,"icon":"iconfont icon-report1","childs":[]},
          {"id":3,"menu_name":"Flows","menu_url":"/FlowList","parent_id":null,"icon":"iconfont icon-kehujingli1","childs":[]},
          {"id":4,"menu_name":"Customers","menu_url":"/SegmentList","parent_id":null,"icon":"iconfont icon-touruguize","childs":[]},
          {"id":5,"menu_name":"Integration","menu_url":"/Integration","parent_id":null,"icon":"iconfont icon-yanjing1","childs":[]},
      ] 
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
