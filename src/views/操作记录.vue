<template>
 <div class="page">
   <page-title>操作记录</page-title>
   <crud :btns-shown='btns' name="操作记录" :form="form" ref="childFuc" :select-model-src='selectModel' :readonly='true' :hide-oper='true' :has-index='true'>
   </crud>
 </div>
</template>

<script>
import { formatToMonth } from '../js/util'

export default {
  data() {
    return {
      form: {
        userName: '',
        date: '',
      },
      selectModel: {
        hidden: ['', 'passwordHidden', {extraRules: [{showPassword: false}]}],
        name: ['用户名', '', { placeholder: '请输入关键字搜索' }],
        date: [
          '操作时间',
          'month',
          {
            placeholder: '请选择时间'
          }
        ]
      }
    }
  },
  beforeMount() {
    this.form.date = formatToMonth(new Date())
  }
}
</script>

<style>
</style>
