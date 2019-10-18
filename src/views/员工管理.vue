<template lang="pug">
  .page
    page-title 员工管理
    crud(name="员工" :form='form' :btns-shown="btns" ref='form' hasIndex hasInfo hideEdit :row-opers="rowOpers" hideDelete :select-model-src="selectModelSrc")
      el-form(:inline="true")
        el-form-item(label="部门")
          el-select(v-model="form.department_id")
            el-option(label="全部" value="")
            el-option(v-for="item in departmentArray" :label="item.name" :key="item.id" :value="item.id")
        el-form-item(label="职位" prop="position_id")
          el-select(v-model="form.position_id")
            el-option(label="全部" value="")
            el-option(v-for="item in positionArraySelect" :key="item.id" :label="item.name" :value="item.id")    
      .fr(slot="fr")
          el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('添加')||btns.includes('新增')") {{btns.includes('添加')?'添加':'新增'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
      el-form(label-width="110px" :model="formDep" :rules="rules" ref="formDep")
        el-form-item(label="所属部门" prop="department_id")
          el-select(v-model="formDep.department_id")
            el-option(v-for="item in departmentArray" :key="item.id" :label="item.name" :value="item.id")
        el-form-item(label="直属领导" prop="direct_leadership_id")
          el-select(v-model="formDep.direct_leadership_id")
            el-option(v-for="item in leadershipArray" :key="item.id" :label="item.name" :value="item.id")    
        el-form-item(label="职位" prop="position_id")
          el-select(v-model="formDep.position_id")
            el-option(v-for="item in positionArray" :key="item.id" :label="item.name" :value="item.id")      
        el-form-item(label="员工姓名" prop="name")
          el-input(v-model="formDep.name" maxLength="30")
        el-form-item(label="民族" prop="nationality")
          el-input(v-model="formDep.nationality")
        el-form-item(label="婚姻状况" prop="marital_status")
          el-select(v-model="formDep.marital_status")
            el-option(label="未婚" key='0' :value="0")
            el-option(label="已婚" key='1' :value="1")          
        el-form-item(label="手机号" prop="mobile")
          el-input(v-model="formDep.mobile") 
        el-form-item(label="电子邮箱" prop="e_mail")
          el-input(v-model="formDep.e_mail")  
        el-form-item(label="银行卡信息" prop="bank_card_no")
          el-input(v-model="formDep.bank_card_no")
        el-form-item(label="社保卡信息" prop="social_security_card_no")
          el-input(v-model="formDep.social_security_card_no")  
        el-form-item(label="紧急联系人" prop="emergency_contact_name")
          el-input(v-model="formDep.emergency_contact_name")
        el-form-item(label="紧急联系人手机号" prop="emergency_contact_mobile")
          el-input(v-model="formDep.emergency_contact_mobile")
        el-form-item(label="入职时间" prop="entry_time")
           el-date-picker(v-model='formDep.entry_time' placeholder="选择日期" value-format='yyyy-MM-dd')  
        el-form-item(label="员工状态" prop="status")
          el-select(v-model="formDep.status")
            el-option(label="转正" key='1' :value="1")
            el-option(label="试用" key='2' :value="2") 
            el-option(label="离职" key='3' :value="3")                   
      .btns(slot='footer')
        el-button(type='primary' @click='confirm') 确定
        el-button(@click='showModal = false') 取消  
