<template>
  <div>
    <div v-if="loaded" class="q-gutter-y-sm">
      <form @submit.prevent="submit" @reset.prevent.stop="onReset">

        <q-card>
          <q-tabs v-model="tab" dense class="text-teal" active-color="teal" indicator-color="teal" align="justify">
            <q-tab name="cliente" icon="account_box" label="Cliente"/>
            <q-tab name="endereco" icon="assignment" label="Endereço"/>
            <q-tab v-if="isCliente" name="condicao" icon="shopping_cart" label="Tabela"/>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated keep-alive>
            <q-tab-panel name="cliente" z-top>
              <div v-if="isCliente"  class="row q-mb-sm">
                  <q-toggle v-model="clienteAtivo" class="a-text-dense-xs" :label="clienteAtivo? 'Ativo':'Inativo'" unchecked-icon="clear" checked-icon="check" color="green" dense/>
              </div>
              <empresa-form v-if="isEmpresa" module="Cliente" state="empresa" ref="empresaForm"/>
              <profissional-form v-else module="Cliente" state="profissional" ref="profissionalForm" :pessoaId="profissionalId"/>
            </q-tab-panel>

            <q-tab-panel name="endereco">
              <endereco-form module="Cliente" state="Endereco" :pedidoCliente="isCliente" ref="enderecoForm"/>
            </q-tab-panel>

            <q-tab-panel  name="condicao">
              <condicoes-comerciais-group module="Cliente" state="cliente" ref="condicoesComerciais"/>
            </q-tab-panel>
          </q-tab-panels>
          <save-buttons :submitting="submitting" class="q-ml-md"/>
        </q-card>
      </form>
    </div>
    <confirmation-dialog :visible="dialogVisible" :message="dialogMessage" @option="confirmatioDialog" @hide="dialogVisible = false"/>
  </div>
</template>

<script>
import { date } from 'quasar'
import FormMixin from 'mixins/comum/form'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

import { mapActions } from 'vuex'

const pathClientes = '/Clientes'

const pathEditProfissional = '/Edit/Profissional/'
const pathEditProfCliente = '/Edit/Profissional/Cliente/'
const pathEditEmpresa = 'Edit/Empresa/Cliente/'
const tipoEmpresa = 'empresa'
const tipoProfissional = 'profissional'
const tipoCliente = 'cliente'
const tipoContato = 'contato'
const tipoVinculos = 'Vinculos'

const nameStateProfissional = 'profissional'
const nameStateCorrespondencia = 'Correspondencia'
const nameStateCliente = 'cliente'
const nameStateContato = 'contato'
const nameStateVinculos = 'vinculos'
const nameStateEmpresa = 'empresa'
const nameStateEntrega = 'Entrega'
const nameStateProdutos = 'produtos'
const nameStateTela = 'screen'
const nameModuleCliente = 'Cliente'

