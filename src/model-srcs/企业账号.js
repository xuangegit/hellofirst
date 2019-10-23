export default {
  name:['公司名称','',{required:true,}],
  // recharge_amount:['充值金额','natural',{required:true}],
  accumulated_recharge_amount	:['累计充值金额','',{tableOnly:true}],
  consumption:['累计消费金额','',{tableOnly:true}], //接口中暂无
  // gift_amount:['赠送金额','natural',{hideInTable:true,}],
  accumulated_gift_amount:['累计赠送金额','natural',{tableOnly:true,}],
  account_balance:['余额','natural',{tableOnly:true}],
  discount:['折扣','natural',{tableOnly:true}],
  // discountName:['折扣',"",{tableOnly:true}],
  contact:['联系人','',{required:true}],
  contact_mobile:['联系方式','',{required:true}],
  company_address:['公司地址','',{required:true}],
  remarks:['备注','textarea',{required: true}]
}