<template lang="pug">
  .page
    page-title 包间管理
    crud(name="包间" :form='form'  ref='form' :btns-shown="btns" hasIndex :row-opers='rowOpers' hideOper hideEdit hideDelete)
      el-form(inline :model="form")
        el-form-item(label='包间区域')
          el-select(v-model='form.partition_id')
            el-option(label="全部" value='' key="")
            el-option(v-for="item in areaArray" :label="item.label" :key="item.value" :value="item.value")
        el-form-item(label='包间类型')
          el-select(v-model='form.room_type_id')
            el-option(label="全部" value='' key="")
            el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" v-if="btns.includes('新增')||btns.includes('添加')" @click="add") {{btns.includes('新增')?'新增':'添加'}}

      el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="800px" @close="dialogClose")
        el-form(label-width="110px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="包间名称" prop="room_num")
            el-input(v-model="formDep.room_num" maxLength="30")
          el-form-item(label="包间区域" prop="partition_id")
            el-select(v-model="formDep.partition_id")
              el-option(v-for="item in areaArray" :label="item.label" :key="item.value" :value="item.value")  
          el-form-item(label="包间类型" prop="room_type_id")
            el-select(v-model="formDep.room_type_id")
              el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
          el-form-item(label="当前模式" prop="current_mode")
            el-select(v-model="formDep.current_mode")
              el-option(v-for="(item,i) in modeArray" :label="item" :key="(i+1)" :value="(i+1)")  
          el-form-item(label="包间面积" prop="room_area" )
            el-input(type="number" v-model="formDep.room_area" min="0")
          el-form-item(label="适用人数" prop="applicable_number") 
            el-input(type="number" v-model="formDep.applicable_number"  min="0")   
          el-form-item(label="包间价格" prop="prices")
            br 
            .prices-container
              .prices-lst(v-for="(item,i) in prices" :key="i")
                .title(v-text="item.week_name") 
                el-form-item(v-for="(childItem,j) in item.oneday_room_prices" :label="childItem.label" :key='j')
                  el-form-item(label="低消价") 
                    el-input(v-model="childItem.low_elimination")
                      span(slot="suffix") 元/时
                  el-form-item(label="单价")  
                    el-input(v-model="childItem.unit_price")
                      span(slot="suffix") 元/场
          el-form-item(label="包间标签" prop="label")
            el-tag(:key="tag" v-for="tag in formDep.label" closable :disable-transitions="false"  @close="handleClose(tag)")  {{tag}}   
            el-input(class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm")
            el-button(v-else class="button-new-tag" size="small" @click="showInput" :disabled="formDep.label.length>=5") 新增标签  
          el-form-item(label="包间简介" prop="introduction")
            el-input(type="textarea" v-model="formDep.introduction" :autosize="{ minRows: 2, maxRows: 4}") 
          el-form-item(label="包间详请" prop="details")
            el-input(type="textarea" v-model="formDep.details" :autosize="{ minRows: 2, maxRows: 4}")
          el-form-item(label="包间详细" prop="images")
            multi-image-input(v-model="formDep.images")     
        .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消  
      el-dialog(title='上传包间视频' :visible.sync='videoShow' :close-on-click-modal='false')
        .video-box
          file-input(type="video" v-model="video")
</template>
<script>
import multiImageInput from '../components/multi-image-input'
import fileInput from '../components/file-input'
export default {
  components:{
    fileInput,
    multiImageInput
  },
  data(){
    return {
      showModal:false,
      title: '添加包间',
      video:'',
      videoShow:false,
      form:{
        size: 20,
        pg: 1,
        partition_id:'',
        room_type_id:'',
      },
      formDep: {
        room_num: '',
        partition_id:'',
        areaName:'',
        room_type_id:'',
        images:'',
        current_mode:'', //1:'计时', 2:'低消', 3: '全开'
        applicable_number:'', //使用人数
        room_area:'', //包间面积
        status:1, //1: '使用中',2:'停用'
        introduction: '',
        label:[], //标签列
        room_prices_list:[],
      },
        inputVisible:false,
        inputValue: '', //标签输入框
       
      areaArray:[  //区域列表（通过后台接口获取）
         {label:'区域A',value:1},
         {label:'区域B',value:2} 
      ],
       typeArray:[ //类型列表（接口获取）
         {label:'大包',value:1},
         {label:'中包',value:2},
         {label:'小包', value: 3}  
      ],
      prices:[
        {
          week_name:'星期一',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
        {
          week_name:'星期二',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
        {
          week_name:'星期三',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
         {
          week_name:'星期四',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
        {
          week_name:'星期五',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
        {
          week_name:'星期六',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
        {
          week_name:'星期天',
          oneday_room_prices:[{label:'黄金场',scene_id:1,unit_price:1,low_elimination: 2},{label:'下午场',scene_id:2,unit_price:3,low_elimination: 4},{label:'深夜场',scene_id:3,unit_price:5,low_elimination: 6}]
        },
      ],
      modeArray:['计时','低消','全开'],
      rowOpers:[
        {
          text: "上传视频",
          type: "success",
          handler:row => {
            this.videoShow = true
            console.log(row)
            // this.$router.push({path:'/' + encodeURIComponent('包间管理'),query:{}})
          }
        },
        {
          text: "编辑",
          type: "primary",
          handler:row => {
            this.title="编辑包间"
            Object.assign(this.formDep,row)
            this.showModal = true
            console.log(row)
            // this.$router.push({path:'/' + encodeURIComponent('包间管理'),query:{}})
          }
        },
        {
          text: "停用",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认停用？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认停用')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
      ],
      rules:{
        room_num:[{required:true, message: '请输入包间名称', trigger:'blur'}],
        room_type_id:[{required:true, message: '请选择包间类型', trigger:'change'}],
        partition_id:[{required:true, message: '请选择包间区域', trigger:'change'}],
        current_mode:[{required:true, message: '请选择包间模式', trigger:'change'}],
        room_area:[{required:true, message:'必填'}],
        applicable_number:[{required:true, message:'必填'}],
        label:[{required:true, message:'必填'}],
        introduction:[{required:true, message:'必填'}],
        details:[{required:true, message:'必填'}],
        images:[{required:true, message:'必填'}],
      }

    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      this.getRoomType()
      this.getPartition()
      // this.getScence()
    },
    getRoomType(){
      this.typeArray=[]
      this.$_app.get('包间分类').then(d=>{
        console.log('包间种类',d)
        d.data.ret.forEach(e=>{
          this.typeArray.push({value: e.id, label:e.type_name})
        })
        
      })
    },
    getPartition(){
      this.areaArray=[]
      this.$_app.get('包间区域').then(d=>{
        console.log('包间区域',d)
        d.data.ret.forEach(e=>{
          this.areaArray.push({value: e.id, label:e.name})
        })
      })
    },
    getScence(){
      // this.$_app.get('场次').then(d=>{
      //   console.log('场次',d)
      // })
    },
    add(){
      this.title = '添加包间'
      this.showModal = true
    },
    confirm(){
      console.log(this.formDep)
      this.$refs.formDep.validate(valid =>{
        if(valid) {
          var param = JSON.parse(JSON.stringify(this.formDep))
          param.images = param.images.split(',')
          param.applicable_number = Number(param.applicable_number)
          param.room_prices_list=this.prices
          param.room_prices_list.forEach(e=>{
            e.oneday_room_prices.forEach(d=>{
              delete d.label
              d.unit_price = Number(d.unit_price)
              d.low_elimination = Number(d.low_elimination)
            })
          })
          param.room_area = Number(Number(param.room_area).toFixed(2))
          // console.log()
          var aj = this.title=='添加包间' ? this.$_app.post : this.$_app.put
          aj('包间',param).then(d=>{
            console.log(d)
            this.$message.success(d.message||d.msg)
            this.showModal = false
            this.$refs.form.select()
          })
        }  
      })
    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    },
    handleClose(tag) {
        this.formDep.label.splice(this.label.indexOf(tag), 1);
      },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.formDep.label.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    }
  }
}
</script>
<style scoped>
.prices-container{
  width:100%;
  padding: 10px;
  border: 1px solid #ccc;
  /* display: flex; */
}
/* .prices-lst{
  width:50%;
} */
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
.video-box{
  text-align: center
}
</style>

