<template>
  <div id="statistics">
    <background :titlevalue="chinesename" iconvalue="pie_chart"></background>
    <div style="position:absolute;top:230px;left:50%;transform:translate(-50%);width:90%;">
      <v-card>
        <div style="padding-top:15px;margin-left:30px;margin-bottom:30px;">
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange">
          </el-cascader>
          <el-select v-model="secondvalue" placeholder="请选择">
            <el-option
              v-for="item in secondoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-bottom:10px;margin-left:30px;margin-right:30px;">
          <div id="myChart" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
          <div id="myChart2" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
          <div id="myChart3" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
          <div id="myChart4" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
          <div id="myChart5" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
          <div id="myChart6" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='linechart'" style="display:inline-block;"></div>
        </div>
      </v-card>
    </div>
  </div>  
</template>

<script>
import Background from '@/components/Background.vue'
export default {
  name: 'Statistics',
  components: { 
    Background
  },
  data(){
    return{
      chinesename: '统计分析',
      value: [],
      options: [
        {
          value: 'undergraduate',
          label: '本科生',
          children: [
            {
              value: 'all',
              label: '全部',
            }, 
            {
              value: '2018',
              label: '18级',
            },
            {
              value: '2019',
              label: '19级',
            },
          ]
        }, 
        {
          value: 'postgraduate',
          label: '研究生',
          children: [
            {
              value: 'all',
              label: '全部',
            }, 
            {
              value: '2018',
              label: '18级',
            },
          ]
        }, 
        {
          value: 'doctor',
          label: '博士生',
          children: [
            {
              value: 'all',
              label: '全部',
            }, 
            {
              value: '2018',
              label: '18级',
            },
            {
              value: '2019',
              label: '19级',
            },
          ]
        }, 
      ],
      secondoptions: [{
        value: 'linechart',
        label: '折线图'
      }, {
        value: 'column',
        label: '柱状图'
      }, {
        value: 'cake',
        label: '饼图'
      }],
      secondvalue: 'linechart'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let echartslist = [];
      let idlist = ['myChart','myChart2','myChart3','myChart4','myChart5','myChart6']
      for(let i in idlist){
        echartslist[i] = this.$echarts.init(document.getElementById(idlist[i]))
        // 绘制图表
        echartslist[i].setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
        });         
      }
    },
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>

<style scoped>
</style>