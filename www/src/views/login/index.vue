<script setup>
import { onMounted } from "vue";
import loginControl from "./login.js";
import captchaControl from "./captcha.js";

const { captchaLoading, captchaSrc, getCaptchaSrc } = captchaControl();
const { loginRef, loginForm, loginRules, loginSubmit } = loginControl(getCaptchaSrc);
onMounted(() => {
  getCaptchaSrc();
});
</script>

<template>
  <div class="login-form">
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      ref="loginRef"
      label-width="100px"
    >
      <el-form-item label="账户" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input v-model="loginForm.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8" v-loading="captchaLoading">
            <el-image :src="captchaSrc" class="captcha" @click="getCaptchaSrc"></el-image>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-form {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.captcha {
  height: 40px;
  width: 100%;
  cursor: pointer;
}
</style>
