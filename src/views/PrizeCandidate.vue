<template>
  <div id="prizeCandidate">
    <background :titlevalue="chinesename" iconvalue="inventory"></background>
    <div class="table">
      <div style="width:100%;height:38px;">
        <v-btn
          depressed
          small
          style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71, 112, 166, 0.996); font-size:13px;display:block;"
          @click="submitVote()"
        >
          提交
        </v-btn>
      </div>
      <div style="height:15px;width:100%;">
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
          :show-select="showSelect"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation = "{ item }">
            <div style="width:100%;height:100%;position:relative;">
              <v-text-field
                class="ma-0 pa-0"
                v-model="item.applyResult"
                placeholder="输入0-10之间的数字"
                required
                outlined
                dense
                style="font-size:20px;width:100%;transform:scale(0.75,0.75);position:absolute;top:0%;"
              ></v-text-field>
            </div>
          </template>

          <template v-slot:item.appendix_display = "{ item }">
            <div style="width:100%;height:100%;position:relative;">
              <a style="line-height: 45px" href="item.appendix_link">{{ item.appendix }}</a>
            </div>
          </template>

        </v-data-table>
      </div>
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共{{ desserts.length }}条
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
export default {
  name: 'PrizeCandidate',
  components: { 
    Background
  },
  data () {
    return {
      chinesename: 'xxx奖候选人',
      yourpage: 1,
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],

      singleExpand: false,
      singleSelect: false,
      showSelect: true,
      selected: [],
      headers: [
        { text: '申报人学号', value: 'applyStudentId', align: 'center',width: '150px' },
        { text: '申报人姓名', value: 'applyStudentName', align: 'center',width: '150px' },
        { text: '申请等级', value: 'applyPrizeLevel', align: 'center',width: '150px' },
        { text: '评审方式', value: 'vote_str', align: 'center',width: '180px' },
        { text: '申请附件', value: 'appendix_display', align: 'center',width: '150px' },
        { text: '申请日期', value: 'applyTime', align: 'center',width: '150px' },
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
          applyStudentId: '18382378',
          applyStudentName: '张三',
          applyPrizeLevel: '一等奖',
          vote: '多人投票制',
          voteLimit: 5,
          appendix: '张三成绩单.pdf',
          appendix_link: "",
          applyTime: '2021-06-01',
          applyResult: '',
        }
      ],
    }
  },
  methods: {
    pageTo() {
      console.log(this.yourpage);
      this.page = parseInt(this.yourpage);
    },
    submitVote() {
      console.log(this.selected);
    }
  },
  mounted() {
    //获取到PrizeEvaluate页面传输来的数据
    //包括评估者的姓名、学工号、职务。。。
    let params = this.$route.params;
    console.log(params);

    //获取数据
    for(let i = 0; i < this.desserts.length; i++) {
      this.desserts[i].vote_str = (this.desserts[i].vote == "多人投票制") ?
          this.desserts[i].vote + `(上限${this.desserts[i].voteLimit}人)` :
          this.desserts[i].vote;
    }
    if(params.PrizeInfo.vote == "打分制") {
      this.headers.push({ text: '评审', value: 'operation', align: 'center', sortable:false, width: '240px' });
      this.showSelect = false;
    }
    else if(params.PrizeInfo.vote == "单人投票制") {
      this.showSelect = true;
      this.singleSelect = true;
    }
    else if(params.PrizeInfo.vote == "多人投票制") {
      this.showSelect = true;
      this.singleSelect = false;
    }
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
</style>