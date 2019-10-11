<template lang="pug">
  .page
    page-title 包间分类
    crud(name="包间分类" :form='form'  ref='form'  hasIndex  :rowOpers="rowOpers" hideSelect hasAdd)
      
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      rowOpers:[
         {
          text: "停用",
          type: "danger",
          hide:row=>{
           return row.is_disable
          },
          handler:row => {
            // console.log(row)
            this.$confirm('确定停用？', {type: "warning"}).then(()=> {
              return this.$_app.patch('包间分类',{id: row.id})
            
            }).then(d => {
              // console.log(d)
              this.$message.success(d.msg||d.message)
              this.$refs.form.select()
            })
          }
        },
         {
          text: "启用",
          type: "success",
          hide:row=>{
           return !row.is_disable
          },
          handler:row => {
            // console.log(row)
            this.$confirm('确定启用？', {type: "warning"}).then(()=> {
              return this.$_app.patch('包间分类',{id: row.id})       
            }).then(d => {
              this.$message.success(d.msg||d.message)
              this.$refs.form.select()
            })
          }
        },
         {
          text: "包间列表",
          type: "success",
          handler:row => {
            console.log(row)
            this.$router.push({path:'/' + encodeURIComponent('包间管理'),query:{}})
          }
        }
      ],
    }
  }
}
</script>