<template>
  <div>
    <select
      style="form-control"
      data-live-search="true"
      :name="options.selectkey"
      v-model="val"
      ref="select"
    >
      <option :value="item.id" v-for="item in List" :key="item.id">{{item.value}}</option>
    </select>
  </div>
</template>

<script>
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select";
export default {
  data() {
    return {
      val: "",
      parentId: "",
      List: [],
      response: []
    };
  },
  watch: {
    val(val) {
      if (this.response.length) {
        for (let i = 0; i < this.response.length; i++) {
          let responseItem = this.response[i];
          if (responseItem[this.options.selectkey] == val) {
            this.options.item = responseItem;
          }
        }
      }
      this.options.hasValChange && this.$emit("componentValueChange", this);
      this.$emit("callback", this);
    },
    parentId() {
      this.init();
    }
  },

  props: ["options"],
  beforeMount() {
    this.options.hasMountBefore && this.$emit("componentMountBefore", this);
  },
  //apiUrl params selectkey selectvalue
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      var _ = this;
      $(_.$refs.select).selectpicker({
        noneSelectedText: "",
        noneResultsText: "",
        liveSearch: true,
        size: 5 //设置select高度，同时显示5个值
      });

      _.List = [];
      _.List.push({
        id: "",
        value: _.options.title
      });
      if (_.options.data) {
        _.refreshData(_.options.data);
      } else {
        if (_.options.parendPostKey) {
          var postObj = {};
          postObj[_.options.parendPostKey] = _.parentId;
          Object.assign(
            _.options.params ? _.options.params : (_.options.params = {}),
            postObj
          );
        }
        // debugger;
        _.options.apiUrl(_.options.params).then(res => {
          if (res.success) {
            _.response = res.result;
            _.refreshData(res.result);
          }
        });
      }
    },
    setValue(val) {
      let _ = this;
      _.val = val;
      $(_.$refs.select).selectpicker("val", val);
      $(_.$refs.select).selectpicker("refresh");
    },
    getValue() {
      return $(this.$refs.select).val();
    },
    refreshData(list) {
      let _ = this;
      list.forEach(item => {
        _.List.push({
          id: item[_.options.selectkey],
          value: item[_.options.selectvalue]
        });
      });
      setTimeout(() => {
        $(_.$refs.select).selectpicker("refresh");
        // _.$emit("loadCallBack", this);
        _.$emit("componentMountAfter", _);
        if (this.options.isFromEdit && this.options.editDisabled) {
          $(_.$refs.select).attr("disabled", true);
          $(_.$refs.select).selectpicker("refresh");
        }
        if (!this.options.isFromEdit && this.options.addDisabled) {
          $(_.$refs.select).attr("disabled", true);
          $(_.$refs.select).selectpicker("refresh");
        }
      }, 100);
    }
  }
};
</script>

<style scoped>
</style>