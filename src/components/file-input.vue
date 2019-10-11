<template lang="pug">
  div 
    el-input.apkUrl(v-if="type=='apk'" v-model="apkUrl" readonly placeholder="上传后显示apk地址全称" )  
    el-upload.file-input(:action='baseUrl' :auto-upload='hasProcess' :class='{"is-disabled": disabled}' :on-change='fileChange'  :show-file-list='false' drag :disabled='disabled' :headers='headers' :data="paramer")
      .avatar(v-if='type=="image" && value' :style='{backgroundImage: "url("+value+")"}')
      video.avatar(v-if='type=="video" && value' :src='value' controls)
      .avatar(v-if='type=="apk" && value' style='background-image: url(/static/static/img/apk.png)')
      i.el-icon-upload.avatar-uploader-icon(v-if='!disabled')
      .des(v-text='des' v-if='!value && !disabled && !text')
      .text(v-if='!value && text' v-text='text')
    el-progress(:text-inside="true" :stroke-width="16" :percentage="jindu" status="text" v-if="startProgress&&type=='apk'")
</template>
<script>
import app from '../js/app'
import allApi from '../js/apis'
import axios from 'axios'
import { getSign } from '../js/NewMD5Encrypt'
import OSS from 'ali-oss'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    disabled: {
      default: false,
    },
    text: String, //传入自定义描述信息，在禁用时也显示
    value: {},
    type: {
      default: 'image'
    },
    hasProcess:{
      default: false,
    },
    baseUrl:{
      default:this.hasProcess?allApi.fileUpload:''
    }
  },
  data() {
    return {
      jindu:0,
      startProgress:false,
      uploadType: '',
      apkUrl:'',
      paramer:null,
      headers:this.hasProcess?{token:sessionStorage.token}:null
    }
  },
  watch:{
    value(a){
      this.apkUrl=a
    }
  },
  computed: {
    des() {
      if (this.type == 'apk') {
        return '拖入或点击上传apk<=100M'
      }
      return this.type=='image' ? '拖入或点击上传图片<=10MB' : '拖入或点击上传视频<=100M'
    },
  },
  mounted(){
    // if(this.value!='')
    // console.log('value',this.value)
     this.apkUrl=this.value
  },
  methods: {
    fileChange(f, fileList) {
      var file = f.raw
      if (this.type == 'image') {
        this.uploadType = 'img'
        if (!file.type.startsWith('image/')) {
          this.$message.error('上传只能是图片格式!')
        } else if (file.size / 1024 > 1024 * 10) {
          this.$message.error('上传图片大小不能超过 10MB!')
        } else {
          if(this.hasProcess) return
          this.uploadFile(file)
          return true
        }
      } else if (this.type == 'video') {
        this.uploadType = 'video'
        if (file.type!='video/3gpp' && file.type!='video/mp4') {
          this.$message.error('上传只能是3gp或mp4视频格式!')
        } else if (file.size / 1024 > 1024 * 100) {
          this.$message.error('上传视频大小不能超过 100MB!')
        } else {
          if(this.hasProcess) return
          this.uploadFile(file)
          return true
        }
      } else if (this.type == 'apk') {
        this.uploadType = 'apk'
        if (file.type!='application/vnd.android.package-archive') {
          this.$message.error('上传只能是apk文件!')
        } else if (file.size / (1024*1024) > 100) {
          this.$message.error('上传apk大小不能超过 100MB!')
        } else {
          // if(this.hasProcess) return
          this.uploadFile(file)
          return true
        }
      } else if (this.type == 'excel') {
        var ext = file.name.slice(file.name.lastIndexOf('.')+1)
        if (ext != 'xls' && ext != 'xlsx') {
          this.$message.error('上传只能是Excel文件!')
        } else if (file.size / (1024*1024) > 100) {
          this.$message.error('上传Excel文件大小不能超过 100MB!')
        } else {
          if (this.autoUpload)
            this.uploadFile(file)
          else
            this.$emit('change', '', file)
          return true
        }
      } 
      return false
    },
    uploadFile(file,fileList) { 
     this.startProgress=true
        var formData = new FormData()
        if(this.type=='image')
          formData.append('image', file)
        else   
          formData.append('file', file)
        axios.post(allApi['fileUpload'], formData,{
          onUploadProgress: progressEvent => {
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            console.log(complete)//进度值
            this.jindu = complete
          }
        }).then(d => {
          if (this.type == 'apk') {
            this.$message.success('上传apk成功')
          } else {
            this.$message.success(this.type == 'image' ? '上传图片成功':'上传视频成功')
          }
          this.$emit('change', d.image_path, file)
          this.apkUrl=d.image_path
        })
      // }
      
    }
  }
}
</script>
 
<style lang="stylus" scoped>
my-size()
  width 240px
  height 180px
.apkUrl
   margin-bottom 10px
.file-input
  .el-upload
    display block
    my-size()
    .avatar
      my-size()
      display block
      background-position center
      background-repeat no-repeat
      background-size contain
    .avatar-uploader-icon
      font-size 50px
      my-size()
      line-height 180px
      display block
      margin 0
    .des
      position absolute
      bottom 0
      right 25px
      color #aaa
    .text
      position absolute
      top 0
      left 5px
      color #aaa
    
</style>

<style lang='stylus'>
my-size()
  width 240px
  height 180px

.file-input
  .el-upload
    >.el-upload-dragger
      my-size()
</style>
