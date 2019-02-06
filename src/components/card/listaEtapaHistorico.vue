<template>
  <q-list highlight inset-separator>
    <q-list-header>Histórico</q-list-header>
    <q-item v-for="(status, index) in etapaStatus" :key="index">
      <q-item-main
        :label="`${status.status_data} - ${status.status_nome} - ${status.status_usuario}`"
        label-lines="1"
      />
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    etapaStatus: []
  }
};
</script>

<style>
</style>

