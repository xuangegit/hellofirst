<template lang="pug">
  .page
    page-title 充值明细
    crud(name="充值明细" :form='form'  ref='form' :btns-shown="btns" hasIndex  :staticTableData="staticTableData"  :select-model-src="modelSrc"  :row-opers="rowOpers")
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1,
        date:[]
      },
       modelSrc:{
        // companyId:['公司名称','select',{required:true,mapper:{1:'公司A',2:'公司B',3:'公司C',4:'公司D',}}],
        // name:['员工姓名','',{required:true,mapper:{1:'张三',2:'赵四',3:'王五',4:'刘能',}}]
        company_id:['公司名称'],
        rechargeAmount:['充值金额'],
        date:['充值日期','daterange']
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
        },
        {
          text:'修改金额',
          type:'primary',
          handler:row=>{
            console.log(row)
          }
        },
        {
          text:'反充值',
          type:'primary',
          handler:row=>{
            console.log(row)
          }
        }
      ]
    }
  },
  watch:{
    'form.date':function(val){
      console.log(val)
    },
  }
}
</script>