<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const bgColor = "#545c64";
const router = useRouter();
const store = useStore();
const loginOut = () => {
  store.commit("SET_USER_INFO", null);
  store.commit("SET_TOKEN", "");
  router.push("/login");
};
let dateTime = ref("");
const getTime = () => {
  setTimeout(getTime, 1000);
  let date = new Date();
  let y = date.getFullYear();
  let m = `0${date.getMonth()}`.slice(-2);
  let d = `0${date.getDate()}`.slice(-2);
  let h = `0${date.getHours()}`.slice(-2);
  let mm = `0${date.getMinutes()}`.slice(-2);
  let s = `0${date.getSeconds()}`.slice(-2);
  dateTime.value = `${y}-${m}-${d} ${h}:${mm}:${s}`;
};
onMounted(() => {
  getTime();
});
</script>

<template>
  <div>
    <span class="time">{{ dateTime }}</span>
    <el-button type="primary" @click="loginOut">退出登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid v-bind(bgColor);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
