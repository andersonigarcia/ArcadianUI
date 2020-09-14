<template>
  <div class="q-mt-md">
    <q-list class="rounded-borders text-brand-5 col-grow">
      <q-expansion-item dense header-class="bg-grey-2" dense-toggle default-opened expand-icon='_'>
        <template v-slot:header>
          <q-item-section>Selecione o(s) elemento(s)</q-item-section>
        </template>
      </q-expansion-item>
    </q-list>

    <div class="q-ma-md">
      <div class="row no-wrap q-gutter-xs">
        <div class="col" v-for="n in 8" :key="10+n" @click="action(19-n)">
          <q-icon class="float-right" vertical-bottom  :size="getSize(19-n)" :name="getIcon(19-n)"/>
        </div>
        <q-separator spaced vertical />
        <div class="col" v-for="n in 8" :key="20+n" @click="action('2'+n)">
          <q-icon class="float-right" vertical-top :size="getSize('2'+n)" :name="getIcon('2'+n)"/>
        </div>
      </div>
      <q-separator class="q-my-xs"/>
      <div class="row no-wrap q-gutter-xs">
        <div class="col" v-for="n in 8" :key="40+n" @click="action(49-n)">
          <q-icon class="float-right" vertical-top :size="getSize(49-n)" :name="getIcon(49-n)"/>
        </div>
        <q-separator spaced vertical/>
        <div class="col" v-for="n in 8" :key="30+n" @click="action('3'+n)">
          <q-icon class="float-right" vertical-bottom :size="getSize('3'+n)" :name="getIcon('3'+n)"/>
        </div>
      </div>
      <element-dialog :visible="elementDialogVisible" message="Especificação do elemento" @option="confirmatioDialog" @hide="elementDialogVisible = false" :element="elemento" default="ok"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Organograma',
  data () {
    return {
      elemento: {},
      elementDialogVisible: false,
      elementoId: 0,
      icon11: { icon: this.getPathFull(11, false), checked: false, size: '19.9px' },
      icon12: { icon: this.getPathFull(12, false), checked: false, size: '19.3px' },
      icon13: { icon: this.getPathFull(13, false), checked: false, size: '19px' },
      icon14: { icon: this.getPathFull(14, false), checked: false, size: '18.3px' },
      icon15: { icon: this.getPathFull(15, false), checked: false, size: '18px' },
      icon16: { icon: this.getPathFull(16, false), checked: false, size: '17.4px' },
      icon17: { icon: this.getPathFull(17, false), checked: false, size: '17px' },
      icon18: { icon: this.getPathFull(18, false), checked: false, size: '16.6px' },

      icon21: { icon: this.getPathFull(21, false), checked: false, size: '19.9px' },
      icon22: { icon: this.getPathFull(22, false), checked: false, size: '19.3px' },
      icon23: { icon: this.getPathFull(23, false), checked: false, size: '19px' },
      icon24: { icon: this.getPathFull(24, false), checked: false, size: '18.3px' },
      icon25: { icon: this.getPathFull(25, false), checked: false, size: '18px' },
      icon26: { icon: this.getPathFull(26, false), checked: false, size: '17.4px' },
      icon27: { icon: this.getPathFull(27, false), checked: false, size: '17px' },
      icon28: { icon: this.getPathFull(28, false), checked: false, size: '16.6px' },

      icon31: { icon: this.getPathFull(31, false), checked: false, size: '19.9px' },
      icon32: { icon: this.getPathFull(32, false), checked: false, size: '19.3px' },
      icon33: { icon: this.getPathFull(33, false), checked: false, size: '19px' },
      icon34: { icon: this.getPathFull(34, false), checked: false, size: '18.3px' },
      icon35: { icon: this.getPathFull(35, false), checked: false, size: '18px' },
      icon36: { icon: this.getPathFull(36, false), checked: false, size: '17.4px' },
      icon37: { icon: this.getPathFull(37, false), checked: false, size: '17px' },
      icon38: { icon: this.getPathFull(38, false), checked: false, size: '16.6px' },

      icon41: { icon: this.getPathFull(41, false), checked: false, size: '19.9px' },
      icon42: { icon: this.getPathFull(42, false), checked: false, size: '19.3px' },
      icon43: { icon: this.getPathFull(43, false), checked: false, size: '19px' },
      icon44: { icon: this.getPathFull(44, false), checked: false, size: '18.3px' },
      icon45: { icon: this.getPathFull(45, false), checked: false, size: '18px' },
      icon46: { icon: this.getPathFull(46, false), checked: false, size: '17.4px' },
      icon47: { icon: this.getPathFull(47, false), checked: false, size: '17px' },
      icon48: { icon: this.getPathFull(48, false), checked: false, size: '16.6px' }
    }
  },
  computed: {
    itens () { return this.$store.state.Servico.state.itens }
  },
  methods: {
    action (id, check) {
      this.elemento = this.getElementoState(id)
      this.elementDialogVisible = true
      this.elementoId = id
    },
    alterIcon (id, check) {
      this['icon' + id].checked = check
      this['icon' + id].icon = this.getPathFull(id, check)
    },
    confirmatioDialog (confirm, o) {
      this[confirm](o)
    },
    getElementoState (id) {
      return this.itens ? this.itens.find(a => a.elemento === id) : {}
    },
    getIcon (id) {
      return this['icon' + id].icon
    },
    getSize (id) {
      return this['icon' + id].size
    },
    getPathFull (id, cheked) {
      let nome = id + (cheked ? `c.jpg` : `u.jpg`)
      return 'img:statics/odg/' + nome
    },
    isPropertiesObjectEmpty (o) {
      let empty = true

      if (!_.isEmpty(o)) {
        Object.getOwnPropertyNames(o).forEach((e) => {
          if (e === '__ob__') return
          empty = e === ''
        })
      }
      return empty
    },
    confirmarElemento (e) {
      if (this.isPropertiesObjectEmpty(e)) { return }
      this.alterIcon(this.elementoId, true)
      e.elemento = this.elementoId
      this.$emit('incluirElemento', e)
    }
  }
}
</script>
