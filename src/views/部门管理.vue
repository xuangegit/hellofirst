<template lang="pug">
  .page
    page-title 部门管理
    crud(name="部门" :form='form'  ref='form' :btns-shown="btns" hasIndex  hideSelect hasAdd)  
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
        {name: '部门A',description: '这是部门A',leadersName:'赵,钱,孙,李'},
        {name: '部门B',description: '这是部门A',leadersName:'赵,钱,孙,李'},        
        {name: '部门C',description: '这是部门A',leadersName:'赵,钱,孙,李'}
      ]
    }
  }
}
</script>
