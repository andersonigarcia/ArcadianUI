<template>
  <div>
    <q-dialog v-model="show" persistent @show="open" ref="inputDialog">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-bar>
          <q-icon class="col-auto self-start q-ma-xs" name="collections_bookmark" color="brand-1" size="1.5em"/>
          <div class="q-pa-xs text-h6 text-brand-3">{{ title }}</div>
        </q-bar>
        <q-card-section>
          <q-input dense v-model="text" autofocus :rules="[val => !!val || message]" ref="input"/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn class="c-button" label="Gravar" :color="defaultOk" :text-color="defaultCancel"  @click="ok"/>
          <q-btn class="c-button" label="Cancelar" :color="defaultCancel" :text-color="defaultOk" v-close-popup @click="$emit('option', 'cancel', lValue)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ConfirmationDialogMixin from 'mixins/comum/confirmation-dialog'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'InputDialog',
  mixins: [ConfirmationDialogMixin, ValidateMixin],
  props: {
    message: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: String, default: '' }
  },
  data () {
    return { lValue: '' }
  },
  computed: {
    text: {
      get () { return this.lValue },
      set (val) { this.lValue = val }
    }
  },
  methods: {
    open () { this.lValue = this.value },
    ok () {
      let valid = this.$refs.input.validate()
      if (valid) {
        this.$emit('option', 'include', this.lValue)
      } else {
        this.$refs.inputDialog.shake()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-button
  width 110px
.c-button:focus
  opacity .85
</style>
