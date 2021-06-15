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
          show-select
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation="{ item }">
            <v-btn depressed small style="background-color:rgba(71, 112, 166, 0.996078431372549);color:white;" @click="PrizeInfo = item, ShowDialog = true">评审</v-btn>
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
  name: 'PrizeEvaluation',
  components: { 
    Background
  },
  data () {
    return {
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
        { text: '奖项金额', value: 'prizeAccount', align: 'center',width: '150px' },
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
          prizeAccount: '1000.00',
          applyCondition: '成绩单，教师推荐',
          applyDeadline: '2021-06-01',
        }
      ],
    }
  },
  methods: {
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
</style>