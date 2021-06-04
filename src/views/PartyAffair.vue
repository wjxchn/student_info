<template>
  <div id="partyAffair">
    <div class="party_affair_background">
      <img :src="partyAffairBackgroundSrc" width="100%" height="100%" alt="" />
    </div>
    <HeadBar class="party_affair_head_bar"></HeadBar>
    <div class="party_affair_title">
      <div class="party_affair_title_icon">
        <!-- 公文包 (形状) -->
        <div id="u21" class="ax_default _形状2" data-label="公文包">
          <img id="u21_img" class="img " :src="packagePicSrc1"/>
          <div id="u21_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>
      </div>
      <div class="party_affair_title_text">
        党务管理
      </div>
    </div>
    <div class="party_affair_table">
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
              <v-container class="grey lighten-5">
                <v-row no-gutters>
                  <v-col
                    v-for="n in formlist"
                    :key="n.name"
                    cols="12"
                    sm="3"
                  >
                    <v-container fluid>
                      <v-row dense>
                        <v-col cols="4">
                          <v-subheader style="font-size:10px;">{{n.chinesename}}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="n.value"
                            single-line
                            required
                            outlined
                            dense
                            style="font-size:10px;"
                            v-if="n.type=='singleline'"
                          ></v-text-field>
                          <v-radio-group v-model="n.value" v-if="n.type=='radio'" row>
                            <v-radio
                              v-for="i in n.radiochoice"
                              :key="i"
                              :label="i"
                              :value="i"
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
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="basic_info_expand_td">
            <v-container class="grey lighten-5">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="3"
                  class="basic_info_expand_td"
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
                  sm="9"
                  class="basic_info_expand_td"
                >
                  <v-card
                    class="pa-2 basic_info_expand_td"
                    tile
                    flat
                  >
                    <v-container class="grey lighten-5">
                      <v-row no-gutters>
                        <v-col
                          v-for="n in infolist"
                          :key="n[1]"
                          cols="12"
                          sm="4"
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
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar.vue'
export default {
  name: 'PartyAffair',
  components: {
    HeadBar,
  },
  data () {
    return {
      valid: true,
      formlist: [
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
      ],
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      partyAffairBackgroundSrc: require('../assets/basicinfo/u15.jpg'),
      packagePicSrc1: require('../assets/basicinfo/公文包_u21.svg'),
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      checkinfolist: [
        ['成为积极分子时间','activetime',false],
        ['党课成绩','score',false],
        ['积极分子支部名称','activebranch',false],
        ['成为预备党员时间','preparedtime',false],
        ['所在党支部名称','preparedbranch',false],
        ['转正时间','formaltime',false],
        ['党支部名称','branch',false],
        ['成立时间','buildtime',false],
        ['书记姓名','secretaryname',false],
        ['正式党员人数','formalmembernum',false],
        ['预备党员人数','preparedmembernum',false],
        ['积极分子人数','activemembernum',false],
        ['组织关系是否在院','isatcollege',false],
        ['是否转过党支部','ischangedbranch',false],
        ['转党支部信息','changeinfo',false],
      ],
      infolist: [
        ['姓名','name',true],
        ['学号','schoolid',true],
        ['成为积极分子时间','activetime',true],
        ['党课成绩','score',true],
        ['积极分子支部名称','activebranch',true],
        ['成为预备党员时间','preparedtime',true],
        ['所在党支部名称','preparedbranch',true],
        ['转正时间','formaltime',true],
        ['党支部名称','branch',true],
        ['成立时间','buildtime',true],
        ['书记姓名','secretaryname',true],
        ['正式党员人数','formalmembernum',true],
        ['预备党员人数','preparedmembernum',true],
        ['积极分子人数','activemembernum',true],
        ['组织关系是否在院','isatcollege',true],
        ['是否转过党支部','ischangedbranch',true],
        ['转党支部信息','changeinfo',true],
      ],
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: '学号', value: 'schoolid', align: 'center' },
        { text: '姓名', value: 'name', align: 'center' },
        { text: '成为积极分子时间', value: 'activetime', align: 'center' },
        { text: '党课成绩', value: 'score', align: 'center' },
        { text: '积极分子支部名称', value: 'activebranch', align: 'center' },
        { text: '成为预备党员时间', value: 'preparedtime', align: 'center' },
        { text: '党支部名称', value: 'branch', align: 'center' },
        { text: '转正时间', value: 'formaltime', align: 'center' },
        { text: '操作', value: 'operation', align: 'center', sortable:false },
      ],
      desserts: [
        {
          id: 1,
          imgsrc: require('../assets/basicinfo/u264.svg'),
          name: '张三',
          schoolid: '18737465',
          activetime: '2020.05.06',
          score: '通过',
          activebranch: 'xx支部',
          preparedtime: '2021.05.06',
          preparedbranch: 'yy支部',
          formaltime: '2021.05.06',
          branch: 'yy支部',
          buildtime: '2009.01.01',
          secretaryname: '李四',
          formalmembernum: '30人',
          preparedmembernum: '20人',
          activemembernum: '10人',
          isatcollege: '是',
          ischangedbranch: '是',
          changeinfo: '1.xxxx',
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
          obj.splice(obj.length-1,0,{ text: k[0], value: k[1], align: 'center'});
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
.party_affair_background{
  opacity: 0.7;
  width: 100%;
  height: 350px;
  min-width: 1200px;
}
.party_affair_head_bar{
  position: absolute;
  top:0px;
}
.party_affair_title{
  position: absolute;
  top:130px;
  left: 50%;
  transform: translate(-40px);
}
.party_affair_title_icon{
  display: inline-block;
}
.party_affair_title_text{
  display: inline-block;
  font-size: 32px;
  color: #E1E4E9;
  font-weight: 700;
}
.party_affair_table{
  position: absolute;
  top:230px;
  width:80%;
  margin-left: 50%;
  transform: translate(-50%);
}
.basic_info_expand_td{
  background-color: #FAFAFA;
}
#u21_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:43px;
  height:40px;
}
#u21 {
  border-width:0px;
  position:absolute;
  left:-60px;
  top:2px;
  width:43px;
  height:40px;
  display:flex;
}
#u21 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u21_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
</style>