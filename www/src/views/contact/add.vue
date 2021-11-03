<script setup>
import { ref, reactive } from "vue";
import { add } from "@/api/user.js";
import Message from "element-plus/lib/components/message";

defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const $emit = defineEmits(["close"]);

const formRef = ref(null);
const form = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: ["blur"],
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: ["blur"],
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[a-zA-Z]\w{5,14}$/.test(value)) {
          callback(new Error("密码以字母开头，长度在6-15位之间"));
        }
        callback();
      },
      trigger: ["change"],
    },
  ],
});
const loading = ref(false);
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      add(form)
        .then((res) => {
          loading.value = false;
          Message.success(res.msg);
          $emit("close", true);
        })
        .catch((res) => {
          loading.value = false;
          Message.error(res.msg);
        });
    }
  });
};
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增" @close="$emit('close')">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      status-icon
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
</style>