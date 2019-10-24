<template lang="pug">
  .page
    page-title 规格管理
    crud(name="规格" :form="form" ref="form" :btns-shown="btns" hasIndex :select-model-src="selectModelSrc" :model-src="modelSrc" hideOper :row-opers="rowOpers")
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus"  @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')? '添加': '新增'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="700px" @close=" dialogClose")
      el-form(label-width="100px" :model="formDep" :rules="rules" ref="formDep")
        el-form-item(label="规格名称" prop="name")
          el-input(v-model="formDep.name" maxLength="30" clearable)
        el-form-item(label="属性" prop="quantitative")
          el-select(v-model='formDep.quantitative')
            el-option(label="可量化" :value="1" :key="1")
            el-option(label="不可量化" :value="0" :key="0")
        el-form-item(label="基本单位" prop="basic_unit_id")
          el-select(v-model="formDep.basic_unit_id")
            el-option(v-for="item in unitArray" :label="item.label" :value="Number(item.value)" :key="item.value")
        el-form-item(label="数量" v-if="formDep.quantitative==1" prop="quantity")
          el-input(type="number" v-model="formDep.quantity" clearable)      
      .btns(slot='footer')   
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消      
</template>
<script>
import modelSrc from '../model-srcs/规格'
export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      formDep:{
        name:'',
        quantitative:'',
        basic_unit_id:'',
        quantity:''
      },
      unitArray:[],
      title:'添加规格',
      showModal: false,
      selectModelSrc:{
        name:['规格名称','',{clearable:true}],
        quantitative:['属性','select',{emptyOption:'全部',mapper:{1:'可量化',0:'不可量化'},}]
      },
      modelSrc:modelSrc,
      rowOpers:[
        {
          text:'编辑',
          type:'primary',
          handler:row=>{
            Object.assign(this.formDep,row)
            this.showModal= true
            this.title='编辑规格'
          }
        }
      ],
      rules:{
        name:[{required:true,message:'规格名称'}],
        quantitative:[{required:true,message:'请选择性质'}],
        quantity:[{required:true,message:'必填'}],
        basic_unit_id:[{required:true,message:'必选'}],
        // basic_unit_id:[{required:true,messsage:'必填'}]
      }
    }
  },
  mounted(){
    this.getUnits()
  },
  methods:{
    add(){
      this.title="添加规格",
      this.showModal= true
    },
    confirm(){
      this.$refs.formDep.validate(valid=>{
        if(valid) {
          //请求类型（添加或者编辑）
          var aj = this.title == '添加规格'?  this.$_app.post : this.$_app.put 
          var params = JSON.parse(JSON.stringify(this.formDep))
          //删掉一些没用的参数
          delete params.update_time
          delete params.create_time
          delete params.is_del
          delete params.admin_no
          aj('规格',params,'.mdialog').then(d=>{
            this.$message.success(d.message || d.msg)
            this.$refs.formDep.resetFields()
            this.formDep.quantity=''
            this.showModal= false
            this.$refs.form.select()
          })
          
        }
      })
    },
    getUnits(){ //接口拿到单位列表
      this.$_app.get('单位').then(d=>{
        console.log('单位数据',d)
        d.data.ret.forEach(e=>{
          this.unitArray.push({value: e.id, label:e.name}),
          this.modelSrc.basic_unit_id[2].mapper[e.id] = e.name
        })
      })
    },
    dialogClose(){
      this.$refs.formDep.resetFields()
      this.formDep.quantity=''
    },
  }
}
</script>