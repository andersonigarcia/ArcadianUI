<template>
  <!-- https://forum.vuejs.org/t/how-do-i-redirect-user-to-proper-page/8243 -->
  <q-page padding>

    <q-card class="q-pa-md">

      <div style="text-align: center;">
        <img
          alt="Arcadian logo"
          src="~assets/arcadian-logo_1.png"
          height="50%"
          width="50%"
        >
      </div>

      <div>
        <q-input
          v-model="usuario"
          type="text"
          float-label="Usuário"
        />
      </div>

      <div>
        <q-input
          v-model="senha"
          type="password"
          float-label="Senha"
        />
      </div>

      <div class="q-pt-md">
        <q-btn
          class="full-width"
          dense
          label="ENTRAR"
          color="blue-grey-5"
          @click="entrar"
        ></q-btn>
      </div>

    </q-card>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      form: {
        //email: '',
      },
      usuario: '',
      senha: ''
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        return
      }
    },
    entrar () {
      console.log("Botão entrar...")

    }
  }
}
</script>

<style>
</style>
