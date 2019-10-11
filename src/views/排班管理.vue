<template lang="pug">
  .page
    page-title 排班管理
    crud(name="排班管理" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData"   hideSelect hideOper hideDelete :row-opers="rowOpers")
      .fr(slot="fr")
        el-button(type="primary" @click='setPeriod')  设置周期
      
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
        {jobNumber: '工号001',staffName:'刘能',lastWeekPerformance:800,lastWeekRank:3,rank:1},
        {jobNumber: '工号002',staffName:'赵四',lastWeekPerformance:900,lastWeekRank:2,rank:2},
      ],
      rowOpers:[
        {
          text:'排号',
          type:'primary',
          handler:row=>{
            console.log('开始排号',row)
             this.$prompt('请输入序号').then(d=>{
              console.log(d)
              this.$message.success('你输入的序号为:'+d.value)
            })
          }
        }
      ],
    }
  },
  methods:{
    setPeriod(){
      this.$prompt('请输入周期(天)：').then(d=>{
        console.log(d)
        this.$message.success('你设置的周期为:'+d.value)
      })
    }
  }
}
</script>
