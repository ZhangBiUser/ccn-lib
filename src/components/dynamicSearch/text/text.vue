<template>
  <input class="form-control" type="text" v-model="val" :name="options.key" autocomplete="off" :placeholder="options.title" maxlength="100" :disabled="isDisabled">
</template>

<script>
export default {
  data() {
    return {
      val: "",
      isDisabled: false,
    };
  },
  watch: {
    val(val) {
      this.options.hasValChange && this.$emit('componentValueChange',this);
    },
  },
  props: ["options"],
  beforeMount() {
    if (this.options.isFromEdit && this.options.editDisabled) {
      this.isDisabled = true;
    }
    if (!this.options.isFromEdit && this.options.addDisabled) {
      this.isDisabled = true;
    }
    this.options.hasMountBefore && this.$emit("componentMountBefore", this);
  },
  mounted() {
    this.$emit('componentMountAfter',this);
  },
  methods: {
    setValue: function(val) {
      this.val = val;
    }
  }
};
</script>

<style scoped>
</style>