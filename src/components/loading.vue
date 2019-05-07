<template>
    <div class="loading" v-if="state">
      <div></div>
      <img src="../assets/images/loading.gif" alt="" >

    </div>
</template>
<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    text-align: center;
    z-index: 999;
    div{
    background-color: rgb(0, 0, 0);
    position: absolute;
    width: 100%;
    height: 100%;
      opacity: 0.3;
    }
  img {
    width: 40px;
    height: 40px;
    display: block;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
<script>
export default {
  props:['state'],
}
</script>
