<template>
  <div id="statistics">
    <background :titlevalue="chinesename" iconvalue="pie_chart"></background>
    <div style="position:absolute;top:230px;left:50%;transform:translate(-50%);width:90%;">
      <v-card>
        <div style="padding-top:15px;margin-left:30px;margin-bottom:30px;">
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="changeFlag">
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
          <div id="lineAll" :style="{width: '300px', height: '300px'}" v-show="(secondvalue+team)=='lineteam1'"
               style="display:inline-block;"></div>
          <div id="line1" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line2" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line3" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line4" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line5" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line6" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line7" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line8" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line9" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line10" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line11" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="line12" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='line'"
               style="display:inline-block;"></div>
          <div id="columnAll" :style="{width: '1500px', height: '300px'}" v-show="(secondvalue+team)=='columnteam1'"
               style="display:inline-block;"></div>
          <div id="column1" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column2" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column3" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column4" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column5" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column6" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column7" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column8" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column9" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column10" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column11" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column12" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="column13" :style="{width: '300px', height: '300px'}" v-show="secondvalue=='column'"
               style="display:inline-block;"></div>
          <div id="cakeAll" :style="{width: '400px', height: '400px'}" v-show="(secondvalue+team)=='caketeam1'"
               style="display:inline-block;"></div>
          <div id="cake1" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake2" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake3" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake4" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake5" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake6" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake7" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake8" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake9" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake10" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake11" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
          <div id="cake12" :style="{width: '400px', height: '400px'}" v-show="secondvalue=='cake'"
               style="display:inline-block;"></div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import axios from 'axios';

