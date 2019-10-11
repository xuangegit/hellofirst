<template>
<div class="page">
    <page-title>菜单管理</page-title>
    <el-container>
        <el-container>
            <el-aside class="elAside" style="overflow: hidden">
                <div style="height: 40px; border-bottom: 1px solid #eaeaea; text-align: center;">
                    <span style="line-height: 40px;">菜单</span>
                </div>
                <div class="tree">
                <el-tree style="padding: 10px" :default-expanded-keys="expandedKeys" :data="dataTree" :props="defaultProps" @node-click="handleNodeClick">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)">
                        删除
                      </el-button>
                    </span>
                  </span>
                </el-tree>
                </div>
            </el-aside>
            <el-main class="elMain">
                <el-tabs class="elTabs" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="编辑菜单" name="first">
                        <div class="elForm">
                            <el-form :model='editForm' :rules="mustInput" ref="editForm">
                                <el-form-item label='菜单名称' prop="name">
                                    <el-input v-model="editForm.name"></el-input>
                                </el-form-item>
                                   <el-form-item label='请求地址' prop="url_path" v-if="editForm.menu_type == 3">
                                    <el-input v-model="editForm.url_path"></el-input>
                                </el-form-item>
                                <el-form-item label='请求方式' prop="request_method" v-if="editForm.menu_type == 3">
                                    <el-input v-model="editForm.request_method"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单图标'>
                                    <el-input v-model="editForm.icon"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单排序'>
                                    <el-input v-model="editForm.serial_number" type="number"></el-input>
                                </el-form-item>
                                <el-form-item label='描述'>
                                    <el-input v-model="editForm.description"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="button" type='primary' @click='saveEdit("editForm")'>保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="新增菜单" name="second">
                        <div class="elForm">
                            <el-form :model='insertForm' :rules='mustInput' ref="insertForm">
                                <el-form-item label='上级菜单名称'>
                                    <el-input v-model="insertForm.fatherName" :readonly="true"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单名称' prop="name">
                                    <el-input v-model="insertForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单类型' prop="menu_type">
                                    <el-select v-model="insertForm.menu_type" style="width: 100%">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label='请求地址' prop="url_path" v-if="insertForm.menu_type == 3">
                                    <el-input v-model="insertForm.url_path"></el-input>
                                </el-form-item>
                                <el-form-item label='请求方式' prop="request_method" v-if="insertForm.menu_type == 3">
                                    <el-input v-model="insertForm.request_method"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单图标'>
                                    <el-input v-model="insertForm.icon"></el-input>
                                </el-form-item>
                                <el-form-item label='菜单排序'>
                                    <el-input v-model="insertForm.serial_number" type="number"></el-input>
                                </el-form-item>
                                <el-form-item label='描述'>
                                    <el-input v-model="insertForm.description"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="button" type='primary' @click='saveInsert("insertForm")'>保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import app from '../js/app.js'

