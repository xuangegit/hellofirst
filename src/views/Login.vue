<template>
  <div class="page">
    <!-- <header>
      <div class="header-pic">
        <img src="../assets/logo.png" height="56px">
      </div>
    </header> -->
    <article class="login_bg">
      <div class="login-pic">
      </div>
      <div class="login-box-background">
        <div class="login-box">
          <h1 class="header-title">欢迎登录</h1>
          <form class="form-login">
            <input type="password" disabled name='hack-browserauto' hidden>
            <!-- <div class="tabs-box">
              <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="合伙人" name="first"></el-tab-pane>
                <el-tab-pane label="管理员" name="second"></el-tab-pane>
              </el-tabs>
            </div> -->
            <div class="input-box">
              <i class="iconfont iconfont-size">&#xe603;</i>
              <input type="text" id="username" class="input-login" placeholder='用户名' v-model='form.username'>
              <!-- <i class="iconfont iconfont-size" v-if="hasParam" @click='clear'>&#xe603;</i> -->
            </div>
            <div class="input-box">
              <i class="iconfont iconfont-size">&#xe602;</i>
              <input type="password" id="passwordd" class="input-login" hidden placeholder='密码' name="password">
              <input type="password" id="password" class="input-login" placeholder='密码' name="password" v-model='form.password' @keyup.enter='login'>
            </div>
            <!-- <div>
              <div class="input-box" style="width: 40%;display: inline-block">
                <input type="text" id="verification" style="width: 100%"  v-model='form.code' class="input-login" @keyup.enter='login' placeholder='验证码'>
              </div>
              <div style="display: inline-block;float: right; vertical-align: middle">
                <img :src="imgSrc" @click="changeCode" height="40px">
              </div>
            </div> -->
            <label class="check-input">
              <input type="checkbox" id="rememberMe" v-model="rememberMe" style="width: 16px; height: 16px;vertical-align: middle;">
              <span >记住账号</span>
            </label>
            <button id="loginclick" type='button' @click='login'>登录</button>
          </form>
        </div>
      </div>
    </article>
    <!-- <footer>
        <p>公司名称</p>
    </footer> -->
  </div>
</template>

<script>
import app from '../js/app.js'
import { MD5Encode } from '../js/NewMD5Encrypt.js'
import apis from '../js/apis.js'

export default {
  data() {
    var username = localStorage.getItem('ktvusername')
    var password = localStorage.getItem('ktvpassword')
    return {
      url: apis.getRandcode,
      imgSrc: '',
      activeName: 'first',
      // loginError: false,
      hasParam: false,
      form: {
        username: username,
        password: password,
        code: '',
      },
      rememberMe: !!username,
    }
  },
  watch: {
    'form.username': function (val, oldVal) {
      if (val) {
        this.hasParam = true
      } else {
        this.hasParam = false
      }
    },
  },
  computed: {
    loginType() {
      return this.activeName === 'first' ? 1 : 2
    }
  },
  beforeMount() {
    this.changeCode()
  },
  mounted() {
    if (this.form.username) {
      this.hasParam = true
    } else {
      this.hasParam = false
    }
  },
  methods: {
    changeCode(){
      this.imgSrc = this.url+'?'+Math.random();
    },
    handleClick(){},
    getMd5(password) {
      return MD5Encode(password)
    },
    login() {
      this.diyLogin()           
    },
    loging(e) {
      app.get('login', {code: this.form.code}, this.$el, {token: e}).then(data => {
        this.rememberPassword()
        sessionStorage.loginInfo = JSON.stringify(data.data)
        //菜单放入localStorage以便网址直接进去能看到菜单
        if (data.data.powersList) localStorage.powersList = JSON.stringify(data.data.powersList)
        this.$message.success(data.message)
        setTimeout(() => {
          this.$router.push({path: '/main'})
        }, 1000)
      }).catch(e => {
        console.log(e.message || e.responseMessage || e)
        // if(e.code === 1011) this.imgSrc = this.url+'?'+Math.random();
        // this.$message.warning(e.message || e.responseMessage || e)
      })
    },
    diyLogin(){ 
      this.$_app.post('loginIn',{mobile:this.form.username, password:this.form.password},'#loginclick').then(data=>{
        console.log(data)
       localStorage.powersList = JSON.stringify(data.top_menu_list)
       sessionStorage.loginInfo =JSON.stringify(data)
       sessionStorage.setItem('token', data.token)
        this.$message.success('登录成功')
        setTimeout(() => {
          this.$router.push({path: '/main'})
        }, 1000)
      })
    },
    clear() {
      this.form.username = ''
    },
    rememberPassword() {
      let vm = this
      //点提交时,设置了记住密码
      if (vm.rememberMe) {
        localStorage.setItem('ktvusername', vm.form.username)
        localStorage.setItem('ktvpassword', vm.form.password)
      } else {
        localStorage.removeItem('ktvusername')
        localStorage.removeItem('ktvpassword')
      }
    },
    freshVerification() {
      this.imgSrc = this.url+Math.random();
    }
  }
}
</script>

<style lang='stylus' scoped>
.page{
  margin 0
  padding 0
  height: 100%;
  min-width: 950px;
  min-height: 650px;
}
.box-none{
  width 40px
}

.login_bg{
  height:100%;
   background url(../assets/login_bg.jpg) no-repeat center/cover
}
.login-pic{
  // background url(../assets/login_bg.jpg) no-repeat center/cover
  min-width 373px
  min-height 322px
}
header{
  padding 13px 0
}
.header-pic{
  margin 0 23%
  margin-top 10px
}
article{
  background linear-gradient(to bottom, #83c8ff, #afdcff)
  width 100%
  height 73%
  padding 0 13% 0 18%
  display flex
  align-items center
  justify-content space-around
}
.login-box-background {
  border: 8px solid rgba(255, 255, 255, 0.22);
  border-radius: 5px;
  width: 416px;
}
.login-box {
  background: #ffffff;
  border-radius: 5px;
  padding: 22px;
}
.form-login button {
  margin-top: 20px;
  outline: 0;
  background-color: #00a1e9;
  border: 0;
  padding: 10px 15px;
  color: #ffffff;
  border-radius: 3px;
  width: 356px;
  cursor: pointer;
  font-size: 20px;
}
.form-login button:active {
  background-color: #0094d6;
}
h1 {
  margin: 0 2px 28px 2px;
  font-size: 16px;
  color: #888888;
}
.input-box {
  outline: 0;
  border: 1px solid #c6c6c6;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 8px 13px;
  margin: 0 auto 20px 2px;
  display: block;
  text-align: left;
  font-size: 18px;
  color: #888888;
  font-weight: 300;
  box-sizing: border-box;
}
.input-box>input.input-login {
  border: 1px solid #ffffff;
  font-size: 16px;
  width: 210px;
  color: #9aa;
  border-style: none; /* 取消高亮 */
}
.input-box>input.input-login:focus {
  outline: none;
}
.check-input{
  color #888888;
  user-select: none;
}
.iconfont-size {
  line-height: 1;
  vertical-align: middle;
}
.iconfont-size:hover {
  cursor: pointer;
}
p{
    text-align: center;
    margin: 0;
    line-height: 114px;
}
.el-select{
  width 80%
}
.header-title {
  margin: 0 2px 20px 2px;
  font-size: 16px;
  text-align: center;
  color: #888888;
}
</style>
<style>
.el-tabs__item{
  font-size: 16px;
  color: #888888;
  }
</style>

