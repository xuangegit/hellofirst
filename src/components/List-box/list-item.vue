<template lang="pug">
  div(style="padding:8px 0")
    el-col(:span="8")
      el-form-item(label="商品" label-width="50px")
        el-select(v-model="item.good_id" placeholder="请选择" filterable)
          el-option(v-for="(list,i) in good_list" :key="i" :label="list.name" :value="list.id")
    el-col(:span="8")
      el-form-item(label="商品规格" label-width="80px")
        el-select(v-model="item.good_specification_id" placeholder="请选择")
          el-option(v-for="(list,i) in listArray" :key="i" :label="list.label" :value="list.value")
    el-col(:span="8")
      el-form-item(label="数量" label-width="50px")
        el-input-number(v-model="item.quantity" :min="1") 
</template>
<script>
export default {
  props:{
    item: {}
  },
  computed:{
    
  },
  data(){
    return {
      
    }
  }
}
</script>