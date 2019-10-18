<template>
  <div class="page">
    <page-title>账户管理</page-title>
    <crud
      name="账户"
      :btns-shown="btns"
      :form="form"
      :model-src="user"
      :has-index="true"
      :select-model-src="newSelectModel"
      :readonly="true"
      :hide-oper="true"
      :hide-row-oper="false"
      ref="childFuc"
      :row-opers="rowOpers"
    >
      <template slot="fr">
        <el-button class="fr"  type="primary" @click="showAdd">
          <i class="el-icon-plus" v-if="btns.includes('添加')||btns.includes('新增')">
            {{btns.includes('添加')?'添加':'新增'}}
          </i>
        </el-button>
      </template>
    </crud>
    <el-dialog class="addOrEdit" :visible.sync="insertDialogShow" title="新增账户">
      <el-form label-width="100px" :model="addForm" :rules="rule" ref="addForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="addForm.name"></el-input>
        </el-form-item>      
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="addForm.mobile"></el-input>  
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <input type="password" id="password" class="input-login" hidden placeholder='密码' name="password">
          <el-input type="password"  autocomplete="new-password"  @input="change($event)" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <input type="password" id="passwordd" class="input-login" hidden placeholder='密码' name="password">
          <el-input type="password"  autocomplete="new-password"  @input="change($event)" v-model="addForm.confirm_password"></el-input>   
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="addForm.role_id">
            <el-option
              v-for="item in roleArray"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="btns" slot="footer">
        <el-button type="primary" @click="save('addForm')">保存</el-button>
        <el-button @click="insertDialogShow = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="addOrEdit" :visible.sync="updateDialogShow" title="编辑账户">
      <el-form label-width="120px" :model="updateForm" :rules="rule" ref="updateForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="updateForm.name" :disabled="!showPassword"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" v-model="updateForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" v-show="roleType">
          <el-select v-model="updateForm.role_id">
            <el-option
              v-for="item in roleArray"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" v-show="!roleType">
          <el-input type="text" disabled v-model="updateForm.roleFlag"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="updateForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="btns" slot="footer">
        <el-button type="primary" @click="update('updateForm')">保存</el-button>
        <el-button @click="updateDialogShow = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="operDialogShow" title="重置密码">
      <el-form label-width="120px" :model="pwdForm" :rules="rule" ref="pwdForm">
        <el-form-item label="请输入新密码" prop="password">
          <el-input type="password" id="password" name="password" key="password1" v-model="pwdForm.password"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="confirm_password">
          <el-input type="password" id="password" name="password" key="newPassword1" v-model="pwdForm.confirm_password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btns" slot="footer">
        <el-button type="primary" @click="resetPassword('pwdForm')">保存</el-button>
        <el-button @click="operDialogShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from "../model-srcs/账户.js";
import app from "../js/app.js";
// import { MD5Encode } from "../js/NewMD5Encrypt.js";

