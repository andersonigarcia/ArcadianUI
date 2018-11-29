import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}

// export const RegisterMixin = {
//   data() {
//       return id = ''
//   },
//   methods: {
//     register () {
//       // Lets assume we extracted the AJAX call to the Registration class
//       new Registration()
//         .register()
//         .then(response => {
//           this.id = response.id
//         })
//     }
//   }
// }
