<template>
  <div class="SiteList">
    <ul id="breadcrumb">
      <li>
        <a href="/dashboard">
          <span class="el-icon-house"></span>Home
        </a>
      </li>
      <li>
        <a>
          <span class="el-icon-right"></span>Site Management
        </a>
      </li>
    </ul>
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline fromClass"
      label-width="100px"
    >
      <!-- Pinterest -->
      <el-form-item>
        <el-input v-model="searchData.name" placeholder="Search Store Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="edit" type="primary" @click="headSearch">Search</el-button>
      </el-form-item>
    </el-form>
    <div class="table_right">
      <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight">
        <el-table-column prop="name" align="center" label="Store Name" width="120">
          <template slot-scope="scope">
            <div class="columnContent">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="domain" label="Domain" align="center" width="200">
          <template slot-scope="scope">
            <div class="columnContent">{{scope.row.domain}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="email" align="center" label="Email" width="230">
          <template slot-scope="scope">
            <div class="columnContent" v-if="scope.row.email">{{scope.row.email}}</div>
            <div class="columnContent" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="url" align="center" label="Url" width="220">
          <template slot-scope="scope">
            <div class="columnContent" v-if="scope.row.url">
              <a :href="'http://' + scope.row.url" target="_blank">{{scope.row.url}}</a>
            </div>
            <div class="columnContent" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="timezone" align="center" label="Time Zone" width="230">
          <template slot-scope="scope">
            <div class="columnContent" v-if="scope.row.timezone">{{scope.row.timezone}}</div>
            <div class="columnContent" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" align="center" label="Create Time" width="180">
          <template slot-scope="scope">
            <div class="columnContent" v-if="scope.row.create_time">{{scope.row.create_time}}</div>
            <div class="columnContent" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="store_view_id" align="center" label="Store View ID" width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.view_id_status == 0">
              <el-button
                type="plain"
                @click="Viewid(scope.row)"
                v-if="scope.row.store_view_id"
              >{{scope.row.store_view_id}}</el-button>
              <el-button type="plain" v-else>---</el-button>
            </template>
            <template v-else-if="scope.row.view_id_status == 1">
              <el-button
                type="primary"
                @click="Viewid(scope.row)"
                v-if="scope.row.store_view_id"
              >{{scope.row.store_view_id}}</el-button>
            </template>
            <template v-else-if="scope.row.view_id_status == 2">
              <el-button
                type="warning"
                @click="Viewid(scope.row)"
                v-if="scope.row.store_view_id"
              >{{scope.row.store_view_id}}</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="State" label="State" align="center" width="120">
          <template slot-scope="scope">
            <template v-if="scope.row.store_status   == 0">
              <el-button icon="edit" type="primary" size="small">Pending review</el-button>
            </template>
            <template v-else-if="scope.row.store_status == 1">
              <el-button icon="edit" type="primary" size="small">Already opened</el-button>
            </template>
            <template v-else-if="scope.row.store_status == 2">
              <el-button icon="edit" type="primary" size="small">Disabled</el-button>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="store_status" align="center" label="Operation" width="100">
          <template slot-scope="scope">
            <div class="columnContent">
              <el-switch
                v-model="scope.row.store_status2"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <div class="switchShdow" @click="stateFun(scope.row)"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="Edit" align="center">
          <template slot-scope="scope">
            <el-button icon="edit" type="primary" size="small" @click="editFun(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        :page-sizes="page.pagesizes"
        :page-size="page.pagesize"
        @size-change="handleSizeChange"
        @current-change="current_change"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <DialogFound :dialog="dialog" :itemData="itemData"></DialogFound>
  </div>
</template>

<script>
import router from "../../router";
import * as base from "../../assets/js/base";
import DialogFound from "./SiteListEdit";
export default {
  name: "SiteList",
  components: {
    DialogFound
  },
  data() {
    return {
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      itemData: {},
      OperData: {},
      page: {
        total: 0, //默认数据总数
        pagesize: 10, //每页的数据条数
        pagesizes: [10, 20, 30, 40], //分组数量
        currentPage: 1 //默认开始页面
      },
      tableHeight: "100",
      searchData: {
        name: "",
        typeVal: ""
      },
      tableData: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight -
        document.getElementsByClassName("topictable")[0].offsetTop -
        150;
    }, 50);
    window.addEventListener("resize", () => {
      if (document.getElementsByClassName("topictable").length > 0) {
        this.tableHeight =
          window.innerHeight -
          document.getElementsByClassName("topictable")[0].offsetTop -
          150;
      }
    });
    this.init();
  },
  methods: {
    headSearch() {
        if(this.searchData.name !== ""){
          this.page.currentPage = 1
        }
        this.init()
    },
    init() {
      if (window.localStorage.getItem("user")) {
        if (
          JSON.parse(window.localStorage.getItem("user")).username != "admin"
        ) {
          router.push("/dashboard");
        }
      }
      let _url = `/api/v1/store/list/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
      if (this.searchData.name) {
        _url += `&name=${this.searchData.name}`;
      }
      this.$axios
        .get(_url)
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data.results;
            this.page.total = res.data.data.count;
            this.tableData.map(e => {
              e.store_status2 = e.store_status == 1 ? true : false;
              if (e.create_time) {
                e.create_time = base.dateFormat(e.create_time);
              }
            });
          } else {
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
    },
    editFun(row) {
      this.itemData = {
        id: row.id,
        name: row.name,
        domain: row.domain,
        email: row.email,
        url: row.url,
        store_view_id: row.store_view_id
      };
      this.dialog = {
        show: true,
        title: "SiteList Edit",
        option: "put"
      };
    },
    stateFun(row) {
      this.$confirm("Are you sure you wanna change state?", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        let _data = {
          store_id: row.id,
          store_status: row.store_status2
        };
        _data.store_status = _data.store_status ? "2" : "1";
        this.$axios
          .post(`/api/v1/store/status/`, _data)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: "success" });
              this.init();
            } else {
              this.$message({ message: res.data.msg });
            }
          })
          .catch(error => {
            this.$message("Interface timeout!");
          });
      });
    },
    Viewid(row) {
      this.$axios
        .post(`/api/v1/checkviewinfo/?&store_view_id=${row.store_view_id}`)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" });
            this.init();
          } else {
            this.$message("View ID exception");
          }
        });
    },
    current_change(val) {
      //点击数字时触发
      this.page.currentPage = val;
      this.init();
      this.$refs.topictable.bodyWrapper.scrollTop = 0;
    },
    handleSizeChange(val) {
      //修改每页显示多少条时触发
      this.page.pagesize = val;
      this.init();
      this.$refs.topictable.bodyWrapper.scrollTop = 0;
    }
  }
};
</script>

<style>
.SiteList .el-table th.is-leaf {
  border-right: 0;
}
.SiteList .topictable {
  border-left: 0;
  border-right: 0;
}
.SiteList .el-table__body-wrapper tbody td {
  border-right: 0;
}
.SiteList .fromClass {
  width: 97%;
}
.SiteList .titleClass {
  cursor: pointer;
}
.SiteList .titleClass:hover {
  color: #000;
}
.SiteList .el-table th.is-leaf {
  border-bottom: 1px solid #ccc;
}
.SiteList .el-button {
  border: none !important;
}
.SiteList .columnContent {
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.switchShdow {
  cursor: pointer;
  position: absolute;
  left: 0;
  width: 50%;
  height: 34px;
  top: 13px;
  margin-left: 25%;
}
</style>