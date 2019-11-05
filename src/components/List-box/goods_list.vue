<template lang="pug">
  //-@decription 商品列组件
  .good_list(style="padding:10px;border:1px solid #ccc")
    el-row(v-for="(item,index) in dataList" :key="index" style="padding:8px 0")
      el-col(:span="8")
        el-form-item(label="商品" label-width="50px")
          el-select(v-model="item.good_id" placeholder="请选择" filterable @change="goodChange(item,index)")
            el-option(v-for="(list,i) in good_list" :key="i" :label="list.name" :value="list.id")
      el-col(:span="8")
        el-form-item(label="商品规格" label-width="80px")
          el-select(v-model="item.good_specification_id" placeholder="请选择")
            el-option(v-for="(list,i) in listArray[index+'']" :key="list.value" :label="list.label" :value="list.value")
      el-col(:span="8")
        el-form-item(label="数量" label-width="50px")
          el-input-number(v-model="item.quantity" :min="1") 
    el-row.opers
      .opers
        el-button(circle icon="el-icon-plus" type="primary" @click="addNext")    
        el-button(circle icon="el-icon-delete" type="danger" :disabled="dataList.length<2" @click="deleteLast")           
</template>
<script>
// import listItem from './list-item'
export default {
  // components:{
  //   listItem
  // },
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
       listArray:{},
       good_list:[],
      //  dataList:[{good_specification_id:'',quantity:''}],
    }
  },
  mounted(){
    this.getGoods()
  },
  methods:{
    goodChange(item,index){
      item.good_specification_id=''
      this.listArray[index] = [] //清空第index规格下拉框数据
      this.arrayIndex=index
      console.log(index,item)
      console.log('dataList',this.dataList)
      this.getSpecificationsById(item.good_id)
    },
    getGoods(){
      this.$_app.get('商品').then(d=>{
        console.log('商品',d)
        d.data.ret.forEach(e => {
          this.good_list.push({ name:e.good_name, id:e.id})
        })
      })
    },
    getSpecificationsById(id){ //获取商品规格通过商品ID
    console.log('this.arrayIndex',this.arrayIndex)
      this.$_app.get('商品规格',{good_id: id}).then(d=>{
        console.log('商品规格',d)
        d.data.ret.forEach(e=>{
          this.listArray[this.arrayIndex].push({value:e.id, label:e.unit_name})
        })
        
      })
       console.log('this.arrayIndex', this.listArray)
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