export default {
  name: 'Statistics',
  components: {
    Background
  },
  data() {
    return {
      chinesename: '统计分析',
      secondvalue: 'line',
      team: 'team1',
      value: [],
      data: {
        male: 400,          // 男性
        female: 80,         // 女性

        activist: 50,       // 积极分子
        realMember: 40,     // 正式党员
        proMember: 55,      // 预备党员

        newActivist: 30,    // 近3年新增积极分子
        newRealMember: 25,  // 近3年新增正式党员
        newProMember: 20,   // 近3年新增预备党员

        activistAge_18_30: 9,     // 各年龄段的积极分子人数
        activistAge_31_40: 18,
        activistAge_41_50: 10,
        activistAge_51_60: 10,
        activistAge_61_70: 3,

        realMemberAge_18_30: 9,   // 各年龄段的真正党员人数
        realMemberAge_31_40: 18,
        realMemberAge_41_50: 10,
        realMemberAge_51_60: 10,
        realMemberAge_61_70: 3,

        proMemberAge_18_30: 9,    // 各年龄段的预备党员人数
        proMemberAge_31_40: 18,
        proMemberAge_41_50: 10,
        proMemberAge_51_60: 10,
        proMemberAge_61_70: 3,

        newActivistAge_18_30: 9,  // 近三年新增的积极分子人数
        newActivistAge_31_40: 18,
        newActivistAge_41_50: 10,
        newActivistAge_51_60: 10,
        newActivistAge_61_70: 3,

        newRealMemberAge_18_30: 9,    // 近三年新增的真正党员的人数
        newRealMemberAge_31_40: 18,
        newRealMemberAge_41_50: 10,
        newRealMemberAge_51_60: 10,
        newRealMemberAge_61_70: 3,

        newProMemberAge_18_30: 9,     // 近三年新增的预备党员人数
        newProMemberAge_31_40: 18,
        newProMemberAge_41_50: 10,
        newProMemberAge_51_60: 10,
        newProMemberAge_61_70: 3,

        dormPlace1: 50,             // 大运村人数
        dormPlace2: 40,             // 学院路校内
        dormPlace3: 60,             // 沙河

        campusPlace1: 60,           // '学院路校区',
        campusPlace2: 50,           // '沙河校区',
        campusPlace3: 40,           // '杭州研究院',
        campusPlace4: 30,           // '青岛研究院',
        campusPlace5: 20,           // '苏州研究院',
        campusPlace6: 10,           // '深圳研究院',
        campusPlace7: 50,           // '云南研究院',
        campusPlace8: 5,            // '其他'

        ethnicHan: 50,              // 汉族人数
        ethnicOthers: 50,           // 少数民族人数

        team1: 10,                  // 从上到下依次对应党支部表
        team2: 9,
        team3: 8,
        team4: 7,
        team5: 1,
        team6: 1,
        team7: 5,
        team8: 6,
        team9: 7,
        team10: 10,
        team11: 10,
        team12: 10,
        team13: 10,
        team14: 11,
        team15: 12,
        team16: 14,
        team17: 16,
        team18: 18,
        team19: 10,
        team20: 12,
        team21: 13,
        team22: 1,
        team23: 4,
        team24: 6,
        team25: 8,
        team26: 4,
        team27: 11,
        team28: 17,
        team29: 15,
        team30: 12,
      },
      options: [
        {
          value: 'undergraduate',
          label: '本科生',
          children: [
            {value: 'all', label: '全部',},
            {value: '2018', label: '18级',},
            {value: '2019', label: '19级',},
          ]
        }, {
          value: 'postgraduate',
          label: '研究生',
          children: [
            {value: 'all', label: '全部',},
            {value: '2018', label: '18级',},
          ]
        }, {
          value: 'doctor',
          label: '博士生',
          children: [
            {value: 'all', label: '全部',},
            {value: '2018', label: '18级',},
            {value: '2019', label: '19级',},
          ]
        },{
          value: 'team',
          label: '党支部',
          children: [
            {value: 'team1', label: '全部'},
            {value: 'team2', label: '1706-1党支部'},
            {value: 'team3', label: '1706-2党支部'},
            {value: 'team4', label: '1806党支部'},
            {value: 'team5', label: '1906党支部'},
            {value: 'team6', label: '硕18061党支部'},
            {value: 'team7', label: '硕18062党支部'},
            {value: 'team8', label: '硕18063党支部'},
            {value: 'team9', label: '硕19061党支部'},
            {value: 'team10', label: '硕19062党支部'},
            {value: 'team11', label: '硕19063党支部'},
            {value: 'team12', label: '硕19064党支部'},
            {value: 'team13', label: '硕19065党支部'},
            {value: 'team14', label: '硕19066党支部'},
            {value: 'team15', label: '硕19067党支部'},
            {value: 'team16', label: '硕20061党支部'},
            {value: 'team17', label: '硕20062党支部'},
            {value: 'team18', label: '硕20063党支部'},
            {value: 'team19', label: '硕20064党支部'},
            {value: 'team20', label: '硕20065党支部'},
            {value: 'team21', label: '硕20066党支部'},
            {value: 'team22', label: 'BYACT1党支部'},
            {value: 'team23', label: 'BYACT2党支部'},
            {value: 'team24', label: 'BY软国重党支部'},
            {value: 'team25', label: 'BY软件所党支部'},
            {value: 'team26', label: 'BY系统结构党支部'},
            {value: 'team27', label: 'BY虚拟现实党支部'},
            {value: 'team28', label: 'BY应用1党支部'},
            {value: 'team29', label: 'BY应用2党支部'},
            {value: 'team30', label: 'BY应用3党支部'},
          ]
        }
      ],
      secondoptions: [
        {value: 'line', label: '折线图'},
        {value: 'column', label: '柱状图'},
        {value: 'cake', label: '饼图'}
      ],
      teamoptions: [
        {value: 'team1', label: '全部'},
        {value: 'team2', label: '1706-1党支部'},
        {value: 'team3', label: '1706-2党支部'},
        {value: 'team4', label: '1806党支部'},
        {value: 'team5', label: '1906党支部'},
        {value: 'team6', label: '硕18061党支部'},
        {value: 'team7', label: '硕18062党支部'},
        {value: 'team8', label: '硕18063党支部'},
        {value: 'team9', label: '硕19061党支部'},
        {value: 'team10', label: '硕19062党支部'},
        {value: 'team11', label: '硕19063党支部'},
        {value: 'team12', label: '硕19064党支部'},
        {value: 'team13', label: '硕19065党支部'},
        {value: 'team14', label: '硕19066党支部'},
        {value: 'team15', label: '硕19067党支部'},
        {value: 'team16', label: '硕20061党支部'},
        {value: 'team17', label: '硕20062党支部'},
        {value: 'team18', label: '硕20063党支部'},
        {value: 'team19', label: '硕20064党支部'},
        {value: 'team20', label: '硕20065党支部'},
        {value: 'team21', label: '硕20066党支部'},
        {value: 'team22', label: 'BYACT1党支部'},
        {value: 'team23', label: 'BYACT2党支部'},
        {value: 'team24', label: 'BY软国重党支部'},
        {value: 'team25', label: 'BY软件所党支部'},
        {value: 'team26', label: 'BY系统结构党支部'},
        {value: 'team27', label: 'BY虚拟现实党支部'},
        {value: 'team28', label: 'BY应用1党支部'},
        {value: 'team29', label: 'BY应用2党支部'},
        {value: 'team30', label: 'BY应用3党支部'},
      ]
    }
  },
  mounted() {
    axios({
      url: '/api/graph/all',
      method: 'post',
      // params: {
      //   stuNum: this.name,
      // }
      // data: this.form
    }).then(res => {
      if (res.data.flag) {
        this.data = res.data.data;
        console.log("获取信息成功");

        this.drawLine();
      } else {
        console.log("获取信息失败！");
      }
    }).catch(err => {
      console.log(err);
    })

  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      var data = this.data;
      let lineslist = [];
      let columnslist = [];
      let cakeslist = [];
      let idlinelist = [
        'lineAll', 'line1', 'line2', 'line3', 'line4', 'line5', 'line6',
        'line7', 'line8', 'line9', 'line10', 'line11', 'line12']
      let idcolumnlist = [
        'columnAll', 'column1', 'column2', 'column3', 'column4', 'column5', 'column6',
        'column7', 'column8', 'column9', 'column10', 'column11', 'column12']
      let idcakeslist = [
        'cakeAll', 'cake1', 'cake2', 'cake3', 'cake4', 'cake5', 'cake6',
        'cake7', 'cake8', 'cake9', 'cake10', 'cake11', 'cake12']
      for (let i in idlinelist) {
        lineslist[i] = this.$echarts.init(document.getElementById(idlinelist[i]))
      }
      for (let i in idcolumnlist) {
        columnslist[i] = this.$echarts.init(document.getElementById(idcolumnlist[i]))
      }
      for (let i in idcakeslist) {
        cakeslist[i] = this.$echarts.init(document.getElementById(idcakeslist[i]))
      }
      // 绘制图表
      columnslist[0].setOption({
        title: {
          text: '各党支部人数',
          top: 'top',
          left: 'center',
        },
        tooltip: {},
        xAxis: {
          data: [
            '1706-1党支部',
            '1706-2党支部',
            '1806党支部',
            '1906党支部',
            '硕18061党支部',
            '硕18062党支部',
            '硕18063党支部',
            '硕19061党支部',
            '硕19062党支部',
            '硕19063党支部',
            '硕19064党支部',
            '硕19065党支部',
            '硕19066党支部',
            '硕19067党支部',
            '硕20061党支部',
            '硕20062党支部',
            '硕20063党支部',
            '硕20064党支部',
            '硕20065党支部',
            '硕20066党支部',
            'BYACT1党支部',
            'BYACT2党支部',
            'BY软国重党支部',
            'BY软件所党支部',
            'BY系统结构党支部',
            'BY虚拟现实党支部',
            'BY应用1党支部',
            'BY应用2党支部',
            'BY应用3党支部',
          ]
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            {value: data.team2, name: '1706-1党支部'},
            {value: data.team3, name: '1706-2党支部'},
            {value: data.team4, name: '1806党支部'},
            {value: data.team5, name: '1906党支部'},
            {value: data.team6, name: '硕18061党支部'},
            {value: data.team7, name: '硕18062党支部'},
            {value: data.team8, name: '硕18063党支部'},
            {value: data.team9, name: '硕19061党支部'},
            {value: data.team10, name: '硕19062党支部'},
            {value: data.team11, name: '硕19063党支部'},
            {value: data.team12, name: '硕19064党支部'},
            {value: data.team13, name: '硕19065党支部'},
            {value: data.team14, name: '硕19066党支部'},
            {value: data.team15, name: '硕19067党支部'},
            {value: data.team16, name: '硕20061党支部'},
            {value: data.team17, name: '硕20062党支部'},
            {value: data.team18, name: '硕20063党支部'},
            {value: data.team19, name: '硕20064党支部'},
            {value: data.team20, name: '硕20065党支部'},
            {value: data.team21, name: '硕20066党支部'},
            {value: data.team22, name: 'BYACT1党支部'},
            {value: data.team23, name: 'BYACT2党支部'},
            {value: data.team24, name: 'BY软国重党支部'},
            {value: data.team25, name: 'BY软件所党支部'},
            {value: data.team26, name: 'BY系统结构党支部'},
            {value: data.team27, name: 'BY虚拟现实党支部'},
            {value: data.team28, name: 'BY应用1党支部'},
            {value: data.team29, name: 'BY应用2党支部'},
            {value: data.team30, name: 'BY应用3党支部'},
          ],
        }]
      });
      columnslist[1].setOption({
        title: {
          text: '男女人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ["男", "女"]
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [data.male, data.female],
        }]
      });
      columnslist[2].setOption({
        title: {
          text: '党支部成员组成',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['积极分子', '预备党员', '正式党员']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [data.activist, data.proMember, data.realMember],
        }]
      })
      columnslist[3].setOption({
        title: {
          text: '近3年党支部新增人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['新增积极分子', '新增预备党员', '新增正式党员']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [data.newActivist, data.newProMember, data.newRealMember],
        }]
      })
      columnslist[4].setOption({
        title: {
          text: '积极分子各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.activistAge_18_30,
            data.activistAge_31_40,
            data.activistAge_41_50,
            data.activistAge_51_60,
            data.activistAge_61_70],
        }]
      })
      columnslist[5].setOption({
        title: {
          text: '预备党员各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.proMemberAge_18_30,
            data.proMemberAge_31_40,
            data.proMemberAge_41_50,
            data.proMemberAge_51_60,
            data.proMemberAge_61_70],
        }]
      })
      columnslist[6].setOption({
        title: {
          text: '正式党员各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.realMemberAge_18_30,
            data.realMemberAge_31_40,
            data.realMemberAge_41_50,
            data.realMemberAge_51_60,
            data.realMemberAge_61_70],
        }]
      })
      columnslist[7].setOption({
        title: {
          text: '近3年新增积极分子各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.newActivistAge_18_30,
            data.newActivistAge_31_40,
            data.newActivistAge_41_50,
            data.newActivistAge_51_60,
            data.newActivistAge_61_70],
        }]
      })
      columnslist[8].setOption({
        title: {
          text: '近3年新增预备党员各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.newProMemberAge_18_30,
            data.newProMemberAge_31_40,
            data.newProMemberAge_41_50,
            data.newProMemberAge_51_60,
            data.newProMemberAge_61_70],
        }]
      })
      columnslist[9].setOption({
        title: {
          text: '近3年新增正式党员各年龄段人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.newRealMemberAge_18_30,
            data.newRealMemberAge_31_40,
            data.newRealMemberAge_41_50,
            data.newRealMemberAge_51_60,
            data.newRealMemberAge_61_70],
        }]
      })
      columnslist[10].setOption({
        title: {
          text: '各宿舍区域人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['学院路大运村', '学院路校内', '沙河']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.dormPlace1,
            data.dormPlace2,
            data.dormPlace3],
        }]
      })
      columnslist[11].setOption({
        title: {
          text: '各校区人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['学院路校区', '沙河校区', '杭州研究所', '青岛研究所', '苏州研究所', '深圳研究所', '云南研究所', '其他']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [
            data.campusPlace1,
            data.campusPlace2,
            data.campusPlace3,
            data.campusPlace4,
            data.campusPlace5,
            data.campusPlace6,
            data.campusPlace7,
            data.campusPlace8,],
        }]
      })
      columnslist[12].setOption({
        title: {
          text: '各民族人数',
          top: 'top',
          left: 'center', },
        tooltip: {},
        xAxis: {
          data: ['汉族', '少数民族']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [data.ethnicHan, data.ethnicOthers],
        }]
      })

      cakeslist[0].setOption({
        title: {
          text: '各党支部人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '各党支部人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.team2, name: '1706-1党支部'},
              {value: data.team3, name: '1706-2党支部'},
              {value: data.team4, name: '1806党支部'},
              {value: data.team5, name: '1906党支部'},
              {value: data.team6, name: '硕18061党支部'},
              {value: data.team7, name: '硕18062党支部'},
              {value: data.team8, name: '硕18063党支部'},
              {value: data.team9, name: '硕19061党支部'},
              {value: data.team10, name: '硕19062党支部'},
              {value: data.team11, name: '硕19063党支部'},
              {value: data.team12, name: '硕19064党支部'},
              {value: data.team13, name: '硕19065党支部'},
              {value: data.team14, name: '硕19066党支部'},
              {value: data.team15, name: '硕19067党支部'},
              {value: data.team16, name: '硕20061党支部'},
              {value: data.team17, name: '硕20062党支部'},
              {value: data.team18, name: '硕20063党支部'},
              {value: data.team19, name: '硕20064党支部'},
              {value: data.team20, name: '硕20065党支部'},
              {value: data.team21, name: '硕20066党支部'},
              {value: data.team22, name: 'BYACT1党支部'},
              {value: data.team23, name: 'BYACT2党支部'},
              {value: data.team24, name: 'BY软国重党支部'},
              {value: data.team25, name: 'BY软件所党支部'},
              {value: data.team26, name: 'BY系统结构党支部'},
              {value: data.team27, name: 'BY虚拟现实党支部'},
              {value: data.team28, name: 'BY应用1党支部'},
              {value: data.team29, name: 'BY应用2党支部'},
              {value: data.team30, name: 'BY应用3党支部'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[1].setOption({
        title: {
          text: '男女人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.male, name: '男性'},
              {value: data.female, name: '女性'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[2].setOption({
        title: {
          text: '党支部成员组成',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.activist, name: '积极分子'},
              {value: data.proMember, name: '预备党员'},
              {value: data.realMember, name: '正式党员'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[3].setOption({
        title: {
          text: '近3年党支部新增人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.newActivist, name: '新增积极分子'},
              {value: data.newProMember, name: '新增预备党员'},
              {value: data.newRealMember, name: '新增正式党员'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[4].setOption({
        title: {
          text: '积极分子各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.activistAge_18_30, name: '18-30'},
              {value: data.activistAge_31_40, name: '31-40'},
              {value: data.activistAge_41_50, name: '41-50'},
              {value: data.activistAge_51_60, name: '51-60'},
              {value: data.activistAge_61_70, name: '61-70'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[5].setOption({
        title: {
          text: '预备党员各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.proMemberAge_18_30, name: '18-30'},
              {value: data.proMemberAge_31_40, name: '31-40'},
              {value: data.proMemberAge_41_50, name: '41-50'},
              {value: data.proMemberAge_51_60, name: '51-60'},
              {value: data.proMemberAge_61_70, name: '61-70'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[6].setOption({
        title: {
          text: '正式党员各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.realMemberAge_18_30, name: '18岁-30岁'},
              {value: data.realMemberAge_31_40, name: '31岁-40岁'},
              {value: data.realMemberAge_41_50, name: '41岁-50岁'},
              {value: data.realMemberAge_51_60, name: '51岁-60岁'},
              {value: data.realMemberAge_61_70, name: '61岁-70岁'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[7].setOption({
        title: {
          text: '近3年新增积极分子各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.newActivistAge_18_30, name: '18岁-30岁'},
              {value: data.newActivistAge_31_40, name: '31岁-40岁'},
              {value: data.newActivistAge_41_50, name: '41岁-50岁'},
              {value: data.newActivistAge_51_60, name: '51岁-60岁'},
              {value: data.newActivistAge_61_70, name: '61岁-70岁'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[8].setOption({
        title: {
          text: '近3年新增预备党员各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.newProMemberAge_18_30, name: '18岁-30岁'},
              {value: data.newProMemberAge_31_40, name: '31岁-40岁'},
              {value: data.newProMemberAge_41_50, name: '41岁-50岁'},
              {value: data.newProMemberAge_51_60, name: '51岁-60岁'},
              {value: data.newProMemberAge_61_70, name: '61岁-70岁'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[9].setOption({
        title: {
          text: '近3年新增正式党员各年龄段人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.newRealMemberAge_18_30, name: '18岁-30岁'},
              {value: data.newRealMemberAge_31_40, name: '31岁-40岁'},
              {value: data.newRealMemberAge_41_50, name: '41岁-50岁'},
              {value: data.newRealMemberAge_51_60, name: '51岁-60岁'},
              {value: data.newRealMemberAge_61_70, name: '61岁-70岁'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[10].setOption({
        title: {
          text: '各宿舍区域人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.dormPlace1, name: '学院路大运村'},
              {value: data.dormPlace2, name: '学院路校内'},
              {value: data.dormPlace3, name: '沙河'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[11].setOption({
        title: {
          text: '各校区人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.campusPlace1, name: '学院路校区'},
              {value: data.campusPlace2, name: '沙河校区'},
              {value: data.campusPlace3, name: '杭州研究所'},
              {value: data.campusPlace4, name: '青岛研究所'},
              {value: data.campusPlace5, name: '苏州研究所'},
              {value: data.campusPlace6, name: '深圳研究所'},
              {value: data.campusPlace7, name: '杭州研究所'},
              {value: data.campusPlace8, name: '其他'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })
      cakeslist[12].setOption({
        title: {
          text: '各民族人数',
          top: 'top',
          left: 'center',
          textStyle: {fontSize: 27,},
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: 'skyblue',
          textStyle: {
            color: 'pink',
            fontSize: '18px',
          }
        },
        series: [
          {
            title: {text: '男女人数'},
            type: 'pie',
            radius: '55%',
            data: [
              {value: data.ethnicHan, name: '汉族'},
              {value: data.ethnicOthers, name: '少数民族'},
            ],
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          }
        ]
      })

      lineslist[0].setOption({
        title: {
          text: '各党支部人数',
          x: 'center',
        },
        xAxis: {
          data: [
            '1706-1党支部',
            '1706-2党支部',
            '1806党支部',
            '1906党支部',
            '硕18061党支部',
            '硕18062党支部',
            '硕18063党支部',
            '硕19061党支部',
            '硕19062党支部',
            '硕19063党支部',
            '硕19064党支部',
            '硕19065党支部',
            '硕19066党支部',
            '硕19067党支部',
            '硕20061党支部',
            '硕20062党支部',
            '硕20063党支部',
            '硕20064党支部',
            '硕20065党支部',
            '硕20066党支部',
            'BYACT1党支部',
            'BYACT2党支部',
            'BY软国重党支部',
            'BY软件所党支部',
            'BY系统结构党支部',
            'BY虚拟现实党支部',
            'BY应用1党支部',
            'BY应用2党支部',
            'BY应用3党支部',
          ],
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.team2, data.team3, data.team4, data.team5,
              data.team6, data.team7, data.team8, data.team9,
              data.team10, data.team11, data.team12, data.team13,
              data.team14, data.team15, data.team16, data.team17,
              data.team18, data.team19, data.team20, data.team21,
              data.team22, data.team23, data.team24, data.team25,
              data.team26, data.team27, data.team28, data.team29,
              data.team30,],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[1].setOption({
        title: {
          text: '男女人数',
          x: 'center',
        },
        xAxis: {
          data: ['男', '女'],
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [data.male, data.female],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[2].setOption({
        title: {
          text: '党支部成员组成',
          x: 'center',
        },
        xAxis: {
          data: ['积极分子', '预备党员', '正式党员'],
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [data.activist, data.proMember, data.realMember],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[3].setOption({
        title: {
          text: '近3年党支部新增人数',
          x: 'center',
        },
        xAxis: {
          data: ['新增积极分子', '新增预备党员', '新增正式党员']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [data.newActivist, data.newProMember, data.newRealMember],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[4].setOption({
        title: {
          text: '积极分子各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.activistAge_18_30,
              data.activistAge_31_40,
              data.activistAge_41_50,
              data.activistAge_51_60,
              data.activistAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[5].setOption({
        title: {
          text: '预备党员各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.proMemberAge_18_30,
              data.proMemberAge_31_40,
              data.proMemberAge_41_50,
              data.proMemberAge_51_60,
              data.proMemberAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[6].setOption({
        title: {
          text: '正式党员各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.realMemberAge_18_30,
              data.realMemberAge_31_40,
              data.realMemberAge_41_50,
              data.realMemberAge_51_60,
              data.realMemberAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[7].setOption({
        title: {
          text: '近3年新增积极分子各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.newActivistAge_18_30,
              data.newActivistAge_31_40,
              data.newActivistAge_41_50,
              data.newActivistAge_51_60,
              data.newActivistAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[8].setOption({
        title: {
          text: '近3年新增预备党员各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.newProMemberAge_18_30,
              data.newProMemberAge_31_40,
              data.newProMemberAge_41_50,
              data.newProMemberAge_51_60,
              data.newProMemberAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[9].setOption({
        title: {
          text: '近3年新增正式党员各年龄段人数',
          x: 'center',
        },
        xAxis: {
          data: ['18-30', '31-40', '41-50', '51-60', '61-70']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.newRealMemberAge_18_30,
              data.newRealMemberAge_31_40,
              data.newRealMemberAge_41_50,
              data.newRealMemberAge_51_60,
              data.newRealMemberAge_61_70],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[10].setOption({
        title: {
          text: '各宿舍区域人数',
          x: 'center',
        },
        xAxis: {
          data: ['学院路大运村', '学院路校内', '沙河']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.dormPlace1,
              data.dormPlace2,
              data.dormPlace3],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[11].setOption({
        title: {
          text: '各校区人数',
          x: 'center',
        },
        xAxis: {
          data: ['学院路校区', '沙河校区', '杭州研究所', '青岛研究所', '苏州研究所', '深圳研究所', '云南研究所', '其他']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [
              data.campusPlace1,
              data.campusPlace2,
              data.campusPlace3,
              data.campusPlace4,
              data.campusPlace5,
              data.campusPlace6,
              data.campusPlace7,
              data.campusPlace8,],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
      lineslist[12].setOption({
        title: {
          text: '各民族人数',
          x: 'center',
        },
        xAxis: {
          data: ['汉族', '少数民族']
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
          {
            name: '人数',
            data: [data.ethnicHan, data.ethnicOthers],
            type: 'line',
          }
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
    },

    // 所选择的党支部改变时，发送请求获取改党支部的信息
    changeFlag(value) {
      // 确定 lineAll, columnAll, cakeAll 是否展示
      if(value[0] == 'team' && value[1] != 'team1') {
        this.team = '';
      } else {
        this.team = 'team1';
      }
      axios({
        url: '/api/graph/team',
        method: 'post',
        params: {
          value: value,
        }
      }).then(res => {
        if (res.data.flag) {
          this.data = res.data.data;
          console.log("获取信息成功");
          this.drawLine();
        } else {
          console.log("获取信息失败！");
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
</style>
