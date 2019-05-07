<template>
  <div>
    <span>txt文件：</span>
    <div class="input-group" style="width:30%" @click="select">
      <input
        name="txt_filePath"
        type="text"
        v-model="file_path"
        readonly="readonly"
        class="form-control"
      >
      <div class="input-group-addon" style="width:60px">
        <a href="javascript:void(0);" class="glyphicon glyphicon-upload">浏览</a>
      </div>
      <input ref="file" class="hide" type="file" accept=".txt" @change="filechange">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="sbumit">导入</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file_path: "请选择文件上传",
      Ext: "",
      FileName: "",
      Base64String: ""
    };
  },
  props: ["apiUrl", "callback", "params"],
  methods: {
    sbumit: function() {
      var _ = this;
      if (_.Base64String && _.file_path != "请选择文件上传") {
        var obj;
        if (_.params) {
          obj = Object.assign(_.params, {
            //Ext: _.Ext,
            Base64String: _.Base64String,
            FileName: _.FileName
          });
        } else {
          obj = {
            //Ext: _.Ext,
            FileBase64String: _.Base64String,
            FileName: _.FileName
          };
        }
        this.apiUrl(obj).then(res => {
          _.file_path = "请选择文件上传";
          _.$refs.file.value = "";
          this.$emit("callback", res, _);
        });
      } else {
        _.$emit(
          "callback",
          { success: false, error: { message: "请选择文件并上传" } },
          _
        );
      }
    },
    select: function() {
      this.$refs.file.click();
    },
    filechange: function() {
      var _ = this;
      var file = _.$refs.file;
      _.file_path = file.value;
      var file = file.files[0];
      if (file != null) {
        _.Ext = _.file_path.substring(_.file_path.lastIndexOf(".") + 1);
        _.FileName = _.file_path.substring(_.file_path.lastIndexOf("\\") + 1);
        if (
          file.type != "application/vnd.ms-excel" &&
          file.type !=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          _.Ext = "exe";
        }
        if (file.size < 1) {
          _.file_path="请选择文件上传";
          _.$refs.file.value = "";
          return layer.alert("所选的文件为空！");
        }

        // if (file.size > 10485540) {
        //   _.file_path="请选择文件上传";
        //    _.$refs.file.value = "";
        //   return layer.alert("所选的文件超过10MB！");
        // }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          _.Base64String = reader.result;
        };
      }
    }
  }
};
</script>
