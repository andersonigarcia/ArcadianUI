<template>
  <q-card>
    <q-card-title>Tempo</q-card-title>
    <q-card-separator/>
    <q-card-main>
      <b>Decorrido:</b>
      {{ etapa.tempo_decorrido }} -
      <b>Previsto:</b>
      {{ etapa.tempo_previsto }}
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: {
    etapa: []
  }
};
</script>
