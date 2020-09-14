<template>
  <q-layout view="hHH Lpr lfr" container>
    <q-header elevated class="flat">
      <q-toolbar class="text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-separator dark vertical inset/>
        <q-toolbar-title>
          <div class="text-subtitle1 a-lh-sm">{{ title }}</div>
          <div class="text-grey-4 a-text-caption-sm a-lh-sm" v-show="subtitle">{{ subtitle }}</div>
        </q-toolbar-title>
        <q-btn dense flat icon="inbox" class="q-ml-sm">
          <q-badge color="red" floating>9</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-white">
      <q-list>
        <q-item dense clickable to="/" class="bg-grey-3">
          <q-item-section>
            <q-item-label header class="text-h6 a-text-dense text-grey-10"> MENU
              <q-item-label caption class="a-text-dense">Gestão laboratorial</q-item-label>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item clickable :to="identityUrl">
          <q-item-section avatar>
            <q-icon name="perm_identity"/>
          </q-item-section>
          <q-item-section>{{ user }}</q-item-section>
        </q-item>
        <q-separator/>
        <q-item-label header>Produção</q-item-label>
        <q-separator inset/>
        <q-item clickable to="/ordem-servico" exact>
          <q-item-section avatar>
            <q-icon name="add_circle"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Nova Ordem de Serviço</q-item-label>
            <q-item-label caption>Registrar nova ordem de serviço</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/ordens-servicos" exact>
          <q-item-section avatar>
            <q-icon name="ballot"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Ordens de Serviços</q-item-label>
            <q-item-label caption>Acompanhar OSs e seus serviços</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/inbox">
          <q-item-section avatar>
            <q-icon name="inbox"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Minhas Atividades</q-item-label>
            <q-item-label caption>Inbox das minhas atividades</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item-label header>Cadastro</q-item-label>
        <q-separator inset/>
        <q-item clickable to="/clientes">
          <q-item-section avatar>
            <q-icon name="account_box"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Dentistas, clínicas e outros</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/produtos">
          <q-item-section avatar>
            <q-icon name="style"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Produtos</q-item-label>
            <q-item-label caption>Produtos e suas atividades</q-item-label>
          </q-item-section>
        </q-item>
         <q-item clickable to="/categorias">
          <q-item-section avatar>
            <q-icon name="collections_bookmark"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Categorias</q-item-label>
            <q-item-label caption>Categorias de produtos</q-item-label>
          </q-item-section>
        </q-item>
         <q-item clickable to="/workflows">
          <q-item-section avatar>
            <q-icon name="vertical_split"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Workflows</q-item-label>
            <q-item-label caption>Workflows de produtos</q-item-label>
          </q-item-section>
        </q-item>
         <!-- <q-item clickable to="/teste/Workflow">
          <q-item-section avatar>
            <q-icon name="vertical_split"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>teste workflow</q-item-label>
            <q-item-label caption>teste de drag in grop</q-item-label>
          </q-item-section>
        </q-item> -->
         <q-item clickable to="/colaboradores">
          <q-item-section avatar>
            <q-icon name="assignment_ind"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Colaboradores</q-item-label>
            <q-item-label caption>Lista de Colaboradores</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item clickable :to="signOutUrl">
          <q-item-section avatar>
            <q-icon name="highlight_off"/>
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
        <q-separator/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import urls from '../router/urls'

export default {
  name: 'Default',
  data () {
    return {
      leftDrawerOpen: this.$q.screen.gt.xs,
      identityUrl: urls.identity,
      signOutUrl: urls.singOut
    }
  },

  computed: {
    title () { return this.$route.meta.title },
    subtitle () { return this.$route.meta.subtitle },
    user () { return this.$q.cookies.get(urls.cookieName) }
  }
}
</script>
