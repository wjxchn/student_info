<template>
  <div id="prizeEvaluation">
    <background :titlevalue="chinesename" iconvalue="emoji_events"></background>
    <v-dialog
        v-model="ShowDialog"
        persistent
        width="700px"
    >
      <div style="background-color: white">
        <div style="height: 40px;"></div>
        <div style="width: 480px; margin-left: 110px; height: 380px; position: relative;">
          <h2 style="text-align: center; color: #0D4C7F; font-weight: bold; margin-bottom: 20px;">填写评审人信息</h2>
          <v-row dense>
            <v-col cols="3" style="line-height: 60px;">姓名:</v-col>
            <v-col cols="7">
              <v-text-field
                  v-model="EvaluatorName"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="3" style="line-height: 60px;">学号/工号:</v-col>
            <v-col cols="7">
              <v-text-field
                  v-model="EvaluatorId"
                  @change="OnCheckId()"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="3" style="line-height: 60px;">职务/职称:</v-col>
            <v-col cols="7">
                <v-select
                    :items="JobSelectionArray"
                    :disabled="JobSelectionDisable"
                    v-model="EvaluatorJob"
                    outlined
                ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <div style="width: 250px; margin-left: 150px;">
              <v-row>
                <v-col><v-btn small color="#EEF0F4" @click="Cancel()">取消</v-btn></v-col>
                <v-col><v-btn small color="#6B8DB8" @click="Evaluate()">评审</v-btn></v-col>
              </v-row>
            </div>
          </v-row>
        </div>
      </div>
    </v-dialog>
    <div class="table">
      <div style="width:100%;height:53px;">
      </div>    
      <div style="min-width:960px;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :single-select="singleSelect"
          :single-expand="singleExpand"
          item-key="name"
          class="elevation-1"
          show-expand
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation="{ item }">
            <v-btn depressed small style="background-color:rgba(71, 112, 166, 0.996078431372549);color:white;" @click="PrizeInfo = item, ShowDialog = true">评审</v-btn>
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
          共{{ this.desserts.length }}条
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
          <v-container class="max-width">
            <v-pagination :total-visible="10" v-model="page" :length="pageCount"></v-pagination>
          </v-container>
        </div>
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          跳至
        </div>
        <div style="display: inline-block;">
          <v-text-field
              v-model="yourpage"
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
        <v-btn depressed large style="margin-left:10px;background-color:rgba(71, 112, 166, 0.996078431372549);color:white;" @click="pageTo()">跳转</v-btn>

      </div>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import axios from "axios"
export default {
  name: 'PrizeEvaluation',
  components: { 
    Background
  },
  data () {
    return {
      yourpage: 1,
      ShowDialog: false,
      Dialog_data: undefined,
      JobSelectionArray: ["教授", "副教授"],
      JobSelectionDisable: false,

      EvaluatorName: "",
      EvaluatorId: "",
      EvaluatorJob: "",

      PrizeInfo: undefined,

      chinesename: '评审奖项',
      valid: true,
      checkbox: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: '奖项编号', value: 'prizeId', align: 'center',width: '150px' },
        { text: '奖项名称', value: 'prizeName', align: 'center',width: '150px' },
        { text: '奖项金额', value: 'prizeAccount[0].money', align: 'center',width: '150px' },
        { text: '申请条件', value: 'applyCondition', align: 'center',width: '150px' },
        { text: '申请截止日期', value: 'applyDeadline', align: 'center',width: '150px' },
        { text: '操作', value: 'operation', align: 'center', sortable:false, width: '300px' },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selectitems: [
        { state: '10条/页', abbr: 10},
        { state: '20条/页', abbr: 20},
        { state: '30条/页', abbr: 30},
      ],
      desserts: [
        {
          prizeId: 1,
          prizeName: '励志奖学金',
          prizeAccount: [
            {level: '一等奖', money: '1000.0'},
            {level: '二等奖', money: '500.0'},
            {level: '三等奖', money: '200.0'},
          ],
          applyCondition: '成绩单，教师推荐',
          applyDeadline: '2021-06-01',
          vote: "打分制",
          voteLimit: "",
        }
      ],
    }
  },
  methods: {
    pageTo(){
      console.log(this.yourpage);
      this.page = parseInt(this.yourpage);
    },
    OnCheckId() {
      let reg = new RegExp("^[0-9]")
      if(reg.test(this.EvaluatorId)) {
        //这是个学生
        this.EvaluatorJob = "学生代表";
        this.JobSelectionDisable = true;
      }
      else {
        this.JobSelectionDisable = false;
      }
    },
    Cancel() {
      this.ShowDialog = false;

      this.JobSelectionDisable = false;
      this.EvaluatorName = "";
      this.EvaluatorId = "";
      this.EvaluatorJob = "";
    },
    Evaluate() {
      if(this.EvaluatorName == "") {
        alert("请输入姓名！");
      }
      else if(this.EvaluatorId == "") {
        alert("请输入学号/工号!");
      }
      else if(this.EvaluatorJob == "") {
        alert("请输入职务/职称!");
      }
      else {
        //提交
        let that = this;
        this.$router.push({
          path: "/prizeCandidate",
          name: "PrizeCandidate",
          params: {
            EvaluatorName: that.EvaluatorName,
            EvaluatorId: that.EvaluatorId,
            EvaluatorJob: that.EvaluatorJob,

            PrizeInfo: that.PrizeInfo,
          }
        });

        this.Cancel();
      }
    }
  },
  mounted() {
    axios.get("/api/teacher/evaluateprize")
    .then(res => {
      if(res.flag == true) {
        this.desserts = res.data;
      }
      else {
        alert(`从服务器获取失败! ${res.exc}`);
      }
    }).catch(err => {
      alert(`错误! ${err}`);
    });
  }
}
</script>

<style scoped>
.table{
  position: absolute;
  top:230px;
  width:80%;
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