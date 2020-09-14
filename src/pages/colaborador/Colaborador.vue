<template>
  <div v-if="loaded" class="q-gutter-y-sm q-ma-sm">
    <form @submit.prevent="submit" @reset.prevent.stop="onReset">
      <div class="row q-mb-sm">
        <q-toggle v-model="clienteAtivo" class="a-text-dense-xs" :label="clienteAtivo? 'Ativo':'Inativo'" unchecked-icon="clear" checked-icon="check" color="green" dense/>
      </div>

      <q-card flat bordered class="q-mt-sm">
        <q-card-section>
          <span class="a-text-dense-sm">Período de trabalho</span>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-x-md">
            <expediente-select v-model="periodoExpediente" :readonly="true" label="Expediente" :rules="[ val => val || 'Informe o dia da semana']" ref="periodoExpediente"/>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-sm">
        <q-card-section>
          <span class="a-text-dense-sm">Dados do colaborador</span>
        </q-card-section>
        <q-card-section>
          <pessoa-group :completo="true" module="Colaborador" state="colaborador" ref="pessoa" />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-sm">
          <q-card-section>
            <span class="a-text-dense-sm">Atividades que desempenha</span>
          </q-card-section>
          <q-card-section>
            <div class="row">
            <q-select outlined v-model="selectedItem" label="Selecione uma atividade"  class="col-grow a-text-dense" input-debounce="0" use-input dense options-dense :options="options" hide-selected @filter="filter" @input="add">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
                </q-item>
              </template>
            </q-select>
            </div>

            <div class="row q-mt-md">
              <q-list class="rounded-borders text-brand-5 col-grow">
                <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened>
                  <template v-slot:header>
                    <div class="q-mr-md c-margin-total text-brand-5">{{ totalAtividades }}</div>
                    <q-item-section>Competência(s)</q-item-section>
                  </template>

                  <div v-for="(atividade, index) in this.Competencias" :key="atividade.atividade_id" >
                    <q-item  dense class="bg-white q-col-gutter-x-md">
                      <q-item-section class="col-sm-11">
                        <q-item-label caption class="a-text-dense a-lh-xs">{{atividade.atividade_nome}}</q-item-label>
                      </q-item-section>
                      <q-item-section class="on-rigth" >
                        <div >
                          <q-btn class="c-btn-del" dense flat icon="delete" size="sm" @click="remove(index)"/>
                        </div >
                      </q-item-section >
                    </q-item>
                    <q-separator inset />
                  </div>
                </q-expansion-item>
            </q-list>
            </div>
          </q-card-section>
        </q-card>

      <div class="q-mt-sm">
        <save-buttons :submitting="submitting" :disableConfirmar="stateUnchanged"/>
      </div>

    </form>
    <confirmation-dialog :visible="dialogVisible" :message="dialogMessage" @option="confirmatioDialog" @hide="dialogVisible = false"/>
  </div>
</template>

<script>
import date from 'utils/date'
import FormMixin from 'mixins/comum/form'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { mapActions } from 'vuex'

const pathList = '/Colaboradores'
const nameModule = 'Colaborador'
const nameStateCompetencias = 'competencias'
const nameStateColaborador = 'colaborador'

