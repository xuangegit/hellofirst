<template lang="pug">
  .page
    page-title 员工列表
    crud(name="员工列表" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData" :select-model-src="modelSrc" hideOper hideDelete :row-opers="rowOpers")    
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1,
        companyId:'',
        name:''
      },
       modelSrc:{
        companyId:['公司名称','select',{emptyOption:'全部',mapper:{1:'公司A',2:'公司B',3:'公司C',4:'公司D',}}],
        name:['员工姓名']
      },
      staticTableData:[
        {name: '员工A',cost: '100',bindTime:'2019-8-12'},
        {name: '员工B',cost: '100',bindTime:'2019-8-12'},
        {name: '员工C',cost: '100',bindTime:'2019-8-12'}
      ],
      rowOpers:[
        {
          text:'消费明细',
          type:'primary',
          handler:row=>{
            console.log(row)
            this.$router.push({name:'消费明细'})
          }
        },
      ],
    }
  }
}
</script>
