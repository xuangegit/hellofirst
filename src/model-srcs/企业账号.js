export default {
  name:['公司名称','',{required:true,}],
  totalGet:['累计获得金额','',{tableOnly:true}],
  blance:['余额','',{tableOnly:true}],
  reCharge:['充值金额','',{required:true}],
  discount:['折扣','select',{required:true,hideInTable:true}],
  discountName:['折扣',"",{tableOnly:true}],
  given:['赠送金额','',{hideInTable:true}],
  contactor:['联系人','',{required:true}],
  contactorPhone:['联系方式','',{required:true}],
  totalReCharge:['累计充值金额','',{tableOnly:true}],
  totalGiven:['累计赠送金额','',{tableOnly:true}],
}