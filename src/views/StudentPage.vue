<template>
  <div id="studentPage">
    <background :titlevalue="chinesename"></background>
    <div style="position:absolute;top:230px;left:50%;transform:translate(-50%);width:90%;">
      <v-card>
        <div class="basic_info_form">
          <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
          >
            <v-container class="ma-0 pa-0 pt-4 pl-2 pr-2" fluid>
              <v-row dense class="ma-0 pa-0">
                <v-col
                    v-for="w in formlist"
                    :key="w.name"
                    class="ma-0 pa-4"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                >
                  <v-container fluid v-for="n in w.data" :key="n.name" class="ma-0 pa-0">
                    <v-row dense no-gutters class="ma-0 pa-0">
                      <v-col cols="4" class="ma-0 pa-0">
                        <v-subheader class="ma-0 pa-0" style="font-size:14px;"><b>{{ n.chinesename }}</b></v-subheader>
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
                        <div v-if="n.type=='el-cascader'">
                          <el-cascader
                              v-model="n.value"
                              :options="n.options"
                              @change="n.handleChange"
                              style="font-size:15px;width:100%;transform:scale(0.75,0.75);"></el-cascader>
                        </div>
                        <div v-if="n.type=='select'">
                          <v-select
                              :items="n.items"
                              v-model="n.value"
                              :rules="n.rules"
                              label="请选择"
                              solo
                              flat
                              dense
                              outlined
                              style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </div>
                        <v-textarea
                            v-model="n.value"
                            required
                            outlined
                            flat
                            dense
                            background-color="white"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
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
                            :rules="n.rules"
                            :disabled="n.disabled"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                            v-if="n.type=='singleline'"
                        ></v-text-field>
                        <v-radio-group :rules="n.rules" v-model="n.value" v-if="n.type=='radio'" row
                                       style="width:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0"
                                       :disabled="n.disabled">
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
                                style="font-size:20px;width:100%;transform:scale(0.75,0.75);"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="n.value" no-title scrollable :max="n.maxdate">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="n.menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="n.menu = false">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </v-card>
      <div style="margin-left:50%;transform: translateX(-50px)">
        <v-btn color="success" width="100px" style="margin-top:20px;margin-bottom:40px;" @click="submit"
               :disabled="!valid">确定
        </v-btn>
        <v-btn color="success" width="100px" style="margin-top:20px;margin-bottom:40px;" @click="submit">确定（测试用）</v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import Background from '@/components/Background.vue'

