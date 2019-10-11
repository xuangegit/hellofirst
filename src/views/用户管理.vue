<template lang="pug">
  .page
    page-title 用户管理
    el-tabs(v-model="activeName")
      el-tab-pane(label="会员" name="first" ) 
        crud(name="用户管理-会员" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData" :select-model-src="selectModel" hideDelete hideEdit :row-opers="rowOpers")
      el-tab-pane(label="散客" name="second")
        crud(name="用户管理-散客" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData"   hideSelect hideDelete hideEdit :row-opers="rowOpers")
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      activeName:'first',
      selectModel:{
        type:['会员类型','select',{mapper:{1:'超级会员',2:'大会员',3:'普通会员'}}],
        level:['等级','select',{mapper:{1:'L1',2:'L2',3:'L3'}}],
      },
      staticTableData:[
        {name: '会员001',description: '这是区域A,位于kTV的东侧'},
        {name: '会员002',description: '这是区域A,位于kTV的东侧'},
        {name: '会员003',description: '这是区域A,位于kTV的东侧'}
      ],
      rowOpers:[
        {
          text:'订单详细',
          type:'primary',
          handler:row=>{
            console.log(row)
            this.$router.push({name:'订单详细'})
          }
        }
      ]
    }
  }
}
</script>
