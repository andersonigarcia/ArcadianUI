<template >
  <div>
    <q-btn dense :id="prop_id"
                 :desabled="prop_disabled"
                 :rounded="prop_rounded"
                 :size="prop_size"
                 :icon="prop_icon"
                 :color="prop_color"
                 :title="prop_title"
                 @click.stop="Acao" >
    </q-btn>
  </div>
</template>

<style></style>

<script>
//import { RegisterMixin } from '../../plugins/usuarios.js'

  export default {
    //mixins:[ RegisterMixin ],
    props:{
      prop_id: {type: String, required: true},
      prop_title: { type: String,  required: true, default: "?" },
      prop_size: { type: String, default: "md" },
      prop_icon: { type: String, default: "adb" },
      prop_color: { type: String, default: "blue-grey-6" },
      prop_disabled: { type: Boolean, default: false },
      prop_rounded: { type: Boolean, default: true },
      prop_event_emitido: { type: String, required: true }
    },
    methods: {
      Acao () {
        console.log("Evento " + this.prop_event_emitido + " emitido...")
        this.$emit(this.prop_event_emitido, this.prop_title);
        //this.$root.$emit(this.prop_event_emitido, this.prop_event_emitido);
      }
    }
    // destroyed(){
    //   bus.$off(this.prop_event_emitido)
    // }
  }
</script>

