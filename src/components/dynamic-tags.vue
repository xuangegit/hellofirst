<template lang="pug">
  //-@description 动态添加标签
  .modules
    slot
    el-tag(:key="tag" v-for="(tag,index) in dynamicTags" closable :disable-transitions="false"  :effect="effect" @close="handleClose(tag)" :type="randomColor[index]") {{tag}}
    el-input(class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm")
    el-button(v-else class="button-new-tag" size="small" @click="showInput") 新增{{btnText}} 
</template>
<script>
import {getRandom} from '@/js/util'
  export default {
    // model:{
    //   event:'change',
    //   prop: 'value'
    // },
    props:{
      value:{
        type:Array,
      },
      btnText:String,
      effect:String,
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        randomColor:[]
      };
    },
    computed:{
      dynamicTags(){
        return this.value
      }
    },
    watch:{
      value(val){
        console.log('value',val)
        this.randomColor.push(['info','success','danger','warning'][getRandom(4,1)])
        // this.$emit('change',val)
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(()=> {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
<style >
  .el-tag + .el-tag {
    margin-left: 10px;
  }
 .button-new-tag {
    margin-left:20px  
  }
  .input-new-tag {
    width: 90px!important;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
