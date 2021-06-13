<template>
  <div id="basicInfo">
    <background :titlevalue="chinesename" iconvalue="mdi-school"></background>
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
            <v-col cols="12" sm="12">
              <div style="margin-left:20px;display:inline-block;">
                请输入姓名：
                <v-text-field
                  single-line
                  outlined
                  dense
                  style="width:300px;font-size:15px;transform:scale(0,75,0,75);"
                  v-model="namesearchstr"
                ></v-text-field>
              </div>
              <div style="margin-left:20px;display:inline-block;">
                请输入学号：
                <v-text-field
                  single-line
                  outlined
                  dense
                  style="width:300px;font-size:15px;transform:scale(0,75,0,75);"
                  v-model="studentidsearchstr"
                ></v-text-field>
              </div>
            </v-col>          
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
                  :label="`全选`"
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
              :lazy-validation="false"
            >
              <v-container>
                <v-row dense no-gutters>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">非证件照片</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">上传图片预览</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">姓名</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.name"
                            required
                            outlined
                            dense
                            :rules="nameRules"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">学号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.schoolid"
                            required
                            outlined
                            dense
                            :rules="[v => !!v || '请输入学号',]"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">性别</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select :items="['男','女']" v-model="addform.sex" outlined dense
                            style="width=:100%;transform:scale(0.75,0.75);font-size:15px;"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">民族</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                              :items="['汉族', '蒙古族', '回族', '藏族', '维吾尔族','苗族', '彝族', '壮族', '布依族', '朝鲜族','满族', '侗族', '瑶族', '白族', '土家族','哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族','佤族', '畲族', '高山族', '拉祜族', '水族','东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族','达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族','毛南族','仡佬族', '锡伯族', '阿昌族', '普米族','塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族','独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族','基诺族']"
                              v-model="addform.race"
                              required
                              outlined
                              dense
                              style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">年龄</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.age"
                            required
                            outlined
                            dense
                            :rules="ageRules"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">籍贯</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.nativeplace"
                            required
                            outlined
                            dense
                            :rules="[v => !!v || '请输入籍贯',]"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">现家庭住址</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.nowplace"
                            required
                            outlined
                            dense
                            :rules="[v => !!v || '请输入现家庭住址',]"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">户口所在地</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.householdplace"
                            required
                            outlined
                            dense
                            :rules="[v => !!v || '请输入户口所在地',]"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人姓名</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.urgentcontactname"
                            required
                            outlined
                            dense
                            :rules="nameRules"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人关系</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['父子', '母子', '父女', '母女', '其他']"
                            v-model="addform.urgentcontactrelation"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人电话</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.urgentcontactphone"
                            required
                            outlined
                            dense
                            :rules="phoneRules"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">关心关爱</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-radio-group v-model="addform.iscared" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                            <v-radio
                              v-for="i in yesornolist"
                              :key="i"
                              :label="i"
                              :value="i"
                              style="font-size:10px;"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">关心等级</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.caredlevel"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">登记时间</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-menu
                            ref="registeredmenu"
                            v-model="registeredmenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="addform.registeredtime"
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
                            <v-date-picker v-model="addform.registeredtime" no-title scrollable :max="maxdate">
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="registeredmenu = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="registeredmenu = false">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">主要原因</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-textarea
                            v-model="addform.mainreason"
                            required
                            outlined
                            flat
                            dense
                            background-color="white"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                            auto-grow
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">贫困生</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-radio-group v-model="addform.ispoverty" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                            <v-radio
                              v-for="i in yesornolist"
                              :key="i"
                              :label="i"
                              :value="i"
                              style="font-size:10px;"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">困难等级</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.povertylevel"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">是否申请临时困难补助</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-radio-group v-model="addform.istemporaryhelpapplied" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                            <v-radio
                              v-for="i in yesornolist"
                              :key="i"
                              :label="i"
                              :value="i"
                              style="font-size:10px;"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">申请时间</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-menu
                            ref="appliedmenu"
                            v-model="appliedmenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="addform.appliedtime"
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
                            <v-date-picker v-model="addform.appliedtime" no-title scrollable :max="maxdate">
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="appliedmenu = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="appliedmenu = false">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">申请金额</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.appliedaccount"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">出生年月</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-menu
                            ref="birthdatemenu"
                            v-model="birthdatemenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="addform.birthdate"
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
                            <v-date-picker v-model="addform.birthdate" no-title scrollable :max="maxdate">
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="birthdatemenu = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="birthdatemenu = false">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">身份证号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.idnum"
                            required
                            outlined
                            dense
                            :rules="[v => !!v || '请输入身份证号',v => (v && v.length == 18) || '请输入18位身份证号']"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">入学年份</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['201309', '201409', '201509', '201609', '201709', '201809', '201909', '202009', '202109', '202209', '202309', '202409', '202509', '202609', '202709', '202809', '202909', '203009']"
                            v-model="addform.schoolstartyear"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">政治面貌</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['正式党员', '预备党员', '共青团员', '群众', '其它']"
                            v-model="addform.politics"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">手机号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.phonenumber"
                            required
                            outlined
                            dense
                            :rules="phoneRules"
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">所属校区</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['学院路校区', '沙河校区', '杭州研究院', '青岛研究院', '苏州研究院', '深圳研究院', '云南研究院', '其它']"
                            v-model="addform.schoolzone"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">学生类型</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            v-model="addform.studenttype"
                            :items="['本科', '硕士', '博士']"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">班号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.classnum"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">辅导员</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.guider"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">是否毕业</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-radio-group v-model="addform.isschoolended" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                            <v-radio
                              v-for="i in yesornolist"
                              :key="i"
                              :label="i"
                              :value="i"
                              style="font-size:10px;"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">培养方式</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['全日制定向', '全日制非定向', '非全日制']"
                            v-model="addform.fosterway"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">近期所在地</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.recentplace"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">实验室门牌号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.labdoornum"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">校外住址</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.outsideschoolplace"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">特殊问题</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.specialproblem"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">主导师姓名</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.professorname"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">主导师手机号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.professorphonenumber"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">直带导师姓名</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.directprofessorname"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">直带导师手机号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.directprofessorphonenumber"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">本科学校</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.undergraduateschool"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">本科专业</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.undergraduatemajor"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">硕士学校</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.masterschool"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">硕士专业</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.masterschool"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="ma-0 pb-12"
                    cols="12"
                    xs="3"
                    sm="3"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">宿舍区域</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-select
                            :items="['学院路校内', '学院路大运村','沙河']"
                            v-model="addform.dormitoryarea"
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">宿舍楼号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.dormitorybuilding"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">房间号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.dormitoryroom"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row  dense no-gutters class="ma-0 pa-0">
                        <v-col cols="4" class="ma-0 pa-0">
                          <v-subheader class="ma-0 pa-0" style="font-size:10px;">床号</v-subheader>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0">
                          <v-text-field
                            class="ma-0 pa-0"
                            v-model="addform.dormitorybed"
                            required
                            outlined
                            dense
                            style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                          ></v-text-field>
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
        <template v-slot:item.operation="{item}">
          <v-dialog v-model="changedialog" width="1200px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                small
                style="background-color:white;border:1px solid grey;"
                v-bind="attrs"
                v-on="on"
                @click="changefunc(item)"
              >
                编辑
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">编辑学生信息</span>
              </v-card-title>
              <div class="basic_info_form">
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="false"
                >
                  <v-container>
                    <v-row dense no-gutters>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">非证件照片</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">上传图片预览</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">姓名</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.name"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">学号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.schoolid"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">性别</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-radio-group v-model="changeform.sex" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                                <v-radio
                                  v-for="i in sexchoice"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                                  style="font-size:10px;"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">民族</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                  :items="['汉族', '蒙古族', '回族', '藏族', '维吾尔族','苗族', '彝族', '壮族', '布依族', '朝鲜族','满族', '侗族', '瑶族', '白族', '土家族','哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族','佤族', '畲族', '高山族', '拉祜族', '水族','东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族','达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族','毛南族','仡佬族', '锡伯族', '阿昌族', '普米族','塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族','独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族','基诺族']"
                                  v-model="changeform.race"
                                  required
                                  outlined
                                  dense
                                  style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">年龄</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select :items="['男','女']" v-model="changeform.sex" outlined dense
                                style="width=:100%;transform:scale(0.75,0.75);font-size:15px;"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">籍贯</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.nativeplace"
                                required
                                outlined
                                dense
                                :rules="[v => !!v || '请输入籍贯',]"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">现家庭住址</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.nowplace"
                                required
                                outlined
                                dense
                                :rules="[v => !!v || '请输入现家庭住址',]"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">户口所在地</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.householdplace"
                                required
                                outlined
                                dense
                                :rules="[v => !!v || '请输入户口所在地',]"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人姓名</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.urgentcontactname"
                                required
                                outlined
                                dense
                                :rules="nameRules"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人关系</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                :items="['父子', '母子', '父女', '母女', '其他']"
                                v-model="changeform.urgentcontactrelation"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">紧急联系人电话</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.urgentcontactphone"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">关心关爱</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-radio-group v-model="changeform.iscared" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                                <v-radio
                                  v-for="i in yesornolist"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                                  style="font-size:10px;"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">关心等级</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.caredlevel"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">登记时间</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-menu
                                ref="changeregisteredmenu"
                                v-model="changeregisteredmenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="changeform.registeredtime"
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
                                <v-date-picker v-model="changeform.registeredtime" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="changeregisteredmenu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="changeregisteredmenu = false">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">主要原因</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-textarea
                                v-model="changeform.mainreason"
                                required
                                outlined
                                flat
                                dense
                                background-color="white"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                                auto-grow
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">贫困生</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-radio-group v-model="changeform.ispoverty" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                                <v-radio
                                  v-for="i in yesornolist"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                                  style="font-size:10px;"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">困难等级</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.povertylevel"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">是否申请临时困难补助</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-radio-group v-model="changeform.istemporaryhelpapplied" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                                <v-radio
                                  v-for="i in yesornolist"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                                  style="font-size:10px;"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">申请时间</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-menu
                                ref="changeappliedmenu"
                                v-model="changeappliedmenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="changeform.appliedtime"
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
                                <v-date-picker v-model="changeform.appliedtime" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="changeappliedmenu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="changeappliedmenu = false">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">申请金额</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.appliedaccount"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">出生年月</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-menu
                                ref="changebirthdatemenu"
                                v-model="changebirthdatemenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="changeform.birthdate"
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
                                <v-date-picker v-model="changeform.birthdate" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="changebirthdatemenu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="changebirthdatemenu = false">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">身份证号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.idnum"
                                required
                                outlined
                                dense
                                :rules="[v => !!v || '请输入身份证号',v => (v && v.length == 18) || '请输入18位身份证号']"
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">入学年份</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                :items="['201309', '201409', '201509', '201609', '201709', '201809', '201909', '202009', '202109', '202209', '202309', '202409', '202509', '202609', '202709', '202809', '202909', '203009']"
                                v-model="changeform.schoolstartyear"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">政治面貌</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                :items="['正式党员', '预备党员', '共青团员', '群众', '其它']"
                                v-model="changeform.politics"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">手机号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.phonenumber"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">所属校区</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                :items="['学院路校区', '沙河校区', '杭州研究院', '青岛研究院', '苏州研究院', '深圳研究院', '云南研究院', '其它']"
                                v-model="changeform.schoolzone"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">学生类型</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                v-model="changeform.studenttype"
                                :items="['本科', '硕士', '博士']"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">班号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.classnum"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">辅导员</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.guider"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">是否毕业</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-radio-group v-model="changeform.isschoolended" row style="width=:100%;transform:scale(0.75,0.75);" class="ma-2 pa-0">
                                <v-radio
                                  v-for="i in yesornolist"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                                  style="font-size:10px;"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">培养方式</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.fosterway"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">近期所在地</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.recentplace"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">实验室门牌号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.labdoornum"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">校外住址</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.outsideschoolplace"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">特殊问题</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.specialproblem"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">主导师姓名</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.professorname"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">主导师手机号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.professorphonenumber"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">直带导师姓名</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.directprofessorname"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">直带导师手机号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.directprofessorphonenumber"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">本科学校</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.undergraduateschool"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">本科专业</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.undergraduatemajor"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">硕士学校</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.masterschool"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">硕士专业</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.masterschool"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col
                        class="ma-0 pb-12"
                        cols="12"
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                      >
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">宿舍区域</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-select
                                :items="['学院路校内', '学院路大运村','沙河']"
                                v-model="changeform.dormitoryarea"
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">宿舍楼号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.dormitorybuilding"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">房间号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.dormitoryroom"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-container fluid class="ma-0 pa-0">
                          <v-row  dense no-gutters class="ma-0 pa-0">
                            <v-col cols="4" class="ma-0 pa-0">
                              <v-subheader class="ma-0 pa-0" style="font-size:10px;">床号</v-subheader>
                            </v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                              <v-text-field
                                class="ma-0 pa-0"
                                v-model="changeform.dormitorybed"
                                required
                                outlined
                                dense
                                style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                              ></v-text-field>
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
                <v-btn color="#EBECF1" @click="changedialog = false" dark depressed style="color:rgba(71, 112, 166, 0.996078431372549);margin-top:10px;margin-right:10px;margin-bottom:10px;">取消</v-btn>
                <v-btn color="rgba(71, 112, 166, 0.996078431372549)" @click="saveadd()" dark depressed style="margin-top:10px;margin-left:10px;margin-bottom:10px;">添加</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
              color="rgba(128, 152, 192, 0.8)"
              class="ma-2 white--text"
              small
              @click="exportfunc()"
            >
              导出
            </v-btn>
            <v-btn
              color="rgba(128, 152, 192, 0.8)"
              class="ma-2 white--text"
              small
              @click="generateresumefunc()"
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
  name: 'BasicInfo',
  components: {
    Background,
  },
  data () {
    return {
      chinesename: '基本信息管理',
      valid: true,
      namesearchstr: '',
      studentidsearchstr: '',
      addform: {
        imgsrc: require('../assets/basicinfo/u264.svg'),
        name: '',
        schoolid: '',
        sex: '',
        race: '',
        age: '',
        nativeplace: '',
        nowplace: '',
        householdplace: '',
        urgentcontactname: '',
        urgentcontactrelation: '',
        urgentcontactphone: '',
        iscared: '',
        caredlevel: '',
        registeredtime: '',
        mainreason: '',
        ispoverty: '',
        povertylevel: '',
        istemporaryhelpapplied: '',
        appliedtime: '',
        appliedaccount: '',
        birthdate: '',
        idnum: '',
        schoolstartyear: '',
        politics: '',
        phonenumber: '',
        schoolzone: '',
        studenttype: '',
        classnum: '',
        guider: '',
        isschoolended: '',
        fosterway: '',
        recentplace: '',
        labdoornum: '',
        outsideschoolplace: '',
        specialproblem: '',
        professorname: '',
        professorphonenumber: '',
        directprofessorname: '',
        directprofessorphonenumber: '',
        undergraduateschool: '',
        undergraduatemajor: '',
        masterschool: '',
        mastermajor: '',
        dormitoryarea: '',
        dormitorybuilding: '',
        dormitoryroom: '',
        dormitorybed: '',
      },
      changeform: {
        imgsrc: require('../assets/basicinfo/u264.svg'),
        name: '',
        schoolid: '',
        sex: '',
        race: '',
        age: '',
        nativeplace: '',
        nowplace: '',
        householdplace: '',
        urgentcontactname: '',
        urgentcontactrelation: '',
        urgentcontactphone: '',
        iscared: '',
        caredlevel: '',
        registeredtime: '',
        mainreason: '',
        ispoverty: '',
        povertylevel: '',
        istemporaryhelpapplied: '',
        appliedtime: '',
        appliedaccount: '',
        birthdate: '',
        idnum: '',
        schoolstartyear: '',
        politics: '',
        phonenumber: '',
        schoolzone: '',
        studenttype: '',
        classnum: '',
        guider: '',
        isschoolended: '',
        fosterway: '',
        recentplace: '',
        labdoornum: '',
        outsideschoolplace: '',
        specialproblem: '',
        professorname: '',
        professorphonenumber: '',
        directprofessorname: '',
        directprofessorphonenumber: '',
        undergraduateschool: '',
        undergraduatemajor: '',
        masterschool: '',
        mastermajor: '',
        dormitoryarea: '',
        dormitorybuilding: '',
        dormitoryroom: '',
        dormitorybed: '',
      },
      registeredmenu: false,
      appliedmenu: false,
      birthdatemenu: false,
      changeregisteredmenu: false,
      changeappliedmenu: false,
      changebirthdatemenu: false,
      yesornolist: ['是','否'], 
      sexchoice: ['男','女'],
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      changedialog: false,
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
        ['登记时间','registeredtime',false],
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
        ['登记时间','registeredtime',true],
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
        { text: '学号', value: 'schoolid', align: 'center',width: '150px' },
        { text: '姓名', value: 'name', align: 'center',width: '150px' },
        { text: '性别', value: 'sex', align: 'center',width: '150px' },
        { text: '年龄', value: 'age', align: 'center',width: '150px' },
        { text: '手机号', value: 'phonenumber', align: 'center',width: '150px' },
        { text: '校区', value: 'schoolzone', align: 'center',width: '150px' },
        { text: '学生类型', value: 'studenttype', align: 'center',width: '150px' },
        { text: '特殊问题', value: 'specialproblem', align: 'center',width: '150px' },
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
          schoolstartyear: '201309',
          politics: '共青团员',
          phonenumber: '19918917382',
          schoolzone: '学院路校区',
          studenttype: '硕士',
          classnum: '200601',
          guider: '李四',
          isschoolended: '否',
          fosterway: '非全日制',
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
          dormitoryarea: '学院路大运村',
          dormitorybuilding: '2',
          dormitoryroom: '205',
          dormitorybed: '2',
        }
      ],
      maxdate: (function () {
        var date = new Date();
        var monthstr = '';
        var daystr = '';
        if (date.getMonth() >= 0 && date.getMonth() <= 8) {
          monthstr = monthstr + '0' + (date.getMonth() + 1);
        } else {
          monthstr = monthstr + (date.getMonth() + 1);
        }
        if (date.getDate() >= 1 && date.getDate() <= 9) {
          daystr = daystr + '0' + date.getDate();
        } else {
          daystr = daystr + date.getDate();
        }
        return '' + date.getFullYear() + '-' + monthstr + '-' + daystr;
      })(),
      nameRules: [
        v => !!v || '必须输入姓名',
        v => (v && v.length >= 2 && v.length <= 10) || '姓名的长度须大于等于2且小于等于10',
      ],
      ageRules: [
        v => !!v || '必须输入年龄',
        v => (v && parseInt(v) >= 15 && parseInt(v) <= 40) || '请填写15-40之间的数字',
      ],
      phoneRules: [
        v => !!v || '请输入手机号码',
        v => (v && /^1[345789]\d{9}$/.test(v)) || '请输入正确的手机号码'
      ],
    }
  },
  methods: {
    saveadd(){
      console.log(this.addform);
      this.changedialog = false;
    },
    changefunc(item){
        this.changeform.imgsrc = item.imgsrc;
        this.changeform.name = item.name;
        this.changeform.schoolid = item.schoolid;
        this.changeform.sex = item.sex;
        this.changeform.race = item.race;
        this.changeform.age = item.age;
        this.changeform.nativeplace = item.nativeplace;
        this.changeform.nowplace = item.nowplace;
        this.changeform.householdplace = item.householdplace;
        this.changeform.urgentcontactname = item.urgentcontactname;
        this.changeform.urgentcontactrelation = item.urgentcontactrelation;
        this.changeform.urgentcontactphone = item.urgentcontactphone;
        this.changeform.iscared = item.iscared;
        this.changeform.caredlevel = item.caredlevel;
        this.changeform.registeredtime = item.registeredtime;
        this.changeform.mainreason = item.mainreason;
        this.changeform.ispoverty = item.ispoverty;
        this.changeform.povertylevel = item.povertylevel;
        this.changeform.istemporaryhelpapplied = item.istemporaryhelpapplied;
        this.changeform.appliedtime = item.appliedtime;
        this.changeform.appliedaccount = item.appliedaccount;
        this.changeform.birthdate = item.birthdate;
        this.changeform.idnum = item.idnum;
        this.changeform.schoolstartyear = item.schoolstartyear;
        this.changeform.politics = item.politics;
        this.changeform.phonenumber = item.phonenumber;
        this.changeform.schoolzone = item.schoolzone;
        this.changeform.studenttype = item.studenttype;
        this.changeform.classnum = item.classnum;
        this.changeform.guider = item.guider;
        this.changeform.isschoolended = item.isschoolended;
        this.changeform.fosterway = item.fosterway;
        this.changeform.recentplace = item.recentplace;
        this.changeform.labdoornum = item.labdoornum;
        this.changeform.outsideschoolplace = item.outsideschoolplace;
        this.changeform.specialproblem = item.specialproblem;
        this.changeform.professorname = item.professorname;
        this.changeform.professorphonenumber = item.professorphonenumber;
        this.changeform.directprofessorname = item.directprofessorname;
        this.changeform.directprofessorphonenumber = item.directprofessorphonenumber;
        this.changeform.undergraduateschool = item.undergraduateschool;
        this.changeform.undergraduatemajor = item.undergraduatemajor;
        this.changeform.masterschool = item.masterschool;
        this.changeform.mastermajor = item.mastermajor;
        this.changeform.dormitoryarea = item.dormitoryarea;
        this.changeform.dormitorybuilding = item.dormitorybuilding;
        this.changeform.dormitoryroom = item.dormitoryroom;
        this.changeform.dormitorybed = item.dormitorybed;
    },
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
        { text: '操作', value: 'operation', align: 'center', sortable:false, width:'300px' },        
      ];
      for(let k of this.infolist){
        if(k[2]){
          obj.splice(obj.length-1,0,{ text: k[0], value: k[1], align: 'center', width:'150px'});
        }
      }
      this.headers = obj;
    },
    exportfunc(){
      console.log(this.selected);
    },
    generateresumefunc(){
      console.log(this.selected);
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
.basic_info_table{
  position: absolute;
  top:230px;
  width:80%;
  margin-left: 50%;
  transform: translate(-50%);
}
.basic_info_expand_td{
  background-color: #FAFAFA;
}
</style>