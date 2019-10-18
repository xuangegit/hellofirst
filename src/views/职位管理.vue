<template lang="pug">
  .page
    page-title 职位管理
    crud(name="职位" :form='form' :btns-shown="btns" ref='form' :model-src="modelSrc"  hasIndex   hasAdd :row-opers="rowOpers" :handle-table-data="handleTableData")
      el-form(:inline="true")
        el-form-item(label="部门")
          el-select(v-model="form.department_id")
            el-option(label="全部" value="")
            el-option(v-for="item in departmentArray" :label="item.dep_name" :key="item.id" :value="item.id")
      el-dialog.mdialog(title='权限分配' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
        .elTree
          el-tree(:data="treeData" show-checkbox node-key="id" ref="tree")
        .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消  
      
</template>
<script>
import modelSrc from '../model-srcs/职位'
export default {
  data(){
    return {
      showModal:false,
      form:{
        size: 20,
        pg: 1,
        department_id:''
      },
      modelSrc:modelSrc,
      // selectModelSrc:{
      //   department_id:['部门名称','select', {emptyOption:'全部', mapper:{}}]
      // },
      departmentArray:[],
      treeData:[
        {
          label:'申请权限',id:1,
          children:[
            {label:'请假申请',id:11},
            {label:'报损申请',id:12},
            {label:'赠送申请',id:13},
          ]
        },
        {
          label:'审批权限',id:2,
          children:[
            {label:'审批申请',id:21},
            {label:'审批申请',id:22},
            {label:'审批申请',id:23},
          ]
        }
      ],
      rowOpers:[
        {
          text:"权限管理",
          type:'success',
          handler:row=>{
            console.log(row)
            this.showModal=true
          }
        }
      ]
    }
  },
  mounted(){
    this.getDepartment()
  },
  methods:{
    getDepartment() {
      this.$_app.get('部门').then(d=>{
        console.log('部门数据',d)
        this.departmentArray=d.data.ret
        d.data.ret.forEach(e=>{
          this.modelSrc.department_id[2].mapper[e.id]=e.dep_name
        })
        console.log(this.selectModelSrc)
      })
    },
    confirm(){
      console.log(this.$refs.tree.getCheckedNodes());
      console.log(this.$refs.tree.getCheckedKeys());
    },
    handleTableData(data){
      data.forEach(d=>{
          d.is_department_heads = d.is_department_heads?1:0
      })
      return data
    },
    dialogClose(){
    
    }
  }
}
</script>
<style scoped>
.elTree {
  margin-left: 100px;
  min-height: 400px;
  max-height: 400px;
}
</style>