export default {
  data() {
    return {
      // activePlatform: '', // 选中平台
      tabName: '', //页签
      activeName: 'first', //默认页签
      dataTree: [], // 树
      name: '',
      type: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      mustInput: {
        name: { required: true, message: '必填', trigger: 'blur' },
        menu_type: { required: true, message: '必填', trigger: 'change' },
        url_path: { required: true, message: '必填',trigger:'blur'},
        request_method: { required: true, message: '必填',trigger:'blur'}
      },
      options: [
        {
          value: 1,
          label: '顶级菜单'
        },
        {
          value: 2,
          label: '菜单'
        },
        {
          value: 3,
          label: '按钮'
        }
      ],
      editForm: {
        id: '',
        name: '',
        menu_type: '',
        url_path: '',
        request_method: '',
        serial_number: '',
        superior_menu_id: '',
        icon: '',
        description: '',
      },
      insertForm: {
        fatherName: '',
        // platformId: '',
        name: '',
        menu_type: '',
        // menuUrl: '',
         url_path: '',
        request_method: '',
        serial_number: '',
        superior_menu_id: '',
        icon: '',
        description: '',
      },
      // platforms: [],
      // nodeId: '',
      expandedKeys: [] //不展开
    }
  },
  components: {},
  beforeMount() {
    this.initTree()
    // this.getPlatform()
  },
  methods: {
    initTree() {
      // 初始化菜单树
      app.get('菜单管理', {}, this.$el).then(d => {
        console.log(d)
        this.dataTree = d.data.ret
      })
    },
    handleNodeClick(data) {
      console.log('data',data)
  
      if (this.tabName == 'first' || !this.tabName) {
        this.editForm.id = data.id
        this.editForm.name = data.name
        // this.editForm.menuUrl =  data.resUrl || ''
          this.editForm.menu_type =data.menu_type 
        if (data.menu_type==3) {  
          this.editForm.url_path = data.url_path
          this.editForm.request_method = data.request_method
        } 
        this.editForm.icon = data.icon || ''
        this.editForm.description = data.description || ''
        this.editForm.serial_number = data.serial_number || ''
        this.editForm.superior_menu_id = data.superior_menu_id
      } else {
        this.insertForm.fatherName = data.name
        this.insertForm.superior_menu_id = data.id
        this.insertForm.menu_type = ''
        this.insertForm.name = ''
        this.insertForm.url_path = ''
        this.insertForm.request_method = ''
        this.insertForm.icon = ''
        this.insertForm.description = ''
        this.insertForm.serial_number = ''
      }
    },
    handleClick(tab) {
      //切换页签时消除表单数据
      this.tabName = tab.paneName
      if (this.tabName == 'second') {
        this.editForm.name = ''
        this.editForm.icon = ''
        this.editForm.description = ''
        this.editForm.serial_number = ''
        this.editForm.url_path = ''
        this.editForm.request_method = ''
      } else {
        this.insertForm.fatherName = ''
        this.insertForm.menu_type = ''
        this.insertForm.name = ''
        this.insertForm.url_path = ''
        this.insertForm.request_method = ''
        this.insertForm.icon = ''
        this.insertForm.description = ''
        this.insertForm.serial_number = ''
      }
    },
    remove(node) {
      let deleteForm = {}
      deleteForm.id = node.data.id
      if (node.data.buttonName) {
        deleteForm.type = 3 //按钮
      } else {
        deleteForm.type = 2 //菜单
      }
      this.$confirm('是否确定删除？', '提示', {type: 'warning'}).then(() => {
        app.delete('菜单管理', deleteForm, this.$el).then(d => {
          this.$message.success(d.message || d.msg)
          this.initTree()
        })
      })
    },
    
    saveInsert(formName) {
      //新增
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = {}
          form.name = this.insertForm.name
          if(this.insertForm.menu_type == 1) { //顶级菜单
            form.superior_menu_id = ''
            form.menu_type = 1
          } else {
            form.superior_menu_id = this.insertForm.superior_menu_id
            form.menu_type = this.insertForm.menu_type
            if(this.insertForm.menu_type==3){
              form.url_path = this.insertForm.url_path
              form.request_method = this.insertForm.request_method
            }
          }
          form.description = this.insertForm.description
          form.icon = this.insertForm.icon
          form.serial_number = Math.floor(Math.abs(this.insertForm.serial_number))
          app.post('菜单管理', form, this.$el).then(d => {
            this.$message.success(d.message || d.msg)
            this.initTree()
          })
        }
      })
    },
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formEdit = {}
          formEdit.name = this.editForm.name
          formEdit.icon = this.editForm.icon
          // formEdit.resUrl = this.editForm.menuUrl || ''
          formEdit.id = this.editForm.id
          formEdit.superior_menu_id = this.editForm.superior_menu_id
          formEdit.menu_type = this.editForm.menu_type
          formEdit.description = this.editForm.description
          formEdit.serial_number = Math.floor(Math.abs(this.editForm.serial_number))
          if(this.editForm.menu_type==3){
            formEdit.url_path = this.editForm.url_path
            formEdit.request_method = this.editForm.request_method
          }
          app.put('菜单管理', formEdit, this.$el).then(d => {
            this.$message.success(d.message || d.msg)
            this.initTree()
          })
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.elAside {
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  line-height: 29px;
  height: 600px;
  width: auto!important
}

.elMain {
  padding: 0;
  border-bottom: 1px solid #eaeaea;
}

.elForm {
  padding: 0 20px;
  width: 450px;
  margin: 0 100px;
}

.button {
  margin: 0 auto;
  display: block;
  width: 100px;
}

.tree {
  overflow: scroll;
  height: 570px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<style>
/*全局*/
.el-tabs__nav {
  margin-left: 50px;
}
.el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
