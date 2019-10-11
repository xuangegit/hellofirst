export default{
  name:['活动名称','',{required:true}],
  beginTime:['开始时间','date',{required:true}],
  endTime:['结束时间','date',{required:true}],
  Deduction:['抵扣积分','',{required:true}],
  status:['状态','',{tableOnly:true,mapper:{0:'未开始',1:'进行中',2:'结束'}}],
  code:['二维码','image',{tableOnly:true}]
}