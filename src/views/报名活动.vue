<template lang="pug">
  .page
    page-title 报名活动
    crud(name="报名活动" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData" :select-model-src="selectModel" hasAdd)    
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      selectModel:{
        status:['状态','select',{emptyOption:'全部',mapper:{0:'未开始',1:'进行中',2:'结束'}}]
      },
      staticTableData:[
        {name: '报名活动1',description: '这是报名活动1',status:0,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'},
        {name: '报名活动2',description: '这是报名活动2',status:1,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'},
        {name: '报名活动3',description: '这是报名活动3',status:2,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'}
      ],
    }
  }
}
</script>
