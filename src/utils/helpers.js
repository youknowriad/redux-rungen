import keys from './keys'

export const select = (selector, ...args) => ({
  type: keys.select,
  selector,
  args
})

export const put = action => ({
  type: keys.put,
  action
})
