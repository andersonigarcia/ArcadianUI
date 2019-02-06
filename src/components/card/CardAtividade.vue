<template>
  <q-card>
    <q-card-title>{{ atividade.atividade_nome }}</q-card-title>
    <q-card-separator/>
    <q-card-main>
      <b>Status:</b>
      {{ atividade.status_nome }} -
      <b>Data:</b>
      {{ atividade.status_data | DataBr()}}
    </q-card-main>
  </q-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["atividade"],
  filters: {
    DataBr(data) {
      return moment(data).format("DD/MM/YYYY");
    }
  }
};
</script>