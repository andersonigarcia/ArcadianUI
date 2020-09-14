export default {
  props: {
    visible: { type: Boolean, required: true },
    default: { type: String, default: 'cancel' }
  },

  computed: {
    defaultOk () { return this.default === 'ok' ? 'brand-1' : 'brand-4' },
    defaultCancel () { return this.default === 'cancel' ? 'brand-1' : 'brand-4' },
    show: {
      get: function () { return this.visible },
      set: function (value) { }
    }
  },

  methods: {
    setFocus () {
      if (this.default === 'ok') {
        if (this.$refs.ok) this.$nextTick(() => this.$refs.ok.$el.focus())
      } else {
        if (this.$refs.cancel) this.$nextTick(() => this.$refs.cancel.$el.focus())
      }
    }
  },

  mounted () {
    this.$nextTick(() => this.setFocus())
  }
}
