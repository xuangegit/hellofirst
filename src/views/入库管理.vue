<template lang="pug">
  .page
    page-title 入库管理
    crud(name="入库" :static-tabel-data="staticTableData" :form="form" :select-model-src="modelSrc")
      .fr(slot="fr")
          el-button(type="primary" icon="el-icon-plus" @click="add") 添加
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose" width="1000px")
      el-form(label-width="80px" :model="formDep" :rules="rules" ref="formDep" inline)
        el-form-item(label="入库时间" prop="entry_time")
          el-date-picker(v-model='formDep.entry_time' placeholder="选择日期" value-format='yyyy-MM-dd')
        br
        el-form-item(label="联系人" prop="contactor")
          el-input(v-model="formDep.contactor")
        el-form-item(label="联系电话" prop="contactor_mobile")
          el-input(v-model="formDep.contactor_mobile") 
                   
          //- el-form-item(label="包间区域" prop="partition_id")
          //-   el-select(v-model="formDep.partition_id")
          //-     el-option(v-for="item in areaArray" :label="item.label" :key="item.value" :value="item.value")  
          //- el-form-item(label="包间类型" prop="room_type_id")
          //-   el-select(v-model="formDep.room_type_id")
          //-     el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
          //- el-form-item(label="当前模式" prop="current_mode")
          //-   el-select(v-model="formDep.current_mode")
          //-     el-option(v-for="(item,i) in modeArray" :label="item" :key="(i+1)" :value="(i+1)")  
          //- el-form-item(label="包间面积" prop="room_area" )
          //-   el-input(type="number" v-model="formDep.room_area" min="0")
        table-edit(hasIndex style="margin-bottom:10px" :model-src="modelSrcInTable")
        el-form-item.hideBorder(label="经办人" prop="operator" label-width="60px")
          el-input(v-model="formDep.operator"  prefix-icon="el-icon-edit" )
        br  
        el-form-item.hideBorder(label="入库人" prop="warehouse_people" label-width="60px")
          el-input(v-model="formDep.warehouse_people"  prefix-icon="el-icon-edit")
      .btns(slot='footer')
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消  
</template>  
</template>
<script>
import tableEdit from '../components/table-edit'
import Model from 'crud-model-class'
export default {
  components:{
    tableEdit
  },
  data(){
    return {
      showModal:false,
      title:'新增入库',
      formDep:{
        entry_time:''
      },
      form:{
        size:20,
        pg:1
      },
      staticTableData:[{a:'0001',b:'2019-5-3',c:'刘能',d:'赵四',e:'衣服',f:'15000',g:'刘家服饰',h:'刘英'}],
      modelSrcInTable:{
        // index:['序号','text'],
        code:['物品编号','text'],
        name:['物品名称','text'],
        type:['规格型号','text'],
        num:['入库数量','natural'],
        price:['单价','natural'],
        money:['金额','natural',{isInfo:true}],
        remark:['备注','text'],
      },
      modelSrc:{
        date:['入库时间','date'],
        operator:['经办人'],
        storage:['入库人'],
      },
      rules:{

      },
    }
  },
  computed:{
    model(){
      return new Model(this.modelSrc)
    },
    
  },
  mounted(){},
  methods:{
    add(){
      this.title="新增入库"
      this.showModal = true
    },
    dialogClose(){},
    confirm(){},
  },
}
</script>
<style >
  .hideBorder .el-input--prefix .el-input__inner {
    border:none
  }
</style>