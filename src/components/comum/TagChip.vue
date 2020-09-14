<template>
  <q-chip clickable square v-on="$listeners" :class="[inverted ? 'c-tag c-inverted' : 'c-tag']">{{ tag }}</q-chip>
</template>

<script>
export default {
  props: { tag: String, inverted: Boolean }
}
</script>

<style lang="stylus" scoped>

.c-tag
  padding 2px 6px 1px 6px !important
  margin 0px !important
  line-height 1em !important
  font-size 0.75rem
  height 18px
  color white
  background-color $brand-3
.c-inverted
  color $brand-3
  background-color white
  border 1px solid $brand-3
</style>
