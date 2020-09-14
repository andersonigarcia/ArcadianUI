export default {
  props: {
    module: { type: String, required: true },
    state: { type: String, required: true }
  },
  methods: {
    setState (key, value, state, type = String) {
      if (type === Number && value === '') return
      this.$store.dispatch(`${this.module}/setState`,
        ({ state: state, key: key, value: value, vm: this }))
    },

    getState (key, state) {
      let lState = this.$store.state[this.module].state || {}
      if (this.state === key) { return lState[state || this.state] }
      return lState[state || this.state] ? lState[state || this.state][key] : ''
    }
  }
}
