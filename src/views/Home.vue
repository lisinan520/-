<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- logo系统名称头部信息 -->
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">公司名称-Logo</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">后台管理系统</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">退出</div>
          </el-col>
        </el-row>
        <!-- 结束 -->
      </el-header>
      <el-container>
        <el-aside width="200px" class="el_aside">
          <!-- 左侧导航开始 -->
          <el-menu
            default-active="1"
            unique-opened="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#363d40"
            text-color="#fff"
            @close="handleClose"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="home">
                <i class="el-icon-s-grid"></i>
                用户列表
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">
                  <i class="el-icon-s-grid"></i>
                角色列表
                </el-menu-item>
              <el-menu-item index="2-1">
                  <i class="el-icon-s-grid"></i>权限列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1"> <i class="el-icon-s-grid"></i>商品列表</el-menu-item>
              <el-menu-item index="3-1"> <i class="el-icon-s-grid"></i>分类参数</el-menu-item>
              <el-menu-item index="3-1"> <i class="el-icon-s-grid"></i>商品分类</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1"> <i class="el-icon-s-grid"></i>订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1"><i class="el-icon-s-grid"></i>数据报表</el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 结束 -->
          <!-- 左侧导航结束 -->
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.home /deep/ .el-container {
  height: 100vh;
  padding: 0;
  margin: 0;
  width: 100%;
}
.el-header {
  background-color: #363d40;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #363d40;
  color: #fff;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}
</style>
