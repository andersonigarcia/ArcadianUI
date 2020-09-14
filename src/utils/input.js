
export default {
  validateCPF: (cpf) => {
    if (cpf === null || cpf === undefined || cpf === '') { return true }

    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') return false

    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
          cpf === '00000000000' ||
          cpf === '11111111111' ||
          cpf === '22222222222' ||
          cpf === '33333333333' ||
          cpf === '44444444444' ||
          cpf === '55555555555' ||
          cpf === '66666666666' ||
          cpf === '77777777777' ||
          cpf === '88888888888' ||
          cpf === '99999999999') { return false }

    // Valida 1o digito
    let add = 0
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) { rev = 0 }
    if (rev !== parseInt(cpf.charAt(9))) { return false }

    // Valida 2o digito
    add = 0
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i)
    }
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) { rev = 0 }
    if (rev !== parseInt(cpf.charAt(10))) { return false }
    return true
  },
  validateCNPJ: (num) => {
    if (num === null || num === undefined || num === '') { return true }

    let cnpj = num.replace(/[^\d]+/g, '')

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) { return false }

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) { return false }

    // Cáculo de validação
    let t = cnpj.length - 2,
      d = cnpj.substring(t),
      d1 = parseInt(d.charAt(0)),
      d2 = parseInt(d.charAt(1)),
      calc = x => {
        let n = cnpj.substring(0, x),
          y = x - 7,
          s = 0,
          r = 0

        for (let i = x; i >= 1; i--) {
          s += n.charAt(x - i) * y--
          if (y < 2) { y = 9 }
        }

        r = 11 - s % 11
        return r > 9 ? 0 : r
      }

    return calc(t) === d1 && calc(t + 1) === d2
  },

  validateEmail: (email) => {
    if (email === null || email === undefined || email === '' || email.length === 0) return true

    let reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i
    return reg.test(String(email).toLowerCase())
  },

  IsCEP: (cep) => {
    if (cep === null || cep === undefined || cep === '') { return true }

    // TODO: Melhorar o regex
    var exp = /^[0-9]{8}$/
    cep = cep.replace(/^s+|s+$/g, '').replace('-', '')

    if (cep === '' || cep.length !== 8) return false

    if (exp.test(cep)) return true

    return false
  },

  isEmpty (val) {
    return val === null || val === undefined || val === '' || val.length === 0
  }

}
