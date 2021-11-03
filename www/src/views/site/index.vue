<script setup>
import { ref, reactive, onMounted } from "vue";
import { getSite, update, add } from "@/api/site.js";
import { upload } from "@/api/index.js";
import Message from "element-plus/lib/components/message";

const formRef = ref(null);

const isAdd = ref(false);

const form = ref({
  title: "",
  background: "",
});

const rules = reactive({
  title: [
    {
      required: true,
      message: "网站标题不能为空",
      trigger: ["blur"],
    },
  ],
  background: [
    {
      required: true,
      message: "网站背景不能为空",
      trigger: ["blur"],
    },
  ],
});
const loading = ref(false);
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      (isAdd.value ? add : update)(form.value)
        .then((res) => {
          loading.value = false;
          Message.success(res.msg);
          getSiteConfig();
        })
        .catch((res) => {
          loading.value = false;
          Message.error(res.msg);
        });
    }
  });
};

const getSiteConfig = () => {
  getSite()
    .then((res) => {
      isAdd.value = false;
      form.value = res.data;
    })
    .catch((res) => {
      isAdd.value = true;
      Message.error(res.msg);
    });
};

// 文件上传
const uploadLoading = ref(false);
const uploadFile = (file) => {
  let formData = new FormData(); /** 文件上传 */
  formData.append("file", file.file);
  uploadLoading.value = true;
  upload(formData)
    .then((res) => {
      uploadLoading.value = false;
      form.value.background = res.src;
      Message.success(res.msg);
    })
    .catch((res) => {
      uploadLoading.value = false;
      Message.error(res.msg);
    });
};

onMounted(() => {
  getSiteConfig();
});
</script>

<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="80px"
    status-icon
  >
    <el-form-item label="站点标题" prop="title">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="站点背景" prop="background">
      <el-upload
        v-loading="uploadLoading"
        element-loading-text="文件上传中..."
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="uploadFile"
        accept=".jpg, .png, .jpeg"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
      <el-image
        v-if="form.background"
        style="width: 100px; height: 100px"
        :src="form.background"
        fit="contain"
        :preview-src-list="[form.background]"
      >
        <template #placeholder>
          <div class="image-slot" v-loading="true"></div>
        </template>
      </el-image>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.image-slot {
  border: 1px dashed #ccc;
  box-sizing: border-box;
  height: 100%;
  display: flex;
}
</style>