
<template>
  <form class="edit form-inline" ref="formBody">
    <template v-for="(item, index) in dynamicEdits.list">
      <div
        class="form-group"
        :style="'width:' + (item.lineType == 'single' ? '100% ': '50%')+';margin-bottom: 10px;'"
        :key="rowItem.key+index"
        v-for="rowItem in item.rowList"
      >
        <label class="v_mark control-label">
          <span>{{rowItem.isRequest ? '*' : ''}}</span>
          {{rowItem.type == 'v_doubleSelect'?rowItem.list[0].title+':':rowItem.title + ':'}}
        </label>
        <component
          :class="rowItem.type == 'v_doubleSelect' ? 'leftmove' : ''"
          v-bind:is="rowItem.type"
          ref="child"
          v-bind:options="rowItem"
          style="width: 50%;display: inline;"
          @componentValueChange="componentValueChange"
          @componentMountBefore="componentMountBefore"
          @componentMountAfter="componentMountAfter"
        ></component>
      </div>
    </template>

    <div class="v_saveView">
      <button class="btn btn-primary v_saveBtn" @click="saveRecord">保存</button>
    </div>
  </form>
</template>


<style scope>
.leftmove .form-group.has-error .help-block {
  margin-left: 0px !important;
}
.edit {
  padding-top: 30px;
  padding-bottom: 30px;
}
.v_mark {
  line-height: 40px;
  min-width: 150px;
  text-align: right;
  padding-right: 20px;
}
.v_mark span {
  color: red;
}
.v_saveView {
  position: relative;
  margin-top: 50px;
  width: 100%;
  height: 50px;
  text-align: center;
}
.v_saveBtn {
  left: 0;
  right: 0;
  width: 80px;
  height: 40px;
  margin: auto;
}
.bv-form .help-block {
  margin-left: 150px !important;
}
.has-error .control-label {
  color: black !important;
}
/* .leftmove .form-group {
  margin-right: 30px;
} */
.has-success .leftmove .form-group.has-error .bootstrap-select .dropdown-toggle {
  border-color: #ccc;
}
.leftmove .form-group.has-error .help-block {
  display: none !important;
}
</style>

<script>
import v_text from "@c/dynamicSearch/text/text";
import v_textarea from "@c/dynamicSearch/text/textarea";
import v_datetime from "@c/dynamicSearch/datetime/datetime";
import v_singleSelect from "@c/dynamicSearch/select/singleSelect";
import v_doubleSelect from "@c/dynamicSearch/select/doubleSelect";
import v_upload from "@c/dynamicSearch/upload/upload.vue"
import { export_json_to_excel } from "@/excel/Export2Excel.js";

var ComponentType = {
  doubleSelect: 'v_doubleSelect',
  singleSelect: 'v_singleSelect',
  text: 'v_text',
  dateSelect: 'v_datetime',
  textarea: 'v_textarea'
};
export default {
  data() {
    return {
      componentNum: 0, //统计当前组件数量 
      loadNum: 0, //已经渲染完成的组件数量
      validateArr: null //需要校验组件信息集
    };
  },
  // seleTableObj 需要编辑信息内容
  props: {
    dynamicEdits: {
      isRequest: true
    },
    seleTableObj: {
      type: Object,
      default: null,
    }
  },
  beforeMount() {
    this.cacularSelectNum();
  },
  mounted() {
    // 设置表格校验信息
    this.initValidate(this.validateArr);
    if(this.seleTableObj && !this.componentNum) {
      this.init();
    }
  },
  methods: {
    // 计算子控件的数量 &  收集需要校验的控件数组
    cacularSelectNum: function() {
      let _ = this;
      _.validateArr = [];
      this.dynamicEdits.list.map(item => {
        item.rowList.forEach(subItem => {
          subItem.isFromEdit = $.isEmptyObject(_.seleTableObj) ? false : true;
          _.componentNum++;
          if (subItem.list) {
            subItem.list.map(innerItem => {
              _.validateArr.push({
                key: innerItem.selectkey,
                validators: innerItem.validators ? innerItem.validators : {}
              });
            });
          } else {
            _.validateArr.push({
              key:
                subItem.type == ComponentType.singleSelect
                  ? subItem.selectkey
                  : subItem.key,
              validators: subItem.validators ? subItem.validators : {}
            });
          }
        });
      });
    },
    // 给组件赋初始值
    init: function() {
      let _ = this;
      this.$refs.child.forEach(item => {
        if (item.options.type == ComponentType.doubleSelect) {
          for (var key in item.$refs.selectList) {
            let subItem = item.$refs.selectList[key];
            subItem.options.key &&
              subItem.setValue(_.seleTableObj[subItem.options.selectkey]);
          }
        } else if (item.options.type == ComponentType.singleSelect) {
          item.setValue(_.seleTableObj[item.options.selectkey]);
        } else {
          let currentValue = _.seleTableObj[item.options.key];
          currentValue && item.setValue(currentValue);
        }
      });
    },
    // 组件值发生变化
    componentValueChange: function(element) {
      this.$emit('componentValueChange',element);
    },
    // 组件渲染之前
    componentMountBefore: function(element) {
      this.$emit('componentMountBefore',element);
    },
    // 子控件渲染完成回调   不包含v_text
    componentMountAfter: function(element) {
      if ($.isEmptyObject(this.seleTableObj)) return;
      this.loadNum++;
      this.componentNum == this.loadNum && this.init();
      this.$emit('componentMountAfter',element);
    },
    // 点击保存按钮
    saveRecord: function() {
      let _ = this;
      // 开启校验
      $(this.$refs.formBody)
        .data("bootstrapValidator")
        .validate();
      var flag = $(this.$refs.formBody)
        .data("bootstrapValidator")
        .isValid();
      if (!flag) return;

      // 收集param
      var result = {};
      if (!$.isEmptyObject(_.seleTableObj)) {
        result = _.seleTableObj;
      }
      this.$refs.child.forEach(item => {
        if (item.options.type == ComponentType.doubleSelect) {
          for (var key in item.val) {
            result[key] = item.val[key];
          }
        } else if (item.options.type == ComponentType.dateSelect) {
          result[item.options.key] = item.$refs.datetime.value;
        } else if(item.options.type == ComponentType.singleSelect){
          // result[item.options.key] = item.val();
          result[item.options.key] = item.getValue();
        }else{
          result[item.options.key] = item.val;
        }
      });
      this.submitReq(result);
    },
    // 发送保存数据的请求
    submitReq: function(result) {
      // this.dynamicEdits.apiUrl
      let _ = this;
      if ('params' in this.dynamicEdits) {
        $.extend(result,this.dynamicEdits.params);
      }
      // debugger;
      this.dynamicEdits.apiUrl(result).then(res => {
        // debugger;
        if (res.success) {
          // 关闭所有页面层
          layer.closeAll("page");
          layer.alert("数据保存成功");
          _.$emit("editCallback", _.seleTableObj ? "edit" : "add", result);
        } else {
          layer.alert(res.message);
        }
      });
    },
    // 设置表格校验信息
    initValidate: function(validateArr) {
      let fieldArr = {};
      this.validateArr.map(item => {
        fieldArr[item.key] = { validators: item.validators };
      });
      this.validator = $(this.$refs.formBody).bootstrapValidator({
        fields: fieldArr
      });
    }
  },
  components: { v_text, v_datetime, v_singleSelect, v_doubleSelect, v_textarea, v_upload }
};
</script>

