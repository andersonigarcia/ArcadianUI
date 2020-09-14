<template>
  <q-dialog v-model="show" v-on="$listeners" persistent v-close-popup>
    <div class="column bg-white q-pa-md">
      <div class="col row">
        <q-icon class="col-auto self-start q-mr-md" name="help" color="brand-1" size="4em"/>
        <span class="col self-center" v-html="message"></span>
      </div>
      <div class="col-auto self-end q-gutter-sm q-mt-sm">
        <q-btn class="c-button" label="Ok" :color="defaultOk" :text-color="defaultCancel" v-close-popup @click="$emit('option', 'ok')" ref="ok"/>
        <q-btn class="c-button" label="Cancelar" :color="defaultCancel" :text-color="defaultOk" v-close-popup @click="$emit('option', 'cancel')" ref="cancel"/>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import ConfirmationDialogMixin from 'mixins/comum/confirmation-dialog'

export default {
  name: 'ConfirmationDialog',

  mixins: [ConfirmationDialogMixin],
  props: {
    message: { type: String, required: true }
  },
  updated () { this.setFocus() }
}
</script>

<style lang="stylus" scoped>
.c-button
  width 110px
.c-button:focus
  opacity .85
</style>
