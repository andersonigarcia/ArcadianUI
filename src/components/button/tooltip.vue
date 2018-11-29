<template >
  <div>
    <q-btn dense :id="prop_id" :disabled="prop_disabled" :rounded="prop_rounded" :size="prop-Size" :icon="prop_icon" :color="prop_color" :title="prop_title">
      <q-tooltip v-model="showing">{{mesagem}}</q-tooltip>
    </q-btn>
  </div>
</template>

<style> </style>

<script>
export default {
  props:{
    prop_id: { type: String, required: true },
    prop_title: { type: String,  required: true, default: "?" },
    prop_size: { type: String, default: "md" },
    prop_icon: { type: String, default: "adb" },
    prop_color: { type: String, default: "blue-grey-6" },
    prop_disabled: { type: Boolean, default: false },
    prop_rounded: {type: Boolean, default: true }
  },
  data(){
    return{
      mesagem: "Nenhum registro foi encontrado",
      showing: false
    }
  }
}
</script>

