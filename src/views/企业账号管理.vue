<template lang="pug">
  .page
    page-title 企业账号管理
    crud(name="企业账号" :form='form'  ref='form' hasIndex :btns-shown="btns" :select-model-src="modelSrc" hasAdd hideEdit hideDelete :row-opers="rowOpers")      
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
        name:['公司名称']
      },
      // staticTableData:[
      //   {name: '公司A',description: '这是公司A,位于kTV的东侧'},
      //   {name: '公司B',description: '这是公司b,位于kTV的东侧'},
      //   {name: '公司C',description: '这是公司c,位于kTV的东侧'}
      // ],
      rowOpers:[
        {
          text: "更改名称",
          type: "primary",
          handler:row => {
            console.log(row)
            this.$prompt('请输入名称').then(value=>{
              console.log('value',value)
              if(value.value)
                this.$message.success('你输入了: '+ value.value)
            }).catch(()=>{

            })
          }
        },
        {
          text: "订单列表",
          type: "success",
          handler:row => {
            console.log(row)

          }
        },
        {
          text: "员工列表",
          type: "primary",
          handler:row => {
            console.log(row)
            
          }
        },
        {
          text: "停用",
          type: "danger",
          handler:row => {
            this.$confirm('确认停用？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认停用')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
         {
          text: "充值",
          type: "primary",
          handler:row => {
            console.log(row)
            this.$prompt('请输入充值金额(元)').then(value=>{
              console.log('value',value)
              if(value.value)
                this.$message.success('你输入了: '+ value.value)
            }).catch(()=>{

            })
          }
        },
          {
          text: "充值订单",
          type: "success",
          handler:row => {
            console.log(row)

          }
        },
      ]
    }
  }
}
</script>
