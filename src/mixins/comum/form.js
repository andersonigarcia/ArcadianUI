import ValidateMixin from 'mixins/comum/validate'

export default {

  mixins: [ValidateMixin],

  data () {
    return {
      submitting: false
    }
  },

  methods: {
    async submit () {
      // this.$q.loading.show()
      try {
        this.submitting = true
        this.validate()
        if (this.hasError) {
          this.$app.warn('Formulário inválido. Verifque se todos os campos foram preenchidos corretamente.')
          return
        }
        await this.send()
      } finally {
        // this.$q.loading.hide()
        this.submitting = false
      }
    },

    send () {
      throw new Error('Método send é abstrato e deve ser implementado no próprio componente')
    }
  }
}
