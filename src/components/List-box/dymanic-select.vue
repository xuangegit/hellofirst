<template lang="pug">
  //- 动态下拉组件
  el-select(v-model="select_id" placeholder="请选择" @change="$emit('change',select_id)")
    el-option(v-for="(list,i) in listArray" :key="i" :label="list.label" :value="list.value")
</template>
<script>
export default {
  model:{
    event:'change'
  },
  props:{
    value:{},
    parent_id:Number,
    api_name:{
      type:String,
      default:'商品规格'
    },
    param_key:{
      type:String,
      default:'good_id'
    },
    filterOptions:{} // 下拉数组数据筛选函数
  },
  watch:{
    parent_id(id){
      this.select_id=''
      this.listArray = []
      if(id!=''){
        console.log('parent_id',id)
        this.$set(this.param,this.param_key,id)
        this.$_app.get(this.api_name,this.param).then(d=>{ 
          console.log('select',d)
          this.filterOptions(this.listArray,d.data.ret)
          // console.log(this.listArray)
        })
      }
      
    }
  },
  data(){
    return {
      select_id:'',
      param:{},
      listArray:[]
    }
  },
  mounted(){
    //  this.$set(this.param,this.param_key,this.id)
  }
}
</script>