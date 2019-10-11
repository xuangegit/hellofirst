<template lang="pug">
  .page
    page-title 会员日折扣
    crud(name="会员日折扣" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData"   hideSelect hasAdd)
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      staticTableData:[
        {name: '区域A',description: '这是区域A,位于kTV的东侧'},
        {name: '区域B',description: '这是区域A,位于kTV的东侧'},
        {name: '区域C',description: '这是区域A,位于kTV的东侧'}
      ]
    }
  }
}
</script>
