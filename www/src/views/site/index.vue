<script setup>
import { ref, reactive, onMounted } from "vue";
import { getSite, update, upload, add } from "@/api/site.js";
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

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      (isAdd.value ? add : update)(form.value)
        .then((res) => {
          Message.success(res.msg);
          getSiteConfig();
        })
        .catch((res) => {
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
const uploadFile = (file) => {
  let formData = new FormData(); /** 文件上传 */
  formData.append("file", file.file);
  upload(formData)
    .then((res) => {
      form.value.background = res.src;
      Message.success(res.msg);
    })
    .catch((res) => {
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
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="uploadFile"
        accept=".jpg, .png, .jpeg"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="form.background"
          :preview-src-list="[form.background]"
        >
          <template #error>
            <div class="image-slot">
              <i class="el-icon-plus"></i>
            </div>
          </template>
        </el-image>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.image-slot {
  border: 1px dashed #ccc;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>