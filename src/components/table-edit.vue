<template lang="pug">
  //- @author xuan 
  //- @description 表格编辑器
  
  .main
    table
      thead
        tr
          th(v-if="hasIndex" width="50") 序号
          th(v-for="(item,index) in model" :key='index') {{item.label}}
          th(v-if="!isInfo" style="min-width:80px;background-color: rgba(234, 183, 0, 0.5);" ) 操作
      tbody
        table-inputs(v-for="(form,index) in dataLst" :model="model" :form="form" :index="index" hasIndex :key="index" :is-info="isInfo" :opersFn="opersFn")

</template>
<script>
import tableInputs from './table-inputs'
import Model from 'crud-model-class'
export default {
  components:{
    tableInputs
  },
  props:{
    modelSrc:{},
    hasIndex:{}, //是否显示序号
    isInfo:Boolean //是否只读状态
  },
  data(){
    return {
      
      // dataLst:[{code:'',name:'',type:'',num:'',price:'',money:''},{code:'',name:'',type:'',num:'',price:'',money:''}],
      dataLst:[{code:'1'},{},{},{code:'4'}],
      opersFn:{
        deleteFn:{
          disable:()=>{
            if(this.dataLst.length<=1)
              return true
            else {
              return false
            }  
          },
          handler:index=> {
            console.log(index)
            this.dataLst.splice(index,1)
          }
        },
        addFn:{
          handler:index=> {
            console.log(index)
            this.dataLst.splice(index+1,0,{code:'100'})
          }
        }
      }
    }
  },
  computed:{
    model(){
      return new Model(this.modelSrc)
    }
  }
}
</script>
<style scoped>
  table
  {
      border-collapse:collapse;
  }
  table,th, td
  {
     border:1px solid #bbbbbb
  }
  thead{
    background-color: #c15b2085;
    color: white;
  }
</style>