<template lang="pug">
  .page
    page-title 全场管理
    crud(name="全场" :form='form'  ref='form'  hasIndex  :staticTableData="staticTableData" :select-model-src="selectModelSrc" hasAdd)  
      el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
        el-form(label-width="110px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="活动名称" prop="name" maxLength="30")
            el-input(v-model="formDep.name")
          el-form-item(label="联系方式" prop="phone")
            el-input(v-model="formDep.phone" :disabled="title=='编辑会员'")  
          el-form-item(label="折扣类型" prop="type")
            el-select(v-model="formDep.type")
              el-option(label="全场折扣" :value="1" :key="1")
              el-option(label="双倍积分" :value="2" :key="2")    
        .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消      
</template>
<script>
export default {
  data(){
    return {
      title:'添加全场活动',
      showModal: false,
      form:{
        size: 20,
        pg: 1
      },
      formDep:{
        name:'',
        type:'',
      },
      selectModelSrc:{
        name:['活动名称'],
        type:['折扣类型','select',{mapper:{1:'全场折扣',2:'双倍积分'}}]
      },
      staticTableData:[
        {name: '全场活动1',description: '这是区域A,位于kTV的东侧'},
        {name: '全场活动2',description: '这是区域A,位于kTV的东侧'},
        {name: '全场活动3',description: '这是区域A,位于kTV的东侧'}
      ]
    }
  },
  methods:{
    add(){
      this.title = '添加全场活动'
      this.showModal = true
    },
    confirm(){

    },
    submit(){ //提交积分的管理

    },
     dialogClose(){
      this.$refs.formDep.resetFields()
    },
  }
}
</script>
