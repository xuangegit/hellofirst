export default {
  id: ['编号', '', {
    hideInTable: true,
    tableOnly: true
  }],
  name: ['用户名', ''],
  // password: ['密码', '', {
  //   tableOnly: true,
  //   hideInTable: true
  // }],
  mobile: ['手机号', ''],
  role_name: ['角色名称', '', {
  }],
  status: ['状态', '',{
    mapper: {
      1: '启用',
      0: '禁用'
    }
  }],
}