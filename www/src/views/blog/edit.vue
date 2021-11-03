<script setup>
import { ref, reactive } from "vue";
import { update } from "@/api/blog.js";
import Message from "element-plus/lib/components/message";
import WangEditor from "@/components/WangEditorVue3.vue";

const props = defineProps({
  form: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      content: "",
    }),
  },
});

const $emit = defineEmits(["close"]);

const formRef = ref(null);

const rules = reactive({
  title: [
    {
      required: true,
      message: "标题不能为空",
      trigger: ["blur"],
    },
  ],
  content: [
    {
      required: true,
      message: "内容不能为空",
      trigger: ["blur"],
    }
  ],
});
const loading = ref(false);
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      update(props.form).then((res) => {
        loading.value = false;
        Message.success(res.msg);
        $emit("close", true);
      }).catch((res) => {
        loading.value = false;
        Message.error(res.msg);
      });
    }
  });
};
</script>

<template>
  <el-dialog :model-value="true" title="编辑" @close="$emit('close')">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <WangEditor
          v-model="form.content"
          :disabled="false"
          :isSourceCodeMode="false"
        />
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