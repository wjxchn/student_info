<template>
  <div id="addPrize">
    <background :titlevalue="chinesename" iconvalue="military_tech"></background>
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
                  v-model="PrizeName"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="3" style="line-height: 60px">奖项等级和金额：</v-col>
            <v-col cols="9">
<!--              这个是已经添加了的-->
              <v-row dense class="already_add" v-for="(item,i) in PrizeInfo" :key="i">
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
                         v-if="PrizeInfo.length != 1"
                         @click="PrizeInfo.splice(PrizeInfo.indexOf(item), 1)"
                  >删除</v-btn>
                  <v-btn v-if="i == PrizeInfo.length - 1"
                         color="blue" style="margin-left: 10px"
                         @click="PrizeInfo.push({level: '', money: ''})"
                  >添加</v-btn>
                </v-col>
              </v-row>

            </v-col>
          </v-row>

            <v-row dense>
              <v-col cols="3" style="line-height: 60px;">申请截止日期：</v-col>
              <v-col cols="4">
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

          </div>

          <div style="width: 100%; text-align: center;">
            <v-btn width="40px" color="blue" @click="CancelAdd()">取消</v-btn>
            <v-btn width="40px" style="margin-left: 20px" color="red" @click="CommitAdd()">发布</v-btn>
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
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation>
            <v-btn depressed small style="background-color:white;border:1px solid grey;">编辑</v-btn>
            <v-btn depressed small style="margin-left:30px;background-color:rgba(71, 112, 166, 0.996078431372549);color:white;">删除</v-btn>
          </template>
        </v-data-table>
      </div>
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共50条
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
  name: 'AddPrize',
  components: { 
    Background
  },
  data () {
    return {
      //以下为弹窗表单的值
      PrizeName: "",
      PrizeInfo: [{level: "", money: ""}],
      LevelNum: 0,
      applyDeadline: "",

      chinesename: '奖项管理',
      valid: true,
      checkbox: false,
      selectdialog: false,
      ShowDialog: false,

      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: '奖项编号', value: 'prizeitemid', align: 'center',width: '150px' },
        { text: '奖项名称', value: 'prizename', align: 'center',width: '150px' },
        { text: '奖项金额', value: 'prizeaccount', align: 'center',width: '150px' },
        { text: '申请条件', value: 'applycondition', align: 'center',width: '150px' },
        { text: '申请截止日期', value: 'applydeadline', align: 'center',width: '150px' },
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
          prizeitemid: 1,
          prizename: '励志奖学金',
          prizeaccount: '1000.00',
          applycondition: '成绩单，教师推荐',
          applydeadline: '2021-06-01',
        }
      ],
    }
  },
  methods: {
    CancelAdd() {
      this.PrizeName = "";
      this.PrizeInfo = [{level: "", money: ""}];
      this.LevelNum = 0;
      this.applyDeadline = "";

      this.ShowDialog = false;
    },
    CommitAdd() {
      //TO_DO: 发送信息

      this.PrizeName = "";
      this.PrizeInfo = [{level: "", money: ""}];
      this.LevelNum = 0;
      this.applyDeadline = "";

      this.ShowDialog = false;
    },
    AddPrize() {
      this.ShowDialog = true;
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