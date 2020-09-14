import { Notify } from 'quasar'

// import dos index.js para registro de componentes global registration
import kebabCase from 'lodash/kebabCase'
import components from '../components'

// notify messages
export async function ok (message, timeout = 3000, position = 'bottom') {
  Notify.create({
    color: 'positive',
    textColor: 'white',
    closeBtn: 'Fechar',
    position: position,
    message: message,
    timeout: timeout,
    icon: 'check_circle',
    classes: 'a-notification-ok'
  })
}
export async function warn (message, timeout = 0, position = 'bottom') {
  Notify.create({
    color: 'warning',
    textColor: 'black',
    closeBtn: 'Fechar',
    position: position,
    message: message,
    timeout: timeout,
    icon: 'warning',
    classes: 'a-notification-warn'
  })
}
export async function error (message, timeout = 0, position = 'bottom') {
  Notify.create({
    color: 'negative',
    textColor: 'white',
    closeBtn: 'Fechar',
    position: position,
    message: message,
    timeout: timeout,
    icon: 'error',
    classes: 'a-notification-error'
  })
}

// exports
export const app = {
  ok,
  warn,
  error
}

export default async ({ Vue }) => {
  Vue.prototype.$app = app
  // registro de componentes globais
  for (var key in components) {
    // skip loop if the property is from prototype
    if (!components.hasOwnProperty(key)) continue
    Vue.component(kebabCase(key), components[key])
  }
}
