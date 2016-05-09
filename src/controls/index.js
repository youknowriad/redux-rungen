import is from '../utils/is'

const createControls = (dispatch, getState) => {
  const select = (value, next) => {
    if (!is.select(value)) return false
    const result = value.selector
      ? value.selector(getState(), ...value.args)
      : getState()
    next(result)
    return true
  }

  const put = (value, next) => {
    if (!is.put(value)) return false
    next(dispatch(value.action))
    return true
  }

  return [select, put]
}

export default createControls
