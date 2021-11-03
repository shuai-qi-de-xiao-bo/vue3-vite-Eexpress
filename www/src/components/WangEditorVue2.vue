<template>
  <div>
    <div :id="eleId"></div>
  </div>
</template>

<script>
import { upload } from "@/api/index.js";
export default {
  /** 组件调用方式
   * <wang-editor v-model="xxx"></wang-editor>
   */
  name: "WangEditor",

  props: {
    modelValue: {
      type: String,
      default: "",
    }, // 默认显示内容

    disabled: {
      type: Boolean,
      default: false,
    }, // 是否禁用

    isSourceCodeMode: {
      type: Boolean,
      default: false,
    }, // 是否默认显示源码模式
  },

  data() {
    return {
      editor: null, // 编辑器实例
      eleId: "editor" + Math.round(Math.random() * 10000000000),
      editorContent: "",
    };
  },

  watch: {
    value(val) {
      if (this.editorContent !== val) {
        this.editor && this.editor.txt.html(this.unescapeHTML(val)); // 设置富文本编辑器初始化显示内容;
      }
    },
  },

  mounted() {
    /** 初始化富文本编辑器 */
    const E = window.wangEditor;
    const { BtnMenu } = E;
    // 第一，菜单 class ，Button 菜单继承 BtnMenu class
    class AlertMenu extends BtnMenu {
      constructor(editor) {
        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = E.$(
          `<div class="w-e-menu" data-title="源码编辑">
              源码
            </div>`
        );
        super($elem, editor);
      }
      // 菜单点击事件
      clickHandler() {
        alert("hello world");
      }
      // 菜单是否被激活（如果不需要，这个函数可以空着）
      tryChangeActive() {}
    }
    // 菜单 key
    const menuKey = "alertMenuKey";

    const editor = new E("#" + this.eleId);

    // 注册菜单
    editor.menus.extend(menuKey, AlertMenu);

    // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
    editor.config.menus = editor.config.menus.concat(menuKey);

    // 配置 onchange 回调函数
    editor.config.onchange = (val) => {
      this.editorContent = val;
      this.$emit("update:modelValue", val);
    };

    // 配置自定义文件上传
    editor.config.customUploadImg = (files, insert) => {
      // files是选中的文件列表, insert是获取文件url后，插入到编辑器的方法
      this.handleUpload(files, insert);
    };

    // 注册完菜单，再创建编辑器，顺序很重要！！
    editor.create();
  },

  methods: {
    /** @description 扩展一个源码菜单 */
    extendsSourcecodeMenu(E, editor) {
      const { BtnMenu } = E;
      // 菜单class，Button 菜单继承 BtnMenu class
      class SourcecodeMenu extends BtnMenu {
        constructor(editor) {
          // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
          const $elem = E.$(
            `<div class="w-e-menu" data-title="编辑源码">
                <span>源码</span>
            </div>`
          );
          super($elem, editor);
        }
        // 菜单点击事件
        clickHandler() {
          changeMode;
        }
      }
      const sourcecodeMenuKey = "sourcecodeMenuKey";
      editor.menus.extend(sourcecodeMenuKey, SourcecodeMenu);
      editor.config.menus.unshift(sourcecodeMenuKey);
    },

    // 切换源码显示模式
    changeMode() {
      this.isSourceCodeMode;
    },

    /** 获取菜单栏的ishtml属性值 */
    getIsHtml(editor) {
      return editor.$toolbarElem.elems[0].getAttribute("ishtml") === "true";
    },

    /** @description 显示/隐藏其他菜单 */
    disabledOtherMenu(ele, type, editor) {
      let childList = editor.$toolbarElem.elems[0].childNodes;
      for (let i = 0; i < childList.length; i++) {
        if (childList[i].nodeName === "DIV" && childList[i] !== ele) {
          childList[i].style.display = type ? "none" : "block";
        }
      }
    },

    /** @description 获取富文本编辑器的html内容 */
    getEditorContentHtml() {
      return this.editor.txt.html();
    },

    /** @description 获取富文本编辑器的纯文本内容 */
    getEditorContentText() {
      return this.editor.txt.text();
    },

    /** @description 图片上传 */
    handleUpload(files, insert) {
      let file = files[0];
      let formData = new FormData();
      formData.append("file", file);
      upload(formData).then(
        (res) => {
          this.$message({
            type: "success",
            message: "图片上传成功!",
          });
          insert(res.data.data.id); // insert 是获取图片url后，插入到编辑器的方法
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
