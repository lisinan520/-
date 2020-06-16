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
      <el-input placeholder="请输入内容"  @input.native="searchUser" v-model="pageinfo.query" style=" width: 300px">
        <el-button slot="append"  icon="el-icon-search" @click="searchUser"></el-button>
      </el-input>
      <el-button type="primary" class="adduser" style="margin-left:14px" @click="addUser">添加用户</el-button>
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
            <el-switch @change="setUserStatus(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showUserDialog(scope.row)"></el-button>
               <el-button
                type="danger"
                size="mini"
                @click="del(scope.row)"
                icon="el-icon-delete"
                circle
              ></el-button>
              <el-button size="mini" type="warning" icon="el-icon-star-off" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3.添加分页 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageinfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:20px">
    </el-pagination>
    <!-- 添加用户的一个对话框 -->
    <el-dialog title="添加用户"   width="450px"  :visible.sync="dialogFormVisibleuser">
  <el-form :model="userForm" label-width="70px" :rules="userRules" ref="adduser" label-position='left'>
    <el-form-item label="用户名" prop="username" >
      <el-input v-model="userForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleuser = false">取 消</el-button>
    <el-button type="primary" @click="addUserData">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
    <el-dialog title="编辑用户"   width="450px"  :visible.sync="dialogFormVisibleuserDel">
  <el-form :model="userForm" label-width="70px" :rules="userRules" ref="adduser" label-position='left'>
    <el-form-item label="用户名" prop="username" >
      <el-input v-model="userForm.username" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleuserDel = false">取 消</el-button>
    <el-button type="primary" @click.prevent="editUserOk">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUser, editUserInfo, modifyUserStaus, addUsers, del } from '@/http/api'
import _ from 'lodash'
export default {
  name: 'userList',
  data () {
    return {
      dialogFormVisibleuserDel: false, // 编辑状态吗
      dialogFormVisibleuser: false, // 添加用户状态
      //   用户验证会泽
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      },
      pageinfo: {
        query: '',
        pagenum: 1, // 当前页码
        pagesize: 4 // 显示每页的条数
      },
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      tableData: []
    }
  },
  props: [],
  components: {},
  mounted () {},
  created () {
    this.getUserList()
  },
  methods: {
    // 删除用户，显示弹框
    del (user) {
      console.log('删除用户,显示弹框')
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 调用删除用户接口
          // console.log('user',user)
          const res = await del(user.id)
          // console.log('删除成功',res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUserList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑用户，真正将修改的用户信息添加到数据库
    async editUserOk () {
      const { id, email, mobile } = this.userForm
      editUserInfo(id, { email, mobile })
      this.dialogFormVisibleuserDel = false
    },
    // 编辑用户
    showUserDialog (user) {
      // 1.先显示弹框
      this.dialogFormVisibleuserDel = true
      // 2.显示弹框的内容
      this.userForm = user
    },
    // 通过switch改变用户的状态
    async setUserStatus (user) {
      const result = modifyUserStaus(user)
    },
    //   向后台确认添加用户
    addUserData () {
      this.$refs.adduser.validate(async valid => {
        if (valid) {
        //  向后台添加用户数据
          // 1.添加用户到后台
          await addUsers(this.userForm)
          // 2.刷新页面展示已添加的用户
          this.getUserList()
          this.userForm = {
            username: '',
            password: '',
            email: '',
            mobile: ''
          }
        } else {
          // 验证失败
          console.log('error submit!!')
          return false
        }
        this.dialogFormVisibleuser = false
      })
    },
    // 添加个用户,显示弹框
    addUser () {
      this.userForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.dialogFormVisibleuser = true
    },
    //   搜索用户
    searchUser: _.debounce(function () {
      // 获取去除空格后的输入内容
    //   const query = this.pageinfo.query.trim()
    //   query.length === 0 代表搜索全部数据，否则包含有关键字的
      this.getUserList()
    }, 300),
    /**
     * query:查询参数可以为空
     * pagenum:当前页码不能为空
     * pagesize:每页显示页数不能为空
     */
    // 获取用户列表
    async getUserList () {
      const result = await getUser(this.pageinfo)
      const { flag, result: res } = result
      if (result.flag === 2) {
        this.tableData = res.users
        this.pageinfo.pagenum = res.pagenum
        this.total = res.total
      }
    },
    // 分页相关的放法
    // 每页条数不同触发的事件
    handleSizeChange (val) {
      this.pageinfo.pagesize = val
      this.getUserList()
      console.log(`每页 ${val} 条`)
    },
    // 当前页码事件
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageinfo.pagenum = val
      this.getUserList()
    }
    // 结束
  },
  watch: {},
  computed: {}
}
</script>

<style>
.user_table {
  margin-top: 20px;
  text-align: center;
}
</style>
