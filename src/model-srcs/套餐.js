export default{
  name:['套餐名','',{ required: true } ],
  unit_price:['单价','natural',{ required: true } ],
  purchase_quantity:['限购量','natural', { required: true } ],
  total_inventory:['总库存','natural', { required: true } ],
  is_points: ['是否参与积分','radio', { required:true, mapper: { 1: '是', 0:'否'}}],
  is_in_low: ['是否参与低消','radio',{ required:true, mapper: { 1: '是', 0:'否'}}],
  is_commission: ['是否参与提成','radio',{ required:true, mapper: { 1: '是', 0:'否'}}],
  is_discount:['是否参与折扣','radio',{ required:true, mapper: { 1: '是', 0:'否'}}],
  // product_list:['包含商品','product_list',{ required: true, isArray:true}],
  image_list:['图片集','multi-image', { required :true } ],
  sales_volume:['销量','',{tableOnly: true}]
}