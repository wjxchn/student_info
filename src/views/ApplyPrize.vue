<template>
  <div id="applyPrize">
    <background :titlevalue="chinesename" iconvalue="inventory"></background>
    <div class="table">
      <div style="width:100%;height:38px;">
        <v-btn
          depressed
          small
          style="border:1px solid rgba(71, 112, 166, 0.996); width:100px; height:38px; float:right; color:rgba(71,112,166,0.99); font-size:13px;display:block;"
          @click="toapplyprizepage()"
        >
          申报奖项
        </v-btn>
      </div>
      <div style="height:15px;width:100%;">
      </div>
      <div style="min-width:960px;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="list"
          :single-select="singleSelect"
          :single-expand="singleExpand"
          item-key="name"
          class="elevation-1"
          show-select
          show-expand
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          mobile-breakpoint=0   
        >
          <template v-slot:item.operation="{ item, value }">
<!--            <v-btn depressed small style="background-color:rgba(71,112,166,1);color:white;" @click="changeItem(item, value)">修改</v-btn>-->
            <v-btn depressed small style="background-color:#ec2a30;color:white;" @click="deleteItem(item, value)">删除</v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
<!--            点击表项展开后显示的内容-->
<!--            学生应该看到该奖的一些信息-->
            <td :colspan="headers.length">
              <div class="detail_box">
                <v-row dense>
                  <v-col><p class="attribution_name">奖项编号：</p></v-col> <v-col><p class="attr_data">1</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">奖项名称：</p></v-col> <v-col><p class="attr_data">{{ item.prizename }}</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">奖项金额：</p></v-col>

                  <v-col>
                    <div style="width: 200px;">
                      <v-row dense>
                        <v-col>一等奖</v-col>
                        <v-col class="prize_money">300.00元</v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>二等奖</v-col>
                        <v-col class="prize_money">30.00元</v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>三等奖</v-col>
                        <v-col class="prize_money">3.00元</v-col>
                      </v-row>
                    </div>

                    <div style="height: 15px;"></div>
                  </v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">申请条件：</p></v-col> <v-col><p class="attr_data">成绩单</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">申请截止时间：</p></v-col> <v-col><p class="attr_data">2020-01-01</p></v-col>
                </v-row>
  
                <v-row dense>
                  <v-col><p class="attribution_name">投票方式：</p></v-col> <v-col><p class="attr_data">打分制</p></v-col>
                </v-row>
              </div>
            </td>
            
          </template>
        </v-data-table>
      </div>
      <div class="text-center pt-2">
        <div style="display: inline-block; margin-right:10px; font-weight:700; color:#0D4C7F;">
          共1条
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
      chinesename: '已申报的奖项',
      valid: true,
      checkbox: false,
      selectdialog: false,
      adddialog: false,
      expanded: [],
      singleExpand: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: '奖项编号', value: 'prizeid', align: 'center',width: '100px' },
        { text: '奖项名称', value: 'prizename', align: 'center',width: '140px' },
        { text: '奖项金额', value: 'prizeaccount', align: 'center',width: '100px' },
        { text: '申请人学号', value: 'applystudentid', align: 'center',width: '130px' },
        { text: '申请人姓名', value: 'applystudentname', align: 'center',width: '130px' },
        { text: '申请附件', value: 'appendix', align: 'center',width: '150px' },
        { text: '申请日期', value: 'applytime', align: 'center',width: '120px' },
        { text: '申请截止日期', value: 'applydeadline', align: 'center',width: '130px' },
        { text: '操作', value: 'operation', align: 'center', sortable:false, width: '150px' },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selectitems: [
        { state: '10条/页', abbr: 10},
        { state: '20条/页', abbr: 20},
        { state: '30条/页', abbr: 30},
      ],
      list: [
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
  methods:{
    toapplyprizepage(){
      this.$router.push('/applyprizepage');
    },

    changeItem(item, value) {
      console.log(item, value);
    },

    deleteItem(item, value) {
      const index = this.list.indexOf(item);
      confirm("你是否想要取消此项申报？") && this.list.splice(index, 1);
      console.log(item, value);
    }
  }
}
</script>

<style scoped>
.table{
  position: absolute;
  top:230px;
  width:90%;
  margin-left: 50%;
  transform: translate(-50%);
}

.attribution_name {
  font-weight: bold;
  display: inline-block;
}
.attr_data {
  display: inline-block;
}
.detail_box {
  width: 400px;
  left: 50%;
  position: relative;
  transform: translate(-50%, 0);

  margin-top: 30px;
  margin-bottom: 20px;
}
.prize_money {
  text-align: right;
}
</style>