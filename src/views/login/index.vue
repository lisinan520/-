<template>
<div class="box">

  <el-form
    label-position="right"
    label-width="60px"
    class="login_form"
    :model="ruleForm"
    :rules="rules"
    ref="login_form"
  >
    <div class="form-title">
      <h2>用户登录</h2>
    </div>
    <el-form-item label="账号:" prop="username">
      <el-input v-model="ruleForm.username" type="text"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
    <div class="form-btn">
      <el-button type="primary" @click.prevent="gologin">登录</el-button>
      <el-button type="info">重置</el-button>
    </div>
  </el-form>
</div>
</template>

<script>
import { login } from '@/http/api'
export default {
  name: '',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: [],
  components: {},
  mounted () {},
  created () {},
  methods: {
    gologin () {
      this.$refs.login_form.validate(async valid => {
        if (valid) {
          const result = await login(this.ruleForm)
          // console.log('登录', result)
          const { flag } = result
          if (flag === 2) {
            this.$router.push('/home')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {},
  computed: {}
}
</script>
<style>
.login_form {
  width: 25%;
  position: absolute;
  height: 30%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  text-align: center;
  background-color: #fff;
  padding: 20px 20px 10px 20px;
  border-radius: 10px;
}
.form-title {
  line-height: 40px;
  font-weight: bold;
}
@media screen and (max-width: 850px) {
  .login_form {
    width: 400px;
  }
}
.box{
    background-color: skyblue;
    height: 100%;
}
</style>
