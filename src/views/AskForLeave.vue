<template>
  <div id="askForLeave">
    <background :titlevalue="chinesename" iconvalue="timer"></background>
    <div style="position:absolute;top:230px;left:50%;transform:translate(-50%);width:90%;">
      <v-card>
        <div class="basic_info_form">
          <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
          >
            <v-container class="ma-0 pt-12 mb-12 bgi" fluid>
              <v-row dense no-gutters class="ma-0 pa-0" justify="center">
                <v-col
                    v-for="w in formlist"
                    :key="w.name"
                    class="ma-0 pb-12"
                    cols="12"
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                >
                  <v-container fluid v-for="n in w.data" :key="n.name" class="ma-0 pa-0">
                    <v-row dense no-gutters class="ma-0 pa-0">
                      <v-col cols="4" class="ma-0 pa-0">
                        <v-subheader class="ma-0 pa-0" style="font-size:16px;">{{ n.chinesename }}</v-subheader>
                      </v-col>
                      <v-col cols="8" class="ma-0 pa-0">
                        <div v-if="n.type=='addtextfield'">
                          <v-container class="ma-0 pa-0" v-for="q in n.valuelist" :key="q.index">
                            <v-row dense no-gutters class="ma-0 pa-0">
                              <v-col
                                  cols="9"
                              >
                                <v-text-field
                                    class="ma-0 pa-0"
                                    v-model="q.value"
                                    required
                                    outlined
                                    dense
                                    style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="3"
                              >
                                <v-btn @click="q.func(n,q.index)" v-model="q.buttontext">
                                  {{ q.buttontext }}
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </div>
                        <v-textarea
                            v-model="n.value"
                            required
                            outlined
                            flat
                            dense
                            background-color="white"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);height:125px;"
                            auto-grow
                            v-if="n.type=='textarea'"
                        ></v-textarea>
                        <input type="file" id="upload" ref="upload" @change="changeimg" accept=".jpg, .jpeg, .png"
                               v-if="n.type=='pictureupload'"
                               style="display:block;width:90%;font-size:10px;margin-top:10px;">
                        <img :src="n.src" width="70%" alt="" v-if="n.type=='picture'"/>
                        <v-text-field
                            class="ma-0 pa-0"
                            v-model="n.value"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);height:55px;"
                            v-if="n.type=='singleline'"
                        ></v-text-field>
                        <v-radio-group v-model="n.value" v-if="n.type=='radio'" row
                                       style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                          <v-radio
                              v-for="i in n.radiochoice"
                              :key="i"
                              :label="i"
                              :value="i"
                              style="font-size:10px;"
                          ></v-radio>
                        </v-radio-group>
                        <v-menu
                            ref="n.menu"
                            v-model="n.menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            v-if="n.type=='timeselect'"
                            class="afl_date"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="n.value"
                                prepend-icon="event"
                                readonly
                                required
                                outlined
                                dense
                                v-bind="attrs"
                                v-on="on"
                                @click="dateChoose"
                                style="font-size:20px;width:100%;transform:scale(0.75,0.75);"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="n.value" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="n.menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="n.menu = false">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                  <div style="margin-left:50%;transform: translateX(-50px)">
                    <v-btn color="#EBECF1" dark depressed width="50px"
                           style="color:rgba(71, 112, 166, 0.996078431372549);margin-top:20px;margin-right:10px;"
                           @click="cancelBtnClick">取消
                    </v-btn>
                    <v-btn color="rgba(71, 112, 166, 0.996078431372549)" dark depressed width="50px"
                           style="margin-top:20px;margin-left:10px;" @click="confirmBtnClick">提交
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
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
      chinesename: '学生请假',
      valid: true,
      formlist: [
        {
          name: 'item1',
          data: [
            {
              name: 'studentid',
              chinesename: '学号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'studentname',
              chinesename: '姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'phonenumber',
              chinesename: '手机号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'professorname',
              chinesename: '导师姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'leavestarttime',
              chinesename: '请假开始时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'leaveendtime',
              chinesename: '请假结束时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'leavereason',
              chinesename: '请假理由',
              value: '',
              type: 'textarea',
            },
            {
              name: 'leaveto',
              chinesename: '请假去向',
              value: '',
              type: 'textarea',
            },
          ]
        },
      ],
    }
  },
  watch: {
    'formlist[0].data[5].value': function(val, oldvalue) {
      console.log(val);
      console.log(oldvalue);
    }
  },
  methods: {
    changeimg(item) {
      this.formlist[0].data[0].files = item.target.files;
      this.formlist[0].data[1].src = window.webkitURL.createObjectURL(this.formlist[0].data[0].files[0]);
    },
    cancelBtnClick() {
      this.$router.push('BasicInfo');
    },
    confirmBtnClick() {
      var tableValue = {
        schoolid: this.formlist[0].data[0].value,
        name: this.formlist[0].data[1].value,
        phone: this.formlist[0].data[2].value,
        teachername: this.formlist[0].data[3].value,
        starttime: this.formlist[0].data[4].value,
        endtime: this.formlist[0].data[5].value,
        reason: this.formlist[0].data[6].value,
        destination: this.formlist[0].data[7].value
      }
      var begin = +new Date(tableValue.starttime);
      var end = +new Date(tableValue.endtime);
      var now = +new Date();
      var timeFlag = (end - begin) / 1000 / 60 / 60 / 24;
      if (tableValue.schoolid == '') {
        alert('请输入学号');
      } else if (tableValue.name == '') {
        alert('请输入姓名');
      } else if (tableValue.phone == '') {
        alert('请输入手机号');
      } else if (tableValue.teacher == '') {
        alert('请输入导师姓名');
      } else if (tableValue.starttime == '') {
        alert('请选择请假开始时间');
      } else if (tableValue.endtime == '') {
        alert('请选择假期结束时间');
      } else if (tableValue.reason == '') {
        alert('请输入请假理由');
      } else if (tableValue.destination == '') {
        alert('请输入请假去向');
      } else if(timeFlag > 2) {
        alert('请假时间不能大于两天');
      } else if(timeFlag < 0) {
        alert('结束时间不能小于开始时间');
      } else if(end + 57600000 < now) {
        alert('结束时间不能小于今天');
      } else {
        axios({
          url: '/api/leaveinfo',
          method: 'post',
          // params: {
          //   stuNum: this.name,
          // }
          data: tableValue,
        }).then(res => {
          console.log(res);
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
      url: '/api/auth',
      method: 'post',
      params: {
        token: token, //这是请求头
      }
      // data: {'token': token}  //这是请求体
    }).then(res => {
      console.log(res);
      var flag = res.data.flag;
      if (flag) {
        axios({
          url: '/api/getinfo',
          method: 'post',
          params: {
            token: token, //这是请求头
          }
          // data: {'token': token}  //这是请求体
        }).then(res => {
          var flag = res.data.flag;
          if (flag) {
            console.log(res.data);
            this.formlist[0].data[0].value = res.data.Stuinfo.schoolid;
            this.formlist[0].data[1].value = res.data.Stuinfo.name;
            this.formlist[0].data[2].value = res.data.Stuinfo.phonenumber;
            this.formlist[0].data[3].value = res.data.Stuinfo.professorname;
          }
        })

      } else {
        window.location.href = '/#/login';
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