export default {
  data() {
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
    var validatePass = (rule, value, callback) => {
      var  reg = /^[a-z A-Z 0-9]{1}[\w~'!@#￥$%^&*()-+_=:]{5,15}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if(!reg.test(value)){
        callback(new Error('格式不正确，请输入以数字或者字母开头，6-16为字符'))
      } else {
        callback() 
      }
    }
     var confirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if(this.addForm.password!=value){
        if(this.addForm.password==''){
          callback()
        } else {
          callback(new Error('两次密码输入不一致'))
        }     
      } else {
        callback() 
      }
    }
    return {
      roleType: true,
      insertDialogShow: false,
      updateDialogShow: false,
      operDialogShow: false,
      showPassword: false,
      rule: {
        name: [{ required: true, message: "必填" }],
        mobile:[{required:true, validator:validatemobile}],
        role_id: [{ required: true, message: "必填" }],
        status: [{ required: true, message: "必填" }],
        password: [
          { required: true, validator:validatePass },
          { min: 6, max: 16, message: "密码长度6至16位" }
        ],
        confirm_password: [
          { required: true,validator:confirmPass },
          { min: 6, max: 16, message: "密码长度6至16位" }
        ]
      },
      roleArray: [],
      user,
      form: {
        role_id:''
      },
      rowOpers: [
        {
          text: "编辑",
          type: "primary",
          handler: row => {
            this.updateDialogShow = true;
            this.showPassword = false;
            this.updateForm.id = row.id;
            if (row.role_id) {
              this.roleType = true;
              this.updateForm.role_id = Number(row.role_id);
            }
            this.updateForm.name = row.name;
            this.updateForm.mobile = row.mobile;
            this.updateForm.status = row.status;
          }
        },
        {
          text: "重置密码",
          type: "success",
          handler: row => {
            if (this.$refs.pwdForm) this.$refs.pwdForm.resetFields();
            this.operDialogShow = true;
            this.pwdForm.id = row.id;
          }
        },
        {
          text: "删除",
          type: "danger",
          handler: row => {
            this.$confirm("是否确定删除？", "提示", { type: "warning" }).then(
              () => {
                app.post("用户Delete", { id: row.id }, this.$el).then(d => {
                  this.$message.success(d.message || d.msg || d);
                  this.$refs.childFuc.select();
                });
              }
            );
          }
        }
      ],
      selectModel: {
        hidden: ['', 'passwordHidden', {extraRules: [{showPassword: false}]}],
        mobile: ["手机号", "", { placeholder: "请输入手机号搜索" }],
        name: ["用户名", "", { placeholder: "请输入用户名搜索" }],
        role_id: ["角色类型", "select", { mapper: {} }],
        status: [
          "状态",
          "select",
          {
            emptyOption:'全部',              
            mapper: {
              1: "启用",
              0: "暂停"
            }
          }
        ]
      },
      addForm: {
        // id: "",
        name: "",
        password: "",
        confirm_password: "",
        mobile: "",
        role_id: "",
        status: 1 //默认值
      },
      updateForm: {
        id: "",
        name: "",
        mobile: "",
        role_id: "",
        status: "",
        roleFlag: ""
      },
      pwdForm: {
        id: "",
        password: "",
        confirm_password: ""
      },
      // staticTableData:[
      //   {name:'用户1',mobile:'18321856325',description:'运营管理员',status:1},
      //   {name:'用户2',mobile:'18321826329',description:'普通用户',status:1},
      // ],
    };
  },
  computed: {
    newSelectModel() {
      let result =  this.selectModel
      if(this.$_app.getRole() === 1) {
        return result
      } else {
        delete result.role_id
        return result
      }
    },
  },
  watch: {
  },
  mounted() {
    window.vm = this
    // if(this.$_app.getRole() === 1) this.getRole(); //只用超级管理员有这个权限
    this.getRole()
    // var reg = /^[a-z A-Z 0-9]{1}[\w~'!@#￥$%^&*()-+_=:]{5,15}$/
    // console.log(reg.test('12ds555*'))
  },
  methods: {
    change(e) {
      this.$forceUpdate()
    },
    showAdd() {
      this.insertDialogShow = true;
      this.showPassword = true;
      if (this.$refs.addForm) this.$refs.addForm.resetFields();
    },
    getRole() {
      app.get("角色").then(d => {
        console.log('角色',d)
        console.log(this.selectModel)
        d.data.ret.map(item => {
            this.roleArray.push(item);
            this.selectModel.role_id[2].mapper = Object.assign(
              {},
              this.selectModel.role_id[2].mapper,
              {
                [item.id]: item.name
              }
            )
        })
      })
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.addForm.password == this.addForm.confirm_password) {
            let form = JSON.parse(JSON.stringify(this.addForm))
            // delete form.confirm_password;
            console.log('form',form)   
            // return
            app
              .post("账户", form, this.$el)
              .then(d => {
                  this.$message.success(d.message || d.msg)
                  this.$refs.childFuc.select()
                  this.insertDialogShow = false
              })
          } else {
            this.$message.warning("两次输入的密码不一致，请重新输入")
            this.addForm.password = ""
            this.addForm.confirm_password = ""
          }
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.updateForm))
          delete form.confirm_password
          delete form.password
          delete form.roleFlag
          app
            .put("账户", form, this.$el)
            .then(d => {
              this.$message.success(d.message || d.msg);
              this.$refs.childFuc.select();
              this.updateDialogShow = false;
              // this.updateForm = {}
            })
            .catch(d => {
              this.$message.warning(d.message || d.msg);
            });
        }
      });
    },
    resetPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.pwdForm.password == this.pwdForm.confirm_password) {
            // let form = this.pwdForm;
            //delete form.password;
            app.post("重置密码", this.pwdForm, this.$el).then(d => {
              this.$message.success(d.message || d.msg);
              this.operDialogShow = false;
            });
          } else {
            this.$message.warning("两次输入的密码不一致，请重新输入");
            this.pwdForm.password = "";
            this.pwdForm.confirm_password = "";
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
