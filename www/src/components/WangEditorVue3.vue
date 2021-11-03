<script setup>
import { ref, onMounted, reactive, watch, onBeforeUnmount } from "vue";
import Message from "element-plus/lib/components/message";
import { upload } from "@/api/index.js";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  }, // 默认显示内容

  disabled: {
    type: Boolean,
    default: false,
  }, // 是否禁用
});

/** @description 获取富文本编辑器的html内容 */
const getEditorContentHtml = () => {
  return editor.value.txt.html();
};

/** @description 获取富文本编辑器的纯文本内容 */
const getEditorContentText = () => {
  return editor.value.txt.text();
};

/** @description 解码为html格式 */
const unescapeHTML = (a) => {
  a = "" + a;
  return a
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
};

/** @description 转换html格式 */
const ecapeHTML = (a) => {
  a = "" + a;
  return a
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

/** @description 图片上传 */
const handleUpload = (files, insert) => {
  let file = files[0];
  let formData = new FormData();
  formData.append("file", file);
  upload(formData).then(
    (res) => {
      Message.success(res.msg);
      insert(res.src); // insert 是获取图片url后，插入到编辑器的方法
    },
    (error) => {
      Message.error(res.msg);
    }
  );
};

const $emit = defineEmits(["update:modelValue"]);
// 监听值变化同步富文本
// watch(
//   () => props.modelValue,
//   (val) => {
//     if (ecapeHTML(editor.value.txt.html()) !== val) {
//       if (isSourceCodeMode.value) {
//         // 设置富文本编辑器显示内容为源码显示
//         editor.value.$textElem.elems[0].innerText = val;
//       } else {
//         // 设置富文本编辑器显示内容为渲染后内容
//         editor.value.txt.html(unescapeHTML(val));
//       }
//     }
//   }
// );
const isSourceCodeMode = ref(false); // 是否源码模式
const editor = ref(null); // 编辑器实例
const eleId = "editor" + Math.round(Math.random() * 10 ** 10);
/** @description 扩展一个源码菜单 */
const extendsSourcecodeMenu = (E, editor) => {
  const { BtnMenu } = E;
  // 菜单class，Button 菜单继承 BtnMenu class
  class SourcecodeMenu extends BtnMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
      const $elem = E.$(
        `<div class="w-e-menu" data-title="编辑源码">
            源码
        </div>`
      );
      super($elem, editor);
    }
    // 菜单点击事件
    clickHandler(event) {
      let target = event.target;
      isSourceCodeMode.value = !isSourceCodeMode.value;
      let childList = editor.$toolbarElem.elems[0].childNodes;
      for (let i = 0; i < childList.length; i++) {
        if (childList[i].nodeName === "DIV" && childList[i] !== target) {
          childList[i].style.display = isSourceCodeMode.value
            ? "none"
            : "block";
        }
      }

      if (isSourceCodeMode.value) {
        // 设置富文本编辑器显示内容为源码显示
        editor.$textElem.elems[0].innerText = editor.txt.html();
      } else {
        // 设置富文本编辑器显示内容为渲染后内容
        editor.txt.html(unescapeHTML(editor.txt.html()));
      }
    }
    // 菜单是否被激活（如果不需要，这个函数可以空着，不能删除）
    tryChangeActive() {}
  }
  const sourcecodeMenuKey = "sourcecodeMenuKey";
  editor.menus.extend(sourcecodeMenuKey, SourcecodeMenu);
  editor.config.menus.unshift(sourcecodeMenuKey); // 将菜单添加到第一个
};
onMounted(() => {
  /** 初始化富文本编辑器 */
  const E = window.wangEditor;
  editor.value = new E("#" + eleId);

  extendsSourcecodeMenu(E, editor.value);

  const config = editor.value.config;

  // 配置onchange回调函数
  config.onchange = (val) => {
    $emit("update:modelValue", unescapeHTML(val));
  };

  // 配置文件上传
  config.customUploadImg = (files, insert) => {
    handleUpload(files, insert); // files是选中的文件列表, insert是获取文件url后，插入到编辑器的方法
  };

  // 创建编辑器
  editor.value.create();
  editor.value.txt.html(unescapeHTML(props.modelValue));
  props.disabled && editor.value.disable(); // 是否禁用编辑器
});

onBeforeUnmount(() => {
  editor.value.destroy();
  editor.value = null;
});
</script>

<script>
export default {
  /** 组件调用方式
   * <wang-editor v-model="xxx"></wang-editor>
   */
  name: "WangEditor",
};
</script>

<template>
  <div :id="eleId"></div>
</template>
