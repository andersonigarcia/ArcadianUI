<template>
  <q-dialog v-model="show" v-on="$listeners" persistent v-close-popup :maximized="true" @before-show="initilize" ref="dialog">
    <q-card>
        <q-card-section>
          <q-icon class="col self-start q-mr-md" name="list" color="brand-1" size="2.2em"/>
          <span class="col self-center" v-html="message"></span>
        </q-card-section>
        <q-separator />
        <q-card-section >
          <div class="a-text-dense text-brand-5">
            <span>Escala: </span>
            <q-radio v-model="elemento.escalaUsada" val="1" label="Classica" color="brand-2" @input="alterarEscala" />
            <q-radio v-model="elemento.escalaUsada" val="2" label="3D" color="brand-2" @input="alterarEscala"/>
            <q-radio v-model="elemento.escalaUsada" val="3" label="Acrílica" color="brand-2" @input="alterarEscala"/>
          </div>
          <q-select outlined v-model="elemento.terco_incisal_cor" label="Cor do terço incisal" class="col-xs-12 col-grow a-text-dense" input-debounce="0" use-input dense hide-selected options-dense fill-input :options="escalaOptions" lazy-rules :rules="[val => val !== ''  && val !== undefined  || 'Informe a cor do terço incisal']" hide-bottom-space ref="corTercoIncisal">
            <template v-slot:prepend>
              <q-icon name="img:statics/odg/terco_incisal.jpg" size="1.2rem"/>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section >
           <q-select outlined v-model="elemento.terco_medio_cor" label="Cor do terço médio" class="col-xs-12 col-grow a-text-dense" input-debounce="0" use-input dense hide-selected options-dense fill-input :options="escalaOptions" lazy-rules :rules="[val => val !== ''  && val !== undefined  || 'Informe a cor do terço médio']" hide-bottom-space ref="corTercoMedio">
            <template v-slot:prepend>
               <q-icon name="img:statics/odg/terco_medial.jpg" size="1.2rem"/>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section >
           <q-select outlined v-model="elemento.terco_cervical_cor" label="Cor do terço cervival" class="col-xs-12 col-grow a-text-dense" input-debounce="0" use-input dense hide-selected options-dense fill-input :options="escalaOptions" lazy-rules :rules="[val => val !== ''  && val !== undefined  || 'Informe a cor do terço cervical']" hide-bottom-space ref="corTercoCervical">
            <template v-slot:prepend>
               <q-icon name="img:statics/odg/terco_cervical.jpg" size="1.2rem"/>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section >
          <q-card flat bordered class="q-pa-xs">
            <div>
              <q-icon name="texture" size="1.3rem"/>
              <span class="a-text-dense text-brand-6 q-ml-xs">Textura</span>
            </div>
            <q-separator class="q-my-xs"/>
            <q-btn-toggle v-model="elemento.textura" spread dense no-caps unelevated toggle-color="brand-2" color="white" text-color="brand-6" :options="texturas"/>
          </q-card>
        </q-card-section>
        <q-card-section >
          <q-card flat bordered class="q-pa-xs">
            <div >
              <q-icon name="blur_linear" size="1.3rem"/>
              <span class="a-text-dense text-brand-6 q-ml-xs">Substrato</span>
            </div>
            <q-separator class="q-my-xs"/>
            <q-btn-toggle v-model="elemento.substrato_tipo" spread dense no-caps unelevated toggle-color="brand-2" color="white" text-color="brand-6" :options="substratos"/>
            <q-select v-if="substratoExigeCor" outlined v-model="elemento.substrato_cor" label="Cor" class="col-xs-12 col-grow a-text-dense q-ma-xs" input-debounce="0" use-input dense hide-selected options-dense fill-input :options="escalaOptions" lazy-rules hide-bottom-space :rules="[val => val !== ''  && val !== undefined  || 'Informe a cor substrato']" ref="corSubstrato">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card>
        </q-card-section>
        <q-card-section>
           <q-input v-model="elemento.observacao" label="Observação:" stack-label outlined dense autogrow />
        </q-card-section>
        <q-card-actions class="q-mr-sm" align="right">
         <q-btn label="confirmar" :color="defaultOk" @click="confirmarElemento"/>
         <q-btn label="cancelar" :color="defaultCancel" :text-color="defaultOk" v-close-popup/>
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script>
import ConfirmationDialogMixin from 'mixins/comum/confirmation-dialog'
import ValidateMixin from 'mixins/comum/validate'
import input from '../../utils/input'

