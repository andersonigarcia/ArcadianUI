import { axios } from 'boot/axios'
// import urls from '../router/urls'
import { Notify } from 'quasar'
import _ from 'lodash'

let config = {
  notifyErrors: true
}

function notify (message) {
  Notify.create({
    color: 'black',
    textColor: 'white',
    closeBtn: 'Fechar',
    position: 'bottom',
    message: message,
    timeout: 0,
    icon: 'cloud_off',
    classes: 'a-notification-error'
  })
}

function ok (message) {
  Notify.create({
    color: 'positive',
    textColor: 'white',
    closeBtn: 'Fechar',
    position: 'bottom',
    message: message,
    timeout: 3000,
    icon: 'check_circle',
    classes: 'a-notification-ok'
  })
}

function error (message) {
  if (config.notifyErrors) notify(message)
  return { success: false, message: message, data: null }
}

function ensureHeaders (config) {
  config = config || { headers: { 'Content-Type': 'application/json' } }
  if (!config.headers) config.headers = { 'Content-Type': 'application/json' }
  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json'
  return config
}

function normalize (result) {
  if (!result) return error('A requisição não retornou nenhuma informação')
  if (!result.status) return error('Não foi possível verificar o status de retorno da requisição')
  // timeout
  if (result.status === 'timeout') return error(`A requisição excedeu o tempo de limite de ${result.timeout / 1000} segundos. Por favor tente novamente`)
  // 200:Ok
  if (result.status === 200) return result.data
  // 400:Bad Request com data são erros lógicos produzidos pela api (vide:boot/axios.js)
  if (result.status === 400 && result.data) {
    error(result.data.message)
    return result.data
  }
  // 401:Unauthorized são erros de acesso produzidos pela api, dai navegamos para a url de signIn
  // if (result.status === 401) return urls.navigateTo(urls.singIn)
  // demais erros são do protocolo/comunicação/servidor e não são tratados pela api
  return error(`A requisição retornou um status desconhecido (${result.status}:${result.statusText})`)
}

export async function get (url, config) {
  try {
    return normalize(await axios.get(url, config))
  } catch (e) {
    return error(e.name + ': ' + e.message)
  }
}

export async function post (url, data, config = {}, itemNotify) {
  try {
    config = ensureHeaders(config)
    let result = normalize(await axios.post(url, JSON.stringify(data), config))

    if (itemNotify && result.success) {
      ok(`${_.capitalize(itemNotify)} gravado com sucesso!`)
    }

    return result
  } catch (e) {
    return error(e.name + ': ' + e.message)
  }
}

export async function put (url, data, config = {}, itemNotify = '') {
  try {
    config = ensureHeaders(config)
    let result = normalize(await axios.put(url, JSON.stringify(data), config))

    if (itemNotify && result.success) {
      ok(`${_.capitalize(itemNotify)} gravado com sucesso!`)
    }

    return result
  } catch (e) {
    return error(e.name + ': ' + e.message)
  }
}

export async function del (url, data, config = {}) {
  try {
    config = ensureHeaders(config)
    return normalize(await axios.delete(url, JSON.stringify(data), config))
  } catch (e) {
    return error(e.name + ': ' + e.message)
  }
}

export default {
  config,
  get,
  post,
  put,
  del
}
