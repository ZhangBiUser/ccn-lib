<template>
  <div id="app">
    <div class="content-wrapper clear">
      <router-view/>
    </div>
    <!-- /.content-wrapper -->
    <footers></footers>
     <Loading :state="loadings"></Loading>
  </div>
</template>
 
<script>
import { mapState } from "vuex";
import footers from "@c/footer";
import Loading from "@c/loading";
export default {
  computed: {
    ...mapState(["loadings"])
  },
  methods: {
    autoWindow: function() {
      var windowHeight = $(window).height() - 51;
      $(".box-body-resizer").css({ "min-height": windowHeight });
    }
  },
  mounted: function() {
    var _ = this;
    _.autoWindow();
    $(window).resize(function() {
      _.autoWindow();
    });
  },
  components:{
    footers,
    Loading
  }
};
</script>


