export default{
  position_name:['职位名称','',{required:true}],
  department_id:['部门名称','select',{required: true, mapper:{}}],
  // department_name:['部门名称','',{tableOnly:true}],
  is_department_heads:['是否为部门领导','select',{required:true,mapper:{1:'是',0:'否'}}],
}