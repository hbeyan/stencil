import * as d from '../declarations';

export const devtoolsComponentAdded = createDevtoolsComponentHook(d.DevtoolsHooks.COMPONENT_ADDED)
export const devtoolsComponentUpdated = createDevtoolsComponentHook(d.DevtoolsHooks.COMPONENT_UPDATED)
export const devtoolsComponentRemoved = createDevtoolsComponentHook(d.DevtoolsHooks.COMPONENT_REMOVED)

function createDevtoolsComponentHook(hook: d.DevtoolsHooks) {
  return (component: d.HostRef) => {
    emit(
      hook,
      component
    )
  }
}

export let devtools: d.DevtoolsHook

let buffer: { event: d.DevtoolsHooks; args: any[] }[] = []
let devtoolsNotInstalled = false

function emit(event: d.DevtoolsHooks, ...args: any[]) {
  console.log('EMIT', event, Boolean(devtools), args);

  if (devtools) {
    devtools.emit(event, ...args)
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args })
  }
}

export function setDevtoolsHook(hook: d.DevtoolsHook) {
  devtools = hook
  if (devtools) {
    devtools.enabled = true
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args))
    buffer = []
  } else {
    // non-browser env, assume not installed
    devtoolsNotInstalled = true
    buffer = []
  }
}
