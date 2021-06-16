<template>
  <div id="askForLeave">
    <background titlevalue="学生请假" iconvalue="timer"></background>
    <div style="position:absolute;top:230px;width:100%;">
      <v-card>
        <v-container class="bgi" fluid>
          <v-container class="pa-0" style="margin-top: 100px;">

            <v-row dense class="ma-0 pa-0">
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 300px;margin: auto;">
                  <v-text-field v-model="form.name" label="姓名" required readonly></v-text-field>
                </div>
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 300px;margin: auto;">
                  <v-text-field v-model="form.schoolid" label="学号" required readonly></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="ma-0 pa-0">
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 300px;margin: auto;">
                  <v-text-field v-model="form.phonenumber" label="手机号码" required readonly></v-text-field>
                </div>
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 300px;margin: auto;">
                  <v-text-field v-model="form.directprofessorname" label="直带导师姓名" required readonly></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="ma-0 pa-0">
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 450px;margin: auto;">
                  <v-col>
                    <v-menu ref="beginTime.menu" v-model="beginTime.menu" :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="400px;">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="form.beginTime" label="开始日期" prepend-icon="event" readonly required outlined dense
                                      v-bind="attrs"
                                      v-on="on"
                                      style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                      </template>
                      <v-date-picker v-model="beginTime.value" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="beginTime.menu = false">取消</v-btn>
                        <v-btn text color="primary" @click="beginTime.menu = false;form.beginTime = beginTime.value;">
                          确定
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </div>
              </v-col>

              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 450px;margin: auto;">
                  <v-col>
                    <v-menu ref="endTime.menu" v-model="endTime.menu" :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="400px;">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="form.endTime" label="结束日期" prepend-icon="event" readonly required outlined dense
                                      v-bind="attrs"
                                      v-on="on"
                                      style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                      </template>
                      <v-date-picker v-model="endTime.value" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="endTime.menu = false">取消</v-btn>
                        <v-btn text color="primary" @click="endTime.menu = false;form.endTime = endTime.value;">
                          确定
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </div>
              </v-col>

            </v-row>

            <v-row dense class="ma-0 pa-0">
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 400px;margin: auto;">
                  <v-textarea required v-model="form.reason" outlined name="input-7-4"
                              label="请假理由。比如说我今天生病了"></v-textarea>
                </div>
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6">
                <div style="width: 400px;margin: auto;">
                  <v-textarea required v-model="form.targetPlace" outlined name="input-7-4"
                              label="目的地。比如说我要去故宫"></v-textarea>
                </div>
              </v-col>
            </v-row>


          </v-container>


          <v-container class="pa-0" style="margin-bottom: 100px;">
            <div style="margin: auto;width: 150px;">
              <v-btn color="#EBECF1" dark depressed width="50px"
                     style="color:rgba(71, 112, 166, 0.996078431372549);margin-top:20px;margin-right:10px;"
                     @click="cancelBtnClick">取消
              </v-btn>
              <v-btn color="rgba(71, 112, 166, 0.996078431372549)" dark depressed width="50px"
                     style="margin-top:20px;margin-left:10px;" @click="confirmBtnClick">提交
              </v-btn>
            </div>
          </v-container>
        </v-container>
      </v-card>

    </div>

  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import axios from 'axios';

export default {
  name: 'AskForLeave',
  components: {
    Background
  },
  data() {
    return {
      beginTime: {
        menu: false,
        value: "",
      },
      endTime: {
        menu: false,
        value: "",
      },
      form: {
        name: "",
        schoolid: "",
        phonenumber: "",
        directprofessorname: "",
        beginTime: "",
        endTime: "",
        reason: "",
        targetPlace: "",
      },
    }
  },
  methods: {
    cancelBtnClick() {
      this.$router.go(-1);
    },
    confirmBtnClick() {
      var tableValue = {
        schoolid: this.form.schoolid,
        name: this.form.name,
        phonenumber: this.form.phonenumber,
        directprofessorname: this.form.directprofessorname,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
        reason: this.form.reason,
        targetPlace: this.form.targetPlace
      }
      var begin = +new Date(tableValue.beginTime);
      var end = +new Date(tableValue.endTime);
      var now = +new Date();
      var timeFlag = (end - begin) / 1000 / 60 / 60 / 24;
      if (tableValue.beginTime == '') {
        alert('请选择请假开始时间');
      } else if (tableValue.endTime == '') {
        alert('请选择假期结束时间');
      } else if (tableValue.reason == '') {
        alert('请输入请假理由');
      } else if (tableValue.destination == '') {
        alert('请输入请假去向');
      } else if (timeFlag > 2) {
        alert('请假时间不能大于两天');
      } else if (timeFlag < 0) {
        alert('结束时间不能小于开始时间');
      } else if (end + 57600000 < now) {
        alert('结束时间不能小于今天');
      } else {
        axios({
          url: '/api/stu/leaveinfo/add',
          method: 'post',
          // params: {
          //   stuNum: this.name,
          // }
          data: this.form,
        }).then(res => {
          if (res.data.flag) {
            alert("请假成功！");
          } else {
            alert("请假失败！")
          }
        })
      }
    }
  },
  mounted() {
    var token = localStorage.getItem('Authorization');
    axios({
      url: '/api/stu/getinfo',
      method: 'post',
      params: {
        token: token, //这是请求头
      }
      // data: {'token': token}  //这是请求体
    }).then(res => {
      var flag = res.data.flag;
      if (flag) {
        console.log(res.data);
        this.form.schoolid = res.data.Stuinfo.schoolid;
        this.form.name = res.data.Stuinfo.name;
        this.form.phonenumber = res.data.Stuinfo.phonenumber;
        this.form.directprofessorname = res.data.Stuinfo.directprofessorname;
      }
    })
  }
}
</script>

<style scoped>
.bgi {
  background-image: url('../assets/img/askforleave/u1826.svg') !important;
  background-repeat: repeat-x;
  background-position: 0 -7.5rem;
}
</style>
