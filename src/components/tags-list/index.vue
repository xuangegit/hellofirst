<template lang='pug'>
  div
    dynamic-tags(v-for="(item,index) in remarks_attribute_list" :key="index" v-model="item.child_attribute" btn-text="属性值" effect="dark" style="padding:10px;border:1px dotted #ccc")
      span 备选属性名称：
      el-input.inputBorderNone(v-model="item.name" placeholder='输入属性名称' style="width:120px!important;border:none!important;")
      //- br
      span 备选属性值：
    slot   
</template>  
<script>
import dynamicTags from './dynamic-tags'
export default {
  name:'tags-list',
  components:{
    dynamicTags
  },
  props:{
    value: Array,
  },
  data(){
    return {}
  },
  computed: {
     remarks_attribute_list(){
       return this.value
     }
  },
}
</script>>