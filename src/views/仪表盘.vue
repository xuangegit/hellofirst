<template lang="pug">
  .page
    page-title 仪表盘
    .chartsWrapper
      el-row.chartBox
        .chartTitle 活跃数据
        el-col(:span="18")  
          #chartOne
        el-col.detailBox(:span="6")
          .detailsCotainer
            div.time {{this.charts.chartOne.yesToday}}
            div.content1.content
              .title 活跃用户数 
              div(style="display:flex;flex-direction:row;justify-content:space-between")
                .number(style="font-size:20px") 566321
                .percent(style="font-size:18px")
                  i(v-bind:class="{'el-icon-sort-up':charts.chartOne.isUp1,'el-icon-sort-down':!charts.chartOne.isUp1}" style="color:#00862D;font-size:24px")
                  span 15%
            div.content.content2
              .title 活跃船只数 
              div(style="display:flex;flex-direction:row;justify-content:space-between")
                .number(style="font-size:20px") 2561
                .percent(style="font-size:18px") 
                  i(v-bind:class="{'el-icon-sort-up':charts.chartOne.isUp2,'el-icon-sort-down':!charts.chartOne.isUp2}" style="color:#00862D;font-size:24px")
                  span 3%
      el-row.chartBox
        el-col(:span="18")
          #chartTwo
        el-col(:span="6")
      el-row.chartBox
        el-col(:span="18")
          #chartThree
        el-col(:span="6")
      el-row.chartBox
        el-col(:span="18")
          #chartFour
        el-col(:span="6")  

</template>
<script>
import echarts from 'echarts' 
import {getYestodayToCN,formatToDate} from '../js/util'
export default {
  data(){
    return {
      charts:{
        days:7,
        timeData:[], //连续时间数据(长度为days)
        chartOne:{
          data1:[],
          data2:[],
         
          isUp1:false,
          isUp2:true,
          instance:null,
          yesToday:getYestodayToCN()
        }
      }
    }
  },
  mounted(){
    this.charts.chartOne.instance = echarts.init(document.getElementById('chartOne'))
    this.charts.chartOne.instance.showLoading()
    this.resizeListener=window.addEventListener('resize',this.charts.chartOne.instance.resize)
    setTimeout(()=>{
      this.init()
    },3000)
    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  },
  methods:{
    init(){
     //模拟数据
     for(let i=0;i<this.charts.days;i++){
       let item1=Math.random()*50000
       let item2=Math.random()*1000
       let time = new Date().getTime()-(i+1)*24*3600
       console.log(item1,item2)
       console.log(this.charts.chartOne.data1)
       this.charts.chartOne.data1.push(item1)
       this.charts.chartOne.data2.push(item2)
       this.charts.timeData.push(formatToDate(new Date(time)))
     }
      var option = {
            title:{
              text:'活跃用户/船只数',
              left:'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    // dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    // restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['活跃用户数','活跃船只数'],
                bottom:5
            },
            xAxis: [
                {
                    type: 'category',
                    // type:'time',
                    data: this.charts.timeData,
                    axisPointer: {
                        type: 'shadow'
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '活跃用户数',
                    min: 0,
                    max: 50000,
                    interval: 10000,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '活跃船只数',
                    min: 0,
                    max: 1000,
                    interval: 200,
                    axisLabel: {
                        formatter: '{value} '
                    }
                }
            ],
            series: [
                {
                    name:'活跃用户数',
                    type:'line',
                    data:this.charts.chartOne.data1,
                    lineStyle:{
                      color:"#4472C4"
                    }
                },
                
                {
                    name:'活跃船只数',
                    type:'bar',
                    yAxisIndex: 1,
                    data:this.charts.chartOne.data2,
                    itemStyle:{
                      color:"#ED7D31"
                    }
                }
            ]
        };
       this.charts.chartOne.instance.setOption(option)
       this.charts.chartOne.instance.hideLoading()
       
    }
  }
}
</script>
<style lang="stylus" scoped>
  .chartsWrapper{
    height:800px;
    overflow-y:scroll;
  }
  .chartBox{
    padding:10px;
    background: #F2F2F2;
    min-height: 400px;
    margin-bottom:20px;
  }
  .chartTitle{

  }
   #chartOne{
     position:relative;
     width:80%;
     height:350px;
     background:#fff;
     margin: 0 auto;
   }
// 数据详细

.detailsCotainer {
  height 350px
  display flex
  padding-top 30px
  padding-left 20%
  flex-direction column
  .time{
    flex 1
  }
  .content{
    .title{
      line-height 36px
    }
  }
  .content1{
    flex 1.9
  }
  .content2{
    flex 2.5
  }
}


</style>