<template>
  <q-inner-loading :showing="showing">
    <q-spinner-dots color="brand-3" size="2em"/>
  </q-inner-loading>
</template>

<script>
export default {
  name: 'PageLoading',

  props: {
    showing: { type: Boolean, default: true }
  }
}
</script>
