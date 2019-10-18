<template lang="pug">
  .page
    page-title 会员种类
    crud(name="会员种类" :form='form'  ref='form' :btns-shown="btns" :row-opers='rowOpers' hasIndex hideOper  hideDelete)
      .fr(slot="fr")
        el-button(type="primary" icon="el-icon-plus" @click="add" v-if="btns.includes('新增')||btns.includes('添加')") {{btns.includes('新增')? '新增':'添加'}}
    el-dialog.mdialog(:title='title' :visible.sync='showModal' :close-on-click-modal='false' width="700px" @close="dialogClose")
        el-form(label-width="150px" :model="formDep" :rules="rules" ref="formDep")
          el-form-item(label="会员种类名称" prop="member_type_name")
            el-input(v-model="formDep.member_type_name" maxLength="30" :disabled="title=='编辑会员种类'" placeholder="请输入会员种类名称")
          el-form-item(label="小程序会员框颜色值" prop="rgb_value")
            //- el-input(v-model="formDep.rgb_value"  placeholder="请输入rgb_value值")
            el-color-picker(v-model="formDep.rgb_value")
          el-form-item(label="生日折扣" prop="birthday_discount")
            el-input(v-model="formDep.birthday_discount" placeholder="请输入折扣值" type="number")  
          el-form-item(label="描述" prop="description")
            el-input(type="textarea" v-model="formDep.description" :autosize="{ minRows: 2, maxRows: 4}")
          el-form-item(label="会员规则" prop="grade_list") 
            br 
            .level-container
              div 折扣、积分及升级规则（会员经验=消费金额+充值金额）
              .level
                el-form-item.level-item(v-for="(item,i) in formDep.grade_list"  :key="i")
                  br
                  el-form-item(label="等级名称" label-width="90px")
                    el-input.block(v-model="item.grade_name")
                  el-form-item(label="升级经验" label-width="90px" )
                    el-input.block(v-model="item.upgrade_experience" type="number")
                  el-form-item(label="会员折扣" label-width="90px")  
                    el-input.block(v-model="item.discount" type="number")
                  el-form-item(label="消费返回积分比例" label-width="90px" type="number")
                    el-input.block(v-model="item.point_return_ratio")
                div(style="padding:10px")    
                  el-button(class="el-icon-plus" circle @click="addLevel")
                  br
                  el-button(class="el-icon-minus" circle @click="popLevel" :disabled="formDep.grade_list.length==1")
                  //- span (点击按钮添加下一级)
        .btns(slot='footer')   
          el-button(type='primary' @click='confirm') 确定
          el-button(@click='showModal = false') 取消      
</template>
<script>
export default {
  data(){
    // var gradeValidator = (rule, value, callback) => {
    //   console.log('grade',value)
    //   callback(new Error("请输入完整的等级信息"))
    // };
    return{
      form:{
        pg:1,
        size:20
      },
      formDep:{
        member_type_name:'',
        rgb_value:'#000000',
        birthday_discount: '',
        description:'',
        grade_list:[
          {grade_name:'',upgrade_experience:'',discount:'',point_return_ratio: ''},
        ],
      },
      title:'添加会员种类',
      showModal: false,
      staticTableData:[{member_type_name:'会员种类1',rgb_value: '#fff520',birthday_discount: 0.8,description:'这是会员种类1,共有3钟规则'}], //测试数据
      rowOpers:[
        {
          text: "编辑",
          type: "success",
          handler:row => {
            console.log(row)
            Object.assign(this.formDep,row)
            //删除一些无用数据
            delete this.formDep.update_time
            delete this.formDep.create_time
            delete this.formDep.add_admin_no
            delete this.formDep.is_del
            this.formDep.member_type_id = row.id
            delete this.formDep.id
            this.$_app.get('会员等级',{member_type_id:row.id}).then(d=>{
              this.formDep.grade_list = d.data.ret || d.ret
    
                this.formDep.grade_list.forEach(d=>{
                  d.grade_id = d.id
                  delete d.id
                  delete d.member_type_id 
                  delete d.member_type_name
                  d.discount=Number(d.discount)
                  d.point_return_ratio=Number(d.point_return_ratio)
                })
              this.title = "编辑会员种类"
              this.showModal = true
            })
           
          }
        }, {
          text: "删除",
          type: "danger",
          handler:row => {
            // console.log(row)
            this.$confirm('确定删除？',{type:'warning'}).then(()=>{
               this.$_app.delete('会员种类',{member_type_id:row.id}).then(d=>{
                  this.$message.success(d.message || d.msg)
                  this.$refs.form.select()
                })
            }).catch(()=>{
              this.$message.success('已取消')
            })
           
          }
        },
      ],
      rules:{
        member_type_name:[{required:true,message:'请输入会员种类名称'}],
        rgb_value:[{required:true,message:'请选择颜色值'}],
        birthday_discount:[{required:true,message:'请输入折扣值'}],
        description:[{required:true,message:'必填'}],
        // grade_list:[{required:true,validator:gradeValidator,trigger:'change'}],
      }
    }
  },
  mounted(){

  },
  methods:{
    add(){
      this.showModal = true
      this.title = "添加会员种类"
    },
    confirm(){
      this.formDep.grade_list.forEach(e=>{
        for(var key in e) {
          if(e[key]==''){
            return this.$message.error('请输入完整等级信息')  
          }else if(e=='discount' || e=='point_return_ratio' || e=='upgrade_experience') Number(e[key])
        }
      })
      // this.formDep.birthday_discount=Number(this.formDep.birthday_discount)
      this.$refs.formDep.validate(valid =>{
        if(valid) {
          var aj = this.title == '添加会员种类'? this.$_app.post : this.$_app.put
          aj('会员种类',this.formDep,'.mdialog').then(d=>{
            console.log(d)
            this.$message.success(d.message)
            this.showModal=false
            this.$refs.form.select()
          }).catch(e=>{
            this.$message.error(e.message||e.msg)
          })
        }
      })
    },
    addLevel() {
      this.formDep.grade_list.push({grade_name:'', upgrade_experience:'', discount:'', point_return_ratio: ''})
    },
    popLevel(){
      if(this.formDep.grade_list.length>1)
       this.formDep.grade_list.pop()
    },
    dialogClose(){
      // alert(1)
      this.$refs.formDep.resetFields()
     
    },
  }
}
</script>
<style scoped>
  .block{
    margin:10px 0;
  }
  .level-container{
    padding: 10px;
    border:1px solid #cccccc;
  }
  .level-item{
    border-bottom:1px solid #e1d8d8;
  }
  .level.level-item:nth-last-child(1){
    border-bottom:none!important;
  }
</style>
<style>
   .level.level-item:nth-last-child(1){
    border-bottom:none!important;
  }
</style>


