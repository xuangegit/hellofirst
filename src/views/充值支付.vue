<template lang='pug'>
  .page
    page-title
    crud(:form='form' name='充值支付' ref='tablePer' :handle-table-data='handleTableData' :row-opers='rowOpers' readonly)
      el-form(:inline='true')
        el-form-item(label='支付名称')
          el-input(v-model='form.name')
      template(slot='fr')
        el-button.fr(type='primary' @click='addpay' style='margin:0;')
          i.el-icon-plus
          |  添加
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false')
      el-form(label-width="110px" :model="formDep" :rules="rules" ref="formDep")
        el-form-item(label="支付名称" prop="name")
          el-input(v-model="formDep.name")
        el-form-item(label="支付代码" prop="code")
          el-input(v-model="formDep.code")
        el-form-item(label="支付费率" prop="rate")
          el-input(type='number' v-model="formDep.rate" style='width:92%')
          span(style='display:inline-block;width:3%;margin-left:3%;') %
      .btns(slot='footer')
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消
</template>

<script>

export default {
  data() {
    var validateRate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入费率'))
      } else if(value>100 || value<0){
        callback(new Error('请输入0-100的数字'))
      } else {
        callback()
      }
    }
    return {
      showModal: false,
      min: 0,
      max: 100,
      title: '',
      form: {
        name: '',
        pg: 1,
        size: 20,
      },
      formDep: {
        id: '',
        name: '',
        code: '',
        rate: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入代码', trigger: 'blur' }
        ],
        rate: [
          { validator: validateRate, required: true, trigger: 'blur' }
        ]
      },
      rowOpers: [{
        text: '暂停',
        type: 'danger',
        hide: row => {
          return row.status == false
        },
        handler: row => {
          this.$confirm('确认暂停？', {type: "info"}).then(d => {
            return this.$_app.get('暂停支付', {id: row.id, status: 0})
          }).then(d => {
            this.$message.success('暂停成功')
            this.$refs.tablePer.select()
          })
        }
      },{
        text: '启用',
        type: 'success',
        hide: row => {
          return row.status == true
        },
        handler: row => {
          this.$confirm('确认启用？', {type: "info"}).then(d => {
            return this.$_app.get('暂停支付', {id: row.id, status: 1})
          }).then(d => {
            this.$message.success('启用成功')
            this.$refs.tablePer.select()
          })
        }
      },{
        text: '编辑',
        type: 'primary',
        disable: row => {
          return  row.status == true
        },
        handler: row => {
          this.title = '编辑支付'
          this.formDep = {
            id: row.id,
            name: row.name,
            code: row.code,
            rate: row.rate,
          }
          this.showModal = true
          if (this.$refs.formDep) this.$refs.formDep.resetFields()
        }
      }]
    }
  },
  methods: {
    addpay() {
      this.title = '添加支付'
      this.formDep = {
        name: '',
        code: '',
        rate: '',
      }
      this.showModal = true
      if (this.$refs.formDep) this.$refs.formDep.resetFields()
    },
    confirm() {
      this.$refs.formDep.validate(valid => {
        if (valid) {
          if (this.title == '添加支付') {
            this.$_app.post('充值支付Insert', this.formDep, '.el-dialog', true).then(d => {
              this.$message.success(d.message)
              this.showModal = false
              this.$refs.tablePer.select()
            })
          } else if (this.title == '编辑支付') {
            this.$_app.post('充值支付Update', this.formDep, '.el-dialog', true).then(d => {
              this.$message.success(d.message)
              this.showModal = false
              this.$refs.tablePer.select()
            })
          }
        }
      })
    },
    handleTableData(d) {
      d.forEach((e, i) => {
        e.ratee = e.rate + '%'
      })
      return d
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>