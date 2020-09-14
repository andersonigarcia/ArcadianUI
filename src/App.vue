<template>
  <div id="q-app" :class="cssClass">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    cssClass () { return this.$q.platform.is.ios ? 'ios-scroll' : '' }
  }
}
</script>

<style lang="stylus" scoped>
  .ios-scroll {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
