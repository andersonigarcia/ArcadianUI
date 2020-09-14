<template>
  <div class="col q-pa-sm">
    <q-list bordered class="col q-pa-sm c-border-radius">
      <q-item-label class="a-text-caption-md a-text-dense" v-for="item in memoria" :key="item.id">{{ `* ${item}` }}</q-item-label>
    </q-list>
  </div>
</template>

<script>
export default {
  props: { memoria: Array }
}
</script>

<style>
  .c-border-radius {
    border-radius: 6px;
  }
</style>
