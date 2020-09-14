export function isNumber (v) {
  return isFinite(v) && !isNaN(toNumber(v))
}

// Arredonda v (value) para as casas decimais definidas em p (precision)
// Leva em conta o bug de arredondamento do Math.round (e correlatas). Para contornar somamos ao valor v uma unidade com precisao 3x menor antes de fazer o arredondamento
// Ex: Math.round(1.005 * 100) / 100 NÃO retorna 1.01 como esperado, então fazemos Math.round((1.005 + 0.00001) * 100) / 100 que retorna 1.01
export function round (v, p = 2) {
  return Math.round((v + 1 / Math.pow(10, p * 3)) * Math.pow(10, p)) / Math.pow(10, p)
}

// Extrai os digitos numericos de uma string e retorna um Number correspondente
// se o parametro ja for datatype Number retorna sem alteracoes
// IMPORTANTE: parametro v deve representar um numero em pt-BR, ou seja, o separador de decimal
//             deve ser a virgula do contrario a rotina poderá converter para um numero incorreto
export function toNumber (v, p = 20) {
  // se o valor já é um tipo number retorna sem alteracoes
  if (typeof (v) === 'number') return v
  // remove todos os caracteres diferentes de digito numerico e ponto, e converte separador de decimais de virgula para ponto
  return Number(v.toString().replace(/[^\d,]+/g, '').replace(',', '.'))
}

// Retorna a parte decimal de um numero ate 12 digitos
export function getDecimalPart (v, p = 12) {
  return Number((v % 1).toFixed(p))
}

// formatCurrency
export function formatPtBr (value, precision = 2, style = 'currency', symbol = 'symbol') {
  return value.toLocaleString('pt-BR', {
    style: style, // decimal, percent, currency
    currency: 'BRL',
    currencyDisplay: symbol,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
}

// TODO: check
export function formatDecimal (value) {
  if (typeof value === 'undefined') return

  let val = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(round(toNumber(value)))

  return Number(val) === 0 ? '0,00' : val
}

export default {
  isNumber,
  round,
  toNumber,
  getDecimalPart,
  formatPtBr,
  formatDecimal
}
