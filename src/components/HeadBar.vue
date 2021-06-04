<template>
  <div id="headBar">
    <div class="head_bar_pic">
      <img :src="headBarPicSrc">
    </div>
    <div class="head_bar_title">
      学生信息管理系统
    </div>
    <div class="head_bar_icons">
      <!-- 学校 (组合) -->
      <div id="u25" class="ax_default" data-label="学校" data-left="1511" data-top="20" data-width="48" data-height="40">

        <!-- Unnamed (形状) -->
        <div id="u26" class="ax_default _形状2">
          <img id="u26_img" class="img " :src="schoolPicSrc1"/>
          <div id="u26_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>

        <!-- Unnamed (形状) -->
        <div id="u27" class="ax_default _形状2">
          <img id="u27_img" class="img " :src="schoolPicSrc2"/>
          <div id="u27_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>
      </div>
      <!-- 公文包 (形状) -->
      <div id="u21" class="ax_default _形状2" data-label="公文包">
        <img id="u21_img" class="img " :src="packagePicSrc1"/>
        <div id="u21_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- 饼图 (组合) -->
      <div id="u22" class="ax_default" data-label="饼图" data-left="1668" data-top="20" data-width="38" data-height="40">

        <!-- Unnamed (形状) -->
        <div id="u23" class="ax_default _形状2">
          <img id="u23_img" class="img " :src="cakePicSrc1"/>
          <div id="u23_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>

        <!-- Unnamed (形状) -->
        <div id="u24" class="ax_default _形状2">
          <img id="u24_img" class="img " :src="cakePicSrc2"/>
          <div id="u24_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>
      </div>
      <!-- 奖杯 (形状) -->
      <div id="u28" class="ax_default _形状2" data-label="奖杯">
        <img id="u28_img" class="img " :src="prizePicSrc1"/>
        <div id="u28_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadBar',
  data(){
    return{
      headBarPicSrc: require('../assets/login/u3.svg'),
      schoolPicSrc1: require('../assets/basicinfo/u26.svg'),
      schoolPicSrc2: require('../assets/basicinfo/u27.svg'),
      packagePicSrc1: require('../assets/basicinfo/公文包_u21.svg'),
      cakePicSrc1: require('../assets/basicinfo/u23.svg'),
      cakePicSrc2: require('../assets/basicinfo/u24.svg'),
      prizePicSrc1: require('../assets/basicinfo/奖杯_u28.svg'),
    }
  }
}
</script>

<style scoped>
#headBar{
  width: 100%;
  height: 80px;
  background-color: rgba(128, 152, 192, 0.6);
}
.head_bar_pic{
  display: inline-block;
}
.head_bar_title{
  position: absolute;
  margin-top: 20px;
  display: inline-block;
  color: #E1E4E9;
  font-weight:700;
  font-size: 32px;
  margin-left: 20px;
}
.head_bar_icons{
  display: inline-block;
  height: 80px;
  position: absolute;
  right:350px;  
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
  left:92px;
  top:20px;
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
#u22 {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  height:0px;
}
#u23_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:34px;
  height:37px;
}
#u23 {
  border-width:0px;
  position:absolute;
  left:172px;
  top:23px;
  width:34px;
  height:37px;
  display:flex;
}
#u23 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u23_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
#u24_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:19px;
  height:26px;
}
#u24 {
  border-width:0px;
  position:absolute;
  left:168px;
  top:20px;
  width:19px;
  height:26px;
  display:flex;
}
#u24 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u24_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
#u25 {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  height:0px;
}
#u26_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:34px;
  height:19px;
}
#u26 {
  border-width:0px;
  position:absolute;
  left:17px;
  top:41px;
  width:34px;
  height:19px;
  display:flex;
}
#u26 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u26_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
#u27_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:48px;
  height:34px;
}
#u27 {
  border-width:0px;
  position:absolute;
  left:11px;
  top:20px;
  width:48px;
  height:34px;
  display:flex;
}
#u27 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u27_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
#u28_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:43px;
  height:40px;
}
#u28 {
  border-width:0px;
  position:absolute;
  left:239px;
  top:20px;
  width:43px;
  height:40px;
  display:flex;
}
#u28 .text {
  position:absolute;
  align-self:center;
  padding:2px 2px 2px 20px;
  box-sizing:border-box;
  width:100%;
}
#u28_text {
  border-width:0px;
  word-wrap:break-word;
  text-transform:none;
  visibility:hidden;
}
</style>