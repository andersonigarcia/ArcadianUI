<template>
  <div class="row nowrap q-mb-sm">
    <q-btn flat round :icon="icon" @click="$emit('input', '')" class="c-search-btn"/>
    <input type="text" class="c-search-input" :class="composition" :value="value" @input="$emit('input', $event.target.value)" ref="input"/>
    <q-btn v-show="add" flat round icon="add" @click="$emit('add')" class="c-add-btn"/>
    <q-btn v-show="more" flat round icon="more_vert" @click="$emit('more')" class="c-more-btn"/>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',

  props: {
    value: String,
    add: { type: Boolean, default: false },
    more: { type: Boolean, default: false }
  },

  computed: {
    icon () {
      return this.value === '' ? 'search' : 'close'
    },
    composition () {
      return this.more ? 'c-more' : 'c-none'
    }
  }
}
</script>

<style lang="stylus" scoped>

.c-search-btn
  color $grey-4
  margin-left 2px
  z-index 100

.c-add-btn
  color $brand-1
  margin-left -42px
  z-index 100

.c-more-btn
  color $brand-1
  margin-left -8px
  z-index 100

.c-search-input
  background-color white
  border 1px solid $grey-4
  border-radius 28px
  box-sizing border-box
  color $brand-5
  flex-grow 1
  height 40px
  margin-left -44px
  outline-style none
  outline-width 0px
  padding 0px 15px 0px 40px
  transition border-color 0.2s ease 0s
  vertical-align middle

.c-more
  margin-right -34px

.c-none
  margin-right 0px

.c-search-input:focus
  border-color $brand-3
</style>
