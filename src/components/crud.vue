<template lang='pug'>
  //-
    @file 增删改查通用组件
    @author 李小龙
    @date 2018/8/16
  .crud(:class='{"hide-paging": hidePaging}')
    .functions
      el-form(ref='selectForm' :inline='true' v-if='mySelectModel' :model='form' :rules='mySelectModel.rules')
        model-inputs(:model='mySelectModel' :form='form' :has-project-tree='hasProjectTree')
        slot(name='formSelect')
      slot
      el-button(type='primary' @click='select(1)' v-if='!hideSelect')
        i.el-icon-search
        |  查询
      el-button.fr(type='primary' @click='exportTable' v-if='hasExport && btnsShown.includes("导出")')
        i.el-icon-download
        |  导出
      slot(name='fr')
      el-button.fr(type='primary' @click='showAdd' v-if='hasAdd && btnsShown.includes("添加")')
        i.el-icon-plus
        |  添加
      slot(name='se')
    //- .column-select
    //-     span(style="margin-right:10px") 隐藏
    //-     el-select(v-model='columnArray' multiple  clearable collapse-tags)
    //-       el-option(v-for="(item,index) in myModelDate" :label='item.tableName || item.label' :key="index" :value="index")
    //-     span(style="margin-left:8px") 数据列 
    el-table(:data='tableData' border='' style="overflow:hidden" :height='myTableHeight' @selection-change="handleSelectionChange" :cell-class-name='cellClassName' :span-method='spanMethod' :summary-method="summaryMethod" :show-summary='showSummary')
      el-table-column(type="index" :index="indexMethod"  width='40' v-if="!hideIndex" align='center')
      el-table-column(type="selection" width="36" v-if="hasCheckbox" :selectable='selectTable' align='center')
      el-table-column(v-if='!attr.hideInTable && !(columnArray.includes(index))' v-for='(attr,index) in myModelDate' :label='attr.tableName || attr.label' :key='attr.prop' :min-width='attr.minWidth||(attr.type=="image"?100:80)' :sortable='attr.sortable' align='center')
        template(slot-scope="scope")
          .cell-content(v-if='attr.type != "parent"')
            span(v-if='attr.type!="image" && attr.type != "multi-image"' v-text='attr.formatter?attr.formatter(scope.row, attr.prop, scope.row[attr.prop]):scope.row[attr.prop]')
            viewer(v-if='attr.type == "image"' :images='[scope.row[attr.prop]]')
              img(:src='scope.row[attr.prop]')
            template(v-if='attr.type=="multi-image" && scope.row[attr.prop]!=null')
              viewer.multi-image(:images='scope.row[attr.prop]')
                img(v-for='src in scope.row[attr.prop]' :src='src')
      el-table-column(v-if='(rowOpers&&rowOpers.some(op => btnsShown.includes(op.text))) || hasInfo || !readonly' fixed="right" label="操作" :min-width='operWidth||"110px"' :width='fixedWidth' align='center')
        template(slot-scope="scope" v-if='!hideRowOper || !hideRowOper(scope.row)')
          el-button(@click="showEdit(scope.row)" size="small" type='primary' v-if='!hideOper &&!hideEdit && !readonly && btnsShown.includes("编辑")') 编辑
          el-button(@click="showInfo(scope.row)" size="small" type='primary' v-if='!hideOper && hasInfo && btnsShown.includes("详情")') 详情
          //暂不考虑权限按钮字会变的情况
          el-button(v-for='(oper, $index) in rowOpers' :key='$index' size='small' :type='oper.type||"primary"' @click='oper.handler(JSON.parse(JSON.stringify(scope.row)))' v-if='(!oper.hide || !oper.hide(scope.row)) && btnsShown.includes(oper.text)' :disabled='(oper.disable ? oper.disable(scope.row) : false)') {{(typeof oper.text == 'function')?oper.text(scope.row):oper.text}}
          el-button(@click="remove(scope.row)" size="small" type='danger' v-if='!hideDelete && !readonly && btnsShown.includes("删除")') 删除
          //- span(v-if="scope.row.defaultRole == 1" v-text='sysRole')
    el-pagination(v-if='!hidePaging' layout='total, sizes, prev, pager, next, jumper', :total='total', @current-change='currentChange', @size-change='sizeChange', :page-sizes='[5, 10, 20, 30, 50]', :page-size='form.size', :current-page='form.pg')
    model-form-dialog(:form='addForm' mode='insert' :model='myModel' :title='"添加"+name' :visible.sync='showAddModal' @save='insert' :tip='editTip' :width='dialogWidth')
    model-form-dialog(:form='editForm' mode='edit' :model='myModel' :title='"编辑"+name' :visible.sync='showEditModal' @save='update' :tip='editTip' :width='dialogWidth')
    model-form-dialog(v-if='hasInfo' :form='infoForm' mode='info' :model='myModel' :title='name+"详情"' :visible.sync='showInfoModal' :width='dialogWidth' hide-save)
