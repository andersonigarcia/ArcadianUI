<template>
  <q-card>
    <q-card-title class="cabecalho">
      <div class="no-margin text-weight-bolder .q-title">{{ servico.os_tag }} - {{ nomeCliente }}</div>
      <sub slot="subtitle">{{servico.cliente_clinica}}</sub>
    </q-card-title>
    <q-card-separator />

    <q-card-main class="row .col-12 justify-between">
      <div>
        <b>Paciente:</b>
        {{ nomePaciente }}
      </div>

      <div>
        <b>Data de Entrada:</b>
        {{ dataEntrada }}
      </div>

      <div>
        <b>Data Desejada:</b>
        {{ dataDesejada }}
      </div>

      <div>
        <b>Data Prevista:</b>
        {{ dataPrevista}}
      </div>
      <br>
      <br>
      <div class="row">
        <b>3 Serviços - 2 Não Iniciados - 1 Concluídos</b>
      </div>

      <div class=".col-4">
        <app-button propAcao="Editar" propSize="md" propIcon="edit" propTitle="Editar serviço" @Editar="Editar"></app-button>
      </div>
    </q-card-main>
  </q-card>
</template>


<script>
import moment from "moment";
import appButton from "../atomicos/BaseButton";

export default {
  components: {
    appButton
  },
  props: {
    servico: Object
  },
  methods: {
    Editar() {
      this.$router.push("/cadastrar-pedido");
    },
    DataBr(data) {
      debugger;
      if (data == null || data == 0 || data == "")
        return "N/A";

      return moment(data).format("DD/MM/YYYY");
    },
    DataHoraBr(data) {
      if (data == null || data == 0 || data == "")
        return "N/A";

      return moment(data).format("DD/MM/YYYY - h:mm:ss a");
    },
    ToPascalCase(str) {
      if (str === null || str === "") return false;
      else str = str.toString();

      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  computed: {
    nomePaciente() {
      return this.ToPascalCase(this.servico.paciente_nome);
    },
    nomeCliente() {
      return this.ToPascalCase(this.servico.cliente_nome);
    },
    dataDesejada() {
      var data = this.servico.data_desejada ? this.servico.data_desejada : null;
      return this.DataBr(data);
    },
    dataPrevista() {
      var data = this.servico.data_prevista ? this.servico.data_prevista : null;
      return this.DataBr(data);
    },
    dataEntrada() {
      var data = this.servico.data_entrada ? this.servico.data_entrada : null;
      return this.DataBr(data);
    }
  }
};
</script>

<style>
.cabecalho {
  background-color: whitesmoke;
}
</style>

