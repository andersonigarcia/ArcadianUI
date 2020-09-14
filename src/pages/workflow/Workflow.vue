<template>
  <div v-if="loaded" class="q-gutter-y-sm q-ma-sm">
    <form @submit.prevent="submit" @reset.prevent.stop="onReset">
      <q-card flat bordered class="q-mt-sm">
        <q-card-section>
          <span class="a-text-dense-sm">Template</span>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-x-md">
              <q-input v-model="nome" type="text" outlined dense class="col-grow " label="Nome *" stack-label lazy-rules :rules="[ val => val && val.length > 3  || 'Nome não informado ou inválido']" ref="inputNome"/>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mt-sm">
          <q-card-section>
            <span class="a-text-dense-sm">Sequencia de execução das atividades </span>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-select outlined v-model="atividadeSelecionada" label="Selecione uma atividade"  class="col-grow a-text-dense" input-debounce="0" use-input dense options-dense :options="options" hide-selected @filter="filter" @input="add">
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
                    <q-item-section>Atividades</q-item-section>
                  </template>
                  <draggable :list="this.atividadesWorkflow" class="list-group" ghost-class="ghost" @start="dragging = true" @end="dragging = false">
                    <div v-for="(atividade, index) in this.atividadesWorkflow" :key="atividade.atividade_id" >
                      <q-item  dense class="bg-white q-col-gutter-x-md">
                        <q-item-section class="col-sm-11">
                          <q-item-label caption class="a-text-dense a-lh-xs">{{index}} - {{atividade.atividade_nome}}</q-item-label>
                        </q-item-section>
                        <q-item-section class="on-rigth" >
                          <div >
                            <q-btn class="c-btn-del" dense flat icon="delete" size="sm" @click="remove(index)"/>
                          </div >
                        </q-item-section >
                      </q-item>
                      <q-separator inset />
                    </div>
                  </draggable>
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
import draggable from 'vuedraggable'
import FormMixin from 'mixins/comum/form'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { mapActions } from 'vuex'

const nameModule = 'Workflow'
const nameStateWorkflow = 'workflow'
const nameStateAtividades = 'atividades'
const pathList = '/workflows'

export default {
  name: 'Workflow',
  components: { draggable },
  mixins: [FormMixin, StateMixin, ValidateMixin],
  props: {
    module: { type: String, default: nameModule },
    state: { type: String, default: nameStateWorkflow }
  },
  data () {
    return {
      atividadesWorkflow: [],
      atividadeSelecionada: '',
      dialogVisible: false,
      dialogMessage: 'Confirma a inclusão do colcaborador?',
      dragging: false,
      enabled: true,
      loaded: false,
      listaAtividades: '',
      options: []
    }
  },
  computed: {
    nome: {
      get () { return this.getState('nome') },
      set (value) { this.setState('nome', value) }
    },
    paramsId () { return this.$route.params.id },
    stateOriginal () { return this.$store.state.Workflow.original },
    stateWorkflow () { return this.$store.state.Workflow.state },
    stateUnchanged () { return !this.isModuleChanged(nameModule) },
    totalAtividades () { return this.atividadesWorkflow.length }
  },
  methods: {
    ...mapActions('Atividade', ['getAtividades']),
    ...mapActions('Workflow', ['getStateOriginal', 'getWorkflowId', 'postWorkflow', 'putWorkflow', 'postWorkflowAtividades', 'pushState', 'removeElementState']),
    async getListAtividades () {
      let data = await this.getAtividades()
      if (!data.success) return
      this.listaAtividades = data.atividades.map(ativ => ({ label: ativ.atividade_nome, value: ativ.atividade_id }))
    },
    getPostAtividades (workflowId) {
      let obj = { id: workflowId, atividades: [] }
      if (!this.stateWorkflow.atividades || this.stateWorkflow.atividades.length === 0) { return obj }

      this.stateWorkflow.atividades.forEach((item, index) => { obj.atividades.push({ atividade_id: item.atividade_id, ordem: index }) })
      return obj
    },
    async onRequest () {
      await this.getListAtividades()
      if (this.paramsId) { await this.getWorkflowId(this.paramsId) }
      this.atividadesWorkflow = this.stateWorkflow.atividades || []
    },
    filter (value, update) {
      if (value === '') {
        update(() => { this.options = this.listaAtividades })
        return
      }
      update(() => { this.options = this.listaAtividades.filter(v => v.label.toLowerCase().includes(value)) })
    },
    add () {
      let item = { index: 0, id: 0 }
      item.id = this.atividadeSelecionada.value

      if (!this.atividadesWorkflow.find(p => p.atividade_id === item.id)) {
        let atividade = { atividade_id: item.id, atividade_nome: this.atividadeSelecionada.label }
        this.pushState({ state: nameStateAtividades, data: atividade })
        this.atividadesWorkflow = this.stateWorkflow.atividades
      }
    },
    remove (index) {
      this.removeElementState({ state: nameStateAtividades, index: index })
      this.produtos = this.stateWorkflow.atividades
    },
    async send () {
      let result = {}
      if (this.isStateChanged(nameModule, nameStateWorkflow)) {
        result = await this.sendWorkflow(0)
      }

      if ((!this.paramsId && !result.success) || !this.isStateChanged(nameModule, nameStateAtividades)) return

      let workflowId = this.paramsId || result.workflow.workflow.workflow_Id
      await this.sendAtividades(workflowId)

      if (!this.paramsId) {
        await setTimeout(this.$router.replace({ name: 'editar_workflow', params: { id: workflowId } }), 1500)
      }
      this.getStateOriginal(workflowId)
    },
    async sendWorkflow () {
      let workflow = {}
      workflow.nome = this.nome

      if (this.paramsId) {
        workflow.id = this.paramsId
        return this.putWorkflow({ obj: workflow, itemNotify: nameStateWorkflow })
      }
      return this.postWorkflow({ obj: workflow, itemNotify: nameStateWorkflow })
    },
    async sendAtividades (workflowId) {
      let atividades = this.getPostAtividades(workflowId)
      await this.postWorkflowAtividades({ obj: atividades, itemNotify: nameStateAtividades })
    },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') return
      this[confirm]()
    },
    async ok () { this.$router.push(pathList) },
    onReset () {
      if (this.stateUnchanged) { this.$router.push(pathList) }
      this.dialogVisible = true
      this.dialogMessage = `Os dados alterados e não salvos serão perdidos. Confirma?`
    }
  },
  async mounted () {
    this.$q.loading.show()
    this.onRequest()
    this.$q.loading.hide()
    this.loaded = true
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit(`Workflow/CLEAR_STATE_ROOT`)
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
