export const RegisterMixin = {
  // data() {
  //     return id = '41'
  // },
  // created() {
  //   //console.log("RegisterMixin criado.")
  //   this.Acao()
  // },
  methods: {
    Acao() {
      // Lets assume we extracted the AJAX call to the Registration class
      // new Registration()
      //   .register()
      //   .then(response => {
      //     this.id = response.id
      //   })
      console.log("Método 'register' do mixin RegisterMixin.");
    }
  }
}
