<template lang='pug'>
  //-
    @file 根据模型生成表单（带el-form及验证）
    @author 李小龙
    @date 2018/6/7
  el-form(ref='form' :model='form' :label-width='labelWidth || "100px"' :rules='myModel.rules')
    model-inputs(:form='form' :model='myModel' @first-file-time='$emit("first-file-time", $event)' :is-insert='mode=="insert"' :is-edit='mode=="edit"' :is-info='mode=="info"')
      slot
</template>

<script>
import Model from 'crud-model-class'

export default {
  computed: {
    myModel() {
      return this.model || new Model(this.modelSrc)
    },
  },
  props: {
    form: Object,
    labelWidth: String,
    mode: String, //处于哪种模式，可选值：insert|edit|info
    model: Array,
    modelSrc: Object,
  },
  mounted() {
  },
  methods: {
    //向上传递el-form的方法
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    validate(cb) {
      return this.$refs.form.validate(cb)
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
