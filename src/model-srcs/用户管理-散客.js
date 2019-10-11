export default{
  id:['ID'],
  nickName: ['会员昵称', 'text', {
  }],
  name: ['散客名称', '',{required:true,placeholder:'请输入会员名称'}],
  phone: ['联系方式', '', {}],
  registrationDate:['注册日期'],
  // type: ['会员种类', 'select',{mapper:{1:'会员1', 2: '会员2', 3: '会员3',4: '会员4', 5: '会员5'}}],
  // levelName:['会员等级',''],
  // level: ['会员等级','',{hideInTable:true}],
  // discount:['会员折扣'],
  // balance: ['会员余额(元)', '',{tableOnly: true,}],
  IntegralWithdraw: ['可提现积分','',{tableOnly: true,}], 
  // totalAccumulate: ['累计充值金额(元)', '', {}],
  // totalAccumulateCount: ['累计充值次数(元)', '', {}],
  totalCumulative: ['累计消费(元)'],
  // IntegralBalance: ['当前积分','',{hideInInsert:true}],
  totalIntegralPresent: ['赠送积分'],
  // experience:['当前经验值','']
  totalCoupon:['累计优惠金额'],
  tatalCouponCount:['累计优惠次数'],
  unsubscribeRate:['本人退订率'],
  recommendUnsubscribeRate:['推荐退订率'],
}