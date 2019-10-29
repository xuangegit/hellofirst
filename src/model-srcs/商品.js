export default {
  name: ['商品名称', '',{required:true,placeholder:'请输入会员名称'}],
  type: ['商品类别', 'select',{hideInTable:true}],
  typeName:['商品类别'],
  img:['商品图片','multi-image'],
  price: ['单价(元)','',{}],
  cost_price: ['成本价(元)', '', {
    required: true
  }],
  sales: ['销量'],
  withOffset: ['参与抵消', 'select', {mapper:{0:'否',1:'是'}}],
  withIntegral: ['参与积分', 'select',{
    mapper:{0:'否',1:'是'}
  }],
  withDiscount: ['参与折扣','select',{mapper:{0:'否',1:'是'}}],
  withDeduct:['参与提成','select',{mapper:{0:'否',1:'是'}}],
  crit: ['参与暴击','select',{mapper:{0:'否',1:'是'}}],     
  critRate: ['暴击几率','select',{
  }],
  delivery_to:['配送到','']
}