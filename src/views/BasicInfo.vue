<template>
  <div id="basicInfo">
    <div class="basic_info_background">
      <img :src="basicInfoBackgroundSrc" width="100%" height="100%" alt="" />
    </div>
    <HeadBar class="basic_info_head_bar"></HeadBar>
    <div class="basic_info_title">
      <div class="basic_info_title_icon">
        <!-- 学校 (组合) -->
        <div id="u25" class="ax_default" data-label="学校" data-left="1511" data-top="20" data-width="48" data-height="40">

          <!-- Unnamed (形状) -->
          <div id="u26" class="ax_default _形状2">
            <img id="u26_img" class="img " :src="schoolPicSrc1"/>
            <div id="u26_text" class="text " style="display:none; visibility: hidden">
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u27" class="ax_default _形状2">
            <img id="u27_img" class="img " :src="schoolPicSrc2"/>
            <div id="u27_text" class="text " style="display:none; visibility: hidden">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div class="basic_info_title_text">
        基本信息管理
      </div>
    </div>
    <div class="basic_info_table">
      <v-dialog v-model="selectdialog" width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            depressed
            small
            style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; color:rgba(71, 112, 166, 0.996); font-size:13px;"
            v-bind="attrs"
            v-on="on"
          >
            选择字段
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">选择字段</span>
          </v-card-title>
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="12"
            >
              <v-card
                class="pa-2"
                tile
                flat
              >
                <v-checkbox
                  v-model="checkbox"
                  :label="`全选: ${checkbox.toString()}`"
                ></v-checkbox>
              </v-card>
            </v-col>
            <v-col
              v-for="n in checkinfolist"
              :key="n[0]"
              cols="12"
              sm="3"
            >
              <v-card
                class="pa-2"
                tile
                flat
              >
                <v-checkbox
                  v-model="n[2]"
                  :label="n[0]"
                  style="margin:0px;padding:0px;"
                ></v-checkbox>
              </v-card>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="selectdialog = false">取消</v-btn>
            <v-btn color="green darken-1" text @click="confirmselect()">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="adddialog" width="1200px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            small
            style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71, 112, 166, 0.996); font-size:13px;"
            v-bind="attrs"
            v-on="on"
          >
            添加学生信息
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">添加学生信息</span>
          </v-card-title>
          <div class="basic_info_form">
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-container>
                <v-row dense no-gutters>
                  <v-col
                    v-for="w in formlist"
                    :key="w.name"
                    class="ma-0 pb-12"
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
                        <v-col cols="8" style="height:15px;" class="ma-0 pa-0">
                          <img :src="n.src" width="100%" height="100%" alt="" v-if="n.type=='picture'"/>
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="n.value"
                            single-line
                            required
                            outlined
                            dense
                            style="font-size:20px;width:100%;transform:scale(0.75,0.75);"
                            v-if="n.type=='singleline'"
                          ></v-text-field>
                          <v-radio-group v-model="n.value" v-if="n.type=='radio'" row style="width=:100%;height:20px;transform:scale(0.75,0.75);">
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
                                label="Picker in menu"
                                prepend-icon="event"
                                readonly
                                single-line
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
          <v-card-actions>
            <div style="margin:0 auto;">
            <v-btn color="#EBECF1" @click="adddialog = false" dark depressed style="color:rgba(71, 112, 166, 0.996078431372549);margin-top:10px;margin-right:10px;margin-bottom:10px;">取消</v-btn>
            <v-btn color="rgba(71, 112, 166, 0.996078431372549)" @click="adddialog = false" dark depressed style="margin-top:10px;margin-left:10px;margin-bottom:10px;">添加</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div style="height:15px;"></div>
      <div style="min-width:960px;">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
        show-select
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        mobile-breakpoint=0   
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="basic_info_expand_td">
            <v-container class="grey lighten-5">
              <v-row no-gutters dense>
                <v-col
                  cols="12"
                  xs="3"
                  sm="3"
                  md="3"
                  lg="3"
                  xl="3"
                  class="basic_info_expand_td"
                  align-self="center"
                >
                  <v-card
                    class="pa-2 basic_info_expand_td"
                    tile
                    flat
                  >
                    <img :src="item.imgsrc" width="70%" height="70%" alt="" />
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  xs="9"
                  sm="9"
                  md="9"
                  lg="9"
                  xl="9"
                  class="basic_info_expand_td"
                  align-self="center"
                >
                  <v-card
                    class="pa-2 basic_info_expand_td"
                    tile
                    flat
                  >
                    <v-container class="grey lighten-5">
                      <v-row no-gutters dense>
                        <v-col
                          v-for="n in infolist"
                          :key="n[1]"
                          cols="12"
                          xs="4"
                          sm="4"
                          md="4"
                          lg="4"
                          xl="4"
                          class="basic_info_expand_td"
                        >
                          <v-card
                            class="pa-2 basic_info_expand_td"
                            tile
                            flat
                          >
                            {{n[0]}}：{{getstr(item,n)}}
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </td>
        </template>
        <template v-slot:item.operation>
          <v-btn depressed small style="background-color:white;border:1px solid grey;">编辑</v-btn>
          <v-btn depressed small style="margin-left:30px;background-color:rgba(71, 112, 166, 0.996078431372549);color:white;">删除</v-btn>
        </template>
      </v-data-table>
      </div>
      <v-card style="overflow:hidden;" mobile-breakpoint=0>
          <div style="display: inline-block;float:left;padding-left:20px;width:80%;">
            <div style="position: absolute; top:50%;transform: translateY(-50%);font-size:10px;">
              合计：男10人，女10人；贫困生5人，非贫困生15人；关心关爱8人，非关心关爱12人；已毕业2人，未毕业18人
            </div>
          </div>
          <div style="display: inline-block;float:right;padding-right:20px;width:20%;">
            <v-btn
              :loading="loading3"
              :disabled="loading3"
              color="rgba(128, 152, 192, 0.8)"
              class="ma-2 white--text"
              @click="loader = 'loading3'"
              small
            >
              导出
            </v-btn>
            <v-btn
              :loading="loading3"
              :disabled="loading3"
              color="rgba(128, 152, 192, 0.8)"
              class="ma-2 white--text"
              @click="loader = 'loading3'"
              small
            >
              生成简历
            </v-btn>
          </div>
      </v-card>
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
import HeadBar from '@/components/HeadBar.vue'
export default {
  name: 'BasicInfo',
  components: {
    HeadBar,
  },
  data () {
    return {
      valid: true,
      formlist: [
        {
          name: 'item0',
          data: [
            {
              name: 'imgsrc',
              
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
            {
              name: 'nativeplace',
              chinesename: '籍贯',
              value: '',
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item2',
          data: [
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
            {
              name: 'urgentcontactphone',
              chinesename: '紧急联系人电话',
              value: '',
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item3',
          data: [
            {
              name: 'iscared',
              chinesename: '关心关爱',
              value: '',
              type: 'radio',
              radiochoice: ['是','否'],
            },
            {
              name: 'caredlevel',
              chinesename: '关心等级',
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
              type: 'singleline',
            },
          ]
        },
        {
          name: 'item4',
          data: [
            {
              name: 'ispoverty',
              chinesename: '贫困生',
              value: '',
              type: 'radio',
              radiochoice: ['是','否'],
            },
            {
              name: 'povertylevel',
              chinesename: '困难等级',
              value: '',
              type: 'singleline',
            },
            {
              name: 'istemperaryhelpapplied',
              chinesename: '是否申请临时困难补助',
              value: '',
              type: 'radio',
              radiochoice: ['是','否'],
            },
            {
              name: 'appliedtime',
              chinesename: '申请时间',
              value: '',
              type: 'timeselect',
              menu: false,
            },
            {
              name: 'appliedaccount',
              chinesename: '申请金额',
              value: '',
              type: 'singleline',
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
      ],
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      basicInfoBackgroundSrc: require('../assets/basicinfo/u15.jpg'),
      schoolPicSrc1: require('../assets/basicinfo/u26.svg'),
      schoolPicSrc2: require('../assets/basicinfo/u27.svg'),
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      checkinfolist: [
        ['性别','sex',false],
        ['民族','race',false],
        ['年龄','age',false],
        ['籍贯','nativeplace',false],
        ['现家庭住址','nowplace',false],
        ['户口所在地','householdplace',false],
        ['紧急联系人姓名','urgentcontactname',false],
        ['紧急联系人关系','urgentcontactrelation',false],
        ['紧急联系人电话','urgentcontactphone',false],
        ['关心关爱','iscared',false],
        ['关心等级','caredlevel',false],
        ['登记时间','registerdtime',false],
        ['主要原因','mainreason',false],
        ['贫困生','ispoverty',false],
        ['困难等级','povertylevel',false],
        ['是否申请临时困难补助','istemporaryhelpapplied',false],
        ['申请时间','appliedtime',false],
        ['申请金额','appliedaccount',false],
        ['出生年月','birthdate',false],
        ['身份证号','idnum',false],
        ['入学年份','schoolstartyear',false],
        ['政治面貌','politics',false],
        ['手机号','phonenumber',false],
        ['所属校区','schoolzone',false],
        ['学生类型','studenttype',false],
        ['班号','classnum',false],
        ['辅导员','guider',false],
        ['是否毕业','isschoolended',false],
        ['培养方式','fosterway',false],
        ['近期所在地','recentplace',false],
        ['实验室门牌号','labdoornum',false],
        ['校外住址','outsideschoolplace',false],
        ['特殊问题','specialproblem',false],
        ['主导师姓名','professorname',false],
        ['主导师手机号','professorphonenumber',false],
        ['直带导师姓名','directprofessorname',false],
        ['直带导师手机号','directprofessorphonenumber',false],
        ['本科学校','undergraduateschool',false],
        ['本科专业','undergraduatemajor',false],
        ['硕士学校','masterschool',false],
        ['硕士专业','mastermajor',false],
        ['宿舍区域','dormitoryarea',false],
        ['宿舍楼号','dormitorybuilding',false],
        ['房间号','dormitoryroom',false],
        ['床号','dormitorybed',false],
      ],
      infolist: [
        ['姓名','name',true],
        ['学号','schoolid',true],
        ['性别','sex',true],
        ['民族','race',true],
        ['年龄','age',true],
        ['籍贯','nativeplace',true],
        ['现家庭住址','nowplace',true],
        ['户口所在地','householdplace',true],
        ['紧急联系人姓名','urgentcontactname',true],
        ['紧急联系人关系','urgentcontactrelation',true],
        ['紧急联系人电话','urgentcontactphone',true],
        ['关心关爱','iscared',true],
        ['关心等级','caredlevel',true],
        ['登记时间','registerdtime',true],
        ['主要原因','mainreason',true],
        ['贫困生','ispoverty',true],
        ['困难等级','povertylevel',true],
        ['是否申请临时困难补助','istemporaryhelpapplied',true],
        ['申请时间','appliedtime',true],
        ['申请金额','appliedaccount',true],
        ['出生年月','birthdate',true],
        ['身份证号','idnum',true],
        ['入学年份','schoolstartyear',true],
        ['政治面貌','politics',true],
        ['手机号','phonenumber',true],
        ['所属校区','schoolzone',true],
        ['学生类型','studenttype',true],
        ['班号','classnum',true],
        ['辅导员','guider',true],
        ['是否毕业','isschoolended',true],
        ['培养方式','fosterway',true],
        ['近期所在地','recentplace',true],
        ['实验室门牌号','labdoornum',true],
        ['校外住址','outsideschoolplace',true],
        ['特殊问题','specialproblem',true],
        ['主导师姓名','professorname',true],
        ['主导师手机号','professorphonenumber',true],
        ['直带导师姓名','directprofessorname',true],
        ['直带导师手机号','directprofessorphonenumber',true],
        ['本科学校','undergraduateschool',true],
        ['本科专业','undergraduatemajor',true],
        ['硕士学校','masterschool',true],
        ['硕士专业','mastermajor',true],
        ['宿舍区域','dormitoryarea',true],
        ['宿舍楼号','dormitorybuilding',true],
        ['房间号','dormitoryroom',true],
        ['床号','dormitorybed',true],
      ],
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: '学号', value: 'schoolid', align: 'center',width: '100px' },
        { text: '姓名', value: 'name', align: 'center',width: '100px' },
        { text: '性别', value: 'sex', align: 'center',width: '100px' },
        { text: '年龄', value: 'age', align: 'center',width: '100px' },
        { text: '手机号', value: 'phonenumber', align: 'center',width: '100px' },
        { text: '校区', value: 'schoolzone', align: 'center',width: '100px' },
        { text: '学生类型', value: 'studenttype', align: 'center',width: '100px' },
        { text: '特殊问题', value: 'specialproblem', align: 'center',width: '100px' },
        { text: '操作', value: 'operation', align: 'center', sortable:false, width: '200px' },
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
          id: 1,
          imgsrc: require('../assets/basicinfo/u264.svg'),
          name: '张三',
          schoolid: '18737465',
          sex: '女',
          race: '汉族',
          age: '18',
          nativeplace: '湖南省长沙市',
          nowplace: '北京市密云县xx路xx号xx门',
          householdplace: '河南省洛阳市xx县xx镇xx村',
          urgentcontactname: '张三丰',
          urgentcontactrelation: '父女',
          urgentcontactphone: '11122223333',
          iscared: '是',
          caredlevel: 1,
          registeredtime: '2020.01.12',
          mainreason: 'xxxxx',
          ispoverty: '是',
          povertylevel: 1,
          istemporaryhelpapplied: '是',
          appliedtime: '2020.05.06',
          appliedaccount: '500.00',
          birthdate: '2002-01',
          idnum: 'xxxxx',
          schoolstartyear: '2020',
          politics: '共青团员',
          phonenumber: '19918917382',
          schoolzone: '学院路校区',
          studenttype: '全日制硕士',
          classnum: '200601',
          guider: '李四',
          isschoolended: '否',
          fosterway: '非定向',
          recentplace: '上海',
          labdoornum: 'S601',
          outsideschoolplace: '上海黄浦区',
          specialproblem: '无',
          professorname: '王五',
          professorphonenumber: '18819819273',
          directprofessorname: '赵六',
          directprofessorphonenumber: '18364927495',
          undergraduateschool: '北京大学',
          undergraduatemajor: '有机化学',
          masterschool: '清华大学',
          mastermajor: '无机化学',
          dormitoryarea: '大运村',
          dormitorybuilding: '2',
          dormitoryroom: '205',
          dormitorybed: '2',
        }
      ],
    }
  },
  methods: {
    getstr(item,name){
      return item[name[1]];
    },
    confirmselect(){
      this.selectdialog = false;
      for(let i of this.checkinfolist){
        for(let j of this.infolist){
          if(i[0]==j[0]){
            j[2] = i[2];
          }
        }
      }
      let obj = [
        { text: '', value: 'data-table-expand' },
        { text: '操作', value: 'operation', align: 'center', sortable:false },        
      ];
      for(let k of this.infolist){
        if(k[2]){
          obj.splice(obj.length-1,0,{ text: k[0], value: k[1], align: 'center', width:'100px'});
        }
      }
      this.headers = obj;
    }
  },
  watch:{
    checkbox(val){
      if(val){
        for(let i of this.checkinfolist){
          i[2] = true;
        }
      }
      else{
        for(let i of this.checkinfolist){
          i[2] = false;
        }  
      }
    },
    checkinfolist:{
      handler(val){
        let alltrueflag = true;
        let allfalseflag = true;
        for(let i of val){
          if(i[2] == true){
            allfalseflag = false;
            break;
          }
        }
        for(let i of val){
          if(i[2] == false){
            alltrueflag = false;
            break;
          }
        }
        if(alltrueflag){
          this.checkbox = true;
        }
        else if(allfalseflag){
          this.checkbox = false;
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.basic_info_background{
  opacity: 0.7;
  width: 100%;
  height: 350px;
  min-width: 1200px;
}
.basic_info_head_bar{
  position: absolute;
  top:0px;
}
.basic_info_title{
  position: absolute;
  top:130px;
  left: 50%;
  transform: translate(-60px);
}
.basic_info_title_icon{
  display: inline-block;
}
.basic_info_title_text{
  display: inline-block;
  font-size: 32px;
  color: #E1E4E9;
  font-weight: 700;
}
.basic_info_table{
  position: absolute;
  top:230px;
  width:80%;
  min-width:960px;
  margin-left: 50%;
  transform: translate(-50%);
}
.basic_info_expand_td{
  background-color: #FAFAFA;
}
#u25 {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  height:0px;
}
#u26_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:34px;
  height:19px;
}
#u26 {
  border-width:0px;
  position:absolute;
  left:-55px;
  top:23px;
  width:34px;
  height:19px;
  display:flex;
}
#u26 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u26_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
#u27_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:48px;
  height:34px;
}
#u27 {
  border-width:0px;
  position:absolute;
  left:-61px;
  top:2px;
  width:48px;
  height:34px;
  display:flex;
}
#u27 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u27_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
</style>