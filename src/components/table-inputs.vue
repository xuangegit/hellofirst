<template lang="pug">
  //- @author xuan 
  //- @description 表格编辑器
  tr
    td(v-if="hasIndex" )
      .span(style="display:block;width:100%;height:100%;text-align:center") {{index}}
    td(v-for='attr in model')
      el-input(v-if='attr.type=="text"' v-model='attr.formatter?attr.formatter(form, attr.prop, form[attr.prop]):form[attr.prop]' :maxlength='attr.maxLength'  :disabled='isInfo' :placeholder='attr.placeholder')
      el-input(v-if='attr.type=="textarea"' v-model='form[attr.prop]' type='textarea' :rows='3' :maxlength='attr.maxLength' :disabled='isInfo')
      el-date-picker(v-if='attr.type=="date"' :clearable='attr.isClear' v-model='form[attr.prop]' placeholder="选择日期" value-format='yyyy-MM-dd' :disabled='isInfo' )
      el-date-picker(v-if='attr.type=="month"' type="month" v-model='form[attr.prop]' placeholder="选择日期" value-format='yyyy-MM' :disabled='isInfo' )
      el-date-picker(v-if='attr.type=="daterange"' v-model='form[attr.prop]'  start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' type='daterange' :disabled='isInfo')
      el-time-picker(v-if='attr.type=="time"' v-model='form[attr.prop]' placeholder="选择时间" value-format='HH:mm' format='HH:mm' :is-range='attr.isRange' :disabled='isInfo')  
      el-select(v-if='attr.type=="select"' v-model='form[attr.prop]' placeholder="请选择" :disabled='isInfo' :multiple="attr.multiple")
        el-option(v-if='attr.emptyOption' :label='attr.emptyOption' value='')
        el-option(v-for='(value, key) in attr.mapper' :key='key' :label='value' :value='Number(key)')
      el-select(v-if='attr.type=="bool"' v-model='form[attr.prop]' placeholder="请选择"  :disabled='isInfo')
        el-option(v-for='(value, key) in attr.mapper' :key='key' :label='value' :value='String(key)')
      el-input-number(v-if='attr.type=="natural"' v-model='form[attr.prop]' :min='1' :max='attr.naturalMax')
      //- file-input(v-if='attr.type=="image"' v-model='form[attr.prop]')
      //- file-input(v-if='attr.type=="apk"' v-model='form[attr.prop]' type="apk")
      //- multi-img-input(v-if='attr.type=="multi-image"' v-model='form[attr.prop]' :num='attr.num')
      slot(v-if='attr.type === "slot"')
    td(v-if="!isInfo")
      el-button(icon="el-icon-plus" circle size="mini" type="primary" @click="opersFn.addFn.handler(index)" )
      el-button(icon="el-icon-minus" circle size="mini" type="danger" @click="opersFn.deleteFn.handler(index)" :disabled="opersFn.deleteFn.disable()")    
</template>
<script>
import FileInput from './file-input'
import MultiImgInput from './multi-image-input'
export default {
  components: {
    FileInput,
    MultiImgInput
  },
  props: ['model', 'form', 'isInfo','index','hasIndex','opersFn'],
  data(){
    return {}
  },
  mounted(){
    for (var attr of this.model) {
      if (!(attr.prop in this.form)) {
        this.$set(this.form, attr.prop, '')
      }
    }
    console.log('model',this.model)
    console.log('form',this.form)
  },
}
</script>
<style>
td .el-input .el-input__inner{
    border:none!important
  }
</style>
<style scoped>
  .el-input,.el-select,.el-date-picker,.el-input-number,.el-time-picker{
    width: 100%;
    border: none;
  }
 .el-input .el-input__inner{
    border:none!important
  }
  td{
    border:1px solid #bbbbbb
  }
</style>