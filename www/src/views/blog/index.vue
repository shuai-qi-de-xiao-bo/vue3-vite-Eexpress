<script setup>
import { ref, onMounted, reactive } from "vue";
import { getList, del, delMany } from "@/api/blog.js";
import addDialog from "./add.vue";
import editDialog from "./edit.vue";
import Message from "element-plus/lib/components/message";

const query = reactive({
  pageSize: 10,
  pageNum: 1,
  title: "",
});
const sizeChange = (val) => {
  query.pageSize = val;
  query.pageNum = 1;
  getTableData();
};
const currentChange = (val) => {
  query.pageNum = val;
  getTableData();
};
const total = ref(0);
const tableData = ref([]);
const loading = ref(false);
const getTableData = () => {
  loading.value = true;
  getList(query).then((res) => {
    loading.value = false;
    tableData.value = res.data;
    total.value = res.total;
  });
};
const search = () => {
  query.pageNum = 1;
  getTableData();
};

const addVisible = ref(false);
const openAdd = () => {
  addVisible.value = true;
};

const form = ref({});
const editVisible = ref(false);
const openEdit = (row) => {
  form.value = Object.assign({}, row);
  editVisible.value = true;
};

const closeAll = (isRefresh) => {
  addVisible.value = false;
  editVisible.value = false;
  if (isRefresh) {
    getTableData();
  }
};

const selectionList = ref([]);
const handleSelectionChange = (val) => {
  selectionList.value = val;
};
const delManyLoading = ref(false);
const deleteMany = () => {
  if (!selectionList.value.length) {
    return Message.warning("请先选择一条要操作的数据");
  }
  const _idArr = selectionList.value.map((ele) => ele._id);
  delManyLoading.value = true;
  delMany(_idArr)
    .then((res) => {
      delManyLoading.value = false;
      Message.success(res.msg);
      getTableData();
    })
    .catch((res) => {
      delManyLoading.value = false;
      Message.error(res.msg);
    });
};
const deleteOne = (row) => {
  loading.value = true;
  del(row._id)
    .then((res) => {
      Message.success(res.msg);
      getTableData();
    })
    .catch((res) => {
      loading.value = false;
      Message.error(res.msg);
    });
};

onMounted(() => {
  getTableData();
});
</script>

<template>
  <el-form size="mini" :inline="true" :model="query" class="demo-form-inline">
    <el-form-item label="标题">
      <el-input v-model="query.title" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search" :loading="loading"
        >查询</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="openAdd">新增</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="deleteMany" :loading="delManyLoading"
        >批量删除</el-button
      >
    </el-form-item>
  </el-form>

  <div class="el-table-container">
    <el-table
      v-loading="loading"
      size="mini"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :border="true"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="deleteOne(row)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="openEdit(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="el-pagination-contaniner">
    <el-pagination
      background
      layout="slot, prev, pager, next"
      :total="total"
      v-model:currentPage="query.pageNum"
      :page-size="query.pageSize"
      @current-change="currentChange"
    >
      <span class="el-pagination-contaniner_total">共 {{ total }} 条</span>
      <el-select v-model.sync="query.pageSize" @change="sizeChange" size="mini">
        <el-option
          v-for="item in [10, 20]"
          :key="item"
          :label="`${item}条/页`"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-pagination>
  </div>

  <addDialog v-if="addVisible" :dialogVisible="addVisible" @close="closeAll" />

  <editDialog
    v-if="editVisible"
    :form="form"
    :dialogVisible="editVisible"
    @close="closeAll"
  />
</template>

<style lang="less" scoped>
</style>