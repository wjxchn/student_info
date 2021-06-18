<template>
  <div id="specialStory">
    <background :titlevalue="chinesename" iconvalue="palette"></background>
    <div class="table">
      <div style="height:15px;width=100%;"></div>
      
      <!-- 弹窗begin -->
      <v-dialog v-model="logincard" width="1200px" height="600px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            small
            style="border:1px solid rgb(71,112,166);width:100px;height:38px;float:right;color:rgba(71,112,166);font-size:13px;position:relative;top:-38px;"
            v-bind="attrs"
            v-on="on"
            @click="newStory"
          >
            登记特殊事迹
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span>登录特殊事迹</span>
          </v-card-title>
          <div style="margin-top:50px;">
            <v-row dense no-gutters class="ma-0 pa-0">
              <v-col cols="2"  class="ma-0 pa-0">
                <v-subheader style="font-size:16px;margin-left:135px;font-weight:700;">姓名</v-subheader>
              </v-col>
              <v-col cols="3" style="margin">
                <v-text-field
                  class="ma-0 pa-0"
                  required
                  outlined
                  dense
                  style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                  v-model="name"
                ></v-text-field>                        
              </v-col>
              <v-col cols="2">
                <v-subheader style="font-size:16px;margin-left:135px;font-weight:700;">学号</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  class="ma-0 pa-0"
                  required
                  outlined
                  dense
                  style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                  v-model="id"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense no-gutters class="ma-0 pa-0">
              <v-col cols="2">
                <v-subheader style="font-size:16px;margin-left:135px;font-weight:700;">标题</v-subheader>
              </v-col>
              <v-col cols="8" style="margin:0;">
                <v-text-field
                  required
                  outlined
                  dense
                  style="font-size:15px;width:100%;transform:scale(0.75,0.75);"
                  v-model="storyTitle"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense no-gutters class="ma-0 pa-0">
              <v-col cols="8">
                <v-subheader style="font-size:16px;margin-left:135px;font-weight:700;">特殊事迹描述</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-container fluid>
                  <v-textarea
                    v-model="story"
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Text"
                    style="width:650px;padding:0 35px;padding-top:20px;margin-left:90px;border-radius:10px;box-shadow:2px 2px 2px 2px rgba(0,0,0,.3);"
                  ></v-textarea>
                </v-container>
              </v-col>
              
              <v-col cols="2">
                <v-row>
                  <v-file-input
                    truncate-length="15"
                    multiple
                    placeholder="请选择上传图片"
                    show-size="true"
                    v-model="file[0]"
                  ></v-file-input>
                </v-row>
                <v-row>
                  <v-file-input
                    truncate-length="15"
                    multiple
                    placeholder="请选择上传图片"
                    show-size="true"
                    v-model="file[1]"
                  ></v-file-input>
                </v-row>
                <v-row>
                  <v-file-input
                    truncate-length="15"
                    multiple
                    placeholder="请选择上传图片"
                    show-size="true"
                    v-model="file[2]"
                  ></v-file-input>
                </v-row>
              </v-col>
              
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="logincard = false">取消</v-btn>
            <v-btn text @click="confirmBtnClick">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 弹窗end -->

      <div style="min-width:960px;">

          <v-data-table
            item-key="storyId"
            class="elevation-1"
            show-expand
            show-select
            v-model="selected"
            hide-default-footer
            mobile-breakpoint=0
            :page.sync="page"
            :items="desserts"
            :headers="headers"
            :single-select="singleSelect"
            :single-expand="singleExpand"
            :items-per-page="itemsPerPage"
            :expanded.sync="expanded"
            @page-count="pageCount = $event"
          >
            <template v-slot:[`item.operation`]={item}>
              <v-btn depressed small style="background-color:white;border:1px solid grey;" @click="editbtn(item)">编辑</v-btn>
              <v-btn depressed small style="margin-left:30px;background-color:rgba(71, 112, 166, 0.9);color:white;" @click="deleteStory(item.storyId)">删除</v-btn>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>特殊事迹列表</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch
                  v-model="singleExpand"
                  label="Single expand"
                  class="mt-2"
                ></v-switch>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <h1 style="text-align:center;margin:30px;">{{item.storyTitle}}</h1>
                <p style="text-indent:2em;font-size:16px;">{{item.story}}</p>
              </td>
            </template>
          </v-data-table>

      </div>
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共 {{desserts.length}} 条
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
          <v-container class="max-width">
            <v-pagination :total-visible="10" v-model="page" :length="pageCount"></v-pagination>
          </v-container>
        </div>
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          跳至
        </div>
        <div style="display: inline-block;">
          <v-text-field
              v-model="yourpage"
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
        <v-btn depressed large style="margin-left:10px;background-color:rgba(71, 112, 166, 0.996078431372549);color:white;" @click="pageTo()">跳转</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Background from '@/components/Background.vue'
  import axios from 'axios';
  // console.log(this.itemsPerPage);
  axios.get({
    url: 'url',
    method: 'get',
  }).then(res => {
    // 这里请求特殊事迹列表
    this.desserts = res.data.desserts;
  }).catch(() => {
    console.log('请求数据失败');
  })
  export default {
    name: 'SpecialStory',
    components: { 
      Background
    },
    data () {
      return {
        chinesename: '特殊事迹管理',
        yourpage: 1,
        name: '',
        id: '',
        story: '',
        storyTitle: '',
        time: '',
        logincard: false,
        valid: true,
        checkbox: false,
        selectdialog: false,
        adddialog: false,
        expanded: [],
        singleExpand: false,
        singleSelect: false,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        selected: [],
        file: ['','',''],
        headers: [
          { text: '学号', value: 'studentid', align: 'center',width: '150px' },
          { text: '姓名', value: 'studentname', align: 'center',width: '150px' },
          { text: '导师', value: 'teacher', align: 'center', width: '150px'},
          { text: '电话', value: 'phone', align: 'center', width: '150px'},
          { text: '特殊事迹', value: 'storyTitle', align: 'center',width: '150px' },
          { text: '登记日期', value: 'addtime', align: 'center',width: '150px' },
          { text: '操作', value: 'operation', align: 'center', sortable:false, width: '300px' },
        ],
        selectitems: [
          { state: '10条/页', abbr: 10},
          { state: '20条/页', abbr: 20},
          { state: '30条/页', abbr: 30},
        ],
        desserts: [
          {
            storyId: 1,
            studentid: '18362329',
            studentname: '张三',
            storyTitle: '见义勇为',
            teacher: '张四',
            phone: '18883553999',
            addtime: '2021-06-01 09:22',
            story: '这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事'
          },{
            storyId: 2,
            studentid: '18362330',
            studentname: '张三',
            storyTitle: '见义勇为',
            teacher: '张五',
            phone: '18883553999',
            addtime: '2021-06-01 09:22',
            story: '这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事这是一个故事'
          },
        ],
      }
    },
    
    methods: {
      pageTo(){
        console.log(this.yourpage);
        this.page = parseInt(this.yourpage);
      },
      newStory() {
          this.id = '';
          this.name = '';
          this.storyTitle = '';
          this.story = '';
      },
      cancelbtn() {
        this.logincard = false;
        document.querySelector('#storyinputcard').style.display = 'none';
      },
      editbtn(item) {
        this.logincard = true;
        this.name = item.studentname;
        this.id = item.studentid;
        this.story = item.story;
        this.storyTitle = item.storyTitle;
        this.file = ['','',''];
      },
      // 删除事迹接口
      deleteStory(id) {
        var len = this.desserts.length;
        var pos = -1;
        console.log(id);
        for(var i = 0; i < len; i ++) {
          if(this.desserts[i].storyId == id) {
            pos = i;
            break;
          }
        }
        if(pos < 0) {
          alert('删除失败');
        }
        axios({
          url: '9999',
          method: 'get',
          data: id,
        }).then(() => {
          this.desserts.splice(pos, 1);
          alert('删除成功');
        }).catch(() => {
          alert('删除失败');
        })
      },
      // 提交事迹接口
      confirmBtnClick() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var files = new Array();
        for(var i = 0; i < this.file.length; i ++) {
          if(this.file[i] != '') {
            files.push(this.file[i]);
          }
        }
        this.time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        var storyInfo = {
          stuId: this.id,
          stuName: this.name,
          stuStory: this.story,
          storyTitle: this.storyTitle,
          time: this.time,
          files: files
        };
        if(this.name == '') {
          alert('请输入姓名');
        } else if(this.id == '') {
          alert('请输入学号');
        } else if(this.story == '') {
          alert('请输入特殊事迹描述');
        } else if(this.storyTitle == '') {
          alert('请输入事迹标题');
        } else {
          axios({
            url: '',
            method: 'post',
            data: storyInfo,
          }).then(() => {
            alert('提交成功');
          }).catch(() => {
            alert('提交失败');
          })
        }
      },
    }
  }
