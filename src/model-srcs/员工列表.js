export default{
  name: ['员工名称','',{required: true}],
  cost:['消费金额(元)','',{tableOnly:true}],
  company:['隶属公司','select',{required:true}],
  mobile:['电话号码','',{required:true}],
  // remark:['备注'],
  bindTime:['绑定时间','',{tableOnly:true}],

}