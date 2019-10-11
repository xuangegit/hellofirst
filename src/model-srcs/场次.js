export default{
  name:['场次名称','',{required:true}],
  time:['场次时间范围','time',{isRange:true,required:true}],
  subscriptionTime:['订金预约时间','time',{isRange:true,required:true}],
  fullPayTime:['全款预约时间','time',{isRange:true,required:true,}],
  gratisTime:['免费预约时间','time',{isRange:true,required:true,}],
  orderTime:['可预约时间','time',{isRange:true,required:true}],
}