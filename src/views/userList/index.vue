<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="el_card_box" style="margin-top: 20px;">
      <!-- 1.搜索框，添加用户的按钮 -->
      <el-input placeholder="请输入内容" v-model="query" style=" width: 300px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" class="adduser" style="margin-left:14px">添加用户</el-button>
      <!-- 2.用户表格 -->
      <el-table :data="tableData" class="user_table" border style="width: 100%;text-align: center;">
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
      <!-- 3.添加分页 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userList",
  data() {
    return {
      pageinfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      tableData: []
    };
  },
  props: [],
  components: {},
  mounted() {},
  created() {
    this.getUserList();
  },
  methods: {
    /**
     * query:查询参数可以为空
     * pagenum:当前页码不能为空
     * pagesize:每页显示页数不能为空
     */
    // 获取用户列表
    getUserList() {
      // 获取token
      const token = localStorage.getItem("token");
      // 配置头信息
      this.$http.defaults.headers.Authorization = token;
      // 发送ajax请求
      this.$http({
        method: "get",
        url: "/users",
        params: this.pageinfo
      }).then(res => {
        console.log("res:", res);
        // 解构取值
        if (res.data && res.data.data) {
          var {
            data: { pagenum, total, users },
            meta: { msg, status }
          } = res.data;
        } else {
          var {
            meta: { msg, status }
          } = res.data;
        }
        if (status === 200) {
          this.tableData = users;
          this.pageinfo.pagenum = pagenum;
          this.total = total;
          this.$message({
            message: msg,
            type: "success"
          });
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style>
.user_table {
  margin-top: 20px;
  text-align: center;
}
</style>
