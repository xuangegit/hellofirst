<template lang="pug">
  .page
    page-title 消费明细
    crud(name="消费明细" :form='form'  ref='form'  :btns-shown="btns" hasIndex  :staticTableData="staticTableData" :select-model-src="modelSrc" hideEdit :row-opers="rowOpers")
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        staffName:'',
        size: 20,
        pg: 1,
      },
       modelSrc:{
        // companyId:['公司名称','select',{required:true,mapper:{1:'公司A',2:'公司B',3:'公司C',4:'公司D',}}],
        // name:['员工姓名','',{required:true,mapper:{1:'张三',2:'赵四',3:'王五',4:'刘能',}}]
        staffName:['员工姓名']
      },
      staticTableData:[
        {
          staffName:'张三',
          cost:1000,
          date:"2019-8-21 18:30 至 2019-8-21 21:50",
          roomName:'包间1',
          session:'下午场',
        },
         {
          staffName:'赵四',
          cost:1000,
          date:"2019-8-21 18:30",
          roomName:'包间4',
          session:'下午场',
        },
        {
          staffName:'刘能',
          cost:1000,
          date:"2019-8-21 18:30",
          roomName:'包间4',
          session:'下午场',
        },
      ],
      rowOpers:[
        {
          text:'订单详细',
          type:'primary',
          handler:row=>{
            console.log(row)
          }
        },
         {
          text:'备注',
          type:'primary',
          handler:row=>{
            console.log(row)
            this.$prompt('请输入备注信息').then(value=>{
              console.log('value',value)
              if(value.value)
                this.$message.success('你输入了: '+ value.value)
            }).catch(()=>{

            })
          }
        }
      ]
    }
  }
}
</script>
