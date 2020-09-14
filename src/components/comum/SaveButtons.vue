<template>
  <div class="row q-ma-sm">
    <q-btn v-if="btnAbandonar" type="reset" color="negative" size="md" :label="lblAbandonar" no-caps class="q-mr-sm"/>
    <q-btn v-if="btnConfirmar" type="submit" color="teal" size="md" :label="lblConfirmar" no-caps :loading="submitting" :disable="disableConfirmar">
      <template v-slot:loading>
        <q-spinner-dots/>
      </template>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: {
    submitting: { type: Boolean, default: false },
    btnAbandonar: { type: Boolean, default: true },
    btnConfirmar: { type: Boolean, default: true },
    disableConfirmar: { type: Boolean, default: false },
    lblConfirmar: { type: String, default: 'Gravar' },
    lblAbandonar: { type: String, default: 'Cancelar' }
  }
}
</script>
