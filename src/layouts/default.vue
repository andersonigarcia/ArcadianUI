<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <!-- <q-toolbar color="light-blue-5" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'"> -->
      <q-toolbar
        color="blue-grey-6"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title></q-toolbar-title>

        <div>
          <q-toolbar-title>
            <div>Arcadian Lab</div>
            <div slot="subtitle">Sistema de gestão laboratórial</div>
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <cardusuario
        nome="Marcos Ucho de noronha"
        cargo="Especialista em Gesso"
      ></cardusuario>
      <q-list
        no-border
        link
        inset-delimiter
      >
        <!-- <q-list-header class="shadow-1"> Produção</q-list-header> -->
        <!-- <q-item to>
          <q-item-side icon="view_module"/>
          <q-item-main label="Clientes" title="...consulta e manutenção."/>
        </q-item>

        <q-item to="logar">
          <q-item-side icon="view_module"/>
          <q-item-main label="Gestão" title="Menu de Gestao"/>
        </q-item>-->
        <q-item to="produto">
          <q-item-side icon="view_module" />
          <q-item-main
            label="Produtos"
            title="...consulta e manutenção."
          />
        </q-item>

        <q-item to="Servicos">
          <q-item-side icon="view_module" />
          <q-item-main
            label="Serviços"
            title="...acompanhamento e execução."
          />
        </q-item>

        <q-item to="MinhasAtividades">
          <q-item-side icon="view_module" />
          <q-item-main
            label="Minhas Atividades"
            title="...consulta e manutenção."
          />
        </q-item>

        <!-- <q-item to="logar">
          <q-item-side icon="view_module"/>
          <q-item-main label="Transporte" title="...rotas, coletas e entregas."/>
        </q-item>

        <q-item to="/">
          <q-item-side icon="settings"/>
          <q-item-main label="Configurações" title="...personalizadas do sistema."/>
        </q-item>-->
        <!-- <q-item @click.native="view('')" > -->
        <!-- <q-item to="servico" >
          <q-item-side icon="view_module" />
          <q-item-main label="Serviços"/>
        </q-item>-->
        <!-- <q-item >
          <q-item-side icon="gavel" />
          <q-item-main label="Produção"/>
        </q-item>-->
        <!-- <q-card-separator />
        <h7> Menu temporário</h7>

        <q-item to="exemplo" >
          <q-item-side icon=""/>
          <q-item-main label="Exemplos" />
        </q-item>

        <q-item to="logar" >
          <q-item-side icon="" />
          <q-item-main label="Login"  />
        </q-item>-->
        <!-- <q-item to="ccFormProduto" >
          <q-item-side icon="fitness_center" />
          <q-item-main label="Form Produtos" />
        </q-item>-->
        <!--
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>-->
      </q-list>

      <br>
      <q-card-separator />
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import cardusuario from "../components/card/usuario";

export default {
  name: "LayoutDefault",
  components: {
    cardusuario
    // selecaoLinguagem
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL
  }
};
</script>

<style>
</style>
