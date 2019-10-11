export default{
  
  name:['规格名称','',{required:true,}],
  quantitative:['属性','select',{required:true,mapper:{1:'可量化',0:'不可量化'}}],
  quantity:['换算数量','',{required:true,}],
  basic_unit_id:['基本单位','select',{required:true,mapper:{}}]
}