</template>

<script>
import allApi from '../js/apis.js'
import app from '../js/app.js'
import Model from 'crud-model-class'
// import ModelInputs from './model-inputs'
import {rangeValidator} from '../js/util'
// import {ModelFormDialog} from 'bird-ui'

export default {
  props: {
    'apiName': {}, //增删改查接口名前缀，不传时默认使用name
    'beforeSave': {}, //添加或编辑前对表单做处理
    'btnsShown': {default: () => {
      return {includes: () => true}
    }}, //有权限的按钮，不传时默认都有权限
    'defer': {}, //一进来不查询
    'dialogWidth': String, //3个弹出框的宽度
    'dontFit': {}, //不自适应高度
    'editTip': String, //添加和编辑框的提示
    'form': {required: true}, //查询表单
    'frontPaging': Boolean, //是否是前端分页
    'hasInfo': {}, //查看详细按钮
    'handleInfo': {}, //异步处理详细数据
    'handleTableData': {}, //展示前处理数据
    'hasAdd': {}, //添加按钮
    'hasCheckbox': {}, //表格左侧勾选框
    'hasExport': {}, //导出
    'hasProjectTree': {}, //查询表单有项目选择树弹框
    'hasRangeValidator': {}, //是否有时间范围校验
    'hideIndex': {}, //隐藏列表序号
    'hideSelect': {}, //隐藏查询按钮
    'hideDelete': {}, //隐藏删除按钮
    'hideEdit':{},    //隐藏编辑按钮
    'hideOper': {},    //隐藏详细、删除、编辑按钮
    'hidePaging': {}, //隐藏分页
    'hideRowOper': {}, //隐藏某些行的操作按钮
    'model': {},
    'modelSrc': {}, //model和modelSrc二选一，都不传时根据name从model-srcs文件夹自动导入
    'name': {required: true}, //弹框标题显示的名称
    'operWidth': {},
    'fixedWidth': {},
    'cellClassName': {}, //设置单元格央视
    'readonly': {}, //只读表格（隐藏编辑和删除按钮）
    'rowOpers': {}, //行内自定义操作按钮
    'selectModelSrc': {}, //查询表单模型源
    'spanMethod': {}, //合并单元格
    'summaryMethod': {}, //自定义合计行
    'showSummary': {}, //是否显示合计行
    'selectTable': {}, //table checkbox是否禁选
    'staticTableData':{}, //作为测试数据(当后端接口未完成时)
    'indexMethod': {}, //自定义索引
    'diyHeight': Number, //减去表格的自定义高度
  },
  components: {
    // ModelFormDialog,
    // ModelInputs,
  },
  data() {
    return {
      addForm: {},
      allTableData: [], //存储上次查询的所有数据，用于前端分页
      editForm: {},
      infoForm: {},
      importedModel: null, //不传model和modelSrc时自动根据name引入model
      resizeListener: null,
      showAddModal: false,
      showEditModal: false,
      showInfoModal: false,
      tableData: [],
      total: 0,
      tableHeight: 200,
      selected: [],
      columnArray:[],
      // sysRole: '系统角色', //角色管理模块，系统角色，不显示按钮
    }
  },
  computed: {
    myApiName() {
      return this.apiName || this.name
    },
    myModel() {
      return this.model || this.importedModel || (this.modelSrc?new Model(this.modelSrc):[])
    },
    myModelDate() {
      var model = this.model || this.importedModel || (this.modelSrc?new Model(this.modelSrc):[])
      var modelData = []
      if (model.length > 0) {
        model.forEach(e => {
          if(!e.hideIntable) {
            modelData.push(e)
          } 
        })
      }
      return modelData
    },
    mySelectModel() {
      return (this.selectModelSrc?new Model(this.selectModelSrc):null)
    },
    myTableHeight() {
      return this.dontFit?null:this.tableHeight
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  },
  mounted() {
    if (!this.model && !this.modelSrc) import('../model-srcs/'+this.name).then(d => {
      this.importedModel = new Model(d.default)
    })
    if (!this.dontFit) {
      this.getHeight()
      this.resizeListener = window.addEventListener('resize', this.getHeight())
      setTimeout(this.getHeight(), 200)
    }
    if (this.defer) return
    this.select()
  },
  methods: {
    //自适应屏幕大小
    getHeight() {
      if (
        !document.querySelector('main') ||

        !document.querySelector('.functions')
      )
        return
      //解决el-table不能快速改变height的bug
      this.$nextTick(() => {
        this.tableHeight =
          document.querySelector('main').clientHeight -
          (document.querySelector('.page-title')? document.querySelector('.page-title').offsetHeight:0) -
          (document.querySelector('.tabs .el-tabs__header')? document.querySelector('.tabs .el-tabs__header').offsetHeight+15:0)- 
          (document.querySelector('.selfBox')? document.querySelector('.selfBox').offsetHeight:0) - //页面组件中如果有自定义模块会增加高度导致出现滚动条，自定义模块class名字取为selfBox
          (document.querySelector('.display .functions')?document.querySelector('.display .functions').offsetHeight:document.querySelector('.functions').offsetHeight) - //解决一个页面多个crud组件表格高度异常导致最外层出现滚动条的问题（比如一个页面多个tab页包含了crud组件）需要给当前tab页下的crud 名为'dispaly' class，其他tab页下的class 名称为非’display‘
          (document.querySelector('.column-select')? document.querySelector('.column-select').offsetHeight:0) -
          (this.diyHeight ? this.diyHeight : 0) -
          (this.hidePaging?31:63)
      })
    },
    currentChange(pg) {
      this.form.pg = pg
      var end = this.form.size * this.form.pg
      if (this.frontPaging) {
        this.tableData = []
        this.$nextTick(() => {
          this.tableData = this.allTableData.slice(end-this.form.size, end)
        })
      } else this.select()
    },
    exportTable() {
      var form = document.getElementById('export-form') || document.createElement('form')
      document.body.appendChild(form)
      form.outerHTML = `<form id='export-form' action='${allApi[this.myApiName + 'Export']}' style='display:none' method='get'>
        <input type='text' name='token' value='${sessionStorage.token}'>
        ${this.getParamsInputs(this.form)}
      </form>`
      document.getElementById('export-form').submit() //更改outerHTML后form不再指向是新生成的form，需重新获取
    },
    /** 将参数对象转换成一串input */
    getParamsInputs(params) {
      var result = ''
      for (var i in params) {
        result += `<input type='text' name='${i}' value='${params[i]==null?'':params[i]}'>`
      }
      return result
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    insert() {
      if (this.beforeSave) {
        this.beforeSave(this.addForm)
      }
      app
        .post(this.myApiName, this.addForm, '.add .el-dialog')
        .then(d => {
          this.$message.success(d.message || d.responseMessage)
          this.showAddModal = false
          this.select()
          this.addForm = {}
        })
    },
    remove(row, msg, customKey) {
      let para = { [customKey || 'id']: row.id }
      this.$confirm(msg || '是否确定删除？', '提示', {
            type: 'warning'
          })
        .then(() => {
          app.delete(this.myApiName , para, 'main').then(d => {
            this.$message.success(d.message || d.responseMessage)
            this.select()
          })
        })
        .catch(e => {})
    },
    select(page) {
      if(this.staticTableData){
        this.tableData=this.staticTableData
        return 
      }
      // return false
      if (this.hasRangeValidator) {
        if (!rangeValidator(this.form)) return
      }
      var p = this.$refs.selectForm?this.$refs.selectForm.validate():Promise.resolve()
      p.then(() => {
        this.$emit('select-start')
        if (page != null) this.form.pg = page
        this.tableData = []
        var aj = app.get
        aj(this.myApiName, this.form, this.$el).then(d => {
          if (this.handleTableData)
            d.data.ret = this.handleTableData(d.data.ret)
          this.total = d.count || d.data.count
          this.allTableData = d.data.ret
          if (this.frontPaging) this.tableData = this.allTableData.slice(0, this.form.size)
          else this.tableData = this.allTableData
        })
      })
    },
    sizeChange(size) {
      this.form.size = size
      this.select()
    },
    showAdd() {
      var addForm = {}
      for (let m of this.myModel) {
        if (m.default != null) {
          addForm[m.prop] = m.default
        }
      }
      window.dialogMode = 'insert' //实现某些校验只应用在添加不应用在编辑
      this.addForm = addForm
      this.showAddModal = true
    },
    showEdit(row) {
      this.editForm = JSON.parse(JSON.stringify(row))
      window.dialogMode = 'edit' //实现某些校验只应用在添加不应用在编辑
      this.showEditModal = true
    },
    showInfo(row) {
      if (this.handleInfo) {
        // alert(1)
        this.infoForm = {}
        this.handleInfo(row).then(res => {
          this.infoForm = res
        })
      } else {
        this.infoForm = row
      }
      window.dialogMode = 'info' //实现某些校验只应用在添加不应用在编辑
      this.showInfoModal = true
    },
    update() {
      if (this.beforeSave) {
        this.beforeSave(this.editForm)
      }
      var aj = app.put
      aj(this.myApiName, this.editForm, '.edit .el-dialog').then(
        d => {
          this.$message.success(d.message || d.msg)
          this.showEditModal = false
          this.select()
          this.editForm = {}
        }
      )
    },
    // columnSelectChange(value) {
    //     console.log('column',value)
    // }
  }
}
</script>

<style lang='stylus' scoped>
.column-select
  text-align center
  line-height 2
  padding-bottom 5px
.multi-image
  max-height 100px
  img
    width 100%
.cell-content
  img
    max-height 100px
</style>
