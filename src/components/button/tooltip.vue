<template >
  <div>
    <q-btn
      dense
      :id="propId"
      :disabled="propDisabled"
      :rounded="propRounded"
      :size="propSize"
      :icon="propIcon"
      :color="propColor"
      :title="propTitle"
    >
      <q-tooltip v-model="showing">{{mesagem}}</q-tooltip>
    </q-btn>
  </div>
</template>

<style>
</style>

<script>
export default {
  props: {
    propId: { type: String, required: true },
    propTitle: { type: String, required: true, default: "?" },
    propSize: { type: String, default: "md" },
    propIcon: { type: String, default: "adb" },
    propColor: { type: String, default: "blue-grey-6" },
    propDisabled: { type: Boolean, default: false },
    propRounded: { type: Boolean, default: true }
  },
  data() {
    return {
      mesagem: "Nenhum registro foi encontrado",
      showing: false
    };
  }
};
</script>

