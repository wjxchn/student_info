<template>
  <div id="partyAffair">
    <background :titlevalue="chinesename"></background>
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
              <v-container>
                <v-row dense no-gutters>
                  <v-col
                    v-for="w in formlist"
                    :key="w.name"
                    class="ma-0 pb-12"
                    cols="12"
                    xs="6"
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                  >
                    <v-container fluid v-for="n in w.data" :key="n.name" class="ma-0 pa-0">
                      <v-row dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4"  class="ma-0 pa-0">
                          <v-subheader style="font-size:10px;">{{n.chinesename}}</v-subheader>
                        </v-col>
                        <v-col cols="8">
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
import Background from '@/components/Background.vue'
export default {
  name: 'PartyAffair',
  components: {
    Background,
  },
  data () {
    return {
      chinesename: '党务管理',
      valid: true,
      formlist: [
        {
          name: 'item0',
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
            }
          ]
        },
        {
          name: 'item1',
          data: [
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
              value: [
                {
                  index: 1,
                  value: '',
                  buttontext: '添加',
                  func: function(obj,index){
                    console.log(index);
                    obj.maxval += 1;
                    obj.value.push({
                      index: obj.maxval,
                      value: '',
                      buttontext: '删除',
                      func: function(newobj,newindex){
                        console.log(newobj);
                        for(let i in obj.value){
                          if(obj.value[i].index==newindex){
                            obj.value.splice(i,1);
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
        }
      ],
      checkbox: false,
      selectdialog: false,
      adddialog: false,
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
        { text: '学号', value: 'schoolid', align: 'center',width: '150px' },
        { text: '姓名', value: 'name', align: 'center',width: '105px' },
        { text: '成为积极分子时间', value: 'activetime', align: 'center',width: '150px' },
        { text: '党课成绩', value: 'score', align: 'center',width: '150px' },
        { text: '积极分子支部名称', value: 'activebranch', align: 'center',width: '150px' },
        { text: '成为预备党员时间', value: 'preparedtime', align: 'center',width: '150px' },
        { text: '党支部名称', value: 'branch', align: 'center',width: '150px' },
        { text: '转正时间', value: 'formaltime', align: 'center',width: '150px' },
        { text: '操作', value: 'operation', align: 'center', sortable:false,width: '300px' },
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
          obj.splice(obj.length-1,0,{ text: k[0], value: k[1], align: 'center',width: '150px'});
        }
      }
      this.headers = obj;
    }
  },
  watch:{
    formlist:{
      handler(val){
        console.log(val);
      },
      deep:true
    },
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
