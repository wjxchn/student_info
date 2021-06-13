<template>
  <div id="login">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt=""/>
    </div>
    <div class="login_bar">
      <div class="login_bar_pic">
        <img :src="titlePicSrc">
      </div>
      <div class="login_bar_title">
        学生信息管理系统
      </div>
    </div>
    <v-card
        class="mx-auto login_card"
    >
      <v-card-text>
        <div class="login_title">
          请登录
        </div>
      </v-card-text>
      <div class="login_form">
        <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
        >
          <div class="login_label">用户名</div>
          <v-text-field
              v-model="stuNum"
              :rules="nameRules"
              label="请输入学号（不区分大小写）"
              width="100%"
              height="20px"
              single-line
              required
              outlined
              dense
              style="border-radius:20px;"
          ></v-text-field>
          <div class="login_label">密码</div>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isPasswordShow ? 'text' : 'password'"
              label="请输入密码"
              width="100%"
              height="20px"
              single-line
              required
              outlined
              dense
              style="border-radius:20px;"
              @click:append="isPasswordShow = !isPasswordShow"
          ></v-text-field>
          <div class="text-center">
            <v-btn
                :disabled="!valid"
                color="#0D4C7F"
                class="mr-4 login_button"
                @click="login"
                style="color:white;"
            >
              登录
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'Login',
  data() {
    return {
      imgSrc: require('../assets/login/u0.jpg'),
      titlePicSrc: require('../assets/login/bhcslogo.png'),
      isPasswordShow: false,
      valid: true,
      stuNum: '',
      nameRules: [
        v => !!v || '必须输入用户名',
        v => (v && v.length >= 3 && v.length <= 10) || '用户名的长度必须大于等于3且小于等于10',
      ],
      password: '',
      passwordRules: [
        v => !!v || '必须输入密码',
        v => (v && v.length >= 6 && v.length <= 18) || '密码的长度必须大于等于6且小于等于18',
      ],
      lazy: false,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },

    login() {
      this.validate();

      axios({
        url: '/api/login',
        method: 'post',
        params: {
          stuNum: this.stuNum,
          password: this.password
        }
      }).then(res => {
        var flag = res.data.flag;
        // console.log("登录成功？", res.data);
        if (flag) {
          // localStorage.setItem("Authorization", res.data.auth+"-"+res.data.stuNum+"-"+res.data.stuName+"-"+res.data.stuSex);
          localStorage.setItem("Authorization", res.data.auth);
          if(localStorage.getItem('Authorization').length>=42){
            //这是教师
            window.location.href = '/#/basicinfo';
          }else{
            window.location.href = '/#/studentpage';
          }
        } else {
          window.location.href = '/#/login';
        }
      })
    }
  },
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  min-width: 1200px;
  min-height: 700px;
  position: absolute;
}

.login_bar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(128, 152, 192, 0.6);
}

.login_bar_pic {
  display: inline-block;
}

.login_bar_title {
  position: absolute;
  margin-top: 20px;
  display: inline-block;
  color: #E1E4E9;
  font-weight: 700;
  font-size: 32px;
  margin-left: 20px;
}

.login_card {
  width: 25%;
  position: absolute;
  right: 10%;
  top: 30%;
  background-color: rgba(235, 236, 241, 0.8);
  border-radius: 20px;
  padding: 20px;
}

.login_title {
  color: #0D4C7F;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 2px;
}

.login_form {
  width: 80%;
  position: relative;
  margin: 20px auto;
}

.login_label {
  color: #0D4C7F;
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login_button {
  width: 35%;
  border-radius: 20px;
}
</style>