const axios = require('axios');
// axios.defaults.withCredentials=true;//让ajax携带cookie
export default {
  name: 'StudentPage',
  components: {
    Background
  },
  data() {
    return {
      chinesename: '学生个人信息',
      valid: true,
      lazy: false,
      formlist: [
        {
          name: 'item0',
          data: [
            {
              name: 'imgsrc',
              chinesename: '非证件照片',
              files: [],
              type: 'pictureupload'
            },
            {
              name: 'imgshow',
              chinesename: '上传图片预览',
              src: require('../assets/basicinfo/u264.svg'),
              type: 'picture'
            }
          ]
        },
        {
          name: 'item1',
          data: [
            {
              name: 'name',
              chinesename: '姓名',
              value: '',
              type: 'singleline',
              disabled: true
            },
            {
              name: 'schoolid',
              chinesename: '学号',
              value: '',
              type: 'singleline',
              disabled: true
            },
            {
              name: 'sex',
              chinesename: '性别',
              value: '',
              type: 'radio',
              radiochoice: ['男', '女'],
              // disabled: true
            },
            {
              name: 'race',
              chinesename: '民族',
              value: '',
              items: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族',
                '苗族', '彝族', '壮族', '布依族', '朝鲜族',
                '满族', '侗族', '瑶族', '白族', '土家族',
                '哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族',
                '佤族', '畲族', '高山族', '拉祜族', '水族',
                '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族',
                '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族',
                '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族',
                '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族',
                '德昂族', '保安族', '裕固族', '京族', '塔塔尔族',
                '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族',
                '基诺族'],
              rules: [
                v => !!v || '请输入民族',
              ],
              type: 'select',
            },
            {
              name: 'age',
              chinesename: '年龄',
              value: '',
              rules: [
                v => !!v || '需要填写年龄',
                v => (v && parseInt(v) >= 15 && parseInt(v) <= 40) || '请填写15-40之间的数字',
              ],
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item2',
          data: [
            {
              name: 'nativeplace',
              chinesename: '籍贯（精确到县）',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入籍贯',
              ]
            },
            {
              name: 'nowplace',
              chinesename: '现家庭住址(精确到门牌号)',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入家庭住址',
              ]
            },
            {
              name: 'householdplace',
              chinesename: '户口所在地',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入户口所在地',
              ]
            },
            {
              name: 'urgentcontactname',
              chinesename: '紧急联系人姓名',
              value: '',
              rules: [
                v => !!v || '请输入紧急联系人姓名',
                v => (v && v.length >= 2 && v.length <= 8) || '请输入2-8个字符'
              ],
              type: 'singleline',
            },
            {
              name: 'urgentcontactrelation',
              chinesename: '紧急联系人关系',
              value: '',
              items: ['父子', '母子', '父女', '母女', '其他'],
              type: 'select',
              rules: [
                v => !!v || '请输入紧急联系人关系',
              ]
            },
          ]
        },
        {
          name: 'item3',
          data: [
            {
              name: 'urgentcontactphone',
              chinesename: '紧急联系人电话',
              value: '',
              rules: [
                v => !!v || '请输入紧急联系人电话',
                v => (v && /^1[345789]\d{9}$/.test(v)) || '请输入正确的电话'
              ],
              type: 'singleline',
            },
            {
              name: 'registerdtime',
              chinesename: '登记时间',
              value: '',
              // maxdate: (function () {
              //   var date = new Date();
              //   var monthstr = '';
              //   var daystr = '';
              //   if (date.getMonth() >= 0 && date.getMonth() <= 8) {
              //     monthstr = monthstr + '0' + (date.getMonth() + 1);
              //   } else {
              //     monthstr = monthstr + (date.getMonth() + 1);
              //   }
              //   if (date.getDate() >= 1 && date.getDate() <= 9) {
              //     daystr = daystr + '0' + date.getDate();
              //   } else {
              //     daystr = daystr + date.getDate();
              //   }
              //   return '' + date.getFullYear() + '-' + monthstr + '-' + daystr;
              // })(),
              // type: 'timeselect',
              type: 'singleline',
              menu: false,
              disabled: true
            },
            {
              name: 'idnum',
              chinesename: '身份证号',
              value: '',
              rules: [
                v => !!v || '请输入身份证号',
                v => (v && v.length == 18) || '请输入正确的身份证号'
              ],
              type: 'singleline',
            },
            {
              name: 'birthdate',
              chinesename: '出生年月日',
              value: '',
              type: 'singleline',
              menu: false,
              disabled: true
            },
            {
              name: 'schoolstartyear',
              chinesename: '入学年份',
              value: '',
              items: ['201309', '201409', '201509', '201609', '201709', '201809', '201909', '202009', '202109', '202209', '202309', '202409', '202509', '202609', '202709', '202809', '202909', '203009'],
              type: 'select',
              rules: [
                v => !!v || '请输入入学年份',
              ]
            },
          ]
        },
        {
          name: 'item5',
          data: [
            {
              name: 'politics',
              chinesename: '政治面貌',
              value: '',
              items: ['正式党员', '预备党员', '共青团员', '群众', '其它'],
              type: 'select',
              rules: [
                v => !!v || '请输入政治面貌',
              ]
            },
            {
              name: 'phonenumber',
              chinesename: '手机号',
              value: '',
              rules: [
                v => !!v || '请输入电话',
                v => (v && /^1[345789]\d{9}$/.test(v)) || '请输入正确的电话'
              ],
              type: 'singleline',
            },
            {
              name: 'schoolzone',
              chinesename: '所属校区',
              value: '',
              items: ['学院路校区', '沙河校区', '杭州研究院', '青岛研究院', '苏州研究院', '深圳研究院', '云南研究院', '其它'],
              type: 'select',
              rules: [
                v => !!v || '请输入所属校区',
              ]
            },
            {
              name: 'studenttype',
              chinesename: '学生类型',
              value: '',
              items: ['本科', '硕士', '博士'],
              type: 'select',
              rules: [
                v => !!v || '请输入学生类型',
              ]
            },
            {
              name: 'classnum',
              chinesename: '班号(如:硕19061)',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入班号',
              ]
            },
          ]
        },
        {
          name: 'item6',
          data: [
            {
              name: 'guiderSp',
              chinesename: '所属专职辅导员',
              value: '',
              items: ['王婧仪', '何巍', '于秋漫', '毛吾吉达'],
              type: 'select',
              rules: [
                v => !!v || '请选择专职辅导员姓名',
              ]
            },
            {
              name: 'guider',
              chinesename: '兼职辅导员',
              value: '',
              items: ['王楠','他旭翔','张保宇','王康明','张重庆','李婧怡','张华梁','李小冉','王嘉凯','张艺璇','赵世纪','李何贝子','张凯宁','廖天禧'],
              type: 'select',
              rules: [
                v => !!v || '请选择兼职辅导员姓名',
              ]

            },
            {
              name: 'fosterway',
              chinesename: '培养方式',
              value: '',
              items: ['全日制定向', '全日制非定向', '非全日制'],
              type: 'select',
              rules: [
                v => !!v || '请输入培养方式',
              ]
            },
            {
              name: 'recentplace',
              chinesename: '近期所在地',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入近期所在地',
              ]
            },
            {
              name: 'labdoornum',
              chinesename: '实验室门牌号',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入实验室门牌号',
              ]
            },
            {
              name: 'outsideschoolplace',
              chinesename: '校外住址(精确到门牌号)',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入校外住址',
              ]
            },
          ]
        },
        {
          name: 'item7',
          data: [
            // {
            //   name: 'specialproblem',
            //   chinesename: '特殊问题',
            //   value: '',
            //   type: 'singleline',
            // },
            {
              name: 'professorname',
              chinesename: '主导师姓名',
              value: '',
              rules: [
                v => !!v || '请输入主导师姓名',
                v => (v && v.length >= 2 && v.length <= 8) || '请输入2-8个字符'
              ],
              type: 'singleline',
            },
            {
              name: 'professorphonenumber',
              chinesename: '主导师手机号',
              value: '',
              rules: [
                v => !!v || '请输入主导师电话',
                v => (v && /^1[345789]\d{9}$/.test(v)) || '请输入正确的电话'
              ],
              type: 'singleline',
            },
            {
              name: 'directprofessorname',
              chinesename: '直带导师姓名',
              value: '',
              rules: [
                v => (!v) || (v && v.length >= 2 && v.length <= 8) || '请输入2-8个字符'
              ],
              type: 'singleline',
            },
            {
              name: 'directprofessorphonenumber',
              chinesename: '直带导师手机号',
              value: '',
              rules: [
                v => (!v) || (v && /^1[345789]\d{9}$/.test(v)) || '请输入正确的电话'
              ],
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item8',
          data: [
            {
              name: 'undergraduateschool',
              chinesename: '本科学校',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入本科学校',
              ]
            },
            {
              name: 'undergraduatemajor',
              chinesename: '本科专业',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入本科专业',
              ]
            },
            {
              name: 'masterschool',
              chinesename: '硕士学校',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入硕士学校',
              ]
            },
            {
              name: 'mastermajor',
              chinesename: '硕士专业',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入硕士专业',
              ]
            },
            {
              name: 'phdmajor',
              chinesename: '博士专业',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入博士专业',
              ]
            },
          ]
        },
        {
          name: 'item9',
          data: [
            {
              name: 'dormitoryarea',
              chinesename: '宿舍区域',
              value: '',
              type: 'select',
              rules: [
                v => !!v || '请输入宿舍区域',
              ],
              items: ['沙河', '学院路校内', '学院路大运存']
            },
            {
              name: 'dormitorybuilding',
              chinesename: '宿舍楼号',
              value: '',
              items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
              type: 'select',
              rules: [
                v => !!v || '请输入宿舍楼号',
              ]
            },
            {
              name: 'dormitoryroom',
              chinesename: '房间号',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入房间号',
              ]
            },
            {
              name: 'dormitorybed',
              chinesename: '床号',
              value: '',
              type: 'singleline',
              rules: [
                v => !!v || '请输入床号',
              ]
            },
          ]
        },
        {
          name: 'item10',
          data: [
            {
              name: 'isactive',
              chinesename: '是否为积极分子',
              value: '',
              type: 'radio',
              radiochoice: ['是', '否']
            },
            {
              name: 'activetime',
              chinesename: '成为积极分子时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'score',
              chinesename: '党课成绩',
              value: '',
              type: 'radio',
              radiochoice: ['通过', '未通过'],
            },
            {
              name: 'activebranch',
              chinesename: '积极分子支部名称',
              value: '',
              items: ['1706-1党支部', '1706-2党支部', '1806党支部', '1906党支部', '硕18061党支部', '硕18062党支部',
                '硕18063党支部', '硕19061党支部', '硕19062党支部', '硕19063党支部', '硕19064党支部', '硕19065党支部',
                '硕19066党支部', '硕19067党支部', '硕20061党支部', '硕20062党支部', '硕20063党支部', '硕20064党支部',
                '硕20065党支部', '硕20066党支部', 'BYACT1党支部', 'BYACT2党支部', 'BY软国重党支部', 'BY软件所党支部',
                'BY系统结构党支部', 'BY虚拟现实党支部', 'BY应用1党支部', 'BY应用2党支部', 'BY应用3党支部'
              ],
              type: 'select',
              rules: [
                v => !!v || '请选择积极分子支部',
              ]
            }
            ,
            {
              name: 'preparedtime',
              chinesename: '成为预备党员时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
          ]
        },
        {
          name: 'item11',
          data: [
            // {
            //   name: 'preparedbranch',
            //   chinesename: '所在党支部名称',
            //   value: '',
            //   type: 'singleline',
            // },
            {
              name: 'formaltime',
              chinesename: '转正时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'branch',
              chinesename: '党支部名称',
              value: '',
              items: ['1706-1党支部', '1706-2党支部', '1806党支部', '1906党支部', '硕18061党支部', '硕18062党支部',
                '硕18063党支部', '硕19061党支部', '硕19062党支部', '硕19063党支部', '硕19064党支部', '硕19065党支部',
                '硕19066党支部', '硕19067党支部', '硕20061党支部', '硕20062党支部', '硕20063党支部', '硕20064党支部',
                '硕20065党支部', '硕20066党支部', 'BYACT1党支部', 'BYACT2党支部', 'BY软国重党支部', 'BY软件所党支部',
                'BY系统结构党支部', 'BY虚拟现实党支部', 'BY应用1党支部', 'BY应用2党支部', 'BY应用3党支部'
              ],
              type: 'select',
              rules: [
                v => !!v || '请选择党支部名称',
              ]
            },
            {
              name: 'secretaryname',
              chinesename: '党支部书记',
              value: '',
              items: ['程添红', '罗钧宇', '李何贝子', '张凯宁', '王欣',
                '张松', '张瑞', '汪凌风', '孙培林', '张梦泽', '张一帆', '王亚', '王雅卉'
                , '王柳迪', '郑健', '魏淑越', '刘晟', '吕澳辉', '郭桐', '高小博', '乔同',
                '马广辉', '刘琳', '冯惠妍', '张琪', '牛钰浩', '王思哲', '侯璞玥', '牛广林'
              ],
              type: 'select',
              rules: [
                v => !!v || '请选择党支部名称',
              ]

            },
            {
              name: 'secretarynameall',
              chinesename: '书记姓名',
              value: '冯维成',
              type: 'singleline',
              disabled: true,
            },
          ]
        },
        {
          name: 'item12',
          data: [
            {
              name: 'isatcollege',
              chinesename: '组织关系是否在院',
              value: '',
              type: 'radio',
              radiochoice: ['是', '否'],
            },
            {
              name: 'ischangedbranch',
              chinesename: '是否转过党支部',
              value: '',
              type: 'radio',
              radiochoice: ['是', '否'],
            },
            {
              name: 'changeinfo',
              chinesename: '转党支部日期',
              maxval: 1,
              valuelist: [
                {
                  index: 1,
                  value: '',
                  buttontext: '添加',
                  func: function (obj, index) {
                    console.log(index);
                    obj.maxval += 1;
                    obj.valuelist.push({
                      index: obj.maxval,
                      value: '',
                      buttontext: '删除',
                      func: function (newobj, newindex) {
                        console.log(newobj);
                        for (let i in obj.valuelist) {
                          if (obj.valuelist[i].index == newindex) {
                            obj.valuelist.splice(i, 1);
                          }
                        }
                        // console.log(obj.valuelist);
                      }
                    });
                  }
                }
              ],
              type: 'timeselect',
            },
          ]
        },
      ],
    }
  },
  methods: {
    changeimg(item) {
      this.formlist[0].data[0].files = item.target.files;
      this.formlist[0].data[1].src = window.webkitURL.createObjectURL(this.formlist[0].data[0].files[0]);
    },
    submit() {
      let JsonObj = new Object();
      // var x = 1;
      for (let formlistElement of this.formlist) {
        var data = formlistElement.data;
        for (var i = 0; i < data.length; i++) {
          // x ++;
          if (data[i].name == 'changeinfo') {
            var valuelist = data[i].valuelist;
            var value = "";
            for (var index = 0; index < valuelist.length; index++) {
              value = value + valuelist[index].value + "-";
            }
            JsonObj['changeinfo'] = value;
            // console.log(data[i].name);
            // console.log(value);
          } else {
            JsonObj[data[i].name] = data[i].value;
          }
        }
      }
      // console.log(x); //52个参数

      axios({
        url: '/api/submit',
        method: 'post',
        // params: {
        //   stuNum: this.name,
        // }
        data: JsonObj
      }).then(res => {
        // console.log(res);
        if (res.data.flag) {
          alert("保存成功！");
        } else {
          alert("保存失败！");
        }
      })
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
      // console.log("校验成功？", res.data);
      if (flag) {
        // next();
        this.formlist[1].data[0].value = res.data.stuName;
        this.formlist[1].data[1].value = res.data.stuNum;
        axios({
          url: '/api/getinfo',
          method: 'post',
          params: {
            token: token, //这是请求头
          }
          // data: {'token': token}  //这是请求体
        }).then(res => {
          console.log(res);
          var flag = res.data.flag;
          // console.log("校验成功？", res.data);
          if (flag) {
            // next();
            console.log(res.data);
            this.formlist[1].data[2].value = res.data.Stuinfo.sex;
            this.formlist[1].data[3].value = res.data.Stuinfo.race;
            this.formlist[1].data[4].value = res.data.Stuinfo.age;

            this.formlist[2].data[0].value = res.data.Stuinfo.nativeplace;
            this.formlist[2].data[1].value = res.data.Stuinfo.nowplace;
            this.formlist[2].data[2].value = res.data.Stuinfo.householdplace;
            this.formlist[2].data[3].value = res.data.Stuinfo.urgentcontactname;
            this.formlist[2].data[4].value = res.data.Stuinfo.urgentcontactrelation;

            this.formlist[3].data[0].value = res.data.Stuinfo.urgentcontactphone;
            // this.formlist[3].data[1].value = res.data.Stuinfo.registerdtime;
            this.formlist[3].data[1].value = (new Date().getYear() + 1900) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
            this.formlist[3].data[2].value = res.data.Stuinfo.idnum;

            var idnum = res.data.Stuinfo.idnum;
            if (idnum != null && idnum !== "") {
              res.data.Stuinfo.birthdate = idnum.substring(6, 10) + "-" + idnum.substring(10, 12) + "-" + idnum.substring(12, 14);
            }
            this.formlist[3].data[3].value = res.data.Stuinfo.birthdate;

            this.formlist[3].data[4].value = res.data.Stuinfo.schoolstartyear;
            this.formlist[4].data[0].value = res.data.Stuinfo.politics;
            this.formlist[4].data[1].value = res.data.Stuinfo.phonenumber;
            this.formlist[4].data[2].value = res.data.Stuinfo.schoolzone;
            this.formlist[4].data[3].value = res.data.Stuinfo.studenttype;
            this.formlist[4].data[4].value = res.data.Stuinfo.classnum;

            this.formlist[5].data[0].value = res.data.Stuinfo.guider;
            this.formlist[5].data[1].value = res.data.Stuinfo.fosterway;
            this.formlist[5].data[2].value = res.data.Stuinfo.recentplace;
            this.formlist[5].data[3].value = res.data.Stuinfo.labdoornum;
            this.formlist[5].data[4].value = res.data.Stuinfo.outsideschoolplace;

            // this.formlist[6].data[0].value = res.data.Stuinfo.specialproblem;
            this.formlist[6].data[0].value = res.data.Stuinfo.professorname;
            this.formlist[6].data[1].value = res.data.Stuinfo.professorphonenumber;
            this.formlist[6].data[2].value = res.data.Stuinfo.directprofessorname;
            this.formlist[6].data[3].value = res.data.Stuinfo.directprofessorphonenumber;

            this.formlist[7].data[0].value = res.data.Stuinfo.undergraduateschool;
            this.formlist[7].data[1].value = res.data.Stuinfo.undergraduatemajor;
            this.formlist[7].data[2].value = res.data.Stuinfo.masterschool;
            this.formlist[7].data[3].value = res.data.Stuinfo.mastermajor;


            this.formlist[8].data[0].value = res.data.Stuinfo.dormitoryarea;
            this.formlist[8].data[1].value = res.data.Stuinfo.dormitorybuilding;
            this.formlist[8].data[2].value = res.data.Stuinfo.dormitoryroom;
            this.formlist[8].data[3].value = res.data.Stuinfo.dormitorybed;


            this.formlist[9].data[0].value = '是';
            this.formlist[9].data[1].value = res.data.Stuinfo.activetime;
            this.formlist[9].data[2].value = res.data.Stuinfo.score;
            this.formlist[9].data[3].value = res.data.Stuinfo.activebranch;
            this.formlist[9].data[4].value = res.data.Stuinfo.preparedtime;


            // this.formlist[10].data[0].value = res.data.Stuinfo.preparedbranch;
            this.formlist[10].data[0].value = res.data.Stuinfo.formaltime;
            this.formlist[10].data[1].value = res.data.Stuinfo.branch;
            // this.formlist[10].data[3].value = res.data.Stuinfo.secretaryname;


            this.formlist[11].data[0].value = res.data.Stuinfo.isatcollege;
            this.formlist[11].data[1].value = res.data.Stuinfo.ischangedbranch;
            // this.formlist[11].data[2].valuelist = res.data.Stuinfo.changeinfo;
            // this.formlist[11].data[2].valuelist = ["999"]
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
</style>
