export default {
  room_num:['包间名称','',{requried:true}],
  partition_name:['包间区域','',{requried:true,tableOnly:true}],
  partition_id:['包间区域','select',{hideInTable:true}],
  room_type_id:['包间类型','',{hideInTable:true}],
  room_type_name:['包间类型','',{tableOnly:true}],
  images:['包间详细','multi-image',{requried:true}],
  current_mode:['当前模式','select',{mapper:{1:'计时', 2:'低消', 3: '全开'}}],
  status:['状态','select',{mapper:{1:'使用中',2:'停用'}}],
  room_area:['包间面积(平方米)','',{hideInTable:true}],
  applicable_number:['适用人数','number']
}