<template>
  <q-page padding>
    <search-input v-if="grupos" v-model="filtro" ref="search"/>
    <template v-if="grupos">
      <div v-for="(atividades, agrupamento) in grupos" :key="agrupamento">
        <inbox-list :atividades="atividades" :agrupamento="agrupamento"/>
      </div>
    </template>
    <page-loading :showing="!grupos"/>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { simpleSearch } from 'utils/smart-search'
import { groupBy } from 'utils/array.js'

export default {
  name: 'Inbox',

  data () { return { filtro: '' } },

  methods: {
    ...mapActions('Inbox', ['getInbox'])
  },

  computed: {
    ...mapState('Inbox', ['InboxState']),

    grupos () {
      if (!this.InboxState.success) return []
      let state = simpleSearch(this.InboxState.atividades, this.filtro, ['atividade_nome', 'produto_nome', 'os_tag'])
      return groupBy(state, 'agrupamento')
    }
  },

  async mounted () {
    await this.getInbox('4f74c2e9-390e-4411-8c32-bd4b9b6563e2')
  }
}
</script>
