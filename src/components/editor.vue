<template lang="pug">
  .editor
    #editor
</template>
<script>
import Editor from 'wangeditor'
export default {
  data(){
    return {
      editor:'',
      menusDefault: [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
    }
  },
  prop:{
    menus:{}
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){ 
      this.editor = new Editor('#editor')
      var menus = this.menus || this.menusDefault
      this.editor.customConfig.menus=menus
      this.editor.customConfig.customUploadImg =  (files, insert)=> { 
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法
          console.log('files',files)
          // console.log('this',this)
          var formData= new FormData()
          formData.append('image',files[0])
          this.$_app.post('fileUpload',formData).then(d=>{
            console.log('文件上传',d)
             // 上传代码返回结果之后，将图片插入到编辑器中
            insert(d.image_path)
          })
      }
      this.editor.customConfig.onchange= content=>{
        console.log('content',content)
        this.$emit('input',content)
      }
      this.editor.create()
    }
  }
}
</script>