
<template>
  <div>
    <div style="position: absolute;right: 0px;bottom: 0;">
      <div :id="item.key" v-for="item in btnList" :key="item.key" class="form-group pull-right">
        <button type="button" class="btn btn-primary" @click="item.method(item)">
          <i :class="item.iconStr ? 'fa ' + item.iconStr : ''" style="vertical-align: inherit;"></i>
          {{item.title}}
        </button>
      </div>
    </div>
  </div>
</template>


<style>
/* .box-body-resizer .search-bar input,
.box-body-resizer .search-bar select {
  width: 150px;
}
.bootstrap-select:not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn) {
  width: 150px;
} */
.pull-right {
  margin: 10px;
}
</style>

<script>
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
  props: ["buttonOptions"],
  beforeMount() {},
  mounted: function() {
    let list = this.buttonOptions || [];
    this.btnList = list.reverse();
  },
  components: {}
};
</script>
