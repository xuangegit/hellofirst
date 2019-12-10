<template lang="pug">
  .page
    page-title 仪表盘
    .operation
      el-radio-group(v-model="charts.days" @change="daysChange")
        el-radio(:label="7") 显示最近7天数据
        el-radio(:label="31") 显示最近31天数据
      el-button(type="primary" icon='el-icon-download') 导出
    .chartsWrapper
      el-row.chartBox
        .chartTitle 活跃数据
        el-col(:span="18")  
          #chartOne
        el-col.detailBox(:span="6")
          .detailsCotainer
            div.time {{charts.yesToday}}
            div.content1.content
              .title 活跃用户数 
              div
                .number 566321
                .percent(style="font-size:18px")
                  i(v-bind:class="{'el-icon-sort-up upset':charts.chartOne.isUp1,'el-icon-sort-down downset':!charts.chartOne.isUp1}" style="font-size:24px")
                  span 15%
            div.content.content2
              .title 活跃船只数 
              div
                .number(style="font-size:20px") 2561
                .percent(style="font-size:18px") 
                  i(v-bind:class="{'el-icon-sort-up upset':charts.chartOne.isUp2,'el-icon-sort-down downset':!charts.chartOne.isUp2,}" style="font-size:24px")
                  span 3%
      el-row.chartBox
        .chartTitle 流量消耗
        el-col(:span="18")  
          #chartTwo
        el-col.detailBox(:span="6")
          .detailsCotainer
            div.time {{charts.yesToday}}
            div.content1.content
              .title 卫星流量消耗
              div
                .number 56.20G
                .percent(style="font-size:18px")
                  i(v-bind:class="{'el-icon-sort-up upset':charts.chartTwo.isUp1,'el-icon-sort-down downset':!charts.chartTwo.isUp1}" style="font-size:24px")
                  span 15%
            div.content.content2
              .title 海哥流量消耗
              div
                .number(style="font-size:20px") 2.63G
                .percent(style="font-size:18px") 
                  i(v-bind:class="{'el-icon-sort-up upset':charts.chartTwo.isUp2,'el-icon-sort-down downset':!charts.chartTwo.isUp2,}" style="font-size:24px")
                  span 3%            
      //- el-row.chartBox
      //-   el-col(:span="18")
      //-     #chartTwo
      //-   el-col(:span="6")
      el-row( type="flex").chartThreeBox
        el-col(:span="6" v-for="(item,index) in charts.chartThree.chartList" :key="index" :class="{'marginNone':index==0}")
          div.content
            .title(style="line-height:40px;text-align:center") {{item.title}}
            div(style="font-size:18px;text-align:center;margin-top:30px")
              span(style="font-size:22px;margin-right:30px") 2561{{item.unit}}
              //- .percent 
              i(v-bind:class="{'el-icon-sort-up upset':item.isUp,'el-icon-sort-down downset':!item.isUp,}" style="font-size:24px")
              span 3%
          div.chartContainer(:id="item.el")
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
        yesToday:getYestodayToCN(),
        chartOne:{
          el:'chartOne',
          data1:[],
          data2:[],
          // timeData:[],
          isUp1:false,
          isUp2:true,
          instance:null,
          resizeListener:null,
         
        },
        chartTwo:{
          el:'chartTwo',
          data1:[],
          data2:[],
          isUp1:false,
          isUp2:true,
          instance:null,
          resizeListener:null,
          // yesToday:getYestodayToCN()
        },
        chartThree:{
          chartList:[
            {
              el:'chartThree_0',
              instance:null,
              resizeListener:null,
              title:'昨日船均卫星流量消耗',
              number:Math.floor(Math.random()*6000+800),
              percent:Math.random().toFixed(3),
              isUp: Math.random()<0.5,
              unit: 'M'
            },
            {
              el:'chartThree_1',
              instance:null,
              resizeListener:null,
              title:'昨日船均海哥流量消耗',
              number:Math.floor(Math.random()*6000+800),
              percent:Math.random().toFixed(3),
              isUp: Math.random()<0.5,
              unit:'M',
            },
            {
              el:'chartThree_2',
              instance:null,
              resizeListener:null,
              title:'昨日海哥流量活跃用户数',
              number:Math.floor(Math.random()*2000+100),
              percent:Math.random().toFixed(3),
              isUp: Math.random()<0.5,
              unit:'M',
            },
             {
              el:'chartThree_3',
              instance:null,
              resizeListener:null,
              title:'昨日卫星流量活跃用户数',
              number:Math.floor(Math.random()*2000+100),
              percent:Math.random().toFixed(3),
              isUp: Math.random()<0.5,
              unit:'M',
            }
          ]
        }
      }
    }
  },
  mounted(){
    this.initChartInstance()
    setTimeout(()=>{
      this.init()
    },3000) 
  },
  beforeDestroy() {
    
    window.removeEventListener('resize', this.charts.chartOne.resizeListener) //one
    window.removeEventListener('resize', this.charts.chartTwo.resizeListener) //two
    this.charts.chartThree.chartList.forEach(chart=>{
       window.removeEventListener('resize', chart.resizeListener)
    })

  },
  methods:{
    initChartInstance(){ //初始chartInstance
      // this.charts.chartOne.instance = echarts.init(document.getElementById('chartOne'))
      // this.charts.chartOne.instance.showLoading()
      // this.charts.chartOne.resizeListener=window.addEventListener('resize',this.charts.chartOne.instance.resize)

      this.initlineAndBarInstance(this.charts.chartOne) //chartOne(line-bar)
      this.initlineAndBarInstance(this.charts.chartTwo) //chartTwo(line-bar)
      this.initLineHasAreaInstance() //chartThree(lineHasArea)
      
    },
    init(){
      //2个line-bar图
      this.lineAndBar(this.charts.chartOne)
      var chartTwoOption = {
          title: {
            left:'center',
            text:'流量消耗'
          },
          legend: {
            data:['卫星流量','海哥流量'],
            bottom:5
          },
          yAxis: [
                  {
                      type: 'value',
                      name: '卫星流量(M)',
                      min: 0,
                      max: 50000,
                      interval: 10000,
                      axisLabel: {
                          formatter: '{value} '
                      }
                  },
                  {
                      type: 'value',
                      name: '海哥流量(M)',
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
                    name:'卫星流量',
                    type:'line',
                    data:[],
                    lineStyle:{
                      color:"#4472C4"
                    }
                },
                
                {
                    name:'海哥流量',
                    type:'bar',
                    yAxisIndex: 1,
                    data:[],
                    itemStyle:{
                      color:"#ED7D31"
                    }
                }
            ]    
      };
      this.lineAndBar(this.charts.chartTwo,chartTwoOption)
      this.initLineHasArea() //折线区域图
      //
    },
    initlineAndBarInstance(chart){ //初始line-bar图表实例
    // console.log('chart',chart)
      chart.instance = echarts.init(document.getElementById(chart.el))
      chart.instance.showLoading()
      chart.resizeListener=window.addEventListener('resize',chart.instance.resize)
    },
    initLineHasAreaInstance(){
      this.charts.chartThree.chartList.forEach(chart=>{
        chart.instance = echarts.init(document.getElementById(chart.el))
        //- chart.instance.showLoading()
        chart.resizeListener=window.addEventListener('resize',chart.instance.resize)
      })
    },
    lineAndBar(chart,myOption){
     //模拟数据
     this.charts.timeData=[]
     chart.data2=[]
     for(var i=0;i<this.charts.days;i++){
       let item1=Math.random()*50000
       let item2=Math.random()*1000
       let time = (new Date().getTime())-((i)*24*3600*1000)
      //  console.log('time',time)
      //  console.log(item1,item2)
      //  console.log(this.charts.chartOne.data1)
       chart.data1.push(item1)
       chart.data2.push(item2)
       this.charts.timeData.push(formatToDate(new Date(time)))
     }
     console.log()
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
                    data: this.charts.timeData.reverse(),
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
                    data:chart.data1,
                    lineStyle:{
                      color:"#4472C4"
                    }
                },
                
                {
                    name:'活跃船只数',
                    type:'bar',
                    yAxisIndex: 1,
                    data:chart.data2,
                    itemStyle:{
                      color:"#ED7D31"
                    }
                }
            ]
        };
      var finalOption=Object.assign({},option,myOption) 
      finalOption.series[0].data=chart.data1
      finalOption.series[1].data=chart.data2
      console.log('finaloption',finalOption)
      chart.instance.setOption(finalOption)
      chart.instance.hideLoading()

      //  this.charts.chartOne.instance.setOption(option)
      //  this.charts.chartOne.instance.hideLoading()
       
    },
    lineHasArea(chart){
      console.log('areaChart',chart)
      var option = {
         series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
      }
      chart.instance.setOption(option)
    },
    initLineHasArea(){
      this.charts.chartThree.chartList.forEach(chart=>{
        this.lineHasArea(chart)
      })
    },
    daysChange(val){
      console.log(val,this.charts.days)
      this.init()

    }
  }
}
</script>

<style lang="stylus" scoped>
  .main,.page{
    overflow hidden!important
  }
  .page-title{
    line-height 40px
  }
  .operation{
    position:absolute;
    right:0;
    left:100px;
    text-align center
    top:10px;
    line-height 30px
    .el-button{
      float   right;
      
    }
  }
  .upset{
    font-size 24px
    color red
    margin-right  24px
  }
  .downset{
    font-size 24px
    color #00862D
  }
  .chartsWrapper{
    height:760px;
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
   #chartOne,#chartTwo{
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
    >div{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      .number{
        font-size 20px
      }
    }
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
.chartThreeBox{
  background-color white
  height auto!important
  margin-bottom 20px
  .marignNone{
    margin 0
  }
  .el-col{
    height 180px
    background: #F2F2F2;
    margin-left  10px
    display flex
    flex-direction column
    .content{
      flex 1.5
    }
    .chartContainer{
      flex 1
      background: #ffffff;
    }
  }
  .marginNone{
    margin 0
  }
}


</style>