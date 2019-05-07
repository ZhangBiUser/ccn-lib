<template>
  <div>
    <div class="form-group" v-for="item in options.list" :key="item.key">
      <singleSelect v-bind:options="item" @callback="selectCallBack" ref="selectList"></singleSelect>
    </div>
  </div>
</template>

<script>
import singleSelect from "@c/dynamicSearch/select/singleSelect";
export default {
  data() {
    return {
      val:{}
    };
  },
  watch: {
    val(val) {}
  },
  props: ["options"],
  beforeMount() {
    this.options.hasMountBefore && this.$emit('componentMountBefore',this);
  },
  //[{apiUrl params selectkey selectvalue}]
  mounted() {
    // this.$emit("loadCallBack",this);
    this.$emit('componentMountAfter',this);
  },
  methods: {
    selectCallBack: function(that) {
      if(that.options.childrenkey){
         var cur= this.$refs.selectList.find((item)=>{
            return item.options.key==that.options.childrenkey;
          })
          cur.parentId=that.val;
      };
      var _=this;
      _.val={};
      this.$refs.selectList.forEach((item)=>{
         _.val[item.options.key]=item.val;
      });
    },
    // setValue(valObj) {
    //   debugger
    //   let _ = this;
    //   console.log(this.$refs.selectList);
    //   this.$refs.selectList.forEach((item)=>{
    //      item.$refs.options.setValue(valObj[item.options.key],item.options);
    //   });
      
    // }
  },
  components: {
    singleSelect
  }
};
</script>

<style scoped>
</style>