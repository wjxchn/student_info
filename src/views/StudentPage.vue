<template>
  <div id="studentPage">
    <background :titlevalue="chinesename" iconvalue="mdi-school"></background>
    <div style="position:absolute;top:230px;left:50%;transform:translate(-50%);width:90%;">
      <v-card style="margin-top: 20px;">
        <div class="basic_info_form">
          <v-card class="mx-auto" max-width="434" tile>
            <v-img height="100%" :src="avatarBg">
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-avatar class="profile" size="164" tile>
                    <v-img contain max-height="135" :src="'/avatar/'+form.imgsrc"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="text-h6" v-text="form.name">你的姓名</v-list-item-title>
                      <v-list-item-subtitle v-text="form.schoolid">你的学号</v-list-item-subtitle>
                      <v-list-item-subtitle @click="transferClick()" id="imgmessage">点击上传头像</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card>


          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container class="ma-0 pa-0 pt-4 pl-2 pr-2" fluid>
              <div style="border-radius: 30px;">
                <h1 style="margin-left: 10px;margin-bottom: 30px;">个人基本信息</h1>
              </div>
              <v-row dense class="ma-0 pa-0" id="imgpreshow" style="display: none;">
                <div style="margin:0 auto;width: 150px;">
                  <h3 align="center" style="margin-bottom: 20px;">照片预览</h3>
                  <input type="file" accept=".jpg;.png;.jpeg;" id="fileExport" @change="handleFileChange" ref="inputer"
                         style="display: none;">
                  <img id="yourimg" src="" style="width: 150px;">
                </div>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.name" :rules="nameRules" label="姓名" required readonly></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.schoolid" :rules="[v => !!v || '请输入学号',]" label="学号"
                                required readonly></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['男','女']"
                      label="性别"
                      v-model="form.sex"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.idnum"
                                :rules="[v => !!v || '请输入身份证号',v => (v && v.length == 18) || '请输入18位身份证号']" label="身份证号"
                                required @change="genfromidnum" @input="genfromidnum"></v-text-field>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.birthdate" label="出生年月日" readonly required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.age" :rules="ageRules" readonly label="年龄" required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['汉族', '蒙古族', '回族', '藏族', '维吾尔族','苗族', '彝族', '壮族', '布依族', '朝鲜族','满族', '侗族', '瑶族', '白族', '土家族','哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族','佤族', '畲族', '高山族', '拉祜族', '水族','东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族','达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族','毛南族','仡佬族', '锡伯族', '阿昌族', '普米族','塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族','独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族','基诺族']"
                      label="民族"
                      v-model="form.race"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['201309', '201409', '201509', '201609', '201709', '201809', '201909', '202009', '202109', '202209', '202309', '202409', '202509', '202609', '202709', '202809', '202909', '203009']"
                      label="入学年份"
                      v-model="form.schoolstartyear"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.urgentcontactname" :rules="nameRules" label="紧急联系人姓名"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['父子', '母子', '父女', '母女', '其他']"
                      label="紧急联系人关系"
                      v-model="form.urgentcontactrelation"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.urgentcontactphone" :rules="phoneRules" label="紧急联系人手机号码"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['正式党员', '预备党员', '共青团员', '群众', '其它']"
                      label="政治面貌"
                      v-model="form.politics"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.householdplace" :rules="[v => !!v || '请输入户口所在地',]" label="户口所在地"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.nativeplace" :rules="[v => !!v || '请输入籍贯',]" label="籍贯(精确到县)"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.nowplace" :rules="[v => !!v || '请输入家庭住址',]" label="现家庭住址(精确到门牌号)"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.phonenumber" :rules="phoneRules" label="本人手机号码" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-container class="ma-0 pa-0 pt-4 pl-2 pr-2" fluid>
              <div style="border-radius: 30px;">
                <h1 style="margin-left: 10px;margin-bottom: 30px;">学业信息</h1>
              </div>
              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['学院路校区', '沙河校区', '杭州研究院', '青岛研究院', '苏州研究院', '深圳研究院', '云南研究院', '其它']"
                      label="所属校区"
                      v-model="form.schoolzone"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['本科', '硕士', '博士']"
                      label="学生类型"
                      v-model="form.studenttype"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['全日制定向', '全日制非定向', '非全日制']"
                      label="培养方式"
                      v-model="form.fosterway"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.classnum" :rules="[v => !!v || '请输入班号',]" label="班号(如:硕19061)"
                                required></v-text-field>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.professorname" :rules="nameRules" label="主导师姓名" required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.professorphonenumber" :rules="phoneRules" label="主导师手机号"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.directprofessorname" :rules="nameRules" label="直带导师姓名"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.directprofessorphonenumber" :rules="phoneRules" label="直带导师手机号"
                                required></v-text-field>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['王婧仪', '何巍', '于秋漫', '毛吾吉达']"
                      label="所属专职辅导员"
                      v-model="form.fulltimeguider"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['王楠', '他旭翔', '梁保宇', '张重庆', '李婧怡', '张华梁', '李小冉', '王嘉凯', '张艺璇', '赵世纪', '李何贝子', '张凯宁', '王康明','廖天禧']"
                      label="所属兼职辅导员"
                      v-model="form.partimeguider"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.recentplace" :rules="[v => !!v || '请输入近期所在地',]" label="近期所在地"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.outsideschoolplace" :rules="[v => !!v || '请输入校外住址',]" label="校外住址(精确到门牌号)"
                                required></v-text-field>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.labdoornum" :rules="[v => !!v || '请输入实验室门牌号',]" label="实验室门牌号"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.undergraduateschool" :rules="[v => !!v || '请输入本科学校',]" label="本科学校"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.undergraduatemajor" :rules="[v => !!v || '请输入本科专业',]" label="本科专业"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" v-show="form.studenttype !== '本科'">
                  <v-text-field v-model="form.masterschool" :rules="[v => !!v || '请输入硕士学校',]" label="硕士学校"
                                required></v-text-field>
                </v-col>
              </v-row>

              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" v-show="form.studenttype !== '本科'">
                  <v-text-field v-model="form.mastermajor" :rules="[v => !!v || '请输入硕士专业',]" label="硕士专业"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3"
                       v-show="form.studenttype !== '本科' && form.studenttype !== '硕士'">
                  <v-text-field v-model="form.phdschool" :rules="[v => !!v || '请输入博士学校',]" label="博士学校"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3"
                       v-show="form.studenttype !== '本科' && form.studenttype !== '硕士'">
                  <v-text-field v-model="form.phdmajor" :rules="[v => !!v || '请输入博士专业',]" label="博士专业"
                                required></v-text-field>
                </v-col>
              </v-row>

            </v-container>

            <v-container class="ma-0 pa-0 pt-4 pl-2 pr-2" fluid>
              <div style="border-radius: 30px;">
                <h1 style="margin-left: 10px;margin-bottom: 30px;">宿舍信息</h1>
              </div>
              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['学院路校内', '学院路大运村','沙河']"
                      label="宿舍区域"
                      v-model="form.dormitoryarea"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']"
                      label="宿舍楼号"
                      v-model="form.dormitorybuilding"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.dormitoryroom" :rules="[v => !!v || '请输入房间号',]" label="房间号"
                                required></v-text-field>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-text-field v-model="form.dormitorybed" :rules="[v => !!v || '请输入床号',]" label="床号"
                                required></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-container class="ma-0 pa-0 pt-4 pl-2 pr-2" fluid>
              <div style="border-radius: 30px;">
                <h1 style="margin-left: 10px;margin-bottom: 30px;">入党信息</h1>
              </div>
              <v-row dense class="ma-0 pa-0">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="['是', '否']"
                      label="是否正式党员"
                      v-model="form.isformalmember"
                  ></v-select>
                </v-col>

                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" v-show="form.isformalmember=='否'">
                  <v-select
                      :items="['是', '否']"
                      label="是否预备党员"
                      v-model="form.isprobationarymember"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3"
                       v-show="form.isformalmember=='否' && form.isprobationarymember=='否'">
                  <v-select
                      :items="['是', '否']"
                      label="是否积极分子"
                      v-model="form.isactivist"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" v-show="form.isactivist=='是'">
                  <v-select
                      :items="['是', '否']"
                      label="是否通过党课考试"
                      v-model="form.score"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row dense class="ma-0 pa-0">

                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2" v-show="form.isformalmember=='是'">
                  <div style="margin-top: 5px;">
                    <v-btn depressed>
                      从预备党员转为正式党员日期
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2" v-show="form.isformalmember=='是'">
                  <v-menu ref="formaltime.menu" v-model="formaltime.menu" :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="400px;">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.formaltime" prepend-icon="event" readonly required outlined dense
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                    </template>
                    <v-date-picker v-model="formaltime.value" no-title scrollable :max="maxdate">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="formaltime.menu = false">取消</v-btn>
                      <v-btn text color="primary"
                             @click="formaltime.menu = false;form.formaltime = formaltime.value;">
                        确定
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是'">
                  <div style="margin-top: 5px;">
                    <v-btn depressed>
                      从积极分子转为预备党员日期
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是'">
                  <v-menu ref="preparedtime.menu" v-model="preparedtime.menu" :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="400px;">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.preparedtime" prepend-icon="event" readonly required outlined dense
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                    </template>
                    <v-date-picker v-model="preparedtime.value" no-title scrollable :max="maxdate">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="preparedtime.menu = false">取消</v-btn>
                      <v-btn text color="primary"
                             @click="preparedtime.menu = false;form.preparedtime = preparedtime.value;">确定
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是' || form.isactivist=='是'">
                  <div style="margin-top: 5px;">
                    <v-btn depressed>
                      被党组织确定为积极分子日期
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是' || form.isactivist=='是'">
                  <v-menu ref="formaltime.menu" v-model="activetime.menu" :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="400px;">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.activetime" prepend-icon="event" readonly required outlined dense
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                    </template>
                    <v-date-picker v-model="activetime.value" no-title scrollable :max="maxdate">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="activetime.menu = false">取消</v-btn>
                      <v-btn text color="primary" @click="activetime.menu = false;form.activetime = activetime.value;">
                        确定
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>


              <v-row dense class="ma-0 pa-0"
                     v-show="form.isformalmember=='是' || form.isprobationarymember=='是' || form.isactivist=='是'">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="branchnamearr"
                      label="党支部名称"
                      v-model="form.branch"
                  ></v-select>
                </v-col>

                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="branchsecretarynamearr"
                      label="党支部书记"
                      v-model="form.secretaryname"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是' ">
                  <v-select
                      :items="['是', '否']"
                      label="组织关系是否在院"
                      v-model="form.isatcollege"
                  ></v-select>
                </v-col>
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3"
                       v-show="form.isformalmember=='是' || form.isprobationarymember=='是'">
                  <v-select
                      :items="['是', '否']"
                      label="是否转过党"
                      v-model="form.ischangedbranch"
                  ></v-select>
                </v-col>
              </v-row>


              <v-row dense class="ma-0 pa-0" v-show="(form.isformalmember=='是' || form.isprobationarymember=='是') && form.ischangedbranch=='是'">
                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2">
                  <div style="margin-top: 5px;">
                    <v-btn depressed>
                      转党支部日期
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="6" xs="2" sm="2" md="2" lg="2" xl="2">
                  <v-menu ref="changebranchtime.menu" v-model="changebranchtime.menu" :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="400px;">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.changebranchtime" prepend-icon="event" readonly required outlined
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size:20px;width:100%;transform:scale(0.75,0.75);"></v-text-field>
                    </template>
                    <v-date-picker v-model="changebranchtime.value" no-title scrollable :max="maxdate">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="changebranchtime.menu = false">取消</v-btn>
                      <v-btn text color="primary"
                             @click="changebranchtime.menu = false;form.changebranchtime = changebranchtime.value;">确定
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row dense class="ma-0 pa-0" v-show="(form.isformalmember=='是' || form.isprobationarymember=='是') && form.ischangedbranch=='是'">
                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="branchnamearr"
                      label="原党支部名称"
                      v-model="form.changebranchold"
                  ></v-select>
                </v-col>

                <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3">
                  <v-select
                      :items="branchnamearr"
                      label="后党支部名称"
                      v-model="form.changebranchnew"
                  ></v-select>
                </v-col>

              </v-row>

            </v-container>
          </v-form>
        </div>
      </v-card>
      <div style="margin-left:50%;transform: translateX(-50px)">
        <!--        <v-btn color="success" width="100px" style="margin-top:20px;margin-bottom:40px;" @click="submit"-->
        <!--               :disabled="!valid">确定-->
        <!--        </v-btn>-->
        <v-btn color="success" width="100px" style="margin-top:20px;margin-bottom:40px;" @click="submit">提交信息</v-btn>
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
      avatarBg: require('../assets/img/oursky.jpg'),
      chinesename: '学生信息统计',
      valid: true,
      lazy: false,
      branchnamearr: ['1706-1党支部', '1706-2党支部', '1806党支部', '1906党支部', '硕18061党支部', '硕18062党支部',
        '硕18063党支部', '硕19061党支部', '硕19062党支部', '硕19063党支部', '硕19064党支部', '硕19065党支部',
        '硕19066党支部', '硕19067党支部', '硕20061党支部', '硕20062党支部', '硕20063党支部', '硕20064党支部',
        '硕20065党支部', '硕20066党支部', 'BYACT1党支部', 'BYACT2党支部', 'BY软国重党支部', 'BY软件所党支部',
        'BY系统结构党支部', 'BY虚拟现实党支部', 'BY应用1党支部', 'BY应用2党支部', 'BY应用3党支部'],
      branchsecretarynamearr: ['程添红', '罗钧宇', '李何贝子', '张凯宁', '王欣',
        '张松', '张瑞', '汪凌风', '孙培林', '张梦泽', '张一帆', '王亚', '王雅卉'
        , '王柳迪', '郑健', '魏淑越', '刘晟', '吕澳辉', '郭桐', '高小博', '乔同',
        '马广辉', '刘琳', '冯惠妍', '张琪', '牛钰浩', '王思哲', '侯璞玥', '牛广林'],
      form: {
        name: "",
        schoolid: "",
        sex: "",
        idnum: "",
        birthdate: "",
        age: "",
        race: "",
        schoolstartyear: "",
        urgentcontactname: "",
        urgentcontactrelation: "",
        urgentcontactphone: "",
        politics: "",
        nativeplace: "",
        nowplace: "",
        householdplace: "",
        phonenumber: "",
        schoolzone: "",
        studenttype: "",
        fosterway: "",
        classnum: "",
        professorname: "",
        professorphonenumber: "",
        directprofessorname: "",
        directprofessorphonenumber: "",
        fulltimeguider: "",
        partimeguider: "",
        recentplace: "",
        outsideschoolplace: "",
        labdoornum: "",
        undergraduateschool: "",
        undergraduatemajor: "",
        masterschool: "",
        mastermajor: "",
        phdschool: "",
        phdmajor: "",
        dormitoryarea: "",
        dormitorybuilding: "",
        dormitoryroom: "",
        dormitorybed: "",
        isformalmember: "",
        isprobationarymember: "",
        isactivist: "",
        score: "",
        formaltime: "",
        preparedtime: "",
        activetime: "",
        branch: "",
        secretaryname: "",
        isatcollege: "",
        ischangedbranch: "",
        changebranchtime: "",
        changebranchold: "",
        changebranchtnew: "",
        registerdtime: "",
        imgsrc: ""
      },

      formaltime: {
        menu: false,
        value: "",
      },
      preparedtime: {
        menu: false,
        value: ""
      },
      activetime: {
        menu: false,
        value: ""
      },
      changebranchtime: {
        menu: false,
        value: ""
      },
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
      formData: ""
    }
  },
  watch: {
    'form.studenttype'(val) {
      if (val === '本科') {
        this.form.undergraduateschool = '北京航空航天大学';
        this.form.masterschool = '';
        this.form.mastermajor = '';
        this.form.phdschool = '';
        this.form.phdmajor = '';
        //除了学校，辅导员也选了
        this.form.fulltimeguider = '王婧仪';
      } else if (val === '硕士') {
        this.form.masterschool = '北京航空航天大学';
        this.form.phdschool = '';
        this.form.phdmajor = '';
        //除了学校，辅导员也选了
        this.form.fulltimeguider = '于秋漫';
      } else if (val === '博士') {
        this.form.phdschool = '北京航空航天大学';
        //除了学校，辅导员也选了
        this.form.fulltimeguider = '何巍';
      }
    },
    'form.isformalmember'(val) {
      if (val === '是') {
        this.form.isprobationarymember = '否';
        this.form.isactivist = '否';
        this.form.score = '是';
      } else {
        // this.form.formaltime = '';
      }
    },
    'form.isprobationarymember'(val) {
      if (val === '是') {
        this.form.isactivist = '否';
        this.form.score = '是';
      } else {
        // this.form.preparedtime = '';
      }
    },
    'form.isactivist'(val) {
      if (val === '是') {
        // this.form.isprobationarymember = '否';
      } else {
        // this.form.activetime = '';
        //不是积极分子，就意味着没有党务信息，党务信息要设置为''
        // this.form.score = '';
        // this.form.branch = '';
        // this.form.secretaryname = '';
        // this.form.isatcollege = '';
        // this.form.ischangedbranch = '';
        // this.form.changebranchtime = '';
      }
    },
    'form.branch'(val) {
      var brancharr = this.branchnamearr;
      for (let i = 0; i < brancharr.length; i++) {
        if (brancharr[i] === val) {
          this.form.secretaryname = this.branchsecretarynamearr[i];
          break;
        }
      }
    },
    'form.secretaryname'(val) {
      var branchsecretarynamearr = this.branchsecretarynamearr;
      for (let i = 0; i < branchsecretarynamearr.length; i++) {
        if (branchsecretarynamearr[i] === val) {
          this.form.branch = this.branchnamearr[i];
          break;
        }
      }
    },
  },
  methods: {
    transferClick() {
      document.getElementById("fileExport").click();
      // document.getElementById("imgmessage").innerText="已选择，再次点击可重新选择图片";
    },
    genfromidnum() {
      if (this.form.idnum.length == 18) {
        var idnum = this.form.idnum;
        //440883199707272614
        var year = idnum.substring(6, 10);
        var month = idnum.substring(10, 12);
        var day = idnum.substring(12, 14);
        this.form.birthdate = year + "-" + month + "-" + day;
        this.form.age = new Date().getYear() + 1900 - year;
      }
    }
    ,
    handleFileChange() {
      // console.log(e.size);
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];// 通过DOM取文件数据
      let size = Math.floor(this.file.size);//计算文件的大小
      console.log(size);
      if (size > 512 * 2034) {
        alert("请不要上传大于500KB的图片文件！");
      } else {
        this.formData = new FormData();//new一个formData事件
        this.formData.append("file", this.file); //将file属性添加到formData里
        //此时formData就是我们要向后台传的参数了

        //下面是预览图片的内容
        console.log("xxx");
        var reader = new FileReader();  //调用FileReader
        reader.readAsDataURL(this.file); //将文件读取为 DataURL(base64)
        reader.onload = function (evt) {   //读取操作完成时触发。
          document.getElementById("yourimg").setAttribute('src', evt.target.result);  //将img标签的src绑定为DataURL
          document.getElementById("imgpreshow").style.display = "block";
        };
      }


    },

    // changeimg(item) {
    //   this.formlist[0].data[0].files = item.target.files;
    //   this.formlist[0].data[1].src = window.webkitURL.createObjectURL(this.formlist[0].data[0].files[0]);
    // },
    // submitImg() {
    //   axios({
    //     url: '/api/submitimg',
    //     method: 'post',
    //     async: false,
    //     // params: {
    //     //   stuNum: this.name,
    //     // }
    //     data: this.formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data' //值得注意的是，这个地方一定要把请求头更改一下
    //     }
    //   }).then(res => {
    //     if (res.data.flag) {
    //       console.log("图片上传成功！");
    //       console.log(res.data.filename);
    //       this.form.imgsrc = res.data.filename;
    //       console.log(this.form.imgsrc);
    //       console.log("图片上传成功！");
    //     } else {
    //       console.log("图片上传失败！");
    //     }
    //   })
    // },
    submit() {
      if (this.formData !== "") {
        // console.log("有图片");
        //有图片需要先上传图片
        axios({
          url: '/api/submitimg',
          method: 'post',
          async: false,
          // params: {
          //   stuNum: this.name,
          // }
          data: this.formData,
          headers: {
            'Content-Type': 'multipart/form-data' //值得注意的是，这个地方一定要把请求头更改一下
          }
        }).then(res => {
          if (res.data.flag) {
            console.log("图片上传成功！");
            console.log(res.data.filename);
            this.form.imgsrc = res.data.filename;
            console.log(this.form.imgsrc);
            console.log("图片上传成功！");
            // // 注意上面的这个函数和下面是异步执行的；submitImg未执行完时，下面就开始执行了，
            //分开写时，两个请求是同时发的
            // console.log("图片路径");
            // console.log(this.form.imgsrc);
            this.submitForm();
          } else {
            console.log("图片上传失败！");
          }
        })

      } else {
        // console.log("没有图片");
        //没有图片就不用先上传图片了
        this.submitForm();
      }
    }
    ,
    submitForm() {
      axios({
        url: '/api/submit',
        method: 'post',
        // params: {
        //   stuNum: this.name,
        // }
        data: this.form
      }).then(res => {
        if (res.data.flag) {
          alert("保存成功！");
        } else {
          alert("保存失败！");
        }
      })
    }
  }
  ,
  mounted() {
    var token = localStorage.getItem('Authorization');
    axios({
      url: '/api/getinfo',
      method: 'post',
      params: {
        token: token, //这是请求头
      }
      // data: {'token': token}  //这是请求体
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

  }
}
</script>

<style scoped>
.inputClass {
  font-size: 14px;
  width: 100%;
  transform: scale(0.75, 0.75);
}
</style>
