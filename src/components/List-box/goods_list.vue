<template lang="pug">
  //-@decription 商品列组件
  .good_list(style="padding:10px;border:1px solid #ccc")
    el-row(v-for="(item,index) in dataList" :key="index" style="padding:8px 0")
      el-col(:span="8")
        el-form-item(label="商品" label-width="60px")
          el-select(v-model="item.good_id" placeholder="请选择" filterable)
            el-option(v-for="(list,i) in good_list" :key="i" :label="list.name" :value="list.id")
      el-col(:span="8")
        el-form-item(label="商品规格" label-width="80px")
          dymanic-select(v-model="item.good_specification_id" :parent_id="Number(item.good_id)" :filter-options="filterOptions")
      el-col(:span="8")
        el-form-item(label="数量" label-width="60px")
          el-input-number(v-model="item.quantity" :min="1") 
    el-row.opers
      .opers
        el-button(circle icon="el-icon-plus" type="primary" @click="addNext")    
        el-button(circle icon="el-icon-delete" type="danger" :disabled="dataList.length<2" @click="deleteLast")           
</template>
<script>
import dymanicSelect from './dymanic-select'
export default {
  components:{
    dymanicSelect
  },
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
       arrayIndex:0,
       good_list:[],
      //  dataList:[{good_specification_id:'',quantity:''}],
       filterOptions:(listArray,ret)=>{
        ret.forEach(e=>{
          listArray.push({value:e.id, label:e.specification_name})
        })
      }
    }
  },
  mounted(){
    this.getGoods()
  },
  methods:{

    getGoods(){
      this.$_app.get('商品').then(d=>{
        console.log('商品',d)
        d.data.ret.forEach(e => {
          this.good_list.push({ name:e.good_name, id:e.id})
        })
      })
    },
    addNext(){
      this.dataList.push({ good_specification_id:'', quantity: '',good_id:'' })
    },
    deleteLast(){
      this.dataList.pop()
    }
  }
}
</script>