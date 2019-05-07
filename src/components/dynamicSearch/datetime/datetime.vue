<template>
  <input
    class="form-control"
    :name="options.key"
    type="text"
    ref="datetime"
    v-model="val"
    autocomplete="off"
    :placeholder="options.title"
    :Id="options.key"
  >
</template>

<script>
// readonly="disabled"
import moment from "moment";
import "@p/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.css";
import "@p/bootstrap-datetimepicker-master/datetimepicker/bootstrap-datetimepicker.js";
import "@p/bootstrap-datetimepicker-master/datetimepicker/bootstrap-datetimepicker.zh-CN.js";
export default {
  data() {
    return {
      val: ""
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
  },
  mounted() {
    var _ = this;
    $(this.$refs.datetime)
      .datetimepicker({
        language: "zh-CN",
        format: _.options.format ? _.options.format : "yyyy-mm-dd", //可配置
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        minView: _.options.minView ? _.options.minView : 2,
        startView: _.options.startView ? _.options.startView : 2,
        forceParse: 0,
        showMeridian: 1,
        //startDate: new Date()
        //initialDate:'2018-01-02',
        //setDate:'2018-01-02',
        onSelect: function(dateText, inst) {
          // 不做任何处理
        }
      })
      .on("hide", function(ev) {
        _.val = $(_.$refs.datetime).val();
        if ($(_.$refs.datetime.form).data("bootstrapValidator")) {
          $(_.$refs.datetime.form)
            .data("bootstrapValidator")
            .updateStatus($(_.$refs.datetime), "NOT_VALIDATED", null)
            .validateField($(_.$refs.datetime));
        }
      });
    // this.$emit("loadCallBack", this);
    this.$emit("componentMountAfter", this);
  },
  methods: {
    setValue(val) {
      // 使用当前输入框中的值更新日期时间选择器。
      $(this.$refs.datetime).datetimepicker("update", new Date(val));
    }
  }
};
</script>

<style scoped>
</style>