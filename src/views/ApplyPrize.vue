<template>
  <div id="applyPrize">
    <background :titlevalue="chinesename" iconvalue="inventory"></background>
    <div class="table">
      <div style="width:100%;height:38px;">
        <v-btn
          depressed
          small
          style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71,112,166,0.99); font-size:13px;display:block;"
          @click="toapplyprizepage()"
        >
          申报奖项
        </v-btn>
      </div>
      <div style="height:15px;width:100%;">
      </div>
      <div style="min-width:960px;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="list"
          :single-select="singleSelect"
          :single-expand="singleExpand"
          item-key="name"
          class="elevation-1"
          show-select
          show-expand
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation="{ item, value }">
<!--            <v-btn depressed small style="background-color:rgba(71,112,166,1);color:white;" @click="changeItem(item, value)">修改</v-btn>-->
            <v-btn depressed small style="background-color:#ec2a30;color:white;"
                   v-if="item.state==2 || item.state == 4"
                   @click="deleteItem(item, value)">删除</v-btn>
            <v-btn depressed small color="blue" style="color: white"
                   v-if="item.state==3"
                   @click="checkReason()"
            >查看原因</v-btn>
            <v-btn depressed small color="blue" style="color: white"
                   v-if="item.state==5"
                   @click="checkResult()"
            >查看结果</v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
<!--            点击表项展开后显示的内容-->
<!--            学生应该看到该奖的一些信息-->
            <td :colspan="headers.length">
              <div class="detail_box">
                <v-row dense>
                  <v-col><p class="attribution_name">奖项编号：</p></v-col> <v-col><p class="attr_data">{{ item.prizeId }}</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">奖项名称：</p></v-col> <v-col><p class="attr_data">{{ item.prizeName }}</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">奖项金额：</p></v-col>

                  <v-col>
                    <div style="width: 200px;">
                      <v-row dense v-for="prize in item.prizeAccount" :key="prize.level">
                        <v-col>{{ prize.level }}</v-col>
                        <v-col class="prize_money">{{ prize.money }}元</v-col>
                      </v-row>
                    </div>

                    <div style="height: 15px;"></div>
                  </v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">申请条件：</p></v-col> <v-col><p class="attr_data">{{ item.applyCondition }}</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">申请截止时间：</p></v-col> <v-col><p class="attr_data">{{ item.applyDeadline }}</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">投票方式：</p></v-col> <v-col><p class="attr_data">{{ item.vote }}</p></v-col>
                </v-row>
              </div>
            </td>
            
          </template>
        </v-data-table>
      </div>
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共1条
        </div>
        <div style="display: inline-block;">
          <v-select
            :items="selectitems"
            item-text="state"
            item-value="abbr"
            v-model="itemsPerPage"
            solo
            dense
            outlined
            flat
            style="width: 100px;font-size:10px;"
          ></v-select>
        </div>
        <div style="display: inline-block; position: relative; top: 5px;">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          跳至
        </div>
        <div style="display: inline-block;">
          <v-text-field
            :value="page"
            type="number"
            min="1"
            style="width: 100px;"
            :max="pageCount"
            single-line
            required
            outlined
            dense
          ></v-text-field>
        </div>
        <div style="display: inline-block; margin-left:10px; font-weight:700; color:#0D4C7F;">
          页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
export default {
  name: 'ApplyPrize',
  components: { 
    Background
  },
  data () {
    return {
      chinesename: '已申报的奖项',
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: '奖项编号', value: 'prizeId', align: 'center',width: '100px' },
        { text: '奖项名称', value: 'prizeName', align: 'center',width: '140px' },
        { text: '奖项金额', value: 'prizeAccount[0].money', align: 'center', width: '100px' },
        { text: '申请人学号', value: 'applyStudentId', align: 'center',width: '130px' },
        { text: '申请人姓名', value: 'applyStudentName', align: 'center',width: '130px' },
        { text: '申请附件', value: 'appendix', align: 'center',width: '150px' },
        { text: '申请日期', value: 'applyTime', align: 'center',width: '120px' },
        { text: '申请截止日期', value: 'applyDeadline', align: 'center',width: '130px' },
        { text: '状态', value: 'state_str', align: 'center',width: '130px' },
        { text: '操作', value: 'operation', align: 'center', sortable:false, width: '120px' },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selectitems: [
        { state: '10条/页', abbr: 10},
        { state: '20条/页', abbr: 20},
        { state: '30条/页', abbr: 30},
      ],
      list: [
        {
          prizeId: 1,
          prizeName: '励志奖学金',
          prizeAccount: [
            {level: "一等奖", money: "2000"},
            {level: "二等奖", money: "1000"},
            {level: "三等奖", money: "500"},
          ],
          applyStudentId: '18393728',
          applyStudentName: '张三',
          appendix: '张三成绩单.pdf',
          applyTime: '2019-12-13',
          applyDeadline: '2020-01-01',
          applyCondition: "成绩单",
          vote: "打分制",
          state: 3,

          rejectReason: "",
          evaluateResult: "",//评审结果
        }
      ],

      stateString: [
          "", "未申请", "已申请，待审核", "审核不通过", "审核成功，待评审", "评审完毕"
      ],
    }
  },
  methods:{
    toapplyprizepage(){
      this.$router.push('/applyprizepage');
    },

    changeItem(item, value) {
      console.log(item, value);
    },

    deleteItem(item, value) {
      const index = this.list.indexOf(item);
      confirm("你是否想要取消此项申报？") && this.list.splice(index, 1);
      console.log(item, value);
    }
  },
  mounted() {
    //TO_DO: 通过接口获取登录学生已申报的奖项信息
    //保存到list中

    for(let i = 0; i < this.list.length; i++) {
      this.list[i].state_str = this.stateString[this.list[i].state];
    }
  }
}
</script>

<style scoped>
.table{
  position: absolute;
  top:230px;
  width:90%;
  margin-left: 50%;
  transform: translate(-50%);
}

.attribution_name {
  font-weight: bold;
  display: inline-block;
}
.attr_data {
  display: inline-block;
}
.detail_box {
  width: 400px;
  left: 50%;
  position: relative;
  transform: translate(-50%, 0);

  margin-top: 30px;
  margin-bottom: 20px;
}
.prize_money {
  text-align: right;
}
</style>