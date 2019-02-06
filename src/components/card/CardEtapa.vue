<template>
  <q-card>
    <q-card-title class="cabecalho">{{ etapa.atividade_nome }}</q-card-title>
    <q-card-separator/>
    <q-card-main>
      <b>Etapa:</b>
      {{ etapa.atividade_ordem }} de {{ etapa.atividade_final }} -
      <b>Serviço:</b>
      {{ etapa.servico_tag }}
      <br>
      <b>Executante:</b>
      {{ etapa.executante_nome }}
      <br>
      <b>Criada em:</b>
      {{ etapa.status_data | DataBr()}}
      <br>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: ["etapa"],
  filters: {
    DataBr(data) {
      return moment(data).format("DD/MM/YYYY");
    }
  }
};
</script>
<style>
.cabecalho {
  background-color: whitesmoke;
}
</style>

