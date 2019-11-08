<template lang="pug">
  .page
    page-title 套餐管理
    crud(name="套餐" :btns-shown="btns" :form='form' ref='form' :row-opers='rowOpers' hasIndex hideSelect hasDelete :select-model-src="selectModelSrc") 
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')?'添加':'新增'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose" width="760px")
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')?'添加':'新增'}}
      el-form(label-width="130px" :model="formDep" :rules="rules" ref="formDep")
        el-form-item(label="套餐名" prop="name")
          el-input(v-model="formDep.name") 
        el-form-item(label="单价" prop="unit_price")
          el-input-number(v-model="formDep.unit_price" :min="0")
        el-form-item(label="限购量" prop="purchase_quantity")
          el-input-number(v-model="formDep.purchase_quantity" :min="1")
        el-form-item(label="总库存" prop="total_inventory")
          el-input-number(v-model="formDep.total_inventory" :min="1") 
        el-form-item(label="是否参与积分" prop="is_points")
          el-radio-group(v-model="formDep.is_points")
            el-radio(:label="1") 是
            el-radio(:label="0") 否
        el-form-item(label="是否参与抵消" prop="is_in_low")
          el-radio-group(v-model="formDep.is_in_low")
            el-radio(:label="1") 是
            el-radio(:label="0") 否  
        el-form-item(label="是否参与折扣" prop="is_discount")
          el-radio-group(v-model="formDep.is_discount")
            el-radio(:label="1") 是
            el-radio(:label="0") 否
        el-form-item(label="是否参与提成" prop="is_commission")
          el-radio-group(v-model="formDep.is_commission")
            el-radio(:label="1") 是
            el-radio(:label="0") 否 
        el-form-item(label="包含商品" prop="product_list")
          goods-list(v-model="formDep.product_list")    
        el-form-item(label="套餐图片集" prop="image_list")
           multi-image-input(type="muti-image" v-model="formDep.image_list" )          
      .btns(slot='footer')
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消  
    //- 商品详情弹框        
    el-dialog.mdialog(title='商品详情' :visible.sync='goodDialog' :close-on-click-modal='false'  width="760px")
      crud(name="套餐商品" :form="goodForm" ref="goodForm" :model-src="modelSrc_good" hidePaging :row-opers="goodOpers")
        
</template>
<script>
import multiImageInput from '@/components/multi-image-input'
import goodsList from '@/components/List-box/goods_list'
export default {
  components:{
    multiImageInput,
    goodsList
  },
  data(){
    return {
      showModal: false,
      selectModelSrc:{
        id:''
      },
      modelSrc_good:{  //商品详情表格表头字段名
        name:['商品-规格'],
        quantity:['数量'],
        original_price:['零售价'],
        unit:['单位'],
      },
      title: '添加套餐',
      form: {
        pg:1,
        size:20
      },
      goodForm:{
        good_package_id:'' //套餐id
      },
      formDep:{
        name:'',
        unit_price:'',
        total_inventory:'',
        purchase_quantity:'',
        is_points:1,
        is_in_low:'',
        is_discount:'',
        is_commission:'',
        product_list:[{good_specification_id:'',quantity:''}],
        image_list:'', //图片集
      },
      rowOpers:[
        {
          text:'商品详情',
          type:"info",
          handler:row=>{
            console.log('套餐行',row)
          }
        }
      ],
      //商品详情列表格操作列逻辑
      goodOpers:[
        {
          text:'删除',
          type:'danger',
          handler:row=>{
            console.log('商品信息id',row.id)
            this.$_app.delete('商品套餐')
          }
        }
      ],
      rules:{
        name: [ { required: true, message: '请输入套餐名称'} ],
        unit_price: [ { required: true, message: '请输入单价'} ],
        purchase_quantity: [ { required: true, message: '请输入限购量'} ],
        total_inventory: [ { required: true, message: '请输入库存'} ],
        is_points: [ { required: true, message: '请输选择'} ],
        is_in_low: [ { required: true, message: '请输选择'} ],
        is_discount: [ { required: true, message: '请输选择'} ],
        is_commission: [ { required: true, message: '请输选择'} ],
        product_list:[ {required: true, message:'请输入包含的商品'}],
        image_list: [ { required: true, message: '请选择上传的图片'} ]
      },
    }
  },
  mounted(){},
  methods:{
    add(){
      this.showModal=true
    },
    dialogClose(){
      this.$nextTick(()=>{
        this.$refs.formDep.resetFields()
      })
    },
    confirm(){
      console.log('formDep',this.formDep)
      this.$refs.formDep.validate(valid=>{
        if(valid){
          this.$_app.post('套餐',this.formDep).then(d=>{
            this.$message.success(d.message||d.msg)
            this.$refs.formDep.resetFields()
            this.showModal =false
            this.$refs.form.select()
          })
        }
      })
    }
  }
}
</script>>