<template>
  <div class="q-ma-xs">
    <q-btn
      dense
      wait-for-ripple
      :id="propAcao"
      :desabled="propDisabled"
      :rounded="propRounded"
      :size="propSize"
      :icon="propIcon"
      :color="propColor"
      :title="propTitle"
      :hidden="propHidden"
      @click.stop="HandlerClick"
    >
      <!-- <q-icon :name="propIcon" color="blue-grey-3"></q-icon> -->
    </q-btn>
  </div>
</template>

<style>
</style>

<script>
//import { RegisterMixin } from '../../plugins/usuarios.js'

export default {
  //mixins:[ RegisterMixin ],
  props: {
    propAcao: { type: String, required: true },
    propTitle: { type: String, required: true, default: "?" },
    propSize: { type: String, default: "md" },
    propIcon: { type: String, default: "adb" },
    propColor: { type: String, default: "blue-grey-6" },
    propDisabled: { type: Boolean, default: false },
    propRounded: { type: Boolean, default: true },
    propHidden: { type: Boolean, default: false }
  },
  methods: {
    HandlerClick () {
      console.log("Evento " + this.propAcao + " emitido...");
      this.$emit(this.propAcao);
    }
  }
  // destroyed() {
  //   bus.$off(this.propAcao);
  // }
};
</script>

