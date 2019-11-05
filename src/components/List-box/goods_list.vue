<template lang="pug">
  //-@decription 商品列组件
  .good_list(style="padding:10px;border:1px solid #ccc")
    el-row(v-for="(item,index) in dataList" :key="index" style="padding:8px 0")
      el-col(:span="8")
        el-form-item(label="商品" label-width="50px")
          el-select(v-model="item.good_specification_id" placeholder="请选择")
            el-option(v-for="(list,i) in good_list" :key="i" :label="list.label" :value="list.value")
      el-col(:span="8")
        el-form-item(label="商品规格" label-width="80px")
          el-select(v-model="item.good_specification_id" placeholder="请选择")
            el-option(v-for="(list,i) in listArray" :key="i" :label="list.label" :value="list.value")
      el-col(:span="8")
        el-form-item(label="数量" label-width="50px")
          el-input-number(v-model="item.quantity" :min="1") 
    el-row.opers
      .opers
        el-button(circle icon="el-icon-plus" type="primary" @click="addNext")    
        el-button(circle icon="el-icon-delete" type="danger" :disabled="dataList.length<2" @click="deleteLast")           
</template>
<script>
export default {
  // props:{
  //   value:{
  //     type:Array,
  //   }
  // },
  // computed:{
  //   dataList(){
  //     return this.value
  //   }
  // },
  data(){
    return {
       listArray:[],
       good_list:[],
       dataList:[{good_specification_id:'',quantity:''}],
    }
  },
  mounted(){

  },
  methods:{
    getGoods(){

    },
    getSpecificationsById(){ //获取商品规格通过商品ID

    },
    addNext(){
      this.dataList.push({ good_specification:'', quantity: '' })
    },
    deleteLast(){
      this.dataList.pop()
    }
  }
}
</script>