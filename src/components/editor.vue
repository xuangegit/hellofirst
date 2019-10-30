<template lang="pug">
  .editor
    #editor
</template>
<script>
import Editor from 'wangeditor'
export default {
  data(){
    return {
      editor:''
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){ 
      this.editor = new Editor('#editor')
     
      // this.editor.customConfig.uploadImgShowBase64 = true
      this.editor.customConfig.customUploadImg =  (files, insert)=> {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法
          console.log('files',files)
          // 上传代码返回结果之后，将图片插入到编辑器中
          // insert(imgUrl)
      }
      this.editor.create()
    }
  }
}
</script>