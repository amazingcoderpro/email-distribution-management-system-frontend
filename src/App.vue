<template>
  <div id="app">
    <!-- <router-view/> -->
  <router-view v-if="isRouterA"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide(){
      return{
        reload:this.reload
      }
  },
  data(){
    return{
        isRouterA:true
      }
  },
  created() {
    if (localStorage.eleToken) {
      const decode = localStorage.eleToken;
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },  
    reload(){
        this.isRouterA = false
        this.$nextTick(function(){
            this.isRouterA = true
        })
    }
  }
};
// import createApp from '@shopify/app-bridge';
// import {Cart} from '@shopify/app-bridge/actions';

// var app = createApp({
//   apiKey: '12345',
// });
// var cart = Cart.create(app);
// cart.subscribe(Cart.Action.UPDATE, function (Cart) {
//   console.log('[Client] cart update', Cart);
// });

</script>
<style scoped>
   @import url(./assets/css/base.css);
</style>
