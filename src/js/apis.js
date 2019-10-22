import domains from './domains'

const appApi = {
  //登录登出
  loginIn:'/api/v1/data_module/login/',
  loginOut:'/api/v1/data_module/login_out/',
  resetPassword:'/api/v1/data_module/change_password/',


  

  
  //会员管理
  会员: '/api/v1/member_module/member/',
  会员种类: '/api/v1/member_module/member_type/',
  会员等级: '/api/v1/member_module/member_grade/',

  //包间管理
  包间:'/api/v1/private_room/room/',
  包间区域:'/api/v1/private_room/room_region/',
  包间分类:'/api/v1/private_room/room_type/',

  //场次管理  
  场次:'/api/v1/private_room/room_se/',

  //规格、单位管理
  单位:'/api/v1/commodity/good_unit/',
  规格:'/api/v1/commodity/specification/',

  //商品管理
  商品一级分类:'/api/v1/commodity/first_cate/',
  商品二级分类:'/api/v1/commodity/second_cate/',
  // 部门管理
  部门: '/api/v1/department/department/',
  员工: '/api/v1/department/employee_m/',
  职位: '/api/v1/department/position_m/',
  部门领导人:'/api/v1/department/department_leader_list/?department_id',
  部门领导职位:'/api/v1/department/query_department_position/',
  职位领导人员:'/department/multiple_position/',

  //企业账号管理
  企业账号:'/api/v1/client_module/corporate_m/',
  员工列表:'/api/v1/client_module/company_employee/',

  //菜单管理
  菜单管理:'/api/v1/system_module/system_menu/',

  //账户管理
  账户:'/api/v1/system_module/admin_user/',
  重置密码: '/api/v1/system_module/pass_reset/',
  
  //角色管理
  角色:'/api/v1/system_module/role/',
  角色权限:'/api/v1/system_module/role_permission/',
  
  right:'', //角色权限
  //Token
  getToken: '',
  //login
  login: '',
  getRandcode: '',

  数据统计: '',

 

  //流量使用统计
 
}
for (let i in appApi) {
  appApi[i] = domains.apiDomain + appApi[i]
}

const getoken = {
  getToken: '/getToken', //token获取
}

for (let i in getoken) {
  getoken[i] = domains.tokenDomain + getoken[i]
}

const uploadApi = {
  fileUpload: '/api/v1/data_module/ali_upload/',
}

for (let i in uploadApi) {
  uploadApi[i] = domains.uploadDomain + uploadApi[i]
}

export default Object.assign({}, appApi, getoken, uploadApi)
