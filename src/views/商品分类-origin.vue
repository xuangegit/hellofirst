<template lang="pug">
  .page
    page-title 商品分类
    crud(name="商品分类" :form='form'  ref='form' :row-opers='rowOpers' hasIndex  :staticTableData="staticTableData"  hideOper )
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add") 添加
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="700px" @close="dialogClose")
      el-form(label-width="150px" :model="formDep" :rules="rules" ref="formDep")
        el-form-item(label="商品种类名称" prop="name")
          el-input(v-model="formDep.name" maxLength="30" :disabled="title=='编辑商品种类'" placeholder="请输入商品种类名称" clearable)
        el-form-item(label="二级分类:")
          el-row.level-container
            el-col(:span="16")
              el-form-item.level-item(v-for="(item,index) in formDep.children" :key="index")
                el-input(v-model="item.name" placeholder="请输入二级分类名称" clearable)
            el-col(:span="8" style="text-align:right;position:absolute;bottom:5px;right:5px")    
              el-button(circle icon="el-icon-plus" type="primary" @click="addNext")
              el-button(circle icon="el-icon-delete" type="danger" @click="deleteLast")      
      .btns(slot='footer')   
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消      
</template>
<script>
export default {
  data(){
    return{
      form:{
        pg:1,
        size:20
      },
      formDep:{
        name:'',
        // description:'',
        children:[{name:""}]
      },
      title:'添加商品种类',
      showModal: false,
      staticTableData:[{name:'商品种类1',rgb: '#fff520',discount: 0.8,description:'这是商品种类1'}], //测试数据
      rowOpers:[
        {
          text:'编辑',
          type:'primary',
          handler:row=>{
            Object.assign(this.formDep,row)
            this.showModal= true
            this.title='编辑商品分类'
          }
        }
      ],
      rules:{
        name:[{required:true,message:'商品种类名称'}],
        rgb:[{required:true,message:'请输入rgb颜色值'}],
        discount:[{required:true,message:'请输入折扣值'}]
      }
    }
  },
  mounted(){

  },
  methods:{
    add(){
      this.showModal = true
      this.title="添加商品种类"
    },
    confirm(){

    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    },
    addNext(){
      this.formDep.children.push({name:''})
    },
    deleteLast(){
      this.formDep.children.shift()
    }
  }
}
</script>
<style scoped>
  .block{
    margin:10px 0;
  }
  .level-container{
    padding: 20px 10px;
    border:1px solid #cccccc;
  }
  .level-item{
    margin-bottom:10px;
  }
  .level-item:nth-last-child(1){
    margin:0!important;
  }
</style>
<style>
.level-item{
    margin-bottom:10px;
  }
  .level-item:nth-last-child(1){
    margin:0!important;
  }
</style>


