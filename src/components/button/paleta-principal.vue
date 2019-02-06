<template>
  <div class="row .col-12 justify-between blue-grey-6">
    <div class=".col-1">
      <app-button propAcao="voltar" propSize="md" propIcon="arrow_back" propTitle="Página Anterior" @voltar="voltar"></app-button>
    </div>

    <div class="row .col-4">
      <h4 class="no-margin uppercase text-weight-bolder" :class="iconcolor">{{ titulo }}</h4>
    </div>

    <div class=".col-8 row inline justify-end">
      <app-button propAcao="novo" propSize="md" propIcon="add_box" propTitle="Novo" :hidden="!btn_adicionar" @novo="novo"></app-button>

      <app-button propAcao="editar" propSize="md" propIcon="edit" propTitle="Editar" :hidden="!btn_editar" @editar="editar"></app-button>

      <app-button propAcao="salvar" propSize="md" propIcon="save" propTitle="Salvar" :disabled="disabledSalvar" :hidden="!btn_salvar"
        @salvar="salvar"></app-button>

      <app-button propAcao="deletar" propSize="md" propIcon="delete" propTitle="Deletar" :hidden="!btn_deletar"
        @deletar="salvar"></app-button>

      <app-button propAcao="ordernar" propSize="md" propIcon="reorder" propTitle="Ordenar" :hidden="!btn_ordenar"
        @ordenar="ordenar"></app-button>

      <app-button propAcao="filtrar" propSize="md" propIcon="filter_list" propTitle="Ordenar" :hidden="!btn_filtrar"
        @filtrar="filtrar"></app-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "quasar";
import appButton from "../atomicos/BaseButton";

export default {
  components: { appButton },
  props: {
    btn_adicionar: { type: Boolean, default: false },
    btn_editar: { type: Boolean, default: false },
    btn_salvar: { type: Boolean, default: false },
    btn_deletar: { type: Boolean, default: false },
    btn_ordenar: { type: Boolean, default: false },
    btn_filtrar: { type: Boolean, default: false },
    disabledSalvar: { type: Boolean, default: false },
    titulo: { type: String, required: true, default: "Titulo da página" }
  },
  data() {
    return {
      iconcolor: "text-blue-grey-6 "
    };
  },
  methods: {
    avancar() {
      this.$emit("acao", "avancar");
    },
    voltar() {
      console.log("Voltar chegou");
      this.$router.go(-1);
    },

    novo() {
      console.log("click botão adicionar novo");
      this.$emit("acao", "novo");
    },

    editar() {
      console.log("click botão editar registro ");
      this.$emit("acao", "editar");
    },
    salvar() {
      console.log("abrir modal de confirmação da gravação");
      this.$q
        .dialog({
          title: "  Gravação",
          message: "Confirma a gravação do registro?",
          ok: "Confirmo",
          cancel: "Desisto",
          color: "blue-grey-6"
        })
        .then(() => {
          this.$root.$emit("acao", "salvar");
          this.$q.notify("Gravação confirmada!");
        })
        .catch(() => {
          this.$q.notify("Gravação cancelada!");
        });
    },
    deletar() {
      console.log("abrir modal de confirmação da deleção");
      this.$q
        .dialog({
          title: "Deleção",
          message:
            "O item selecionado será deletado definitivamente. Confirma?",
          ok: "Confirmo",
          cancel: "Desisto",
          color: "blue-grey-6"
        })
        .then(() => {
          this.$root.$emit("acao", "deletar");
          this.$q.notify("Deleção confirmada!");
        })
        .catch(() => {
          this.$q.notify("Deleção cancelada!");
        });
    },

    ordenar() {
      this.$root.$emit("acao", "ordenar");
      console.log("abrir tela de ordenação");
    },
    filtrar() {
      console.log("Abrir opções de filtro");
      this.$root.$emit("acao", "filtrar");
    },
    abandonar() {
      this.$q
        .dialog({
          title: "Abandonar",
          message: "Deseja abandonar essa página?",
          ok: "Confirmo",
          cancel: "Desisto",
          color: "blue-grey-6"
        })
        .then(() => {
          this.$emit("acao", "abandonar");
          this.$q.notify("Deleção confirmada!");
        })
        .catch(() => {
          this.$q.notify("Acabou de desistir!");
        });
    }
  }
};
</script>

<style>
</style>
