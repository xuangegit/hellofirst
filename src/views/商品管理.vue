<template lang="pug">
  .page
    page-title 商品管理
    crud(name="商品" :btns-shown="btns" :form='form' ref='form' :row-opers='rowOpers' hasIndex :staticTableData="staticTableData" hideDelete hideOper)
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')?'添加':'新增'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="750px" @close="dialogClose")
        el-form(label-width="150px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="一级类型" prop="g_fisrt_id")
            el-select(v-model="formDep.g_fisrt_id")
                el-option(v-for="item in typeFirst" :label="item.label" :key="item.value" :value="item.value")
          el-form-item(label="二级类型" prop="g_second_id")
            el-select(v-model="formDep.g_second_id")
                el-option(v-for="item in typeSecond" :label="item.label" :key="item.value" :value="item.value")      
          el-form-item(label="商品名称" prop="good_name")
            el-input(v-model="formDep.good_name" maxLength="30" placeholder="请输入商品名称")
          el-form-item(label="商品属性" prop="quantitative")
            el-radio-group(v-model="formDep.quantitative")
              el-radio(:label="1") 可量化
              el-radio(:label="0") 不可量化
          el-form-item(label="是否参与暴击")
            el-col(:span="10")
              el-form-item(label="" prop="crit")
                el-radio-group(v-model="formDep.crit")
                  el-radio(:label="1") 是
                  el-radio(:label="0") 否
            el-col(:span="14" v-if="formDep.crit==1")          
              el-form-item(label="暴击几率" prop="critRate")
                el-input(v-model="formDep.critRate" placeholder="请输入暴击几率")       
          el-form-item(label="是否参与积分" prop="withIntegral")
            el-radio-group(v-model="formDep.withIntegral")
              el-radio(:label="1") 是
              el-radio(:label="0") 否
          el-form-item(label="是否参与抵消" prop="withOffset")
            el-radio-group(v-model="formDep.withOffset")
              el-radio(:label="1") 是
              el-radio(:label="0") 否  
          el-form-item(label="是否参与折扣" prop="withDiscount")
            el-radio-group(v-model="formDep.withDiscount")
              el-radio(:label="1") 是
              el-radio(:label="0") 否
          el-form-item(label="是否参与提成" prop="withDeduct")
            el-radio-group(v-model="formDep.withDeduct")
              el-radio(:label="1") 是
              el-radio(:label="0") 否
          el-form-item(label="商品价格/计量单位" v-if="!istaocan&&formDep.prop==1")
            br
            el-row(style="padding:10px;border:1px dotted #ccc")
              el-form-item.level-item(label="商品单位" prop="unit" label-width="80px")
                el-select(v-model="formDep.uint")
                  el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
              el-form-item.level-item(label="单价(元)" prop="price" label-width="80px")
                el-input(v-model="formDep.price")              
              el-form-item.level-item(label="成本(元)" prop="costPrice" label-width="80px")
                el-input(v-model="formDep.Costprice")
          el-form-item(label="商品规格信息" v-if="!istaocan")
            br
            .item-container(style="padding:10px;border:1px dotted #ccc")
              el-row(v-for="(item,index) in formDep.goods_specification_list" :key="index")
                el-col(:span="10")
                  el-form-item.level-item1(label="规格" prop="specification" label-width="50px")
                    el-select(v-model="item.specification")
                      el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
                el-col(:span="14")      
                  el-form-item.level-item1(label="售价(元)" prop="salePrice" label-width="80px")
                    el-input(v-model="item.salePrice")
              el-row(style="text-align:right")
                el-button(circle icon="el-icon-plus" type="primary" @click="addNext(1)")
                el-button(circle icon="el-icon-delete" type="danger" @click="deleteLast(1)")
          el-form-item(label="套餐商品信息" v-if="istaocan")
            .package-container
              .main-container
                .title(style="text-algin:left") 主商品:
                el-row.main(v-for="(lst,index) in formDep.mainCommodityArray" :key='index')
                  el-col(:span="10")
                    el-form-item(label="商品名" label-width="60px")
                      el-select(v-model="lst.value" @change="mainChange(index,lst.value)" filterable)
                        el-option(v-for="item in mainCommodityArray" :key='item.value' :label="item.label" :value="item.value")
                  el-col(:span="10")          
                    el-form-item(label="数量" label-width="40px")
                      el-input(v-model="lst.number" placeholder="请商品数量") 
                  el-col(:span="4")
                    el-form-item(label="单位" label-width="40px" v-if='hasUnit')
                      span(v-text="formDep.mainCommodityArray[index].unit")
                el-row.oper
                  el-button(circle icon="el-icon-plus" type="primary" @click="addNext(0)")
                  el-button(circle icon="el-icon-delete" type="danger" @click="deleteLast(0)")
              .sub-container(style="padding:10px 0")
                el-form-item(label="副商品:" prop="subTags" label-width="60px")
                  el-tag(:key="tag" v-for="tag in subTags" closable :disable-transitions="false"  @close="handleClose(tag,2)")  {{tag}}   
                  el-input(class="input-new-tag" v-if="inputVisible3" v-model="inputValue3" ref="saveTagInput3" @keyup.enter.native="handleInputConfirm(2)"  @blur="handleInputConfirm(2)")
                  el-button(v-else class="button-new-tag" size="small" @click="showInput(2)" :disabled="subTags.length>=10") 新增副商品
                el-form-item(label="数量" label-width="60px")
                  el-input(v-model="formDep.subNum" type="number")      

          el-form-item(label="套餐商品价格" v-if="istaocan")
            br
            el-row(style="padding:10px;border:1px dotted #ccc")
              el-form-item.level-item(label="单价(元)" prop="price" label-width="80px")
                el-input(v-model="formDep.price")              
              el-form-item.level-item(label="成本(元)" prop="costPrice" label-width="80px")
                el-input(v-model="formDep.Costprice")
          el-form-item(label="商品类型" prop="typeTags")
            el-tag(:key="tag" v-for="tag in typeTags" closable :disable-transitions="false"  @close="handleClose(tag,1)")  {{tag}}   
            el-input(class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm(1)"  @blur="handleInputConfirm(1)")
            el-button(v-else class="button-new-tag" size="small" @click="showInput(1)" :disabled="typeTags.length>=5") 新增类型            
          el-form-item(label="商品标签" prop="tags")
            el-tag(:key="tag" v-for="tag in tags" closable :disable-transitions="false"  @close="handleClose(tag,0)")  {{tag}}   
            el-input(class="input-new-tag" v-if="inputVisible2" v-model="inputValue2" ref="saveTagInput2" @keyup.enter.native="handleInputConfirm(0)"  @blur="handleInputConfirm(0)")
            el-button(v-else class="button-new-tag" size="small" @click="showInput(0)" :disabled="tags.length>=5") 新增标签  
          el-form-item(label="商品简介" prop="introduction")   
            el-input(type="textarea" v-model="formDep.introduction" :autosize="{ minRows: 2, maxRows: 4}")
          el-form-item(label="商品图片" prop="cover_img")
           file-input(type="image" v-model="formDep.img" )
          el-form-item(label="商品详情" prop="img_list")
           multi-image-input(type="muti-image" v-model="formDep.img_list" )          
        .btns(slot='footer')   
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消      
</template>
<script>
import fileInput from '../components/file-input'
import multiImageInput from '../components/multi-image-input'
export default {
  components:{
    fileInput,
    multiImageInput
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
        good_name: '',
        type: 1,
        quantitative:1,  //商品属性 (1:可量化，0：不可量化)
        img:'',  //商品封面图
        price:'',
        costPrice: '',
        sales: '',
        withOffset: 1,
        withIntegral:1,
        withDiscount:1,
        withDeduct: 1, //是否参与提成 
        crit:1,   //是否暴击   
        critRate:'', //暴击几率
        distributionTo:'',
        details:'',//商品详细(多张图)
        goods_specification_list:[
          {specification:'',salePrice:''},
          {specification:'',salePrice:''}
        ],
        mainCommodityArray:[{name:'',value:'',number:'',unit:''}], //主商品
        // subCommodityArray:[],  //副商品
      },
      inputVisible3:false,
      inputValue3: '', //标签输入框
      subTags:[],
      inputVisible2:false,
      inputValue2: '', //标签输入框
      typeTags:[], //标签列
      inputVisible:false,
      inputValue: '', //标签输入框
      tags:[], //标签列
      title:'添加商品',
      showModal: false,
      mainCommodityArray:[ //所有商品列表(接口获取)
        {label:'红酒',value:1,unit:'瓶',unitValue:'1'},
        {label:'白酒',value:2,unit:'瓶',unitValue:'1'},
        {label:'薯条',value:3,}
      ],
      unitArray:[
        {label:'瓶',value:1},
        {label:'箱',value:2},
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
          withOffset: 0,
          withIntegral:1,
          withDiscount:1,
          withDeduct:1,
          crit: 0,     
          critRate:0.5,
          distributionTo:'后厨'
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
        {
          text: "删除",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认删除22？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认删除')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
      ],
      rules:{
        good_name:[{required:true,message:'请输入商品名称'}],
        type:[{required:true,message:'请选择商品类型'}],
        quantitative:[{required:true,message:'必选'}],
        cover_img:[{required:true,message:'必选'}],
        crit:[{required:true,message:'必选'}],
        critRate:[{required:true,message:'必填'}],
        withIntegral:[{required:true,message:'必选'}],
        withOffset:[{required:true,message:'必选'}],
        withDiscount:[{required:true,message:'必选'}],
        withDeduct:[{required:true,message:'必选'}],
        discount:[{required:true,message:'请输入折扣值'}]
      }
    }
  },
  watch:{
    'formDep.type':function(val,oldVal){
      console.log(val,oldVal) 
      if(val==7||val==8||val==9||val==10)
        this.istaocan=true
      else 
        this.istaocan= false  
    }
  },
  mounted(){
    this.getType('商品一级分类','g_first_name',this.typeFirst)
    this.getType('商品二级分类','g_second_name',this.typeSecond)
  },
  methods:{
    getType(url, key, lst){
      this.$_app.get(url).then(d=>{
        lst = d.data.ret.map(e=>{
          return {value: e[key], id: e.id}
        })
      })
    },
    add(){
      this.showModal = true
    },
    confirm(){

    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    },
    addNext(type){
      if(type)
        this.formDep.goods_specification_list.push({name:''})
      else 
        this.formDep.mainCommodityArray.push({name:''})
    },
    deleteLast(type){
      if(type)
        this.formDep.goods_specification_list.shift()
      else 
        this.formDep.mainCommodityArray.shift()  
    },
    handleClose(tag, type) {
      if(type==1){
        this.tags.splice(this.tags.indexOf(tag), 1)
      }   
      else if(type==0){
         this.typeTags.splice(this.typeTags.indexOf(tag), 1)
      } else {
        this.subTags.splice(this.subTags.indexOf(tag), 1)
      }
       
    },
    showInput(type) {
      if(type==1){
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      } else if(type==0) {
        this.inputVisible2 = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput2.$refs.input.focus();
        });
      } else {
        this.inputVisible3 = true
        this.$nextTick(() => {
          this.$refs.saveTagInput3.$refs.input.focus();
        });
      }
         
    },
    handleInputConfirm(type) {
      if(type==1) { 
        let inputValue = this.inputValue;
        if (inputValue) {
          this.typeTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      } else if(type==0){
        let inputValue = this.inputValue2;
         if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible2 = false;
        this.inputValue2 = '';
      } else {
         let inputValue = this.inputValue3;
         if (inputValue) {
          this.subTags.push(inputValue)
        }
        this.inputVisible3 = false;
        this.inputValue3 = '';
      }      
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-tag {
    width: 90px!important;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .button-new-tag {
    margin-left:20px  
  }
  .oper{
    text-align:right
  }
  .main-container{
    border-bottom:1px dotted #ccc;
    padding-bottom:10px
  }
  .main{
   margin-bottom:10px
  }
</style>
<style>
  .level-item:nth-last-child(1){
    border-bottom:none!important;
  }
</style>


