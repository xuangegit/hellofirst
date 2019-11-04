<template lang="pug">
  .page
    page-title 商品管理
    //- <img src="http://bird-fisher.oss-cn-shanghai.aliyuncs.com/fisherOne/toutiao/toutiaoImg/1572493197316_girl.jpg" />
    crud(name="商品" :btns-shown="btns" :form='form' ref='form' :row-opers='rowOpers' hasIndex :staticTableData="staticTableData" )
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')?'添加':'新增'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="850px" @close="dialogClose")
        el-form(label-width="120px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="一级类型" prop="g_first_id")
            el-select(v-model="formDep.g_first_id")
              el-option(v-for="item in typeFirst" :label="item.label" :key="item.value" :value="item.value")
          el-form-item(label="二级类型" prop="g_second_id")
            el-select(v-model="formDep.g_second_id")
              el-option(v-for="item in typeSecond" :label="item.label" :key="item.value" :value="item.value")      
          el-form-item(label="商品名称" prop="good_name")
            el-input(v-model="formDep.good_name" maxLength="30" placeholder="请输入商品名称")
          el-form-item(label="默认单位" prop="good_unit_id")
            el-select(v-model="formDep.good_unit_id")
              el-option(v-for="item in unitArray" :key="item.id" :value="item.id" :label="item.name")  
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
          el-form-item(label="配送到" prop="delivery_to")
            el-radio-group(v-model="formDep.delivery_to")
              el-radio(:label="1") 后厨
              el-radio(:label="2") 吧台
              el-radio(:label="3") 前台
            //- el-select(v-model="formDep.delivery_to")
            //-   el-option(label="后厨" :key="1" :value="1") 
            //-   el-option(label="吧台" :key="2" :value="2")     
          el-form-item(label="售价" prop="price")
            el-input-number(v-model="formDep.price" :min="1")
          el-form-item(label="成本价" prop="cost_price")
            el-input-number(v-model="formDep.cost_price" :min="1")  
          el-form-item(label="限购数量" prop="purchase_quantity")
            el-input-number(v-model="formDep.purchase_quantity" :min="1")
          el-form-item(label="总库存" prop="total_inventory")
            el-input-number(v-model="formDep.total_inventory" :min="0")          
          el-form-item(label="商品规格" prop="goods_specification_list")
            br
            .listContainer
              el-row(class="listItem" v-for="(listItem,index) in formDep.goods_specification_list" :key="index")
                el-col(:span="12" style="width:50%")
                  el-form-item(label="规格名称" label-width="90px")
                    el-input(v-model="listItem.specification_name")
                el-col(:span="12" style="width:50%")    
                  el-form-item(label="单位")  
                    el-select(v-model="listItem.unit_id")
                     el-option(v-for="item in unitArray" :key="item.id" :value="item.id" :label="item.name")
                el-col(:span="8" style="width:33%")
                  el-form-item(label="单价" label-width="86px")
                    el-input(v-model="listItem.price" :min="0" @keyup="")
                el-col(:span="8" style="width:33%")
                  el-form-item(label="成本" label-width="70px")
                    el-input(v-model="listItem.cost_price" :min="0")            
                el-col(:span="8" style="width:33%")
                  el-form-item(label="限购数量" label-width="90px")
                    el-input(v-model="listItem.purchase_quantity" :min="0")
                el-col(:span="16" style="width:50%")
                  el-form-item(label="是否使用转换率" label-width="130px")
                    el-radio-group(v-model="listItem.is_conversion")
                      el-radio(:label="1") 是
                      el-radio(:label="0") 否
                el-col(:span="8" v-if='listItem.is_conversion==1' style="width:50%")
                  el-form-item(label="转换率" label-width="80px")
                    el-input-number(v-model="listItem.conversion_rate" :min="0")
              .opers
                el-button(circle icon="el-icon-plus" type="primary" @click="addNext(1)")    
                el-button(circle icon="el-icon-delete" type="danger" @click="deleteLast(1)" :disabled="formDep.goods_specification_list.length<2")
          el-form-item(label="商品备选属性" prop="remarks_attribute_list")
            tags-list(v-model="formDep.remarks_attribute_list" style="padding:10px;border:1px dotted #ccc")
              .opers
                el-button(circle icon="el-icon-plus" type="primary" @click="addNext(2)")    
                el-button(circle icon="el-icon-delete" type="danger" :disabled="formDep.remarks_attribute_list.length<2" @click="deleteLast(2)")
          //- el-form-item(label="套餐商品信息" v-if="istaocan")
          //-   .package-container 
          //-     .main-container
          //-       .title(style="text-algin:left") 主商品:
          //-       el-row.main(v-for="(lst,index) in formDep.mainCommodityArray" :key='index')
          //-         el-col(:span="10")
          //-           el-form-item(label="商品名" label-width="60px")
          //-             el-select(v-model="lst.value" @change="mainChange(index,lst.value)" filterable)
          //-               el-option(v-for="item in mainCommodityArray" :key='item.value' :label="item.label" :value="item.value")
          //-         el-col(:span="10")          
          //-           el-form-item(label="数量" label-width="60px")
          //-             el-input-number(v-model="lst.number" placeholder="请商品数量" :min="1") 
          //-         el-col(:span="4")
          //-           el-form-item(label="" label-width="20px" v-if='hasUnit')
          //-             span(v-text="formDep.mainCommodityArray[index].unit")
          //-       el-row.oper
          //-         el-button(circle icon="el-icon-plus" type="primary" @click="addNext(0)")
          //-         el-button(circle icon="el-icon-delete" type="danger" @click="deleteLast(0)")
          //-     .sub-container(style="padding:10px")
          //-       el-form-item(label="副商品:" prop="subCommodityArray" label-width="60px")
          //-         dynamic-tags(v-model="formDep.subCommodityArray" btn-text="副商品")
          //-           el-form-item(prop="subNum" label="可选数量" slot="bottom" label-width="68px" )  
          //-             el-input-number(v-model="formDep.subNum" type="number" style="width:260px!important" :min="1")      
          //- el-form-item(label="商品类型" prop="typeTags")
          //-   dynamic-tags(v-model="formDep.type_tags" effect="plain")
          el-form-item(label="商品标签" prop="label")
            dynamic-tags(v-model="formDep.label")  
          el-form-item(label="商品简介" prop="introduction")   
            el-input(type="textarea" v-model="formDep.introduction" :autosize="{ minRows: 2, maxRows: 4}")
          el-form-item(label="商品详情" prop="details")
            my-editor(v-model="formDep.details")  
          el-form-item(label="商品图片" prop="cover_img")
           file-input(type="image" v-model="formDep.cover_img")
          el-form-item(label="商品图片集" prop="img_list")
           multi-image-input(type="muti-image" v-model="formDep.img_list" )      
        .btns(slot='footer')   
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消      
</template>
<script>
import fileInput from '../components/file-input'
import multiImageInput from '../components/multi-image-input'
import dynamicTags from '@/components/tags-list/dynamic-tags'
import tagsList from '@/components/tags-list/index.vue'
import Editor from '@tinymce/tinymce-vue'
import myEditor from '@/components/editor'
// import {getRandom} from '@/js/util'
export default {
  components:{
    fileInput,
    multiImageInput,
    dynamicTags,
    tagsList,
    Editor,
    myEditor
    // WCkeditorVue
  },
  data(){
    return{
      hasUnit:false,
      istaocan:false,
      form:{
        pg:1,
        size:20
      },
      formDep:{
        g_first_id:'',
        g_second_id:'',
        good_unit_id:'', //单位
        delivery_to:'',  //配送到
        remarks_attribute_list:[{
          name:'',
          child_attribute: []
        }],
        label:[],
        // type_tags:[],
        cost_price:'',  //成本价
        price:'', //单价（售价）
        good_name: '', 
        purchase_quantity:'',
        total_inventory:'', //库存
        // type: 1,
        // quantitative:1,  //商品属性 (1:可量化，0：不可量化)
        cover_img:'',  //商品封面图
        is_in_low: 1,
        is_points:1,
        is_discount:1,
        is_commission: 1, //是否参与提成 
        // crit:1,   //是否暴击   
        // critRate:'', //暴击几率
        details:'',//商品详细
        introduction:'',
        img_list: [],
        goods_specification_list:[  //商品规格
          { unit_id:'', price:'', cost_price:'', purchase_quantity:'', is_conversion:1, conversion_rate:'' },
          // { unit_id:'', price:'', cost_price:'', purchase_quantity:'', is_conversion:1, conversion_rate:'' },
        ],
        // mainCommodityArray:[{name:'',value:'',number:'',unit:''}], //主商品
        // subCommodityArray:[],  //副商品
      },
      inputVisible3:false,
      title:'添加商品',
      showModal: false,
      mainCommodityArray:[ //所有商品列表(接口获取)
        {label:'红酒',value:1,unit:'瓶',unitValue:'1'},
        {label:'白酒',value:2,unit:'瓶',unitValue:'1'},
        {label:'薯条',value:3,}
      ],
      unitArray:[
        // {label:'瓶',value:1},
        // {label:'箱',value:2},
      ],
      typeFirst:[],
      typeSecond:[],
      typeArray:[],
      staticTableData:[
         {
          good_name: '有龙在天',
          type: 1,
          typeName:'套餐',
          cover_img:'http://bird-fisher.oss-cn-shanghai.aliyuncs.com/fisherOne/dyjx/video/201908/20190812135218f88794b1be29468ca04206151b7336eb.jpg',
          price:100,
          costPrice: 50,
          quantitative:1,
          sales: 200,
          is_in_low: 0,
          is_points:1,
          is_discount:1,
          is_commission:1,
          crit: 0,     
          critRate:0.5,
          delivery_to:'后厨'
        }
      ], //测试数据
      rowOpers:[
        {
          text:'编辑',
          type:'primary',
          handler:row=>{
            this.showModal = true
            this.title= '编辑商品'
            Object.assign(this.formDep,row)
          }
        },
      ],
      rules:{
        g_first_id: [ { required: true, message: '请选择商品一级分类'}],
        g_second_id: [ { required: true, message: '请选择商品二级分类'} ],
        good_name: [{required:true,message:'请输入商品名称'}],
        // type: [ {required:true,message:'请选择商品类型'} ],
        // quantitative:[{required:true,message:'必选'}],
        good_unit_id: [{ required:true, message:'请选择单位'}],
        delivery_to: [ { required: true, message: '请选择配送地', trigger: 'blur' } ],
        price: [ { required: true, message: '请输入售价'} ],
        cost_price: [ { required: true, message: '请输入成本价'}],
        label:[ { required: true} ],
        cover_img:[ {required :true, message: '必选' } ],
        // crit:[{required:true,message:'必选'}],
        // critRate:[{required:true,message:'必填'}],
        is_points:[{required:true,message:'必选'}],
        is_in_low:[{required:true,message:'必选'}],
        is_discount:[{required:true,message:'必选'}],
        is_commission:[{required:true,message:'必选'}],
        discount:[ { required:true,message:'请输入折扣值'} ],
        introduction:[ { required:true, message: '请输入简介'} ],
        details:[ { required: true, message:'请输入详情' } ],
        remarks_attribute_list:[ { required:true, message: '必填'} ],
        goods_specification_list:[ { required:true, message: '必填'} ],
        purchase_quantity:[ { required: true, message: '请输入限购数量' } ],
        img_list:[ { required: true, message:'请上传图片'} ],
        total_inventory:[ { required: true, message: '请输入库存'} ],
      }
    }
  },
  watch:{
    'formDep.g_first_id':function(val){
      console.log(val)
      this.formDep.g_second_id= '' //清除二级菜单值
      this.getTypeSecond(val)    // 获取二级菜单列表
      if(val==5) {
        this.istaocan = true   //一级分类为套餐
      }
    },
  },
  beforeMount(){
    this.getUnits()
  },
  mounted(){
    this.getTypeFirst()
    // this.getTypeSecond('商品二级分类','g_second_name',2)
  },
  methods:{
    getTypeFirst(){ //获取分类列表
      this.$_app.get('商品一级分类').then(d=>{   
        this.typeFirst = d.data.ret.map(e=>{
          return {label: e['g_first_name'], value: e.id}
        })
      })
    },
    getTypeSecond(id){
      this.typeSecond= []
      this.$_app.get('商品二级分类',{g_first_id:id}).then(d=>{
        this.typeSecond = d.data.ret.map(e=>{
          return {label:e['g_second_name'],value: e.id}
        })
      })
    },
    add(){
      this.showModal = true
    },
    confirm(){
      console.log('form',this.formDep)
      this.$refs.formDep.validate(valid=>{
        if(valid){
          this.$_app.post('商品',this.formDep).then(d=>{
            console.log('商品',d)
          })
        }
      })
    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    },
    addNext(type){
      if(type==1)
        this.formDep.goods_specification_list.push({name:''})
      else if(type==0)
        this.formDep.mainCommodityArray.push({name:''})
      else 
        this.formDep.remarks_attribute_list.push({name:'',child_attribute:[]})  
    },
    deleteLast(type){
      if(type==1)
        this.formDep.goods_specification_list.pop()
      else if(type==0) 
        this.formDep.mainCommodityArray.pop()
      else 
        this.formDep.remarks_attribute_list.pop()    
    },
    getUnits(){ //接口拿到单位列表
      this.$_app.get('单位').then(d=>{
        // console.log('单位数据',d)
        this.unitArray = d.data.ret
      })
    },
    mainChange(index,val){
      console.log(val,index)
      this.mainCommodityArray.forEach(e=>{
        if(e.value==val){
          if(e.unit){
            this.hasUnit = true
            this.formDep.mainCommodityArray[index].unit=e.unit
            this.formDep.mainCommodityArray[index].unitValue=e.unitValue
          }else {
            this.hasUnit = false
          }
          
        }
      })
    }
  }
}
</script>
<style scoped>
  .block{
    margin:10px 0;
  }
  .level-container,.package-container{
    padding: 10px;
    border:1px dotted #cccccc;
  }
  .level-item,.level-item1{
    margin-bottom:10px
  }
  .level-item:nth-last-child(1),.level-item1:nth-last-child(1){
    border-bottom:none!important;
  }
 
  .oper{
    text-align:right
  }
  .main-container{
    border-bottom:1px dotted #ccc;
    padding:15px
  }
  .main{
   margin-bottom:10px
  }
  .el-radio+.el-radio {
    margin-left: 0px;
  }
  .listContainer {
    border:1px dotted #cccccc;
    padding: 15px;
  }
  /* .listItem:nth-last-of-type(1){
     border-bottom:1px dashed #ababab;
  } */
  .listItem{
    display: flex;
    flex-wrap: wrap;
    border:1px dashed #ababab;
    padding:10px;
    margin:5px 0;
  }
   
  .listItem .el-col{
    padding:5px 0;
    /* width:33%; */
  }
  
</style>
<style>
  .level-item:nth-last-child(1){
    border-bottom:none!important;
  }
</style>


