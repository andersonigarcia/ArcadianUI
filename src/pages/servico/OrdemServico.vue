<template>
<q-page padding>
  <paleta-principal @acao="acao" :titulo="titulo"></paleta-principal>
  <q-card>
    <q-card-main class="valores">
      <!-- <div class="no-margin text-weight-regular q-subheading"> -->
      <div>
        <b>Cliente:</b>
        {{ clinica | ToPascalCase()}}
        </div>
        <div>
          <b>Paciente:</b>
          {{ paciente | ToPascalCase()}}
        </div>

        <div>
          <b>Data desejada:</b>
          {{ dataDesejada | DataHoraBr()}}
        </div>

        <div>
          <b>Data Prevista:</b>
          {{ dataPrevista | DataHoraBr()}}
        </div>
    </q-card-main>
  </q-card>

    <!-- <div class="q-title">Serviços</div> -->
    <q-card class="q-mt-sm">
      <q-card-main class="cabecalhoOs row .col-12 justify-between">
        <div class="row no-margin text-weight-regular q-subheading">
          <b>Serviços</b>
        </div>
        <div class=".col-2">
          <app-button
            propAcao="NovoServico"
            propSize="md"
            propIcon="add_box"
            propTitle="Novo serviço"
            @NovoServico="NovoServico"
          ></app-button>
        </div>
      </q-card-main>
      <q-card-separator />
      <q-card-main class=" justify-between">
        <div class=" gutter-xs">
          <div
            v-for="(servicos, index) in servicosOs"
            :key="index"
          >
            <card-servico-os :servico="servicos"></card-servico-os>
          </div>
        </div>
      </q-card-main>
    </q-card>

    <q-card class="q-mt-sm">
      <q-card-title class="valores">
        <div class="no-margin text-weight-regular q-subheading">
          <b>*</b>
          {{ valorTabelaDsc }}
        </div>
        <div class="no-margin text-weight-regular q-subheading">
          <b>*</b>
          {{ descontoAplicadoCliente}}
        </div>

        <div class="no-margin text-weight-regular q-subheading">
          <b>*</b>
          {{ descontoAplicadoProduto}}
        </div>
        <div class="no-margin text-weight-regular q-subheading">
          <q-input
            v-model="valorAjuste "
            type="number"
            suffix="%"
            stack-label="% Ajuste"
          />
        </div>
        <div class="no-margin text-weight-regular q-subheading">
          <q-input
            v-model="totalCobrado"
            type="number"
            prefix="R$"
            stack-label="Total Cobrado:"
          />
        </div>
      </q-card-title>
    </q-card>
  </q-page>
</template>
<script>
import moment from "moment";
import cardServicoOs from "../../components/card/CardServicoOs";
import paletaPrincipal from "../../components/button/paleta-principal";
import appButton from "../../components/atomicos/BaseButton";

export default {
  components: {
    paletaPrincipal,
    cardServicoOs,
    appButton
  },
  props: {},
  data () {
    return {
      titulo: "",
      clinica: "",
      paciente: "",
      dataDesejada: "",
      dataPrevista: "",
      descontoAplicadoCliente: "",
      descontoAplicadoProduto: "",
      valorTabelaDsc: "",
      totalCobrado: 0,
      valorAjuste: 0,
      servicosOs: []
    };
  },
  filters: {
    DataHoraBr (data) {
      return moment(data).format("DD/MM/YYYY - h:mm:ss a");
    },
    ToPascalCase (str) {
      if (str === null || str === "") return false;
      else str = str.toString();

      return str.replace(/\w\S*/g, function (txt) {
        return `${txt.charAt(0).toUpperCase()} ${txt.substr(1).toLowerCase()}`;
      });
    },
    ConvertTotalCobrado (valor) {
      return valor
        ? valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          currencyDisplay: "symbol",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
        : 0;
    }
  },
  methods: {
    acao (value) {
      switch (value) {
        case "novo":
          this.adicionar();
          break;
        default:
          console.log("Ação não recebida ou não implementa.");
          break;
      }
    },
    async OrdemServico () {
      //armazenar dados da OS para as demais telas
      this.$q.loading.show();

      const data = await this.$store.dispatch("OrdensServicos", 1);
      debugger;
      const dados = data.data;
      const os = dados[0].ordem_servico;
      this.servicosOs = dados[1].servicos && dados[1].servicos ? dados[1].servicos : [];

      this.titulo = `Ordem de Serviços - ${os.os_tag}`;
      this.clinica = os.cliente_nome ;
      this.paciente = os.paciente_nome;
      this.dataDesejada = os.data_desejada;
      this.dataPrevista = os.data_prevista;
      this.descontoAplicadoCliente = os.desconto_aplicado_cliente;
      this.descontoAplicadoProduto = os.desconto_aplicado_produto;
      this.totalCobrado = os.Total_cobrado;
      this.valorTabelaDsc = os.valor_tabela_dsc;

      this.$q.loading.hide();
    },
    NovoServico () {
      this.$router.push("/ServicoOs");
    },
  },
  computed: {
  },
  mounted () {
    this.OrdemServico();
  }
};
</script>

<style>
.cabecalhoOs {
  /* background-color: whitesmoke; */
  background-color: gainsboro;
}

.valores {
  /* background-color: whitesmoke; */
  background-color: whitesmoke;
}
</style>


