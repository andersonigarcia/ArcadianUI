<template>
  <div class="q-mt-xs">
    <q-list class="rounded-borders text-brand-5">
      <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle expand-icon-toggle>
        <template v-slot:header>
          <div class="q-mr-md c-add-btn text-brand-5">{{quantidadeMateriaisSelecionados}}</div>
          <q-item-section>{{titulo}}</q-item-section>
        </template>

        <div v-for="(material, index) in this.materiais" :key="material.id">
          <q-item v-ripple dense class="bg-white">
            <q-item-section class="col-6">
              <q-item-label caption class="a-text-dense a-lh-xs">{{material.nome}}</q-item-label>
            </q-item-section>
            <q-separator vertical/>

            <q-item-section side>
              <q-input dense borderless v-model="quantidadeItem[index]" label="Quantidade" caption class="a-text-dense a-lh-xs" @input="inseriuValor(index)"/>
            </q-item-section>
            <q-separator vertical/>

            <q-item-section side >
              <q-toggle v-model="materiaisSelecionados" class="on-left" checked-icon="check" color="green" unchecked-icon="clear" @input="toggle(index)" :val="index"/>
            </q-item-section>
          </q-item>
          <q-separator inset v-if="index < totalMateriais - 1"/>
        </div>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'

function Material (id, quantidade) {
  this.id = id
  this.quantidade = quantidade
}

export default {
  name: 'MaterialCard',
  props: { materiais: Array, materiaisEdicao: Array },
  mixins: [StateMixin],
  data () {
    return {
      materiaisSelecionados: [],
      materiaisPost: [],
      totalMateriais: this.materiais ? this.materiais.length : 0,
      quantidadeItem: [this.totalMateriais]
    }
  },
  computed: {
    quantidadeMateriaisSelecionados () {
      return this.materiaisSelecionados ? this.materiaisSelecionados.length : 0
    },
    titulo () {
      return this.quantidadeMateriaisSelecionados < 2 ? ' Material' : ' Materiais'
    }
  },
  created () {
    this.preencheMateriaisEdicao()
  },
  methods: {
    atualizaStatePost () {
      let result = this.materiaisPost.filter(x => x !== undefined && x !== '')
      this.setState('materiais', result)
    },
    preencheMateriaisEdicao () {
      this.materiaisEdicao.forEach((item, index) => {
        this.materiaisSelecionados.push(index)
        this.quantidadeItem[index] = item.quantidade
        this.materiaisPost[index] = item
      })
    },
    setMateriaisPost (index) {
      let idMaterial = this.materiais[index].id
      let novoMaterial = new Material(idMaterial, this.quantidadeItem[index])

      if (Number.isNaN(Number.parseInt(this.quantidadeItem[index]))) {
        this.materiaisPost.splice(index, 1)
      } else {
        this.materiaisPost[index] = novoMaterial
      }
    },
    toggle (index) {
      let selecionou = !!Number.isNaN(Number.parseInt(this.quantidadeItem[index]))
      if (selecionou) {
        this.quantidadeItem[index] = 1
        this.setMateriaisPost(index)
      } else {
        this.quantidadeItem.splice(index, 1, '')
        this.materiaisPost.splice(index, 1, '')
      }

      this.atualizaStatePost()
    },
    inseriuValor (indexMaterial) {
      let qtdItemInformada = !!Number.isNaN(Number.parseInt(this.quantidadeItem[indexMaterial]))
      let indexToggleSelecionado = this.materiaisSelecionados.indexOf(indexMaterial)
      let naoEstaSelecionado = indexToggleSelecionado < 0

      if (qtdItemInformada) {
        this.materiaisSelecionados.splice(indexToggleSelecionado, 1)
        this.setMateriaisPost(indexMaterial)
      } else {
        if (naoEstaSelecionado) {
          this.materiaisSelecionados.push(indexMaterial)
          this.setMateriaisPost(indexMaterial)
        } else {
          this.setMateriaisPost(indexMaterial)
        }
      }
      this.atualizaStatePost()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .c-margin-titulo {
    margin-top: 3px;
  }

  .c-add-btn {
    @extend .c-margin-titulo;
    font-weight: bold;
    margin-left: 2px;
    position: relative;
    z-index: 100;
  }
</style>
