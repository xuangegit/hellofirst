<template lang="pug">
  .page
    page-title 单位管理
    crud(name="单位" :form='form' :btns-shown="btns" ref='form'  hasIndex  hasAdd :select-model-src="selectModelSrc" )
      
</template>
<script>

export default {
  data(){
    return {
      form:{
        size: 20,
        pg: 1
      },
      selectModelSrc:{
        hidden: ['', 'passwordHidden', {extraRules: [{showPassword: false}]}],
        name:['单位名称',''],
        quantitative:['属性','select',{emptyOption:'全部',mapper:{1:'可量化',0:'不可量化'},}]
      },
      
    }
  },
  methods:{
   
  }
}
</script>
