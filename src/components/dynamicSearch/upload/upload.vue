<template>
  <div class="form-group upload-view">
    <div class="file-box">
      <div class="file-item" v-for="(item, index) in seleList" :key="index">
        <!-- <img src="../../../assets/images/upload.png" alt> -->
        <img :src="item" alt>
        <i class="glyphicon glyphicon-remove" @click="deleteSelect" :id="index"></i>
      </div>
    </div>
    <div class="upload-box">
      <img src="../../../assets/images/upload.png" class="addImg">
      <input
        ref="file"
        class="form-control"
        type="text"
        v-model="val"
        :name="options.key"
        @change="filechange"
        accept=".png, .jpg, .jpeg"
        disabled="true"
      >
      <input
        ref="file"
        type="file"
        :value="filepath"
        :name="options.key"
        autocomplete="off"
        @change="filechange"
        accept=".png, .jpg, .jpeg"
      >
      <i
        id="tip"
        class="fa fa-question-circle-o text-success"
        data-toggle="tooltip"
        data-placement="right"
        title
        style="margin: 40px 0 0 10px;font-size: 16px;"
        @mouseover="showTip"
        @mouseup="showTip"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      isDisabled: false,
      seleList: [],
      fileSize: 0,
      filepath: ''
    };
  },
  watch: {
    val(val) {
      debugger;
      this.options.hasValChange && this.$emit("componentValueChange", this);
    }
  },
  props: ["options"],
  beforeMount() {
    this.options.hasMountBefore && this.$emit("componentMountBefore", this);
    if (this.options.fileSizeLimit) {
      this.fileSize = this.options.fileSizeLimit * 1024 * 1024;
    } else {
      this.fileSize = 3 * 1024 * 1024;
    }
  },
  mounted() {
    this.$emit("componentMountAfter", this);
  },
  methods: {
    setValue: function(val) {
      let _ = this;
      if (typeof val == "string") {
        this.val = val;
        this.seleList.push(val);
      } else {
        val = val || '';
        this.seleList == val.split('##');
        this.handleVal();
      }
    },
    getValue: function() {
      return this.val;
    },
    deleteSelect: function(element) {
      this.seleList.splice(element.currentTarget.id, 1);
      this.handleVal();
    },
    showTip: function() {
      layer.tips("图片建议尺寸200*200，可等比缩放，文件大小不超过3MB", "#tip");
    },
    filechange: function() {
      var _ = this;
      if (_.seleList.length == _.options.uploadNum) {
        return layer.alert("只能上传" + _.options.uploadNum + "张图片");
      }
      var element = _.$refs.file;
      var file_path = element.value;
      var fileObj = element.files[0];
      if (fileObj != null) {
        if (fileObj.size > _.fileSize) {
          return layer.alert(
            _.options.fileSizeLimit
              ? "所选的文件超过" + _.options.fileSizeLimit + "MB!"
              : "所选的文件超过3MB！"
          );
        }

        var reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = function() {
          _.seleList.push(reader.result);
          _.handleVal();
          _.filepath = '';
          debugger;
          console.log(_.val);
        };
      } else {
          _.filepath = '';
      }
    },
    handleVal: function() {
      let _ = this;
      this.seleList.map(item => {
        _.val += item + "##";
      });
      if (this.seleList.length) {
        _.val = _.val.substr(0, _.val.length - 2);
      } else {
        _.val = "";
      }
    }
  }
};
</script>

<style scoped>
.upload-view {
  position: relative;
  width: 100%;
  height: 100px;
  display: inline-block;
}
.file-box {
  height: 70px;
  position: relative;
  display: inline-block;
}
.file-item {
  position: relative;
  margin-right: 20px;
  float: left;
  margin-top: 28px;
}
.file-box img {
  display: inline-flex;
  width: 70px;
  height: 70px;
}
.file-box i {
  position: absolute;
  right: -13px;
  top: -13px;
  color: red;
  font-size: 16px;
  padding: 10px;
}
.upload-box {
  position: relative;
  display: inline-block;
}
.upload-box img {
  width: 70px;
  height: 70px;
}
.upload-box input {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 70px;
  opacity: 0;
}
/* .upload-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  border: 1px solid #c3c3c3;
  align-items: center;
}
.file-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.file-item {
  position: relative;
  margin-right: 20px;
}
.file-box img {
  display: inline-flex;
  width: 70px;
  height: 70px;
}
.file-box i {
  position: absolute;
  right: -13px;
  top: -13px;
  color: red;
  font-size: 16px;
  padding: 10px;
}
.upload-box {
  position: relative;
}
.upload-box img {
  width: 70px;
  height: 70px;
}
.upload-box input {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 70px;
  opacity: 0;
} */
</style>