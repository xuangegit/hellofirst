<template lang="pug">
  .page
    page-title 员工列表
    crud(name="员工列表" :form='form'  ref='form' :btns-shown="btns" hasIndex  hasAdd :row-opers="rowOpers")
      el-form(:model="form" inline)
        el-form-item(label="公司名称")
          el-select(v-model="form.corporate_customer_id")
            el-option(label="全部" value="")
            el-option(v-for="item in companyArray" :label="item.name" :key="item.id" :value="item.id")  
        el-form-item(label="员工姓名")
          el-input(v-model="form.name")
        el-form-item(label="员工电话")
          el-input(v-model="form.mobile")          
</template>
<script>
import modelSrc from '../model-srcs/员工列表.js'
export default {
  data(){
    return {
      companyArray:[],
      modelSrc,
      form:{
        size: 20,
        pg: 1,
        name:'',
        mobile:'',
        corporate_customer_id:''
      },
      staticTableData:[
        {name: '员工A',cost: '100',bindTime:'2019-8-12'},
        {name: '员工B',cost: '100',bindTime:'2019-8-12'},
        {name: '员工C',cost: '100',bindTime:'2019-8-12'}
      ],
      rowOpers:[
        {
          text:'消费明细',
          type:'primary',
          handler:row=>{
            console.log(row)
            this.$router.push({name:'消费明细'})
          }
        },
      ],
    }
  },
  beforeMount(){
    if(!!this.$route.params.id) {
      this.form.corporate_customer_id = this.$route.params.id
    }
    this.$_app.get('企业账号').then(d=>{
      console.log('企业账号',d)
      this.companyArray=d.data.ret
      d.data.ret.forEach(e=>{
        modelSrc.corporate_customer_id[2].mapper[e.id]=e.name
      })
    })
  },
}
</script>
