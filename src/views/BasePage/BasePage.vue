<template>
  <div>
    <div class="box box-default">
      <div class="box-body">
        <!-- box-body-resizer -->
        <form class="form-inline" id="search-query" style="display: inline-block;
    width: 100%;">
          <div class="search-bar" style="float:left;width:99%;position: relative;">
            <vSearch
              ref="searchModule"
              v-bind:dynamicControls="searchOptions.search_controls"
              v-bind:exportOptions="exportOptions"
              v-bind:searchOptions="searchOptions.searchOptions"
              v-bind:seleFunc="searchOptions.seleFunc"
              @callback="search"
              style="float:left"
            ></vSearch>
            <br>
          </div>
        </form>

        <div v-if="buttonOptions.length" style="position: relative;height: 60px;">
          <vButtons :buttonOptions="buttonOptions"></vButtons>
        </div>
        <vEditTable
          v-if="isEdit"
          id="pop"
          ref="editModule"
          :dynamicEdits="editOptions.dynamicEdits"
          :seleTableObj="seleTableObj"
          @editCallback="editCallback"
          @componentValueChange="componentValueChange"
          @componentMountBefore="componentMountBefore"
          @componentMountAfter="componentMountAfter"
        ></vEditTable>

        <vTable ref="table" :option="tableOption" @rowBlock="rowClick"></vTable>
        <div id="downloaddiv" style="opaticy: 0"></div>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from "@c/tables/table";
import vSearch from "@c/dynamicSearch/dynamic_Search";
import vEditTable from "@c/edit_table";
import vButtons from "@c/buttons";

import moment from "moment";
import config from "@/config/index";
import { pageTool } from "@/js/util.js";

export default {
  data() {
    var _ = this;
    return {
      isEdit: false,
      seleTableObj: {} // 选中的表单行数据
    };
  },
  // props: ["searchOptions", "buttonOptions", "editOptions", "tableOption"],
  props: {
    searchOptions: {
      type: Object,
      default: () => {}
    },
    buttonOptions: {
      type: Array,
      default: () => []
    },
    editOptions: {
      type: Object,
      default: () => {}
    },
    tableOption: {
      type: Object,
      default: () => {}
    }
  },

  beforeMount() {
    let _ = this;
    !$.isEmptyObject(this.buttonOptions) &&
      this.buttonOptions.map(item => {
        if (item.key == "add") {
          item.method = function() {
            _.showAddRecordModal();
          };
        }
      });
    this.handleText();
  },

  computed: {
    exportOptions: function() {
      return {
        id: this.tableOption.tableId,
        name: this.tableOption.tableName,
        url: this.searchOptions.exportUrl
      };
    }
  },
  mounted: function() {},
  methods: {
    // 如果给列设置宽度，超出部分文字隐藏显示
    handleText: function() {
      this.tableOption.columns.map(item => {
        if ("width" in item) {
          item.cellStyle = function(value, row, index) {
            // 设置超过行宽以省略号显示
            return {
              css: {
                overflow: "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                display: "inline-block"
              }
            };
          };
          item.formatter = function(value, row, index) {
            var span = document.createElement("span");
            span.setAttribute("title", value);
            span.innerHTML = value;
            return span.outerHTML;
          };
        }
      });
    },
    rowClick: function(rowItem, element) {
      let _ = this;
      // debugger;
      let currentAction = _.searchUrl(element);
      if (!currentAction.url) {
        _.$emit("rowBlock", rowItem, element, _);
        return;
      }

      let param = {};
      param[_.tableOption.uniqueId] = rowItem[_.tableOption.uniqueId];
      $.extend(param, currentAction.params);

      currentAction.url(param).then(res => {
        // debugger;
        switch (element.id) {
          case "tableEdit":
            {
              _.seleTableObj = res.result;
              _.showAddRecordModal();
            }
            break;
          // case "tablePause":
          //   {
          //     _.$refs.table.operation("refresh");
          //   }
          //   break;
          case "tableDownload":
            {
              // location.href = res.result.uploadUrl;
              // window.open(res.result.uploadUrl);
              var html =
                '<a id="download-file" href="data:text/xml;charset=utf-8,' +
                encodeURIComponent(res.result.uploadUrl) +
                '" download="99">下载</a>';
              // var html = '<a id="download-file" href=' + res.result.uploadUrl + ' download="5cd1e027d74f49a88c70a23a5e7b1550.Xml">下载</a>';
              $("#downloaddiv").html(html);
              $("#download-file")[0].click();
            }
            break;
          default:
            {
              _.refreshTable();
              _.$emit("rowBlock", rowItem, element, _);
              if (currentAction.successTip) {
                layer.alert(currentAction.successTip);
              }
            }
            break;
        }
      });
    },
    componentValueChange: function(element) {
      this.$emit("componentValueChange", element, this);
    },
    componentMountBefore: function(element) {
      this.$emit("componentMountBefore", element, this);
    },
    componentMountAfter: function(element) {
      // debugger;
      this.$emit("componentMountAfter", element, this);
    },
    searchUrl: function(element) {
      for (let i = 0; i < this.tableOption.actions.length; i++) {
        let actionItem = this.tableOption.actions[i];
        if (actionItem.key == element.id) {
          return actionItem;
        }
      }
    },
    // 动态搜索回调
    search: function(params) {
      console.log(params);
      this.refreshTable(params);
    },
    // 新建 & 编辑表单记录完成后的回调事件
    editCallback: function(type, params) {
      // type = add   type = edit
      // this.$refs.table.tableOption.url = this.$refs.table.tableOption.url;
      this.$refs.table.operation("refresh");
    },
    // 刷新表单
    refreshTable: function(params) {
      // this.$refs.table.tableOption.url =
      // config.pgyerApiUrl + ShellApi.GetAppInfoList.options.url;
      // this.$refs.table.tableOption.url = this.$refs.table.tableOption.url;
      this.$refs.table.tableOption.params = params;
      this.$refs.table.operation("refresh");
    },
    // 显示新建 & 编辑表单记录弹框
    showAddRecordModal: function() {
      let _ = this;
      _.isEdit = true;
      _.$nextTick(() => {
        _.layerId = layer.open({
          type: 1,
          title: _.seleTableObj ? "编辑记录" : "添加记录",
          maxmin: false,
          area: ["70%", "70%"],
          content: $("#pop"),
          end: function() {
            _.isEdit = false;
            _.seleTableObj = {};
          }
        });
      });
    }
  },

  components: { vTable, vSearch, vEditTable, vButtons }
};
</script>
<style>
table tr td {
  border: 1px solid #f4f4f4;
}
.datetimepicker {
  z-index: 21212121 !important;
}
.fixed-table-body {
  overflow: hidden;
}
</style>

