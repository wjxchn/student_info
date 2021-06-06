<template>
  <div id="applyPrize">
    <background :titlevalue="chinesename"></background>
    <div class="table">
      <div style="width:100%;height:38px;">
        <v-btn
          depressed
          small
          style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71, 112, 166, 0.996); font-size:13px;display:block;"
        >
          申报奖项
        </v-btn>
      </div>
      <div style="height:15px;width=100%;">
      </div>
      <div style="min-width:960px;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :single-select="singleSelect"
          :single-expand="singleExpand"
          item-key="name"
          class="elevation-1"
          show-select
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation>
            <v-btn depressed small style="background-color:rgba(71, 112, 166, 0.996078431372549);color:white;">删除</v-btn>
          </template>
        </v-data-table>
      </div>
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
  name: 'ApplyPrize',
  components: { 
    Background
  },
  data () {
    return {
      chinesename: '申报奖项',
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: '奖项编号', value: 'prizeid', align: 'center',width: '150px' },
        { text: '奖项名称', value: 'prizename', align: 'center',width: '150px' },
        { text: '奖项金额', value: 'prizeaccount', align: 'center',width: '150px' },
        { text: '申请人学号', value: 'applystudentid', align: 'center',width: '150px' },
        { text: '申请人姓名', value: 'applystudentname', align: 'center',width: '150px' },
        { text: '申请附件', value: 'appendix', align: 'center',width: '150px' },
        { text: '申请日期', value: 'applytime', align: 'center',width: '150px' },
        { text: '申请截止日期', value: 'applydeadline', align: 'center',width: '150px' },
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
          prizeid: 1,
          prizename: '励志奖学金',
          prizeaccount: '1000.00',
          applystudentid: '18393728',
          applystudentname: '张三',
          appendix: '张三成绩单.pdf',
          applytime: '2019-12-13',
          applydeadline: '2020-01-01',
        }
      ],
    }
  },
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
</style>