export default {
  mixins: [FormMixin, ValidateMixin, StateMixin],

  props: {
    module: { type: String, default: nameModuleCliente },
    state: { type: String, default: nameModuleCliente },
    tipo: { type: String },
    params: { type: String }
  },

  data () {
    return {
      tab: tipoCliente,
      dialogVisible: false,
      dialogMessage: '',
      loaded: false,
      lState: ''
    }
  },

  computed: {
    isEmpresa () { return this.cadastroTipo() === tipoEmpresa },
    isProfissional () { return this.cadastroTipo() === tipoProfissional },
    isProfissionalCliente () { return this.isProfissional && this.isCliente },
    isCliente () { return !!this.$route.params.cliente || !!this.pedidoCliente || this.isEmpresa },

    clienteAtivo: {
      get () { return !!this.getState('ativo', nameStateCliente) },
      set (value) { this.setState('ativo', value, nameStateCliente) }
    },

    clienteId () { return this.getState('cliente_id', nameStateCliente) },
    contatoId () { return this.getState('contato_id', nameStateContato) },
    empresaId () { return this.getState('empresa_id', nameStateCliente) },
    pedidoCliente () { return this.getState('pedidoCliente', nameStateTela) },
    profissionalId () { return this.getState('profissional_id', nameStateProfissional) },
    percentualAjuste () { return this.getState('ajuste_percentual', nameStateCliente) || 0 },

    cep () { return this.getState('cep', this.lState) },
    logradouro () { return this.getState('logradouro', this.lState) },
    dataNascimento () { return this.getState('data_nascimento', this.lState) },
    bairro () { return this.getState('bairro', this.lState) },
    cidade () { return this.getState('cidade', this.lState) },
    numero () { return this.getState('numero', this.lState) },
    referencia () { return this.getState('referencia', this.lState) },
    complemento () { return this.getState('complemento', this.lState) },
    unidade_federacao () { return this.getState('unidade_federacao', this.lState) },
    enderecoId () { return this.getState('id', this.lState) },

    nome () { return this.getState('nome', this.lState) },
    email () { return this.getState('email', this.lState) },
    foneA () { return this.getState('fone_a', this.lState) },
    foneB () { return this.getState('fone_b', this.lState) },
    cpf () { return this.getState('cpf', this.lState) },
    conselhoNumero () { return this.getState('conselho_numero', this.lState) },
    conselho () { return this.getState('conselho', this.lState) || 'CRO' },
    conselhoUf () { return this.getState('conselho_uf', this.lState) },

    cnpj () { return this.getState('cnpj', this.lState) },
    razaoSocial () { return this.getState('razao_social', this.lState) },
    responsavelId () { return this.getState('responsavel_id', this.lState) },
    responsavelNome () { return this.getState('responsavel_nome', this.lState) },

    stateOriginal () { return this.$store.state.Cliente.original },
    stateCliente () { return this.$store.state.Cliente.state },
    stateVinculos () { return this.stateCliente.vinculos },
    stateProduto () { return this.stateCliente.produtos },
    stateCorrespondencia () { return this.stateCliente.Correspondencia },
    stateEntrega () { return this.stateCliente.Entrega }
  },

  methods: {
    ...mapActions('Cliente', ['getClienteEdit', 'postClientesProfissional', 'putClientesProfissional', 'putClientesEmpresa', 'postClientesEmpresa', 'postClientesProdutos', 'putEnderecos', 'postEnderecos', 'getEnderecosPessoa', 'getEnderecosEmpresa', 'getProfissionalEdit', 'putProfissionais', 'postProfissionais', 'postProfissionaisVinculos', 'getProfissionalVinculo']),

    cadastroTipo () { return this.$route.params.tipo },
    isEdit () { return this.$route.params.acao === 'editar' },

    async profissionalEdit () {
      let result = await this.getProfissionalEdit(this.$route.params.id)

      if (!result.success) { return }

      this.setState('pedidoCliente', false, nameStateTela)
      this.setState('pedidoClinica', !!this.stateVinculos, nameStateTela)

      await this.getEnderecosPessoa(this.$route.params.id)
    },

    async clienteEdit () {
      let result = await this.getClienteEdit(this.$route.params.id)

      if (!result.success) { return }

      let profissionalId = result.clientes.cliente.profissional_id

      if (profissionalId) {
        result = await this.getEnderecosPessoa(profissionalId)

        if (!result.success) { return }

        this.setState('pedidoCliente', true, nameStateTela)
        this.setState('pedidoClinica', !!this.stateVinculos, nameStateTela)
      } else {
        let empresaId = result.clientes.cliente.empresa_id
        await this.getEnderecosEmpresa(empresaId)
      }
    },

    async getClienteEdicao () {
      if (!this.isEdit()) { return }
      this.isCliente ? await this.clienteEdit() : await this.profissionalEdit()
    },

    onReset () {
      if (!this.isModuleChanged(nameModuleCliente)) { this.$router.push(pathClientes) }
      this.dialogVisible = true
      this.dialogMessage = `Os dados alterados e não salvos serão perdidos. Confirma?`
    },

    confirmatioDialog (confirm) {
      if (confirm === 'cancel') return
      this[confirm]()
    },

    async ok () { this.$router.push(pathClientes) },

    async send () {
      if (this.isProfissionalCliente) {
        return this.sendProfissionalCliente()
      }

      if (this.isEmpresa) {
        return this.sendEmpresaCliente()
      }

      this.sendProfissional()
    },

    async sendProfissional () {
      let result = {}
      let profissional = {}
      let profissionalNome = ''

      if (this.isStateChanged(nameModuleCliente, nameStateProfissional)) {
        profissional = this.getPostProfissional()

        if (this.isEdit()) {
          profissional.id = this.profissionalId
          result = await this.putProfissionais({ obj: profissional, itemNotify: nameStateProfissional })
        } else {
          result = await this.postProfissionais({ obj: profissional, itemNotify: nameStateProfissional })
          profissional.id = result.profissional.profissional.profissional_id
        }
        if (!result.success) return
        profissionalNome = result.profissional.profissional.nome
      }

      if (this.isStateChanged(nameModuleCliente, nameStateCorrespondencia)) {
        this.lState = nameStateCorrespondencia
        await this.sendEndereco(tipoProfissional, profissional.id, profissionalNome)
      }

      if (!this.isEdit()) { // Redireciona para modo de edição
        await setTimeout(this.$router.replace(`${pathEditProfissional}${profissional.id}`), 2000)
      }
    },

    async sendProfissionalCliente () {
      let result = {}

      this.lState = nameStateProfissional
      let profissionalNome = this.nome

      if (this.isStateChanged(nameModuleCliente, nameStateProfissional)) {
        result = await this.sendCliente()
      }

      if (!result.success && !this.profissionalId) return

      if (this.isStateChanged(nameModuleCliente, nameStateCorrespondencia)) {
        this.lState = nameStateCorrespondencia
        await this.sendEndereco(tipoProfissional, this.profissionalId, profissionalNome)
      }

      if (this.isStateChanged(nameModuleCliente, nameStateEntrega)) {
        this.lState = nameStateEntrega
        await this.sendEndereco(tipoProfissional, this.profissionalId, profissionalNome)
      }

      if (this.isStateChanged(nameModuleCliente, nameStateVinculos)) {
        await this.sendVinvulos(this.profissionalId)
      }

      if (this.isStateChanged(nameModuleCliente, nameStateProdutos) ||
          this.percentualAjuste !== this.$store.state.Cliente.original.cliente.ajuste_percentual) {
        await this.sendProdutos(this.clienteId)
      }

      if (!this.isEdit()) { // Redireciona para modo de edição
        await setTimeout(this.$router.replace(`${pathEditProfCliente}${this.clienteId}`), 2000)
      }
    },

    async  sendEmpresaCliente () {
      let result = {}
      this.lState = nameStateEmpresa

      if (this.isStateChanged(nameModuleCliente, nameStateEmpresa) ||
          this.isStateChanged(nameModuleCliente, nameStateContato) ||
          this.stateCliente.cliente.ativo !== this.$store.state.Cliente.original.cliente.ativo) {
        result = await this.sendEmpresa()
      }

      if (!result.success && !this.empresaId) return

      let empresaId = this.empresaId || result.clientes.cliente.empresa_id
      let empresaNome = this.nome || result.clientes.cliente.nome
      let clienteId = this.clienteId || result.clientes.cliente.cliente_id

      if (this.isStateChanged(nameModuleCliente, nameStateCorrespondencia)) {
        this.lState = nameStateCorrespondencia
        await this.sendEndereco(tipoEmpresa, empresaId, empresaNome)
      }

      if (this.isStateChanged(nameModuleCliente, nameStateEntrega)) {
        this.lState = nameStateEntrega
        await this.sendEndereco(tipoEmpresa, empresaId, empresaNome)
      }

      if (this.isStateChanged(nameModuleCliente, nameStateProdutos) ||
      (this.stateOriginal.cliente && this.percentualAjuste !== this.$store.state.Cliente.original.cliente.ajuste_percentual)) {
        await this.sendProdutos(clienteId)
      }

      if (!this.isEdit()) { // Redireciona para modo de edição
        await setTimeout(this.$router.replace(`${pathEditEmpresa}${clienteId}`), 2000)
      }
    },

    async sendEndereco (tipoCliente, clienteId, clienteNome) {
      let endereco = this.getPostEndereco(tipoCliente, clienteId, clienteNome)

      if (this.enderecoId) {
        return this.putEnderecos({ obj: endereco, itemNotify: this.lState })
      }

      let result = await this.postEnderecos({ obj: endereco, itemNotify: this.lState })
      if (result.sucess) { this.setState('id', result.endereco[0].id, this.lState) }

      return result
    },

    async sendCliente () {
      let profissional = {}

      profissional = this.getPostProfissional()
      profissional.cliente = this.getPostCliente(tipoContato)

      if (this.profissionalId) { profissional.profissional_id = this.profissionalId }

      if (this.isEdit()) {
        profissional.id = this.clienteId
        return this.putClientesProfissional({ obj: profissional, itemNotify: tipoCliente })
      }

      return this.postClientesProfissional({ obj: profissional, itemNotify: tipoCliente })
    },

    async sendEmpresa () {
      let empresa = {}
      empresa = this.getPostEmpresa()

      if (this.isEdit()) {
        empresa.id = this.clienteId
        return this.putClientesEmpresa({ obj: empresa, itemNotify: 'Empresa' })
      }

      return this.postClientesEmpresa({ obj: empresa, itemNotify: 'Empresa' })
    },

    async sendProdutos (idCliente) {
      let produtos = this.getPostProdutos(idCliente)
      return this.postClientesProdutos({ obj: produtos, itemNotify: 'Produtos' })
    },

    async sendVinvulos (idCliente) {
      let empresas = this.getPostVinculos(idCliente)
      return this.postProfissionaisVinculos({ obj: empresas, itemNotify: tipoVinculos })
    },

    getPostProdutos (idCliente) {
      let obj = { id: idCliente, ajuste_percentual: this.percentualAjuste, produtos: [] }
      this.stateProduto.forEach((value, i) => {
        obj.produtos.push({ produto_id: value.produto_id, valor: value.valor })
      })
      return obj
    },

    getPostVinculos (idCliente) {
      let obj = { id: idCliente, vinculos: [] }
      this.stateVinculos.forEach((value, i) => { obj.vinculos.push({ empresa_id: value.empresa_id }) })
      return obj
    },

    getPostEndereco (tipoCliente, clienteId, clienteNome) {
      let obj = { endereco: {} }
      if (this.enderecoId) { obj.id = this.enderecoId }

      if (tipoCliente.toLowerCase() === tipoProfissional) {
        obj.endereco.pessoa_id = clienteId
      } else {
        obj.endereco.empresa_id = clienteId
      }

      if (clienteNome) { obj.endereco.nome = clienteNome }
      if (this.lState) { obj.endereco.tipo = this.lState.toLowerCase() }
      if (this.cep) { obj.endereco.cep = this.cep }
      if (this.logradouro) { obj.endereco.logradouro = this.logradouro }
      if (this.numero) { obj.endereco.numero = this.numero }
      if (this.complemento) { obj.endereco.complemento = this.complemento }
      if (this.bairro) { obj.endereco.bairro = this.bairro }
      if (this.cidade) { obj.endereco.cidade = this.cidade }
      if (this.unidade_federacao) { obj.endereco.unidade_federacao = this.unidade_federacao }
      if (this.referencia) { obj.endereco.referencia = this.referencia }
      return obj
    },

    getPostContato () {
      let obj = {}
      if (this.nome) { obj.nome = this.nome }
      if (this.email) { obj.email = this.email }
      if (this.foneA) { obj.fone_a = this.foneA }
      if (this.foneB) { obj.fone_b = this.foneB }
      return obj
    },

    getPostPessoa () {
      let obj = this.getPostContato()
      if (this.cpf) { obj.cpf = this.cpf }
      if (!!this.dataNascimento && this.dataNascimento !== 'T00:00:00') {
        obj.data_nascimento = date.formatDate(this.dataNascimento, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      return obj
    },

    getPostEmpresa (state) {
      this.lState = nameStateContato
      let contato = this.getPostContato()

      let empresa = {}
      this.lState = nameStateEmpresa
      if (this.razaoSocial) { empresa.razao_social = this.razaoSocial }
      if (this.nome) { empresa.nome = this.nome }
      if (this.cnpj) { empresa.cnpj = this.cnpj }
      if (this.responsavelId) { empresa.responsavel_id = this.responsavelId }
      if (this.responsavelNome) { empresa.responsavel_nome = this.responsavelNome }

      let obj = { empresa: empresa, cliente: {} }
      obj.cliente.ativo = this.clienteAtivo
      if (this.contatoId) { obj.cliente.contatoId = this.contatoId }
      obj.cliente.contato = contato

      return obj
    },

    getPostProfissional () {
      this.lState = nameStateProfissional
      let obj = { profissional: {} }
      obj.profissional = { conselho_numero: this.conselhoNumero, conselho: this.conselho, conselho_uf: this.conselhoUf, pessoa: this.getPostPessoa() }
      return obj
    },

    getPostCliente (tipo) {
      let cliente = { ativo: this.clienteAtivo }

      if (this.contatoId) { cliente.contatoId = this.contatoId }

      this.lState = nameStateContato
      cliente.contato = this.getPostPessoa()

      return cliente
    }
  },
  watch: { '$route': 'getClienteEdicao' },

  async mounted () {
    this.$q.loading.show()
    this.getClienteEdicao()
    this.$q.loading.hide()
    this.loaded = true
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit(`Cliente/CLEAR_STATE_ROOT`)
    next()
  }
}

</script>
