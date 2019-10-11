<template lang="pug">
  .page
    page-title 积分活动
    crud(name="积分活动" :form='form'  ref='form' hasIndex :staticTableData="staticTableData" hasAdd :row-opers="rowOpers" :select-model-src="selectModel")
      
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
        {name: '积分活动1',description: '这是积分活动1',status:0,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'},
        {name: '积分活动2',description: '这是积分活动2',status:1,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'},
        {name: '积分活动3',description: '这是积分活动3',status:2,code:'',Deduction:'20',beginTime:'2019-8-21',endTime:'2019-10-1'}
      ],
      selectModel:{
        status:['状态','select',{emptyOption:'全部',mapper:{0:'未开始',1:'进行中',2:'结束'}}]
      },
      rowOpers:[
        {
          text: "开始",
          type: "success",
          handler:row => {
            console.log(row)
            this.$confirm('确认开始？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认开始')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
         {
          text: "结束",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认结束？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认结束')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
        {
          text:'下载二维码',
          type:'success',
          handler:row=>{
            console.log(row)
          }
        }
      ]
    }
  }
}
</script>
