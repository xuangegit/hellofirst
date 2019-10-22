<template>
  <div class="page">
    <page-title>修改密码</page-title>
    <el-form class="elForm" :model='pwdForm' label-width='100px' :rules='pwdRules' ref="changePwd">
        <el-form-item label='用户名' required >
            <el-input v-model='pwdForm.username' class="elInput" disabled></el-input>
        </el-form-item>
        <el-form-item label='原密码' required prop='password'>
            <el-input v-model='pwdForm.password' name="password" autocomplete="off" onfocus="this.type='password'" class="elInput" type="text"></el-input>
        </el-form-item>
        <el-form-item label='新密码' required prop='newPassword'>
            <el-input v-model='pwdForm.newPassword'  name="password" autocomplete="off" onfocus="this.type='password'" class="elInput" type="text" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label='确认新密码' required prop='newPasswordConfirm'>
            <el-input v-model='pwdForm.newPasswordConfirm'  name="password" autocomplete="off" onfocus="this.type='password'" class="elInput" type="text" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label='' prop='zhanwei'>
          <el-button class="elButton" type='primary' @click='save("changePwd")'>保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import app from '../js/app.js'
import { MD5Encode } from '../js/NewMD5Encrypt'

export default {
  data() {
    return {
      username: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      pwdForm: {
        id: '',
        username: '',
        password: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      pwdRules: {
        password: { required: true, message: '必填' },
        newPassword: [
          { required: true, message: '必填' },
          { min: 6, max: 16, message: '密码长度6至16位' }
        ],
        newPasswordConfirm: [
          { required: true, message: '必填' },
          { min: 6, max: 16, message: '密码长度6至16位' }
        ]
      }
    }
  },
  mounted() {
    this.pwdForm.username = JSON.parse(sessionStorage.loginInfo).name
    console.log(this.pwdForm.username)
  },
  methods: {
    getMd5(password) {
      return MD5Encode(password)
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.pwdForm.newPassword != this.pwdForm.newPasswordConfirm) {
            this.$message.warning('两次输入的密码不一致！')
          } else {
            let forms = {}
            // forms.id = JSON.parse(sessionStorage.loginInfo).id
            // forms.orginPassword = this.getMd5(this.pwdForm.password)
            // forms.newPassword = this.getMd5(this.pwdForm.newPassword)
            // debugger
            forms.old_password = this.pwdForm.password
            forms.new_password = this.pwdForm.newPassword
            forms.re_new_password = this.pwdForm.newPasswordConfirm
            app
              .post('resetPassword', forms, this.$el)
              .then(d => {
                this.$message.success(d.message || d.msg)
                this.$refs.changePwd.resetFields()
              })
              .catch(d => {
                this.$message.warning(d.message || d.msg)
              })
          }
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.elInput {
  max-width: 300px;
}

.elForm {
  max-width: 400px;
  position: absolute;
  top: 250px;
  left: calc(50% - 200px);
}

.elButton {
  display: block;
  margin: auto;
  padding: 10px 135px;
}
.el-form-item {
    margin-bottom: 22px;
}
</style>
