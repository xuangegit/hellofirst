export default {
  good_name: ['商品名称'],
  g_second_name:['商品类别'],
  cover_img:['商品图片','image'],
  img_list:['图片集','multi-image',{minWidth: '180px'}],
  price: ['单价(元)'],
  cost_price: ['成本价(元)'],
  sales_volume: ['销量'],
  is_in_low: ['参与抵消', 'select', {mapper:{0:'否',1:'是'}}],
  is_points: ['参与积分', 'select',{
    mapper:{0:'否',1:'是'}
  }],
  is_discount: ['参与折扣','select',{mapper:{0:'否',1:'是'}}],
  is_commission:['参与提成','select',{mapper:{0:'否',1:'是'}}],
  // crit: ['参与暴击','select',{mapper:{0:'否',1:'是'}}],     
  // critRate: ['暴击几率','select',{
  // }],
  delivery_to:['配送到','select',{mapper:{1:'后厨',2:'吧台',3:'前台'}}]
}