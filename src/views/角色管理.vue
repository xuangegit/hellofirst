<template>
 <div class="page">
  <crud name="角色" :model-src='role' :has-index='true' :form='form' :rowOpers='rowOpers' :before-save='beforeSave' :has-add='true' :has-oper='true' ></crud>
  <el-dialog :visible.sync='operDialogShow' title="角色权限" class="tree">
    <el-form class="elForm" :model='treeForm' ref='treeForm'>
    <div class="elTree">
      <el-tree :data="dataTree" :default-checked-keys='initTreeChecked' @check='getChecked' ref="tree" show-checkbox node-key="id" :props="defaultProps">
      </el-tree>
    </div>
    </el-form>
    <div class="btns" slot='footer' v-show="confirm">
        <el-button type='primary' @click='save'>保存</el-button>
        <el-button @click='checkedId = [];initTreeChecked = [];operDialogShow = false'> 取消</el-button>
    </div>
  </el-dialog>
 </div>
</template>

<script>
import role from '../model-srcs/角色管理.js'
import app from '../js/app.js'

 export default {
   data () {    
     return {
       checkedNodes: [], //选中节点
       initTreeChecked: [], //初始化选中
       dataTree: [], //权限树
       treeForm: {}, //保存权限form
       checkedId: [], //节点ID
       operDialogShow: false, //权限树dialog
       role,
       role_id: '', //角色id
       isChange: false,
       confirm: true,
       form: {
         pg:1,
         size:20
       },
       defaultProps: {
        children: 'children',
        label: 'name',
       },
       rowOpers: [
         {
          text: '角色权限',
          type: 'success',
        //   hide: row => {
        //    return row.defaultRole != 1
        //  },
         handler: row => {
           this.operDialogShow =true
           this.role_id = row.id
            app
              .get('角色权限',{ role_id: Number(row.id)},'.tree')
              .then(d => {
                //初始化权限数据
                  console.log('权限列表',d)
                  this.initTreeChecked = d.data
                  // console.log('thisinit',this.initTreeChecked)
                  this.$refs.tree.setCheckedKeys(this.initTreeChecked);
              }).catch(()=>{
                this.$refs.tree.setCheckedKeys([])
              })
         } 
       }
       ]
     }
   },
   mounted(){
     this.getDataTree()
   },
   methods: {
     getDataTree(){
       app.get('菜单管理').then(d=>{
        //  console.log(d)
         this.dataTree=d.data.ret
       })
     },
     beforeSave(form) {
       delete form.update_time
       delete form.create_time
       delete form.is_del
     },
     getChecked(data, checked) { //用户操作
     console.log('checked',checked)
     console.log('data',data)
      this.isChange = true
      //data:该节点所对应的对象、checked:树目前的选中状态对象
      this.checkedNodes = checked.checkedNodes
     },
     save() {
        if (this.isChange == false) {
        this.operDialogShow = false
      } else {
        this.checkedId = []
        for (let node of this.checkedNodes) {
          //选中的节点
          if (node.menu_type == 3) {
            this.checkedId.push(node.id)
          }
        }
        if(this.checkedId.length==0){
          return this.$message.error('请选择权限')
        }
        app
          .post(
            '角色权限',
            {menu_list: this.checkedId,  id: this.role_id},
            this.$el
          )
          .then(d => {
            this.$message.success(d.message || d.responseMessage)
            this.operDialogShow = false
            this.checkedId = []
          })
      }
    },
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


<style>
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #00a1e9 !important;
  border-color: #00a1e9 !important;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #fff !important;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
  background-color: #00a1e9 !important;
  border-color: #00a1e9 !important;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::after {
  border-color: #fff !important;
}
.el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #fff !important;
  border-color: #00a1e9 !important;
  cursor: not-allowed;
}
</style>
