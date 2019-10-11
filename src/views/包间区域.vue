<template lang="pug">
  .page
    page-title 包间区域
    crud(name="包间区域" :form='form'  ref='form'  hasIndex  hideSelect hasAdd  :handle-table-data="handleTableData")
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
    }
  },
  methods:{
    handleTableData(data)  {
      data.forEach(e=>{
        e.p_name=e.name
      })
      return data
    },
  }
}
</script>
