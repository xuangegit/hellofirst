<template lang="pug">
  .page
    page-title 充值明细
    crud(name="充值明细" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData"  :select-model-src="modelSrc" hideEdit :ropw-opers="rowOpers")
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
       modelSrc:{
        // companyId:['公司名称','select',{required:true,mapper:{1:'公司A',2:'公司B',3:'公司C',4:'公司D',}}],
        // name:['员工姓名','',{required:true,mapper:{1:'张三',2:'赵四',3:'王五',4:'刘能',}}]
        staffName:['员工姓名']
      },
      staticTableData:[
        {
          echargeTime:'2019-5-6 12:30:6',
          rechargeAmount:'1000',
          givenAmount:'200',
        },
          {
          echargeTime:'2019-5-6 12:30:6',
          rechargeAmount:'1000',
          givenAmount:'200',
        },
        {
          echargeTime:'2019-5-6 12:30:6',
          rechargeAmount:'1000',
          givenAmount:'200',
        },
      ],
      rowOpers:[
        {
          text:'订单详情',
          type:'primary',
          handler:row=>{
            console.log(row)
          }
        }
      ]
    }
  }
}
</script>