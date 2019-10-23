<template lang="pug">
  .page
    page-title 企业账号管理
    crud(name="企业账号" :form='form'  ref='form' hasIndex :btns-shown="btns" :select-model-src="modelSrc" hasAdd hideDelete :row-opers="rowOpers")
    el-dialog.mdialog(title='金额管理' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
      el-form(:model="moneyForm" label-width="100px" ref="moneyForm")
        el-form-item(label="充值/扣除")
          el-radio-group(v-model="moneyForm.type")
            el-radio(:label="1") 充值
            el-radio(:label="0") 扣除
        el-form-item(prop="money" label="金额")
          el-input-number(v-model="moneyForm.money" :min="0")
      .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消                    
</template>
<script>
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      showModal:false,
      moneyForm:{
        type:1,
        money:''
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
          text: "充送比例",
          type: "primary",
          handler:row => {
            console.log(row)
            this.$prompt('请输入充送比例').then(value=>{
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
            this.$router.push({name:'员工列表',params:{id: row.id}})
            
          }
        },
        {
          text: "冻结",
          type: "danger",
          hide:row=>{
            return row.status==2
          },
          handler:row => {
            this.$confirm('确认冻结', {type: "warning"}).then(()=> {
             return this.$_app.delete('企业账号',{id: row.id})
          }).then(d => {
            this.$message.success(d.message||d.msg)
            this.$refs.form.select()
          })
          }
        },
         {
          text: "启用",
          type: "success",
          hide:row=>{
            return row.status==1
          },
           handler:row => {
            this.$confirm('确定启用？', {type: "warning"}).then(()=> {
             return this.$_app.delete('企业账号',{id: row.id})
          }).then(d => {
            this.$message.success(d.message||d.msg)
            this.$refs.form.select()
          })
          }
        },
         {
          text: "金额管理",
          type: "primary",
          handler:row => {
           this.showModal = true 
          }
        },
        {
          text: "折扣",
          type: "primary",
          handler:row => {
            console.log(row)
            this.$prompt('请输入折扣').then(value=>{
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
  },
  methods:{
    confirm(){

    },
    dialogClose(){
      this.$refs.moneyForm.resetFields()
    }
  }
}
</script>
