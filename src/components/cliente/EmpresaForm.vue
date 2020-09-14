<template>
  <div >
   <empresa-group module="Cliente" state="empresa" ref="empresaGroup"/>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'ProfissionalForm',
  mixins: [StateMixin, ValidateMixin]
}
</script>
