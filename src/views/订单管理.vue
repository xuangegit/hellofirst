<template lang="pug">
  .page
    page-title 订单管理
    crud(name="订单" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData" :select-model-src="selectModelSrc" :model-src="modelSrc" hideEdit hideDelete hasInfo)
      
</template>
<script>
import modelSrc1 from '../model-srcs/订单管理'
import modelSrc2 from '../model-srcs/订单管理-退订.js'
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1,
        type:''
      },
      selectModelSrc:{
        type:['订单类型','select',{emptyOption:'全部',mapper:{1:'消费',2:'充值',3:'退订'}}],
        way:['订单途径','select',{mapper:{1:'线上',0:'线下'}}],
        beginTime:['开始日期','date',{placeholder:'开始日期'}],
        endTime:["结束日期",'date',{placeholder:'结束日期'}]
      },
      modelSrc:modelSrc1,
      modelSrc1,
      modelSrc2,
      staticTableData:[
        {
          orderNumber:'dd00001',
          customer:'刘能',
          contactWay:'13826953625',
          reserveTime:'2019-8-5 18:20:36',
          beginTime:'2019-8-12 20:00:00',
          endTime:'2019-8-13 6:00:00',
          mode:'低消',
          // modeName:['消费模式'],
          orderType:1,
          room:'A001',
          session:'深夜场',
          prop:'免押',
          orderPerson:'赵四',
          actualConsumption:'10000',
          coupon:'1000',
          given:'2000',
          balanceOffset:'2000',
          IntegralOffset:'1000',
          actualCharge:'7000',
          payWay:3,
          deduct:'500',
        },
       
      ]
    }
  },
  watch:{
    'form.type':function(val){
      if(val==3) {
        this.modelSrc=this.modelSrc2
      } else {
        this.modelSrc=this.modelSrc1
      }
    }
  }
}
</script>
