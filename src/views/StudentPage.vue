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
                        <v-subheader class="ma-0 pa-0" style="font-size:10px;">{{n.chinesename}}</v-subheader>
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
                                  {{q.buttontext}}
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
                          style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          auto-grow
                          v-if="n.type=='textarea'"
                        ></v-textarea>
                        <input type="file" id="upload" ref="upload" @change="changeimg" accept=".jpg, .jpeg, .png" v-if="n.type=='pictureupload'" style="display:block;width:90%;font-size:10px;margin-top:10px;">
                        <img :src="n.src" width="70%" alt="" v-if="n.type=='picture'"/>
                        <v-text-field
                          class="ma-0 pa-0"
                          v-model="n.value"
                          required
                          outlined
                          dense
                          style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          v-if="n.type=='singleline'"
                        ></v-text-field>
                        <v-radio-group v-model="n.value" v-if="n.type=='radio'" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
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
                          <v-date-picker v-model="n.value" no-title scrollable>
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
        <v-btn color="rgba(71, 112, 166, 0.996078431372549)" dark depressed width="100px" style="margin-top:20px;margin-bottom:40px;">确定</v-btn>
      </div>
    </div>

  </div>  
</template>

<script>
import Background from '@/components/Background.vue'
export default {
  name: 'StudentPage',
  components: { 
    Background
  },
  data(){
    return{
      chinesename: '学生个人信息',
      valid: true,
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
            },
            {
              name: 'schoolid',
              chinesename: '学号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'sex',
              chinesename: '性别',
              value: '',
              type: 'radio',
              radiochoice: ['男','女'],
            },
            {
              name: 'race',
              chinesename: '民族',
              value: '',
              type: 'singleline',
            },
            {
              name: 'age',
              chinesename: '年龄',
              value: '',
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item2',
          data: [
            {
              name: 'nativeplace',
              chinesename: '籍贯',
              value: '',
              type: 'singleline',
            },
            {
              name: 'nowplace',
              chinesename: '现家庭住址',
              value: '',
              type: 'singleline',
            },
            {
              name: 'householdplace',
              chinesename: '户口所在地',
              value: '',
              type: 'singleline',
            },
            {
              name: 'urgentcontactname',
              chinesename: '紧急联系人姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'urgentcontactrelation',
              chinesename: '紧急联系人关系',
              value: '',
              type: 'singleline',
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
              type: 'singleline',
            },
            {
              name: 'registerdtime',
              chinesename: '登记时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'mainreason',
              chinesename: '主要原因',
              value: '',
              type: 'textarea',
            },
          ]
        },
        {
          name: 'item5',
          data: [
            {
              name: 'birthdate',
              chinesename: '出生年月',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'idnum',
              chinesename: '身份证号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'schoolstartyear',
              chinesename: '入学年份',
              value: '',
              type: 'singleline',
            },
            {
              name: 'politics',
              chinesename: '政治面貌',
              value: '',
              type: 'singleline',
            },
            {
              name: 'phonenumber',
              chinesename: '手机号',
              value: '',
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item6',
          data: [
            {
              name: 'schoolzone',
              chinesename: '所属校区',
              value: '',
              type: 'singleline',
            },
            {
              name: 'studenttype',
              chinesename: '学生类型',
              value: '',
              type: 'singleline',
            },
            {
              name: 'classnum',
              chinesename: '班号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'guider',
              chinesename: '辅导员',
              value: '',
              type: 'singleline',
            },
            {
              name: 'isschoolended',
              chinesename: '是否毕业',
              value: '',
              type: 'radio',
              radiochoice: ['是','否'],
            },
          ]
        },
        {
          name: 'item7',
          data: [
            {
              name: 'fosterway',
              chinesename: '培养方式',
              value: '',
              type: 'singleline',
            },
            {
              name: 'recentplace',
              chinesename: '近期所在地',
              value: '',
              type: 'singleline',
            },
            {
              name: 'labdoornum',
              chinesename: '实验室门牌号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'outsideschoolplace',
              chinesename: '校外住址',
              value: '',
              type: 'singleline',
            },
            {
              name: 'specialproblem',
              chinesename: '特殊问题',
              value: '',
              type: 'singleline',
            },            
          ]
        },
        {
          name: 'item8',
          data: [
            {
              name: 'professorname',
              chinesename: '主导师姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'professorphonenumber',
              chinesename: '主导师手机号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'directprofessorname',
              chinesename: '直带导师姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'directprofessorphonenumber',
              chinesename: '直带导师手机号',
              value: '',
              type: 'singleline',
            },            
          ]
        },
        {
          name: 'item9',
          data: [
            {
              name: 'undergraduateschool',
              chinesename: '本科学校',
              value: '',
              type: 'singleline',
            },
            {
              name: 'undergraduatemajor',
              chinesename: '本科专业',
              value: '',
              type: 'singleline',
            },
            {
              name: 'masterschool',
              chinesename: '硕士学校',
              value: '',
              type: 'singleline',
            },
            {
              name: 'mastermajor',
              chinesename: '硕士专业',
              value: '',
              type: 'singleline',
            },            
          ]
        },
        {
          name: 'item10',
          data: [
            {
              name: 'dormitoryarea',
              chinesename: '宿舍区域',
              value: '',
              type: 'singleline',
            },
            {
              name: 'dormitorybuilding',
              chinesename: '宿舍楼号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'dormitoryroom',
              chinesename: '房间号',
              value: '',
              type: 'singleline',
            },
            {
              name: 'dormitorybed',
              chinesename: '床号',
              value: '',
              type: 'singleline',
            },            
          ]
        },
        {
          name: 'item11',
          data: [
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
              radiochoice: ['通过','未通过'],
            },
            {
              name: 'activebranch',
              chinesename: '积极分子支部名称',
              value: '',
              type: 'singleline',
            },
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
          name: 'item12',
          data: [
            {
              name: 'preparedbranch',
              chinesename: '所在党支部名称',
              value: '',
              type: 'singleline',
            },
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
              type: 'singleline',
            },
            {
              name: 'buildtime',
              chinesename: '成立时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
          ]
        },
        {
          name: 'item13',
          data: [
            {
              name: 'secretaryname',
              chinesename: '书记姓名',
              value: '',
              type: 'singleline',
            },
            {
              name: 'formalmembernum',
              chinesename: '正式党员人数',
              value: '',
              type: 'singleline',
            },
            {
              name: 'preparedmembernum',
              chinesename: '预备党员人数',
              value: '',
              type: 'singleline',
            },
            {
              name: 'activemembernum',
              chinesename: '积极分子人数',
              value: '',
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item14',
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
              chinesename: '转党支部信息',
              maxval:1,
              valuelist: [
                {
                  index: 1,
                  value: '',
                  buttontext: '添加',
                  func: function(obj,index){
                    console.log(index);
                    obj.maxval += 1;
                    obj.valuelist.push({
                      index: obj.maxval,
                      value: '',
                      buttontext: '删除',
                      func: function(newobj,newindex){
                        console.log(newobj);
                        for(let i in obj.valuelist){
                          if(obj.valuelist[i].index==newindex){
                            obj.valuelist.splice(i,1);
                          }
                        }
                      }
                    });
                  }
                }
              ],
              type: 'addtextfield',
            },
          ]
        },
      ],
    }  
  },
  methods: {
    changeimg(item){
       this.formlist[0].data[0].files = item.target.files;
       this.formlist[0].data[1].src = window.webkitURL.createObjectURL(this.formlist[0].data[0].files[0]);
    },
  }
}
</script>

<style scoped>
</style>