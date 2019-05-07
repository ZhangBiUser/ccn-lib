<template>
  <vBasePage
    :searchOptions="searchOptions"
    :buttonOptions="buttonOptions"
    :editOptions="editOptions"
    :tableOption="tableOption"
    @rowBlock="rowClick"
    @componentMountBefore="componentMountBefore"
    @componentMountAfter="componentMountAfter"
    @componentValueChange="componentValueChange"
  ></vBasePage>
</template>

<script>
import vBasePage from "../../BasePage/BasePage";
import NewApi from "../webapi/demo";
import config from "@/config/index";
import moment from "moment";

var TableUniqueId = "id";
export default {
  data() {
    return {
      searchOptions: {
        searchOptions: {
          requiredCondition: false
        },
        seleFunc: {
          export: false,
          search: true
        },
        // exportUrl: NewApi.GetAppInfoList,
        search_controls: [
          {
            type: "v_text",
            title: "名称11",
            key: "name11"
          },
          {
            type: "v_text",
            title: "名称22",
            key: "name22"
          },
          {
            type: "v_text",
            title: "名称33",
            key: "name33"
          }
        ]
      },
      buttonOptions: [
        {
          title: "添加",
          key: "add",
          enable: true,
          iconStr: "fa-plus"
        }
      ],
      editOptions: {
        dynamicEdits: {
          apiUrl: NewApi.SaveCheckReport,
          list: [
            {
              lineType: "single",
              rowList: [
                {
                  type: "v_singleSelect",
                  title: "名称3",
                  key: "name33",
                  isRequest: true,
                  apiUrl: NewApi.GetBatchList,
                  hasValChange: true,
                  editDisabled: true,
                  addDisabled: false,
                  selectkey: "name33",
                  selectvalue: "nameid",
                  validators: {
                    notEmpty: {
                      enabled: true,
                      message: "名称3不能为空"
                    }
                  }
                },
                {
                  type: "v_text",
                  title: "名称4",
                  key: "name",
                  isRequest: true,
                  editDisabled: true, //编辑环境下是否禁用
                  addDisabled: true //添加环境下是否禁用
                },
                {
                  type: "v_upload",
                  key: "imgurl1",
                  title: "图片一",
                  // isRequest: true,
                  uploadNum: 1, // 文件数量,默认为1，多张图片以，号拼接字符串形式提交
                  fileSizeLimit: 3 // 文件大小  以兆为单位
                },
                {
                  type: "v_upload",
                  key: "imgurl2",
                  title: "图片二",
                  // isRequest: true,
                  uploadNum: 1, // 文件数量,默认为1，多张图片以，号拼接字符串形式提交
                  fileSizeLimit: 3 // 文件大小  以兆为单位
                  // validators: {
                  //   notEmpty: {
                  //     enabled: true,
                  //     message: "选择上传的文件不能为空"
                  //   }
                  // }
                },
                {
                  type: "v_upload",
                  key: "imgurl3",
                  title: "图片三",
                  // isRequest: true,
                  uploadNum: 1, // 文件数量,默认为1，多张图片以，号拼接字符串形式提交
                  fileSizeLimit: 3 // 文件大小  以兆为单位
                  // validators: {
                  //   notEmpty: {
                  //     enabled: true,
                  //     message: "选择上传的文件不能为空"
                  //   }
                  // }
                }
              ]
            }
          ]
        }
      },
      tableOption: {
        tableId: "report",
        tableName: "报表",
        url: config.pgyerApiUrl + NewApi.GetCheckReport.options.url,
        method: NewApi.GetCheckReport.options.method,
        uniqueId: TableUniqueId,
        actions: [
          {
            key: "tableEdit",
            title: "编辑",
            url: NewApi.GetCheckReportById,
            method: NewApi.GetCheckReportById.method
          },
          {
            key: "tableDelete",
            url: NewApi.delCheckReport,
            method: NewApi.delCheckReport.method,
            title: "删除",
            successTip: "删除成功"
          }
        ],
        columns: [
          {
            field: "name11",
            title: "名称1",
            align: "center"
          },
          {
            field: "name22",
            title: "名称2",
            align: "center"
          },
          {
            field: "name33",
            title: "名称3",
            align: "center"
          },
          {
            field: "time1",
            title: "上传日期",
            align: "center",
            formatter: function(val, row) {
              return moment(val).format("YYYY-MM-DD HH:mm");
            }
          }
        ]
      }
    };
  },
  methods: {
    rowClick: function(rowItem, element, baseObject) {
      console.log(element);
      let _ = this;
      if (element.id == "tablePause") {
        console.log("启用/禁用按钮被点击");
      }
    },
    componentMountBefore: function(element, basepage) {},
    componentMountAfter: function(element, basepage) {},
    // 编辑模态框中  组件值发生变化
    componentValueChange: function(element, basepage) {
      let editChildArr = basepage.$refs.editModule.$refs.child || [];
      if (element.options.key == "name33") {
        let target = editChildArr.find(item => {
          return item.options.key == "name";
        });
        target.setValue(
          element.val ? element.options.item.productName : element.val
        );
        // debugger;
      }
    }
  },
  components: { vBasePage }
};
</script>


