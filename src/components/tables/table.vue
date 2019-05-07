<template>
  <table :id="id"></table>
</template>
<script>
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/bootstrap-table.js";
import "bootstrap-table/dist/locale/bootstrap-table-zh-CN.js";
export default {
  data() {
    var _ = this;
    //debugger;
    return {
      id: _.option.tableId,
      tableOption: {
        url: "", //请求后台的URL（*）
        method: "get", //请求方式（*）
        striped: true, //是否显示行间隔色
        cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true, //是否显示分页（*）
        sortable: true, //是否启用排序
        sortOrder: "asc", //排序方式
        params: {}, //额外查询参数
        queryParams: params => {
          var temp = {
            SkipCount: params.offset, //页面大小
            MaxResultCount: params.limit, //页码
            Sorting: params.sort ? params.sort + " " + params.order : undefined //排序列名
          };
          Object.assign(temp, _.tableOption.params);
          return temp;
        }, //传递参数（*）
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: false, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        minimumCountColumns: 1, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        //uniqueId: "ID", //每一行的唯一标识，一般为主键列
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        cardView: false, //是否显示详细视图
        detailView: false, //是否显示父子表
        responseHandler: function(res) {
          var result = {
            rows: [],
            total: 0
          };
          if (res.success) {
            console.log("表格数据:");
            console.log(res.result.items[0]);
            result.rows = res.result.items;
            result.total = res.result.totalCount;
          }
          return result;
        },
        columns: []
      }
    };
  },
  props: ["option"],
  mounted: function() {
    console.log("option:");
    console.log(this.option);
    var table = $("#" + this.id);
    this.handleData();
    table.bootstrapTable($.extend(this.tableOption, this.option));
    table.tableObj = table;
    this.tableObj = table;
  },
  methods: {
    // 创建操作栏按钮
    handleData: function() {
      let _ = this;
      if ("actions" in this.option) {
        this.option.columns.push({
          field: "action",
          title: "操作",
          align: "center",
          formatter: function(val, row, idx) {
            let html = "";
            _.option.actions.map(item => {
              let rowId = row[_.option.uniqueId];
              if (item.key == "tablePause") {
                let btnType = {};
                if ("statuObj" in item) {
                  debugger;
                  btnType.title = item.statuObj[row[item.statuKey]];
                } else {
                  if (row[item.statuKey] == 1) {
                    btnType.className = "btn btn-danger";
                    btnType.title = "禁用";
                  } else {
                    btnType.className = "btn btn-success";
                    btnType.title = "启用";
                  }
                }
                btnType.className = btnType.title == '启用' ? "btn btn-success" : "btn btn-danger";

                html +=
                  "<button id=" +
                  "tablePause" +
                  " type=button class=" +
                  '"' +
                  btnType.className +
                  '"' +
                  " +  rowId=" +
                  rowId +
                  ">" +
                  btnType.title +
                  "</button>&nbsp;";
              } else {
                let btnType = item.buttonType
                  ? "btn " + item.buttonType
                  : "btn btn-primary";
                html +=
                  "<button id=" +
                  item.key +
                  " type=button class=" +
                  '"' +
                  btnType +
                  '"' +
                  " +  rowId=" +
                  rowId +
                  ">" +
                  item.title +
                  "</button>&nbsp;";
              }
            });

            return html;
          }
        });
      }

      $("#" + _.id).on("click", "button", function(e) {
        let rowId = $(this).attr("rowId");
        if (rowId) {
          let obj = _.tableObj.bootstrapTable("getRowByUniqueId", rowId);
          // _.$emit(this.id + "Block", obj, this);
          _.$emit("rowBlock", obj, this);
        }
      });
    },

    operation: function(option) {
      this.tableObj.bootstrapTable(
        option,
        $.extend({}, this.tableOption, this.option)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.table tbody tr td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
