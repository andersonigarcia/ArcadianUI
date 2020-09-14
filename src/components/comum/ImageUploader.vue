<template>
  <div class="row q-mx-sm q-mb-md ">
    <q-uploader label="Incluir imagens" text-color="grey-6" style="min-width: 250px" class="col text-brand-5" color="grey-1" accept=".jpg, .jpeg, .png, image/*" flat bordered multiple :url="url" field-name="file" :form-fields="metadata"/>
  </div>
</template>

<script>
import { axios } from 'boot/axios'

export default {
  data () {
    return {
      url: axios.defaults.baseURL + 'Upload'
    }
  },

  methods: {
    metadata () {
      // TODO: enviar os dados relacionados a imagem
      return [{ name: 'ordemServicoId', value: '6b9d82a3-d688-482f-82f3-0a82ccfcc36f' }]
    }
  }
}
</script>
