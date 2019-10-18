<template lang="pug">
    .page
      page-title 会员管理
      crud(name="会员" :form='form'  ref='form' :btns-shown="btns" :row-opers='rowOpers' hasIndex   hideDelete hideEdit  hideOper :model-src="modelSrc")
        el-form(inline :model="form")
          el-form-item(label='会员种类')
            el-select(v-model='form.member_type_id')
              el-option(label="全部" value='' key="")
              el-option(v-for="item in typeSelect" :label="item.label" :key="item.value" :value="item.value")
        .fr(slot="fr")
          el-button(type="primary" v-if="btns.includes('排序')" icon="el-icon-sort-up" @click="sort") 排序
          el-button(type="primary" v-if="btns.includes('添加')||btns.includes('新增')" icon="el-icon-plus" @click="add") {{btns.includes('添加')?'添加':'新增'}}        
      el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
        el-form(label-width="110px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="会员昵称" prop="nick_name")
            el-input(v-model="formDep.nick_name" maxLength="30" :disabled="title=='编辑会员'")
          el-form-item(label="会员名称" prop="name" maxLength="30")
            el-input(v-model="formDep.name" :disabled="title=='编辑会员'")
          el-form-item(label="联系方式" prop="mobile")
            el-input(v-model="formDep.mobile" :disabled="title=='编辑会员'")  
          el-form-item(label="会员类型" prop="member_type_id")
            el-select(v-model="formDep.member_type_id")
              el-option(v-for="item in typeArray" :label="item.label" :key="item.value" :value="item.value")
          el-form-item(label="会员等级" prop="grade_id")
            el-select(v-model="formDep.grade_id")
              el-option(v-for="item in gradeArray" :label="item.label" :key="item.value" :value="item.value") 
          el-form-item(label="当前积分" prop="integral" v-if="title=='编辑会员'")
           el-input(v-model="formDep.integral" disabled) 
          el-form-item(label="当前余额" prop="balance" v-if="title=='编辑会员'")
           el-input(v-model="formDep.balance" disabled)
          el-form-item(label="当前经验值" prop="experience" v-if="title=='编辑会员'")
           el-input(v-model="formDep.experience" disabled)       
        .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消  
      el-dialog.info(title='积分管理' :visible.sync='dialogVisible' :close-on-click-modal='false') 
        el-form(label-width="110px" :model="dialogForm" ref="dialogForm")
          el-form-item(label="赠送/扣除")
            el-radio-group(v-model="dialogForm.isDonate")
              el-radio(:label="1") 赠送
              el-radio(:label="0") 扣除
          el-form-item(label="积分值")
            el-input(type="number" v-model="dialogForm.integration")    
        .btns(slot='footer')
          el-button(type='primary' @click='submit') 确定
          el-button(@click='dialogVisible = false') 取消        

</template>
<script>
import modelSrc from '../model-srcs/会员.js'
export default {
  data(){
    var validatemobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else if(!reg.test(value)){
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form:{
        member_type_id:'',
        pg:1,
        size:20
      },
      formDep:{
        nick_name: '',
        name: '',
        member_type_id: '',
        grade_id: '',
        mobile:''
      },
      dialogForm:{
         isDonate:'',
         integration:''
      },
      title:'添加会员',
      showModal:false,
      dialogVisible:false, //积分管理的弹出框
      typeArray:[],
      typeSelect:[],
      gradeArray:[],
      staticTableData:[
         {nick_name:'昵称',name:'会员名称',member_type_id:1, grade_id:1, grade_Name:'L1', mobile: '18356986548', balance:'500',accumulate: '2000',cumulative: '1000',integral:'1000',cash_credit:'95',gift_points: '200',experience:'500'}
      ],
      modelSrc:modelSrc,
      rowOpers:[
        {
          text: "积分管理",
          type: "success",
          handler:row => {
            console.log(row)
            this.dialogVisible = true
          }
        },
         {
          text: "编辑",
          type: "success",
          handler:row => {
            console.log(row)
            Object.assign(this.formDep,row)
            this.title = "编辑会员"
            this.showModal = true
            setInterval(()=>{  //解决初始化会员类型时清空等级的bug
              this.formDep.grade_id = row.grade_id
            },500)
          }
        },
        {
          text: "删除",
          type: "danger",
          handler:row => {
            this.$confirm('确认删除？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认删除')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        }
      ],
      rules:{
        name:[{required:true, message: '请输入会员名称', trigger:'blur'}],
        member_type_id:[{required:true, message: '请选择会员类型', trigger:'change'}],
        mobile:[{validator:validatemobile,required:true}],
        nick_name:[{required:true,message:'必填'}],
        grade_id:[{required:true,message:'必选'}]
      }
    }
  },
  watch:{
    'formDep.member_type_id':function(val){
      console.log('member_type_id',val)
      this.gradeArray = [] //清空等级下拉数据
      this.formDep.grade_id='' //清空等级现有值
      this.getGrade(val)
      
    }
  },
  mounted(){
      this.getType()
    // this.modelSrc.type[2].mapper={} // 先通过接口拿到会员类型数据
  },
  methods:{
    getType(){
      this.typeArray = []
      this.typeSelect = []
      this.modelSrc.member_type_id[2].mapper={}
      this.$_app.get('会员种类').then(d=>{
          console.log(d.data.ret)
          d.data.ret.map(e=>{
           this.typeArray.push({value: e.id, label: e.member_type_name})
           this.typeSelect.push({value: e.id, label: e.member_type_name})
           this.modelSrc.member_type_id[2].mapper[e.id] = e.member_type_name
          })
      })
    },
    add(){
      this.title = '添加会员'
      this.showModal = true
    },
    getGrade(val){
       if(val!==''){
        this.$_app.get('会员等级',{member_type_id:val}).then(d =>{
            console.log('会员等级列表数据',d.data.ret)
            if(d.data.ret&&d.data.ret.length>0) {
              d.data.ret.forEach(e => {
                this.gradeArray.push({label:e.grade_name, value: e.id})
              })
            }  
        })
      }
    },
    confirm(){
      console.log(this.formDep)
      this.$refs.formDep.validate(valid=> {
        if(valid) {
          if(this.title=='添加会员'){
             this.$_app.post('会员',this.formDep,'.mdialog').then(d=> {
              this.showModal = false
              this.$message.success(d.message||d.msg)
              this.$refs.form.select()
            
            })
          } else {
            this.$_app.put('会员',{member_id: this.formDep.id, member_type_id:this.formDep.member_type_id,grade_id:this.formDep.grade_id},'.mdialog').then(d=>{
              this.showModal = false
              this.$message.success(d.message||d.msg)
              this.$refs.form.select()
            })
          }
        }
      })
    },
    submit(){ //提交积分的管理

    },
     dialogClose(){
      this.$refs.formDep.resetFields()
    },
    sort(){
      console.log('排序')
    }
  }
}
</script>

