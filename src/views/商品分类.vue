<template lang="pug">
  .page
    page-title 商品分类
    el-tabs.tabs(v-model="activeName" @tab-click="tabChange")
      el-tab-pane(label="一级分类" name="first")
        //- crud(name="商品一级分类" :form='form'  ref='form'  hasIndex  hasAdd hideSelect :class="activeName=='first'?'display':'none'") 
      el-tab-pane(label="二级分类" name="second")
        //- crud(name="商品二级分类" :form='form2'  ref='form2'  hasIndex  hasAdd hideSelect :class="activeName=='second'?'display':'none'")
    crud(name="商品一级分类" :form='form'  ref='form'  hasIndex  hasAdd hideSelect v-show="activeName=='first'")
    crud(name="商品二级分类" :form='form2'  ref='form2'  hasIndex  hasAdd  v-show="activeName=='second'" :model-src="modelSrc")
      el-form(:inline="true")
        el-form-item(label="一级分类")
          el-select(v-model="form2.g_first_id")
            el-option(label="全部" value="") 
            el-option(v-for="item in typeArray" :value="item.id" :label="item.name" :key="item.id")
 </template>   
<script>
import modelSrc from '../model-srcs/商品二级分类'
export default {
  data(){
    return{
      typeArray:[],
      activeName:'first',
      modelSrc:modelSrc,
      form:{
        pg:1,
        size:20
      },
     form2:{
        pg:1,
        size:20,
        g_first_id:''
      },
      selectModelSrc:{
        g_first_id:['一级分类','select',{mapper:modelSrc.g_first_id[2].mapper,}],
      },
      // staticTableData:[{g_first_name:'商品种类1',img:'',description:'这是商品种类1'}], //测试数据
    }
  },
  mounted(){
    this.getFirst()
  },
  methods:{
    getFirst(){ //获取一级分类是的数据
      this.$_app.get('商品一级分类').then(d=>{
        console.log('商品一级分类',d)
        d.data.ret.forEach(e=>{
          this.modelSrc.g_first_id[2].mapper[e.id]=e.g_first_name
          this.typeArray.push({id:e.id,name:e.g_first_name})
        }) 
        console.log('mapper', this.modelSrc.g_first_id[2].mapper)
      })
    },
    tabChange(){
      console.log(this.activeName)
      console.log('mapper', this.modelSrc.g_first_id[2].mapper)
    }
  }
}
</script>
<style>
.level-item{
    margin-bottom:10px;
  }
  .level-item:nth-last-child(1){
    margin:0!important;
  }
</style>


