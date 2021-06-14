<template>
  <div id="background_component">
    <div class="basic_info_background">
      <img :src="basicInfoBackgroundSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="login_bar">
      <div class="login_bar_pic">
        <img :src="titlePicSrc">
      </div>
      <div class="login_bar_title">
        学生信息管理系统
      </div>
      <div style="position:absolute;top:0;right:0;">
        <v-icon v-if="userType==='student'" large style="height:80px;width:80px;" dark @click="tostudentpage">mdi-school</v-icon>
        <v-icon v-if="userType==='admin'" large style="height:80px;width:80px;" dark @click="tobasicinfo">mdi-school</v-icon>
        <v-icon v-if="userType==='admin'" large style="height:80px;width:80px;" dark @click="topartyaffair">work</v-icon>
        <v-icon v-if="userType==='admin'" large style="height:80px;width:80px;" dark @click="tostatistics">pie_chart</v-icon>
        <v-icon v-if="userType==='admin' || userType==='teacher'" large style="height:80px;width:80px;" dark @click="toaddprize">military_tech</v-icon>
        <v-icon v-if="userType==='admin' || userType==='teacher'" large style="height:80px;width:80px;" dark @click="toprizeevaluation">emoji_events</v-icon>
        <v-icon v-if="userType==='student'" large style="height:80px;width:80px;" dark @click="toapplyprize">inventory</v-icon>
        <v-icon v-if="userType==='admin' || userType==='teacher'" large style="height:80px;width:80px;" dark @click="toprizecandidate">inventory</v-icon>
        <v-icon v-if="userType==='student'" large style="height:80px;width:80px;" dark @click="toaskforleave">timer</v-icon>
        <v-icon v-if="userType==='admin'" large style="height:80px;width:80px;" dark @click="tocancelleave">timer</v-icon>
        <v-icon v-if="userType==='admin'" large style="height:80px;width:80px;" dark @click="tospecialstory">palette</v-icon>
      </div>
    </div>
    <div class="basic_info_title">
      <v-icon large style="height:32px;width:32px;position:relative;top:-7px;left:-20px;" dark>{{iconvalue}}</v-icon>
      <div class="basic_info_title_text" v-text="titlevalue">
        {{titlevalue}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundComponent',
  data(){
    return{
      userType: "",
      titlePicSrc:require('../assets/login/bhcslogo.png'),
      basicInfoBackgroundSrc: require('../assets/basicinfo/u15.jpg'),
    }
  },
  mounted() {
    var token = localStorage.getItem('Authorization');
    //区分老师、学生、管理员的方式，是在token后加商定好的字符串，
    // “Km0oQs7z1P” 学生 student
    // “z3DSlUv5a0” 老师 teacher
    // “aKuL82I3Mq” 管理员 admin
    var tokenLength = token.length;
    var suffix = token.substring(tokenLength-10,tokenLength);
    if(suffix === "Km0oQs7z1P"){
      //说明是学生
      this.userType = "student";
    }else if(suffix === "z3DSlUv5a0"){
      //说明是老师
      this.userType = "teacher";
    }else if(suffix === "aKuL82I3Mq"){
      //说明是管理员
      this.userType = "admin";
    }
  },
  props: {
    titlevalue: {
      type: String,
      default: null
    },
    iconvalue:{
      type: String,
      default: 'mdi-school'
    }
  },
  methods: {
    tostudentpage(){
      this.$router.push('/studentpage');
    },
    tobasicinfo(){
      this.$router.push('/basicinfo');
    },
    topartyaffair(){
      this.$router.push('/partyaffair');
    },
    tostatistics(){
      this.$router.push('/statistics');
    },
    toaddprize(){
      this.$router.push('/addprize');
    },
    toprizeevaluation(){
      this.$router.push('/prizeevaluation');
    },
    toapplyprize(){
      this.$router.push('/applyprize');
    },
    toprizecandidate(){
      this.$router.push('/prizecandidate');
    },
    toaskforleave(){
      this.$router.push('/askforleave');
    },
    tocancelleave(){
      this.$router.push('/cancelleave');
    },
    tospecialstory(){
      this.$router.push('/specialstory');
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
.login_bar{
  position: absolute;
  top:0;
  width:100%;
  height:80px;
  background-color: rgba(128, 152, 192, 0.6);
}
.login_bar_pic{
  display: inline-block;
}
.login_bar_title{
  position: absolute;
  margin-top: 20px;
  display: inline-block;
  color: #E1E4E9;
  font-weight:700;
  font-size: 32px;
  margin-left: 20px;
}
.basic_info_title{
  position: absolute;
  top:130px;
  left: 50%;
  transform: translate(-50%);
}
.basic_info_title_text{
  display: inline-block;
  font-size: 32px;
  color: #E1E4E9;
  font-weight: 700;
}
</style>
