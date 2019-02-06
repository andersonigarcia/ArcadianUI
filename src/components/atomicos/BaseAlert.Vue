<template>
  <div>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" appear>
      <q-alert v-if="pVisible" :color="cor" :icon="icon" appear :actions="[{ label: 'Dismiss', handler: () => { pVisible = false } }]"
        class="q-mb-sm">
        {{pMensagem}}
      </q-alert>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    pMensagem: {
      type: String,
      required: true,
      default: "Nenhuma mensagem atribuida"
    },
    pVisible: {
      type: Boolean,
      defatult: false
    },
    pTipo: {
      validator: function (value) {
        return ['successo', 'alerta', 'erro', 'info'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      cor: '',
      icon: ''
    }
  },
  methods: {
    configurar() {
      switch (pTipo) {
        case 'sucesso':
          cor = 'positive'
          icon = 'check_circle'
          break;
        case 'alerta':
          cor = 'warning'
          icon = 'priority_high'
          break;
        case 'erro':
          cor = 'negative'
          icon = 'warning'
          break;
        case 'info':
          cor = 'info'
          icon = 'info'
          break;
        default:
          cor = ''
          break;
      }
    }
  },
  mounted() {
    this.configurar()
  }
}
</script>

