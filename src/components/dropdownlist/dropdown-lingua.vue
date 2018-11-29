<template>
  <q-select class="q-mt-md q-mr-sm" non-selectable
    v-model="lang"
    stack-label="Language"
    :options="[
      { label: 'English (US)', value: 'en-us' },
      { label: 'portugues',     value: 'pt-br' },
      { label: 'Chinese (Simplified)', value: 'zh-hans' },
      { label: 'Italian', value: 'it' }
    ]"

  />
</template>

<script>
export default {
  data () {
    return {
      lang: this.$q.i18n.lang
    }
  },
  watch: {
    lang (lang) {
      // dynamic import, so loading on demand only
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
    }
  }
}
</script>
