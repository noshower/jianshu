<template>
  <div>
    <div v-if="isLogin" id="login">
      <h1>简书</h1>
      <div class="form">
        <div class="login-item">
          <i><img src="../assets/nickname.png"></i>
          <input type="text"  placeholder="你的昵称" v-model="nickname">
        </div>
        <div class="login-item">
          <i><img src="../assets/photo.png"></i>
          <input type="number" placeholder="手机号" v-model="tel">
        </div>
        <div class="login-item">
          <i><img src="../assets/password.png"></i>
          <input type="password"  placeholder="设置密码" v-model="password">
        </div>
      </div>
      <button class="btn" v-on:click="login">注册</button>
      <div class="other">
        <p class="item1" v-on:click="isLogin=false;">已有账号登录</p>
        <p class="item2"></p>
        <p class="item3">随便看看</p>
      </div>
    </div>
    <div v-else="isLogin" id="enter">
      <h1>简书</h1>
      <div class="form">
        <div class="login-item">
          <i><img src="../assets/nickname.png"></i>
          <input type="number"  placeholder="手机号" v-model="tel">
        </div>
        <div class="login-item">
          <i><img src="../assets/password.png"></i>
          <input type="password"  placeholder="密码" v-model="password">
        </div>
      </div>
      <button class="btn" v-on:click="enter">登录</button>
      <div class="other">
        <p class="item1" v-on:click="isLogin=true;">新用户注册</p>
        <p class="item2"></p>
        <p class="item3">随便看看</p>
        <p class="item2"></p>
        <p class="item3">登录问题？</p>
      </div>
    </div>
  </div>
  
</template>
<script>
import Axios from 'axios';
import {baseUrl} from '../common/js/config.js';
export default {
  name: 'Login',
  data () {
    return {
          nickname:'',
          tel:'',
          password:'',
          isLogin:false
    }
  },
  methods:{
    login(){
      let url=baseUrl+'/user/signup';
      let nickname = this.nickname.trim();
      let tel=this.tel.trim();
      let password=this.password;
      if(nickname.length <1){
        alert('请输入用户名');
        return false;
      }else if(nickname.length>8){
        alert('用户名长度不能超过8');
        return false;
      }
      if(tel.length<1){
        alert('输入手机号');
        return false;
      }
      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))){
        alert('手机号不正确');
        return false;
      }
      if(password.length<6){
        alert('密码长度必须大于5');
        return false;
      } 
      Axios.post(url, {
          name:nickname,
          tel:tel,
          password:password
        }).then((res)=>{
          if(res.data.code !== 200){
            alert(res.data.message);
            this.isLogin=false;
          }else{
            alert('注册成功');

          }
      });
    },
    enter(){
      let url=baseUrl+'/user/enter';
      let tel=this.tel.trim();
      let password=this.password;
      if(tel.length<1){
        alert('请输入手机号');
        return false;
      }
      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))){
        alert('手机号不正确');
        return false;
      }
      if(password.length<6){
        alert('密码长度必须大于5');
        return false;
      } 
       Axios.post(url, {
          tel:tel,
          password:password
        }).then((res)=>{
          if(res.data.code !== 200){
            alert(res.data.message);
            this.password = '';
          }else{
            alert(res.data.message);
            location.href="/#/main";
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../common/scss/base.scss';
body {
  background:white;
}
#login,#enter{
  padding:0 pxToRem(50);
  h1 {
    font-size:pxToRem(80);
    color:rgb(220,142,104);
    padding-top:pxToRem(200);
    padding-bottom:pxToRem(80);
  }
  .form {
      border:1px solid #ccc;
      border-radius:pxToRem(10);
      .login-item {
        width:100%;
        height:pxToRem(75);
        @extend %flexCenter;
        &:first-child{
          border-bottom:1px solid #ccc;
        }
        &:last-child{
          border-top:1px solid #ccc;
        }
          i {
            margin:0 pxToRem(20);
            font-size:0;
            img {
              height:pxToRem(30);
            }
          }
          input {
            height:pxToRem(30);
            font-size:pxToRem(30);
            line-height:1;
            @extend %flexItem;
          }
      }
  }
  .btn {
      width:100%;
      height:pxToRem(80);
      margin-top:pxToRem(30);
      font-size:pxToRem(30);
      line-height:pxToRem(40);
      background:rgb(156,210,148);
      color: white;
      outline: none;
      border: none;
    }
  .other {
    margin-top:pxToRem(20);
    @extend %flexCenter;
    .item1,.item3 {
      @extend %flexItem;
      padding:0 pxToRem(20);
    }
    .item1 {
      text-align:right;
      color:rgb(220,142,104);
    }
    .item2 {
      width:1px;
      height:pxToRem(20);
      -webkit-transform:scaleX(0.5);
      transform:scaleX(0.5);
      background:#ccc;
    }
    .item3 {
      text-align:left;
    }
  }
}
#enter {
  .form {
    .login-item{
    &:last-child{
      border-top:0;
    }
   }
  }
  .btn {
   background:rgb(150,199,229);
  }
  .other {
    .item1,.item3 {
      text-align:center;
    }
  }
}
</style>