const escalaCoresClassica = ['BL1', 'BL2', 'BL3', 'BL4', 'A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D2', 'D3', 'D4']
const escalaCores3D = ['0M2', '0M3', '0M1', '1M1', '1M2', 'c2L1.5', '2L2.5', '2M1', '2M2', '2M3', '2R1.5', '2R2.5', '3L1.5', '3L2.5', '3M1', '3M2', '3M3', '3R1.5', '3R2.5', '4L1.5', 'L2.5,4M1', '4M2', '4M3', '4R1.5', '4R2.5', '5M1', '5M2', '5M3']
const escalaCoresAcrilica = ['59', '51', '91', '62', '66', '52', '53', '92', '63', '54', '65', '93', '55', '69', '94', '95', '67', '56', '77', '81', '96', '83', '84', '85', '64', '68', '70', '82']
const listaSubstratos = [{ label: 'P. Metálico', value: 'PinoMetalico' }, { label: 'P. Estético', value: 'PinoEstetico' }, { label: 'Dente', value: 'Dente' }]
const listaTexturas = [{ label: 'Lisa', value: 'Lisa' }, { label: 'Media', value: 'Media' }, { label: 'Aspera', value: 'Aspera' }]

function Elemento (tercoIncisalCor, tercoMedioCor, tercoCervicalCor, substratoCor, escalaUsada, substratoTipo, textura, observacao) {
  this.terco_incisal_cor = tercoIncisalCor
  this.terco_medio_cor = tercoMedioCor
  this.terco_cervical_cor = tercoCervicalCor
  this.substrato_cor = substratoCor
  this.escalaUsada = escalaUsada
  this.substrato_tipo = substratoTipo
  this.textura = textura
  this.observacao = observacao
}

export default {
  name: 'ConfirmationDialog',
  mixins: [ConfirmationDialogMixin, ValidateMixin],
  props: {
    message: { type: String, required: true },
    element: { type: Object, required: false }
  },
  data () {
    return {
      elemento: new Elemento(),
      escalaOptions: [],
      substratos: listaSubstratos,
      texturas: listaTexturas
    }
  },
  computed: {
    substratoExigeCor () { return this.elemento.substrato_tipo === 'PinoEstetico' || this.elemento.substrato_tipo === 'Dente' }
  },
  mounted () {
    this.escalaOptions = escalaCoresClassica
  },
  methods: {
    alterarEscala () {
      this.clearAllColors()
      switch (this.elemento.escalaUsada) {
        case '2':
          this.escalaOptions = escalaCores3D
          break
        case '3':
          this.escalaOptions = escalaCoresAcrilica
          break
        default:
          this.escalaOptions = escalaCoresClassica
          break
      }
    },
    clearAll () {
      this.elemento = new Elemento()
    },
    clearAllColors () {
      this.elemento.terco_incisal_cor = ''
      this.elemento.terco_medio_cor = ''
      this.elemento.terco_cervical_cor = ''
      this.elemento.substrato_cor = ''
    },
    initilize () {
      this.clearAll()
      this.elemento.escalaUsada = '1'
      if (!input.isEmpty(this.element)) {
        this.elemento = this.element
      }
    },
    confirmarElemento () {
      this.validate()
      if (this.hasError) { return }
      if (input.isEmpty(this.elemento.textura)) {
        this.$app.error('Informe a textura do elemento')
        this.error = true
      }
      if (input.isEmpty(this.elemento.substrato_tipo)) {
        this.$app.error('Informe o tipo de substrato do elemento')
        this.error = true
      }
      if (this.hasError) { return }
      this.$emit('option', 'confirmarElemento', this.elemento)
      this.$refs.dialog.hide()
    }
  }
}
</script>
