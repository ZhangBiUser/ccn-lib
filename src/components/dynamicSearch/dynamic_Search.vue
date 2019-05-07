
<template>
  <div>
    <div class="form-group last-group">
      <template v-for="item in dynamicControls">
        <div class="form-group" v-if="item.type!='br'" :key="item.key">
          <component v-bind:is="item.type" ref="child" v-bind:options="item"></component>
        </div>
        <br v-if="item.type=='br'" :key="item.key">
      </template>
    </div>
    <div style="position: absolute;right: 0px;bottom: 10px;">
      <div :id="item.key" v-for="item in btnList" :key="item.key" class="form-group pull-right">
        <button type="button" class="btn btn-primary" @click="item.method(item)">
          <i :class="item.iconStr ? 'fa ' + item.iconStr : ''"></i>
          {{item.title}}
        </button>
      </div>

      <div v-if="showFucs.export" class="form-group pull-right">
        <button type="button" class="btn btn-primary" @click="export2Excel">
          <i class="fa fa-download"></i>
          导出
        </button>
      </div>

      <div v-if="showFucs.search" class="form-group pull-right">
        <button type="button" class="btn btn-primary" @click="search">
          <i class="fa fa-search"></i>
          查询
        </button>
      </div>
    </div>
  </div>
</template>


<style>
.box-body-resizer .search-bar input,
.box-body-resizer .search-bar select {
  width: 150px;
}
.bootstrap-select:not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn) {
  width: 150px;
}
.pull-right {
  margin: 10px;
}
i {
  vertical-align: middle;
}
</style>

<script>
import v_text from "@c/dynamicSearch/text/text";
import v_datetime from "@c/dynamicSearch/datetime/datetime";
import v_singleSelect from "@c/dynamicSearch/select/singleSelect";
import v_doubleSelect from "@c/dynamicSearch/select/doubleSelect";
import { export_json_to_excel } from "@/excel/Export2Excel.js";

export default {
  data() {
    return {
      isEdit: false,
      showFucs: {
        search: true,
        export: true
      },
      btnList: []
    };
  },
  props: ["dynamicControls", "exportOptions", "searchOptions", "seleFunc"],
  beforeMount() {},
  mounted: function() {
    if (!$.isEmptyObject(this.seleFunc)) {
      for (var key in this.seleFunc) {
        if (key in this.showFucs) {
          this.showFucs[key] = this.seleFunc[key];
        } else {
          if ("addFunList" in this.seleFunc) {
            let list = this.seleFunc["addFunList"] || [];
            this.btnList = list.reverse();
          }
        }
      }
    }
  },
  methods: {
    search: function() {
      var result = {};
      this.$refs.child.forEach(item => {
        if (item.options.type == "v_doubleSelect") {
          for (var key in item.val) {
            result[key] = item.val[key];
          }
        } else {
          result[item.options.key] = item.val;
        }
      });
      if (this.searchOptions.requiredCondition) {
        var valid = false;
        for (const key in result) {
          if (result[key] != undefined && result[key].trim()) {
            valid = true;
          }
        }
        if (!valid) {
          layer.open({
            type: 0,
            title: "提示",
            content: "请输入查询条件！"
          });
          return;
        }
      }
      this.$emit("callback", result);
    },
    export2Excel() {
      var _ = this;
      var result = {};
      this.$refs.child.forEach(item => {
        if (item.options.type == "v_doubleSelect") {
          for (var key in item.val) {
            result[key] = item.val[key];
          }
        } else {
          result[item.options.key] = item.val;
        }
      });
      _.exportOptions.url(result).then(res => {
        if (res.success) {
          require.ensure([], () => {
            var table = $("#" + _.exportOptions.id);
            //debugger;
            var dataList = res.result.items;
            var AllColumns = table.bootstrapTable("getOptions").columns[0];
            const tHeader = [];
            const Headers = [];
            AllColumns.forEach(item => {
              tHeader.push(item.title);
              Headers.push(item.field);
            });
            const filterVal = tHeader;
            const list = [];
            const data = this.formatJson(Headers, dataList);
            export_json_to_excel(tHeader, data, _.exportOptions.name);
          });
        }
      });
    },
    // 隐藏编辑表格数据模态框
    edit: function() {
      this.isEdit = false;
      layer.close(this.layerId);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  components: {
    v_text,
    v_datetime,
    v_singleSelect,
    v_doubleSelect
  }
};
</script>
