<template>
  <q-page padding>
    <paleta-principal
      @acao="acao"
      :btn_salvar="true"
      :disabledSalvar="!isFormSalvarPedidoValid"
      titulo="Novo pedido"
    ></paleta-principal>

    <div class="row q-mb-sm">
      <div class="col">
        <q-input
          type="text"
          v-model="produto"
          float-label="Produto *"
          color="blue-grey-1"
          inverted-light
          :after="[
            { icon: 'add' },
            { icon: 'search' }
          ]"
        >
          <q-autocomplete @search="searchProdutos" @selected="selectedProduto"/>
        </q-input>
      </div>
    </div>
    <div>
      <!-- <q-checkbox v-model="checked" checked-icon="visibility" unchecked-icon="visibility_off"/> -->
      <img
        alt="Seleção dos dentes que compõem o pedido"
        src="~assets/ArcadaNumericaEx.jpg"
        height="90%"
        width="100%"
        class="borderimg1"
      >
    </div>

    <div class="row q-mb-sm gutter-xs">
      <div class="col-8 col-md-4">
        <q-alert
          type="info"
          icon="assignment"
          text-color="black"
        >Tabela: {{ valorTabelado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol', minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</q-alert>
      </div>

      <div class="col-4 col-md-4">
        <q-input
          type="number"
          v-model.number="ajuste"
          stack-label="% Ajuste"
          color="blue-grey-2"
          inverted-light
        ></q-input>
      </div>

      <div class="col-12 col-md-4">
        <q-alert type="info" text-color="red">Total: {{ total }}</q-alert>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { filter } from "quasar";

import paletaPrincipal from "../../components/button/paleta-principal";

export default {
  components: {
    paletaPrincipal
  },

  data() {
    return {
      valorTabelado: 358.45,
      checked: "",
      cliente: "",
      paciente: "",
      produto: "",
      //dataDesejada: "",
      //dataPrevista: "30/01/2018",
      ajuste: 0.0
    };
  },

  computed: {
    total() {
      let result = 0.0;
      const vlTabelado = this.valorTabelado;

      if (this.ajuste > 0) {
        result = vlTabelado + this.calculateValorComAjuste(vlTabelado);
      } else {
        result = vlTabelado - this.calculateValorComAjuste(vlTabelado);
      }

      return result.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    isFormSalvarPedidoValid() {
      return (
        this.cliente.trim().length > 0 &&
        this.paciente.trim().length > 0 &&
        this.produto.trim().length > 0 &&
        this.dataDesejada.trim().length > 0
      );
    }
  },

  methods: {
    acao(value) {
      switch (value) {
        case "novo":
          this.adicionar();
          break;
        case "abandonar":
          this.abandonar();
          break;
        default:
          console.log("Ação não recebida ou não implementa.");
          break;
      }
    },
    calculateValorComAjuste(vlTabelado) {
      return (vlTabelado / 100.0) * Math.abs(this.ajuste);
    },

    salvarPedido() {
      if (!this.isFormSalvarPedidoValid) {
        this.$q.notify("Existem informações incompletas ou inválidas");
        return;
      }

      this.$q.loading.show();
      const pedido = {
        cliente_nome: this.cliente,
        paciente_nome: this.paciente,
        produto_nome: this.produto,
        data_cadastro: new Date(this.dataDesejada).toLocaleDateString("pt-BR"),
        data_programada: this.dataPrevista
      };

      console.log(pedido);

      this.$q.loading.hide();
      this.$q.notify({
        type: "positive",
        message: "Pedido cadastrado com sucesso"
      });
      this.$router.push("/servicos");
    },

    searchClientes(terms, done) {
      setTimeout(async () => {
        const clientes = await this.listClientes();
        done(filter(terms, { field: "value", list: clientes }));
      }, 500);
    },

    selectedCliente(item) {
      this.cliente = item.value.cliente_nome;
    },

    searchPacientes(terms, done) {
      setTimeout(async () => {
        const pacientes = await this.listPacientes();
        done(filter(terms, { field: "value", list: pacientes }));
      }, 500);
    },

    selectedPaciente(item) {
      this.paciente = item.value.paciente_nome;
    },

    searchProdutos(terms, done) {
      setTimeout(async () => {
        const produtos = await this.listProdutos();
        done(filter(terms, { field: "value", list: produtos }));
      }, 500);
    },

    selectedProduto(item) {
      this.produto = item.value.produto_nome;
    },

    async listClientes() {
      const clientes = await this.$store.dispatch("searchClienteByName");
      return clientes.map(data => {
        return { label: data.cliente_nome, value: data };
      });
    },

    async listPacientes() {
      const pacientes = await this.$store.dispatch("searchPacienteByName");
      return pacientes.map(data => {
        return { label: data.paciente_nome, value: data };
      });
    },

    async listProdutos() {
      const produtos = await this.$store.dispatch("searchProdutoByName");
      return produtos.map(data => {
        return { label: data.produto_nome, value: data };
      });
    }
  }
};
</script>
<style>
</style>

