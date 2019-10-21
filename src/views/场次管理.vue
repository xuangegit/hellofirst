<template lang="pug">
  .page
    page-title 场次管理
    crud(name="场次" :form='form'  ref='form' :btns-shown="btns" hasIndex  :staticTableData="staticTableData" :row-opers="rowOpers" hideSelect hideOper)
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('新增')|| btns.includes('添加')") {{btns.includes('新增')?'新增':'添加'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' @close="dialogClose")
        el-form(label-width="130px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="场次名称" prop="name")
            el-input(v-model="formDep.name" maxLength="30")
          el-form-item(label="场次时间范围" prop="time" required)
            .row
              el-form-item(label="场次开始时间" prop="start_time")
                el-time-picker(v-model='formDep.start_time' placeholder="选择场次开始时间" value-format='HH:mm' format='HH:mm')
            .row
              el-form-item(label="场次结束日期是否为当天" prop="is_end_today" label-width="180px")
                el-radio-group(v-model="formDep.is_end_today")
                  el-radio(:label="1") 当天
                  el-radio(:label="0") 次日     
            .row   
              el-form-item(label="场次结束时间" prop="end_time")
                el-time-picker(v-model='formDep.end_time' placeholder="选择场次结束时间" value-format='HH:mm' format='HH:mm' :picker-options="{selectableRange:formDep.is_end_today&&formDep.start_time?(formDep.start_time +':00 - 23:59:59'):'00:00:00 - 23:59:59'}")   
          el-form-item(label="可预约时间" prop="selectVal" required) 
            .row
              el-form-item(label="提前天数")
                el-select(v-model="formDep.selectVal" filterable  @change="selectChanged" clearable placeholder="请选择" )
                  el-option(label="当天" :value="0")
                  el-option(label="随时" :value="1")
            .row(v-if="formDep.selectVal==1")
              el-form-item(prop="days_in_advance" label-width="130px") 
                el-input(v-model="formDep.days_in_advance" placeholder="请输入预约可提前天数")    
            .row(v-if="formDep.selectVal==0")
              //- el-form-item(label="预约时间" v-if="formDep.selectVal===0")
              //-   el-time-picker(v-model="formDep.appointmentTime" :is-range="true" value-format='HH:mm' format='HH:mm' start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="{selectableRange:'00:00:00 -'+(formDep.end_time?formDep.end_time+':00':'23:59:59')}")
              el-form-item(label='开始时间' prop="appointmentstart_time")
                el-time-picker(v-model='formDep.appointmentstart_time' placeholder="选择开始时间" value-format='HH:mm' format='HH:mm' :picker-options="{selectableRange:formDep.end_time?('00:00:00 - '+formDep.end_time+':00'):'00:00:00 - 23:59:59'}")
            .row(v-if="formDep.selectVal==0")
               el-form-item(label='结束时间' prop="appointmentend_time")
                el-time-picker(v-model='formDep.appointmentend_time' placeholder="选择结束时间" value-format='HH:mm' format='HH:mm' :picker-options="{selectableRange:(formDep.appointmentstart_time?(formDep.appointmentstart_time+':00 - '):'00:00:00 - ')+(formDep.end_time?formDep.end_time+':00':'23:59:59')}")          
          el-form-item(label="免费预约时间" prop="gratisTime")
            //- el-col(:span="20")
            el-time-picker(v-model='formDep.gratisTime' placeholder="选择免费预约时间" value-format='HH:mm' format='HH:mm' :picker-options="{selectableRange:((formDep.selectVal==0)&&formDep.appointmentstart_time?(formDep.appointmentstart_time+':00 - '):'00:00:00 - ')+((formDep.selectVal==0)&&formDep.appointmentend_time?(formDep.appointmentend_time+':00'):'23:59:59')}")
            //- el-col(:span="4" style="text-align:right") 前  
          el-form-item(label="订金或全款预约" required)
            .container  
              .col
                .row
                  el-form-item(label="订金预约时间")
                    el-time-picker(v-model="formDep.subscriptionTime" value-format='HH:mm' format='HH:mm'  :picker-options="{selectableRange:(formDep.gratisTime?(formDep.gratisTime+':00 - '):'00:00:00 - ')+(formDep.end_time?(formDep.end_time+':00'):'23:59:59')}")
                .row
                  el-form-item(label="订金金额(元)" )
                    el-input(type="number" placeholder="请输入金额" v-model="formDep.subscription")
                //- .row
                //-   el-form-item(label="优先级" prop="subscriptionLevel")
                //-     el-input(type="number" placeholder="请输入(0-100)" @input="val=>{if(val>100) formDep.subscriptionLevel=100}" v-model="formDep.subscriptionLevel")    

              .col
                .row
                  el-form-item(label="全款预约时间")
                    el-time-picker(v-model="formDep.fullPayTime" value-format='HH:mm' format='HH:mm' :picker-options="{selectableRange:(formDep.gratisTime?(formDep.gratisTime+':00 - '):'00:00:00 - ')+(formDep.end_time?(formDep.end_time+':00'):'23:59:59')}")   
          .attentions(style="color:red;border-top:1px dashed #ccc;padding-top:10px ;")
            .sub-title 预约时间的说明(全款和订金2选1，全选按订金时间点计算)
            .content(style="color:#020202;font-size:12px,text-indent:15px")  当仅仅选择全款预约时间点时，订金时间段 = 可预约时间段 -免费预约时间段 -全款预约时间段;当选择了订金预约时间同时填写了订金金额时，全款预约时间段 = 可预约时间段 -免费预约时间段 -预约时间段。
                 
        .btns(slot='footer')
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消        
      
</template>
<script>
export default {
  data(){
    return {
      showModal:false,
      title: '添加场次',
      form:{
        size: 20,
        pg: 1
      },
      start_time:'',
      formDep:{
        days_in_advance:'',
        is_end_today:1,
        name:'',
        start_time:"",
        end_time:'',
        todayTime:'',
        // appointmentTime:'', //预约时间
        appointmentstart_time:'',
        appointmentend_time:'',
        gratisTime:"", //免费预约时间
        // orderTime:"",
        subscription:'', //订金金额
        subscriptionTime:'',//订金预约时间
        // subscriptionLevel:'',
        // fullPay:'',  //全款预约金额
        fullPayTime:'',  //全款预约时间
        // fullPayLevel:'',
        selectVal:0, //测试数据
      },
      staticTableData:[
        {
          name:'黄金场',
          time:"10:00 - 14:00",
          // subscriptionTime:"10:00 - 14:00",
          // fullPayTime:"10:00 - 14:00",
          // gratisTime:"10:00 - 14:00",
          // orderTime:"10:00 - 14:00",
        }
      ],
       rules:{
        name:[{required:true, message: '请输入场次名称', trigger:'blur'}],
        start_time:[{required:true, message: '请输入场次开始时间'}],
        end_time:[{required:true, message: '请输入场次结束时间'}],
        is_end_today:[{required:true,message:'请选择'}],
        gratisTime:[{required:true,message:'请输入免费预约时间'}],
        days_in_advance:[{required:true,message:'请输入预约可天前天数'}]
        // other:[{required:true, validator:otherValidator,trigger:'change'}],
        // subscriptionTime:[{required:true, message: '请输入订金预约时间'}],
        // subscription:[{required:true, message: '请输入订金金额'}],
        // subscriptionLevel:[{required:true, message: '请输入优先级'}],
        // fullPayTime:[{required:true, message: '请输入全款预约时间'}],
        // fullPayLevel:[{required:true, message: '请输入优先级'}],
        
      },
      rowOpers:[
        {
          text: "编辑",
          type: "primary",
          handler:row => {
            this.title="编辑场次"
            this.formDep=Object.assign(this.formDep,row)
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
         {
          text: "启用",
          type: "danger",
          handler:row => {
            console.log(row)
            this.$confirm('确认启用？', {type: "warning"}).then(d => {
            return new Promise((resolve,reject)=>{
              resolve('确认启用')
            })
          }).then(d => {
            this.$message.success(d)
            // this.$refs.tablePer.select()
          })
          }
        },
      ]
    }
  },
  methods:{
    add(){
      this.showModal = true
      this.title="添加场次"
    },
    confirm(){
      if((this.formDep.subscriptionTime=='' || this.formDep.subscription=='' || this.formDep.subscription==0 )&& this.formDep.fullPayTime=='') {
         return this.$message.error('订金预约和全款预约至少选择一个') 
      }
      this.$refs.formDep.validate(valid=>{
        if(valid) {
          
        }
      })
    },
    dialogClose(){
      this.$refs.formDep.resetFields()
    },
    selectChanged(val){
      console.log(val)
    },
    numberChange(val){
      console.log(val)
      if(val>100){
        this.formDep.subscriptionLevel=100
      }
    }
  }
}
</script>

<style scoped>
  .container{
    border:1px solid #cccccc
  }
  .row{
    padding:10px
  }
  .col{
    margin: 10px;
    border-bottom:1px dashed #bcbcbc }
  .col:last-child{
    border:none
  }  
</style>