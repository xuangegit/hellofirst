import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/Login')
const Main = () => import('@/views/Main')

Vue.use(Router)

var pages = [
  '会员管理',
  '会员种类',
  '包间管理',
  '包间区域',
  '包间分类',
  '场次管理',
  '账户管理',
  '角色管理',
  '菜单管理',
  '操作记录',
  '商品管理',
  '商品分类',
  '优惠商品管理',
  '单位管理',
  '规格管理',
  '积分活动',
  '报名活动',
  '部门管理',
  '员工管理',
  '职位管理',
  '全场管理',
  '会员日折扣',
  '企业账号管理',
  '员工列表',
  '消费明细',
  '充值明细',
  '订单管理',
  '订单详细',
  '用户管理',
  '排班管理',
  '入库管理'
]

var routerOptions = {
  routes: [
    {
      path: '',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/main',
      component: Main,
      children: [],
    },
  ],
}

for (let page of pages) {
  routerOptions.routes[2].children.push({
    path: '/' + encodeURIComponent(page),
    component: () => import('@/views/' + page),
    name: page,
  })
}

export default new Router(routerOptions)
