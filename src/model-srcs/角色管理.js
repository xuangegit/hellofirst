import {
  formatToDatetime
} from '../js/util'

export default {
  // hidden: ['', 'passwordHidden', {hideIntable:true,hideInInsert:true,extraRules: [{showPassword: false}]}],
  id: ['编号', '', {
    hideInTable: true,
    tableOnly: true
  }],
  name: ['角色名称', '', {required:true}],
  description: ['描述', '', {required:true}],
  update_time: ['编辑时间', '', {
    formatter: (row, col, val) => {
      if(val)
       return formatToDatetime(new Date(val))
      else 
      return '' 
    },
    tableOnly: true
  }],
  create_time: ['创建时间', '', {
    formatter: (row, col, val) => {
      if(val)
      return formatToDatetime(new Date(val))
      else return ''
    },
    tableOnly: true
  }],


}