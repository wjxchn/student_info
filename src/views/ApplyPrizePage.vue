<template>
  <div id="applyPrizePage">
    <background :titlevalue="chinesename" iconvalue="inventory"></background>
    <div class="table">
      <!-- 弹窗begin -->
      <v-dialog v-model="applyPrizeDialog" width="1220px" persistent>
        <v-card style="height:550px;margin-left:15px;" width="1187px">
          <v-card-title>
            <span style="font-size:24px;text-shadow:2px 2px 2px rgba(0,0,0,.5)">申请奖项</span>
          </v-card-title>
          <div>
            <v-row>
              <!-- 第一列 -->
              <v-col cols="6" style="margin-top:30px;">
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;">奖项编号：</v-col>
                  <v-col style="margin-right:200px;">{{ prizeId }}</v-col>
                </v-row>
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;">奖项名称：</v-col>
                  <v-col style="margin-right:200px;">{{ prizeName }}</v-col>
                </v-row>
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;">项目金额：</v-col>
                  <v-col style="margin-right:200px;" v-html="prizeAccountShow"></v-col>
                </v-row>
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;color:skyblue">申请条件：</v-col>
                  <v-col style="margin-right:200px;">{{ applyCondition }}</v-col>
                </v-row>
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;">申请截止日期：</v-col>
                  <v-col style="margin-right:200px;">{{ applyDeadline }}</v-col>
                </v-row>
                <v-row>
                  <v-col style="margin-left:100px;font-weight:700;">投票方式</v-col>
                  <v-col style="margin-right:200px;">{{ vote }}</v-col>
                </v-row>
              </v-col>
              <!-- 第二列 -->
              <v-col cols="5">
                <v-row style="margin-top:30px;">
                  <v-col cols="4">学号：</v-col>
                  <v-col cols="4" style="height:30px;">
                    <v-text-field
                        class="ma-0 pa-0"
                        required
                        dense
                        v-model="apply_studentId"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" style="line-height:30px;">姓名：</v-col>
                  <v-col cols="4" style="height:30px;">
                    <v-text-field
                        class="ma-0 pa-0"
                        required
                        dense
                        v-model="apply_studentName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" style="line-height:30px;">申请等级：</v-col>
                  <v-col cols="4" style="height:30px;">
                    <v-text-field
                        class="ma-0 pa-0"
                        required
                        dense
                        v-model="apply_level"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">上传附件(全面版)：</v-col>
                </v-row>
                <v-row>
                  <v-file-input
                      truncate-length="15"
                      shaped="outlined"
                      show-size="true"
                      height="30px"
                      style="padding:4px;width:100px;"
                      placeholder="点击上传文件"
                      v-model="apply_file1"
                  ></v-file-input>
                </v-row>
                <v-row>
                  <v-col cols="4">上传附件(公示版)：</v-col>
                  <v-col style="color:red;">（公示版请去掉手机号、地址等敏感信息）</v-col>
                </v-row>
                <v-row>
                  <v-file-input
                      truncate-length="15"
                      shaped="outlined"
                      show-size="true"
                      height="30px"
                      style="padding:4px;width:100px;"
                      placeholder="点击上传文件"
                      v-model="apply_file2"
                  ></v-file-input>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-actions style="margin-top:20px;">
            <v-spacer></v-spacer>
            <v-btn
                text
                @click="applyPrizeDialog = false"
                style="backgroundColor:rgb(214, 214, 214);font-size:16px;"
            >
              取消
            </v-btn>
            <v-btn
                text
                @click="applyCommit"
                style="margin-right:250px;backgroundColor:rgb(157,220,245);font-size:16px;"
            >
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 弹窗end -->

      <!-- 返回申请列表按钮begin -->
      <div style="width:100%;height:38px;">
        <v-btn
            depressed
            small
            style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; color:rgba(71, 112, 166, 0.996); font-size:13px;"
            @click="toapplyprize()"
        >
          返回申请列表
        </v-btn>
      </div>
      <!-- 返回申请列表按钮end -->
      <div style="height:15px;width=100%;">
      </div>

      <!-- 列表begin -->
      <div style="min-width:960px;">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :single-select="singleSelect"
            :single-expand="singleExpand"
            item-key="prizeitemid"
            class="elevation-1"
            show-select
            show-expand
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            mobile-breakpoint=0
        >
          <template v-slot:[`item.operation`]={item}>
            <v-btn
                depressed small
                style="background-color:rgba(71, 112, 166, 1);color:white;font-size:16px;"
                @click="applyPrice(item)"
            >
              申请
            </v-btn>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title style="font-size:24px;text-shadow:2px 2px 2px rgba(0,0,0,.3)">奖项申请</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-switch
                  v-model="singleExpand"
                  label="Single expand"
                  class="mt-2"
              ></v-switch>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" style="font-size:15px;">
              <v-row>
                <v-col cols="1" style="margin-left:600px;margin-top:100px;padding:10px;font-weight:700;">奖项编号：</v-col>
                <v-col style="padding:10px;margin-top:100px;"> {{ item.prizeId }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="1" style="margin-left:600px;padding:10px;font-weight:700;">奖项名称：</v-col>
                <v-col style="padding:10px;"> {{ item.prizeName }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="1" style="margin-left:600px;padding:10px;font-weight:700;">奖项金额：</v-col>
                <v-col style="padding:10px;"> {{ item.prizeAccount }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="1" style="margin-left:600px;padding:10px;font-weight:700;">申请条件：</v-col>
                <v-col style="padding:10px;"> {{ item.applyCondition }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="1" style="margin-left:600px;padding:10px;font-weight:700;">申请截止日期：</v-col>
                <v-col style="padding:10px;"> {{ item.applyDeadline }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="1" style="margin-left:600px;margin-bottom:100px;padding:10px;font-weight:700;">投票方式：
                </v-col>
                <v-col style="padding:10px;margin-bottom:100px;"> {{ item.vote }}</v-col>
              </v-row>
            </td>
          </template>
        </v-data-table>
      </div>
      <!-- 列表end -->

      <!-- 翻页begin -->
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共 {{ desserts.length }} 条
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
      <!-- 翻页end -->
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import axios from 'axios';

export default {
  name: 'ApplyPrizePage',
  components: {
    Background
  },
  data() {
    return {
      // 用于渲染申请dialogue等信息begin
      prizeId: '',
      prizeName: '',
      prizeAccount: '',
      prizeAccountShow: '',
      applyCondition: '',
      applyDeadline: '',
      // 用于渲染申请dialogue等信息end

      // 用于获取填写的信息begin
      apply_studentId: '',
      apply_studentName: '',
      apply_level: '',
      apply_file1: '',
      apply_file2: '',
      // 用于获取填写的信息end
      vote: '',
      chinesename: '奖项申请',
      applyPrizeDialog: false,
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        {text: '奖项编号', value: 'prizeId', align: 'center', width: '150px'},
        {text: '奖项名称', value: 'prizeName', align: 'center', width: '150px'},
        {text: '奖项金额', value: 'prizeAccount', align: 'center', width: '150px'},
        {text: '申请条件', value: 'applyCondition', align: 'center', width: '150px'},
        {text: '申请截止日期', value: 'applyDeadline', align: 'center', width: '150px'},
        {text: '操作', value: 'operation', align: 'center', sortable: false, width: '300px'},
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selectitems: [
        {state: '10条/页', abbr: 10},
        {state: '20条/页', abbr: 20},
        {state: '30条/页', abbr: 30},
      ],
      desserts: [
        // {
        //   prizeitemid: 1,
        //   prizename: '励志奖学金',
        //   prizeaccount: '1000.00',
        //   applycondition: '成绩单，教师推荐',
        //   applydeadline: '2021-06-01',
        //   vote: '打分制',
        // }, {
        //   prizeitemid: 2,
        //   prizename: '励志奖学金',
        //   prizeaccount: '1000.00',
        //   applycondition: '成绩单，教师推荐',
        //   applydeadline: '2021-06-01',
        //   vote: '评选制',
        // }, {
        //   prizeitemid: 3,
        //   prizename: '励志奖学金',
        //   prizeaccount: '1000.00',
        //   applycondition: '成绩单，教师推荐',
        //   applydeadline: '2021-06-01',
        //   vote: '抽签制',
        // }
      ],
    }
  },
  methods: {
    // 申请按钮函数begin
    applyPrice(item) {
      this.applyPrizeDialog = true;
      this.prizeId = item.prizeId;
      this.prizeName = item.prizeName;
      this.prizeAccount = item.prizeAccount;
      this.applyCondition = item.applyCondition;
      this.applyDeadline = item.applyDeadline;
      this.vote = item.vote;
      this.apply_studentId = '';
      this.apply_studentName = '';
      this.apply_level = '';
      this.apply_file1 = '';
      this.apply_file2 = '';
      this.prizeAccountShow = '';
      for(var i = 0; i < item.prizeaccount.length; i ++) {
        this.prizeAccountShow += item.prizeaccount[i].level;
        this.prizeAccountShow += ':&nbsp;&nbsp;';
        this.prizeAccountShow += item.prizeaccount[i].money;
        this.prizeAccountShow += '</br>'
      }
    },
    // 申请按钮函数end

    // 提交申请奖项begin
    applyCommit() {

      axios({
        url: '/api/get',
        method: 'get',
        params: {
          auth: localStorage.getItem("Authorization"), //这是请求头
          authauth: "2222"
        },
        data: {'authauth': "2222"}  //这是请求体
      }).then(res => {
        // console.log(res);
        var flag = res.data.flag;
        // console.log("校验成功？", res.data);
        if (flag) {
          // next();
          console.log(res.data);
          this.form = res.data.Stuinfo;
        }
      })

      // var data = {
      //   id: this.apply_studentId,
      //   name: this.apply_studentName,
      //   level: this.apply_level,
      //   file1: this.apply_file1,
      //   file2: this.apply_file2
      // };
      // if (data.id == '') {
      //   alert('请输入学号');
      // } else if (data.name == '') {
      //   alert('请输入姓名');
      // } else if (data.level == '') {
      //   alert('请输入申请等级');
      // } else if (data.file1 == '') {
      //   alert('请上传附件（全面版）');
      // } else if (data.file2 == '') {
      //   alert('请上传附件（公示版）');
      // } else {
      //   axios({
      //     url: '9999',
      //     method: 'post',
      //     data: data,
      //   }).then(() => {
      //     alert('上传成功！');
      //   }).catch(() => {
      //     alert('上传失败!');
      //   })
      // }
    },
    // 提交申请奖项end
    toapplyprize() {
      this.$router.push('/applyprize');
    }
  },
  mounted() {
    // 获取数据库中的奖项begin
    axios({
      url: '/api/prize/all',
      method: 'get',
    }).then((res) => {
      var flag = res.data.flag;
      // console.log("校验成功？", res.data);
      if (flag) {
        // next();
        console.log(res.data);
        this.desserts = res.data.data;
        // alert('成功获取奖项！');
      }
    }).catch(() => {
      alert('获取数据失败！');
    })
// 获取数据库中的奖项end
  }
}
</script>

<style scoped>
.table{
  position: absolute;
  top: 230px;
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
}
</style>
