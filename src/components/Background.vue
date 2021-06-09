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
    </div>
    <div class="basic_info_title">
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
      titlePicSrc:require('../assets/login/bhcslogo.png'),
      basicInfoBackgroundSrc: require('../assets/basicinfo/u15.jpg'),
    }
  },
  props: {
    titlevalue: {
      type: String,
      default: null
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