</template>
<script>
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
    var validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z0-9_-]{1,16})@([a-zA-Z0-9]{1,9})(\.[a-zA-Z0-9]{1,9}){0,3}(\.(?:com|net|org|edu|gov|mil|cn|us)){1,4}$/
      if (value === '') {
        callback(new Error('请输入电子邮件地址'))
      } else if(!reg.test(value)){
        callback(new Error('电子邮件地址不正确'))
      } else {
        callback()
      }
    }
    return {
      title:"添加员工",
      showModal:false,
      form:{
        mobile:'',
        department_id:'',
        position_id:'',
        staff_info_name:'',
        staff_info_id:'',
        size: 20,
        pg: 1
      },
       formDep:{
        department_id:'',
        position_id:'',
        direct_leadership_id:'', //直属领导
        name: '',
        nationality:'', //民族
        mobile: '',
        e_mail:'',
        bank_card_no:'',
        social_security_card_no:'', //社保卡
        emergency_contact_name:'', //紧急联系人姓名
        emergency_contact_mobile:'', //紧急联系人手机号
        status:'',
        entry_time:''
      },
      positionArraySelect:[],
      leadershipArray:[],
      departmentArray:[],
      positionArray:[],
      selectModelSrc:{
        mobile:['手机号'],
        // department_id:['部门','select', {emptyOption: '全部', mapper: {}}],
        // position_id:['部门','select', {emptyOption: '全部', mapper: {}}],
        staff_info_name:['员工姓名'],
        staff_info_id: ['员工ID']
      },
      rowOpers:[
         {
          text: "离职",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认离职？', {type: "warning"}).then(d => {
              return new Promise((resolve,reject)=>{
                resolve('确认离职')
              })
            }).then(d => {
              this.$message.success(d)
              // this.$refs.tablePer.select()
            })
          }
        },
        {
          text: "冻结",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认冻结？', {type: "warning"}).then(d => {
              return new Promise((resolve,reject)=>{
                resolve('确认冻结')
              })
            }).then(d => {
              this.$message.success(d)
              // this.$refs.tablePer.select()
            })
          }
        },   
      ],
      isHas:false,
      rules:{
        name:[{required:true, message: '请输入', trigger:'blur'}],
        nationality:[{required:true, message: '请输入', trigger:'blur'}],
        marital_status:[{required: true, message:'请选择'}],
        department_id:[{required:true, message: '请选择', trigger:'change'}],
        position_id:[{required:true, message: '请选择', trigger:'change'}],
        mobile:[{validator:validatemobile,required:true}],
        e_mail:[{required:true,validator:validateEmail}],
        bank_card_no:[{required:true, message: '请输入', trigger:'blur'}],
        social_security_card_no:[{required:true, message: '请输入', trigger:'blur'}],
        emergency_contact_name:[{required:true, message: '请输入', trigger:'blur'}],
        emergency_contact_mobile:[{required:true, message: '请输入', trigger:'blur'}],
        entry_time:[{required:true,message:'请选择'}],
        status:[{required:true, message: '请选择', trigger:'change'}],
        direct_leadership_id:[{required:false,message:'请选择'}]
      }
    }
  },
  watch:{
    "formDep.department_id": function(val){
      if(val!=='') {
         this.getLeaders()
         this.getPositions()
      } 
    },
    "form.department_id": function(val){
      if(val!=='') {
         this.getPositions_select()
      }
    }
  },
  beforeMount(){
    this.getDepartment() 
  },
  methods:{
     getDepartment() {
      this.$_app.get('部门').then(d=>{
        console.log('部门数据',d)
        d.data.ret.forEach(e=>{
          this.departmentArray.push({id: e.id, name: e.dep_name})
        })
        console.log( this.selectModelSrc)
      })
    },
    getLeaders() { 
      this.formDep.direct_leadership_id=''
      this.leadershipArray = [] 
      this.$_app.get('部门领导人',{department_id: this.formDep.department_id}).then(d=>{
        console.log('部门领导人数据',d)
        if(d.data.ret.length>0)
          this.rules.direct_leadership_id[0].required=true
        else 
          this.rules.direct_leadership_id[0].required=false  
        d.data.ret.forEach(e=>{
          this.leadershipArray.push({id: e.id, name: e.name})
        })
        
      })
    },
    getPositions() { 
      this.positionArray = []
      this.formDep.position_id=''
      this.$_app.get('职位',{department_id: this.formDep.department_id}).then(d=>{
        console.log('职位',d)
        d.data.ret.forEach(e=>{
          this.positionArray.push({id:e.id, name: e.position_name})
        })
      })
    },
    getPositions_select(){
      this.positionArray = [],
      this.form.position_id=''
      this.$_app.get('职位',{department_id: this.form.department_id}).then(d=>{
        console.log('职位',d)
        d.data.ret.forEach(e=>{
          this.positionArraySelect.push({id:e.id, name: e.position_name})
        })
      })
    },
    add(){
      this.title="添加员工"
      this.showModal = true
    },
    confirm(){
      console.log('formDep',this.formDep)
      console.log('date',new Date(this.formDep.entry_time))

      this.$refs.formDep.validate(valid=>{
        if(valid){
          var params = JSON.parse(JSON.stringify(this.formDep))
          params.entry_time = new Date(params.entry_time)
          if(params.direct_leadership_id!='')
            this.leadershipArray.forEach(e=>{
              if(e.id == params.direct_leadership_id){
                params.direct_leadership_name = e.name //参数加上领导人姓名
                return 
              }      
            })
          this.$_app.post('员工',params,'.mdialog').then(d=>{
            this.showModal = false
            this.$refs.formDep.resetFields()
            this.$refs.form.select()
            this.$message.success(d.message || d.msg)
          })
        }
      })
    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    }
  }
}
</script>
