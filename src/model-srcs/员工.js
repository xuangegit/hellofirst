export default{
  id:['ID'],
  name:['姓名','',{required:true}],
  mobile:['手机号','',{required:true}],
  dep_name:['所属部门'],
  position_name:['职位',],
  status:['状态','select',{mapper:{1:'转正',2:'试用',3:'离职'}}],
  entry_time:['入职时间'],
  work_time:['工作时长(小时)',''],
  direct_leadership_name:['直属领导'],

}