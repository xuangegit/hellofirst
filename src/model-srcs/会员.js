export default {
  nick_name: ['会员昵称', 'text', {
    // hideInTable: true,
    // tableOnly: true
  }],
  name: ['会员名称', '',{required:true,placeholder:'请输入会员名称'}],
  member_type_id: ['会员种类', 'select',{mapper:{1:'会员1', 2: '会员2', 3: '会员3',4: '会员4', 5: '会员5'}}],
  grade_Name:['会员等级',''],
  grade_id: ['会员等级','',{hideInTable:true}],
  phone: ['联系方式', '', {
    // tableOnly: true,
    required: true
  }],
  balance: ['余额(元)', '',{tableOnly: true,}],
  accumulate: ['累计充值(元)', '', {
    tableOnly: true,
    // formatter: (row, column, cellValue) => {
    //   if(row.roleName) {
    //     return row.roleName
    //   } else {
    //     return row.userFlag? "船员": "船长"
    //   }
    // }
  }],
  cumulative: ['累计消费(元)', '',{
    tableOnly: true,
  }],
  integral: ['当前积分','',{hideInInsert:true}],
  cash_credit: ['可提现积分','',{tableOnly: true,}],     
  gift_points: ['赠送积分','',{
   tableOnly:true
  }],
  experience:['当前经验值','']
}