import keys from './keys'

const is = {
  obj      : value => typeof value === 'object' && !! value,
  func     : value => typeof value === 'function',
  select   : value => is.obj(value) && value.type === keys.select,
  put      : value => is.obj(value) && value.type === keys.put,
  iterator : value => value && is.func(value.next) && is.func(value.throw)
}

export default is
