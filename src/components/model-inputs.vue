<template lang='pug'>
  //-@author xuan 
  //-@description 表格嵌入多类型表单（输入框，单选、多选、时间选择器等等）
  .model-inputs
    //- el-form-item(v-for='attr in model' :label='attr.label' :key='attr.prop' v-if='!attr.tableOnly && ((isInsert && !attr.hideInInsert)||(!isInsert && !attr.hideInEdit))' :prop='attr.prop')
    //-   el-input(v-if='attr.type=="text"' v-model='attr.formatter?attr.formatter(form, attr.prop, form[attr.prop]):form[attr.prop]' :maxlength='attr.maxLength'  :disabled='(attr.disableEdit && isEdit) || isInfo' :placeholder='attr.placeholder')
    el-form-item(v-for='attr in model' :label='attr.label' :class='[attr.type=="passwordHidden" ? "hiddenPassword": ""]' :key='attr.prop' v-if='!attr.tableOnly && ((isInsert && !attr.hideInInsert)||(!isInsert && !attr.hideInEdit))' :prop='attr.prop')
      el-input(v-if='attr.type=="text"' v-model='attr.formatter?attr.formatter(form, attr.prop, form[attr.prop]):form[attr.prop]' :maxlength='attr.maxLength'  :disabled='(attr.disableEdit && isEdit) || isInfo' :placeholder='attr.placeholder')
      el-input(v-if='attr.type=="password"' type='password' v-model='form[attr.prop]' :maxlength='attr.maxLength' :disabled='(attr.disableEdit && isEdit) || isInfo' :placeholder='attr.placeholder')
      el-input(v-show='!attr.type=="passwordHidden"' type='password'  readonly) 
      //- chrome浏览器会记住密码并填充，加一个隐藏input，让填充不引响原本的弹框
      el-date-picker(v-if='attr.type=="date" && !(attr.multiInsert && isInsert)' :clearable='attr.isClear' v-model='form[attr.prop]' placeholder="选择日期" value-format='yyyy-MM-dd')
      el-date-picker(v-if='attr.type=="month" && !(attr.multiInsert && isInsert)' type="month" v-model='form[attr.prop]' placeholder="选择日期" value-format='yyyy-MM')
      el-date-picker(v-if='attr.type=="daterange"' v-model='form[attr.prop]'  start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' type='daterange')
      el-time-picker(v-if='attr.type=="time"' v-model='form[attr.prop]' placeholder="选择时间" value-format='HH:mm' format='HH:mm' :is-range='attr.isRange')
      el-input(v-if='attr.type=="textarea"' v-model='form[attr.prop]' type='textarea' :rows='3' :maxlength='attr.maxLength')
      viewer(v-if='attr.type == "imageShow"' :images='form[attr.prop]')
        img(:src='form[attr.prop]')
      el-select(v-if='attr.type=="select"' v-model='form[attr.prop]' placeholder="请选择" :disabled='(attr.disableEdit && isEdit) || isInfo' :multiple="attr.multiple")
        el-option(v-if='attr.emptyOption' :label='attr.emptyOption' value='')
        el-option(v-for='(value, key) in attr.mapper' :key='key' :label='value' :value='Number(key)')
      el-select(v-if='attr.type=="bool"' v-model='form[attr.prop]' placeholder="请选择"   )
        el-option(v-for='(value, key) in attr.mapper' :key='key' :label='value' :value='String(key)')
      el-input-number(v-if='attr.type=="natural"' v-model='form[attr.prop]' :min='0' :max='attr.naturalMax')
      file-input(v-if='attr.type=="image"' v-model='form[attr.prop]')
      file-input(v-if='attr.type=="apk"' v-model='form[attr.prop]' type="apk")
      multi-img-input(v-if='attr.type=="multi-image"' v-model='form[attr.prop]' :num='attr.num')
      slot(v-if='attr.type === "slot"')
</template>
<script>
import FileInput from './file-input'
import MultiImgInput from './multi-image-input'

export default {
  computed: {
    staffBtnStyle() {
      return ['primary', 'medium', this.form.userName || '请选择']
    }
  },
  components: {
    FileInput,
    MultiImgInput
  },
  props: ['model', 'form', 'isInsert', 'isEdit', 'isInfo'],
  mounted() {
    console.log('model',this.model)
    for (var attr of this.model) {
      if (attr.tableOnly) continue
      if (!(attr.prop in this.form)) {
        this.$set(this.form, attr.prop, '')
      }
    }
  },
  methods: {
    setStaff(data, prop) {
      this.form[prop] = data.currentUser.id
      this.$set(this.form, 'userName', data.currentUser.name)
      this.form.departmentId = data.currentUser.departmentId
    }
  }
}
</script>
<style lang='stylus' scoped>
.el-input, .el-select, .el-textarea, .el-input-number, .el-range-editor
  width 100%
.hiddenPassword
  margin 0 !important 
</style>