</script>

<style scoped>
  .table{
    position: absolute;
    top:230px;
    width:80%;
    margin-left: 50%;
    transform: translate(-50%);
  }
  #storyinputcard {
    box-shadow: 0 0 750px 750px rgba(0,0,0,.7);
    z-index: 999;
    display: none;
    height: 470px;
    background-color: #fff;
    border: 1px solid rgb(118, 181, 206);
    border-radius: 20px;
    padding: 20px 150px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  #ss_cancelbtn {
    position: absolute;
    left: 440px;
    top: 420px;
    border-radius: 15px;
    background-color: rgb(226, 226, 226);
    width: 80px;
    height: 30px;
  }
  #ss_cancelbtn:focus {
    outline: none;
  }
  #ss_cancelbtn:active {
    background-color: rgb(209, 209, 209);
  }
  #ss_confirmbtn {
    position: absolute;
    right: 440px;
    top: 420px;
    border-radius: 15px;
    background-color: skyblue;
    width: 80px;
    height: 30px;
  }
  #ss_confirmbtn:focus {
    outline: none;
  }
  #ss_confirmbtn:active {
    background-color: rgb(116, 189, 218);
  }
  #cardname {
    display: inline-block;
    margin: 10px 50px;
    margin-left: 90px;
    margin-bottom: 30px;
    margin-right: 100px;
  }
  #cardname input {
    padding: 0 10px;
    border: 1px solid rgb(118, 181, 206);
    border-radius: 5px;
  }
  #cardid {
    display: inline-block;
    margin: 10px 50px;
    margin-left: 0;
    margin-bottom: 30px;
    margin-right: 100px;
  }
  #cardid input {
    padding: 0 10px;
    border: 1px solid rgb(118, 181, 206);
    border-radius: 5px;
  }
  #storyinputcard input:focus {
    outline: none;
  }
  textarea {
    padding: 20px;
    border: 1px solid rgb(118, 181, 206);
    width: 800px;
  }
  textarea:focus {
    outline: none;
  }
</style>