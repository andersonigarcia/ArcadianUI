<template>
  <div class="row q-mb-md">
    <div class="col">
      <q-input
        type="text"
        v-model="cliente"
        float-label="Cliente *"
        color="amber"
        inverted-light
        :after="[    
                { icon: 'add' },    
                { icon: 'search' }    
              ]"
      >
        <q-autocomplete @search="searchClientes" @selected="selectedCliente"/>
      </q-input>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: { type: Array, default: [] }
  },
  data() {},
  searchClientes() {
    this.$emit("search", "clientes");
  },
  selectedCliente() {
    this.$emit("search", "clientes");
  }
};
</script>

<style>
</style>



