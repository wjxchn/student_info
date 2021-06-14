<template>
  <div id="cancelLeave">
    <background :titlevalue="chinesename"></background>
    <div class="table">
      <!-- 批量销假 按钮 begin-->
      <div style="width:100%;height:38px;">
        <v-btn
            @click="cancelLeaveAll"
            depressed
            small
            style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71, 112, 166, 0.996); font-size:13px;display:block;"
        >
          批量销假
        </v-btn>
      </div>
      <div style="height:15px;width=100%;">
      </div>
      <!-- 批量销假 按钮 end -->

      <!-- 请假表begin -->
      <div style="min-width:960px;">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :single-select="singleSelect"
            :single-expand="singleExpand"
            item-key="autoId"
            class="elevation-1"
            show-select
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            mobile-breakpoint=0
        >
          <template v-slot:[`item.operation`]={item}>
            <v-btn depressed small style="background-color:rgba(71, 112, 166, 0.996078431372549);color:white;"
                   @click="cancelLeave(item)">销假
            </v-btn>
          </template>
        </v-data-table>
      </div>
      <!-- 请假表end -->

      <!-- 分页begin -->
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共 {{ desserts.length }} 条
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
      <!-- 分页end -->
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background.vue'
import axios from 'axios'

export default {
  name: 'CancelLeave',
  components: {
    Background
  },
  data() {
    return {
      chinesename: '销假管理',
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        {text: '学号', value: 'schoolid', align: 'center', width: '100px'},
        {text: '姓名', value: 'name', align: 'center', width: '100px'},
        {text: '请假理由', value: 'reason', align: 'center', width: '150px'},
        {text: '请假去向', value: 'targetPlace', align: 'center', width: '150px'},
        {text: '请假开始日期', value: 'beginTime', align: 'center', width: '120px'},
        {text: '请假结束日期', value: 'endTime', align: 'center', width: '120px'},
        {text: '请假状态', value: 'status', align: 'center', width: '100px'},
        {text: '操作', value: 'operation', align: 'center', sortable: false, width: '60px'},
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selectitems: [
        {state: '10条/页', abbr: 10},
        {state: '20条/页', abbr: 20},
        {state: '30条/页', abbr: 30},
      ],
      desserts: [],
    }
  },
  methods: {
    // 单个销假
    cancelLeave(item) {
      axios({
        url: '/api/leaveinfo/terminate',
        params: {"autoId": item.autoId},
        method: 'post',
      }).then(() => {
        // 从本地数组中删除对应请假
        var len = this.desserts.length;
        var autoId = item.autoId;
        for (var i = 0; i < len; i++) {
          if (this.desserts[i].autoId == autoId) {
            // this.desserts.splice(i, 1);
            this.desserts[i].status = "已经销假";
            break;
          }
        }
        var a = '销假成功\n';
        a += '学生学号: ';
        a += item.schoolid;
        a += '\n学生姓名: ';
        a += item.name;
        alert(a)
      }).catch(() => {
        alert('销假失败');
      })
    },
    // 批量销假
    cancelLeaveAll() {
      var len = this.selected.length;
      var data = "";           // 是选中的请假条的id拼接成一个字符串，中间用#分割
      for (var i = 0; i < len; i++) {
        data += this.selected[i].autoId + "#";
      }
      axios({
        url: '/api/leaveinfo/terminatemany',
        method: 'post',
        params: {"autoIds": data},
      }).then(() => {
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < this.desserts.length; j++) {
            if (this.desserts[j].autoId == this.selected[i].autoId) {
              // this.desserts.splice(j, 1);
              this.desserts[i].status = "已经销假";
              break;
            }
          }
        }
        alert("批量销假成功！")
      }).catch(() => {
        alert('批量销假失败！');
      })
    }
  },
  mounted() {
    axios({
      url: '/api/leaveinfo/get',
      method: 'post',
    }).then(res => {
      var flag = res.data.flag;
      if (flag) {
        this.desserts = res.data.leaveInfos;
      }
    }).catch(() => {
      alert('初始化数据失败！');
    })
  }
}
</script>

<style scoped>
.table {
  position: absolute;
  top: 230px;
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
}
</style>