export default {
  name: 'Colaborador',
  mixins: [StateMixin, ValidateMixin, FormMixin],
  props: {
    module: { type: String, default: nameModule },
    state: { type: String, default: nameStateColaborador },
    tipo: { type: String },
    params: { type: String }
  },
  data () {
    return {
      local: {
        hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      },
      dialogVisible: false,
      dialogMessage: 'Confirma a inclusão do colcaborador?',
      loaded: false,
      periodoExpediente: '',
      Competencias: [],
      listAtividades: '',
      selectedItem: '',
      options: []
    }
  },

  computed: {
    stateOriginal () { return this.$store.state.Colaboradores.original },
    stateColaborador () { return this.$store.state.Colaborador.state },
    stateUnchanged () { return !this.isModuleChanged(nameModule) },
    paramsId () { return this.$route.params.id },
    totalAtividades () { return this.Competencias.length },
    clienteAtivo: {
      get () { return this.getState('ativo', nameStateColaborador) || false },
      set (value) { this.setState('ativo', value, nameStateColaborador) }
    }
  },

  methods: {
    ...mapActions('Colaborador', ['getColaboradoresId', 'postColaboradores', 'putColaboradores', 'postColaboradoresCompetencia', 'removeElementState', 'pushState', 'getStateOriginal']),
    ...mapActions('Atividade', ['getAtividades']),

    onReset () {
      if (this.stateUnchanged) { this.$router.push(pathList) }
      this.dialogVisible = true
      this.dialogMessage = `Os dados alterados e não salvos serão perdidos. Confirma?`
    },

    async getAllAtividades () {
      let data = await this.getAtividades()
      if (!data.success) return
      this.listAtividades = data.atividades.map(ativ => ({ label: ativ.atividade_nome, value: ativ.atividade_id }))
    },

    filter (value, update) {
      value === ''
        ? update(() => { this.options = this.listAtividades })
        : update(() => { this.options = this.listAtividades.filter(v => v.label.toLowerCase().includes(value)) })
    },

    add () {
      let itemId = this.selectedItem.value
      if (!this.Competencias.find(p => p.atividade_id === itemId)) {
        this.pushState({ state: nameStateCompetencias, data: { atividade_id: itemId, atividade_nome: this.selectedItem.label } })
        this.Competencias = this.stateColaborador.competencias
      }
    },
    remove (index) {
      this.removeElementState({ state: nameStateCompetencias, index: index })
      this.Competencias = this.stateColaborador.competencias
    },
    async getColaborador (id) {
      if (id) { await this.getColaboradoresId(id) }
      await this.getAllAtividades()
      this.Competencias = this.stateColaborador.competencias || []
    },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') return
      this[confirm]()
    },

    async ok () { this.$router.push(pathList) },

    async send () {
      let result = {}
      if (this.isStateChanged(nameModule, nameStateColaborador)) {
        result = await this.sendColaborador()
      }

      if ((!this.paramsId && !result.success) || !this.isStateChanged(nameModule, nameStateCompetencias)) return

      let colaboradorId = this.paramsId || result.colaborador.colaborador.colaborador_id
      await this.sendCompetencias(colaboradorId)

      if (!this.paramsId) {
        await setTimeout(this.$router.replace({ name: 'edit_colaborador', params: { id: colaboradorId } }), 1500)
      }
      this.getStateOriginal(colaboradorId)
    },
    async sendColaborador () {
      let colaborador = this.getPostColaborador()
      if (this.paramsId) {
        colaborador.id = this.paramsId
        return this.putColaboradores({ obj: colaborador, itemNotify: nameStateColaborador })
      }
      return this.postColaboradores(colaborador)
    },
    async sendCompetencias (colaboradorId) {
      let competencias = this.getPostCompetencias(colaboradorId)
      return this.postColaboradoresCompetencia({ obj: competencias, itemNotify: nameStateCompetencias })
    },
    getPostContato (state) {
      let obj = {}
      !this.getState('nome', state) || (obj.nome = this.getState('nome', state))
      !this.getState('email', state) || (obj.email = this.getState('email', state))
      !this.getState('fone_a', state) || (obj.fone_a = this.getState('fone_a', state))
      !this.getState('fone_b', state) || (obj.fone_b = this.getState('fone_b', state))
      return obj
    },
    getPostCompetencias (colaboradorId) {
      let obj = { id: colaboradorId }
      obj.competencias = []
      let competencias = this.stateColaborador.competencias
      if (!competencias || competencias.length === 0) { return obj }
      competencias.forEach((item) => { obj.competencias.push({ atividade_id: item.atividade_id }) })
      return obj
    },
    getPostPessoa (state) {
      let obj = this.getPostContato(state)
      let cpf = this.getState('cpf', state)
      let dataNascimento = this.getState('data_nascimento', state)

      if (cpf) { obj.cpf = cpf }

      if (!!dataNascimento && dataNascimento !== 'T00:00:00') {
        obj.data_nascimento = date.formatDate(dataNascimento, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      return obj
    },
    getPostColaborador () {
      let obj = {}
      obj.colaborador = { ativo: this.clienteAtivo, pessoa: this.getPostPessoa(nameStateColaborador) }

      obj.colaborador.expediente = []
      obj.colaborador.expediente.push(this.getPostExpediente('Segunda'))
      obj.colaborador.expediente.push(this.getPostExpediente('Terça'))
      obj.colaborador.expediente.push(this.getPostExpediente('Quarta'))
      obj.colaborador.expediente.push(this.getPostExpediente('Quinta'))
      obj.colaborador.expediente.push(this.getPostExpediente('Sexta'))
      return obj
    },
    // TODO: Refazer de acordo com a regra de expediente
    getPostExpediente (dia) {
      // Criado temporariamente até a revisão das regras e composição dos trunos pelos laboratorios.
      // Processo a definir. Será revisado e refeita toda a codificação
      let turnoManha = {}
      turnoManha.inicio = '08:00'
      turnoManha.termino = '12:00'

      let turnoTarde = {}
      turnoTarde.inicio = '08:00'
      turnoTarde.termino = '18:00'

      let obj = { turnos: [], dia_da_semana: dia }
      obj.turnos.push(turnoManha)
      obj.turnos.push(turnoTarde)
      return obj
    }
  },
  async mounted () {
    this.$q.loading.show()
    await this.getColaborador(this.paramsId)
    this.loaded = true
    this.$q.loading.hide()
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit(`Colaborador/CLEAR_STATE_ROOT`)
    next()
  }
}
</script>
<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
  .c-margin-total {
    margin-top: 4px;
  }
</style>
