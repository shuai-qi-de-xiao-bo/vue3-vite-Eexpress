<script setup>
import { ref, reactive, onMounted } from "vue";
import { getProfile, update, add } from "@/api/profile.js";
import { upload } from "@/api/index.js";
import Message from "element-plus/lib/components/message";

const formRef = ref(null);

const isAdd = ref(false);

const form = ref({
  name: "",
  head: "",
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "姓名不能为空",
      trigger: ["blur"],
    },
  ],
  head: [
    {
      required: true,
      message: "头像不能为空",
      trigger: ["blur"],
    },
  ],
  work: [
    {
      required: true,
      message: "职业不能为空",
      trigger: ["blur"],
    },
  ],
  description: [
    {
      required: true,
      message: "简介不能为空",
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
          getProfileConfig();
        })
        .catch((res) => {
          loading.value = false;
          Message.error(res.msg);
        });
    }
  });
};

const getProfileConfig = () => {
  getProfile()
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
      form.value.head = res.src;
      Message.success(res.msg);
    })
    .catch((res) => {
      uploadLoading.value = false;
      Message.error(res.msg);
    });
};

onMounted(() => {
  getProfileConfig();
});
</script>

<template>
  <el-form
    style="width: 100%"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="80px"
    status-icon
  >
    <el-card>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card>
            <template #header>
              <div>
                <span>首页</span>
              </div>
            </template>
            <el-form-item label="开发中...">
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header>
              <div>
                <span>个人主页</span>
              </div>
            </template>
            <el-form-item label="头像" prop="head">
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
                v-if="form.head"
                style="width: 100px; height: 100px"
                :src="form.head"
                fit="contain"
                :preview-src-list="[form.head]"
              >
                <template #placeholder>
                  <div class="image-slot" v-loading="true"></div>
                </template>
              </el-image>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职业" prop="work">
              <el-input v-model="form.work" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="description">
              <el-input
                v-model="form.description"
                autocomplete="off"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="submit" :loading="loading"
          >确定</el-button
        >
      </el-form-item>
    </el-card>
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