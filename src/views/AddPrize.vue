<template>
  <div id="addPrize">
    <background :titlevalue="ChineseName" iconvalue="military_tech"></background>
    <div class="table">

      <v-dialog
          v-model="ShowDialog"
          persistent
          width="900px"
      >
        <div style="background-color: white">
          <div style="height: 40px;"></div>
          <div style="width: 680px; margin-left: 100px;">

          <v-row dense>
            <v-col cols="3" style="line-height: 60px;">奖项名称：</v-col>
            <v-col cols="8">
              <v-text-field
                  v-model="prizeName"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="3" style="line-height: 60px">奖项等级和金额：</v-col>
            <v-col cols="9">
<!--              这个是已经添加了的-->
              <v-row dense class="already_add" v-for="(item,i) in prizeAccount" :key="i">
                <v-col cols="4">
                  <v-text-field
                      v-model="item.level"
                      placeholder="在这里输入等级"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                      v-model="item.money"
                      placeholder="在这里输入金额"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="5">
                  <v-btn color="blue"
                         v-if="prizeAccount.length != 1"
                         @click="PrizeInfo.splice(PrizeInfo.indexOf(item), 1)"
                  >删除</v-btn>
                  <v-btn v-if="i == prizeAccount.length - 1"
                         color="blue" style="margin-left: 10px"
                         @click="prizeAccount.push({level: '', money: ''})"
                  >添加</v-btn>
                </v-col>
              </v-row>

            </v-col>
          </v-row>

            <v-row dense>
              <v-col cols="3" style="line-height: 60px;">申请截止日期：</v-col>
              <v-col cols="3">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="applyDeadline"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="applyDeadline"
                        placeholder="选择一个日期"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="applyDeadline" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(applyDeadline)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="3">申请条件：</v-col>
              <v-col cols="8">
                  <v-textarea solo v-model="applyCondition"></v-textarea>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="3" style="line-height: 60px;">评审方式：</v-col>
              <v-col cols="9">
                <v-radio-group
                    v-model="vote"
                    row
                >
                  <v-radio v-for="item in AssessMethodArray" :label="item" :value="item" :key="item"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

          </div>

          <div style="width: 100%; text-align: center;">
            <v-btn width="40px" color="blue" @click="CancelAdd()">取消</v-btn>
            <v-btn width="40px" style="margin-left: 20px" color="red" @click="CommitAdd()">{{ DialogType == 0 ? "发布" : "应用编辑" }}</v-btn>
          </div>

          <div style="height: 20px;"></div>
        </div>
      </v-dialog>

      <div style="width:100%;height:38px;">
        <v-btn
          depressed
          small
          style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71, 112, 166, 0.996); font-size:13px;display:block;"
          @click="AddPrize()"
        >
          添加奖项
        </v-btn>
      </div>
      <div style="height:15px;width:100%;">
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
          show-expand
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation="{ item }">
            <v-btn depressed small style="background-color:white;border:1px solid grey;" @click="ChangeItem(item)">编辑</v-btn>
            <v-btn depressed small style="margin-left:30px;background-color:rgba(71, 112, 166, 0.996078431372549);color:white;" @click="DeleteItem(item)">删除</v-btn>
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
            :items="selectItems"
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
export default {
  name: 'AddPrize',
  components: { 
    Background
  },
  data () {
    return {
      yourpage: 1,
      //以下为弹窗表单的值
      prizeName: "",
      prizeAccount: [{level: "", money: ""}],
      applyCondition: "",
      applyDeadline: "",
      vote: "",
      //表单截止

      //弹窗的配置
      ShowDialog: false,
      DialogType: 0,
      NowTableItem: {},
      //说明：0为新增模式，1为修改模式

      AssessMethodArray: ["打分制", "单人投票制","多人投票制"],

      ChineseName: '奖项管理',
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
      selectItems: [
        { state: '10条/页', abbr: 10},
        { state: '20条/页', abbr: 20},
        { state: '30条/页', abbr: 30},
      ],
      desserts: [
        {
          prizeId: 1,
          prizeName: '励志奖学金',
          prizeAccount: [
            {level: "一等奖", money: "2000"},
            {level: "二等奖", money: "1000"},
            {level: "三等奖", money: "500"},
          ],
          applyCondition: '成绩单，教师推荐',
          applyDeadline: '2021-06-01',
          vote: "多人投票制",
        }
      ],
    }
  },
  methods: {
    pageTo(){
      console.log(this.yourpage);
      this.page = parseInt(this.yourpage);
    },
    CancelAdd() {
      this.ClearFormData();
      this.ShowDialog = false;
    },
    ClearFormData() {
      this.prizeName = "";
      this.prizeAccount = [{level: "", money: ""}];
      this.applyDeadline = "";
      this.applyCondition = "";
      this.vote = "";
    },
    CommitAdd() {
      let dateString = this.applyDeadline + " 23:59:59";
      let ddl = new Date(dateString);
      let current = new Date();

      if(this.prizeName == "") {
        alert("请输入奖项名称！");
        return;
      }
      for(let i = 0; i < this.prizeAccount.length; i++) {
        if(this.prizeAccount[i].level == "" || this.prizeAccount[i].money == "") {
          alert("奖项的等级和金额不能为空！");
          return;
        }

        //检验输入的money是否是一个数字（包含小数）
        let reg = /^[0-9]+\.?[0-9]*$/;
        if (!reg.test(this.prizeAccount[i].money)) {
          alert("奖项的金额必须是一个数字！");
          return;
        }
      }

      if(this.applyDeadline == "") {
        alert("申请截止时间不能为空！");
      }
      else if(ddl < current) {
        alert("截至日期不能早于今天！");
      }
      else if(this.applyCondition == "") {
        alert("奖项的申请条件不能为空！");
      }
      else if(this.vote == "") {
        alert("评审方式不能为空！");
      }
      else {
        //TO_DO: 发送信息
        if(this.DialogType == 0) {
          //新增一个奖项
          console.log();

          let NewItem = {};
          NewItem.prizeName = this.prizeName;
          NewItem.prizeAccount = this.prizeAccount;
          NewItem.applyDeadline = this.applyDeadline;
          NewItem.applyCondition = this.applyCondition;
          NewItem.vote = this.vote;
          //提示：奖项的编号由接口返回，是一个动态的值

          this.desserts.push(NewItem);
        }
        else {
          //修改NowTableItem标识的奖项
          console.log();

          this.NowTableItem.prizeName = this.prizeName;
          this.NowTableItem.prizeAccount = this.prizeAccount;
          this.NowTableItem.applyDeadline = this.applyDeadline;
          this.NowTableItem.applyCondition = this.applyCondition;
          this.NowTableItem.vote = this.vote;
        }

        this.ClearFormData();
        this.ShowDialog = false;
      }
    },
    AddPrize() {
      this.DialogType = 0;
      this.ShowDialog = true;
    },
    ChangeItem(item) {
      this.NowTableItem = item;

      this.prizeName = item.prizeName;
      this.prizeAccount = item.prizeAccount;
      this.applyDeadline = item.applyDeadline;
      this.applyCondition = item.applyCondition;
      this.vote = item.vote;

      this.DialogType = 1;
      this.ShowDialog = true;
    },
    DeleteItem(item) {
      confirm("你确定要删除这个奖项吗？") && this.desserts.splice(this.desserts.indexOf(item), 1);
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