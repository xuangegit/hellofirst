<template lang='pug'>
//-
  @file 主页框架
  @author 李小龙
  @date 2018/8/16
.main(style='height:100%;')
  header#top-nav
    //- h2(style="position:absolute;text-align:center;width:100%;top:10px") 后台管理系统
    div(style='display:inline-block;margin-right:2%;') 
      | {{username}}
    img(src='../assets/head portrait-default.png', style='display:inline-block;vertical-align:middle;margin-right:30px;')
    i.iconfont.icon-Passwordmodificatio(@click='$router.push({name: "修改密码"})')
    i.iconfont.icon-dropout(@click='logout()')
  nav
    el-menu(:router='true' unique-opened)
      template(v-for='(mainMenu, index) in leftMenu')
        el-menu-item(v-if='!mainMenu.children||mainMenu.children.length==0' :index='"/"+encodeURIComponent(mainMenu.menu_name)' v-text='mainMenu.menu_name')
        el-submenu(v-else :index='""+index')
          template(slot='title')
            i.iconfont(:class='[mainMenu.icon]' style='margin-right:15px;')
            span(v-text='mainMenu.menu_name')
          el-menu-item( v-for='(subMenu,i) in mainMenu.children' :index='"/"+encodeURIComponent(subMenu.menu_name)' v-text='subMenu.menu_name' :key='i')
  main
    router-view
</template>

<script>
// import menu from '../js/menu.js'

export default {
  data() {
    var loginInfo = JSON.parse(sessionStorage.loginInfo || '{}')
    return {
      leftMenu: [],
      // leftMenu: menu,
      // menuToIcon: {
      // },
      username: loginInfo.username
    }
  },
  beforeMount() {
    if (localStorage.powersList && JSON.parse(localStorage.powersList).length > 0) {
      let list = JSON.parse(localStorage.powersList) //全部菜单，有权限得flag为1,
      for (let item of list) {
          let arr = item.children.filter(e => {//筛选菜单并把按钮删掉
            delete e.children
            return e.menu_name!='会员'
          })
          item.children = arr
          this.leftMenu.push(item)
      }
    }
  },
  mounted() {
    // console.log('menu',this.leftMenu)
    // if (!sessionStorage.loginInfo) {
    //   this.$message.error('未登录！')
    //   setTimeout(() => {
    //     this.$router.push({path: '/login'})
    //   }, 1000)
    // }
    document.querySelector('.el-submenu__title').click()
    if (this.$route.path == '/main')
      document.querySelector('.el-menu-item').click()
  },
  methods: {
    //登出
    logout() {
      let vm = this
      vm
        .$confirm('确认登出吗？', '登出', { type: 'warning' })
        .then(() => {
          return this.$_app.get('loginOut')
        }).then(d=>{
          // this.$message.success(d)
          sessionStorage.clear()
          vm.$router.push({
            path: '/login',
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang='stylus' scoped>
header#top-nav
  // background: url(../assets/logo.png) 5% center no-repeat, #fff
  border-bottom 1px solid #eee
  color #666
  position relative
  z-index 1000
  height 80px
  min-width 500px
  display flex
  align-items center
  justify-content flex-end
  i
    color #a19c9a
    cursor pointer
    font-size 24px
    padding 10px 20px
    position relative
    &:hover
      background-color #ace
    &::after
      content ''
      position absolute
      top 0
      left 0
      height 100%
      width 1px
      background-color #e6e6e6

nav
  // background linear-gradient(to right, #0a75bb, #14609e)
  background #ffffff
  width 210px
  height calc(100% - 80px)
  color white
  overflow-x hidden
  overflow-y auto
  z-index 1000

  #modify-password
    color white
    font-size 16px
    border-left none
    border-right none
    padding-left 40px !important

main
  position absolute
  top 92px
  left 222px
  bottom 10px
  right 12px
  background-color white
  max-height calc(100% - 102px)
  overflow hidden
  border 1px solid #eee
</style>
