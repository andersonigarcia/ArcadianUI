import _ from 'lodash'

export default {
  data () {
    return {
      error: false
    }
  },
  computed: {
    hasError () { return this.error === true }
  },
  methods: {
    validate () {
      this.error = false
      const keys = Object.getOwnPropertyNames(this.$refs)
      let i = keys.length
      while (i--) {
        const ref = this.$refs[keys[i]]
        if (ref !== undefined && typeof ref.validate === 'function') {
          ref.validate()
          this.error = this.error || ref.hasError
        }
      }
    },
    isModuleChanged (moduleName, except = 'screen') {
      let validate = false
      Object.getOwnPropertyNames(this.$store.state[moduleName].state).forEach((i) => {
        if (i === '__ob__' || i === except) return
        validate = this.isStateChanged(moduleName, i) ? true : validate
      })
      return validate
    },
    isStateChanged (moduleName, stateName) {
      return !_.isEqual(this.$store.state[moduleName].original[stateName], this.$store.state[moduleName].state[stateName])
    }
    // isPropertiesObjectEmpty (o) {
    //   let empty = true
    //   if (!_.isEmpty(o)) {
    //     Object.getOwnPropertyNames(o).forEach((e) => {
    //       if (e === '__ob__') return
    //       empty = e === ''
    //     })
    //   }
    //   return empty
    // }
  }
}
