var validatemobile = (rule, value, callback) => {
  var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (value === '') {
    callback(new Error('请输入联系方式'))
  } else if(!reg.test(value)){
    callback(new Error('手机号码格式不正确'))
  } else {
    callback() 
  }
}
export default{
  name: ['员工名称','',{required: true}],
  cost:['消费金额(元)','',{tableOnly:true}],
  corporate_customer_id	:['隶属公司','select',{required:true,hideIntable:true,mapper:{}}],
  corporate_customer_name:['隶属公司','',{tableOnly:true}],
  mobile:['电话号码','',{required:true,}],
  // remark:['备注'],
  binding_time:['绑定时间','',{tableOnly:true,extraRules:[{required:true,validator:validatemobile,trigger:'blur'}]}],

}