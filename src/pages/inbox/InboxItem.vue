<template>
  <q-page padding>
    <h6>Em construção...</h6>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'InboxItem',

  props: ['dia', 'hora', 'tag'],

  methods: {
    ...mapActions('Inbox', ['getInboxItem'])
  },

  computed: {
    inicio () {
      return this.dia + 'T' + this.hora
    }
  },

  async mounted () {
    await this.getInboxItem({ executante: '4f74c2e9-390e-4411-8c32-bd4b9b6563e2', inicio: this.inicio, tag: this.tag })
  }
}
</script>
