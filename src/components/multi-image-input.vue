<template lang="pug">
  //-
    @description 多图上传组件
    @author 李小龙
    @date 2018/5/31
  el-upload.file-input(action='' :disabled='disabled' :auto-upload='false' :file-list='fileList' list-type='picture-card' :on-change='fileChange' :on-remove='updateFiles')
    i.el-icon-plus
</template>
<script>
import app from '../js/app'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    disabled: Boolean,
    value: {},
    num: ''
  },
  data() {
    //初始化旧文件
    var fileList = []
    if (this.value != null && this.value != '')
      fileList = this.value.map(v => ({name: v.slice(v.lastIndexOf('/')), url: v}))
    return {
      fileList,
      count: '',
    }
  },
  computed: {
    urls() {
      //解决上传的和旧的图文件结构不一致
      var urls = []
      for (var f of this.fileList) {
        if (f.raw) urls.push(f.raw.uploadedUrl)
        else urls.push(f.url)
      }
      return urls.join(',')
    }
  },
  watch: {
    urls(val) {
      this.$emit('change', val)
    },
    value(val) {
      console.log('val', val)
      if (val == '' || val == null) {
        this.fileList = []
      } else {
        if(typeof val =='string')
          this.fileList = val.split(',').map(v => ({name: v.slice(v.lastIndexOf('/')), url: v}))
        else 
          this.fileList = val.map(v => ({name: v.slice(v.lastIndexOf('/')), url: v}))
      }
    }
  },
  mounted() {
    if(this.num) {
      this.count = this.num
    } else {
      this.count = 9
    }
  },
  methods: {
    fileChange(f, fileList) {
      var file = f.raw, canUpload = false
      if (!file.type.startsWith('image/')) {
        this.$message.error('上传只能是图片格式!')
      } else if (file.size / 1024 > 1024 * 10) {
        this.$message.error('上传图片大小不能超过 10MB!')
      } else if (this.fileList.length >= this.count) {
        this.$message.error('最多上传' + this.count + '张图片')
      } else {
        canUpload = true
        this.uploadFile(file, fileList)
      }
      if (!canUpload)
        this.fileList = fileList.slice(0, fileList.length - 1)
    },
    uploadFile(file, fileList) {
      var formData = new FormData()
      formData.append('image', file)
      app.post('fileUpload',formData,this.$el).then(d => {
        console.log(d)
        this.$message.success('上传图片成功')
        file.uploadedUrl = d.image_path
        this.fileList = fileList
        //志愿者详情页获取上传的第一张的时间
        //    
      })
    },
    updateFiles(file, fileList) {
      this.fileList = fileList
    },
  }
}
</script>

<style lang='stylus'>

</style>
