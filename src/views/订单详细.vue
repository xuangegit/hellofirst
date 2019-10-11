<template lang="pug">
  .page
    page-title 订单详细
    crud(name="订单详细" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData"  readOnly :select-model-src="selectModelSrc" hideOper hideDelete)
        
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      selectModelSrc:{
        hidden:['','passwordHidden'],
        orderNumber:['订单号']
      },
      staticTableData:[
        {
          orderNumber:'2133333',
          customer:'刘能',
          contactWay:'1383838638',
          reserveTime:'2019-5-21',
          beginTime:'2019-6-4',
          endTime:'2019-6-5',
          mode:'低耗',
          // modeName:['消费模式'],
          // orderType:['订单类型','',{mapper:{1:'消费',2:'充值',3:'退订'}}],
          consumptionType:1,
          consumptionTypeName:'消费',
          room:'a005',
          session:'深夜场',
          prop:'免押',
          orderPerson:'赵四',
          originalPrice:6000,
          actualConsumption:4000,
          activeCoupon:500,
          cashierCoupon:100, 
          given:200,
          balanceOffset:1000,
          IntegralOffset:200,
          actualCharge:5000,
          deduct:['提成总额'],
        }
      ]
    }
  }
}
</script>
