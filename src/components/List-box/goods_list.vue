<template lang="pug">
  //-@decription 商品列组件
  el-form.good_list
    el-row(v-for="(item,index) in dataList" :key="index")
      el-col(:span="12")
        el-form-item(label="商品规格")
          el-select(v-model="item.good_specification_id" placeholder="请选择")
            el-option(v-for="(good,i) in good_list" :key="i" label="good.label" :value="item.value")
      el-col(:span="12")
        el-form-item(label="数量")
          el-input-number(v-model="item.quantity" :min="1") 
    el-row.opers
      .opers
        el-button(circle icon="el-icon-plus" type="primary" @click="addNext")    
        el-button(circle icon="el-icon-delete" type="danger" :disabled="dataList.length<2" @click="deleteLast")           

</template>
<script>
export default {
  props:{
    value:{
      type:Array,
    }
  },
  computed:{
    dataList(){
      return this.value
    }
  },
  data(){
    return {
       good_list:[]
    }
  },
  methods:{
    addNext(){
      this.dataList.push({ good_specification:'', quantity: '' })
    },
    deleteLast(){
      this.dataList.pop()
    }
  }
}
</script>