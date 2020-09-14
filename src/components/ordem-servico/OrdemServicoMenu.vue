<template>
  <q-btn-dropdown class="col-1 q-ml-sm a-remove-btn-dd-arrow" flat round color="brand-1" size="sm" icon="more_vert">
    <q-list dense>
      <q-item v-if="editar" clickable v-close-popup :to="`/ordens-servicos/edit/${tag}`">
        <q-item-section>
          <q-item-label>Editar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="planejar" clickable v-close-popup :to="`/planejamentos/${tag}`">
        <q-item-section>
          <q-item-label>Planejar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="detalhes" clickable v-close-popup :to="`/ordens-servicos/detalhe/${tag}`">
        <q-item-section>
          <q-item-label>Detalhes</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'OrdemServicoMenu',
  props: {
    acoes: [Object, String],
    tag: { type: String, required: true }
  },
  computed: {
    detalhes () {
      return this.todas() || this.acoes.detalhes || false
    },
    editar () {
      return this.todas() || this.acoes.editar || false
    },
    planejar () {
      return this.todas() || this.acoes.planejar || false
    }
  },
  methods: {
    todas () {
      return this.acoes === 'todas'
    }
  }
}
</script>
